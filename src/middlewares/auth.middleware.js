import {verify} from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
      console.log("Auth failed: missing or invalid header", header);
      return res.status(401).json({ message: "Unauthorized: missing token" });
  }
  const token = header.split(" ")[1];
  try {
    const payload = verify(token);
    req.user = payload; // { id: userId, iat, exp }
    console.log("Auth successful for user:", payload.id);
    next();
  } catch (error) {
    console.log("Auth failed: invalid token", error.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
