import { BusSearch, InsertBusSearch, BusRoute, BusSeat } from "@shared/schema";

export interface IStorage {
  createSearch(search: InsertBusSearch): Promise<BusSearch>;
  searchBuses(search: InsertBusSearch): Promise<BusRoute[]>;
}

export class MemStorage implements IStorage {
  private searches: Map<number, BusSearch>;
  private currentId: number;

  constructor() {
    this.searches = new Map();
    this.currentId = 1;
  }

  async createSearch(search: InsertBusSearch): Promise<BusSearch> {
    const id = this.currentId++;
    const busSearch: BusSearch = { ...search, id };
    this.searches.set(id, busSearch);
    return busSearch;
  }

  private generateSeatLayout() {
    const totalRows = 9; // 9 rows
    const seatsPerRow = 3; // 3 seats on each side
    const seats: BusSeat[] = [];

    // Generate seats for both sides of the aisle
    for (let row = 0; row < totalRows; row++) {
      // Left side seats (3 seats)
      for (let col = 0; col < seatsPerRow; col++) {
        seats.push({
          id: `L${row}-${col}`,
          row,
          column: col,
          status: Math.random() > 0.7 ? 'booked' : 'available',
          price: 150 + Math.floor(Math.random() * 50),
          type: 'regular'
        });
      }

      // Right side seats (3 seats)
      for (let col = 0; col < seatsPerRow; col++) {
        seats.push({
          id: `R${row}-${col}`,
          row,
          column: col + 4, // +4 to account for aisle
          status: Math.random() > 0.7 ? 'booked' : 'available',
          price: 150 + Math.floor(Math.random() * 50),
          type: 'regular'
        });
      }
    }

    return {
      totalRows,
      seatsPerRow: 6, // Total seats per row including both sides
      seats
    };
  }

  async searchBuses(search: InsertBusSearch): Promise<BusRoute[]> {
    // Simulate bus operators and routes
    const operators = ["Power Tools", "Mazhandu", "Shalom", "Euro Africa", "ZABTC"];
    const routes: BusRoute[] = [];
    const baseTime = new Date(`${search.date}T06:00:00`);

    for (let i = 0; i < 5; i++) {
      const departureTime = new Date(baseTime.getTime() + i * 2 * 60 * 60 * 1000);
      const arrivalTime = new Date(departureTime.getTime() + 3 * 60 * 60 * 1000);

      routes.push({
        id: i + 1,
        from: search.from,
        to: search.to,
        departureTime: departureTime.toISOString(),
        arrivalTime: arrivalTime.toISOString(),
        price: 150 + Math.floor(Math.random() * 100), // Random price between 150-250 ZMW
        availableSeats: Math.floor(Math.random() * 20) + 5,
        busType: i % 2 === 0 ? "Luxury" : "Standard",
        operator: operators[i],
        seatLayout: this.generateSeatLayout(),
        pointsEarned: 100 + Math.floor(Math.random() * 50), // Base points for the route
        amenities: {
          wifi: i % 2 === 0,
          ac: true,
          chargingPorts: i % 2 === 0,
          refreshments: i % 3 === 0
        }
      });
    }

    return routes;
  }
}

export const storage = new MemStorage();