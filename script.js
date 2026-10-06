function showPage(page) {

    const content = document.getElementById("content");

    if (page === "BR") {
        content.innerHTML = `
            <h1>Alle Baureihen</h1>
            <p>Bitte über das Arbeitsprofil vom mobilen Endgerät aus der arbeit die Datei Downloaden, damit ihr diese auch finden und importieren könnt</p>
            <div id="brButtons"></div>
        `;

        const container = document.getElementById("brButtons");

        const brButtons = ["420", "423", "424", "1420"];

        brButtons.forEach(nummer => {

            const button = document.createElement("button");
            button.textContent = nummer;

            button.onclick = function() {
                showPage(nummer);
            };

            container.appendChild(button);
        });
    }

    else if (page === "420") {

        content.innerHTML = `
            <h1>Baureihe 420</h1>

            <div id="propertyButtons"></div>
        `;

        createPropertyButtons(Info420, "420");

    }


    else if (page === "423") {

        content.innerHTML = `
            <h1>Baureihe 423</h1>

            <div id="propertyButtons"></div>
        `;

        createPropertyButtons(Info423, "423");

    }


    else if (page === "424") {

        content.innerHTML = `
            <h1>Baureihe 424</h1>

            <div id="propertyButtons"></div>
        `;

        createPropertyButtons(Info424, "424");
    }

    else if (page === "1420") {

        content.innerHTML = `
            <h1>Baureihe 1420</h1>

            <p id="soon">Coming soon</p>

            <div id="propertyButtons"></div>
        `;

        createPropertyButtons(Info1420, "1420");
    }

    else if (page === "links") {

        content.innerHTML = `
            <h1>Nützliche links</h1>

            <p>Hier ist eine Sammlung Nützlicher Links</p>
            <p>Nutzung der meisten Links nur mit dem Arbeitsgerät und einem Aktiven schlüssel möglich.</p>

            <div id="propertyButtons"></div>
        `;

        createPropertyLinkButtons(link);
    }

    else if (page === "gleis") {

        content.innerHTML = `
            <img
                class="property-single-image"
                src="${GleisePNG}"
                alt="Gleis"
                onclick="window.open('${GleisePDF}', '_blank')"
            >
        `;
    }

    else if (page === "json") {
        content.innerHTML = `
            <h1>Mat-ID Favoriten</h1>

            <div id="jsonButtons"></div>
      `;

        createJSONButtons();
        }
    }

showPage("home");


function createPropertyButtons(properties, backPage, containerId = "propertyButtons") {

    const container = document.getElementById(containerId);
    container.innerHTML = "";

    [...properties]
        .sort((a, b) => a.name.localeCompare(b.name, "de"))
        .forEach(eigenschaft => {

            const button = document.createElement("button");
            button.textContent = eigenschaft.name;

            button.onclick = function() {
                showProperty(eigenschaft, backPage);
            };

            container.appendChild(button);
        });
}

function createPropertyLinkButtons(properties) {

    const container = document.getElementById("propertyButtons");
    container.innerHTML = "";

    properties.forEach(eigenschaft => {

        const button = document.createElement("button");

        button.textContent = eigenschaft.name_url;

        button.onclick = function () {
            window.open(eigenschaft.url, "_blank");
        };

        container.appendChild(button);
    });
}

function createPropertyButtons(properties, backPage) {

    const container = document.getElementById("propertyButtons");

    [...properties]
        .sort((a, b) => a.name.localeCompare(b.name, "de"))
        .forEach(eigenschaft => {

            const button = document.createElement("button");

            button.textContent = eigenschaft.name;

            button.onclick = function() {
                showProperty(eigenschaft, backPage);
            };

            container.appendChild(button);
        });
    }

function openImage(src) {
    const overlay = document.createElement("div");

    overlay.className = "image-overlay";

    overlay.innerHTML = `
        <img src="${src}" alt="Vergrößertes Bild">
        <button class="close-image">✕</button>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector(".close-image").onclick = function(event) {
        event.stopPropagation();
        overlay.remove();
    };

    overlay.onclick = function() {
        overlay.remove();
    };
}

function toggleImages() {

    const images = document.getElementById("property-images");
    const arrow = document.getElementById("image-arrow");

    images.classList.toggle("hidden");

    if (images.classList.contains("hidden")) {
        arrow.textContent = "▼";
    } else {
        arrow.textContent = "▲";
    }
}

function showProperty(eigenschaft, backPage) {

    const content = document.getElementById("content");

    function createRows(rows) {
        return rows.map(zeile => `
            <div class="property-label">
                ${zeile[0]}
            </div>

            <div class="property-value">
                ${zeile[1]}
            </div>
        `).join("");
    }

    content.innerHTML = `
        <h1>${eigenschaft.name}</h1>

        <button onclick="showPage('${backPage}')">
            ⇐ Zurück
        </button>

        <h3>Benötigte Arbeitszeit:</h3>

        <div class="property-table">
            ${createRows(eigenschaft.zeit)}
        </div>

        <h3>Beschreibung:</h3>

        <div class="property-table">
            ${createRows(eigenschaft.text)}
        </div>

        ${eigenschaft.bilder && eigenschaft.bilder.length > 0 ? `
        <h3 class="image-toggle" onclick="toggleImages()">
            Bilder
            <span id="image-arrow">▼</span>
        </h3>

        <div id="property-images" class="property-images hidden">
            ${eigenschaft.bilder.map(bild => `
                <img
                    src="${bild}"
                    alt="${eigenschaft.name}"
                    onclick="openImage('${bild}')"
                >
            `).join("")}
        </div>
    ` : ""}
    `;
}

async function createJSONButtons() {
    const container = document.getElementById("jsonButtons");

    container.innerHTML = "";

    const buttonAlle = document.createElement("button");
    buttonAlle.textContent = "Komplette Liste herunterladen";
    buttonAlle.style.marginBottom = "5px";

    buttonAlle.onclick = function() {
        const link = document.createElement("a");
        link.href = "json/alle.json";
        link.download = "alle.json";
        link.click();
    };

    container.appendChild(buttonAlle);

    const antwort = await fetch("json/alle.json");
    const daten = await antwort.json();

    Object.entries(daten).forEach(([dateiname, inhalt]) => {

        const button = document.createElement("button");
        button.textContent = dateiname;

        button.onclick = function() {

            const json = JSON.stringify(
                {
                    [dateiname]: inhalt
                },
                null,
                4
            );

            const blob = new Blob(
                [json],
                { type: "application/json" }
            );

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = dateiname + ".json";

            link.click();

            URL.revokeObjectURL(url);
        };

        container.appendChild(button);
    });
}
