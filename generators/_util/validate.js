
const _typeof = (value) => {
  if (typeof value === 'string') {
    return 'string'
  } else if (typeof value === 'number' && /^\d+$/.test(value)) {
    return 'number'
  } else if (Object.prototype.toString.call(value) === '[object Array]') {
    return 'array'
  } else if (Object.prototype.toString.call(value) === '[object Object]') {
    return 'object'
  }
  return typeof value
}

const _isEmpty = (value) => {
  if (_typeof(value) === 'object') {
    for (const key of value) {
      if (value.hasOwnProperty(key)) {
        return false
      }
    }
    return value
  } else if (_typeof(value) === 'number') {
    return value.toString().length === 0
  }
  return (value === undefined || value.length === 0) ? value : false
}
const _isNumber = (value) => _typeof(value) === 'number'

const required = (value, msg) => !_isEmpty(value) || msg || 'You have to set a value'

const dns = (value) => {
  if (_isEmpty(value)) {
    return 'You have to set a value'
  } else if (value.length > 28) {
    return 'Must be DNS compliant, max 28 characters'
  }
  return value
}

const number = (value) => (_isNumber(value) ? value : 'Only numbers allowed')

const port = (value) => {
  if (_isEmpty(value)) {
    return 'You have to set a value'
  } else if (!_isNumber(value)) {
    return 'Only numbers allowed'
  } else if (value < 1025 || value > 65534) {
    return 'Port out of range, valid range 1025 - 65534'
  }
  return value
}

module.exports = {
  required,
  dns,
  number,
  port,
}
