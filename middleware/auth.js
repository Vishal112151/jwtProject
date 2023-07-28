const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  let token =
    req.body.token || req.query.token || req.headers["x-access-token"]||req.rawHeaders[1];
    // console.log("token ---------------> ",token);
    // console.log("req :- ",req.rawHeaders);
  const tokensplit = token.split(" ");
//   console.log("token ---------------> ",token);
  if(tokensplit.length>1)
   token=tokensplit[1];
//   console.log("token ---------------> ",token);
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;