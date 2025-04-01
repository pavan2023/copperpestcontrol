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
          <h2 class="text-2xl font-bold text-[#1B515B] mb-3">${
            service.title
          }</h2>
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
            <ul class="precautions list-disc list-inside text-gray-600">
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
          <a href="./index.html#scheduleServiceForm">
              <button class="mt-4 bg-[#1B515B] text-white py-2 px-6 rounded-lg hover:bg-[#6EAF9E] transition">Book Now</button>
          </a>
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
