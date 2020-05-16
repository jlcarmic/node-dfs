/* eslint-disable max-len */
const { expect } = require('chai')
const { describe, it } = require('mocha')
const { playerLineup } = require('./mocks/lineups')
const Contest = require('../Contest')

describe('Contest', () => {
  describe('validateLineup()', () => {
    it('returns an empty array when all lineup validations check out as there are no errors to report', () => {
      const contest = new Contest({
        'maxFromTeam': 2,
        'maxSalary': 50000,
        'minGames': 2,
        'positionCounts': { 'LB': 1, 'QB': 1 },
      })

      expect(contest.validateLineup(playerLineup)).to.deep.equal([])
    })

    it('returns an array of error objects, one for each failed lineup validation', () => {
      const contest = new Contest({ 'maxFromTeam': 1, 'maxSalary': 5000, 'minGames': 3, 'positionCounts': { 'LB': 1 } })

      expect(contest.validateLineup(playerLineup)).to.deep.equal([
        new Error('Lineup exceeds the maximum number of players from a single team for this contest'),
        new Error('Lineup salary exceeds maximum salary for this contest'),
        new Error('Unique games in lineup is less than the minimum games for this contest'),
        new Error('Lineup must not have greater than or fewer players at any position than the number indicated in settings'),
      ])
    })
  })

  describe('validateMaximumFromTeams', () => {
    it('returns true when the total number of players on each team in a lineup is less than or equal to the maxFromTeam value of the contest', () => {
      const contest = new Contest({ 'maxFromTeam': 2, 'maxSalary': 5000, 'minGames': 3, 'positionCounts': {} })

      const valid = contest.validateMaximumFromTeams(playerLineup)

      expect(valid).to.equal(true)
    })

    it('returns false when the total number of players on a team in a lineup is greater than the maxFromTeam value of the contest', () => {
      const contest = new Contest({ 'maxFromTeam': 1, 'maxSalary': 5000, 'minGames': 3, 'positionCounts': {} })

      const valid = contest.validateMaximumFromTeams(playerLineup)

      expect(valid).to.equal(false)
    })
  })

  describe('validateMaximumSalary()', () => {
    it('returns true when the total salary of all players in the lineup is less than the maximum salary value of the contest', () => {
      const contest = new Contest({ 'maxFromTeam': 3, 'maxSalary': 50000, 'minGames': 2, 'positionCounts': {} })

      const valid = contest.validateMaximumSalary(playerLineup)

      expect(valid).to.equal(true)
    })

    it('returns false when the total salary of all players in the lineup exceeds the maximum salary value of the contest', () => {
      const contest = new Contest({ 'maxFromTeam': 3, 'maxSalary': 5000, 'minGames': 2, 'positionCounts': {} })

      const valid = contest.validateMaximumSalary(playerLineup)

      expect(valid).to.equal(false)
    })
  })

  describe('validateMinimumGames()', () => {
    it('returns true when the number of unique games in the lineup is greater than or equal to the minGames setting of the contest', () => {
      const contest = new Contest({ 'maxFromTeam': 3, 'maxSalary': 5000, 'minGames': 2, 'positionCounts': {} })

      const valid = contest.validateMinimumGames(playerLineup)

      expect(valid).to.equal(true)
    })

    it('returns false when the number of unique games in the lineup is less than the minGames setting of the contest', () => {
      const contest = new Contest({ 'maxFromTeam': 3, 'maxSalary': 5000, 'minGames': 3, 'positionCounts': {} })

      const valid = contest.validateMinimumGames(playerLineup)

      expect(valid).to.equal(false)
    })
  })

  describe('validatePositionCounts()', () => {
    it('returns true when the lineup has the exact number of players in each position as indicated in the positionCounts setting of the contest', () => {
      const contest = new Contest({ 'maxFromTeam': 3, 'maxSalary': 5000, 'minGames': 2, 'positionCounts': { 'LB': 1, 'QB': 1 } })

      const valid = contest.validatePositionCounts(playerLineup)

      expect(valid).to.equal(true)
    })

    it('returns false when the lineup is missing a player at a position listed in the positionCounts setting of the contest', () => {
      const contest = new Contest({ 'maxFromTeam': 3, 'maxSalary': 5000, 'minGames': 2, 'positionCounts': { 'LB': 1, 'QB': 1, 'TE': 1 } })

      const valid = contest.validatePositionCounts(playerLineup)

      expect(valid).to.equal(false)
    })

    it('returns false when the lineup has fewer players at a position than the number indicated in the positionCounts setting of the contest', () => {
      const contest = new Contest({ 'maxFromTeam': 3, 'maxSalary': 5000, 'minGames': 2, 'positionCounts': { 'LB': 2, 'QB': 1 } })

      const valid = contest.validatePositionCounts(playerLineup)

      expect(valid).to.equal(false)
    })

    it('returns false when the lineup has more players at a position than the number indicated in the positionCounts setting of the contest', () => {
      const contest = new Contest({ 'maxFromTeam': 3, 'maxSalary': 5000, 'minGames': 2, 'positionCounts': { 'LB': 0, 'QB': 1 } })

      const valid = contest.validatePositionCounts(playerLineup)

      expect(valid).to.equal(false)
    })

    it('returns false when the lineup has a player in a position that is not present in the positionCounts setting of the contest', () => {
      const contest = new Contest({ 'maxFromTeam': 3, 'maxSalary': 5000, 'minGames': 2, 'positionCounts': { 'LB': 1 } })

      const valid = contest.validatePositionCounts(playerLineup)

      expect(valid).to.equal(false)
    })
  })
})
