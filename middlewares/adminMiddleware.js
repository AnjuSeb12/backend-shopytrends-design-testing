import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authenticateAdmin(req, res, next) {
  const token = req.cookies.token;

  jsonwebtoken.verify(token, process.env.SECRET_KEY, (err, user) => {
    console.log(err);

    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    

    if(req.user.role !=="admin"){
      return res.send("not authenticated")
    }

    next();
  });
}

export default authenticateAdmin;