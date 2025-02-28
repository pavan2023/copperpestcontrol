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
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${file}: ${response.status}`);
            return response.text();
        })
        .then(data => {
            document.getElementById(section).innerHTML = data;
            if (callback) callback(); // Run callback after content is loaded
        })
        .catch(error => console.error(`Error loading ${file}:`, error));
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

// Navbar toggle function
function attachMenuToggle() {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("mobile-menu");

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", function () {
            menu.classList.toggle("hidden");
        });
    }
}
