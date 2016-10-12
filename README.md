# Dependency Resolver
The following exercise contains a JavaScript program that given an array
of packages and their dependencies, returns a string that specifies the
order to install all dependencies separated by a comma.

Example input:
```
['KittenService: CamelCaser', 'CamelCaser: ']
```

Output:
```
'CamelCaser, KittenService'
```

If no such order is possible (contains cycles), the function will throw an exception.

## Usage
Requirements:
- Node v6
- NPM

Setup:
```
npm install
```

Run unit tests:
```
npm test
```