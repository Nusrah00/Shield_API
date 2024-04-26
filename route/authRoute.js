const authRouter = require('express').Router();

const {registerUser, loginUser} = require("../controllers/authCtrl");




authRouter.post('/reg', registerUser);
authRouter.post('/login', loginUser);







module.exports = authRouter;