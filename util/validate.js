'use strict'

const _isEmpty = (value) => value.toString().length === 0
const _isNumber = (value) => /^\d+$/.test(value)

module.exports = {
  dns: (value) => {
    if (_isEmpty(value)) {
      return 'You have to set a value'
    } else if (value.length > 28) {
      return 'Must be DNS compliant, max 28 characters'
    }
    return true
  },
  number: (value) => {
    return _isNumber(value) ? true : 'Only numbers allowed'
  },
  port: (value) => {
    if (_isEmpty(value)) {
      return 'You have to set a value'
    } else if (!_isNumber(value)) {
      return 'Only numbers allowed'
    } else if (value < 1025 || value > 65534) {
      return 'Port out of range, valid range 1025 - 65534'
    }
    return true
  },
}
