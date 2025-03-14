
import express from "express";
import { authenticateToken } from "../middleware/auth";
import { requireRole } from "../../shared/lib/auth";
import { UserRole } from "../../shared/schema/user";

const router = express.Router();

// Public routes
router.post("/auth/login", loginHandler);
router.post("/auth/register", registerHandler);

// Protected routes
router.use(authenticateToken);

// User routes
router.get("/user/profile", requireRole([UserRole.USER]), userProfileHandler);

// Vendor routes
router.get("/vendor/dashboard", requireRole([UserRole.VENDOR]), vendorDashboardHandler);

// Admin routes
router.get("/admin/users", requireRole([UserRole.ADMIN]), listUsersHandler);

export default router;
