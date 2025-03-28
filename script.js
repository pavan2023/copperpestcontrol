// Spline code Start
window.onload = function () {
  var splineViewer = document.querySelector("spline-viewer");
  if (splineViewer && splineViewer.shadowRoot) {
    var logo = splineViewer.shadowRoot.querySelector("#logo");
    if (logo) logo.remove();
  }
};
// Spline code End

// Component reusable code start
function loadContent(section, file, callback) {
  fetch(file)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Failed to load ${file}: ${response.status}`);
      return response.text();
    })
    .then((data) => {
      document.getElementById(section).innerHTML = data;
      if (callback) callback(); // Run callback after content is loaded
    })
    .catch((error) => console.error(`Error loading ${file}:`, error));
}

document.addEventListener("DOMContentLoaded", () => {
  loadContent("navbar", "navbar.html", attachMenuToggle);
  loadContent("footer", "footer.html", updateYear); // Ensure year updates after footer loads
});
// Component reusable code end

// Year update code start
function updateYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  } else {
    console.error("Year span not found! Footer might not have loaded.");
  }
}
// Year update code end

// Navbar toggle function start
function attachMenuToggle() {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
      // Toggle slide-in effect
      menu.classList.toggle("translate-x-0");
      menu.classList.toggle("-translate-x-full"); // Fixed direction
      menu.classList.toggle("opacity-100");
      menu.classList.toggle("opacity-0");

      // Toggle hamburger animation
      const lines = this.querySelectorAll(".line");
      lines[0].classList.toggle("rotate-45");
      lines[0].classList.toggle("translate-y-[8px]");
      lines[1].classList.toggle("opacity-0");
      lines[2].classList.toggle("-rotate-45");
      lines[2].classList.toggle("-translate-y-[8px]");
    });
  }
}
document.addEventListener("DOMContentLoaded", attachMenuToggle);
// Navbar toggle function end

// form functionality start
document.addEventListener("DOMContentLoaded", function () {
  // Rates Chart
  const rates = {
    "cockroach-herbal": {
      "1RK": 600,
      "1BHK": 900,
      "2BHK": 1100,
      "3BHK": 1400,
      "4BHK": 1600,
    },
    "cockroach-chemical": {
      "1RK": 900,
      "1BHK": 1200,
      "2BHK": 1400,
      "3BHK": 1800,
      "4BHK": 2000,
    },
    "cockroach-korean": {
      "1RK": 1800,
      "1BHK": 2200,
      "2BHK": 2800,
      "3BHK": 3600,
      "4BHK": 4600,
    },
    "ant-gel": {
      "1RK": 1400,
      "1BHK": 1800,
      "2BHK": 2300,
      "3BHK": 2800,
      "4BHK": 3400,
    },
    bedbugs: {
      "1RK": 1800,
      "1BHK": 2400,
      "2BHK": 3000,
      "3BHK": 3600,
      "4BHK": 4000,
    },
    rats: {
      pad_price: 100,
      "1RK": 5,
      "1BHK": 8,
      "2BHK": 12,
      "3BHK": 18,
      "4BHK": 24,
    },
    termites: "Inspection required (₹10 per SQFT)",
    mosquito: "Inspection required",
    "house-flies": "Inspection required",
    snake: "Inspection required",
    honeybees: "Starts from ₹2500",
    "annual-contract": "Inspection required",
  };

  // DOM Elements
  const propertySize = document.getElementById("property-size");
  const serviceType = document.getElementById("service-type");
  const packageOptions = document.getElementById("package-options");
  const singleService = document.getElementById("single-service");
  const totalPriceElement = document.getElementById("totalPrice");
  const packageSelection = document.getElementById("package-selection");
  const singleSelection = document.getElementById("single-selection");
  const otherPropertySizeInput = document.getElementById(
    "otherPropertySizeInput"
  );

  // Toggle Service Selection UI
  serviceType.addEventListener("change", function () {
    if (serviceType.value === "package") {
      packageSelection.style.display = "block";
      singleSelection.style.display = "none";
    } else {
      packageSelection.style.display = "none";
      singleSelection.style.display = "block";
    }
    calculateTotalPrice();
  });

  // Calculate Total Price
  function calculateTotalPrice() {
    let totalPrice = 0;
    let size = propertySize.value;
    let messageServices = [];

    if (size === "other") {
      totalPriceElement.textContent = "Inspection required";
      return; // Exit the function immediately
    }

    if (!size) {
      totalPriceElement.textContent = "Total Price: Select Property Size";
      return;
    }

    let selectedServices = [];
    if (serviceType.value === "package") {
      selectedServices = Array.from(
        document.querySelectorAll("#package-options input:checked")
      ).map((cb) => cb.value);
    } else {
      let service = singleService.value;
      if (service) selectedServices.push(service);
    }

    selectedServices.forEach((service) => {
      if (rates[service]) {
        if (typeof rates[service] === "string") {
          messageServices.push(`${service}: ${rates[service]}`);
        } else if (service === "rats") {
          totalPrice += rates.rats[size] * rates.rats.pad_price;
        } else {
          totalPrice += rates[service][size] || 0;
        }
      }
    });

    if (messageServices.length > 0) {
      totalPriceElement.textContent = messageServices.join(", ");
    } else if (totalPrice > 0) {
      totalPriceElement.textContent = `Total Price: ₹${totalPrice}`;
    } else {
      // Check if a service has been selected
      if (serviceType.value === "single" && !singleService.value && size) {
        totalPriceElement.textContent = "Please select a service.";
      } else if (
        serviceType.value === "package" &&
        document.querySelectorAll("#package-options input:checked").length ===
          0 &&
        size
      ) {
        totalPriceElement.textContent = "Please select a service.";
      } else if (!size) {
        totalPriceElement.textContent = "Please select a property size.";
      }
    }
  }

  // Attach event listeners for price calculation
  propertySize.addEventListener("change", function () {
    if (propertySize.value === "other") {
      otherPropertySizeInput.classList.remove("hidden");
    } else {
      otherPropertySizeInput.classList.add("hidden");
    }
    calculateTotalPrice();
  });

  serviceType.addEventListener("change", calculateTotalPrice);
  singleService.addEventListener("change", calculateTotalPrice);
  packageOptions.addEventListener("input", calculateTotalPrice);
});
// form functionality end

// form date issue fix
document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("preferredDate");

  dateInput.addEventListener("focus", function () {
    this.style.color = "#000"; // Text color on focus
  });

  dateInput.addEventListe1ner("blur", function () {
    if (!this.value) {
      this.style.color = "#9CA3AF"; // Placeholder color when empty
    }
  });
});
// form date issue fix

// services scroll and animation start
document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.querySelector(".scrollContainer");
  let autoScroll;

  if (scrollContainer) {
    const prevArrow = document.createElement("div");
    prevArrow.innerHTML = "&#x23F4;";
    prevArrow.id = "prevArrow";
    prevArrow.className =
      "absolute left-2 top-1/2 -translate-y-[84%] text-6xl text-[#1B515B] cursor-pointer transition-transform transform hover:scale-110 active:scale-125 z-10";
    prevArrow.style.display = "none";
    scrollContainer.parentElement.appendChild(prevArrow);

    const nextArrow = document.createElement("div");
    nextArrow.innerHTML = "&#x23F5;";
    nextArrow.id = "nextArrow";
    nextArrow.className =
      "absolute right-2 top-1/2 -translate-y-[84%] text-6xl text-[#1B515B] cursor-pointer transition-transform transform hover:scale-110 active:scale-125 z-10";
    scrollContainer.parentElement.appendChild(nextArrow);

    scrollContainer.addEventListener("wheel", (event) => {
      event.preventDefault();
      scrollContainer.scrollLeft += event.deltaY;
    });

    function startAutoScroll() {
      stopAutoScroll();
      autoScroll = setInterval(() => {
        scrollContainer.scrollLeft += 2;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }, 20);
    }

    function stopAutoScroll() {
      clearInterval(autoScroll);
    }

    scrollContainer.addEventListener("mouseenter", stopAutoScroll);
    scrollContainer.addEventListener("mouseleave", startAutoScroll);
    ["touchstart", "mousedown"].forEach((event) => {
      scrollContainer.addEventListener(event, stopAutoScroll);
    });
    ["touchend", "mouseup"].forEach((event) => {
      scrollContainer.addEventListener(event, startAutoScroll);
    });

    const scrollAmount = 300;
    prevArrow.addEventListener("click", () => {
      scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      stopAutoScroll();
    });
    nextArrow.addEventListener("click", () => {
      scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
      stopAutoScroll();
    });

    function updateArrows() {
      prevArrow.style.display =
        scrollContainer.scrollLeft > 0 ? "block" : "none";
      nextArrow.style.display =
        scrollContainer.scrollLeft + scrollContainer.clientWidth <
        scrollContainer.scrollWidth
          ? "block"
          : "none";
    }

    scrollContainer.addEventListener("scroll", updateArrows);
    updateArrows();

    startAutoScroll();
  }
});
// services scroll and animation End

// services dynamic card generator start
document.addEventListener("DOMContentLoaded", function () {
  const services = [
    { name: "Ant Control Service", img: "./src/img/pests/ant.png" },
    { name: "Bee Control Service", img: "./src/img/pests/bee.png" },
    { name: "Bedbug Control Service", img: "./src/img/pests/bedbug.png" },
    { name: "Cockroach Control Service", img: "./src/img/pests/cockroach.png" },
    { name: "Mosquito Control Service", img: "./src/img/pests/mosquito.png" },
    { name: "Rat Control Service", img: "./src/img/pests/rat.png" },
    { name: "Snake Control Service", img: "./src/img/pests/snake.png" },
    { name: "Termite Control Service", img: "./src/img/pests/termite.png" },
  ];

  const serviceContainer = document.getElementById("serviceContainer");

  function createServiceCards() {
    services.forEach((service) => {
      const card = document.createElement("div");
      card.className =
        "service-card h-110 lg:h-80 w-80 lg:w-120 bg-blue-50 rounded-4xl p-6 flex flex-col lg:flex-row justify-center items-center shadow-lg flex-shrink-0 gap-4 cursor-pointer";

      card.innerHTML = `
          <img class="w-32 lg:w-40 object-contain flex-shrink-0" src="${service.img}" alt="${service.name}">
          <div class="text-center lg:text-left">
              <strong class="block mx-auto py-2 text-2xl">${service.name}</strong>
              <button class="bg-[#1B515B] hover:bg-[#5D9796] text-white hover:text-zinc-100 font-bold py-2 px-4 rounded-full mt-4">
                  Get More Info
              </button>
          </div>
      `;

      card.addEventListener("click", function () {
        document.getElementById("modalTitle").innerText = service.name;
        document.getElementById("serviceModal").classList.remove("hidden");
      });

      serviceContainer.appendChild(card);
    });
  }

  createServiceCards();
  createServiceCards(); // Duplicate for infinite scroll

  document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("serviceModal").classList.add("hidden");
  });

  function resetScroll() {
    if (serviceContainer.scrollLeft >= serviceContainer.scrollWidth / 2) {
      serviceContainer.scrollLeft = 0;
    }
    requestAnimationFrame(resetScroll);
  }
  resetScroll();
});
// services dynamic card generator end

// services onclick info model start
document.addEventListener("DOMContentLoaded", function () {
  // Rate Chart Data
  const services = {
    "Ant Control Service": {
      price: "₹1400 - ₹3400",
      warranty: "6 Months",
      covered:
        "Advanced herbal gel application for long-term ant prevention. Odorless & safe for homes.",
      notCovered: "Cleaning of treated areas and deep sanitation.",
    },
    "Bee Control Service": {
      price: "Starts from ₹2500",
      warranty: "No Warranty",
      covered:
        "Expert hive removal with minimal disruption. Relocation when possible.",
      notCovered: "Structural repairs or wall patching after hive removal.",
    },
    "Bedbug Control Service": {
      price: "₹1800 - ₹4000",
      warranty: "3 Months",
      covered:
        "Two-step treatment for complete elimination of bedbugs and eggs. Safe for furniture & mattresses.",
      notCovered: "Deep furniture cleaning or upholstery treatment.",
    },
    "Cockroach Control Service": {
      price: "₹600 - ₹4600",
      warranty: "2 to 6 Months (varies by treatment)",
      covered:
        "Highly effective gel & spray-based treatment targeting hidden infestations.",
      notCovered: "Post-treatment cleanup or grease removal from surfaces.",
    },
    "Mosquito Control Service": {
      price: "Quoted upon inspection",
      warranty: "1 Month",
      covered:
        "Indoor and outdoor fogging to drastically reduce mosquito presence.",
      notCovered: "Guaranteed 100% elimination due to external factors.",
    },
    "Rat Control Service": {
      price: "₹100 per pad + ₹200 visiting charges",
      warranty: "No Warranty",
      covered:
        "Strategic placement of glue traps and bait stations for effective rodent control.",
      notCovered: "Dead rodent disposal or permanent entry point sealing.",
    },
    "Snake Control Service": {
      price: "Quoted upon inspection",
      warranty: "No Warranty",
      covered:
        "Safe, humane snake capture and relocation by trained professionals.",
      notCovered: "Sealing of snake entry points or preventive treatments.",
    },
    "Termite Control Service": {
      price: "₹10 per SQFT",
      warranty: "5 Years",
      covered:
        "Drill, fill, and seal method for deep termite control and long-term protection.",
      notCovered: "Repairs for termite-damaged wood or structures.",
    },
  };

  // Get all service cards
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("click", function () {
      let serviceName = this.querySelector("strong").innerText;

      // Get the corresponding service details
      let serviceData = services[serviceName];

      if (serviceData) {
        document.getElementById("modalTitle").innerText = serviceName;
        document.getElementById(
          "modalPrice"
        ).innerText = `Price: ${serviceData.price}`;
        document.getElementById(
          "modalWarranty"
        ).innerText = `Warranty: ${serviceData.warranty}`;
        document.getElementById(
          "modalCovered"
        ).innerText = `✔ ${serviceData.covered}`;
        document.getElementById(
          "modalNotCovered"
        ).innerText = `✖ ${serviceData.notCovered}`;
        document.getElementById("serviceModal").classList.remove("hidden");
      }
    });
  });

  // Close modal on close button
  document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("serviceModal").classList.add("hidden");
  });

  // Close modal when clicking outside of the modal box
  document
    .getElementById("serviceModal")
    .addEventListener("click", function (event) {
      if (event.target === this) {
        // Only close if the background is clicked
        this.classList.add("hidden");
      }
    });
});
// services onclick info model end

// services details dynamic card generator start
// Service data
const services = [
  {
    title: "Herbal Gel Cockroach Treatment",
    method: "Herbal Gel Treatment",
    warranty: "3 Months",
    pricing: "₹600 - ₹1600",
    process: [
      "Inspection: Identify infestation areas.",
      "Treatment: Apply herbal gel in key locations.",
      "Follow-up: Re-apply if needed.",
    ],
    precautions: [
      "Keep away from children & pets.",
      "Avoid applying near food surfaces.",
      "Wash hands after application.",
    ],
    bestFor: "Homes, restaurants, offices.",
  },
  {
    title: "Chemical Spray Cockroach Treatment",
    method: "Chemical Spray Treatment",
    warranty: "2 Months",
    pricing: "₹900 - ₹2000",
    process: [
      "Inspection: Identify infestation areas.",
      "Treatment: Spray chemical solution in targeted spots.",
      "Follow-up: Repeat application if required.",
    ],
    precautions: [
      "Vacate the area during treatment.",
      "Keep food items covered.",
      "Ventilate the room after spraying.",
    ],
    bestFor: "Homes, restaurants, offices.",
  },
  {
    title: "Korean Gel Cockroach Treatment",
    method: "Advanced Korean Gel",
    warranty: "6 Months",
    pricing: "₹1800 - ₹4600",
    process: [
      "Inspection: Identify infestation areas.",
      "Treatment: Apply Korean gel for long-lasting results.",
      "Follow-up: Re-apply if needed.",
    ],
    precautions: [
      "Do not touch applied gel directly.",
      "Keep away from moisture.",
      "Store in a cool place.",
    ],
    bestFor: "Homes, restaurants, offices.",
  },
  {
    title: "Ant Control",
    method: "Korean Gel",
    warranty: "6 Months",
    pricing: "₹800 - ₹1500",
    process: [
      "Inspection: Locate ant trails and nests.",
      "Treatment: Apply bait gel near colonies.",
      "Follow-up: Reapply in high-activity areas.",
    ],
    precautions: [
      "Avoid placing gel near food.",
      "Keep pets away from treated areas.",
      "Reapply after cleaning.",
    ],
    bestFor: "Homes, kitchens, and gardens.",
  },
  {
    title: "Bedbug Treatment",
    method: "Chemical Spray + Steam",
    warranty: "3 Months",
    pricing: "₹1500 - ₹3000",
    process: [
      "Inspection: Check furniture, beds, and walls.",
      "Treatment: Use chemical sprays and steam.",
      "Follow-up: Re-treatment after 15 days if required.",
    ],
    precautions: [
      "Wash bedding after treatment.",
      "Avoid sleeping in treated rooms for 4-6 hours.",
      "Vacuum regularly post-treatment.",
    ],
    bestFor: "Homes, hostels, hotels.",
  },
  {
    title: "Rat Control",
    method: "Glue Pads + Bait Stations",
    warranty: "No Warranty",
    pricing: "₹100 per pad + ₹200 visiting charges",
    process: [
      "Inspection: Identify entry points.",
      "Treatment: Place pads and baits strategically.",
      "Follow-up: Remove trapped rats and advise sealing gaps.",
    ],
    precautions: [
      "Keep children/pets away from traps.",
      "Dispose of dead rats safely.",
      "Seal entry points post-treatment.",
    ],
    bestFor: "Homes, warehouses, restaurants.",
  },
  {
    title: "Termite Treatment",
    method: "Drill + Chemical Injection",
    warranty: "5 Years",
    pricing: "₹10 per SQFT",
    process: [
      "Inspection: Check wood, walls, and furniture.",
      "Treatment: Drill holes, inject termiticide, and seal.",
      "Follow-up: Yearly inspection for long-term control.",
    ],
    precautions: [
      "Evacuate during drilling.",
      "Avoid treated areas for 24 hours.",
      "Cover furniture to prevent chemical stains.",
    ],
    bestFor: "Homes, offices, construction sites.",
  },
  {
    title: "Mosquito Control",
    method: "Fogging & Larvicide Spray",
    warranty: "1 Month",
    pricing: "₹1200 - ₹2500",
    process: [
      "Inspection: Find breeding spots (stagnant water, drains).",
      "Treatment: Use fogging and larvicide to eliminate larvae.",
      "Follow-up: Repeat treatment in 30 days if required.",
    ],
    precautions: [
      "Close windows during fogging.",
      "Cover fish tanks/water sources.",
      "Stay indoors for 2 hours post-treatment.",
    ],
    bestFor: "Homes, societies, commercial areas.",
  },
  {
    title: "House Fly Control",
    method: "Spray + Traps",
    warranty: "No Warranty",
    pricing: "₹800 - ₹1500",
    process: [
      "Inspection: Identify fly sources.",
      "Treatment: Use insecticidal spray and UV light traps.",
      "Follow-up: Advice on sanitation and prevention.",
    ],
    precautions: [
      "Turn off UV traps during the day.",
      "Clean food residues promptly.",
      "Dispose of trapped flies hygienically.",
    ],
    bestFor: "Homes, kitchens, food processing units.",
  },
  {
    title: "Snake Control",
    method: "Repellents + Removal",
    warranty: "No Warranty",
    pricing: "₹2000 - ₹5000",
    process: [
      "Inspection: Identify hiding spots.",
      "Treatment: Apply snake repellents, remove any snakes.",
      "Follow-up: Advise on habitat modification.",
    ],
    precautions: [
      "Do not approach snakes.",
      "Clear bushes and debris regularly.",
      "Seal gaps in walls/fences.",
    ],
    bestFor: "Farms, gardens, industrial areas.",
  },
  {
    title: "Honeybee Removal",
    method: "Safe Hive Removal",
    warranty: "No Warranty",
    pricing: "Starts from ₹2500",
    process: [
      "Inspection: Locate and assess the hive.",
      "Treatment: Safely remove or relocate the hive.",
      "Follow-up: Seal entry points to prevent re-infestation.",
    ],
    precautions: [
      "Do not disturb the hive.",
      "Wear protective gear if near bees.",
      "Relocate hives ethically.",
    ],
    bestFor: "Homes, factories, farms.",
  },
  {
    title: "Annual Pest Control Contracts",
    method: "Comprehensive pest management",
    warranty: "No Warranty",
    pricing: "Customized (₹5000 - ₹15000/year)",
    process: [
      "Regular preventive treatments",
      "Customized service plans",
      "Includes: Cockroaches, Ants, Rodents, Bedbugs, Mosquitoes",
    ],
    precautions: [
      "Follow scheduled visits strictly.",
      "Report new infestations promptly.",
      "Maintain cleanliness between treatments.",
    ],
    bestFor: "Societies, offices, commercial buildings",
    frequency: "Monthly or quarterly treatments",
  },
  {
    title: "Why Choose Us?",
    isSpecialCard: true,
    features: [
      "Same-Day Service: Quick response & fast pest removal.",
      "Safe & Eco-Friendly: Non-toxic solutions, safe for kids & pets.",
      "Guaranteed Results: Warranty-backed treatments for peace of mind.",
      "Affordable & Transparent Pricing: No hidden charges, best rates in town.",
      "Expert Technicians: Highly trained professionals with years of experience.",
      "Custom Pest Solutions: Tailored treatments for homes, offices & industries.",
    ],
    contact: {
      phone: "+91 98226 90235",
      whatsapp: "https://wa.me/919822690235",
    },
  },
];
// Render function
function renderServiceCard(service) {
  if (service.isSpecialCard) {
    return `
        <div class="bg-[#1B515B] text-white p-8 rounded-xl shadow-lg border-t-4 border-[#6EAF9E]">
          <h2 class="text-2xl font-bold mb-4">${service.title}</h2>
          <ul class="space-y-3 list-none">
            ${service.features
              .map(
                (feature) => `
              <li class="flex items-start">
                <span><strong>${feature.split(":")[0]}:</strong> ${feature
                  .split(":")
                  .slice(1)
                  .join(":")}</span>
              </li>
            `
              )
              .join("")}
          </ul>
          <div class="mt-6 flex flex-col gap-3">
            <a href="tel:+919822690235"
              class="bg-white text-[#1B515B] py-3 px-4 rounded-lg text-center font-semibold shadow-md hover:bg-[#6EAF9E] hover:text-white transition">
              📞 Call: +91 98226 90235
            </a>
            <a href="https://wa.me/919822690235" target="_blank"
              class="bg-green-500 text-white py-3 px-4 rounded-lg text-center font-semibold shadow-md hover:bg-green-600 transition">
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      `;
  }

  return `
      <div class="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#6EAF9E]">
        <h2 class="text-2xl font-bold text-[#1B515B] mb-3">${service.title}</h2>
        <p class="text-gray-700 mb-1"><strong>Method:</strong> ${
          service.method
        }</p>
        <p class="text-gray-700 mb-1"><strong>Warranty:</strong> ${
          service.warranty
        }</p>
        <p class="text-gray-700 mb-1"><strong>Pricing:</strong> ${
          service.pricing
        }</p>
        <ul class="mt-3 space-y-2 list-none">
          ${service.process
            .map(
              (item) => `
            <li class="flex items-start">
              <span><strong>${item.split(":")[0]}:</strong> ${item
                .split(":")
                .slice(1)
                .join(":")}</span>
            </li>
          `
            )
            .join("")}
        </ul>
        <div class="mt-4">
          <h3 class="font-semibold text-[#1B515B]">⚠️ Precautions:</h3>
          <ul class="precautions list-inside text-gray-600">
            ${service.precautions
              .map(
                (precaution) => `
              <li>${precaution}</li>
            `
              )
              .join("")}
          </ul>
        </div>
        <p class="text-gray-800 font-semibold mt-3">Best for: ${
          service.bestFor
        }</p>
        <button class="mt-4 bg-[#1B515B] text-white py-2 px-6 rounded-lg hover:bg-[#6EAF9E] transition">Book Now</button>
      </div>
    `;
}
// Render all cards when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".grid");

  // Clear existing content
  container.innerHTML = "";

  // Render each service card
  services.forEach((service) => {
    container.innerHTML += renderServiceCard(service);
  });
});
// services details dynamic card generator end

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
