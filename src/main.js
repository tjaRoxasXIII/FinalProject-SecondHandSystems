import { sendEmail } from "./scripts/api/twilio.js";

document.getElementById("sendTestMessage").addEventListener("click", async () => {
  const status = document.getElementById("status");
  status.textContent = "Sending…";

  const result = await sendEmail();

  status.textContent = result.error ? `Failed due to: ${result.error}` : "Email sent!";
});