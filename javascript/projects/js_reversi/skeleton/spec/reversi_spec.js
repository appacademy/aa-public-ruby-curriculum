describe("Piece", function () {
  let darkPiece,
    lightPiece;

  beforeEach(function () {
    darkPiece = new Piece("black");
    lightPiece = new Piece("white");
  });

  describe("#color", function () {
    it("should have the color assigned to it", function () {
      expect(darkPiece.color).toEqual("black");
      expect(lightPiece.color).toEqual("white");
    });
  });
  describe("#flip", function () {
    it("should switch colors when flipped", function () {
      darkPiece.flip();
      expect(darkPiece.color).toEqual("white");
      lightPiece.flip();
      expect(lightPiece.color).toEqual("black");
    });
  });

  describe('#toString', function () {
    it('should return a letter representing the color', function () {
      expect(lightPiece.toString()).toEqual('W');
      expect(darkPiece.toString()).toEqual('B');
    });
  });
});

describe("Board", function () {
  let testBoard;

  beforeEach(function () {
    testBoard = new Board();
  });

  const fillBoard = function (board) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        board.grid[i][j] = new Piece("white");
      }
    }
  };

  describe("#grid", function () {
    it("should be 8x8", function () {
      expect(testBoard.grid.length).toEqual(8);
      for (let i = 0; i < 8; i++) {
        expect(testBoard.grid[i].length).toEqual(8);
      }
    });

    it("should begin with 4 pieces in the center", function () {
      expect(testBoard.grid[3][3].color).toEqual("white");
      expect(testBoard.grid[3][4].color).toEqual("black");
      expect(testBoard.grid[4][3].color).toEqual("black");
      expect(testBoard.grid[4][4].color).toEqual("white");
    });

    it("should start out empty except for the 4 center pieces", function () {
      testBoard.grid.forEach(function (row, i) {
        for (let j = 0; j < 8; j++) {
          if ((i !== 3 && i !== 4) || (j !== 3 && j !== 4)) {
            expect(testBoard.grid[i][j]).toBeUndefined();
          }
          else
            expect(testBoard.grid[i][j]).not.toBeUndefined();
        }
      }); 
    });
  });

  describe('#isValidPos', function () {
    it('should return false when x or y is less than 0', function () {
      expect(testBoard.isValidPos([-1, 1])).toEqual(false);
      expect(testBoard.isValidPos([1, -1])).toEqual(false);
    });

    it('should return false when x or y is greater than 7', function () {
      expect(testBoard.isValidPos([9, 1])).toEqual(false);
      expect(testBoard.isValidPos([1, 9])).toEqual(false);
    });

    it('should return true otherwise', function () {
      expect(testBoard.isValidPos([3, 3])).toEqual(true);
    });
  });

  describe('#getPiece', function () {
    it('should return a piece for an occupied position', function () {
      expect(testBoard.getPiece([3, 4]) instanceof Piece).toBeTruthy();
    });

    it('should return undefined for an empty position', function () {
      expect(testBoard.getPiece([0, 0])).toEqual(undefined);
    });

    it('should throw an error for an invalid position', function () {
      function pickInvalidPos() {
        testBoard.getPiece([10, 10]);
      }
      expect(pickInvalidPos).toThrow(new Error('Not valid pos!'));
    });
  });

  describe('#isMine', function () {
    it('should return true when the retrieved piece matches the color', function () {
      expect(testBoard.isMine([3, 3], 'white')).toEqual(true);
    });

    it('should return false when retrieved piece does not match', function () {
      expect(testBoard.isMine([3, 3], 'black')).toEqual(false);
    });

    it('should return falsey when retrieved piece is undefined', function () {
      expect(!testBoard.isMine([0, 0], 'black')).toEqual(true);
    });
  });

  describe("#isOccupied", function () {
    it('should return true if there is a piece on a position', function () {
      expect(testBoard.isOccupied([3, 3])).toEqual(true)
      expect(testBoard.isOccupied([3, 4])).toEqual(true)
    })

    it("should return false if there isn't a piece on a position", function () {
      expect(testBoard.isOccupied([3, 5])).toEqual(false)
      expect(testBoard.isOccupied([4, 5])).toEqual(false)
    })
  })

  describe("#_positionsToFlip", function () {
    it('returns empty array when pos is not on the board', function () {
      expect(testBoard._positionsToFlip([-1, -1], "white", [1, 0]).length).toEqual(0);
      expect(testBoard._positionsToFlip([9, 9], "white", [1, 0]).length).toEqual(0);
    })

    it("returns empty array when there is a blank space one position away from the current position", function () {
      expect(testBoard._positionsToFlip([4, 6], "white", [0, 1]).length).toEqual(0);
      expect(testBoard._positionsToFlip([4, 6], "white", [-1, 1]).length).toEqual(0);
      expect(testBoard._positionsToFlip([4, 6], "white", [-1, 0]).length).toEqual(0);
      expect(testBoard._positionsToFlip([4, 6], "white", [0, -1]).length).toEqual(0);
      expect(testBoard._positionsToFlip([4, 6], "white", [-1, -1]).length).toEqual(0);;
      expect(testBoard._positionsToFlip([4, 6], "white", [1, 0]).length).toEqual(0);
      expect(testBoard._positionsToFlip([4, 6], "white", [1, 1]).length).toEqual(0);
      expect(testBoard._positionsToFlip([4, 6], "white", [1, -1]).length).toEqual(0);
    })

    it("returns empty array if no pieces of the opposite color are found", function () {
      let traversalDoesntFlipTestBoard = new Board();
      traversalDoesntFlipTestBoard.grid[6][2] = new Piece("white");

      expect(testBoard._positionsToFlip([4, 5], "white", [0, -1]).length).toEqual(0);
      expect(testBoard._positionsToFlip([5, 4], "white", [-1, 0]).length).toEqual(0);
      expect(testBoard._positionsToFlip([5, 5], "white", [-1, -1]).length).toEqual(0);
      expect(testBoard._positionsToFlip([3, 2], "white", [0, 1]).length).toEqual(0);
      expect(testBoard._positionsToFlip([2, 2], "white", [1, 1]).length).toEqual(0);
      expect(testBoard._positionsToFlip([2, 3], "white", [1, 0]).length).toEqual(0);
      expect(testBoard._positionsToFlip([7, 1], "white", [-1, 1]).length).toEqual(0);
      expect(testBoard._positionsToFlip([5, 3], "white", [1, -1]).length).toEqual(0);
    });

    it("returns empty array if no piece of the same color is on the other end", function () {
      let correspondingColorTestBoard = new Board();
      correspondingColorTestBoard.grid[0][0] = new Piece("white");
      correspondingColorTestBoard.grid[0][2] = new Piece("white");
      correspondingColorTestBoard.grid[0][3] = new Piece("white");

      expect(correspondingColorTestBoard._positionsToFlip([0, 1], "black", [0, -1]).length).toEqual(0);
      expect(correspondingColorTestBoard._positionsToFlip([0, 1], "black", [0, 1]).length).toEqual(0);
    });
    
    beforeEach(function () {
      testBoardLongHorzDiagonal = new Board();

      testBoardLongHorzDiagonal.grid[1][1] = new Piece("black")
      testBoardLongHorzDiagonal.grid[1][3] = new Piece("black")
      testBoardLongHorzDiagonal.grid[1][4] = new Piece("white")
      testBoardLongHorzDiagonal.grid[1][6] = new Piece("white")
      testBoardLongHorzDiagonal.grid[1][7] = new Piece("white")

      testBoardLongHorzDiagonal.grid[2][0] = new Piece("black")
      testBoardLongHorzDiagonal.grid[2][2] = new Piece("white")
      testBoardLongHorzDiagonal.grid[2][3] = new Piece("white")
      testBoardLongHorzDiagonal.grid[2][4] = new Piece("black")
      testBoardLongHorzDiagonal.grid[2][5] = new Piece("black")
      testBoardLongHorzDiagonal.grid[2][7] = new Piece("black")

      testBoardLongHorzDiagonal.grid[3][0] = new Piece("black")
      testBoardLongHorzDiagonal.grid[3][2] = new Piece("white")
      testBoardLongHorzDiagonal.grid[3][3] = new Piece("white")
      testBoardLongHorzDiagonal.grid[3][4] = new Piece("black")
      testBoardLongHorzDiagonal.grid[3][5] = new Piece("black")
      testBoardLongHorzDiagonal.grid[3][7] = new Piece("black")

      testBoardLongHorzDiagonal.grid[4][0] = new Piece("black")
      testBoardLongHorzDiagonal.grid[4][1] = new Piece("black")
      testBoardLongHorzDiagonal.grid[4][3] = new Piece("black")
      testBoardLongHorzDiagonal.grid[4][4] = new Piece("white")
      testBoardLongHorzDiagonal.grid[4][6] = new Piece("white")
      testBoardLongHorzDiagonal.grid[4][7] = new Piece("black")

      testBoardLongHorzDiagonal.grid[5][0] = new Piece("white")

      testBoardLongHorzDiagonal.grid[6][2] = new Piece("white")
      testBoardLongHorzDiagonal.grid[6][3] = new Piece("white")
      testBoardLongHorzDiagonal.grid[6][4] = new Piece("white")
      testBoardLongHorzDiagonal.grid[6][5] = new Piece("white")
      testBoardLongHorzDiagonal.grid[6][6] = new Piece("black")

      testBoardLongHorzDiagonal.grid[7][1] = new Piece("black")
      testBoardLongHorzDiagonal.grid[7][2] = new Piece("white")
      testBoardLongHorzDiagonal.grid[7][3] = new Piece("white")
      testBoardLongHorzDiagonal.grid[7][4] = new Piece("white")
      testBoardLongHorzDiagonal.grid[7][5] = new Piece("white")

    });


    it("returns positions for longer horizontal and vertical cases ", function () {
      //long vertical cases
      expect(JSON.stringify(testBoardLongHorzDiagonal._positionsToFlip([1, 0], "white", [1, 0]))).toEqual(JSON.stringify([[2, 0], [3, 0], [4, 0]]));
      expect(JSON.stringify(testBoardLongHorzDiagonal._positionsToFlip([5, 7], "white", [-1, 0]))).toEqual(JSON.stringify([[4, 7], [3, 7], [2, 7]]));

      //long horizontal cases
      expect(JSON.stringify(testBoardLongHorzDiagonal._positionsToFlip([6, 1], "black", [0, 1]))).toEqual(JSON.stringify([[6, 2], [6, 3], [6, 4], [6, 5]]));
      expect(JSON.stringify(testBoardLongHorzDiagonal._positionsToFlip([7, 6], "black", [0, -1]))).toEqual(JSON.stringify([[7, 5], [7, 4], [7, 3], [7, 2]]));
    });

    it("returns positions for longer diagonal cases", function () {
      expect(JSON.stringify(testBoardLongHorzDiagonal._positionsToFlip([5, 2], "white", [-1, 1]))).toEqual(JSON.stringify([[4, 3], [3, 4], [2, 5]]));
      expect(JSON.stringify(testBoardLongHorzDiagonal._positionsToFlip([5, 5], "black", [-1, -1]))).toEqual(JSON.stringify([[4, 4], [3, 3], [2, 2]]));

      expect(JSON.stringify(testBoardLongHorzDiagonal._positionsToFlip([0, 2], "white", [1, 1]))).toEqual(JSON.stringify([[1, 3], [2, 4], [3, 5]]));
      expect(JSON.stringify(testBoardLongHorzDiagonal._positionsToFlip([0, 5], "black", [1, -1]))).toEqual(JSON.stringify([[1, 4], [2, 3], [3, 2]]));
    })

  });

  describe('#validMove', function () {
    it('should return false for an occupied position', function () {
      expect(testBoard.validMove([3, 4], 'black')).toEqual(false);
    });

    it('should return false for a move that does not capture', function () {
      expect(testBoard.validMove([2, 3], "white")).toEqual(false);
    });

    it('should return true for a valid move', function () {
      expect(testBoard.validMove([2, 3], "black")).toEqual(true);
    });
  });

  describe("#placePiece", function () {
    it("should allow a player to make a valid move", function () {
      testBoard.placePiece([2, 3], "black");
      expect(testBoard.grid[2][3].color).toEqual("black");
    });

    it("should flip captured pieces", function () {
      testBoard.placePiece([2, 3], "black");
      expect(testBoard.grid[3][3].color).toEqual("black");
    });

    it("should not allow a piece on top of another piece", function () {
      function makeBadMove() {
        testBoard.placePiece([3, 3], "white");
      }
      expect(makeBadMove).toThrow(new Error("Invalid move!"));
      
    });

    it("should not allow a move that doesn't capture", function () {
      function makeBadMove() {
        testBoard.placePiece([3, 3], "white");
      }
      expect(makeBadMove).toThrow(new Error("Invalid move!"));
    });

    it("should not allow moves that isolate pieces", function () {
      function makeOtherBadMove() {
        testBoard.placePiece([0, 0], "white");
      }
      expect(makeOtherBadMove).toThrow(new Error("Invalid move!"));
      
    });
  });

  describe('#validMoves', function () {
    it('should return an empty array when there are no valid moves', function () {
      fillBoard(testBoard);
      expect(testBoard.validMoves('black').length).toEqual(0);
    });

    it('should return an array of valid moves when some are left', function () {
      const validPositions = [
        [2, 3],
        [3, 2],
        [4, 5],
        [5, 4]
      ];
      const actualPositions = testBoard.validMoves('black');

      expect(actualPositions.length).toEqual(validPositions.length);

      actualPositions.forEach(function (actualPosition, index) {
        let validPosition = validPositions[index];
        expect(actualPosition[0]).toEqual(validPosition[0]);
        expect(actualPosition[1]).toEqual(validPosition[1]);
      });
    });
  });

  describe('#hasMove', function () {
    it('should return true when a color has one or more moves', function () {
      expect(testBoard.hasMove('black')).toEqual(true);
    });

    it('should return false when a color has no more moves', function () {
      fillBoard(testBoard);
      expect(testBoard.hasMove('black')).toEqual(false);
    });
  });

  describe('#isOver', function () {
    it('should return false at the start', function () {
      expect(testBoard.isOver()).toEqual(false);
    });

    it('should return true when there are no more moves', function () {
      fillBoard(testBoard);
      expect(testBoard.isOver()).toEqual(true);
    });
  });
});
   