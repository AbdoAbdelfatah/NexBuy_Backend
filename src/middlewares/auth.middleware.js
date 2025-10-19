import verify from "../utils/jwt";

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: missing token" });
  };
  const token=header.split(" ")[1];
  try {
    const payload = verify(token);
    req.user = payload; // { id: userId, iat, exp }
    next();
  } catch {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
