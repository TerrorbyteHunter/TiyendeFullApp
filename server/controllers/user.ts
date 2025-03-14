import { Request, Response } from 'express';
import { db } from '../db';

export const getProfile = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const user = await db.query.users.findFirst({
    where: { id: userId }
  });
  res.json(user);
};

export const updateProfile = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { name, email, phone } = req.body;
  await db.query.users.update({
    where: { id: userId },
    data: { name, email, phone }
  });
  res.json({ message: 'Profile updated successfully' });
};

export const getBookings = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const bookings = await db.query.bookings.findMany({
    where: { userId }
  });
  res.json(bookings);
};

export const createBooking = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { routeId, date, seats } = req.body;
  const booking = await db.query.bookings.create({
    data: { userId, routeId, date, seats }
  });
  res.json(booking);
};