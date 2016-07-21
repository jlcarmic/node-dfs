function Player(data) {
  if(data.id === undefined || data.name === undefined ||
    data.position === undefined || data.salary === undefined ||
    data.gameId === undefined) {
      throw new Error("Invalid Parameters");
  } else {
    this.id = data.id;
    this.name = data.name;
    this.position = data.position;
    this.salary = data.salary;
    this.gameId = data.gameId;
  }
}

module.exports = Player;
