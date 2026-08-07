import { sendEmail } from "./scripts/api/resend.js";
import { setActivePart } from "./scripts/partButtons.js";
import {
  initBudgetControls,
  addPartControls,
} from "./scripts/budgetControl.js";
import { USER_BUDGET, setUserBudget } from "./scripts/budgetState.js";
import { saveBuild, currentBuild } from "./scripts/currentBuild.js";
import { initBuildSaveControls } from "./scripts/buildSave.js";

const sidebarItems = document.querySelectorAll(".sidebar-item");
const listingsTitle = document.querySelector(".listings-title");
const listingsCount = document.querySelector(".listings-count");
const listingsList = document.querySelector(".listings-list");
const listingsSort = document.querySelector(".listings-sort-container");
const platformToggleContainer = document.querySelector(
  ".listings-platform-toggle",
);

export {
  listingsCount,
  listingsList,
  listingsSort,
  listingsTitle,
  platformToggleContainer,
  sidebarItems,
};

sidebarItems.forEach((item) => {
  item.addEventListener("click", () => {
    const partName = item.textContent.trim();
    setActivePart(partName);
  });
});

initBudgetControls((newBudget) => {
  setUserBudget(newBudget);
});
addPartControls();
initBuildSaveControls();
