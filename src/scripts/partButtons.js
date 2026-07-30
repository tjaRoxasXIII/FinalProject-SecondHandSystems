const sidebarItems = document.querySelectorAll('.sidebar-item');

function setActivePart(partName) {
  sidebarItems.forEach(item => item.classList.remove('sidebar-item--active'));

  const clickedItem = [...sidebarItems].find(
    item => item.textContent.trim().toLowerCase() === partName.toLowerCase()
  );

  if (clickedItem) {
    clickedItem.classList.add('sidebar-item--active');
  }

  updateListingsForPart(partName);
}

function updateListingsForPart(partName) {
  console.log(`Updating listings for: ${partName}`);

  const listingsTitle = document.querySelector('.listings-title');
  const listingsCount = document.querySelector('.listings-count');

  if (listingsTitle) {
    switch(partName) {
      case "CPU":
        listingsTitle.innerHTML = "PROCESSOR";  
        break;
      case "GPU":
        listingsTitle.innerHTML = "GRAPHICS CARD";  
        break;
      case "MOBO":
        listingsTitle.innerHTML = "MOTHERBOARD";  
        break;
      case "PSU":
        listingsTitle.innerHTML = "POWER SUPPLY"; 
        break;
      default:
        listingsTitle.innerHTML = partName.toUpperCase();
    }
  }
}

function handlePartClick(partName) {
  setActivePart(partName);
}

sidebarItems.forEach(item => {
  item.addEventListener('click', () => {
    const partName = item.textContent.trim();
    handlePartClick(partName);
  });
});
