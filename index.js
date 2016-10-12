/**
 * Contains all functions to execute the dependency resolver
 */
const dependencyResolver = {

  /**
   * The main funtion of the program that given a list of
   * packages and their dependencies, returns a string with
   * packages in their install order separated by commas.
   * 
   * @param {Array} dependencies - An array of package and their dependencies.
   *                               The array is non-nullable.
   * @return A comma separated string of package names in the order of 
   *         install, such that a package’s dependency will always
   *         precede that package.
   */
  computeOrder(dependencies) {
    // Compute the graph
    let graph = dependencyResolver.parseInput(dependencies)

    // Linearize the graph, reverse it, and join it into a string
    return dependencyResolver
      .linearizeGraph(graph)
      .reverse()
      .join(', ')
  },
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
   * @param {Object} inputGraph - A JSON object that maps vertex key label to their neighbor.
   * @return An array of packages such that no package comes after its dependency.
   */
  linearizeGraph(graph) {
    // A map of all vertices to their in-degrees
    let inDegrees = dependencyResolver.computeInDegrees(graph)

    // An array of packages such that no package comes after its dependency.
    let linearization = []

    /*
     * While there are still nodes in the graph, remove any
     * source from the graph and add it to the linearization
     * list until the graph has no more nodes.
     * 
     * We use inDegrees object to keep track of what nodes
     * are left in the graph to prevent modifying the graph
     * given as input.
     */
    while (Object.keys(inDegrees).length > 0) {
      // Find the first node with 0 in-degrees (source vertex)
      let sourceVertices = Object
        .keys(inDegrees)
        .filter(vertex => inDegrees[vertex] == 0)

      if (sourceVertices.length == 0)
        throw new Error('Input graph is not a DAG.')

      let source = sourceVertices[0]
        // Add the source to linearize
      linearization.push(source)

      if (source in graph) {
        // Find the neighbor pointed to by this source, and 
        // decrease its in-degrees
        let neighbor = graph[source]
        inDegrees[neighbor] -= 1
      }

      // Remove source from graph
      delete inDegrees[source]
    }

    return linearization
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

// Export dependency resolver as a module
module.exports = dependencyResolver
