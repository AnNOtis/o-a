function Oa () {
  var key = arguments[0]
  var array = arguments[1]
  var self = this

  this.key = key || 'id'
  this.array = array || []
  this.length = this.array.length
  this.hash = {}
  this.array.forEach(function (item) {
    self.hash[item[self.key]] = item
  })
}

Oa.prototype.push = function (obj) {
  this.array.push(obj)
  this.length = this.array.length
  this.hash[obj[this.key]] = obj
}

Oa.prototype.forEach = function (fn) {
  return this.array.forEach(fn)
}

Oa.prototype.map = function (fn) {
  var self = this

  this.array.forEach(function (item, index) {
    var old = self.array[index]
    var newItem = fn(item, index)
    self.array[index] = newItem

    if (old[self.key] !== newItem[self.key]) {
      delete self.hash[old[self.key]]
    }

    self.hash[newItem[self.key]] = newItem
  })

  this.length = this.array.length

  return this
}

Oa.prototype.atIndex = function (index) {
  return this.array[index]
}

Oa.prototype.atKey = function (key) {
  return this.hash[key]
}

Oa.prototype.removeKey = function (key) {
  var obj = this.hash[key]
  if (obj) {
    this.array.splice(this.array.indexOf(obj), 1)
    delete this.hash[key]
  }
  this.length = this.array.length
}

module.exports = Oa
