const router = require("express").Router();
const Employee = require("../models/Employee");
const { validateEmployee } = require("../validation");

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const { error } = validateEmployee(req.body);
  const { name, phone, email } = req.body;

  if (error) return res.status(400).send(error.details[0].message);

  const employee = new Employee({
    name,
    phone,
    email
  });
  try {
    const savedEmployee = await employee.save();
    res.send(savedEmployee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateEmployee(req.body);
  const { name, phone, email } = req.body;

  if (error) return res.status(400).send(error.details[0].message);

  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        phone,
        email
      },
      { useFindAndModify: false }
    );
    if (!employee)
      return res
        .status(404)
        .send("The employee with the given ID was not found");
    res.send(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
    // res.status(400).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res
        .status(404)
        .send("The employee with the given ID was not found");
    res.send(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
    // res.status(400).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndRemove(req.params.id, {
      useFindAndModify: false
    });
    if (!employee)
      return res
        .status(404)
        .send("The customer with the given ID was not found");
    res.send(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
    // res.status(400).send(err);
  }
});

module.exports = router;
