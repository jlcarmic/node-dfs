A Node library for Daily Fantasy Sports (DFS) consisting of Contests with configurable business rules as well as Player and Lineup objects.

# Installation
`npm install node-dfs`

# Usage

## Contest
A Contest represents a DFS contest for which a lineup of players will be entered.

```javascript
var dfs = require('node-dfs');

var contest = new dfs.Contest({
  maxFromTeam: 3,
  maxSalary: 50000,
  minGames: 2,
  positionCounts: { QB: 1, RB: 2, WR: 2, TE: 1 }
});
```

**validateLineup(lineup)**

Validates the given lineup against the rules of the calling contest. Returns an array of error objects representing each failed validation.

```javascript
var errors = contest.validateLineup(lineup);
```

## Lineup
A Lineup represents a collection of players which will be used in a DFS contest.

```javascript
var dfs = require('node-dfs');

var lineup = new dfs.Lineup();
```

**addPlayer(player)**

Adds the provided player to the lineup objects playerList attribute.

```javascript
lineup.addPlayer(player);
```

**calculateTotalSalary()**

Iterates over the playerList for the calling lineup and returns an integer than represents the sum of all players' salary attributes.

```javascript
var total = lineup.calculateTotalSalary();
```
Returns: `49000`

**getGameCounts()**

Iterates over the playerList for the calling lineup and returns an object. The object's keys are the unique list of games being played in by players in the calling lineup each with a value that is the count of players participating in the game from the calling lineup.

```javascript
var games = lineup.getGameCounts();
```
Returns: `{ 12: 1, 6: 3, 2: 2, 7: 3, 3: 2 }`)

**getPositionCounts()**

Iterates over the playerList for the calling lineup and returns an object. The object's keys are the unique positions played by players in the calling lineup each with a value that is the count of players at each position from the calling lineup.

```javascript
var games = lineup.getPositionCounts();
```
Returns: `{ "QB": 1, "RB": 2, "WR": 3, "TE": 1 }`)

**getTeamCounts()**

Iterates over the playerList for the calling lineup and returns an object. The object's keys are the unique list of teams being played for by players in the calling lineup each with a value that is the count of players playing for that team from the calling lineup.

```javascript
var games = lineup.getTeamCounts();
```
Returns: `{ "KC": 2, "NE": 3, "PHI": 1, "SF": 1, "JAX": 2 }`)

**removePlayer(player)**

Removes the provided player from the lineup objects playerList attribute.

```javascript
lineup.removePlayer(player);
```

## Player
A Player represents an athlete taking part in a professional sports game which will be added to a lineup to be used in a DFS contest.

```javascript
var dfs = require('node-dfs');

var player = new dfs.Player({
  gameId: 26,
  id: 1263,
  name: "Alex Smith",
  position: "QB",
  salary: 7500,
  team: "KC"
});
```

# License

(The MIT License)

Copyright (c) 2016 John Carmichael <jlcarmic@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
