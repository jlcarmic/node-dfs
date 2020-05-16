class Player {
  constructor(data) {
    const {
      gameId, id, name, position, salary, team,
    } = data

    if (!gameId || !id || !name || !position || !salary || !team) throw new Error('Invalid Parameters')

    this.gameId = gameId
    this.id = id
    this.name = name
    this.position = position
    this.salary = salary
    this.team = team
  }
}

module.exports = Player
