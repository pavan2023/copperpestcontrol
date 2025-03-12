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
      menu.classList.toggle("hidden");
    });
  }
}
// Navbar toggle function end

// horizontal scroll start
document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.querySelector(".overflow-x-auto");
  let autoScroll;

  if (scrollContainer) {
    scrollContainer.addEventListener("wheel", (event) => {
      event.preventDefault();
      scrollContainer.scrollLeft += event.deltaY;
    });

    function startAutoScroll() {
      stopAutoScroll();
      autoScroll = setInterval(() => {
        scrollContainer.scrollLeft += 2;
        if (
          scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }, 20);
    }

    function stopAutoScroll() {
      clearInterval(autoScroll);
    }

    scrollContainer.addEventListener("mouseenter", stopAutoScroll);
    scrollContainer.addEventListener("mouseleave", startAutoScroll);
    startAutoScroll();
  }
});
// horizontal scroll end

// form functionality start
function updatePrice() {
  let price = 0;
  if (document.getElementById("serviceType").value === "single") {
    let service = document.getElementById("singleService").value;
    if (service === "cockroach") price = 50;
    if (service === "bedbug") price = 80;
    if (service === "termite") price = 120;
    if (service === "mosquito") price = 60;
  } else {
    document
      .querySelectorAll("#packageOptions input:checked")
      .forEach((service) => {
        if (service.value === "cockroach-bedbug") price += 100;
        if (service.value === "termite") price += 150;
        if (service.value === "mosquito") price += 90;
      });
  }
  if (document.getElementById("emergencyService").checked) {
    price += 30;
  }
  document.getElementById("totalPrice").textContent = "Total Price: $" + price;
}

document.getElementById("serviceType").addEventListener("change", function () {
  let type = this.value;
  document
    .getElementById("packageOptions")
    .classList.toggle("hidden", type !== "package");
  document
    .getElementById("singleService")
    .classList.toggle("hidden", type !== "single");
});

document
  .getElementById("pestControlForm")
  .addEventListener("change", updatePrice);

document
  .getElementById("pestControlForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let serviceType = document.getElementById("serviceType").value;
    let totalPrice = document.getElementById("totalPrice").textContent;

    let message = `Hi, I want to book a pest control service.\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nService Type: ${serviceType}\n${totalPrice}`;
    let whatsappURL = `https://wa.me/YOUR_NUMBER?text=${encodeURIComponent(
      message
    )}`;
    document.getElementById("whatsappLink").setAttribute("href", whatsappURL);
  });
// form functionality end
