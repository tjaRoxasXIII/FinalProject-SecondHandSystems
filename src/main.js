import { sendEmail } from "./scripts/api/resend.js";
import { setActivePart } from "./scripts/partButtons.js"

const sidebarItems = document.querySelectorAll(".sidebar-item");
const listingsTitle = document.querySelector(".listings-title");
const listingsCount = document.querySelector(".listings-count");
const listingsList = document.querySelector(".listings-list");
const platformToggleContainer = document.querySelector(".listings-platform-toggle");
const USER_BUDGET = 600;

export {
  listingsCount,
  listingsList,
  listingsTitle,
  platformToggleContainer,
  sidebarItems,
  USER_BUDGET
};

sidebarItems.forEach(item => {
  item.addEventListener("click", () => {
    const partName = item.textContent.trim();
    setActivePart(partName);
  });
});

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
