import { useParams, useLocation } from "wouter";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mobilePaymentSchema, type MobilePayment } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Checkout() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Get the selected route from sessionStorage
  const searchResults = sessionStorage.getItem('searchResults');
  const selectedRoute = searchResults ? 
    JSON.parse(searchResults).routes.find((r: any) => r.id === parseInt(id || '0')) : 
    null;

  const form = useForm<MobilePayment>({
    resolver: zodResolver(mobilePaymentSchema),
    defaultValues: {
      phoneNumber: "0978838939",
      pin: ""
    }
  });

  if (!selectedRoute) {
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

  const onSubmit = async (data: MobilePayment) => {
    setIsLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Store the ticket details before clearing search results
      sessionStorage.setItem('ticketDetails', JSON.stringify(selectedRoute));
      sessionStorage.removeItem('searchResults');

      toast({
        title: "Payment Successful",
        description: "Your ticket has been booked successfully!",
      });
      navigate("/ticket");
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Confirm Booking</h2>
            <div className="space-y-2">
              <p><span className="font-medium">From:</span> {selectedRoute.from}</p>
              <p><span className="font-medium">To:</span> {selectedRoute.to}</p>
              <p><span className="font-medium">Departure:</span> {new Date(selectedRoute.departureTime).toLocaleString()}</p>
              <p><span className="font-medium">Bus Type:</span> {selectedRoute.busType}</p>
              <p><span className="font-medium">Price:</span> ZMW {selectedRoute.price.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Mobile Money Payment</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PIN</FormLabel>
                      <FormControl>
                        <Input type="password" maxLength={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing Payment..." : "Pay Now"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}