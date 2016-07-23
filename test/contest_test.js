var expect = require('chai').expect;
var Lineup = require('../Lineup');
var Player = require('../Player');
var rewire = require('rewire');

var Contest = rewire('../Contest');

describe("Contest", function() {
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
    priv_validateMinimumGames = Contest.__get__('validateMinimumGames');
  });

  describe("validateLineup()", function() {
    it("returns an empty array when all lineup validations check out as there are no errors to report", function(done) {
      var contest = new Contest({ "maxFromTeam": 2, "maxSalary": 50000, "minGames": 2, "positionCounts": {} });

      expect(contest.validateLineup(lineup)).to.eql([]);
      done();
    });

    it("returns an array of error objects, one for each failed lineup validation", function(done) {
      var contest = new Contest({ "maxFromTeam": 1, "maxSalary": 5000, "minGames": 3, "positionCounts": {} });
      var errors = [];

      errors.push(new Error("Lineup salary exceeds maximum salary for this contest"));
      errors.push(new Error("Unique games in lineup is less than the minimum games for this contest"));
      expect(contest.validateLineup(lineup)).to.eql(errors);
      done();
    });
  });

  describe("validateMaximumSalary()", function() {
    it("returns true when the total salary of all players in the lineup is less than the maximum salary value of the contest", function(done) {
      var contest = new Contest({ "maxFromTeam": 3, "maxSalary": 50000, "minGames": 2, "positionCounts": {} });

      expect(priv_validateMaximumSalary(lineup, contest.maxSalary)).to.eql(true);
      done();
    });

    it("returns false when the total salary of all players in the lineup exceeds the maximum salary value of the contest", function(done) {
      var contest = new Contest({ "maxFromTeam": 3, "maxSalary": 5000, "minGames": 2, "positionCounts": {} });

      expect(priv_validateMaximumSalary(lineup, contest.maxSalary)).to.eql(false);
      done();
    });
  });

  describe("validateMinimumGames()", function() {
    it("returns true when the number of unique games in the lineup is greater than or equal to the minGames setting of the contest", function(done) {
      var contest = new Contest({ "maxFromTeam": 3, "maxSalary": 5000, "minGames": 2, "positionCounts": {} });

      expect(priv_validateMinimumGames(lineup, contest.minGames)).to.eql(true);
      done();
    });

    it("returns false when the number of unique games in the lineup is less than the minGames setting of the contest", function(done) {
      var contest = new Contest({ "maxFromTeam": 3, "maxSalary": 5000, "minGames": 3, "positionCounts": {} });

      expect(priv_validateMinimumGames(lineup, contest.minGames)).to.eql(false);
      done();
    });
  });
});
