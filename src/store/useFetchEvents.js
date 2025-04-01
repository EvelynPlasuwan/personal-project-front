import { useState, useEffect } from "react";
import axios from "axios";

const useFetchEvents = (category) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8899/api/events/all');

        if (!response.data) {
          throw new Error('ไม่พบข้อมูลจากเซิร์ฟเวอร์');
        }


        // กรองอีเวนต์ตาม category
        let filteredEvents = response.data;
        if (category && category !== 'ALL') {
          filteredEvents = response.data.filter(event =>
            event.eventCategories.toUpperCase() === category.toUpperCase()
          );
        }

        console.log('Filtered Events:', filteredEvents);

        setEvents(filteredEvents);
        setLoading(false);
      } catch (err) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', err);
        setError(err.response?.data?.message || 'ไม่สามารถดึงข้อมูลอีเวนต์ได้');
        setLoading(false);
      }
    };

    fetchEvents();
  }, [category]);

  return { events, loading, error };

};

export default useFetchEvents;