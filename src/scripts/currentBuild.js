// Holds the currently active build before saving
export const currentBuild = {
  CPU: null,
  GPU: null,
  RAM: null,
  MOBO: null,
  PSU: null,
  CASE: null,
  COOLER: null,
  STORAGE: null,
};

// Save a completed build to localStorage
export function saveBuild(buildName) {
  const savedBuilds = JSON.parse(localStorage.getItem("savedBuilds")) || [];

  const newBuild = {
    name: buildName,
    timestamp: Date.now(),
    parts: { ...currentBuild },
  };

  savedBuilds.push(newBuild);
  localStorage.setItem("savedBuilds", JSON.stringify(savedBuilds));
}

// Load all builds
export function loadBuilds() {
  return JSON.parse(localStorage.getItem("savedBuilds")) || [];
}
