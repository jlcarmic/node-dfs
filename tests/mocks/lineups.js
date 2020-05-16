const { linebacker, quarterback } = require('./players')
const Lineup = require('../../Lineup')

const playerLineup = new Lineup()

playerLineup.addPlayer(linebacker)
playerLineup.addPlayer(quarterback)

module.exports = { playerLineup }
