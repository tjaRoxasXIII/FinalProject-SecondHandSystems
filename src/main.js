import { sendEmail } from "./scripts/api/resend.js";
import { setActivePart } from "./scripts/partButtons.js"

document.getElementById("sendTestMessage").addEventListener("click", async () => {
  const status = document.getElementById("status");
  status.textContent = "Sending…";

  const buildName = window.currentBuildName;   // however you're storing it
  const parts = window.currentPartsList;       // array of parts

  try {
    const result = await sendEmail("Sample PC Build",[]); // empty parts list triggers placeholder

    status.innerHTML = `Your build has been sent!`;
  } catch (err) {
    status.textContent = "Failed due to: " + err.message;
  }
});
