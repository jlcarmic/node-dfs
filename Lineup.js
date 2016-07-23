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

Lineup.prototype.getPositionCount = function(position) {
  var count = 0;

  this.playerList.forEach(function(element, index, array) {
    count += element.position == position ? 1 : 0;
  });

  return count;
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
