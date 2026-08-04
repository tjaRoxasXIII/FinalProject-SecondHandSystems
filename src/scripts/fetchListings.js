import { listingsList, listingsCount, listingsSort} from "../main.js";
import { createListingCard } from "./cardRender.js";
import { USER_BUDGET } from "./budgetState.js";
import { sortListings} from "./sortListings.js";

let listings = [];

export async function fetchAndRenderListings(partName, platform, categoryId) {
  listingsList.innerHTML = "";
  listingsCount.textContent = "Loading…";

  const params = new URLSearchParams({
    part: partName,
    platform,
    budget: USER_BUDGET,
    limit: 50
  });

  try {
    const response = await fetch(
      `https://finalproject-secondhandsystems.onrender.com/search-part?${params.toString()}&category_ids=${categoryId}&limit=50`
    );

    const data = await response.json();

    if (data.error) {
      listingsCount.textContent = "Error loading listings";
      console.error(data.error);
      return;
    }

    listings = data.listings || [];

    listingsCount.textContent = `${listings.length} listings`;
    listingsList.innerHTML = "";
    listingsSort.hidden = false;

    renderListings(listings, partName);

    listingsSort.onchange = (e) => {
      const mode = e.target.value;
      const sorted = sortListings(listings, mode);
      renderListings(sorted, partName);
    };

  } catch (err) {
    console.error("FETCH LISTINGS ERROR:", err);
    listingsCount.textContent = "Error loading listings";
  }
}

function renderListings(list, partName) {
  listingsList.innerHTML = "";
  list.forEach(item => {
    listingsList.appendChild(createListingCard(item, partName));
  });
}
