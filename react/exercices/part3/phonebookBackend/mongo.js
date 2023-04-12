const mongoose = require('mongoose');
require('dotenv').config() // this is for process.env to work

if (process.argv.length < 3) {
  console.log('Give password argument');
  process.exit(1);
}

const password = process.argv[2];

const appName = 'phoneBook';

const url = `mongodb+srv://yslaoui:${password}@cluster0.9uqoxi0.mongodb.net/${appName}?retryWrites=true&w=majority`;
np
mongoose.set('strictQuery', false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema); // creates a collection called people. model() creates a collection whose name is the plural of the model name
console.log(Person.collection.name);

console.log(process.argv);
if (process.argv.length === 3) {
  console.log("Three arguments given. Let's print the collection");
  Person
    .find({})
    .then((foundPerson) => {
      foundPerson.forEach((x) => console.log(x));
      mongoose.connection.close();
    });
}

if (process.argv.length === 5) {
  console.log("5 arguments given. Let's add a new documents");
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then(() => {
    console.log('Note saved');
    mongoose.connection.close();
  });
}
