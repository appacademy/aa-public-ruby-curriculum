const View = require("./ttt-view");
const Game = require("../ttt_node/game");

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  const rootEl = document.querySelector(".ttt");
  new View(game, rootEl);
});
