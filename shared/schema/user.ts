
import { z } from "zod";
import { ObjectId } from "mongodb";

export const UserRole = {
  ADMIN: "admin",
  VENDOR: "vendor",
  USER: "user"
} as const;

export const userSchema = z.object({
  _id: z.instanceof(ObjectId),
  email: z.string().email(),
  password: z.string(),
  role: z.enum([UserRole.ADMIN, UserRole.VENDOR, UserRole.USER]),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type User = z.infer<typeof userSchema>;
