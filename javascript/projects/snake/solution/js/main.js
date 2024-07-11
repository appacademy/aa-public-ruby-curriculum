const SnakeView = require('./snake-view');

$(function () {
  const rootEl = $('.snake-game');
  new SnakeView(rootEl);
});
