import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { busSearchSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/search", async (req, res) => {
    try {
      const searchData = busSearchSchema.parse(req.body);
      const search = await storage.createSearch(searchData);
      const routes = await storage.searchBuses(searchData);
      res.json({ search, routes });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: "Invalid search criteria", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          message: "Failed to search for buses" 
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
