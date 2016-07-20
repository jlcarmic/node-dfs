function Player(data) {
  this.id = data.id === undefined ? 0 : data.id;
  this.name = data.name === undefined ? '' : data.name;
  this.position = data.position === undefined ? '' : data.position;
  this.salary = data.salary === undefined ? 0 : data.salary;
}

module.exports = Player;
