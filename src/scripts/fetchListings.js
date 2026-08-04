import { listingsList, listingsCount} from "../main.js";
import { createListingCard } from "./cardRender.js";
import { USER_BUDGET } from "./budgetState.js";

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

    const listings = data.listings || [];

    listingsCount.textContent = `${listings.length} listings`;
    listingsList.innerHTML = "";

    listings.forEach(item => {
      listingsList.appendChild(createListingCard(item, partName));
    });

  } catch (err) {
    console.error("FETCH LISTINGS ERROR:", err);
    listingsCount.textContent = "Error loading listings";
  }
}