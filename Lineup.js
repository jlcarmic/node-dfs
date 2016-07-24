function Lineup() {
  this.playerList = [];
}

// Public functions
Lineup.prototype.addPlayer = function(player) {
  this.playerList.push(player);
};

Lineup.prototype.calculateTotalSalary = function() {
  return this.playerList.reduce(function(prev, curr, ind, arr) {
    return prev + curr.salary;
  }, 0);
};

Lineup.prototype.getGameCounts = function() {
  return this.playerList.reduce(function(prev, curr, ind, arr) {
    prev[curr.gameId] = prev[curr.gameId] === undefined ? 1 : prev[curr.gameId]+1;
    return prev;
  }, {});
};

Lineup.prototype.getPositionCounts = function() {
  return this.playerList.reduce(function(prev, curr, ind, arr) {
    prev[curr.position] = prev[curr.position] === undefined ? 1 : prev[curr.position]+1;
    return prev;
  }, {});
};

Lineup.prototype.getTeamCounts = function() {
  return this.playerList.reduce(function(prev, curr, ind, arr) {
    prev[curr.team] = prev[curr.team] === undefined ? 1 : prev[curr.team]+1;
    return prev;
  }, {});
};

Lineup.prototype.removePlayer = function(player) {
  this.playerList.splice(this.playerList.indexOf(player), 1);
};

module.exports = Lineup;
