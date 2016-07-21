function Lineup() {
  this.playerList = [];
}

// Public functions
Lineup.prototype.addPlayer = function(player) {
  this.playerList.push(player);
};

Lineup.prototype.getPositionCount = function(position) {
  var count = 0;

  this.playerList.forEach(function(element, index, array) {
    count += element.position == position ? 1 : 0;
  });

  return count;
};

Lineup.prototype.calculateTotalSalary = function() {
  return this.playerList.reduce(function(prev, curr, ind, arr) {
    return prev + curr.salary;
  }, 0);
};

Lineup.prototype.removePlayer = function(player) {
  this.playerList.splice(this.playerList.indexOf(player), 1);
};

module.exports = Lineup;
