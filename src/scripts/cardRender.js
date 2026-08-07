export function createListingCard(item, currentPart) {
  const card = document.createElement("div");
  card.className = "listing-card";

  // MAIN SECTION
  const main = document.createElement("div");
  main.className = "listing-main";

  const titleLink = document.createElement("a");
  titleLink.href = item.link;
  titleLink.className = "listing-title";

  const title = document.createElement("div");
  title.textContent = item.title || "Unknown item";

  titleLink.appendChild(title);

  const specs = document.createElement("div");
  specs.className = "listing-specs";
  specs.textContent = item.shortDescription || "";

  main.appendChild(titleLink);
  main.appendChild(specs);

  // META SECTION
  const meta = document.createElement("div");
  meta.className = "listing-meta";

  const condition = document.createElement("div");
  condition.className = "listing-condition";
  condition.textContent = `Condition: ${item.condition || "Unknown"}`;

  const seller = document.createElement("div");
  seller.className = "listing-seller";
  seller.textContent = `Seller: ${item.seller?.username || "@unknown"}`;

  const sellerRating = document.createElement("div");
  sellerRating.className = "listing-seller-rating";
  sellerRating.textContent = `Seller Rating: ${item.seller?.feedbackPercentage !== null ? `${item.seller.feedbackPercentage}%` : "N/A"}`;
  seller.appendChild(sellerRating);

  const age = document.createElement("div");
  age.className = "listing-age";
  age.textContent = item.itemCreationDate
    ? `Listed ${formatAge(item.itemCreationDate)} ago`
    : "";

  meta.appendChild(condition);
  meta.appendChild(seller);
  meta.appendChild(age);

  // PRICE SECTION
  const price = document.createElement("div");
  price.className = "listing-price";
  const priceObj = item.price;
  price.textContent = priceObj
    ? `$${priceObj.value}`
    : "$?";

  // IMAGE (fixed width)
  if (item.image) {
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.title || "Listing image";
    img.className = "listing-image";
    card.appendChild(img);
  }

  const addBtn = document.createElement("button");
  addBtn.className = "add-part-btn add-btn";
  addBtn.textContent = "+";

  addBtn.dataset.part = currentPart;
  addBtn.dataset.price = item.price?.value || 0;

  // Assemble card
  card.appendChild(main);
  card.appendChild(meta);
  card.appendChild(price);
  card.appendChild(addBtn);

  addBtn.dataset.item = JSON.stringify(item);

  return card;
}