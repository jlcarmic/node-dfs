function Player(data) {
  if(data.gameId === undefined || data.id === undefined ||
    data.name === undefined || data.position === undefined ||
    data.salary === undefined || data.team === undefined) {
      throw new Error("Invalid Parameters");
  } else {
    this.gameId = data.gameId;
    this.id = data.id;
    this.name = data.name;
    this.position = data.position;
    this.salary = data.salary;
    this.team = data.team;
  }
}

module.exports = Player;
