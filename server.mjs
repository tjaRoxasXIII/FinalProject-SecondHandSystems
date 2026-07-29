import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const TWILIO_EMAIL_URL = "https://comms.twilio.com/v1/Emails";

app.post("/send-email", async (req, res) => {
  try {
    const payload = {
      from: {
        address: process.env.TWILIO_EMAIL_FROM,
        name: "Trial with Twilio"
      },
      to: [{ address: process.env.TWILIO_EMAIL_TO }],
      content: {
        subject: "Your Order Has Been Confirmed!",
        html: "<p><b>This is a test email from Twilio.</b></p>"
      }
    };

    const auth =
      "Basic " +
      Buffer.from(
        `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
      ).toString("base64");

    const response = await fetch(TWILIO_EMAIL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.listen(3001, () => console.log("Backend running on port 3001"));