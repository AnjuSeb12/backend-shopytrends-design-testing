import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authenticateSeller(req, res, next) {
  const token = req.cookies.token;

  jsonwebtoken.verify(token, process.env.SECRET_KEY, (err, user) => {
    console.log(err);

    if (err) return res.status(403).send("Token not valid or missing");

    req.user = user;
    
    if (req.user.role !== "seller" && req.user.role !== "admin") {
      return res.status(403).send("not authenticated");
    }
    next();
  });
}

export default authenticateSeller;