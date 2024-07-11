class View {
  constructor(game, el) {
    this.game = game;
    this.el = el;
    // bind the context for the 'handleClick' function
    this.handleClick = this.handleClick.bind(this)
    this.setupBoard()
    this.bindEvents()
  }
  
  setupBoard() {
    const ul = document.createElement("ul");

    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      for (let colIdx = 0; colIdx < 3; colIdx++) {
        const li = document.createElement("li");
        // Setting data-* attributes with dataset will convert them automatically to a string
        // However this will not be an easily parsible format for arrays
        // We're using the JSON.stringify method to make it easier for us to use later
        li.dataset.pos = JSON.stringify([rowIdx, colIdx])
        ul.append(li);
      }
    }

    this.el.append(ul);

  }
  
  bindEvents() {
    // Install a click listener on the board
    this.el.addEventListener("click", this.handleClick)
  }

  handleClick(e){
    const el = e.target
    // Only makeMove if the event target is an li
    if (el.nodeName === "LI") {
      this.makeMove(el)
    }
  }

  makeMove(square) {
    // JSON.parse will convert the json string back into an array
    const pos = JSON.parse(square.dataset.pos);
    const currentPlayer = this.game.currentPlayer;

    try {
      this.game.playMove(pos);
    } catch (e) {
      alert("This " + e.msg.toLowerCase());
    }

    square.classList.add(currentPlayer);

    if (this.game.isOver()) this.handleGameOver()
  }
  
  handleGameOver(){
    // Remove the click listener from the board
    this.el.removeEventListener("click", this.handleClick)
    this.el.classList.add("game-over")
  
    const winner = this.game.winner();
    const figcaption = document.createElement("figcaption")
  
    if (winner) {
      this.el.classList.add(`winner-${winner}`);
      figcaption.append(`You win, ${winner}!`)
    } else {
      figcaption.append("It's a draw!")
    }
  
    this.el.append(figcaption)
  }
}

module.exports = View;
