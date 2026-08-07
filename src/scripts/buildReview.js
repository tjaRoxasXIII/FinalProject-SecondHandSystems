// buildReview.js
import { loadBuilds } from "./buildState.js";

export function renderSavedBuilds() {
  const sidebarList = document.querySelector(".sidebar-list");
  const grid = document.querySelector(".builds-grid");

  const builds = loadBuilds();

  sidebarList.innerHTML = "";
  grid.innerHTML = "";

  if (builds.length === 0) {
    grid.innerHTML = "<p>No saved builds yet.</p>";
    return;
  }

  // Populate sidebar with build names
  builds.forEach((build, index) => {
    const li = document.createElement("li");
    li.className = "sidebar-item";
    li.textContent = build.name;
    li.dataset.index = index;

    li.addEventListener("click", () => {
      renderBuildCards(build);
    });

    sidebarList.appendChild(li);
  });

  // Auto-load first build
  renderBuildCards(builds[0]);
}

function renderBuildCards(build) {
  const grid = document.querySelector(".builds-grid");
  grid.innerHTML = "";

  Object.entries(build.parts).forEach(([partType, partObj]) => {
    if (!partObj) return;

    const card = document.createElement("div");
    card.className = "build-part-card";

    card.innerHTML = `
      <div class="build-part-card-title">${partType}</div>
      <div class="build-part-card-name">${partObj.title || partObj.name}</div>
      <div class="build-part-card-price">$${(partObj.price?.value || 0).toFixed(2)}</div>
    `;

    grid.appendChild(card);
  });
}
