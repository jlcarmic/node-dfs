const descendingSort = (a, b) => b - a

class Contest {
  constructor({ maxFromTeam, maxSalary, minGames, positionCounts }) {
    this.maxFromTeam = maxFromTeam || 3
    this.maxSalary = maxSalary || 50000
    this.minGames = minGames || 2
    this.positionCounts = positionCounts || {}
  }

  validateLineup(lineup) {
    const errors = []

    if (!this.validateMaximumFromTeams(lineup)) {
      errors.push(new Error('Lineup exceeds the maximum number of players from a single team for this contest'))
    }

    if (!this.validateMaximumSalary(lineup)) {
      errors.push(new Error('Lineup salary exceeds maximum salary for this contest'))
    }

    if (!this.validateMinimumGames(lineup)) {
      errors.push(new Error('Unique games in lineup is less than the minimum games for this contest'))
    }

    if (!this.validatePositionCounts(lineup)) {
      // eslint-disable-next-line max-len
      errors.push(new Error('Lineup must not have greater than or fewer players at any position than the number indicated in settings'))
    }

    return errors
  }

  validateMaximumFromTeams(lineup) {
    return Object.values(lineup.getTeamCounts()).sort(descendingSort)[0] <= this.maxFromTeam
  }

  validateMaximumSalary(lineup) {
    return lineup.calculateTotalSalary() <= this.maxSalary
  }

  validateMinimumGames(lineup) {
    return Object.keys(lineup.getGameCounts()).length >= this.minGames
  }

  validatePositionCounts(lineup) {
    const lineupPositionCounts = lineup.getPositionCounts()

    const lineupPositions = Object.keys(lineupPositionCounts).sort()
    const contestPositions = Object.keys(this.positionCounts).sort()

    if (lineupPositions.length !== contestPositions.length) return false

    return contestPositions.every((pos, i) => (
      pos === lineupPositions[i] && this.positionCounts[pos] === lineupPositionCounts[pos]
    ))
  }
}

module.exports = Contest
