/*
const t = [1, -1, 3];
console.log(t);
t.forEach(value => {
    console.log(value);
})
    const u = [1,-1,3];
    const t2 = u.concat(5);
    console.log("t2 is " + t2);

// Map is used frequently in React
const m1 = u.map(value => value*2);
console.log("m1 is " + m1 );
const m2 = u.map(value => "<li> " + value + "</li> " )
console.log("m2 is " + m2 );

//  Destructuring 
const w = [1,2,3,4,5];
const [first, second, ...rest] = w;
console.log("first: " + first, "second: " + second);
console.log("rest: " + rest);

// Arrow function with 2 parameters
const sum = (p1,p2) => {
    console.log(p1);
    console.log(p2);
    return p1+p2;
}
console.log("The sum of 1 and 5 is " + sum(1,5));

// Arrow function with 1 parameter: no parenthesis needed
const square = p => {
    console.log(p);
    return (p*p);
}
console.log("the square of 8 is " + square(8))

// Arrow function with 1 parameter and 1 expression: no {} needed
const cube = p => p*p*p;
console.log("the cube of 8 is " + cube(8));

// this short way is handy when using map
const z = [5,9,8,5];
const result = z.map(p => p*p);
console.log("map result is: "+ result);
*/
// Objects and the this keyword
const arto = {
    name: "Atro hellas",
    // A method that does not use the this keyword
    doAddition: function(a,b) {
        console.log(a+b);
    },
    // A method that uses the this keyword which creates problems
    greet: function() {
        console.log("Hello my name is: " + this.name);
    }
}
// The this keyword disappears depending on how we call the method
// If we call using a reference we get a problem
// In doAddition() where this is not used there is no problem
arto.doAddition(6,9); // direct call
const noThisResult = arto.doAddition; //call through reference
noThisResult(6,10);
// In greet() which used the this keyword there is a problem whe calling by reference
arto.greet(); // direct call no problem - this refers to object
const thisResult = arto.greet; // call by reference produces undefined - this refers to global variable
thisResult();

// timeout
setTimeout(arto.greet, 1000); // undefined
setTimeout(arto.greet.bind(arto), 1000); // preserves this. Creates a function where this is bound to arto independent of how the method is called
console.log(typeof arto);
const c =5;
console.log(typeof c);
