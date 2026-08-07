export function sortListings(list, mode) {
  if (!mode) return list;

  return [...list].sort((a, b) => {
    const priceA = a.price?.value || a.final_price || 0;
    const priceB = b.price?.value || b.final_price || 0;

    if (mode === "price-low") return priceA - priceB;
    if (mode === "price-high") return priceB - priceA;

    return 0;
  });
}
