/* eslint-disable node/no-deprecated-api */

var test = require('tape')
var DWebLinkBuffer = require('../').Buffer

test('new DWebLinkBuffer(value) works just like Buffer', function (t) {
  t.deepEqual(new DWebLinkBuffer('hey'), new Buffer('hey'))
  t.deepEqual(new DWebLinkBuffer('hey', 'utf8'), new Buffer('hey', 'utf8'))
  t.deepEqual(new DWebLinkBuffer('686579', 'hex'), new Buffer('686579', 'hex'))
  t.deepEqual(new DWebLinkBuffer([1, 2, 3]), new Buffer([1, 2, 3]))
  t.deepEqual(new DWebLinkBuffer(new Uint8Array([1, 2, 3])), new Buffer(new Uint8Array([1, 2, 3])))

  t.equal(typeof DWebLinkBuffer.isBuffer, 'function')
  t.equal(DWebLinkBuffer.isBuffer(new DWebLinkBuffer('hey')), true)
  t.equal(Buffer.isBuffer(new DWebLinkBuffer('hey')), true)
  t.notOk(DWebLinkBuffer.isBuffer({}))

  t.end()
})

test('DWebLinkBuffer.from(value) converts to a Buffer', function (t) {
  t.deepEqual(DWebLinkBuffer.from('hey'), new Buffer('hey'))
  t.deepEqual(DWebLinkBuffer.from('hey', 'utf8'), new Buffer('hey', 'utf8'))
  t.deepEqual(DWebLinkBuffer.from('686579', 'hex'), new Buffer('686579', 'hex'))
  t.deepEqual(DWebLinkBuffer.from([1, 2, 3]), new Buffer([1, 2, 3]))
  t.deepEqual(DWebLinkBuffer.from(new Uint8Array([1, 2, 3])), new Buffer(new Uint8Array([1, 2, 3])))

  t.end()
})

test('DWebLinkBuffer.alloc(number) returns zeroed-out memory', function (t) {
  for (var i = 0; i < 10; i++) {
    var expected1 = new Buffer(1000)
    expected1.fill(0)
    t.deepEqual(DWebLinkBuffer.alloc(1000), expected1)

    var expected2 = new Buffer(1000 * 1000)
    expected2.fill(0)
    t.deepEqual(DWebLinkBuffer.alloc(1000 * 1000), expected2)
  }
  t.end()
})

test('DWebLinkBuffer.allocUnsafe(number)', function (t) {
  var buf = DWebLinkBuffer.allocUnsafe(100) // unitialized memory
  t.equal(buf.length, 100)
  t.equal(DWebLinkBuffer.isBuffer(buf), true)
  t.equal(Buffer.isBuffer(buf), true)
  t.end()
})

test('DWebLinkBuffer.from() throws with number types', function (t) {
  t.plan(5)
  t.throws(function () {
    DWebLinkBuffer.from(0)
  })
  t.throws(function () {
    DWebLinkBuffer.from(-1)
  })
  t.throws(function () {
    DWebLinkBuffer.from(NaN)
  })
  t.throws(function () {
    DWebLinkBuffer.from(Infinity)
  })
  t.throws(function () {
    DWebLinkBuffer.from(99)
  })
})

test('DWebLinkBuffer.allocUnsafe() throws with non-number types', function (t) {
  t.plan(4)
  t.throws(function () {
    DWebLinkBuffer.allocUnsafe('hey')
  })
  t.throws(function () {
    DWebLinkBuffer.allocUnsafe('hey', 'utf8')
  })
  t.throws(function () {
    DWebLinkBuffer.allocUnsafe([1, 2, 3])
  })
  t.throws(function () {
    DWebLinkBuffer.allocUnsafe({})
  })
})

test('DWebLinkBuffer.alloc() throws with non-number types', function (t) {
  t.plan(4)
  t.throws(function () {
    DWebLinkBuffer.alloc('hey')
  })
  t.throws(function () {
    DWebLinkBuffer.alloc('hey', 'utf8')
  })
  t.throws(function () {
    DWebLinkBuffer.alloc([1, 2, 3])
  })
  t.throws(function () {
    DWebLinkBuffer.alloc({})
  })
})
