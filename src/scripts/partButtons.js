import { createListingCard } from "./cardRender"
import { PART_CONFIG } from "./config/partsConfig.js"
import { fetchAndRenderListings } from "./fetchListings.js";
import { sidebarItems, listingsTitle, listingsCount, listingsList, platformToggleContainer } from "../main.js";
import { renderPlatformToggle } from "./platformToggle.js";

// MAIN ENTRY
export function setActivePart(partName) {
  sidebarItems.forEach(item =>
    item.classList.remove("sidebar-item--active")
  );

  const clickedItem = [...sidebarItems].find(
    item => item.textContent.trim().toLowerCase() === partName.toLowerCase()
  );

  if (clickedItem) {
    clickedItem.classList.add("sidebar-item--active");
  }

  updateListingsForPart(partName);
}

// UPDATE LISTINGS HEADER + TOGGLE
function updateListingsForPart(partName) {
  switch (partName) {
    case "CPU":
      listingsTitle.textContent = "Processor";
      break;
    case "GPU":
      listingsTitle.textContent = "Graphics Card";
      break;
    case "MOBO":
      listingsTitle.textContent = "Motherboard";
    default:
      listingsTitle.textContent = partName.toUpperCase();
  }
  listingsCount.textContent = "";
  listingsList.innerHTML = "";
  platformToggleContainer.innerHTML = "";

  if (partName === "CPU" || partName === "GPU" || partName === "MOBO") {
    renderPlatformToggle(partName);
  }
}