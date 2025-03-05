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
        const response = await axios.get('http://localhost:8899/api/events');

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
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [category]);

  return { events, loading, error };

};

export default useFetchEvents;