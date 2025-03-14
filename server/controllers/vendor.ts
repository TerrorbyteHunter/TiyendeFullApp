import { Request, Response } from 'express';
import { db } from '../db';

export const getDashboard = async (req: Request, res: Response) => {
  const vendorId = req.user.vendorId;
  const stats = {
    totalRoutes: await db.query.routes.count({ where: { vendorId } }),
    totalBookings: await db.query.bookings.count({ where: { vendorId } }),
    revenue: await calculateRevenue(vendorId),
    activeRoutes: await db.query.routes.count({ where: { vendorId, status: 'active' } })
  };
  res.json(stats);
};

export const getRoutes = async (req: Request, res: Response) => {
  const vendorId = req.user.vendorId;
  const routes = await db.query.routes.findMany({
    where: { vendorId }
  });
  res.json(routes);
};

export const createRoute = async (req: Request, res: Response) => {
  const vendorId = req.user.vendorId;
  const { departure, destination, price, schedule } = req.body;
  const route = await db.query.routes.create({
    data: { vendorId, departure, destination, price, schedule }
  });
  res.json(route);
};

export const updateRoute = async (req: Request, res: Response) => {
  const { id } = req.params;
  const vendorId = req.user.vendorId;
  const { departure, destination, price, schedule, status } = req.body;
  const route = await db.query.routes.update({
    where: { id, vendorId },
    data: { departure, destination, price, schedule, status }
  });
  res.json(route);
};

export const getBookings = async (req: Request, res: Response) => {
  const vendorId = req.user.vendorId;
  const bookings = await db.query.bookings.findMany({
    where: { vendorId },
    include: { user: true, route: true }
  });
  res.json(bookings);
};

async function calculateRevenue(vendorId: number) {
  const bookings = await db.query.bookings.findMany({
    where: { vendorId },
    include: { route: true }
  });
  return bookings.reduce((total, booking) => total + booking.route.price * booking.seats, 0);
}