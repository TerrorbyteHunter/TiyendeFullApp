import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BusRoute } from "@shared/schema";
import { MapPin, Clock, Users, Wifi, Snowflake, BatteryCharging, Coffee, User, ChevronRight } from "lucide-react";

const SeatSelection = () => {
  const { id } = useParams();
  const [_, navigate] = useLocation();
  const [busDetails, setBusDetails] = useState<BusRoute | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);

  useEffect(() => {
    // Load bus details from sessionStorage
    const results = sessionStorage.getItem('searchResults');
    if (results) {
      const parsedResults = JSON.parse(results);
      // Check if the parsed data has a 'routes' property (matching search-results.tsx)
      const routes = parsedResults.routes || parsedResults;

      if (Array.isArray(routes)) {
        const selectedBus = routes.find((bus: BusRoute) => bus.id === parseInt(id || '0'));
        if (selectedBus) {
          setBusDetails(selectedBus);
          // Generate some random booked seats
          const booked: string[] = [];
          for (let i = 0; i < 10; i++) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 6);
            booked.push(`${row}-${col}`);
          }
          setBookedSeats(booked);
        }
      }
    }
  }, [id]);

  const handleSeatClick = (seatId: string) => {
    if (bookedSeats.includes(seatId)) {
      return; // Can't select a booked seat
    }

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      return; // Don't proceed if no seats are selected
    }

    if (busDetails) {
      // Update the bus details with selected seats
      const updatedBus = {
        ...busDetails,
        selectedSeats,
        totalPrice: busDetails.price * selectedSeats.length
      };

      // Save to session storage
      sessionStorage.setItem('selectedBus', JSON.stringify(updatedBus));

      // Navigate to checkout
      navigate(`/checkout/${busDetails.id}`);
    }
  };

  if (!busDetails) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center mb-4">Bus not found</p>
            <Button onClick={() => navigate("/")} className="w-full">
              Back to Search
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate seat number (1-based) from row and column
  const getSeatNumber = (row: number, col: number) => row * 6 + col + 1;

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Select Seats</h1>

      {/* Trip details card */}
      <Card className="mb-6 shadow-md">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">{busDetails.from} to {busDetails.to}</h2>
                <p className="text-sm text-muted-foreground">
                  {new Date(busDetails.departureTime).toLocaleDateString()} • {busDetails.distance}km
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg">{busDetails.operator}</p>
              <p className="text-sm text-muted-foreground">{busDetails.busType}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm border-t pt-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{new Date(busDetails.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(busDetails.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{busDetails.availableSeats} seats available</span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              {busDetails.amenities?.wifi && <Wifi className="h-4 w-4 text-primary" />}
              {busDetails.amenities?.ac && <Snowflake className="h-4 w-4 text-primary" />}
              {busDetails.amenities?.chargingPorts && <BatteryCharging className="h-4 w-4 text-primary" />}
              {busDetails.amenities?.refreshments && <Coffee className="h-4 w-4 text-primary" />}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder for map component */}
      <div className="mb-6">
        {/*  Replace this div with a map component that displays the bus route and stops using busDetails.routeStops */}
        <p>Map of bus route will be displayed here.</p> 
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Seat selection area */}
        <div className="md:col-span-2">
          <Card className="shadow-md h-full">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Select Your Seats</h2>

              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium">Bus Layout</div>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-primary rounded-sm"></div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-orange-300 rounded-sm"></div>
                    <span>Booked</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-green-400 rounded-sm"></div>
                    <span>Available</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                {/* Driver's area */}
                <div className="flex justify-end mb-6 border-b pb-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-md">
                    <User className="h-6 w-6" />
                    <span className="text-xs ml-1">Driver</span>
                  </div>
                </div>

                {/* Bus layout visualization */}
                <div className="relative p-4 bg-slate-100 rounded-xl border border-slate-300 max-w-[280px]">
                  {/* Bus outline */}
                  <div className="relative pb-[380%] w-full">
                    {/* Bus front */}
                    <div className="absolute top-0 left-0 right-0 h-10 bg-slate-400 rounded-t-xl flex items-center justify-center">
                      <div className="w-10 h-5 bg-slate-600 rounded-full mb-1"></div>
                    </div>
                    
                    {/* Driver section */}
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-slate-300 border-2 border-slate-400 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
                        <circle cx="12" cy="6" r="4"/>
                        <path d="M12 10v6"/>
                        <line x1="9" y1="14" x2="15" y2="14"/>
                      </svg>
                    </div>
                    
                    {/* Seats container */}
                    <div className="absolute top-[85px] bottom-[15px] left-[15px] right-[15px] grid grid-cols-2 gap-3">
                      {/* Left side seats (3 per row) */}
                      <div className="grid grid-cols-1 gap-2">
                        {Array.from({ length: 9 }).map((_, row) => (
                          <div key={`left-row-${row}`} className="flex space-x-1">
                            {Array.from({ length: 3 }).map((_, col) => {
                              const seatId = `${row}-${col}`;
                              const isBooked = bookedSeats.includes(seatId);
                              const isSelected = selectedSeats.includes(seatId);
                              
                              // Color selection based on status
                              let bgColor = "bg-white";
                              if (isBooked) {
                                bgColor = "bg-orange-300";
                              } else if (isSelected) {
                                bgColor = "bg-primary";
                              } else {
                                bgColor = col === 0 ? "bg-orange-300" : "bg-green-400";
                              }
                              
                              return (
                                <div
                                  key={`left-${row}-${col}`}
                                  className={`w-7 h-7 ${bgColor} rounded border border-gray-300 shadow-sm flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${isBooked ? "cursor-not-allowed opacity-50" : ""}`}
                                  onClick={() => handleSeatClick(seatId)}
                                >
                                  <span className={`text-[10px] font-medium ${isSelected ? "text-white" : "text-gray-700"}`}>{getSeatNumber(row, col)}</span>
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                      
                      {/* Right side seats (3 per row) */}
                      <div className="grid grid-cols-1 gap-2">
                        {Array.from({ length: 9 }).map((_, row) => (
                          <div key={`right-row-${row}`} className="flex space-x-1">
                            {Array.from({ length: 3 }).map((_, seatCol) => {
                              const col = seatCol + 3; // Offset for right side
                              const seatId = `${row}-${col}`;
                              const isBooked = bookedSeats.includes(seatId);
                              const isSelected = selectedSeats.includes(seatId);
                              
                              // Color selection based on status
                              let bgColor = "bg-white";
                              if (isBooked) {
                                bgColor = "bg-orange-300";
                              } else if (isSelected) {
                                bgColor = "bg-primary";
                              } else {
                                bgColor = "bg-green-400";
                              }
                              
                              return (
                                <div
                                  key={`right-${row}-${col}`}
                                  className={`w-7 h-7 ${bgColor} rounded border border-gray-300 shadow-sm flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${isBooked ? "cursor-not-allowed opacity-50" : ""}`}
                                  onClick={() => handleSeatClick(seatId)}
                                >
                                  <span className={`text-[10px] font-medium ${isSelected ? "text-white" : "text-gray-700"}`}>{getSeatNumber(row, col)}</span>
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Bus back */}
                    <div className="absolute bottom-0 left-0 right-0 h-5 bg-slate-400 rounded-b-xl"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary card */}
        <div>
          <Card className="shadow-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Trip Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base fare</span>
                  <span>K{busDetails.price}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Selected seats</span>
                  <span>{selectedSeats.length > 0 
                    ? selectedSeats.map(s => getSeatNumber(parseInt(s.split('-')[0]), parseInt(s.split('-')[1]))).join(', ') 
                    : 'None'}
                  </span>
                </div>

                <div className="flex justify-between border-t border-dashed pt-3 mt-3">
                  <span className="font-medium">Total price</span>
                  <span className="font-bold text-lg">K{busDetails.price * selectedSeats.length}</span>
                </div>

                <Button
                  onClick={handleContinue}
                  disabled={selectedSeats.length === 0}
                  className="w-full mt-4"
                  size="lg"
                >
                  Proceed to Checkout
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-2">
                  You can select multiple seats if required
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;