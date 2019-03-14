const expect = require('chai').expect
const { add } = require('../src/scripts/main')

describe('#add', () => {
   it('should return sum when param are numbers', () => {
      expect(add(1, 1)).to.equal(2)
   })
   it('should return NaN when param invalid', () => {
      expect(isNaN(add(0, undefined))).to.equal(true)
   })
})
