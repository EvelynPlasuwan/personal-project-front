import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../../store/auth-store';

const AdminEventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuthStore();

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8899/api/events/all', {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
      });

    // จัดรูปแบบข้อมูลและกำหนดค่าเริ่มต้น
    const formattedEvents = response.data.map(event => ({
        ...event,
        status: event.status || 'PENDING'
      }));
          
      setEvents(formattedEvents);
      setError(null);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('ไม่สามารถโหลดข้อมูล Events ได้');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (eventId, status, message = '') => {
    try {
      await axios.patch(
        `http://localhost:8899/api/events/${eventId}/status`,
        { status, statusMessage: message },
        { headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
         }
         }
      );
     await fetchEvents(); // รีโหลดข้อมูลหลังอัพเดท
    } catch (error) {
      console.error('Error updating event status:', error);
      alert('ไม่สามารถอัพเดทสถานะได้');
    }
  };

  useEffect(() => {
    if(token){
        fetchEvents();
    }
  }, [token]);

  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">Event Approval Management</h1>
    
    {error && (
      <div className="alert alert-error mb-4">
        <div className="flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <label>{error}</label>
        </div>
      </div>
    )}

    {loading ? (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Event Title</th>
              <th>Organizer</th>
              <th>Date</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  ไม่พบข้อมูล Events
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id}>
                  <td>{event.id || event.eventTitle}</td>
                  <td>{event.title || event.eventTitle}</td>
                  <td>{event.user?.username || 'ไม่ระบุ'}</td>
                  <td>{new Date(event.date || event.eventDate).toLocaleDateString('th-TH')}</td>
                  <td className="max-w-[200px] truncate">{event.description}</td>
                  <td>
                    <span className={`badge ${
                      event.status === 'APPROVED' ? 'badge-success' : 
                      event.status === 'REJECTED' ? 'badge-error' : 
                      'badge-warning'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    {event.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(event.id, 'APPROVED')}
                          className="btn btn-sm btn-success"
                        >
                          อนุมัติ
                        </button>
                        <button
                          onClick={() => {
                            const message = prompt('ระบุเหตุผลที่ปฏิเสธ:');
                            if (message) handleUpdateStatus(event.id, 'REJECTED', message);
                          }}
                          className="btn btn-sm btn-error"
                        >
                          ปฏิเสธ
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    )}
  </div>
  );
};

export default AdminEventManagement;