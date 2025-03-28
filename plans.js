// rate card start
const rateCardsServices = [
    {
      name: "Cockroach Gel (Herbal)",
      warranty: "3 Months",
      prices: {
        "1RK": 600,
        "1BHK": 900,
        "2BHK": 1100,
        "3BHK": 1400,
        "4BHK": 1600,
        OTHER_RESI: "-",
        COMMERCIAL: "-",
      },
      category: "cockroach",
    },
    {
      name: "Cockroach Spray (Chemical)",
      warranty: "2 Months",
      prices: {
        "1RK": 900,
        "1BHK": 1200,
        "2BHK": 1400,
        "3BHK": 1800,
        "4BHK": 2000,
        OTHER_RESI: "-",
        COMMERCIAL: "-",
      },
      category: "cockroach",
    },
    {
      name: "Cockroach Gel (Korean)",
      warranty: "6 Months",
      prices: {
        "1RK": 1800,
        "1BHK": 2200,
        "2BHK": 2800,
        "3BHK": 3600,
        "4BHK": 4600,
        OTHER_RESI: "-",
        COMMERCIAL: "-",
      },
      category: "cockroach",
    },
    {
      name: "Ant Gel (Korean)",
      warranty: "6 Months",
      prices: {
        "1RK": 1400,
        "1BHK": 1800,
        "2BHK": 2300,
        "3BHK": 2800,
        "4BHK": 3400,
        OTHER_RESI: "-",
        COMMERCIAL: "-",
      },
      category: "ants",
    },
    {
      name: "Bedbugs",
      warranty: "3 Months",
      prices: {
        "1RK": 1800,
        "1BHK": 2400,
        "2BHK": 3000,
        "3BHK": 3600,
        "4BHK": 4000,
        OTHER_RESI: "-",
        COMMERCIAL: "-",
      },
      category: "bedbugs",
    },
    {
      name: "Rats",
      warranty: "No Warranty",
      prices: {
        "1RK": "5 Pads",
        "1BHK": "8 Pads",
        "2BHK": "12 Pads",
        "3BHK": "18 Pads",
        "4BHK": "24 Pads",
        OTHER_RESI: "-",
        COMMERCIAL: "-",
      },
      notes: "₹100 per pad + ₹200 visiting charge",
      category: "rats",
    },
    {
      name: "Termites",
      warranty: "5 Years",
      prices: {
        "1RK": "-",
        "1BHK": "-",
        "2BHK": "-",
        "3BHK": "-",
        "4BHK": "-",
        OTHER_RESI: "₹10 per SQFT",
        COMMERCIAL: "Contact Us",
      },
      category: "termites",
    },
    {
      name: "Mosquito Control",
      warranty: "1 Month",
      prices: {
        "1RK": "-",
        "1BHK": "-",
        "2BHK": "-",
        "3BHK": "-",
        "4BHK": "-",
        OTHER_RESI: "-",
        COMMERCIAL: "-",
      },
      category: "mosquito",
    },
    {
      name: "House Flies",
      warranty: "No Warranty",
      prices: {
        "1RK": "-",
        "1BHK": "-",
        "2BHK": "-",
        "3BHK": "-",
        "4BHK": "-",
        OTHER_RESI: "-",
        COMMERCIAL: "-",
      },
      category: "flies",
    },
    {
      name: "Snake Control",
      warranty: "No Warranty",
      prices: {
        "1RK": "-",
        "1BHK": "-",
        "2BHK": "-",
        "3BHK": "-",
        "4BHK": "-",
        OTHER_RESI: "-",
        COMMERCIAL: "-",
      },
      category: "snakes",
    },
    {
      name: "Honeybees",
      warranty: "No Warranty",
      prices: {
        "1RK": "-",
        "1BHK": "-",
        "2BHK": "-",
        "3BHK": "-",
        "4BHK": "-",
        OTHER_RESI: "-",
        COMMERCIAL: "Starts from ₹2500",
      },
      category: "bees",
    },
    {
      name: "Annual Contracts for Societies",
      warranty: "No Warranty",
      prices: {
        "1RK": "-",
        "1BHK": "-",
        "2BHK": "-",
        "3BHK": "-",
        "4BHK": "-",
        OTHER_RESI: "-",
        COMMERCIAL: "-",
      },
      category: "commercial",
    },
  ];
  
  const packages = [
    {
      name: "Home Shield Package",
      description: "For Common Household Pests",
      services: ["Cockroach Gel (Herbal)", "Ant Gel (Korean)", "Rats"],
      bestFor: "Homes with mild infestations",
      warranty: "3 Months",
      color: "#5D9796",
    },
    {
      name: "Sleep Safe Package",
      description: "For Bedbugs & Hidden Pests",
      services: ["Bedbugs", "Cockroach Gel (Korean)", "Rats"],
      bestFor: "Homes with bedbug problems",
      warranty: "6 Months",
      color: "#5D9796",
    },
    {
      name: "Termite Defense Package",
      description: "For Wooden & Structural Protection",
      services: ["Termites", "Ant Gel (Korean)", "Rats"],
      bestFor: "Wooden furniture, termite-prone areas",
      warranty: "5 Years (Termites)",
      color: "#5D9796",
    },
    {
      name: "Complete Pest Protection Package",
      description: "For Maximum Coverage",
      services: [
        "Cockroach Gel (Korean)",
        "Bedbugs",
        "Rats",
        "Ant Gel (Korean)",
        "Termites",
      ],
      bestFor: "Full-home protection against multiple pests",
      warranty: "1 Year",
      color: "#5D9796",
    },
  ];
  
  // DOM Elements
  const packageContainer = document.getElementById("package-container");
  const rateTableBody = document.getElementById("rate-table-body");
  const quoteServicesContainer = document.getElementById(
    "quote-services-container"
  );
  
  // Helper functions
  function categorizeServices() {
    const fixedRateServices = [];
    const quoteRequiredServices = [];
  
    rateCardsServices.forEach((service) => {
      const hasFixedRate = Object.values(service.prices).some(
        (price) =>
          typeof price === "number" ||
          (typeof price === "string" && !isNaN(parseInt(price)))
      );
  
      if (hasFixedRate) {
        fixedRateServices.push(service);
      } else {
        quoteRequiredServices.push(service);
      }
    });
  
    return { fixedRateServices, quoteRequiredServices };
  }
  
  function formatPrice(price) {
    if (price === "-") return "-";
    if (typeof price === "number") return "₹" + price;
    if (!isNaN(parseInt(price))) return price.includes("₹") ? price : "₹" + price;
    return price;
  }
  
  // Package Renderer
  function renderPackages() {
    if (!packageContainer) return;
  
    packageContainer.innerHTML = packages
      .map(
        (pkg) => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col h-full">
            <div class="bg-[${pkg.color}] text-white px-4 py-3 font-semibold">
                ${pkg.name}
            </div>
            <div class="p-5 flex-grow">
                <p class="text-[#1B515B] font-semibold mb-4">
                    ${pkg.description}
                </p>
                <div class="text-gray-600 text-m mb-4">
                  🏡 Best for: ${pkg.bestFor}
                </div>
                <ul class="space-y-1 mb-4 pl-5">
                    ${pkg.services
                      .map((service) => `<li>${service}</li>`)
                      .join("")}
                </ul>
            </div>
            <div class="px-5 pb-5">
                <span class="bg-[#6EAF9E] text-white text-xs px-2 py-1 rounded">
                    Warranty: ${pkg.warranty}
                </span>
            </div>
        </div>
      `
      )
      .join("");
  }
  
  // Rate Table Renderer
  function renderRateCard() {
    if (!rateTableBody) return;
  
    const { fixedRateServices, quoteRequiredServices } = categorizeServices();
  
    // Render fixed rate table
    rateTableBody.innerHTML = fixedRateServices
      .map(
        (service) => `
        <tr class="hover:bg-gray-50">
            <td class="px-4 py-3 text-[#1B515B] font-medium">${service.name}</td>
            <td class="px-4 py-3">${service.warranty}</td>
            <td class="px-4 py-3">${formatPrice(service.prices["1RK"])}</td>
            <td class="px-4 py-3">${formatPrice(service.prices["1BHK"])}</td>
            <td class="px-4 py-3">${formatPrice(service.prices["2BHK"])}</td>
            <td class="px-4 py-3">${formatPrice(service.prices["3BHK"])}</td>
            <td class="px-4 py-3">${formatPrice(service.prices["4BHK"])}</td>
            <td class="px-4 py-3">${formatPrice(
              service.prices["OTHER_RESI"]
            )}</td>
            <td class="px-4 py-3">${formatPrice(
              service.prices["COMMERCIAL"]
            )}</td>
        </tr>
        `
      )
      .join("");
  
    // Render quote required services as cards if container exists
    if (quoteServicesContainer) {
      quoteServicesContainer.innerHTML = quoteRequiredServices
        .map(
          (service) => `
          <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition p-4 border-l-4 border-[#5D9796]">
            <h3 class="text-lg font-semibold text-[#1B515B] mb-2">${
              service.name
            }</h3>
            <p class="text-gray-600 text-sm mb-2">${
              service.warranty !== "No Warranty"
                ? `Warranty: ${service.warranty}`
                : "No Warranty"
            }</p>
            <p class="text-gray-700">Price to be quoted after inspection</p>
            ${
              service.notes
                ? `<p class="text-sm text-gray-500 mt-2">${service.notes}</p>`
                : ""
            }
          </div>
        `
        )
        .join("");
    }
  }
  
  // Filter functionality
  function filterRateCard() {
    if (!document.getElementById("filter-btn")) return;
  
    // Remove existing dropdown if any
    const existingDropdown = document.getElementById("filter-dropdown");
    if (existingDropdown) existingDropdown.remove();
  
    // Get filter button position
    const filterBtn = document.getElementById("filter-btn");
    const btnRect = filterBtn.getBoundingClientRect();
  
    // Create dropdown container
    const dropdown = document.createElement("div");
    dropdown.id = "filter-dropdown";
    dropdown.className =
      "absolute bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-50";
    dropdown.style.top = `${btnRect.bottom + window.scrollY}px`;
    dropdown.style.left = `${btnRect.left + window.scrollX}px`;
  
    // Get available categories
    const { fixedRateServices } = categorizeServices();
    const categories = new Set();
    fixedRateServices.forEach((service) => {
      service.category
        .split(",")
        .forEach((cat) => categories.add(cat.trim().toLowerCase()));
    });
  
    // Create select element
    const select = document.createElement("select");
    select.className = "w-48 p-2 rounded-md";
    select.innerHTML = `
      <option value="">Select Pest Type</option>
      ${Array.from(categories)
        .map(
          (cat) => `
        <option value="${cat}">${
            cat.charAt(0).toUpperCase() + cat.slice(1)
          }</option>
      `
        )
        .join("")}
    `;
  
    // Create Apply button
    const applyBtn = document.createElement("button");
    applyBtn.className =
      "w-full bg-[#5D9796] text-white px-4 py-2 rounded-b-md hover:opacity-90";
    applyBtn.textContent = "Apply";
    applyBtn.onclick = () => {
      dropdown.remove();
      applyFilter(select.value);
    };
  
    // Assemble elements
    dropdown.appendChild(select);
    dropdown.appendChild(applyBtn);
    document.body.appendChild(dropdown);
  
    // Close dropdown when clicking outside
    const clickHandler = (e) => {
      if (!dropdown.contains(e.target) && e.target !== filterBtn) {
        dropdown.remove();
        document.removeEventListener("click", clickHandler);
      }
    };
    document.addEventListener("click", clickHandler);
  
    function applyFilter(filter) {
      if (!filter) return;
  
      const filteredServices = fixedRateServices.filter((service) =>
        service.category.toLowerCase().includes(filter.toLowerCase())
      );
  
      if (filteredServices.length === 0) {
        alert("No services found for this filter. Showing all services.");
        renderRateCard();
        return;
      }
  
      rateTableBody.innerHTML = filteredServices
        .map(
          (service) => `
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-3 text-[#1B515B] font-medium">${service.name}</td>
            <td class="px-4 py-3">${service.warranty}</td>
            <td class="px-4 py-3">${formatPrice(service.prices["1RK"])}</td>
            <td class="px-4 py-3">${formatPrice(service.prices["1BHK"])}</td>
            <td class="px-4 py-3">${formatPrice(service.prices["2BHK"])}</td>
            <td class="px-4 py-3">${formatPrice(service.prices["3BHK"])}</td>
            <td class="px-4 py-3">${formatPrice(service.prices["4BHK"])}</td>
            <td class="px-4 py-3">${formatPrice(
              service.prices["OTHER_RESI"]
            )}</td>
            <td class="px-4 py-3">${formatPrice(
              service.prices["COMMERCIAL"]
            )}</td>
          </tr>
        `
        )
        .join("");
    }
  }
  
  // Quote Calculator Functions
  function renderServiceCheckboxes() {
    const container = document.getElementById("services-checkbox-container");
    if (!container) return;
  
    container.innerHTML = rateCardsServices
      .map(
        (service) => `
          <div class="flex items-center mb-2">
              <input type="checkbox" id="service-${service.name.replace(
                /\s+/g,
                "-"
              )}" 
                     value="${service.name}" class="mr-2 service-checkbox">
              <label for="service-${service.name.replace(
                /\s+/g,
                "-"
              )}" class="text-sm">
                  ${service.name}
              </label>
          </div>
        `
      )
      .join("");
  }
  
  function toggleInputFields() {
    const propertyType = document.getElementById("property-type").value;
    const sqftContainer = document.getElementById("sqft-container");
    const roomsContainer = document.getElementById("rooms-container");
    const termiteChecked = document.querySelector("#service-Termites:checked");
  
    // Hide both initially
    sqftContainer.classList.add("hidden");
    roomsContainer.classList.add("hidden");
  
    if (propertyType === "OTHER_RESI") {
      roomsContainer.classList.remove("hidden");
      if (termiteChecked) {
        sqftContainer.classList.remove("hidden");
      }
    } else if (termiteChecked) {
      sqftContainer.classList.remove("hidden");
    }
  }
  
  function calculateQuote() {
    const propertyType = document.getElementById("property-type").value;
  
    // If Commercial is selected, show contact message
    if (propertyType === "COMMERCIAL") {
      const quoteDetails = document.getElementById("quote-details");
      const totalPrice = document.getElementById("total-price");
      const quoteResult = document.getElementById("quote-result");
  
      if (quoteDetails && totalPrice && quoteResult) {
        quoteDetails.innerHTML = `<p class="mb-1">Please contact us directly for commercial property services</p>`;
        totalPrice.textContent = "Contact Us";
        quoteResult.classList.remove("hidden");
      }
      return;
    }
  
    const sqftInput = document.getElementById("sqft-input");
    const roomsInput = document.getElementById("rooms-input");
    const sqft = parseInt(sqftInput?.value) || 0;
    const rooms =
      propertyType === "OTHER_RESI" ? parseInt(roomsInput?.value) || 8 : 0;
    const selectedServices = Array.from(
      document.querySelectorAll(".service-checkbox:checked")
    ).map((checkbox) => checkbox.value);
  
    if (selectedServices.length === 0) {
      alert("Please select at least one service");
      return;
    }
  
    // For "Other (Residential)", validate rooms
    if (propertyType === "OTHER_RESI" && rooms < 8) {
      alert("Minimum 8 rooms required for residential properties");
      return;
    }
  
    // For Termite service, validate sqft if selected
    const termiteChecked = selectedServices.includes("Termites");
    if (termiteChecked && sqft <= 0) {
      alert("Please enter valid area in square feet for Termite service");
      return;
    }
  
    let total = 0;
    let details = "";
  
    selectedServices.forEach((serviceName) => {
      const service = rateCardsServices.find((s) => s.name === serviceName);
      if (!service) return;
  
      let price = 0;
      let note = "";
  
      if (propertyType === "OTHER_RESI") {
        if (serviceName === "Termites") {
          price = 10 * sqft;
          note = ` (${sqft} sq.ft. × ₹10)`;
        } else if (serviceName === "Rats") {
          const padsPerRoom = 4;
          const totalPads = padsPerRoom * rooms;
          price = totalPads * 100 + 200;
          note = ` (${rooms} rooms × 4 pads × ₹100 + ₹200 visit)`;
        } else {
          price = 600 * rooms;
          note = ` (${rooms} rooms × ₹600)`;
        }
      } else {
        // Standard residential property pricing
        if (serviceName === "Rats") {
          const padCount = parseInt(service.prices[propertyType]) || 0;
          price = padCount * 100 + 200;
          note = ` (${padCount} pads × ₹100 + ₹200 visit)`;
        } else if (serviceName === "Termites") {
          price = 10 * sqft;
          note = ` (${sqft} sq.ft. × ₹10)`;
        } else if (service.prices[propertyType] === "-") {
          details += `<p class="mb-1 text-gray-500">${serviceName}: Contact for pricing</p>`;
          return;
        } else {
          price = parseInt(service.prices[propertyType]) || 0;
        }
      }
  
      details += `<p class="mb-1">${serviceName}: ₹${price}${note}</p>`;
      total += price;
    });
  
    const quoteDetails = document.getElementById("quote-details");
    const totalPrice = document.getElementById("total-price");
    const quoteResult = document.getElementById("quote-result");
  
    if (quoteDetails && totalPrice && quoteResult) {
      quoteDetails.innerHTML = details;
      totalPrice.textContent = total;
      quoteResult.classList.remove("hidden");
    }
  }
  // Initialize everything when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    // Initialize property type dropdown
    const propertyTypeSelect = document.getElementById("property-type");
    if (propertyTypeSelect) {
      propertyTypeSelect.innerHTML = `
        <option value="1RK">1RK</option>
        <option value="1BHK">1BHK</option>
        <option value="2BHK">2BHK</option>
        <option value="3BHK">3BHK</option>
        <option value="4BHK">4BHK</option>
        <option value="OTHER_RESI">Other (Residential)</option>
        <option value="COMMERCIAL">Commercial</option>
      `;
    }
  
    // Render all components
    renderPackages();
    renderRateCard();
    renderServiceCheckboxes();
  
    // Initialize event listeners
    const propertyType = document.getElementById("property-type");
    const calculateBtn = document.getElementById("calculate-btn");
    const filterBtn = document.getElementById("filter-btn");
    const servicesContainer = document.getElementById(
      "services-checkbox-container"
    );
  
    if (propertyType && servicesContainer) {
      propertyType.addEventListener("change", toggleInputFields);
      servicesContainer.addEventListener("change", toggleInputFields);
    }
  
    if (calculateBtn) {
      calculateBtn.addEventListener("click", calculateQuote);
    }
  
    if (filterBtn) {
      filterBtn.addEventListener("click", filterRateCard);
    }
  });
  // rate card end