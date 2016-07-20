var expect = require('chai').expect;
var Lineup = require('../Lineup');
var Player = require('../Player');

describe("Lineup", function() {
  describe("addPlayer", function() {
    it("adds a player to the playerlist of the lineup object", function (done) {
      var lu = new Lineup();
      var p1 = new Player({
        "id": 58,
        "name": "John Carmichael",
        "position": "LB",
        "salary": 5000
      });

      lu.addPlayer(p1);

      expect(lu.playerList).to.eql([p1]);
      done();
    });
  });

  describe("calculateTotalSalary", function() {
    it("returns the total salary of all players in the lineup", function (done) {
      var lu = new Lineup();
      var p1 = new Player({
        "id": 58,
        "name": "John Carmichael",
        "position": "LB",
        "salary": 5000
      });
      var p2 = new Player({
        "id": 11,
        "name": "Alex Smith",
        "position": "QB",
        "salary": 6000
      });

      lu.addPlayer(p1);
      lu.addPlayer(p2);

      expect(lu.calculateTotalSalary()).to.equal(11000);
      done();
    });
  });

  describe("removePlayer", function() {
    it("adds a player to the playerlist of the lineup object", function (done) {
      var lu = new Lineup();
      var p1 = new Player({
        "id": 58,
        "name": "John Carmichael",
        "position": "LB",
        "salary": 5000
      });

      lu.addPlayer(p1);
      lu.removePlayer(p1);

      expect(lu.playerList).to.eql([]);
      done();
    });
  });
});
