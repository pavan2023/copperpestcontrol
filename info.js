const pests = [
    {
        id: "cockroach",
        name: "Cockroaches",
        image: "./src/img/info-pests/cockroach.jpg",
        shortDesc: "Disease carriers that contaminate food and trigger allergies.",
        signs: "Droppings, musty odor, live cockroaches in dark areas.",
        risks: "Spread bacteria, cause asthma, contaminate food.",
        prevention: "Keep kitchen clean, seal cracks, use baits or sprays."
    },
    {
        id: "bedbugs",
        name: "Bedbugs",
        image: "./src/img/info-pests/bedbugs.jpg",
        shortDesc: "Tiny insects that feed on human blood, causing irritation.",
        signs: "Red bite marks, blood stains on bedding, musty odor.",
        risks: "Skin infections, allergic reactions, sleep disturbances.",
        prevention: "Wash bedding regularly, inspect furniture, call professionals."
    },
    {
        id: "rats",
        name: "Rats & Rodents",
        image: "./src/img/info-pests/rats.jpg",
        shortDesc: "Rodents that damage property and spread diseases.",
        signs: "Gnaw marks, droppings, scratching noises in walls.",
        risks: "Cause leptospirosis, plague, food contamination.",
        prevention: "Seal holes, store food properly, use traps or bait."
    },
    {
        id: "termites",
        name: "Termites",
        image: "./src/img/info-pests/termites.jpg",
        shortDesc: "Silent destroyers that eat away wood and structures.",
        signs: "Hollow wood, mud tubes, discarded wings.",
        risks: "Structural damage costing thousands in repairs.",
        prevention: "Regular inspections, keep wood dry, apply termiticides."
    },
    {
        id: "mosquitoes",
        name: "Mosquitoes",
        image: "./src/img/info-pests/mosquitoes.jpg",
        shortDesc: "Flying insects that spread deadly viruses like dengue and malaria.",
        signs: "Buzzing sound, itchy bites, stagnant water breeding sites.",
        risks: "Cause malaria, dengue, Zika virus, and chikungunya.",
        prevention: "Use mosquito nets, remove standing water, apply repellents."
    },
    {
        id: "ants",
        name: "Ants",
        image: "./src/img/info-pests/ants.jpg",
        shortDesc: "Common household pests that invade food and spread bacteria.",
        signs: "Ant trails, dirt mounds, presence in kitchen or pantry.",
        risks: "Food contamination, painful bites from some species.",
        prevention: "Keep food sealed, clean crumbs, use bait traps."
    },
    {
        id: "houseflies",
        name: "House Flies",
        image: "./src/img/info-pests/houseflies.jpg",
        shortDesc: "Flies that land on food and spread bacteria.",
        signs: "Flies hovering around food, buzzing noise, droppings on surfaces.",
        risks: "Spread diseases like cholera, typhoid, and E. coli.",
        prevention: "Keep food covered, use fly traps, maintain hygiene."
    },
    {
        id: "",
        name: "Snakes",
        image: "./src/img/info-pests/snakes.jpg",
        shortDesc: "Some venomous species pose serious risks to humans.",
        signs: "Snake skins, slithering tracks, presence of rodents.",
        risks: "Venomous bites can be fatal if untreated.",
        prevention: "Keep surroundings clean, seal gaps, remove food sources."
    },
    {
        id: "honeybees",
        name: "Honeybees",
        image: "./src/img/info-pests/honeybees.jpg",
        shortDesc: "Beneficial pollinators but can sting when provoked.",
        signs: "Bee swarms, buzzing noise, honeycomb near the house.",
        risks: "Severe allergic reactions to stings.",
        prevention: "Avoid disturbing hives, call professionals for removal."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const pestList = document.getElementById('pest-list');

    pests.forEach(pest => {
        const div = document.createElement('div');
        div.className = "bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105";
        div.innerHTML = `
            <img src="${pest.image}" alt="${pest.name}" class="w-full h-40 object-cover rounded-md">
            <h3 class="text-xl font-semibold mt-3 text-[#1B515B]">${pest.name}</h3>
            <p class="text-gray-700 mt-2">${pest.shortDesc}</p>
            <button class="mt-3 text-blue-600 underline pest-btn" data-id="${pest.id}">Read More</button>
            <div class="hidden mt-2 text-gray-800 pest-details space-y-3 py-2" id="pest-${pest.id}">
                <p><strong>Signs:</strong> ${pest.signs}</p>
                <p><strong>Risks:</strong> ${pest.risks}</p>
                <p><strong>Prevention:</strong> ${pest.prevention}</p>
            </div>
        `;
        pestList.appendChild(div);
    });

    document.querySelectorAll('.pest-btn').forEach(button => {
        button.addEventListener('click', () => {
            const details = document.getElementById(`pest-${button.dataset.id}`);
            details.classList.toggle('hidden');
        });
    });
});
