import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router";
import "daisyui/dist/full.css";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Bangkok");
  const [isLoading, setIsLoading] = useState(false);
  
  // Get navigate function for redirection
  const navigate = useNavigate();

  // Function for search
  const handleSearch = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      setIsLoading(true);
      
      try {
        // Create query parameters
        const params = new URLSearchParams();
        if (searchTerm) params.append('term', searchTerm);
        if (location) params.append('location', location);
        
        // Redirect to events page with search parameters
        navigate(`/events?${params.toString()}`);
      } catch (error) {
        console.error("Error during search redirect:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center text-center bg-cover bg-center" 
      style={{ backgroundImage: "url('/banner.webp')" }}>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 px-6">
        <h1 className="text-3xl md:text-5xl font-semibold text-white">
          Don't miss out!<br />
          Explore the <span className="text-yellow-400 font-bold">vibrant events</span> happening locally and globally.
        </h1>

        {/* Search Bar */}
        <div className="mt-6 flex flex-col md:flex-row items-center gap-3 bg-white p-2 rounded-full shadow-lg w-full max-w-3xl mx-auto">
          <div className="flex items-center gap-2 flex-1 px-4">
            <Search className="text-gray-500 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search Events, Categories, Location..." 
              className="input w-full focus:outline-none border-0 bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
            />
          </div>

          <div className="dropdown">
            <label tabIndex={0} className="btn bg-transparent text-black border-none flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" /> {location}
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
              <li><a onClick={() => setLocation("Bangkok")}>Bangkok</a></li>
              <li><a onClick={() => setLocation("Chiang Mai")}>Chiang Mai</a></li>
              <li><a onClick={() => setLocation("Phuket")}>Phuket</a></li>
              <li><a onClick={() => setLocation("Pattaya")}>Pattaya</a></li>
            </ul>
          </div>

          <button 
            className="btn bg-red-500 hover:bg-red-600 text-white rounded-full"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? "กำลังค้นหา..." : "Search"}
          </button>
        </div>
      </div>
    </div>
  );
}