README

Phenotype is a JavaScript script that implements a genetic algorithm to optimize a given phenotype. The phenotype to be optimized is passed as a function, along with optional parameters for the genetic algorithm.

The script creates a population of creatures, each with a randomly generated genetic sequence. The creatures are evaluated based on their fitness to the given phenotype, and the genetic sequence of the most fit creature is used to create a new generation of creatures with variations on the original genetic sequence. This process is repeated until the population converges on a solution.

To use the script, create a new instance of the phenotype function, passing in the phenotype to be optimized and any optional parameters. The instance then has several methods that can be called:

- score(fitness): sets the fitness score for the current creature
- error(err): sets the error value for the current creature
- run(): evaluates the current creature's genetic sequence
- save(): returns the genetic sequence of the most fit creature
- load(adn): loads a given genetic sequence into the most fit creature

Optional parameters for the genetic algorithm include:

- genlength: the length of each gene in the genetic sequence
- popsize: the size of the population
- mutation: the rate of mutation in the genetic sequence


## Example: Optimize a variable.

```javascript

var currentValue = 123; 
var perfectValue = 12345;

// We create a phenotype.
var myFirstPhenotype = phenotype(function(genome) {

    // genome() return a float between 0 and 1.
    currentValue = genome() * 100000; 
 
});

// 10000 Steps 
for (var i=0; i < 10000; i++) {
    
    // We run the phenotype
    myFirstPhenotype.run();
    
    // We calculate the distance between the good value and the current value
    var errorValue = Math.abs(currentValue - perfectValue);
    
    // We give the error value to the phenotype
    myFirstPhenotype.error(errorValue);    

}

console.log(currentValue); // 12345
```

##Example: Solving the Traveling Salesman Problem

The Traveling Salesman Problem (TSP) is a classic optimization problem where a salesman has to visit a set of cities, visiting each city exactly once, and return to the starting city in the shortest possible route. Here's an example of using the phenotype script to solve the TSP:

```javascript


```
