function Lineup() {
  this.playerList = [];
}

// Public functions
Lineup.prototype.addPlayer = function(player) {
  this.playerList.push(player);
};

Lineup.prototype.getGameList = function() {
  var games = [];

  this.playerList.forEach(function(element, index, array) {
    if(games.indexOf(element.gameId) === -1) {
      games.push(element.gameId);
    }
  });

  return games;
};

Lineup.prototype.getPositionCounts = function(position) {
  return this.playerList.reduce(function(prev, curr, ind, arr) {
    prev[curr.position] = prev[curr.position] === undefined ? 1 : prev[curr.position]+1;
    return prev;
  }, {});
};

Lineup.prototype.getTeamCounts = function(team) {
  return this.playerList.reduce(function(prev, curr, ind, arr) {
    prev[curr.team] = prev[curr.team] === undefined ? 1 : prev[curr.team]+1;
    return prev;
  }, {});
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
