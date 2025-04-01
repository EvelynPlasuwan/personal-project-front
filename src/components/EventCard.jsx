import React from 'react';
import { useNavigate } from 'react-router'; // Fix import

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('Navigating to event:', event.id || event._id); 
    // Use navigate instead of directly changing window.location
    navigate(`/events/${event.id || event._id}`);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error("Date formatting error:", error);
      return dateString; // Return original string if formatting fails
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'workshop': 'bg-blue-100 text-blue-800',
      'concert': 'bg-purple-100 text-purple-800',
      'conference': 'bg-green-100 text-green-800',
      'sport': 'bg-red-100 text-red-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colors[category?.toLowerCase()] || colors.default;
  };

  // Handle different API response structures
  const title = event.eventTitle || event.title;
  const banner = event.eventBanner || event.image || '/placeholder-image.jpg';
  const date = event.eventDate || event.date;
  const description = event.description || event.eventDescription;
  const eventLocation = event.location || event.eventLocation;
  const organizer = event.user.username || event.organizer || 'ไม่ระบุ';
  const eventType = event.eventType || event.category;

  return (
    <div className="card bg-base-100 h-96 shadow-xl hover:shadow-2xl transition-shadow">
      <figure className="relative h-48">
        <img 
          src={banner} 
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* แสดง category */}
        {eventType && (
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(eventType)}`}>
              {eventType}
            </span>
          </div>
        )}
      </figure>
       
      <div className="card-body py-0">
        <h2 className="card-title text-lg font-bold line-clamp-2">
          {title}
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          จัดโดย: {organizer}
        </p>
        <p className="text-sm line-clamp-2 mb-4 overflow-y-auto">{description}</p>
        
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <i className="fas fa-calendar-alt text-primary"></i>
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-map-marker-alt text-primary"></i>
            <span>{eventLocation}</span>
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <button 
            onClick={handleClick}
            className="btn btn-primary btn-sm"
          >
            More Details
          </button>
        </div>
      </div>
      
      {/* แสดง categories ถ้ามี */}
      {event.eventCategory && (
        <div className="flex flex-wrap gap-2 mt-2">
          {event.eventCategory.split(',').map((category, index) => (
            <span 
              key={index}
              className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category.trim())}`}
            >
              {category.trim()}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventCard;