// Hardgecodeete Nodes
// Können je nach Bedarf geändert werden
// Eventuell füge ich eine Funktion hinein die nach Klick die Nodes bestimmt
const nodes = [
  [200,400],
  [300, 510],
  [500, 800],
  [710, 500],
];


// Speichert den Container div als Konstante
const container = document.getElementById("container");

// Einfache Funktion die die aktuelle Position der Nodes im HTML Dokument schreibt
function schreibNodePos(nodes) {
    // Super repetitive, kann besser gemacht werden, aber funktioniert fürs erste
    const posA = document.getElementById("posA");
    const posB = document.getElementById("posB");
    const posC = document.getElementById("posC");
    const posD = document.getElementById("posD");

    posA.textContent = "Position von Node A: " + nodes[0];
    posB.textContent = "Position von Node B: " + nodes[1];
    posC.textContent = "Position von Node C: " + nodes[2];
    posD.textContent = "Position von Node D: " + nodes[3];
}

// Malt die "Nodes" => hab sie Kästchen genannt, fand das irgendwie süßer :)

function drawKaestchen(xPos, yPos, label) {
  //Erstelle ein Label Element um die Nodes von A-Z zu bezeichnen
  const labelElement = document.createElement("div");
  labelElement.textContent = label;
  labelElement.style.position = "absolute";
  labelElement.style.left = (xPos-10)+"px";
  labelElement.style.top = (yPos-10)+"px";



  // Erstell ein kaestchen Element
  // Styling ist rot, kann in style.css bearbeitet werden
  const kaestchen = document.createElement("div");
  kaestchen.classList.add("kaestchen");
  // CSS Styling, je nach Parameter werden die Positionen für den jeweiligen Node bestimmt
  kaestchen.style.left = xPos + "px";
  kaestchen.style.top = yPos + "px";
  // Werf es in den Container div hinein!
  container.appendChild(kaestchen);
  container.appendChild(labelElement);
}

// function die max/min von X und Y wiedergibt
// Kann nützlich für Testzwecke sein oder später
// Hab gerade bisschen Kopfschmerzen, bestimmt lässt sich ein Nutzen finden

function gibMinMaxCoords(nodes) {
  let minX = Math.min(...nodes.map((node) => node[0]));
  let minY = Math.min(...nodes.map((node) => node[1]));
  let maxX = Math.max(...nodes.map((node) => node[0]));
  let maxY = Math.max(...nodes.map((node) => node[1]));

  return { minX, minY, maxX, maxY };
}

// Kurzer Test ob die Koordinaten korrekt ausgegeben werden (ja werden sie)
let coords = gibMinMaxCoords(nodes);
console.log(coords);

// Funktion die eine schwarze Box abhängig von den Koordinaten zeichnet
// Man sollte meinen CSS reicht dafür, jedoch ist der DIV kleiner als die jeweiligen Elemente drin
// Lässt sich bestimmt optimieren => TODO?

//Funktion die die Distanz von A->B B->C C->D und D->A berechnet
function gibDistanz(nodes) {
  // Array für die Distanzen
  let distanzen = [];

  //Iteriere durch alle Nodes

  for (let i = 0; i < nodes.length; i++) {
    // Determiniert den nächsten Index aus dem Array
    // Bisschen wie eine zyklische Gruppe - wenn wir am Ende sind dann D-> A
    let nextIndex = i + 1 === nodes.length ? 0 : i + 1;
    // aktueller Node
    let nodeA = nodes[i];
    // nächster Node
    let nodeB = nodes[nextIndex];
    // Kalkulation für die jeweilige Distanz der Nodes
    // SQRT((x2-x1)² + (y2-y1)²)
    let distanz = Math.sqrt(
      Math.pow(nodeB[0] - nodeA[0], 2) + Math.pow(nodeB[1] - nodeA[1], 2)
    );
    distanzen.push(distanz);
  }

  return distanzen;
}

function zeichneBox(nodes) {
  const box = document.createElement("div");

  let { minX, minY, maxX, maxY } = gibMinMaxCoords(nodes);

  box.style.position = "absolute";
  box.style.left = minX + "px";
  box.style.top = minY + "px";
  // +8 wird gerechnet, da die Nodes an sich größer dargestellt werden, als sie von HTML/CSS wahrgenommen werden
  box.style.width = maxX - minX + 8 + "px";
  box.style.height = maxY - minY + 8 + "px";

  box.style.border = "2px solid black";

  document.body.appendChild(box);
}

