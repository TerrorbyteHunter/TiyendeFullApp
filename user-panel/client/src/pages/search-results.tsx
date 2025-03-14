import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { BusRoute } from "@shared/schema";
import { useEffect, useState } from "react";
import { Wifi, Snowflake, BatteryCharging, Coffee } from "lucide-react";

function AmenityIcon({ available, icon: Icon, label }: { available: boolean; icon: any; label: string }) {
  return (
    <div className={`flex items-center gap-1 ${available ? 'text-primary' : 'text-muted-foreground/50'}`}>
      <Icon className="w-4 h-4" />
      <span className="text-xs">{label}</span>
    </div>
  );
}

export default function SearchResults() {
  const [, navigate] = useLocation();
  const [routes, setRoutes] = useState<BusRoute[]>([]);

  useEffect(() => {
    const searchResults = sessionStorage.getItem('searchResults');
    if (searchResults) {
      const { routes } = JSON.parse(searchResults);
      setRoutes(routes);
    }
  }, []);

  if (routes.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center mb-4">No buses available for this route</p>
            <Button onClick={() => navigate("/")} className="w-full">
              Back to Search
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Available Buses</h1>
          <Button variant="outline" onClick={() => navigate("/")}>
            New Search
          </Button>
        </div>

        <div className="space-y-4">
          {routes.map((route) => (
            <Card key={route.id} className="overflow-hidden">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{route.operator}</h3>
                  <span className="text-sm px-2 py-1 bg-primary/10 rounded-full">
                    {route.busType}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Departure</p>
                    <p className="font-medium">
                      {format(new Date(route.departureTime), "h:mm a")}
                    </p>
                    <p className="text-sm text-muted-foreground">{route.from}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Arrival</p>
                    <p className="font-medium">
                      {format(new Date(route.arrivalTime), "h:mm a")}
                    </p>
                    <p className="text-sm text-muted-foreground">{route.to}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">ZMW {route.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Available Seats</p>
                    <p className="font-medium">{route.availableSeats}</p>
                  </div>
                </div>

                <div className="flex gap-4 mb-4">
                  <AmenityIcon available={route.amenities.wifi} icon={Wifi} label="WiFi" />
                  <AmenityIcon available={route.amenities.ac} icon={Snowflake} label="A/C" />
                  <AmenityIcon available={route.amenities.chargingPorts} icon={BatteryCharging} label="Charging" />
                  <AmenityIcon available={route.amenities.refreshments} icon={Coffee} label="Refreshments" />
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => navigate(`/select-seat/${route.id}`)}>
                    Select Seats
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}