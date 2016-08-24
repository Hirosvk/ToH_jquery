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
	
	window.TowerOfHanoi = TowerOfHanoi;


/***/ },
/* 1 */
/***/ function(module, exports) {

	function TowerOfHanoi(n){
	  this.numOfDisks = n;
	  this.towers = [[],[],[]];
	  this.numOfMoves = 0;
	  // debugger;
	  // this.setDisks(this.numOfDisks);
	}
	
	TowerOfHanoi.factory = function(num){
	  const tower = new TowerOfHanoi(num);
	  tower.setDisks(num);
	  return tower;
	}
	
	TowerOfHanoi.prototype.moveDisk = function (fromId, toId) {
	  const movingDisk = this.towers[fromId].pop();
	  this.towers[toId].push(movingDisk);
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map