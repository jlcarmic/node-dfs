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
      "team": "KC",
      "salary": 5000,
      "gameId": 20
    });
    player2 = new Player({
      "id": 11,
      "name": "Alex Smith",
      "position": "QB",
      "team": "KC",
      "salary": 6000,
      "gameId": 21
    });

    lineup = new Lineup();
    lineup.addPlayer(player1);
    lineup.addPlayer(player2);

    // Rewire private methods for testing
    priv_validateMaximumFromTeams = Contest.__get__('validateMaximumFromTeams');
    priv_validateMaximumSalary = Contest.__get__('validateMaximumSalary');
    priv_validateMinimumGames = Contest.__get__('validateMinimumGames');
    priv_validatePositionCounts = Contest.__get__('validatePositionCounts');
  });

  describe("validateLineup()", function() {
    it("returns an empty array when all lineup validations check out as there are no errors to report", function(done) {
      var contest = new Contest({ "maxFromTeam": 2, "maxSalary": 50000, "minGames": 2, "positionCounts": { "LB": 1, "QB": 1 } });

      expect(contest.validateLineup(lineup)).to.eql([]);
      done();
    });

    it("returns an array of error objects, one for each failed lineup validation", function(done) {
      var contest = new Contest({ "maxFromTeam": 1, "maxSalary": 5000, "minGames": 3, "positionCounts": { "LB": 1 } });
      var errors = [];

      errors.push(new Error("Lineup exceeds the maximum number of players from a single team for this contest"));
      errors.push(new Error("Lineup salary exceeds maximum salary for this contest"));
      errors.push(new Error("Unique games in lineup is less than the minimum games for this contest"));
      errors.push(new Error("Lineup must not have greater than or fewer players at any position than the number indicated in settings"));

      expect(contest.validateLineup(lineup)).to.eql(errors);
      done();
    });
  });

  describe("validateMaximumFromTeams", function() {
    it("returns true when the total number of players on each team in a lineup is less than or equal to the maxFromTeam value of the contest", function(done) {
      var contest = new Contest({ "maxFromTeam": 2, "maxSalary": 5000, "minGames": 3, "positionCounts": {} });

      expect(priv_validateMaximumFromTeams(lineup, contest.maxFromTeam)).to.eql(true);
      done();
    });

    it("returns false when the total number of players on a team in a lineup is greater than the maxFromTeam value of the contest", function(done) {
      var contest = new Contest({ "maxFromTeam": 1, "maxSalary": 5000, "minGames": 3, "positionCounts": {} });

      expect(priv_validateMaximumFromTeams(lineup, contest.maxFromTeam)).to.eql(false);
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

  describe("validatePositionCounts()", function() {
    it("returns true when the lineup has the exact number of players in each position as indicated in the positionCounts setting of the contest", function(done) {
      var contest = new Contest({ "maxFromTeam": 3, "maxSalary": 5000, "minGames": 2, "positionCounts": { "LB": 1, "QB": 1 } });

      expect(priv_validatePositionCounts(lineup, contest.positionCounts)).to.eql(true);
      done();
    });

    it("returns false when the lineup has fewer players at a position than the number indicated in the positionCounts setting of the contest", function(done) {
      var contest = new Contest({ "maxFromTeam": 3, "maxSalary": 5000, "minGames": 2, "positionCounts": { "LB": 1, "QB": 1, "TE": 1 } });

      expect(priv_validatePositionCounts(lineup, contest.positionCounts)).to.eql(false);
      done();
    });

    it("returns false when the lineup has more players at a position than the number indicated in the positionCounts setting of the contest", function(done) {
      var contest = new Contest({ "maxFromTeam": 3, "maxSalary": 5000, "minGames": 2, "positionCounts": { "LB": 0, "QB": 1 } });

      expect(priv_validatePositionCounts(lineup, contest.positionCounts)).to.eql(false);
      done();
    });

    it("returns false when the lineup has a player in a position that isn't present in the positionCounts setting of the contest", function(done) {
      var contest = new Contest({ "maxFromTeam": 3, "maxSalary": 5000, "minGames": 2, "positionCounts": { "LB": 1 } });

      expect(priv_validatePositionCounts(lineup, contest.positionCounts)).to.eql(false);
      done();
    });
  });
});
