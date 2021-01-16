let numberOfElementsPerLine = 25;
let numOfElemsOnMargin = 50;
document.getElementById("25elements").checked = true;
document.getElementById("timeInterval").value = 0.5;

let update = function () {
  game.updateGrid(game.arrayOfElements);
};

let render = function () {
  display.showElements(game.arrayOfElements);
};

let display = new Display(
  document.getElementById("stageContainer"),
  document.getElementById("backgroundCanvas"),
  document.getElementById("gameCanvas"),
  numOfElemsOnMargin
);
let game = new Game(numOfElemsOnMargin);

let engine = new Engine(500, update, render);

let controller = new Controller(
  display,
  game,
  engine,
  numOfElemsOnMargin,
  numberOfElementsPerLine
);

display.resize();
display.showGrid(numberOfElementsPerLine);
display.showElements(game.createGrid(numberOfElementsPerLine));

window.addEventListener("resize", () => {
  display.resize();
});
window.addEventListener("orientationchange", () => {
  display.resize();
});
