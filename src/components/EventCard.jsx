import React from 'react';
import { Link } from 'react-router';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  const getCategoryColor = (category) => {
    const colors = {
      'workshop': 'bg-blue-100 text-blue-800',
      'concert': 'bg-purple-100 text-purple-800',
      'conference': 'bg-green-100 text-green-800',
      'sport': 'bg-red-100 text-red-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.default;
  };

  return (
    <div className="card bg-base-100 h-96 shadow-xl hover:shadow-2xl transition-shadow">
    <figure className="relative h-48">
      <img 
        src={event.eventBanner || '/placeholder-image.jpg'} 
        alt={event.eventTitle}
        className="w-full h-full object-cover"
      />
      {/* เพิ่มการแสดง categories */}
      {event.eventType && (
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.eventType)}`}>
            {event.eventType}
          </span>
        </div>
      )}
    </figure>
     
    <div className="card-body py-0 ">
        <h2 className="card-title text-lg font-bold line-clamp-2">
          {event.eventTitle}
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          จัดโดย: {event.user?.username || 'ไม่ระบุ'}
        </p>
        <p className="text-sm line-clamp-2 mb-4 overflow-y-auto">{event.description}</p>
        
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <i className="fas fa-calendar-alt text-primary"></i>
            <span>{formatDate(event.eventDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-map-marker-alt text-primary"></i>
            <span>{event.location}</span>
          </div>
        </div>

        <div className="card-actions justify-end mt-4 ">
          <Link 
            to={`/events/${event.id}`}
            className="btn btn-primary btn-sm"
          >
            More Details
          </Link>
        </div>
      </div>
      
      {/* เพิ่มการแสดง categories ถ้ามี */}
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