class Lineup {
  constructor() {
    this.playerList = []
  }

  addPlayer(player) {
    this.playerList = this.playerList.concat([player])
  }

  calculateTotalSalary() {
    return this.playerList.reduce((prev, curr) => {
      return prev + curr.salary
    }, 0)
  }

  getGameCounts() {
    return this.playerList.reduce((prev, curr) => {
      prev[curr.gameId] = prev[curr.gameId] === undefined ? 1 : prev[curr.gameId] + 1

      return prev
    }, {})
  }

  getPositionCounts() {
    return this.playerList.reduce((prev, curr) => {
      prev[curr.position] = prev[curr.position] === undefined ? 1 : prev[curr.position] + 1

      return prev
    }, {})
  }

  getTeamCounts() {
    return this.playerList.reduce((prev, curr) => {
      prev[curr.team] = prev[curr.team] === undefined ? 1 : prev[curr.team] + 1

      return prev
    }, {})
  }

  removePlayer(player) {
    this.playerList.splice(this.playerList.indexOf(player), 1)
  }
}

module.exports = Lineup
