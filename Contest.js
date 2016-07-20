function Contest(data) {
  this.maxSalary = data.maxSalary === undefined ? 50000 : data.maxSalary;
  this.positionCounts = data.positionCounts === undefined ? {} : data.positionCounts;
  this.minGames = data.minGames === undefined ? 2 : data.minGames;
  this.totalFromTeam = data.totalFromTeam === undefined ? 3 : data.totalFromTeam;
}

// Public functions
Contest.prototype.validateLineup = function(lineup) {

};

// Private functions
function validateSalary(lineup) {
  return (lineup.calculateTotalSalary() > this.maxSalary) ? false : true;
}

module.exports = Contest;
