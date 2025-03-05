import React, { useState, useEffect } from 'react';
import useAuthStore from '../../store/auth-store';
import axios from 'axios';

const UserEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token } = useAuthStore();

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8899/api/events/user/${user.id}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
         }
        });
        setEvents(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching user events:', error);
        setError('ไม่สามารถโหลดข้อมูล Events ได้');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchUserEvents();
    }
  }, [user.id, token]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'badge-success';
      case 'REJECTED':
        return 'badge-error';
      default:
        return 'badge-warning';
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('คุณแน่ใจหรือไม่ที่จะลบ Event นี้?')) {
      return;
    }
  
    try {
      console.log('Attempting to delete event:', eventId); // เพิ่ม logging
  
      const response = await axios.delete(
        `http://localhost:8899/api/events/${eventId}`,
        {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      console.log('Delete response:', response.data); // เพิ่ม logging
  
      if (response.status === 200) {
        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
        alert('ลบ Event เรียบร้อยแล้ว');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      if (error.response) {
        // มี response จาก server
        alert(error.response.data.message || 'ไม่สามารถลบ Event ได้');
      } else if (error.request) {
        // ไม่ได้รับ response จาก server
        alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง');
      } else {
        // มีข้อผิดพลาดอื่นๆ
        alert('เกิดข้อผิดพลาดในการลบ Event');
      }
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Events</h1>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            
            <div key={event.id} className="card bg-base-100 shadow-xl h-96 ">
              <figure>
                <img 
                src={event.eventBanner} 
                alt={event.eventTitle} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"/>
              </figure>
              <div className="card-body overflow-y-auto">
                <h2 className="card-title">{event.eventTitle}</h2>
                <p>{event.description}</p>
                
              </div>
                {/* สถานะของ Event */}
                <div className="mt-4 mx-auto">
                <div className="flex items-center gap-2">
                  <span className={`badge ${
                    event.status === 'APPROVED' ? 'badge-success' : 
                    event.status === 'REJECTED' ? 'badge-error' : 
                    'badge-warning'
                  }`}>
                    {event.status}
                  </span>
                </div>
                
                {event.status === 'REJECTED' && (
                  <>
                    <div className="mt-2 p-3 bg-error/10 rounded-lg mx-auto">
                      <p className="text-sm text-error">
                        เหตุผลที่ถูกปฏิเสธ: {event.statusMessage || 'ไม่ระบุเหตุผล'}
                      </p>
  
                    </div>
                    <button 
                      onClick={() => handleDeleteEvent(event.id)}
                      className="btn btn-error btn-sm mt-4"
                    >
                      ลบ Event
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserEvents;