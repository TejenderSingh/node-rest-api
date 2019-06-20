const express = require("express");
const app = express();
const employeesRoute = require("./routes/employees");
const connectDB = require("./config/db");

app.use(express.json());
app.use("/employees", employeesRoute);

// Connect to Database
connectDB();

app.get("/", (req, res) => {
  res.send("Home page");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
