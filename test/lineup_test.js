var _ = require('underscore');
var expect = require('chai').expect;
var Lineup = require('../Lineup');
var Player = require('../Player');

describe("Lineup", function() {
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
    player3 = new Player({
      "id": 12,
      "name": "Rob Gronkowski",
      "position": "TE",
      "team": "NE",
      "salary": 5500,
      "gameId": 21
    });
  });

  describe("addPlayer()", function() {
    it("adds a player to the playerlist of the lineup object", function (done) {
      var lu = new Lineup();

      lu.addPlayer(player1);

      expect(lu.playerList).to.eql([player1]);
      done();
    });
  });

  describe("calculateTotalSalary()", function() {
    it("returns the total salary of all players in the lineup", function (done) {
      var lu = new Lineup();

      lu.addPlayer(player1);
      lu.addPlayer(player2);

      expect(lu.calculateTotalSalary()).to.equal(11000);
      done();
    });
  });

  describe("getGameCounts()", function() {
    it("returns an list of all games represented in a lineup and the number of players participating in each hame (ex. { 20: 1, 21: 2 })", function(done) {
      var lineup = new Lineup();

      lineup.addPlayer(player1);
      lineup.addPlayer(player2);
      lineup.addPlayer(player3);

      var actual = lineup.getGameCounts();
      var expected = { "20": 1, "21": 2 };

      expect(_.isEqual(actual, expected)).to.equal(true);
      done();
    });
  });

  describe("getPositionCounts()", function() {
    it("returns a list of all positions represented in a lineup and the number of players at each position (ex. { LB: 1, QB: 1 })", function (done) {
      var lineup = new Lineup();

      lineup.addPlayer(player1);
      lineup.addPlayer(player2);

      var actual = lineup.getPositionCounts();
      var expected = { "LB": 1, "QB": 1 };

      expect(_.isEqual(actual, expected)).to.equal(true);
      done();
    });
  });

  describe("getTeamCounts()", function() {
    it("returns a list of all teams represented in a lineup and the number of players on each team (ex. { KC: 2, NE: 1 })", function (done) {
      var lineup = new Lineup();

      lineup.addPlayer(player1);
      lineup.addPlayer(player2);
      lineup.addPlayer(player3);

      var actual = lineup.getTeamCounts();
      var expected = { "KC": 2, "NE": 1 };

      expect(_.isEqual(actual, expected)).to.equal(true);
      done();
    });
  });

  describe("removePlayer", function() {
    it("adds a player to the playerlist of the lineup object", function (done) {
      var lineup = new Lineup();

      lineup.addPlayer(player1);
      lineup.removePlayer(player1);

      expect(lineup.playerList).to.eql([]);
      done();
    });
  });
});
