require("dotenv").config();
const express = require("express");
const cors = require('cors');
const mongoSanitize = require("express-mongo-sanitize");
const cookie = require("cookie-parser");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const authRouter = require("./route/authRoute");

//const empRoutes = require("./routes/empRoutes");
//const itcRoutes = require("./routes/itcRoutes");
//const requisRoutes = require("./routes/requisRoutes");
//const { isAuthenticated } = require("./middlewares/autho");


const app = express();

// enables json
app.use(express.json());
//app.use(bodyParser.json());

app.use(cookie());
app.use(mongoSanitize());
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) =>{


//     return res.status(200).json({
//       message: "Welcome to Quiz API"
//     });
// })
//allow request from different domain
app.use(
    cors({
      origin: [
        // my origins 
      ],
      methods: ["POST", "GET", 'PUT', 'PATCH', 'DELETE'],
      credentials: true,
    })
  );

  // Use Helmet!
// Prevents Mongodb injection
// Stores and protect token in cookie


//   Auth Route
 app.use('/api/v1', authRouter);
// app.use('/api/tascom/v1/employee', isAuthenticated, empRoutes);
// app.use('/api/tascom/v1/itc', isAuthenticated, itcRoutes);
// app.use('/api/tascom/v1/requis', isAuthenticated, requisRoutes);

//endpoint
//  localhost:9999/api/v1/reg
//  localhost:9999/api/v1/login



//app.use(error);


module.exports = app;