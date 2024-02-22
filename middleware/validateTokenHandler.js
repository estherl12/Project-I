const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyUser = async (req, res,next) => {
    let authheader = req.headers.authorization || req.headers.Authorization;
    if(!authheader){
        res.status(403).send({ msg: "access denied" });
    }
    try {
      if (`${authheader}`.startsWith("Bearer")){
        let token =await authheader.split(" ")[1];

        if (token === "null" || !token) {
          res.status(403).send({ msg: "access denied" });
        }
        let verifyUserToken = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
        if (!verifyUserToken) {
          res.status(403).send({ msg: "access denied !!" });
        }
        console.log(verifyUserToken.user);
        req.user = verifyUserToken;
        next();
        return;
      }
    } catch (err) {
    console.log(err)
    res.status(400).send("Invalid token");
    }
  };
  module.exports = {
    verifyUser
  };
  