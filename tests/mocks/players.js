const Player = require('../../Player')

const linebacker = new Player({
  'gameId': 20,
  'id': 58,
  'name': 'John Carmichael',
  'position': 'LB',
  'salary': 5000,
  'team': 'KC'
})

const quarterback = new Player({
  'gameId': 21,
  'id': 11,
  'name': 'Alex Smith',
  'position': 'QB',
  'salary': 6000,
  'team': 'KC'
})

const tightend = new Player({
  'gameId': 21,
  'id': 12,
  'name': 'Rob Gronkowski',
  'position': 'TE',
  'salary': 5500,
  'team': 'NE'
})

module.exports = { linebacker, quarterback, tightend }
