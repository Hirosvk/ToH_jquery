const TowerOfHanoi = require("./towerOfHanoi.js");

function GameDisplay(){
}

GameDisplay.prototype.initialSetup = function () {
  // setup event listener on the start button
  // setup reset button listener.
};

GameDisplay.prototype.start = function (event) {
  // set this.currentPlayer
  // create new game
  // setTowerListeners
};

GameDisplay.prototype.reset = function (event) {
  // nullify this.currentPlayer
  // clear event listeners
};

GameDisplay.prototype.setTowerListeners = function () {
  // setup 'click' event listener to the towers.
};

GameDisplay.prototype.processMove = function (fromId, toId) {
  this.game.processMove(fromId, toId);
};

GameDisplay.prototype.registerTowerId = function (event) {
  // if a tower is already selected
  //    if the same tower is clicked again.
  //      - set the tower's status non-active.
  //      - set this.selectedTower undefined
  //    else
  //      - call this.processMove
  //      if move is invalid
  //        - display error message
  //      - set this.selectedTower undefined
  // else
  //    - set the towers' status active.
  //    - set this.selectedTower with the new id.

};

GameDisplay.prototype.renderGame = function () {
  // clear current disk configs
  // append disks
  // append numOfMoves
  // append error messages if any
};

GameDisplay.prototype.renderInfo = function () {
  // clear current info
  // append player name
};

module.exports = GameDisplay;
