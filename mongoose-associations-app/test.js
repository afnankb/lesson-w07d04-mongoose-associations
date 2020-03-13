const mongoose = require('mongoose');
const Food = require('./models/food');
const Ingredient = require('./models/ingredient');
const mongoURI = 'mongodb://localhost:27017/mongoRelationships';
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('the connection with mongod is established');
  }
);
console.log('===== HERE WE START =====');
Food.findOne({ name: 'Quiche' })
// covert it to data not show use the id 
  .populate('ingredients')
  .exec((err, food) => {
    if (err) {
      return console.log(err);
    }
    console.log('FOOD: ', food);
  });