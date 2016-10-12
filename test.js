const {
  parseInput,
  linearizeGraph,
  computeInDegrees
} = require('./index')

const {
  expect
} = require('chai')

describe('Dependency resolver', () => {
  describe('parseInput()', () => {
    it('should return an object that maps package keys to their dependecy', () => {
      // Base case
      expect(parseInput([])).to.deep.equal({})

      // Normal case
      expect(parseInput(['a: b'])).to.deep.equal({
        'a': 'b'
      })
      expect(parseInput(['c: d'])).to.deep.equal({
        'c': 'd'
      })
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
      expect(parseInput(['a: b', 'b: '])).to.deep.equal({
        'a': 'b'
      })
      expect(parseInput(['a: c', 'c: ', 'e: g'])).to.deep.equal({
        'a': 'c',
        'e': 'g'
      })
    })
  })

  describe('linearizeGraph()', () => {
    it('should return an empty array given an empty graph', () => {
      // Base case
      expect(linearizeGraph({})).to.deep.equal([])
    })

    it('should linearize a DAG', () => {
      // Test linearization on different DAGs
      expect(
          linearizeGraph({
            'a': 'b'
          })
        )
        .to.include.members(['a', 'b'])
        .to.satisfy(list => list.indexOf('a') < list.indexOf('b'))

      expect(
          linearizeGraph({
            'a': 'b',
            'c': 'd'
          })
        )
        .to.include.members(['a', 'b', 'c', 'd'])
        .to.satisfy(list => list.indexOf('a') < list.indexOf('b'))
        .to.satisfy(list => list.indexOf('c') < list.indexOf('d'))

      expect(
          linearizeGraph({
            'a': 'b',
            'c': 'd',
            'e': 'd',
            'd': 'f'
          })
        )
        .to.include.members(['a', 'b', 'c', 'd', 'e', 'f'])
        .to.satisfy(list => list.indexOf('a') < list.indexOf('b'))
        .to.satisfy(list => list.indexOf('c') < list.indexOf('d'))
        .to.satisfy(list => list.indexOf('e') < list.indexOf('d'))
        .to.satisfy(list => list.indexOf('d') < list.indexOf('f'))
    })

    it('should throw an error on a non-DAG', () => {
      throw new Error()
    })
  })

  describe('computeInDegrees()', () => {
    it('should return an empty object given an empty graph', () => {
      expect(computeInDegrees({})).to.deep.equal({})
    })

    it('should return a list of in-degrees', () => {
      expect(computeInDegrees({
        'a': 'b'
      })).to.deep.equal({
        'a': 0,
        'b': 1
      })

      expect(computeInDegrees({
        'a': 'b',
        'b': 'c'
      })).to.deep.equal({
        'a': 0,
        'b': 1,
        'c': 1
      })

      expect(computeInDegrees({
        'a': 'b',
        'b': 'c',
        'd': 'c',
        'g': 'c',
      })).to.deep.equal({
        'a': 0,
        'b': 1,
        'd': 0,
        'c': 3,
        'g': 0
      })
    })
  })
})
