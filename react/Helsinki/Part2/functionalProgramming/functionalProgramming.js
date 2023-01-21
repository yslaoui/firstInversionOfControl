///////////////////////////////////////////////////////////
// **** Function are values ****
///////////////////////////////////////////////////////////

// In any program we define a function like this

function triple(x) {
    return x * 3
}

//  In javavascript we can crate an anonymous function and 
// assign it to a variable. because, in Javascript, functions 
// are values


var triple = function(x) {
    return x * 3
}

// Because it is a value we can pass it to other variables
var waffle = triple;
console.log(waffle(30));


///////////////////////////////////////////////////////////
// **** Higher order functions: filter() **** 
///////////////////////////////////////////////////////////

var animals = [
    {name: 'fdsfsdfsfd', species: 'rabbit'},
    {name: 'harold',     species: 'rabbit'},
    {name: 'Helena',     species: 'dog'},
    {name: 'Ursula',     species: 'fish'},
    {name: 'Leyy',       species: 'cat'},
    {name: 'kelly',      species: 'dog'},
]

// our objective is to filter the array to leave only the dogs

//  The old way with a foor loop 
var dogs = []
for (var i=0; i<animals.length; i++) {
    if (animals[i].species == 'dog') {
        dogs.push(animals[i]);
    }
}
console.log("for loop dog list is", dogs);

// The functional programming way using filter function
// the filter() is the higher order function. (x) => x.species == 'dog' is the callback functio 
var dog2 = animals.filter((x) => x.species == 'dog');
console.log("filtered dog list is", dog2);

// You can pass the callback function to a variable, and pass that variable to the higher order function
var isDog = (x) => x.species == 'dog'
var otherAnimals = animals.filter(isDog);
console.log('The other animals are', otherAnimals)


///////////////////////////////////////////////////////////
// **** Higher order functions: map() **** 
///////////////////////////////////////////////////////////

// The objective is to get an array of strings containing the names of the animals

// The old way
var names = [];
for (var i=0; i<animals.length; i++) {
    names.push(animals[i].name);
}
console.log('The old names are', names);

// Using functional programming
var names2 = animals.map((x) => x.name);
console.log('The functional names are', names2);

///////////////////////////////////////////////////////////
// **** Higher order functions: reduce() **** 
///////////////////////////////////////////////////////////

var orders = [
    {amount: 250},
    {amount: 400},
    {amount: 850},
    {amount: 325}
]
// The objective is to compute the sum of orders 

// The olde way 
var sum = 0;
for (var i=0; i<orders.length; i++) {
    sum += orders[i].amount;
} 
console.log('The sum is', sum);

// The functional way
var sum2 = orders.reduce((sum, x) => sum+x.amount ,0);
console.log('The functional sum is', sum2);