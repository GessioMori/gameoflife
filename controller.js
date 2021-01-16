const Controller = function (
  display,
  game,
  engine,
  numOfElemsOnMargin,
  numberOfElementsPerLine
) {
  this.display = display;
  this.game = game;
  this.engine = engine;
  this.numOfElemsOnMargin = numOfElemsOnMargin;
  this.numberOfElementsPerLine = numberOfElementsPerLine;

  this.gameCanvas = document.getElementById("gameCanvas");
  this.stageContainer = document.getElementById("stageContainer");

  this.isRunning = false;

  // Function to change the state of an element
  this.changeState = function (event) {
    this.xPos = Math.floor(
      ((event.pageX - this.gameCanvas.offsetLeft) * 1000) /
        parseInt(this.gameCanvas.style.width) /
        this.display.elementSize
    );
    this.yPos = Math.floor(
      ((event.pageY -
        this.gameCanvas.offsetTop -
        this.stageContainer.offsetTop) *
        1000) /
        parseInt(this.gameCanvas.style.height) /
        this.display.elementSize
    );

    if (
      this.game.arrayOfElements[this.yPos + this.numOfElemsOnMargin][
        this.xPos + this.numOfElemsOnMargin
      ] === 1
    ) {
      this.game.arrayOfElements[this.yPos + this.numOfElemsOnMargin][
        this.xPos + this.numOfElemsOnMargin
      ] = 0;
    } else {
      this.game.arrayOfElements[this.yPos + this.numOfElemsOnMargin][
        this.xPos + this.numOfElemsOnMargin
      ] = 1;
    }
    this.display.showElements(this.game.arrayOfElements);
  };

  // Event listener to change the state of an element
  this.gameCanvas.addEventListener("mousedown", (event) => {
    this.changeState(event);
  });

  // Buttons
  // Next step button
  let nextStepButton = document.getElementById("nextStepButton");
  nextStepButton.addEventListener("click", () => {
    this.game.updateGrid(this.game.arrayOfElements);
    this.display.showElements(this.game.arrayOfElements);
    this.engine.stop();
  });
  // Creates a new grid
  let refreshGridButton = document.getElementById("refreshButton");
  refreshGridButton.addEventListener("click", () => {
    this.isRunning = false;
    startPauseText.innerText = "Iniciar";
    this.game.createGrid(this.numberOfElementsPerLine);
    this.display.showElements(this.game.arrayOfElements);
    this.engine.stop();
  });
  // Starts and pauses the game
  let startPauseButton = document.getElementById("startPauseButton");
  let startPauseText = document.getElementById("startPauseText");
  startPauseButton.addEventListener("click", () => {
    if (this.isRunning) {
      this.engine.stop();
      startPauseText.innerText = "Reiniciar";
    } else {
      this.engine.start();
      startPauseText.innerText = "Pausar";
    }
    this.isRunning = !this.isRunning;
  });
  // Creates a new shape
  let createButton = document.getElementById("createButton");
  createButton.addEventListener("click", () => {
    this.engine.stop();
    this.isRunning = false;
    startPauseText.innerText = "Iniciar";
    document.getElementById("creatorDiv").style.display = "block";
  });
  let closeButton = document.getElementById("closeButton");
  closeButton.addEventListener("click", () => {
    document.getElementById("creatorDiv").style.display = "none";
  });
  let listOfItems = document.getElementsByClassName("creatorItem");
  for (let item = 0; item < listOfItems.length; item++) {
    listOfItems[item].addEventListener("click", () => {
      document.getElementById("creatorDiv").style.display = "none";

      this.game.createShape(this.numberOfElementsPerLine, item);
      this.display.showElements(this.game.arrayOfElements);
    });
  }

  // Time step slider
  let timeInterval = document.getElementById("timeInterval");
  let timeIntervalText = document.getElementById("timeIntervalText");
  timeInterval.addEventListener("input", () => {
    let timeIntervalString;
    if (timeInterval.value == "1" || timeInterval.value == "2") {
      timeIntervalString = timeInterval.value + ".0";
    } else {
      timeIntervalString = timeInterval.value;
    }
    this.engine.time_step = timeInterval.value * 1000;

    timeIntervalText.textContent = `Período: ${timeIntervalString} s`;
  });
  // Number of line elements selector
  let numberOfElementsSelector = document.getElementsByName("elementsPerLine");
  for (let item = 0; item < numberOfElementsSelector.length; item++) {
    numberOfElementsSelector[item].addEventListener("change", (event) => {
      this.engine.stop();
      this.isRunning = false;
      startPauseText.innerText = "Iniciar";
      this.numberOfElementsPerLine = parseInt(event.target.value);
      this.game.createGrid(parseInt(event.target.value));
      this.display.showGrid(parseInt(event.target.value));
      this.display.showElements(this.game.arrayOfElements);
      this.display.resize();
    });
  }
};
