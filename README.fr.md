[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/alexandrebaux/phenotype/blob/master/README.md)
[![fr](https://img.shields.io/badge/lang-fr-green.svg)](https://github.com/alexandrebaux/phenotype/blob/master/README.fr.md)


# Lisez-moi

Phenotype est un script JavaScript qui met en œuvre un algorithme génétique pour optimiser un phénotype donné. Le phénotype à optimiser est transmis sous forme de fonction, avec des paramètres facultatifs pour l'algorithme génétique.

Le script crée une population de créatures, chacune avec une séquence génétique générée aléatoirement. Les créatures sont évaluées en fonction de leur adaptation au phénotype donné, et la séquence génétique de la créature la plus adaptée est utilisée pour créer une nouvelle génération de créatures avec des variations sur la séquence génétique originale. Ce processus est répété jusqu'à ce que la population converge vers une solution.

Pour utiliser le script, créez une nouvelle instance de la fonction phénotype, en passant le phénotype à optimiser et les paramètres facultatifs. L'instance a ensuite plusieurs méthodes qui peuvent être appelées :

- score(fitness) : définit le score de forme physique pour la créature en cours
- error(err) : définit la valeur d'erreur pour la créature en cours
- run() : évalue la séquence génétique de la créature actuelle
- save() : retourne la séquence génétique de la créature la plus apte
- load(adn) : charge une séquence génétique donnée dans la créature la plus apte

Les paramètres facultatifs pour l'algorithme génétique comprennent :

- genlength : la longueur de chaque gène dans la séquence génétique
- popsize : la taille de la population
- mutation : le taux de mutation dans la séquence génétique

## Exemple : Optimiser une variable.

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

## Exemple : Résoudre le problème du voyageur de commerce

Le problème du voyageur de commerce (TSP) est un problème d'optimisation classique dans lequel un vendeur doit visiter un ensemble de villes, en visitant chaque ville exactement une fois, et revenir à la ville de départ dans le plus court chemin possible. Voici un exemple d'utilisation du script phénotype pour résoudre le TSP :

```javascript
// Définir les villes et leurs coordonnées
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

// Définir la fonction de distance entre deux villes
var distance = function(city1, city2) {
    var dx = city1.x - city2.x;
    var dy = city1.y - city2.y;
    return Math.sqrt(dx*dx + dy*dy);
};

// Créer un phénotype pour optimiser l'itinéraire
var calculateDistance = function(points) {
    var d = 0;
    for (var i = 0; i < points.length - 1; i++) {
        d += distance(points[i], points[i+1]);
    }
    d += distance(points[points.length-1], points[0]);

    return d;
};

var totalDistance = calculateDistance(cities);
var lastBestDistance = totalDistance;

console.log("Distance Initiale", totalDistance);

var tspPhenotype = phenotype(function(genome) {
    
    // Nous clonons les villes
    var cloned_cities = [...cities];

    // Classer les villes en utilisant le génome comme graine aléatoire
    for (var i = 0; i < cities.length; i++) {
        cloned_cities[i].rank = genome();
    }
    cloned_cities.sort(function(a,b) {
        return a.rank - b.rank;
    });
    
    // Calculer la distance totale du parcours
    totalDistance = calculateDistance(cloned_cities);

});

var loop = function() {

    // Exécuter le phénotype 
    tspPhenotype.run();

    // Définir l'erreur comme la distance (pour maximiser la fitness)
    tspPhenotype.error(totalDistance);

    // Obtenir le meilleur itinéraire et sa distance
    var best_cities =  [...cities];
    var bestRoute = tspPhenotype.save();
    for (var i = 0; i < bestRoute.length; i++) {
        best_cities[i].rank = bestRoute[i];   
    }
    best_cities.sort(function(a,b) {
        return a.rank - b.rank;
    });
    var bestDistance = calculateDistance(best_cities);

    if (lastBestDistance != bestDistance) {

        // Afficher la nouvelle meilleure solution
        console.log(best_cities, bestDistance);

        lastBestDistance = bestDistance;
    }

    // Boucler
    setTimeout(loop, 1);
};

loop();

```
