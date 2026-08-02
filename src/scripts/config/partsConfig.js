export const PART_CONFIG = {
  CPU: {
    choices: [
      { label: "AMD", search: "Ryzen" },
      { label: "Intel", search: "Intel" }
    ],
    categoryId: 164
  },

  MOBO: {
    choices: [
      { label: "AMD Boards", search: "AM4 motherboard" },
      { label: "Intel Boards", search: "LGA motherboard" }
    ],
    categoryId: 1244
  },

  GPU: {
    choices: [
      { label: "Nvidia", search: "Nvidia" },
      { label: "AMD", search: "Radeon" }
    ],
    categoryId: 27386
  },
  RAM: {
    choices: [
      { label: "DDR4", search: "DDR4 RAM" },
      { label: "DDR5", search: "DDR5 RAM" }
    ],
    categoryId: 170083
  },

  "SSD/HDD": {
    choices: [
      { label: "SATA SSD", search: "SATA SSD" },
      { label: "NVMe SSD", search: "NVMe SSD" }
    ],
    categoryId: 175669
  },
  PSU: {
    choices: [
      { label: "Standard PSU", search: "PC power supply" }
    ],
    categoryId: 42017
  },
  CASE: {
    choices: [
      { label: "ATX Case", search: "ATX PC case" },
      { label: "MicroATX Case", search: "MicroATX PC case" },
      { label: "Mini-ITX Case", search: "Mini-ITX PC case" }
    ],
    categoryId: 42014
  },
  COOLER: {
    choices: [
      { label: "Air Cooler", search: "CPU air cooler" },
      { label: "Liquid Cooler", search: "CPU AIO cooler" }
    ],
    categoryId: 175675
  }

};