import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { BusRoute } from "@shared/schema";
import { QRCodeSVG } from "qrcode.react";

export default function Ticket() {
  const [, navigate] = useLocation();
  const [ticketDetails, setTicketDetails] = useState<BusRoute | null>(null);

  useEffect(() => {
    const ticket = sessionStorage.getItem('ticketDetails');
    if (ticket) {
      setTicketDetails(JSON.parse(ticket));
      sessionStorage.removeItem('ticketDetails');
    }
  }, []);

  if (!ticketDetails) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center mb-4">Ticket not found</p>
            <Button onClick={() => navigate("/")} className="w-full">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Create QR code data
  const qrData = JSON.stringify({
    ticketId: `TIY-${Date.now()}`,
    operator: ticketDetails.operator,
    route: {
      from: ticketDetails.from,
      to: ticketDetails.to,
      departure: ticketDetails.departureTime,
    },
    passenger: {
      seats: ticketDetails.availableSeats,
      class: ticketDetails.busType,
    }
  });

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">E-Ticket</h1>
              <p className="text-muted-foreground">Booking Confirmation</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h2 className="font-semibold text-lg mb-4">{ticketDetails.operator}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">From</p>
                    <p className="font-medium">{ticketDetails.from}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">To</p>
                    <p className="font-medium">{ticketDetails.to}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Departure</p>
                  <p className="font-medium">
                    {format(new Date(ticketDetails.departureTime), "PPP p")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Arrival</p>
                  <p className="font-medium">
                    {format(new Date(ticketDetails.arrivalTime), "PPP p")}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Bus Type</p>
                  <p>{ticketDetails.busType}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-medium">Amount Paid</p>
                  <p className="text-lg font-semibold">ZMW {ticketDetails.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-primary/5 p-4 rounded-lg mt-4">
                <h3 className="font-medium mb-2">Amenities</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>✓ {ticketDetails.amenities.wifi ? 'WiFi Available' : 'No WiFi'}</p>
                  <p>✓ {ticketDetails.amenities.ac ? 'AC Available' : 'No AC'}</p>
                  <p>✓ {ticketDetails.amenities.chargingPorts ? 'Charging Ports' : 'No Charging'}</p>
                  <p>✓ {ticketDetails.amenities.refreshments ? 'Refreshments' : 'No Refreshments'}</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center border-t pt-4">
                <p className="text-sm text-muted-foreground mb-2">Scan QR Code to verify ticket</p>
                <div className="bg-white p-4 rounded-lg">
                  <QRCodeSVG
                    value={qrData}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={() => navigate("/")} className="w-full">
                Book Another Trip
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}