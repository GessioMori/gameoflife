const Display = function (
  stageContainer,
  backgroundCanvas,
  gameCanvas,
  numOfElemsOnMargin
) {
  this.stageContainer = stageContainer;
  this.backgroundCanvas = backgroundCanvas;
  this.gameCanvas = gameCanvas;
  this.backgroundCtx = this.backgroundCanvas.getContext("2d");
  this.gameCtx = this.gameCanvas.getContext("2d");

  this.backgroundCanvas.width = this.gameCanvas.width = 1000;
  this.backgroundCanvas.height = this.gameCanvas.height = 1000;
  this.sizeMultiplier = 0.6;

  this.aspectRatio = this.gameCanvas.width / this.gameCanvas.height;

  this.numOfElemsOnMargin = numOfElemsOnMargin;

  this.resize = function () {
    let divHeight, divWidth, newHeight, newWidth;

    divHeight =
      parseInt(document.getElementById("stageContainer").clientHeight) * 0.9;
    divWidth =
      parseInt(document.getElementById("stageContainer").clientWidth) * 0.9;

    if (divHeight > divWidth / this.aspectRatio) {
      newWidth = `${divWidth}px`;
      newHeight = `${Math.floor(divWidth / this.aspectRatio)}px`;
    } else {
      newHeight = `${divHeight}px`;
      newWidth = `${divHeight * this.aspectRatio}px`;
    }

    this.backgroundCanvas.style.height = this.gameCanvas.style.height = newHeight;
    this.backgroundCanvas.style.width = this.gameCanvas.style.width = newWidth;
  };

  this.showGrid = function (elementsPerLine) {
    this.backgroundCtx.fillStyle = "#b5c2c7";
    this.backgroundCtx.strokeStyle = "#7c868a";
    this.backgroundCtx.fillRect(
      0,
      0,
      this.backgroundCanvas.width,
      this.backgroundCanvas.height
    );

    this.elementSize = this.backgroundCanvas.width / elementsPerLine;

    for (let x = 0; x <= this.backgroundCanvas.width; x += this.elementSize) {
      this.backgroundCtx.beginPath();
      this.backgroundCtx.moveTo(x, 0);
      this.backgroundCtx.lineTo(x, this.backgroundCanvas.height);
      this.backgroundCtx.closePath();
      this.backgroundCtx.stroke();
    }
    for (let y = 0; y <= this.backgroundCanvas.height; y += this.elementSize) {
      this.backgroundCtx.beginPath();
      this.backgroundCtx.moveTo(0, y);
      this.backgroundCtx.lineTo(this.backgroundCanvas.width, y);
      this.backgroundCtx.closePath();
      this.backgroundCtx.stroke();
    }
  };

  this.showElements = function (arrayOfElements) {
    this.gameCtx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    this.gameCtx.fillStyle = "#ffdd91";
    for (
      let i = this.numOfElemsOnMargin;
      i < arrayOfElements.length - this.numOfElemsOnMargin;
      i++
    ) {
      for (
        let j = this.numOfElemsOnMargin;
        j < arrayOfElements.length - this.numOfElemsOnMargin;
        j++
      ) {
        if (arrayOfElements[j][i] === 1) {
          this.gameCtx.fillRect(
            (i - this.numOfElemsOnMargin) * this.elementSize + 1,
            (j - this.numOfElemsOnMargin) * this.elementSize + 1,
            this.elementSize - 2,
            this.elementSize - 2
          );
        }
      }
    }
  };
};
