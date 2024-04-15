// Hardgecodeete Nodes
// Können je nach Bedarf geändert werden
// Eventuell füge ich eine Funktion hinein die nach Klick die Nodes bestimmt
const nodes = [
  [100,100],
  [300, 110],
  [500, 500],
  [110, 300],
];

// Speichert den Container div als Konstante
const container = document.getElementById("container");

// Malt die "Nodes" => hab sie Kästchen genannt, fand das irgendwie süßer :)

function drawKaestchen(xPos, yPos) {
  // Erstell ein kaestchen Element
  // Styling ist rot, kann in style.css bearbeitet werden
  const kaestchen = document.createElement("div");
  kaestchen.classList.add("kaestchen");
  // CSS Styling, je nach Parameter werden die Positionen für den jeweiligen Node bestimmt
  kaestchen.style.left = xPos + "px";
  kaestchen.style.top = yPos + "px";
  // Werf es in den Container div hinein!
  container.appendChild(kaestchen);
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

function mobileNode() {
  //Da die schwarze Box nicht richtig funktioniert
  //Implementiere ich eine Funktion die Anhand gibMinmaxCoords schaut
  // dass die Maus nicht außerhalb der Box geht.

  let { minX, minY, maxX, maxY } = gibMinMaxCoords(nodes);

  const mobileNode = document.createElement("div");
  mobileNode.classList.add("kaestchen");
  container.appendChild(mobileNode);

  document.addEventListener("mousemove", function (event) {
    // berechne die neue Position nach jeder Mausbewegung
    let newX = event.clientX;
    let newY = event.clientY;

    //  Super langsam, muss verbessert werden, aber funktioniert! :D

    if (newX >= minX && newX <= maxX && newY >= minY && newY <= maxY) {
      mobileNode.style.left = newX + "px";
      mobileNode.style.top = newY + "px";
    }
  });
}

zeichneBox(nodes);
console.log(gibDistanz(nodes));
//Zeichnet alle Kästchen zu guter Letzt
nodes.forEach((nodes) => drawKaestchen(...nodes));

mobileNode();
