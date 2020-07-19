# Phenotype.js

phenotype.js is a simple optimization function based on a genetic algorithm.

## Simple Example
```javascript
var currentValue = 156;
var perfectValue = 1990;

// We create an optimizer.
var myFirstPhenotype = phenotype(function(genome) {
    
    
    // Quand myFirstPhenotype.run() est executé
    // When myFirstPhenotype.run() is executed
        
        // On change la valeur courante
        // genome() retourne un nombre à virgule entre 0 et 1
        // We change the currentValue
        // genome() return a float between 0 and 1.
        currentValue = genome() * 100000; 
 
});

// Ici on répéte le code 10000 fois.
// We repeat this part 10000 times.
for (var i=0; i < 10000; i++) {

    // On affiche la valeur de la variable currentValue dans la console de développement.
    // La première fois (currentValue = 156)
    // par la suite la valeur vas ce rapprocher de la variable perfectValue.
    
    // We show the value in the developement console.
    // The first time (currentValue = 156)
    // after this the value will go to the value of perfectValue
    console.log(currentValue);

    // On execute la fonction présente dans le phenotype ci-dessus.
    // Ainsi la variable currentValue prend une certaine valeur.
    // We execute the function in the phenotype above.
    // Like this currentValue take a certain value.
    
    myFirstPhenotype.run()

    // On calcule la distance entre la bonne valeur est la valeur courante
    // We calculate the distance between the good value and the current value
    var errorValue = Math.abs(currentValue - perfectValue);
    myFirstPhenotype.error(errorValue);    

}

```

## Here a simple documentation ( It's not an example )

```javascript

// Creation of a simples variables
var reglage1 = 0;
var reglage2 = 0;
var reglage3 = 0;

// Creation of a phenotype.
// All the code in this function is executed when "myFirstPhenotype.run()" is executed.
var myFirstPhenotype = phenotype(function(genome) {

   // The genome() function give a value between 0 and 1 like this: 0.75838726346

    reglage1 = genome(); // 0.683465982345
    reglage2 = genome(); // 0.234985647634
    reglage3 = genome(); // 0.977563543322

});

// Executing this line change the value of the three variable. (reglage1, reglage2, reglage3)
myFirstPhenotype.run();

// This line will adjust the value return by all genome() function using an error.
// The errorValue is like a distance between the result you expect and what you get. 
myFirstPhenotype.error(errorValue);

// This line will adjust the value return by all genome() function using a score.
myFirstPhenotype.score(scoreValue);

// This line return an array of value with the current best parameters
myFirstPhenotype.save();

// This line will load an array of value
myFirstPhenotype.load(arrayOfValue);

```
