var expect = require('chai').expect;
var Player = require('../Player');

describe("Player", function() {
  describe("new Player()", function() {
    it("creates a valid player object from the data", function (done) {
      var player = new Player({
        "id": 58,
        "name": "John Carmichael",
        "position": "LB",
        "salary": 5000
      });

      expect(player.id).to.eql(58);
      expect(player.name).to.eql('John Carmichael');
      expect(player.position).to.eql('LB');
      expect(player.salary).to.eql(5000);
      done();
    });

    it("creates a valid player using defaults for missing data", function (done) {
      var player = new Player({
        "id": 58,
        "name": "John Carmichael",
        "position": "LB",
      });

      expect(player.id).to.eql(58);
      expect(player.name).to.eql('John Carmichael');
      expect(player.position).to.eql('LB');
      expect(player.salary).to.eql(0);
      done();
    });
  });
});
