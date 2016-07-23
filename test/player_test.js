var expect = require('chai').expect;
var Player = require('../Player');

describe("Player", function() {
  describe("new Player()", function() {
    it("creates a valid player object from the data", function (done) {
      var player = new Player({
        "gameId": 20,
        "id": 58,
        "name": "John Carmichael",
        "position": "LB",
        "salary": 5000,
        "team": "KC"
      });

      expect(player.gameId).to.eql(20);
      expect(player.id).to.eql(58);
      expect(player.name).to.eql('John Carmichael');
      expect(player.position).to.eql('LB');
      expect(player.salary).to.eql(5000);
      expect(player.team).to.eql('KC');
      done();
    });

    it("throws an error if the data is missing a required parameter", function (done) {
      expect(function() {
        Player({
          "name": "John Carmichael",
          "position": "LB",
        });
      }).to.throw("Invalid Parameters");
      done();
    });
  });
});
