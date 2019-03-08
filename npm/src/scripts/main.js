const add = (a, b) => {
  return typeof a === 'number' && typeof b === 'number' ? a + b : NaN
}

module.exports = { add }
