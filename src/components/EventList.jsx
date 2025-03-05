import React from 'react';
import { useSearchParams } from 'react-router'; // เพิ่ม import
import useFetchEvents from "../store/useFetchEvents";
import EventCard from "./EventCard";

const EventList = () => {
  // ลบ selectedCategory state และใช้ URL params แทน
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category')?.toLowerCase() || 'ALL';
  
  // ส่ง category ไปให้ useFetchEvents
  const { events, loading, error } = useFetchEvents(currentCategory);

  const categories = ['ALL', 'WORKSHOP', 'CONCERT', 'CONFERENCE', 'SPORT'];

  // เปลี่ยนวิธีการจัดการ category
  const handleCategoryChange = (category) => {
    const params = category === 'ALL' 
    ? {} 
    : { category: category };
  
  // อัปเดต URL parameter
  setSearchParams(params);
};

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Events</h1>
      
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium 
               ${currentCategory.toUpperCase() === category.toUpperCase()
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-800'
              }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;