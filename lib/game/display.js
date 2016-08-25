const TowerOfHanoi = require("./towerOfHanoi.js");
const OriginalMessage = "Please enter your name and the number of disks you want to set.\nWhen ready, click 'Start' button!";

function GameDisplay(){
  this.message = OriginalMessage;
  this.selectedTower = -1;
}

GameDisplay.prototype.initialSetup = function () {
  let $form = $("#game-form");
  $form.on("submit", this.start.bind(this));
  $("#reset-button").on("click", this.reset.bind(this));
  $("#message").append(this.message)
};

GameDisplay.prototype.start = function (event) {
  event.preventDefault();
  this.playerName = $(event.currentTarget).find("#player-name").val();
  this.numOfDisks = $(event.currentTarget).find("#disk-number").val();

  this.game = TowerOfHanoi.factory(parseInt(this.numOfDisks));
  this.message = `Good luck, ${this.playerName}`;

  this._registerTowerId = this.registerTowerId.bind(this)
  $("#game-board").on("click", ".tower", this._registerTowerId);

  this.toggleInput();
  this.render();
};

GameDisplay.prototype.reset = function (event) {
  event.preventDefault();
  this.game = undefined;
  this.message = OriginalMessage;
  $("#game-board").off("click", ".tower", this._registerTowerId);
  this.toggleInput();
  this.render();
};


GameDisplay.prototype.processMove = function (fromId, toId) {
  return this.game.processMove(fromId, toId);
};

GameDisplay.prototype.registerTowerId = function (event) {
  let towerId = parseInt($(event.currentTarget).attr("id"));

  if (this.selectedTower >= 0){
    if(this.selectedTower != towerId){
      let result = this.processMove(this.selectedTower, towerId);
      if (result) {
        if (this.game.solved()){
          this.message = `Congratulations, ${this.playerName}. You solved it!`;
        } else {
          this.message = `Move #: ${this.game.numOfMoves}`;
        }
      } else {
        this.message = "Invalid Move!";
      }
      $(`.tower#${this.selectedTower}`).removeClass("active");
      this.render();
    }
    this.selectedTower = -1;
    $(`.tower#${towerId}`).removeClass("active");
  }
  else {
    this.selectedTower = towerId;
    $(`.tower#${towerId}`).addClass("active");
  }

};

GameDisplay.prototype.render = function () {
  let $towers = $(".tower");
  $towers.empty();

  if (this.game){
    $towers.each((i,towerEl) => {
      let idx = parseInt(parseInt(towerEl.id));
      this.game.towers[idx].forEach(disk => {
        let newDisk = $(`<span></span>`);
        newDisk.addClass(`tower${disk.toString()}`);
        $(towerEl).prepend(newDisk);
      });
    });
  }
  let $message = $("#message");
  $message.empty();
  $message.append(this.message)
};

GameDisplay.prototype.toggleInput = function () {
  $("form").toggleClass("hidden");
  $("#reset-button").toggleClass("hidden");
};

module.exports = GameDisplay;
