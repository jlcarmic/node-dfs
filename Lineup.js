function Lineup(data) {
  this.playerList = [];
}

Lineup.prototype.addPlayer = function(player) {
  this.playerList.push(player);
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
