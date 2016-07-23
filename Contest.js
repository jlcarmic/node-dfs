var _ = require('underscore');

function Contest(data) {
  this.maxFromTeam = data.maxFromTeam === undefined ? 3 : data.maxFromTeam;
  this.maxSalary = data.maxSalary === undefined ? 50000 : data.maxSalary;
  this.minGames = data.minGames === undefined ? 2 : data.minGames;
  this.positionCounts = data.positionCounts === undefined ? {} : data.positionCounts;
}

// Public functions
Contest.prototype.validateLineup = function(lineup) {
  var errors = [];

  if(!validateMaximumFromTeams(lineup, this.maxFromTeam)) {
    errors.push(new Error("Lineup exceeds the maximum number of players from a single team for this contest"));
  }

  if(!validateMaximumSalary(lineup, this.maxSalary)) {
    errors.push(new Error("Lineup salary exceeds maximum salary for this contest"));
  }

  if(!validateMinimumGames(lineup, this.minGames)) {
    errors.push(new Error("Unique games in lineup is less than the minimum games for this contest"));
  }

  if(!validatePositionCounts(lineup, this.positionCounts)) {
    errors.push(new Error("Lineup must not have greater than or fewer players at any position than the number indicated in settings"));
  }

  return errors;
};

// Private functions
function descendingSort(a, b) {
  return b - a;
}

function validateMaximumFromTeams(lineup, maxFromTeam) {
  return _.values(lineup.getTeamCounts()).sort(descendingSort)[0] <= maxFromTeam;
}

function validateMaximumSalary(lineup, maxSalary) {
  return lineup.calculateTotalSalary() <= maxSalary;
}

function validateMinimumGames(lineup, minGames) {
  return _.keys(lineup.getGameCounts()).length >= minGames;
}

function validatePositionCounts(lineup, contestPositionCounts) {
  return _.isEqual(contestPositionCounts, lineup.getPositionCounts());
}

module.exports = Contest;
