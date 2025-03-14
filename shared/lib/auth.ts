
import jwt from "jsonwebtoken";
import { User, UserRole } from "../schema/user";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const generateToken = (user: User) => {
  return jwt.sign(
    { id: user._id.toString(), email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: any, res: any, next: any) => {
    const user = req.user;
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  };
};
