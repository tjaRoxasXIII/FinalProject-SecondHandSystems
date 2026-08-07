import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Resend } from "resend";
import { searchEbay } from "./src/scripts/api/ebaySearch.js";

dotenv.config();

const TYPES_ARR = [
  "CPU", 
  "GPU",
  "RAM",
  "MOBO", 
  "PSU", 
  "CASE",
  "COOLER",
  "SSD/HDD", 
]

const app = express();
app.use(express.json());

// CORS FIX
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3001",
        "https://tjaroxasxiii.github.io",
      ];

      if (!origin || allowed.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

// RESEND EMAIL ROUTE
const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-email", async (req, res) => {
  try {
    const { email, buildName, parts } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const safeBuildName = buildName || "Sample PC Build";
    const safeParts =
      parts && parts.length > 0
        ? parts
        : [
            { type: "CPU", name: "Placeholder CPU", price: 0 },
            { type: "GPU", name: "Placeholder GPU", price: 0 },
            { type: "RAM", name: "Placeholder RAM", price: 0 },
            { type: "SSD/HDD", name: "Placeholder Storage", price: 0 },
            { type: "MOBO", name: "Placeholder Motherboard", price: 0 },
            { type: "PSU", name: "Placeholder PSU", price: 0 },
            { type: "CASE", name: "Placeholder Case", price: 0 },
          ];

    const html = `
      <h1>Your PC Build: ${safeBuildName}</h1>
      <ul>
        ${safeParts
          .map((p, index) => {
            return `<li><b>${TYPES_ARR[index]}:</b> <a href="${p.link}" target="_blank">${p.title}</a> — $${p.price.value}</li>`;
          })
          .join("")}
      </ul>
      <p><b>Total:</b> $${safeParts
        .reduce((sum, p) => sum + Number(p.price.value || 0), 0)
        .toFixed(2)}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: "SecondHandPC <onboarding@resend.dev>",
      to: [email],
      subject: `Second-Hand Systems Build: ${safeBuildName}`,
      html,
    });

    if (error) return res.status(500).json({ error });

    res.json({ data });
  } catch (err) {
    console.error("RESEND ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// EBAY SEARCH PATH
app.get("/search-part", async (req, res) => {
  const { part, platform, category_ids, budget } = req.query;

  try {
    const params = new URLSearchParams();

    if (platform) {
      params.set("q", platform.toLowerCase());
    } else if (part) {
      params.set("q", part.toLowerCase());
    }

    params.set("limit", 50);

    if (category_ids) {
      params.set("category_ids", category_ids);
    }

    let queryString = params.toString();

    if (budget) {
      queryString += `&filter=price:[10..${budget}],priceCurrency:USD`;
    }

    const ebayData = await searchEbay(queryString);

    const listings = (ebayData.itemSummaries || []).map((item) => ({
      title: item.title,
      shortDescription: item.shortDescription,
      condition: item.condition,
      seller: item.seller,
      price: item.price,
      shipping: item.shippingOptions?.[0]?.shippingCost?.value || null,
      image: item.image?.imageUrl || null,
      link: item.itemWebUrl,
    }));

    res.json({ listings });
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.listen(3001, () => console.log("Backend running on port 3001"));
