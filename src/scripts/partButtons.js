import { createListingCard } from "./cardRender"

const sidebarItems = document.querySelectorAll(".sidebar-item");
const listingsTitle = document.querySelector(".listings-title");
const listingsCount = document.querySelector(".listings-count");
const listingsList = document.querySelector(".listings-list");
const platformToggleContainer = document.querySelector(".listings-platform-toggle");

const USER_BUDGET = 600;

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
    default:
      listingsTitle.textContent = partName.toUpperCase();
  }
  listingsCount.textContent = "";
  listingsList.innerHTML = "";
  platformToggleContainer.innerHTML = "";

  if (partName === "CPU" || partName === "GPU") {
    renderPlatformToggle(partName);
  }
}

// AMD / INTEL BUTTONS
function renderPlatformToggle(partName) {
  const amdBtn = document.createElement("button");
  amdBtn.textContent = "AMD";
  amdBtn.className = "btn btn-secondary";

  const intelBtn = document.createElement("button");
  intelBtn.textContent = "Intel";
  intelBtn.className = "btn btn-secondary";

  amdBtn.addEventListener("click", () =>
    fetchAndRenderListings(partName, "Ryzen")
  );

  intelBtn.addEventListener("click", () =>
    fetchAndRenderListings(partName, "Intel")
  );

  platformToggleContainer.appendChild(amdBtn);
  platformToggleContainer.appendChild(intelBtn);
}

// FETCH + RENDER LISTINGS
async function fetchAndRenderListings(partName, platform) {
  listingsList.innerHTML = "";
  listingsCount.textContent = "Loading…";

  const params = new URLSearchParams({
    part: partName,
    platform,
    budget: USER_BUDGET
  });

  try {
    const response = await fetch(`http://localhost:3001/search-part?${params.toString()}&category_ids=164`);
    const data = await response.json();
    console.log(data);

    if (data.error) {
      listingsCount.textContent = "Error loading listings";
      console.error(data.error);
      return;
    }

    const listings = data.listings || [];

    listingsCount.textContent = `${listings.length} listings`;
    listingsList.innerHTML = "";

    listings.forEach(item => {
      listingsList.appendChild(createListingCard(item));
    });

  } catch (err) {
    console.error("FETCH LISTINGS ERROR:", err);
    listingsCount.textContent = "Error loading listings";
  }
}

// SIDEBAR CLICK HANDLER
sidebarItems.forEach(item => {
  item.addEventListener("click", () => {
    const partName = item.textContent.trim();
    setActivePart(partName);
  });
});