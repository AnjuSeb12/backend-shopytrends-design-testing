import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authenticateUser(req, res, next) {
  const token = req.cookies.token;

  jsonwebtoken.verify(token, process.env.SECRET_KEY, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;
   

    next();
  });
}

export default authenticateUser;