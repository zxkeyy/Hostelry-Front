import { useState, useEffect } from "react";

// Custom Hook to Fetch Rooms
const useFetchRoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:8000/dashboard/roomtypes/"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch room types");
        }

        const data = await response.json();
        setRoomTypes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomTypes();
  }, []); // Empty dependency array ensures it only runs on mount

  return { roomTypes, loading, error };
};

export default useFetchRoomTypes;
