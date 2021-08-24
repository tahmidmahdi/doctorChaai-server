// require packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const doctorRoute = require('./Router/doctorRoute');
const userRoute = require('./Router/userRoute');
const doctorAppointmentRoute = require('./Router/doctorAppointmentRoute');
const adminLoginRoute = require('./Router/adminLoginRoute');
const blogRoute = require('./Router/blogRoute');
const githubRoute = require('./Router/githubRoute');
const redis = require('redis');
const fetch = require('node-fetch');

const app = express();

//import socket
const http = require('http').createServer(app);
const io = require('socket.io')(http);

//socket configuration
io.on('connection', (socket) => {
  socket.on('message', ({name, message}) => {
    io.emit('message', {name, message});
  });
});

// use packages

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// redis client
// const redis_port = process.env.PORT || 6379;

//define port
const port = process.env.PORT || 4300;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cau0x.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(`connection successful with Database`);
  })
  .catch((err) => console.log(err));

// for doctor routes
app.use('/doctor', doctorRoute);
// login route
app.use('/user', userRoute);

// Appointment route
app.use('/appointment', doctorAppointmentRoute);

// admin route
app.use('/admin/login', adminLoginRoute);

// blog route
app.use('/blog', blogRoute);

app.use('/repos', githubRoute);
// set Response
// const setResponse = (username, repos) => {
//   return `<h2>${username} has ${repos} github`;
// };

// const getRepos = async (req, res, next) => {
//   try {
//     console.log('Fetching ...');
//     const {username} = req.params;
//     const response = await fetch(`https://api.github.com/users/${username}`);

//     const data = await response.json();

//     const repos = await data.public_repos;

//     // set data to redis
//     //  first params takes key, hours in sec
//     client.setex(username, 3600, repos);

//     // res.send(setResponse(username, repos));
//     res.json({
//       username: username,
//       repos: data,
//     });
//   } catch (err) {}
// };

//  cache middleware
// const cache = (req, res, next) => {
//   const {username} = req.params;
//   client.get(username, (err, data) => {
//     if (err) {
//       throw err;
//     }

//     if (data != null) {
//       // res.send(setResponse(username, data));
//       res.json({
//         username: username,
//         repos: data,
//       });
//     } else {
//       next();
//     }
//   });
// };

// app.get('/repos/:username', cache, getRepos);

app.get('/', async (req, res) => {
  try {
    res.send('Hello DB');
  } catch (err) {
    res.status(500).json({error: err});
  }
});

const errorHandler = (err, req, res, next) => {
  console.log(err.message, err.code);
  if (req.headersSent) {
    return next(err);
  }
  res.status(500).json({error: err});
};
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
