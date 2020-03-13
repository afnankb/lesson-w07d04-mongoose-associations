const express = require('express');
const mongoose = require('mongoose');
const DB = require('./db');
const app = express();
app.use(express.json());
const mongoURI = 'mongodb://localhost:27017/sei';
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('the connection with mongod is ESTABLISHED');
  }
);
console.log('===== HERE WE START =====');
console.log('DB:', DB);
app.post('/create/student', (req, res) => {
    console.log(req.body);
    //          {name : req.body.name  ....}
    DB.Student.create(req.body, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.send(result);
    });
  });
  app.post('/create/car', (req, res) => {
    console.log(req.body);
    //          {name : req.body.name  ....}
    const studentN = req.body.student_name;
    const carBrand = req.body.brand;
    const carColor = req.body.color;
    DB.Student.findOne({ name: studentN }, (err, studentFileObj) => {
      console.log('studentFileObj:', studentFileObj);
      const newCar = new DB.Car({ color: carColor, brand: carBrand });
      studentFileObj.cars.push(newCar)
      studentFileObj.save((err,result)=>{
        if(err){
          console.log(err)
        }
        res.send(`the car with brand ${carBrand} with color ${carColor} for the student ${studentN} Added Sucesefdsfrdsf`)
      })
    });
  });
console.log('===== HERE WE END =====');
const PROT = 5000;
app.listen(PROT, () => {
  console.log(`LISTENING to http://localhost:${PROT}`);
});