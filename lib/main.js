const TowerOfHanoi = require('./game/towerOfHanoi.js');
const GameDisplay = require('./game/display.js');

$(function(){
  const game = new GameDisplay();
  game.initialSetup();
})

window.TowerOfHanoi = TowerOfHanoi;
window.GameDisplay = GameDisplay;
