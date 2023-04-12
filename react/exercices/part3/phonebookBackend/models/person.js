const mongoose = require('mongoose');

const password = 'Skhirate_88';
const appName = 'phoneBook';
const url = `mongodb+srv://yslaoui:${password}@cluster0.9uqoxi0.mongodb.net/${appName}?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(url);
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (v) => /\d{2,3}-\d+/.test(v),
      message: 'Format must be /\d{2,3}-\d+/ '
    }
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema); // creates a collection called people. model() creates a collection whose name is the plural of the model name
