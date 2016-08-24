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
