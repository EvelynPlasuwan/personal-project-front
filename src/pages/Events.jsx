import React, { useState, useEffect } from 'react';
import CategoriesBar from '../components/CategoriesBar';
import EventList from '../components/EventList';
import EventCard from '../components/EventCard'; // Import your EventCard component
import { useSearchParams } from 'react-router';

function Events() {
  // State for search results
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Get parameters from URL
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const searchTerm = searchParams.get('term');
  const location = searchParams.get('location');
  
  // Effect to fetch search results when URL parameters change
  useEffect(() => {
    const fetchSearchResults = async () => {
      // Only search if there's a search term or location
      if (searchTerm || location) {
        setIsLoading(true);
        setError(null);
        
        try {
          // Create URL for search
          const url = new URL('http://localhost:8899/api/search');
          
          // Add query parameters
          if (searchTerm) url.searchParams.append('term', searchTerm);
          if (location) url.searchParams.append('location', location);
          
          console.log("Fetching search results:", url.toString());
          
          // Send request to Express API
          const response = await fetch(url);
          
          // Check response status
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log("Search results:", data);
          
          setSearchResults(data);
        } catch (error) {
          console.error("Error during search:", error);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchSearchResults();
  }, [searchTerm, location]);
  
  return (
    <div className="container mx-auto px-4">
      <CategoriesBar />
      
      {/* Search Results Header */}
      {(searchTerm || location) && (
        <div className="my-6">
          <h2 className="text-2xl font-bold">
            {isLoading ? (
              "กำลังค้นหา..."
            ) : searchResults.length > 0 ? (
              `พบ ${searchResults.length} รายการ ${searchTerm ? `สำหรับ "${searchTerm}"` : ''} ${location ? `ใน ${location}` : ''}`
            ) : (
              `ไม่พบรายการ ${searchTerm ? `สำหรับ "${searchTerm}"` : ''} ${location ? `ใน ${location}` : ''}`
            )}
          </h2>
          {error && (
            <div className="mt-2 text-red-500">
              ข้อผิดพลาด: {error}
            </div>
          )}
        </div>
      )}
      
      {/* Display search results if available, otherwise use EventList with category */}
      {(searchTerm || location) ? (
        isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((event) => (
              <EventCard key={event.id || event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-gray-500 text-lg mb-4">ไม่พบรายการที่ตรงกับคำค้นหาของคุณ</p>
            <button 
              onClick={() => window.history.back()} 
              className="btn btn-primary"
            >
              ย้อนกลับ
            </button>
          </div>
        )
      ) : (
        <EventList initialCategory={category} />
      )}
    </div>
  );
}

export default Events;