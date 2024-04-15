
// Speichert den Container div als Konstante
const container = document.getElementById("container");

// Malt die "Nodes" => hab sie Kästchen genannt, fand das irgendwie süßer :)

function drawKaestchen(xPos, yPos) {
    // Erstell ein kaestchen Element
    // Styling ist rot, kann in style.css bearbeitet werden
    const kaestchen = document.createElement('div');
    kaestchen.classList.add('kaestchen');
    // CSS Styling, je nach Parameter werden die Positionen für den jeweiligen Node bestimmt
    kaestchen.style.left = xPos + 'px';
    kaestchen.style.top = yPos + 'px';
    // Werf es in den Container div hinein!
    container.appendChild(kaestchen);
}
// Hardgecodeete Nodes
// Können je nach Bedarf geändert werden
// Eventuell füge ich eine Funktion hinein die nach Klick die Nodes bestimmt
const nodes = [
    [100, 50],
    [250, 100],
    [400, 50],
    [550, 100]
];

nodes.forEach(nodes => drawKaestchen(...nodes));