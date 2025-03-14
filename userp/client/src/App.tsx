import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import SearchResults from "@/pages/search-results";
import SeatSelection from "@/pages/seat-selection";
import Checkout from "@/pages/checkout";
import Ticket from "@/pages/ticket";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/results" component={SearchResults} />
      <Route path="/select-seat/:id" component={SeatSelection} />
      <Route path="/checkout/:id" component={Checkout} />
      <Route path="/ticket" component={Ticket} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;