const express = require('express');
const mongoose = require('mongoose');
const Ingredient = require('./models/ingredient');
const Food = require('./models/food');
const app = express();
app.use(express.json());
const mongoURI = 'mongodb://localhost:27017/mongoRelationships';
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('the connection with mongod is ESTABLISHED');
  }
);
console.log('===== HERE WE START =====');
app.post('/create/Ing', (req, res) => {
  console.log('POST /create');
  console.log('BODY:', req.body);
  const newIng = req.body;
  Ingredient.create(newIng, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send('POST /create ' + newIng.name);
  });
});
app.post('/create/food', (req, res) => {
  console.log('POST /create/food');
  console.log('BODY:', req.body);
  const newFood = req.body;
  console.log('BODY:', newFood);
  const ing1 = new Ingredient({ name: newFood.ings[0] });
  const ing2 = new Ingredient({ name: newFood.ings[1] });
  const newFoodInDB = new Food({
    name: newFood.name,
    ingredients: []
  });
  newFoodInDB.ingredients.push(ing1);
  newFoodInDB.ingredients.push(ing2);
  ing1.save((err, result) => {
    if (err) {
      console.log(err);
    }
    console.log('done save ing1');
  });
  ing2.save((err, result) => {
    if (err) {
      console.log(err);
    }
    console.log('done save ing2');
  });
  newFoodInDB.save((err, result) => {
    if (err) {
      console.log(err);
    }
    console.log('done save food');
    res.send(result);
  });
});
app.get('/foods/:food_name/ingredients', (req, res) => {
  console.log(req.params.food_name);
  const foodName = req.params.food_name;
  Food.find({ name: foodName })
    .populate('ingredients')
    .exec((err, result) => {
      if (err) {
      }
      console.log(result[0].ingredients);
      res.json(result[0].ingredients);
    });
});
app.get('/foods/:food_name', (req, res) => {
  console.log(req.params.food_name);
  const foodName = req.params.food_name;
  Food.findOne({ name: foodName })
    .populate('ingredients')
    .exec((err, result) => {
      if (err) {
      }
      console.log(result);
      res.json(result);
    });
});
/* 
  "ings1":"chicken",
  "ings2":"bread"
}
*/
console.log('===== HERE WE END =====');
const PROT = 5000;
app.listen(PROT, () => {
  console.log(`LISTENING to http://localhost:${PROT}`);
});