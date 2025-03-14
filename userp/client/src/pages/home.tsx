import { SearchForm } from "@/components/search-form";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-16">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold tracking-tight mb-4 text-white bg-clip-text">
            Tiyende Bus Booking
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Book your journey across Zambia with comfort and convenience
          </p>
        </div>

        {/* Search Form with animation */}
        <div className="w-full max-w-md animate-slide-up">
          <SearchForm />
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {[
            {
              title: "Real-time Availability",
              description: "Check seat availability instantly across all routes"
            },
            {
              title: "Secure Payments",
              description: "Pay safely using mobile money services"
            },
            {
              title: "Digital Tickets",
              description: "Get instant QR code tickets on your device"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-white text-center"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}