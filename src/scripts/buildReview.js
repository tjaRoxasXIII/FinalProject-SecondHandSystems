// buildReview.js
import { loadBuilds } from "./currentBuild.js";

let currentViewedBuild = null;

export function renderSavedBuilds() {
  const sidebarList = document.querySelector(".sidebar-list");
  const builds = loadBuilds();

  sidebarList.innerHTML = "";

  builds.forEach((build, index) => {
    const li = document.createElement("li");
    li.className = "sidebar-item";
    li.textContent = build.name;
    li.dataset.index = index;

    li.addEventListener("click", () => {
      document.querySelectorAll(".sidebar-item").forEach(i => i.classList.remove("active"));
      li.classList.add("active");

      renderBuildCards(build);
    });

    sidebarList.appendChild(li);
  });

  // Optional: auto-load first build
  if (builds.length > 0) {
    sidebarList.firstChild.classList.add("active");
    renderBuildCards(builds[0]);
  }
}

export function renderBuildCards(build) {
  const grid = document.querySelector(".builds-grid");
  const emptyMsg = document.querySelector(".listings-list-empty");
  const emailArea = document.querySelector(".email-send-area");

  currentViewedBuild = build;

  grid.innerHTML = "";
  emptyMsg.style.display = "none";

  // Show email area
  emailArea.hidden = false;

  Object.entries(build.parts).forEach(([partType, partObj]) => {
    if (!partObj) return;

    const price = Number(partObj.price?.value) || 0;

    const card = document.createElement("div");
    card.className = "build-part-card";

    card.innerHTML = `
      <div class="build-part-card-title">${partType}</div>
      <div class="build-part-card-name">${partObj.title || partObj.name}</div>
      <div class="build-part-card-price">$${price.toFixed(2)}</div>
    `;

    grid.appendChild(card);
  });
}


export function getCurrentViewedBuild() {
  return currentViewedBuild;
}
