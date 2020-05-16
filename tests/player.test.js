const { expect } = require('chai')
const { describe, it } = require('mocha')
const { linebacker } = require('./mocks/players')
const Player = require('../Player')

describe('Player', () => {
  describe('new Player()', () => {
    it('creates a valid player object from the data', () => {
      expect(linebacker.gameId).to.equal(20)
      expect(linebacker.id).to.equal(58)
      expect(linebacker.name).to.equal('John Carmichael')
      expect(linebacker.position).to.equal('LB')
      expect(linebacker.salary).to.equal(5000)
      expect(linebacker.team).to.equal('KC')
    })

    it('throws an error if the data is missing a required parameter', () => {
      expect(() => {
        new Player({
          'name': 'John Carmichael',
          'position': 'LB',
        })
      }).to.throw('Invalid Parameters')
    })
  })
})
