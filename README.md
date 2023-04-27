**phenotype** is a simple optimization function based on a genetic algorithm.


## Example

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

## Documentation

```javascript

// Creation of a simples variables
var settings_1 = 0;
var settings_2 = 0;
var settings_3 = 0;

// Creation of a phenotype.
// All the code in this function is executed when "myFirstPhenotype.run()" is executed.
var myFirstPhenotype = phenotype(function(genome) {

   // The genome() function give a value between 0 and 1 like this: 0.75838726346 to each settings.

    settings_1 = genome(); // 0.683465982345
    settings_2 = genome(); // 0.234985647634
    settings_3 = genome(); // 0.977563543322

});

// The execution of this line changes the value of the three settings
myFirstPhenotype.run();

// This line will adjust the value return by all genome() function using an error.
// The errorValue is like a distance between the result you expect and what you get. 
myFirstPhenotype.error(errorValue);

// This line will adjust the value returned by the all genome() function using a score as a reward.
myFirstPhenotype.score(scoreValue);

// This line return an array of value with the current best parameters
myFirstPhenotype.save();

// This line will load an array of value
myFirstPhenotype.load(arrayOfValue);

```
