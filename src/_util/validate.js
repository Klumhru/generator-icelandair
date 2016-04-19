
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
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  } else if (_typeof(value) === 'number') {
    return value.toString().length === 0
  }
  return value.length === 0
}
const _isNumber = (value) => _typeof(value) === 'number'

export const required = (value, msg) => !_isEmpty(value) || msg || 'You have to set a value'

export const dns = (value) => {
  if (_isEmpty(value)) {
    return 'You have to set a value'
  } else if (value.length > 28) {
    return 'Must be DNS compliant, max 28 characters'
  }
  return true
}

export const number = (value) => {
  return _isNumber(value) ? true : 'Only numbers allowed'
}

export const port = (value) => {
  if (_isEmpty(value)) {
    return 'You have to set a value'
  } else if (!_isNumber(value)) {
    return 'Only numbers allowed'
  } else if (value < 1025 || value > 65534) {
    return 'Port out of range, valid range 1025 - 65534'
  }
  return true
}
