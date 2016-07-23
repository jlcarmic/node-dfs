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

  return errors;
};

// Private functions
function validateMaximumFromTeams(lineup, maxFromTeam) {
  var counts = lineup.getTeamCounts();

  for(var team in counts) {
    if(counts[team] > maxFromTeam) {
      return false;
    }
  }

  return true;
}

function validateMaximumSalary(lineup, maxSalary) {
  return lineup.calculateTotalSalary() <= maxSalary;
}

function validateMinimumGames(lineup, minGames) {
  return lineup.getGameList().length >= minGames;
}

module.exports = Contest;
