export function createListingCard(item) {
  const card = document.createElement("div");
  card.className = "listing-card";

  // MAIN SECTION
  const main = document.createElement("div");
  main.className = "listing-main";

  const title = document.createElement("div");
  title.className = "listing-title";
  title.textContent = item.title || "Unknown item";

  const specs = document.createElement("div");
  specs.className = "listing-specs";
  specs.textContent = item.shortDescription || "";

  main.appendChild(title);
  main.appendChild(specs);

  // META SECTION
  const meta = document.createElement("div");
  meta.className = "listing-meta";

  const condition = document.createElement("div");
  condition.className = "listing-condition";
  condition.textContent = `Condition: ${item.condition || "Unknown"}`;

  const seller = document.createElement("div");
  seller.className = "listing-seller";
  seller.textContent = item.seller?.username
    ? `@${item.seller.username}`
    : "@unknown";

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

  // Assemble card
  card.appendChild(main);
  card.appendChild(meta);
  card.appendChild(price);

  return card;
}