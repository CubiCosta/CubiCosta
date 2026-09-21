function showPage(page) {

    const content = document.getElementById("content");



    if (page === "420") {

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
                src="img/Gleis.jpg"
                alt="Gleis"
                style="width: 300px;"
            >
        `;
    }
}

showPage("home");

function showPDF() {
    content.innerHTML = `
        <iframe
            src="${GleisePDF}"
            class="pdf-viewer"
        ></iframe>
    `;
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

        <h3>Protokolle & Checklisten:

        ${eigenschaft.bilder ? `
    <div class="property-images">
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
