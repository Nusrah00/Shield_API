const jwt = require("jsonwebtoken")
const User = require("../models/users")







const isAuthenticated = async(req, res, next) => {

    try {

   // check if theres request header
   if(!req.headers.authorization && !req.headers.authorization.startsWith('Bearer ')) 
       return res.status(401).json({message: 'Authorization required'});

   
   // get token from cookie 
   let token = req.headers.authorization.split(" ")[1];

   if(!token)
       return res.status(401).json({message: 'Not authorized'});

       // Verify the token
   jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {

       if(err) {
           res.status(401).send({
               status : false,
               message : "Unauthorize Access " 
          });
       }

       req.employee = decodedToken;
   })
  
   next();

   }catch(ex) {
       res.status(500).json({message: "Something went wrong"});
       console.log(ex.message);

   }

   /* ------------------------------------------------ */

};