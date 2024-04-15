// Hardgecodeete Nodes
// Können je nach Bedarf geändert werden
// Eventuell füge ich eine Funktion hinein die nach Klick die Nodes bestimmt
const nodes = [
    [110, 240],
    [220, 100],
    [400, 50],
    [650, 100]
];

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

// function die max/min von X und Y wiedergibt
// Kann nützlich für Testzwecke sein oder später
// Hab gerade bisschen Kopfschmerzen, bestimmt lässt sich ein Nutzen finden    

function gibMinMaxCoords(nodes) {
    let minX = Math.min(...nodes.map(node => node[0]));
    let minY = Math.min(...nodes.map(node => node[1]));
    let maxX = Math.max(...nodes.map(node => node[0]));
    let maxY = Math.max(...nodes.map(node => node[1]));

    return {minX, minY, maxX, maxY};
}

// Kurzer Test ob die Koordinaten korrekt ausgegeben werden (ja werden sie)
let coords = gibMinMaxCoords(nodes);
console.log(coords); 

// Funktion die eine schwarze Box abhängig von den Koordinaten zeichnet
// Man sollte meinen CSS reicht dafür, jedoch ist der DIV kleiner als die jeweiligen Elemente drin
// Lässt sich bestimmt optimieren => TODO? 

function zeichneBox(nodes) {

    const box = document.createElement('div');

    let {minX, minY, maxX, maxY} = gibMinMaxCoords(nodes);

    box.style.position = 'absolute';
    box.style.left = minX + 'px';
    box.style.top = minY + 'px';
    box.style.width = maxX-minX + 'px';
    box.style.height = maxY + 'px';

    box.style.border = '2px solid black';

    document.body.appendChild(box);

}

zeichneBox(nodes)

//Zeichnet alle Kästchen zu guter Letzt
nodes.forEach(nodes => drawKaestchen(...nodes));