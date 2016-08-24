/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const TowerOfHanoi = __webpack_require__(1);
	const GameDisplay = __webpack_require__(2);
	
	$(function(){
	  const game = new GameDisplay();
	  game.initialSetup();
	})
	
	window.TowerOfHanoi = TowerOfHanoi;
	window.GameDisplay = GameDisplay;


/***/ },
/* 1 */
/***/ function(module, exports) {

	function TowerOfHanoi(n){
	  this.numOfDisks = n;
	  this.towers = [[],[],[]];
	  this.numOfMoves = 0;
	}
	
	TowerOfHanoi.factory = function(num){
	  const tower = new TowerOfHanoi(num);
	  tower.setDisks(num);
	  return tower;
	}
	
	TowerOfHanoi.prototype.moveDisk = function (fromId, toId) {
	  const movingDisk = this.towers[fromId].pop();
	  this.towers[toId].push(movingDisk);
	  this.numOfMoves++;
	};
	
	TowerOfHanoi.prototype.solved = function () {
	  if (this.towers[0].length == 0 &&
	      (this.towers[1].length == this.numOfDisks ||
	       this.towers[2].length == this.numOfDisks)){
	    return true;
	  } else {
	    return false;
	  }
	};
	
	TowerOfHanoi.prototype.validMove = function (fromId, toId) {
	  if (fromId > 2 || fromId < 0 || toId > 2 || toId < 0) { return false; }
	
	  const movingDisk = this.towers[fromId].length > 0
	                   ? this.towers[fromId][this.towers[fromId].length-1]
	                   : false;
	  const receivingDisk = this.towers[toId].length > 0
	                      ? this.towers[toId][this.towers[toId].length-1]
	                      : false;
	  if (movingDisk){
	    if (!receivingDisk){
	      return true;
	    } else if (movingDisk < receivingDisk){
	      return true;
	    }
	  }
	  return false;
	};
	
	TowerOfHanoi.prototype.processMove = function (fromId, toId) {
	  if (this.validMove(fromId, toId)){
	    this.moveDisk(fromId, toId);
	    return true;
	  } else {
	    return false;
	  }
	};
	
	TowerOfHanoi.prototype.setDisks = function (num) {
	  for(let i = num; i >= 1; i--){
	    this.towers[0].push(i);
	  }
	};
	
	
	module.exports = TowerOfHanoi;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const TowerOfHanoi = __webpack_require__(1);
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
	  // event.currentTarget is a HTMLElement. So, to use find() function
	  // I need to make it in to jQuery object.
	
	  this.game = TowerOfHanoi.factory(parseInt(this.numOfDisks));
	  this.message = `Good luck, ${this.playerName}`;
	
	  this._registerTowerId = this.registerTowerId.bind(this)
	  $("#game-board").on("click", ".tower", this._registerTowerId);
	
	  this.toggleInput();
	  // $("form").find("input[type=text]").attr("disabled", "true");
	  // $("form").find("input[type=number]").attr("disabled", "true");
	
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
	
	GameDisplay.prototype.setTowerListeners = function () {
	  // setup 'click' event listener to the towers.
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
	        this.message = `Move #: ${this.game.numOfMoves}`
	      } else {
	        this.message = "Invalid Move!";
	      }
	      $(`.tower#${this.selectedTower}`).removeClass("active");
	      this.render();
	    }
	    this.selectedTower = -1;
	    $(`.tower#${towerId}`).removeClass("active");
	  }
	  // if a tower is already selected
	  //    if the same tower is clicked again.
	  //      - set the tower's status non-active.
	  //      - set this.selectedTower undefined
	  //    else
	  //      - call this.processMove
	  //      if move is invalid
	  //        - display error message
	  //      - set this.selectedTower undefined
	  // render()
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map