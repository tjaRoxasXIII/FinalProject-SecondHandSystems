import express from "express";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();
app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    const { buildName, parts } = req.body;

    // Placeholder if nothing is selected yet
    const safeBuildName = buildName || "Sample PC Build";
    const safeParts = parts && parts.length > 0
      ? parts
      : [
          { type: "CPU", name: "Placeholder CPU", price: 0 },
          { type: "GPU", name: "Placeholder GPU", price: 0 },
          { type: "RAM", name: "Placeholder RAM", price: 0 }
        ];

    const html = `
      <h1>Your PC Build: ${safeBuildName}</h1>
      <ul>
        ${safeParts
          .map(
            (p) =>
              `<li><b>${p.type}:</b> ${p.name} — $${p.price}</li>`
          )
          .join("")}
      </ul>
      <p><b>Total:</b> $${safeParts.reduce((sum, p) => sum + p.price, 0)}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: process.env.EMAIL_TO,
      subject: `Your PC Build: ${safeBuildName}`,
      html
    });

    if (error) return res.json({ error });
    res.json({ data });

  } catch (err) {
    res.json({ error: err.message });
  }
});

app.listen(3001, () => console.log("Backend running on port 3001"));
