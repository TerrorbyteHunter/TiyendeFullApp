
import { Request, Response } from 'express';
import { db } from '../db';

export const getDashboardStats = async (req: Request, res: Response) => {
  // Reuse existing dashboard logic from admin-panel
  const stats = {
    totalBookings: 10,
    totalRevenue: 2240,
    activeRoutes: 5,
    pendingBookings: 3
  };
  res.json(stats);
};

export const getVendors = async (req: Request, res: Response) => {
  const vendors = await db.query.vendors.findMany();
  res.json(vendors);
};

export const getRoutes = async (req: Request, res: Response) => {
  const routes = await db.query.routes.findMany();
  res.json(routes);
};

export const getTickets = async (req: Request, res: Response) => {
  const tickets = await db.query.tickets.findMany();
  res.json(tickets);
};