//Funktion der einen mobilen Node anhand der aktuellen Mausposition zeichnet
const mobilerNode = document.createElement("div");
mobilerNode.classList.add("kaestchen");
container.appendChild(mobilerNode);

//eigentlich eine Kopie von der orginalen gibDistanz-Methode, implementiere die VORERST 2x trotzdem
// Braucht Improvement
function gibDistanzZuMobileNode(mobileNode, nodes) {
    let distanzen = [];

    let mobileX = parseInt(mobilerNode.style.left);
    let mobileY = parseInt(mobilerNode.style.top);

    for(let i = 0; i < nodes.length; i++) {
        let node = nodes[i];

        let distanz = Math.sqrt(Math.pow(node[0]-mobileX,2) + Math.pow(node[1]-mobileY, 2));

        distanzen.push(distanz);
    }

    return distanzen;
}

function zeichneKreis(node, radius) {
  const kreis = document.createElement("div");
  kreis.classList.add("kreis");
  kreis.style.position = "absolute";
  kreis.style.border = "1px solid green";
  kreis.style.borderRadius = "50%";
  kreis.style.width = (radius * 2) + "px";
  kreis.style.height = (radius * 2) + "px";
  kreis.style.left = (node[0] - radius) + "px";
  kreis.style.top = (node[1] - radius) + "px";
  document.body.appendChild(kreis);
}

function mobileNode() {
  //Da die schwarze Box nicht richtig funktioniert
  //Implementiere ich eine Funktion die Anhand gibMinmaxCoords schaut
  // dass die Maus nicht außerhalb der Box geht.

  let { minX, minY, maxX, maxY } = gibMinMaxCoords(nodes);



  document.addEventListener("mousemove", function (event) {
    // berechne die neue Position nach jeder Mausbewegung
    let newX = event.clientX;
    let newY = event.clientY;
    // Holt sich die Distanzen
    let distanzen = gibDistanzZuMobileNode(mobileNode, nodes);
    //Holt sich die gezeichneten Kreise
    let existingKreise = document.getElementsByClassName("kreis");
    //Solange es ein erstes Element gibt => lösche das Alte
    while(existingKreise[0]) {
      existingKreise[0].parentNode.removeChild(existingKreise[0]);
    }
    //Zeichne die Kreise
    for(let i = 0; i < nodes.length; i++) {
      zeichneKreis(nodes[i], distanzen[i]);
    }

    //  Super langsam, muss verbessert werden, aber funktioniert! :D

    if (newX >= minX && newX <= maxX && newY >= minY && newY <= maxY) {
      mobilerNode.style.left = newX + "px";
      mobilerNode.style.top = newY + "px";
    }

    //Nutzt die gibDistanzZuMobileNode Funktion um bei jeder  Bewegung die Distnaz der Hardcoded Nodes zu updaten

    let textA = document.getElementById("A");
    let textB = document.getElementById("B");
    let textC = document.getElementById("C");
    let textD = document.getElementById("D");

    textA.textContent = "Distanz zu Node A: " + gibDistanzZuMobileNode(mobileNode, nodes)[0];
    textB.textContent = "Distanz zu Node B: " + gibDistanzZuMobileNode(mobileNode, nodes)[1];
    textC.textContent = "Distanz zu Node C: " + gibDistanzZuMobileNode(mobileNode, nodes)[2];
    textD.textContent = "Distanz zu Node D: " + gibDistanzZuMobileNode(mobileNode, nodes)[3];

    // console.log(gibDistanzZuMobileNode(mobileNode, nodes));
  });
}
// Super messy Funktionaufruf -> braucht Improvement
schreibNodePos(nodes);
zeichneBox(nodes);
console.log(gibDistanz(nodes));
//Zeichnet alle Kästchen zu guter Letzt
// + Zeichnet Label (A-Z) zu den jeweiligen Nodes
nodes.forEach((node, index) => {
  let label = String.fromCharCode('A'.charCodeAt(0)+index);
  drawKaestchen(node[0], node[1], label);
});

mobileNode();

