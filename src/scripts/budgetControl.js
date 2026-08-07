import { setUserBudget } from "./budgetState.js";
import { currentBuild } from "./currentBuild.js";

export function initBudgetControls(runSearchCallback) {
  const slider = document.getElementById("budget-slider");
  const input = document.getElementById("budget-input");

  if (!slider || !input) {
    console.error("Budget controls not found in DOM.");
    return;
  }

  // Slider → Input
  slider.addEventListener("input", () => {
    const val = Number(slider.value);
    input.value = val;
    
    setUserBudget(val);
    runSearchCallback(val);
  });

  // Input → Slider
  input.addEventListener("input", () => {
    let val = Number(input.value);

    // Clamp 0–3000
    if (val < 0) val = 0;
    if (val > 3000) val = 3000;

    input.value = val;
    slider.value = val;

    setUserBudget(val);
    runSearchCallback(val);
  });
}

export function addPartControls() {
  const buildSlots = document.querySelectorAll(".build-part-slot");
  const spentDisplay = document.querySelector(".build-budget-spent");

  let totalSpent = 0;
  const currentPrices = {};

  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("add-part-btn")) return;

    const partType = e.target.dataset.part;
    const price = Number(e.target.dataset.price);

    const itemObj = JSON.parse(e.target.dataset.item);

    const slot = [...buildSlots].find(slot =>
      slot.querySelector(".build-part-label").textContent.trim() === partType
    );

    if (!slot) return;

    const oldPrice = currentPrices[partType] || 0;
    totalSpent -= oldPrice;

    // Add new price
    currentPrices[partType] = price;
    totalSpent += price;

    // Update UI
    slot.querySelector(".build-part-value").textContent = `$${price}`;
    spentDisplay.textContent = `$${totalSpent.toFixed(2)} spent`;

    currentBuild[partType] = itemObj;
  });
}

