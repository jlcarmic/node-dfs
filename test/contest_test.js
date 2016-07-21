var expect = require('chai').expect;
var Lineup = require('../Lineup');
var Player = require('../Player');
var rewire = require('rewire');

var Contest = rewire('../Contest');

describe("Contest", function() {
  var lineup, player1, player2, priv_validateMaximumSalary;
  before(function() {
    player1 = new Player({
      "id": 58,
      "name": "John Carmichael",
      "position": "LB",
      "salary": 5000,
      "gameId": 20
    });
    player2 = new Player({
      "id": 11,
      "name": "Alex Smith",
      "position": "QB",
      "salary": 6000,
      "gameId": 21
    });

    lineup = new Lineup();
    lineup.addPlayer(player1);
    lineup.addPlayer(player2);

    // Rewire private methods for testing
    priv_validateMaximumSalary = Contest.__get__('validateMaximumSalary');
  });

  describe("validateLineup", function() {
    it("returns an empty array when all lineup validations check out as there are no errors to report", function(done) {
      var contest = new Contest({ "maxSalary": 50000, "positionCounts": {}, "minGames": 2, "totalFromTeam": 3 });

      expect(contest.validateLineup(lineup)).to.eql([]);
      done();
    });

    it("returns an array of error objects, one for each failed lineup validation", function(done) {
      var contest = new Contest({ "maxSalary": 5000, "positionCounts": {}, "minGames": 2, "totalFromTeam": 3 });
      var errors = [];

      errors.push(new Error("Lineup salary exceeds maximum salary for this contest"));
      expect(contest.validateLineup(lineup)).to.eql(errors);
      done();
    });
  });

  describe("validateMaximumSalary", function() {
    it("returns true when the total salary of all players in the lineup is less than the maximum salary value of the contest", function(done) {
      var contest = new Contest({ "maxSalary": 50000, "positionCounts": {}, "minGames": 2, "totalFromTeam": 3 });

      expect(priv_validateMaximumSalary(lineup)).to.eql(true);
      done();
    });

    it("returns false when the total salary of all players in the lineup exceeds the maximum salary value of the contest", function(done) {
      var contest = new Contest({ "maxSalary": 5000, "positionCounts": {}, "minGames": 2, "totalFromTeam": 3 });

      expect(priv_validateMaximumSalary(lineup)).to.eql(true);
      done();
    });
  });
});
