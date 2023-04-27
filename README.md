# README

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

## Example: Solving the Traveling Salesman Problem

The Traveling Salesman Problem (TSP) is a classic optimization problem where a salesman has to visit a set of cities, visiting each city exactly once, and return to the starting city in the shortest possible route. Here's an example of using the phenotype script to solve the TSP:

```javascript
// Define the cities and their coordinates
var cities = [
    {"id":"city_1","x":39,"y":37},
    {"id":"city_2","x":14,"y":35},
    {"id":"city_3","x":36,"y":7},
    {"id":"city_4","x":67,"y":88},
    {"id":"city_5","x":85,"y":53},
    {"id":"city_6","x":23,"y":55},
    {"id":"city_7","x":94,"y":49},
    {"id":"city_8","x":40,"y":74},
    {"id":"city_9","x":16,"y":23},
    {"id":"city_10","x":86,"y":65}
];

// Define the distance function between two cities
var distance = function(city1, city2) {
    var dx = city1.x - city2.x;
    var dy = city1.y - city2.y;
    return Math.sqrt(dx*dx + dy*dy);
};

// Create a phenotype to optimize the route
var calculateDistance = function(cloned_cities) {
    var d = 0;
    for (var i = 0; i < cloned_cities.length - 1; i++) {
        d += distance(cloned_cities[i], cities[i+1]);
    }
    d += distance(cloned_cities[cloned_cities.length-1], cities[0]);

    return d;
};

var totalDistance = calculateDistance(cities);

console.log("Initial Distance", totalDistance);

var tspPhenotype = phenotype(function(genome) {
    
    // We clone cities
    var cloned_cities = [...cities];

    // Rank cities using the genome as a random seed
    for (var i = 0; i < cities.length; i++) {
        cloned_cities[i].rank = genome();
    }
    cloned_cities.sort(function(a,b) {
        return a.rank - b.rank;
    });
    
    // Calculate total distance of the route
    totalDistance = calculateDistance(cloned_cities);

});

var loop = function() {

    // Run the phenotype 
    tspPhenotype.run();

    // Set the error as the distance (to maximize fitness)
    tspPhenotype.error(totalDistance);

    // Get the best route and its distance
    var best_cities =  [...cities];
    var bestRoute = tspPhenotype.save();
    for (var i = 0; i < bestRoute.length; i++) {
        if (best_cities[i]) {
            best_cities[i].rank = bestRoute[i];
        }
    }
    best_cities.sort(function(a,b) {
        return a.rank - b.rank;
    });
    var bestDistance = calculateDistance(best_cities);

    // Show Best Solution
    console.log(best_cities, bestDistance);

    setTimeout(function(){

        loop();

    }, 1);
};

loop();

```
