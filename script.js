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

// dynamic card generator start
document.addEventListener("DOMContentLoaded", function () {
  const services = [
      { name: "Ant Control Service", img: "./src/img/pests/ant.png" },
      { name: "Bee Control Service", img: "./src/img/pests/bee.png" },
      { name: "Bedbug Control Service", img: "./src/img/pests/bedbug.png" },
      { name: "Cockroach Control Service", img: "./src/img/pests/cockroach.png" },
      { name: "Mosquito Control Service", img: "./src/img/pests/mosquito.png" },
      { name: "Rat Control Service", img: "./src/img/pests/rat.png" },
      { name: "Snake Control Service", img: "./src/img/pests/snake.png" },
      { name: "Termite Control Service", img: "./src/img/pests/termite.png" }
  ];

  const serviceContainer = document.getElementById("serviceContainer");

  function createServiceCards() {
    services.forEach((service) => {
      const card = document.createElement("div");
      card.className = "service-card h-110 lg:h-80 w-80 lg:w-120 bg-blue-50 rounded-4xl p-6 flex flex-col lg:flex-row justify-center items-center shadow-lg flex-shrink-0 gap-4 cursor-pointer";
      
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
// dynamic card generator end

// services onclick info model start
document.addEventListener("DOMContentLoaded", function () {
  // Rate Chart Data
  const services = {
    "Ant Control Service": {
      price: "₹1400 - ₹3400",
      warranty: "6 Months",
      covered: "Advanced herbal gel application for long-term ant prevention. Odorless & safe for homes.",
      notCovered: "Cleaning of treated areas and deep sanitation.",
    },
    "Bee Control Service": {
      price: "Starts from ₹2500",
      warranty: "No Warranty",
      covered: "Expert hive removal with minimal disruption. Relocation when possible.",
      notCovered: "Structural repairs or wall patching after hive removal.",
    },
    "Bedbug Control Service": {
      price: "₹1800 - ₹4000",
      warranty: "3 Months",
      covered: "Two-step treatment for complete elimination of bedbugs and eggs. Safe for furniture & mattresses.",
      notCovered: "Deep furniture cleaning or upholstery treatment.",
    },
    "Cockroach Control Service": {
      price: "₹600 - ₹4600",
      warranty: "2 to 6 Months (varies by treatment)",
      covered: "Highly effective gel & spray-based treatment targeting hidden infestations.",
      notCovered: "Post-treatment cleanup or grease removal from surfaces.",
    },
    "Mosquito Control Service": {
      price: "Quoted upon inspection",
      warranty: "1 Month",
      covered: "Indoor and outdoor fogging to drastically reduce mosquito presence.",
      notCovered: "Guaranteed 100% elimination due to external factors.",
    },
    "Rat Control Service": {
      price: "₹100 per pad + ₹200 visiting charges",
      warranty: "No Warranty",
      covered: "Strategic placement of glue traps and bait stations for effective rodent control.",
      notCovered: "Dead rodent disposal or permanent entry point sealing.",
    },
    "Snake Control Service": {
      price: "Quoted upon inspection",
      warranty: "No Warranty",
      covered: "Safe, humane snake capture and relocation by trained professionals.",
      notCovered: "Sealing of snake entry points or preventive treatments.",
    },
    "Termite Control Service": {
      price: "₹10 per SQFT",
      warranty: "5 Years",
      covered: "Drill, fill, and seal method for deep termite control and long-term protection.",
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