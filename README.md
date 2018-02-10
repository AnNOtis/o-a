# O-A

```js
const players = oa('name', [
  {name: 'player1', color: 'red'},
  {name: 'player2', color: 'black'}
])

players.push({name: 'player3', color: 'blue' })

players.forEach(function (player) { console.log(player.name) }) // player1, player2, player3
players.map(function (player) { return {
  name: player.name.replace('layer'),
  color: player.color
}})

players.atIndex(2) // { name: 'p3', color: 'blue' }
players.atKey('player1')
players.removekey('player2')

players.length // 2
players.byKey // id
players.array
/**
[
  {name: 'p1', color: 'red'},
  {name: 'p3', color: 'blue' }
]
**/

players.hash
/**
{
  player1: {name: 'p1', color: 'red'}
  player3: {name: 'p3', color: 'blue'}
}
**/
```
