const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Food = require('./models/food');
const Ingredient = require('./models/ingredient');
const mongoURI = 'mongodb://localhost/mongoRelationships';
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('the connection with mongod is established');
  }
);
// CREATE TWO INGREDIENTS
const cheddar = new Ingredient({
  name: 'cheddar cheese 111111',
  origin: 'Wisconson',
  age: 77
});
console.log('21:', cheddar);
const dough = new Ingredient({
  name: 'dough',
  origin: 'Iowa'
});
// SAVE THE TWO INGREDIENTS SO
// WE HAVE ACCESS TO THEIR _IDS
cheddar.save((err, savedIng) => {
  if (err) {
    return console.log(err);
  } else {
    console.log('44 cheddar saved successfully', savedIng);
  }
});
dough.save((err, savedIng) => {
  if (err) {
    console.log(err);
  } else {
    console.log('dough saved successfully', savedIng);
  }
});
// CREATE A NEW FOOD
const cheesyQuiche = new Food({
  name: 'Quiche',
  ingredients: []
});
console.log(51, cheesyQuiche);
// PUSH THE INGREDIENTS ONTO THE FOOD'S
// INGREDIENTS ARRAY
cheesyQuiche.ingredients.push(cheddar); // associated!
cheesyQuiche.ingredients.push(dough);
console.log(57, cheesyQuiche);
cheesyQuiche.save((err, savedFood) => {
  if (err) {
    return console.log(err);
  } else {
    console.log('cheesyQuiche food is ', savedFood);
  }
});