const Coord = require("./coord");

class Apple {
  constructor(board) {
    this.board = board;
    this.replace();
  }

  replace() {
    let x = Math.floor(Math.random() * this.board.dim);
    let y = Math.floor(Math.random() * this.board.dim);

    // Don't place an apple where there is a snake
    while (this.board.snake.isOccupying([x, y])) {
      x = Math.floor(Math.random() * this.board.dim);
      y = Math.floor(Math.random() * this.board.dim);
    }

    this.position = new Coord(x, y);
  }

}

module.exports = Apple;
