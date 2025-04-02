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

  // Mobile detection and enhancement
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Add click handler for all devices
  dateInput.addEventListener("click", function () {
    // Add visual feedback
    this.classList.add("wt-border-blue-500", "wt-ring-2", "wt-ring-blue-200");

    // For devices that might need polyfill
    if (isMobile && this.type !== "date") {
      this.type = "date";
      // If still not supported, show alternative
      if (this.type !== "date") {
        this.type = "text";
        // You could add a Wentoolkit modal date picker here if needed
      }
    }
  });

  // Blur effect
  dateInput.addEventListener("blur", function () {
    this.classList.remove(
      "wt-border-blue-500",
      "wt-ring-2",
      "wt-ring-blue-200"
    );
  });

  // Ensure proper formatting on older Android devices
  if (isMobile && navigator.userAgent.match(/Android/i)) {
    dateInput.addEventListener("change", function () {
      if (this.value) {
        const formattedDate = new Date(this.value).toLocaleDateString();
        this.setAttribute("data-formatted", formattedDate);
      }
    });
  }
});
// form date issue fix
