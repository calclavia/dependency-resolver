const { parseInput } = require('./index')
const { expect } = require('chai')

describe('Dependency resolver', () => {
  describe('parseInput()', () => {
    it('should return an object that maps package keys to their dependecy', () => {
      // Base case
      expect(parseInput([])).to.deep.equal({})

      // Normal case
      expect(parseInput(['a: b'])).to.deep.equal({ 'a': 'b' })
      expect(parseInput(['c: d'])).to.deep.equal({ 'c': 'd' })
      expect(parseInput(['a: b', 'c: d'])).to.deep.equal({
        'a': 'b',
        'c': 'd'
      })
      expect(parseInput(['a: b', 'b: c'])).to.deep.equal({
        'a': 'b',
        'b': 'c'
      })
    })

    it('should return an object that does not contain keys for packages without dependencies', () => {
      // b has no dependency
      expect(parseInput(['a: b', 'b: '])).to.deep.equal({ 'a': 'b' })
      expect(parseInput(['a: c', 'c: ', 'e: g'])).to.deep.equal({
        'a': 'c',
        'e': 'g'
      })
    })
  })
})
