/**
 * Contains all functions to execute the program
 */
module.exports = {
  /**
   * Given a list of strings that contain a a package and its
   * dependency, return an object that maps package keys to
   * their dependecy values.
   * 
   * Example:
   * 
   * input: ['KittenService: CamelCaser', 'CamelCaser: ']
   * output: {'KittenService': 'CamelCaser'}
   * 
   * @param {Array} dependencies - An array of package and their dependencies.
   *                               The array is non-nullable.
   * @return A JSON object that sparsely maps each package key to its dependency.
   *         If a package does not have a dependency, it will not have a key.
   */
  parseInput(dependencies) {
    return dependencies
      .map(str => {
        // Map every string in the array to an object
        let [package, dependecy] = str.split(': ')

        if (dependecy)
          return {
            [package]: dependecy
          }
        else
          return {}
      })
      // Merge all mappings into one object
      .reduce((a, b) => Object.assign(a, b), {})
  },

  /**
   * Given a graph represented as an adjacency list, perform topological sorting on the
   * graph and return a ordered list of strings such that no package comes 
   * after its dependency.
   * 
   * @param {Object} graph - A JSON object that maps vertex key label to their neighbor.
   * @return An array of strings such that no package comes after its dependency.
   */
  linearizeGraph(graph) {

  },

  /**
   * Given a graph represented as an adjacency list, compute the number of in-degrees
   * for every single vertex and returns them as an object.
   * 
   * @param {Object} graph - A JSON object that maps vertex key label to their neighbor.
   * @return An object that maps (vertex) -> # of in-degrees to that vertex.
   */
  computeInDegrees(graph) {
    let inDegrees = {}

    // Iterate through every single outgoing vertex
    Object.keys(graph)
      .forEach(key => {
        if (!(key in inDegrees))
          // Initialize all keys to have inDegrees of 0
          inDegrees[key] = 0

        let neighbor = graph[key]

        if (neighbor in inDegrees)
          // Neighbor is already in inDegrees, increase the inDegrees count
          inDegrees[neighbor] += 1
        else
          // Initialize the inDegrees of neighbor to 1
          inDegrees[neighbor] = 1
      })

    return inDegrees
  }
}
