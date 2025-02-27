import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    console.log("token from authenticate user: ",token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ensure `req.user` is properly set
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default authenticateUser;
