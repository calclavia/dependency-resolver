/**
 * Contains all functions to execute the program
 */
module.export = {
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

    }
}