import jwt from "jsonwebtoken";

function auth(req, res, next) {
  let token = req.headers.token;
  if (!token)
    return res.status(401).json({ message: "Access denied, signup first!!!" });
  token = token.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(400).json({ message: "Access denied, signup first!!!" });
  }
}

export default auth;
