import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Predefined Zambian cities for routes
export const zambiaCities = [
  "Lusaka",
  "Kitwe",
  "Ndola",
  "Livingstone",
  "Chipata",
  "Solwezi",
  "Kasama",
  "Kabwe",
  "Chingola",
  "Mufulira"
] as const;

export const busSearches = pgTable("bus_searches", {
  id: serial("id").primaryKey(),
  from: text("from").notNull(),
  to: text("to").notNull(),
  date: text("date").notNull(),
  passengers: integer("passengers").notNull(),
});

export const busSearchSchema = createInsertSchema(busSearches).pick({
  from: true,
  to: true,
  date: true,
  passengers: true,
}).extend({
  from: z.enum(zambiaCities, {
    errorMap: () => ({ message: "Please select a valid departure city" }),
  }),
  to: z.enum(zambiaCities, {
    errorMap: () => ({ message: "Please select a valid destination city" }),
  }).refine(val => val !== busSearchSchema._def.shape().from._def.value, {
    message: "Destination must be different from departure city"
  }),
  date: z.string().refine((date) => {
    const selected = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
  }, "Date must be today or in the future"),
  passengers: z.number().min(1, "Must have at least 1 passenger").max(10, "Maximum 10 passengers allowed"),
});

export type BusSearch = typeof busSearches.$inferSelect;
export type InsertBusSearch = z.infer<typeof busSearchSchema>;

// Add new interfaces for seat selection and loyalty program
export interface BusSeat {
  id: string;
  row: number;
  column: number;
  status: 'available' | 'selected' | 'booked';
  price: number;
  type: 'regular' | 'premium' | 'business';
}

export interface SeatLayout {
  totalRows: number;
  seatsPerRow: number;
  seats: BusSeat[];
}

export interface LoyaltyPoints {
  points: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  benefits: string[];
}

// Update existing BusRoute interface
export interface BusRoute {
  id: number;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number; // Price in ZMW
  availableSeats: number;
  busType: string;
  operator: string;
  seatLayout: SeatLayout;
  pointsEarned: number; // Points earned for this route
  amenities: {
    wifi: boolean;
    ac: boolean;
    chargingPorts: boolean;
    refreshments: boolean;
  };
}

// Mobile money payment schema
export const mobilePaymentSchema = z.object({
  phoneNumber: z.string()
    .regex(/^097\d{7}$/, "Invalid phone number format. Must start with 097 followed by 7 digits"),
  pin: z.string()
    .length(4, "PIN must be 4 digits")
    .regex(/^\d+$/, "PIN must contain only numbers"),
});

export type MobilePayment = z.infer<typeof mobilePaymentSchema>;