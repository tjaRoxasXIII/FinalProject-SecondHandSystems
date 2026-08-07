import { fetchAndRenderListings } from "./fetchListings.js";
import { PART_CONFIG } from "./config/partsConfig.js";
import { platformToggleContainer } from "../main.js";

export function renderPlatformToggle(partName) {
  const config = PART_CONFIG[partName];
  if (!config) return;

  const choiceBtn1 = document.createElement("button");
  const choiceBtn2 = document.createElement("button");

  choiceBtn1.className = "btn btn-secondary";
  choiceBtn2.className = "btn btn-secondary";

  choiceBtn1.textContent = config.choices[0].label;
  choiceBtn2.textContent = config.choices[1].label;

  choiceBtn1.addEventListener("click", () =>
    fetchAndRenderListings(
      partName,
      config.choices[0].search,
      config.categoryId,
    ),
  );

  choiceBtn2.addEventListener("click", () =>
    fetchAndRenderListings(
      partName,
      config.choices[1].search,
      config.categoryId,
    ),
  );

  platformToggleContainer.appendChild(choiceBtn1);
  platformToggleContainer.appendChild(choiceBtn2);
}
