// sendBuildEmail.js
import { sendEmail } from "./api/resend.js";
import { getCurrentViewedBuild } from "./buildReview.js";

export function initSendEmail() {
  const sendBtn = document.getElementById("sendMessage");
  const emailInput = document.getElementById("email-input");
  const status = document.getElementById("email-status");

  sendBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    if (!email) {
      status.textContent = "Please enter an email.";
      return;
    }

    const build = getCurrentViewedBuild();
    if (!build) {
      status.textContent = "No build selected.";
      return;
    }

    const parts = Object.values(build.parts).filter(Boolean);

    status.textContent = "Sending…";

    try {
      const result = await sendEmail(email, build.name, parts);

      if (result.error) {
        status.textContent = "Failed: " + result.error;
      } else {
        status.textContent = "Build sent successfully!";
      }
    } catch (err) {
      status.textContent = "Failed: " + err.message;
    }
  });
}
