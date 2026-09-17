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
}


// Beim Start die Startseite anzeigen
showPage("home");



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


function showProperty(eigenschaft, backPage) {

    const content = document.getElementById("content");

    content.innerHTML = `

        <h1>${eigenschaft.name}</h1>

        <button onclick="showPage('${backPage}')">
            ← Zurück
        </button>

        <p>
            <strong>Benötigte Arbeitszeit:</strong><br>
            ${eigenschaft.zeit}
        </p>

        <p>
            <strong>Beschreibung:</strong><br>
            ${eigenschaft.text}
        </p>
    `;
}