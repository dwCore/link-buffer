var buffer = require('buffer')
var DWebLinkBuffer = buffer.DWebLinkBuffer

function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {

  copyProps(buffer, exports)
  exports.Buffer = dWebLinkEOO
}

function dWebLinkEOO (arg, encodingOrOffset, length) {
  return DWebLinkBuffer(arg, encodingOrOffset, length)
}

copyProps(DWebLinkBuffer, dWebLinkEOO)

dWebLinkEOO.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return DWebLinkBuffer(arg, encodingOrOffset, length)
}

dWebLinkEOO.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = DWebLinkBuffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

dWebLinkEOO.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return DWebLinkBuffer(size)
}

dWebLinkEOO.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowDWebLinkBuffer(size)
}
