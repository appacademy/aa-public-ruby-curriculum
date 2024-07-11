class Coord {
  constructor(i, j) {
    this.i = i;
    this.j = j;
  }

  equals(coord2) {
      return (this.i == coord2.i) && (this.j == coord2.j);
  }

  isOpposite(coord2) {
    return (this.i == (-1 * coord2.i)) && (this.j == (-1 * coord2.j));
  }

  plus(coord2) {
    return new Coord(this.i + coord2.i, this.j + coord2.j);
  }
}

module.exports = Coord;
