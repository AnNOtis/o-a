import test from 'ava'
import Oa from './index'

test('create oa object - by default key', t => {
  var oa = new Oa()

  verify(t, oa, 'id', [], {})
})

test('create oa object by specify key', t => {
  var oa = new Oa('name')

  verify(t, oa, 'name', [], {})
})

test('create oa object with an array', t => {
  var oa = new Oa('name', [
    { name: 'player1', color: 'red' },
    { name: 'player2', color: 'black' }
  ])

  verify(t, oa,
    'name',
    [
      { name: 'player1', color: 'red' },
      { name: 'player2', color: 'black' }
    ],
    {
      player1: { name: 'player1', color: 'red' },
      player2: { name: 'player2', color: 'black' }
    }
  )

  // the array and the hash have the same reference
  t.is(oa.array[0], oa.hash.player1)
  t.is(oa.array[1], oa.hash.player2)
})

test('.push', t => {
  var oa = new Oa('name')
  oa.push({ name: 'player1', color: 'red' })
  oa.push({ name: 'player2', color: 'black' })

  verify(t, oa,
    'name',
    [
      { name: 'player1', color: 'red' },
      { name: 'player2', color: 'black' }
    ],
    {
      player1: { name: 'player1', color: 'red' },
      player2: { name: 'player2', color: 'black' }
    }
  )

  t.is(oa.array[0], oa.hash.player1)
  t.is(oa.array[1], oa.hash.player2)
})

test('.forEach', t => {
  var arr = [
    { name: 'player1', color: 'red' },
    { name: 'player2', color: 'black' }
  ]
  var oa = new Oa('name', arr)

  var result = oa.forEach(function (player, index) {
    t.deepEqual(player, arr[index])
  })

  t.is(result, undefined)
})

test('.map', t => {
  var oa = new Oa('name', [
    { name: 'player1', color: 'red' },
    { name: 'player2', color: 'black' }
  ])

  var newPlayers = oa.map(function (player, index) {
    return {
      name: 'player' + (index + 3),
      color: 'deep blue'
    }
  })

  verify(t, newPlayers,
    'name',
    [
      { name: 'player3', color: 'deep blue' },
      { name: 'player4', color: 'deep blue' }
    ],
    {
      player3: { name: 'player3', color: 'deep blue' },
      player4: { name: 'player4', color: 'deep blue' }
    }
  )
})

test('.atIndex', t => {
  var arr = [
    { name: 'player1', color: 'red' },
    { name: 'player2', color: 'black' }
  ]
  var oa = new Oa('name', arr)

  t.is(oa.atIndex(0), arr[0])
  t.is(oa.atIndex(1), arr[1])
})
test('.atKey', t => {
  var arr = [
    { name: 'player1', color: 'red' },
    { name: 'player2', color: 'black' }
  ]
  var oa = new Oa('name', arr)

  t.is(oa.atKey('player1'), arr[0])
  t.is(oa.atKey('player2'), arr[1])
})
test('.removeKey', t => {
  var arr = [
    { name: 'player1', color: 'red' },
    { name: 'player2', color: 'black' }
  ]
  var oa = new Oa('name', arr)

  t.is(oa.removeKey('player2'), arr[1])

  verify(t, oa,
    'name',
    [
      { name: 'player1', color: 'red' }
    ],
    {
      player1: { name: 'player1', color: 'red' }
    }
  )
})

function verify (t, obj, key, arr, hash) {
  t.is(obj.key, key)
  t.deepEqual(obj.array, arr)
  t.is(obj.length, arr.length)
  t.deepEqual(obj.hash, hash)
}
