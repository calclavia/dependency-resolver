const { parseInput } = require('./index')
const { expect } = require('chai')

describe('Dependency resolver', () => {
  describe('parseInput()', () => {
    it('should return an object that maps package keys to their dependecy', () => {
      // Base case
      expect(parseInput([])).to.deep.equal({})
    })

    it('should return an object that does not contain keys for packages without dependencies', () => {
      throw new Error()
    })
  })
})