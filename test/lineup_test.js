var expect = require('chai').expect;
var Lineup = require('../Lineup');
var Player = require('../Player');

describe("Lineup", function() {
  var player1, player2, player3;
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
    player3 = new Player({
      "id": 12,
      "name": "Jamaal Charles",
      "position": "RB",
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

  describe("getGameList()", function() {
    it("returns an array containing all the unique gameIds in a lineup", function(done) {
      var lineup = new Lineup();

      lineup.addPlayer(player1);
      lineup.addPlayer(player2);
      lineup.addPlayer(player3);

      var expected = [20, 21];
      expect(lineup.getGameList()).to.eql(expected);
      done();
    });
  });

  describe("getPositionCount()", function() {
    it("returns the number of players that have a given positon", function (done) {
      var lu = new Lineup();

      lu.addPlayer(player1);
      lu.addPlayer(player2);

      expect(lu.getPositionCount('QB')).to.equal(1);
      expect(lu.getPositionCount('WR')).to.equal(0);
      done();
    });
  });

  describe("removePlayer", function() {
    it("adds a player to the playerlist of the lineup object", function (done) {
      var lu = new Lineup();

      lu.addPlayer(player1);
      lu.removePlayer(player1);

      expect(lu.playerList).to.eql([]);
      done();
    });
  });
});
