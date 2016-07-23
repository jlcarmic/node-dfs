function Contest(data) {
  this.maxSalary = data.maxSalary === undefined ? 50000 : data.maxSalary;
  this.minGames = data.minGames === undefined ? 2 : data.minGames;
  this.positionCounts = data.positionCounts === undefined ? {} : data.positionCounts;
  this.totalFromTeam = data.totalFromTeam === undefined ? 3 : data.totalFromTeam;
}

// Public functions
Contest.prototype.validateLineup = function(lineup) {
  var errors = [];

  if(!validateMaximumSalary(lineup, this.maxSalary)) {
    errors.push(new Error("Lineup salary exceeds maximum salary for this contest"));
  }

  if(!validateMinimumGames(lineup, this.minGames)) {
    errors.push(new Error("Unique games in lineup is less than the minimum games for this contest"));
  }

  return errors;
};

// Private functions
function validateMaximumSalary(lineup, maxSalary) {
  return lineup.calculateTotalSalary() <= maxSalary;
}

function validateMinimumGames(lineup, minGames) {
  return lineup.getGameList().length >= minGames;
}
}

module.exports = Contest;
