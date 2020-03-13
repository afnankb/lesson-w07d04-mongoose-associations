const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const carSchema = new Schema({
  color: String,
  brand: String
});
const studentSchema = new Schema({
  name: String,
  cars: [carSchema],
  money: Number,
  groupNumber: Number
});
const Student = mongoose.model('Student', studentSchema);
const Car = mongoose.model('Car', carSchema);
module.exports = {
  Student: Student,
  Car: Car
};