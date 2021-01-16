const Game = function (numOfElemsOnMargin) {
  this.numOfElemsOnMargin = numOfElemsOnMargin; //
  // Creates a grid with the indicated number of elements per line. Since the
  // canvas isn't infinite, it adds a certain number of elements in the outter side
  // of the grid.
  this.createGrid = function (elementsPerLine) {
    this.arrayOfElements = new Array(
      elementsPerLine + this.numOfElemsOnMargin * 2
    );
    for (let i = 0; i < this.arrayOfElements.length; i++) {
      this.arrayOfElements[i] = new Array(this.arrayOfElements.length);
      for (let j = 0; j < this.arrayOfElements.length; j++) {
        this.arrayOfElements[i][j] = 0;
      }
    }
    return this.arrayOfElements;
  };
  // Updates the array based at the current state.
  this.updateGrid = function (previousArray) {
    let arrayLength = this.arrayOfElements.length;
    let counter;
    this.tempArray = new Array(arrayLength);
    for (let i = 0; i < arrayLength; i++) {
      this.tempArray[i] = new Array(arrayLength);
      for (let j = 0; j < arrayLength; j++) {
        this.tempArray[i][j] = 0;
      }
    }

    // Counts alive neighbors
    for (let i = 0; i < arrayLength; i++) {
      for (let j = 0; j < arrayLength; j++) {
        counter = 0;
        if (j - 1 > -1) {
          if (previousArray[i][j - 1] === 1) {
            counter++;
          }
        }
        if (j + 1 < arrayLength) {
          if (previousArray[i][j + 1] === 1) {
            counter++;
          }
        }
        if (i - 1 > -1) {
          if (previousArray[i - 1][j] === 1) {
            counter++;
          }
        }
        if (i + 1 < arrayLength) {
          if (previousArray[i + 1][j] === 1) {
            counter++;
          }
        }
        if (j + 1 < arrayLength && i + 1 < arrayLength) {
          if (previousArray[i + 1][j + 1] === 1) {
            counter++;
          }
        }
        if (j - 1 > -1 && i + 1 < arrayLength) {
          if (previousArray[i + 1][j - 1] === 1) {
            counter++;
          }
        }
        if (j + 1 < arrayLength && i - 1 > -1) {
          if (previousArray[i - 1][j + 1] === 1) {
            counter++;
          }
        }
        if (j - 1 > -1 && i - 1 > -1) {
          if (previousArray[i - 1][j - 1] === 1) {
            counter++;
          }
        }
        // Changes the state considering the number os alive neighbors and the current state
        if (counter < 2 && previousArray[i][j] === 1) {
          this.tempArray[i][j] = 0;
        } else if (counter > 3 && previousArray[i][j] === 1) {
          this.tempArray[i][j] = 0;
        } else if (counter === 3 && previousArray[i][j] === 0) {
          this.tempArray[i][j] = 1;
        } else {
          this.tempArray[i][j] = previousArray[i][j];
        }
      }
    }
    // Refreshes the array of elements
    this.arrayOfElements = this.tempArray;
  };
  // Creates a shape (first button)
  this.createShape = function (elementsPerLine, shapeNumber) {
    this.createGrid(elementsPerLine);
    let offsetElements; // Creates an offset to position the shape in the center of the canvas
    if (elementsPerLine == 10) {
      offsetElements = 0;
    } else if (elementsPerLine == 25) {
      offsetElements = 8;
    } else if (elementsPerLine == 50) {
      offsetElements = 20;
    } else {
      offsetElements = 45;
    }
    if (shapeNumber == 0) {
      this.arrayOfElements[this.numOfElemsOnMargin + 4 + offsetElements][
        this.numOfElemsOnMargin + 4 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 4 + offsetElements][
        this.numOfElemsOnMargin + 5 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 4 + offsetElements][
        this.numOfElemsOnMargin + 6 + offsetElements
      ] = 1;
    }
    if (shapeNumber == 1) {
      this.arrayOfElements[this.numOfElemsOnMargin + 4 + offsetElements][
        this.numOfElemsOnMargin + 4 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 4 + offsetElements][
        this.numOfElemsOnMargin + 5 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 4 + offsetElements][
        this.numOfElemsOnMargin + 6 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 5 + offsetElements][
        this.numOfElemsOnMargin + 5 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 5 + offsetElements][
        this.numOfElemsOnMargin + 6 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 5 + offsetElements][
        this.numOfElemsOnMargin + 7 + offsetElements
      ] = 1;
    }
    if (shapeNumber == 2) {
      this.arrayOfElements[this.numOfElemsOnMargin + 4 + offsetElements][
        this.numOfElemsOnMargin + 4 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 4 + offsetElements][
        this.numOfElemsOnMargin + 5 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 5 + offsetElements][
        this.numOfElemsOnMargin + 4 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 5 + offsetElements][
        this.numOfElemsOnMargin + 5 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 6 + offsetElements][
        this.numOfElemsOnMargin + 6 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 6 + offsetElements][
        this.numOfElemsOnMargin + 7 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 7 + offsetElements][
        this.numOfElemsOnMargin + 6 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 7 + offsetElements][
        this.numOfElemsOnMargin + 7 + offsetElements
      ] = 1;
    }
    if (shapeNumber == 3) {
      this.arrayOfElements[this.numOfElemsOnMargin + 4 + offsetElements][
        this.numOfElemsOnMargin + 1 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 3 + offsetElements][
        this.numOfElemsOnMargin + 1 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 5 + offsetElements][
        this.numOfElemsOnMargin + 1 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 4 + offsetElements][
        this.numOfElemsOnMargin + 2 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 4 + offsetElements][
        this.numOfElemsOnMargin + 3 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 4 + offsetElements][
        this.numOfElemsOnMargin + 4 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 4 + offsetElements][
        this.numOfElemsOnMargin + 5 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 4 + offsetElements][
        this.numOfElemsOnMargin + 6 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 3 + offsetElements][
        this.numOfElemsOnMargin + 6 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 5 + offsetElements][
        this.numOfElemsOnMargin + 6 + offsetElements
      ] = 1;
    }
    if (shapeNumber == 4) {
      this.arrayOfElements[this.numOfElemsOnMargin + offsetElements][
        this.numOfElemsOnMargin + 4 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 1 + offsetElements][
        this.numOfElemsOnMargin + 4 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 2 + offsetElements][
        this.numOfElemsOnMargin + 3 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 2 + offsetElements][
        this.numOfElemsOnMargin + 5 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 3 + offsetElements][
        this.numOfElemsOnMargin + 4 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 4 + offsetElements][
        this.numOfElemsOnMargin + 4 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 5 + offsetElements][
        this.numOfElemsOnMargin + 4 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 6 + offsetElements][
        this.numOfElemsOnMargin + 4 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 7 + offsetElements][
        this.numOfElemsOnMargin + 5 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 7 + offsetElements][
        this.numOfElemsOnMargin + 3 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 8 + offsetElements][
        this.numOfElemsOnMargin + 4 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 9 + offsetElements][
        this.numOfElemsOnMargin + 4 + offsetElements
      ] = 1;
    }
    if (shapeNumber == 5) {
      this.arrayOfElements[this.numOfElemsOnMargin + 2 + offsetElements][
        this.numOfElemsOnMargin + 2 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 2 + offsetElements][
        this.numOfElemsOnMargin + 3 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 2 + offsetElements][
        this.numOfElemsOnMargin + 4 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + 1 + offsetElements][
        this.numOfElemsOnMargin + 4 + offsetElements
      ] = 1;
      this.arrayOfElements[this.numOfElemsOnMargin + offsetElements][
        this.numOfElemsOnMargin + 3 + offsetElements
      ] = 1;
    }
    if (shapeNumber == 6) {
      for (let i = 0; i < this.arrayOfElements.length; i++) {
        this.arrayOfElements[i] = new Array(this.arrayOfElements.length);
        for (let j = 0; j < this.arrayOfElements.length; j++) {
          this.arrayOfElements[i][j] = Math.floor(Math.random() * 2);
        }
      }
    }
  };
};
