// buildSave.js
import { currentBuild, saveBuild } from "./currentBuild.js";

export function initBuildSaveControls() {
  const saveBtn = document.getElementById("saveBuildBtn");
  const clearBtn = document.getElementById("clearBuildBtn");
  const nameInput = document.getElementById("build-name-input");

  // SAVE BUILD
  saveBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (!name) {
      alert("Please enter a build name.");
      return;
    }

    saveBuild(name);
    alert("Build saved!");
  });

  // CLEAR BUILD
  clearBtn.addEventListener("click", () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear this build? All selected parts will be removed.",
    );
    if (!confirmed) return;

    // 1. Clear the build name input
    nameInput.value = "";

    // 2. Clear the currentBuild object
    for (const key in currentBuild) {
      currentBuild[key] = null;
    }

    // 3. Clear the UI build panel values
    const buildSlots = document.querySelectorAll(".build-part-slot");
    buildSlots.forEach((slot) => {
      const valuePanel = slot.querySelector(".build-part-value");
      if (valuePanel) valuePanel.textContent = "$0";
    });

    // 4. Reset spent total
    const spentDisplay = document.querySelector(".build-budget-spent");
    if (spentDisplay) spentDisplay.textContent = "$0.00 spent";

    alert("Build cleared.");
  });
}
