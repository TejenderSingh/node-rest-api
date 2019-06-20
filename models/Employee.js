const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  phone: {
    type: Number,
    required: true,
    min: 6
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  }
});

// function validate() {
//   const schema = {
//     name:
//   }
// }

const employeesModel = mongoose.model("employee", employeeSchema);
module.exports = employeesModel;
