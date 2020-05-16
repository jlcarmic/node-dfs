/* eslint-disable max-len */
const { expect } = require('chai')
const { describe, it } = require('mocha')
const { linebacker, quarterback, tightend } = require('./mocks/players')
const Lineup = require('../Lineup')

describe('Lineup', () => {
  describe('addPlayer()', () => {
    it('adds a player to the playerlist of the lineup object', () => {
      const lineup = new Lineup()

      lineup.addPlayer(linebacker)

      expect(lineup.playerList).to.deep.equal([linebacker])
    })
  })

  describe('calculateTotalSalary()', () => {
    it('returns the total salary of all players in the lineup', () => {
      const lineup = new Lineup()

      lineup.addPlayer(linebacker)
      lineup.addPlayer(quarterback)

      expect(lineup.calculateTotalSalary()).to.equal(11000)
    })
  })

  describe('getGameCounts()', () => {
    it('returns an list of all games represented in a lineup and the number of players participating in each hame (ex. { 20: 1, 21: 2 })', () => {
      const lineup = new Lineup()

      lineup.addPlayer(linebacker)
      lineup.addPlayer(quarterback)
      lineup.addPlayer(tightend)

      const gameCounts = lineup.getGameCounts()

      expect(gameCounts).to.deep.equal({ '20': 1, '21': 2 })
    })
  })

  describe('getPositionCounts()', () => {
    it('returns a list of all positions represented in a lineup and the number of players at each position (ex. { LB: 1, QB: 1 })', () => {
      const lineup = new Lineup()

      lineup.addPlayer(linebacker)
      lineup.addPlayer(quarterback)

      const positionCounts = lineup.getPositionCounts()

      expect(positionCounts).to.deep.equal({ 'LB': 1, 'QB': 1 })
    })
  })

  describe('getTeamCounts()', () => {
    it('returns a list of all teams represented in a lineup and the number of players on each team (ex. { KC: 2, NE: 1 })', () => {
      const lineup = new Lineup()

      lineup.addPlayer(linebacker)
      lineup.addPlayer(quarterback)
      lineup.addPlayer(tightend)

      const teamCounts = lineup.getTeamCounts()

      expect(teamCounts).to.deep.equal({ 'KC': 2, 'NE': 1 })
    })
  })

  describe('removePlayer', () => {
    it('adds a player to the playerlist of the lineup object', () => {
      const lineup = new Lineup()

      lineup.addPlayer(linebacker)
      lineup.removePlayer(linebacker)

      expect(lineup.playerList).to.deep.equal([])
    })
  })
})
