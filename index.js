// require packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv")
const doctorRoute = require("./Router/doctorRoute");
const userRoute = require("./Router/userRoute");
const doctorAppointmentRoute = require("./Router/doctorAppointmentRoute");
const adminLoginRoute = require('./Router/adminLoginRoute');

// use packages
const app = express(); 
dotenv.config();
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());

//define port
const port = process.env.PORT || 4300


mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cau0x.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connection successful with Database`);
  })
  .catch((err) => console.log(err));


// for doctor routes
app.use("/doctor", doctorRoute);
// login route
app.use("/user", userRoute);

// Appointment route
app.use("/appointment", doctorAppointmentRoute)

// admin route
app.use("/admin/login", adminLoginRoute)

app.get('/', async(req, res) => {
  try{
    res.send('Hello DB');
  } catch (err) {
    res.status(500).json({error: err})
  }
})


const errorHandler = (err, req, res, next) => {
  console.log(err.message, err.code)
  if(req.headersSent) {
    return next(err)
  }
  res.status(500).json({error: err})
}
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
