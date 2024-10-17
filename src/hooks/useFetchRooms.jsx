import { useState, useEffect } from "react";

// Custom Hook to Fetch Rooms
const useFetchRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/dashboard/rooms/");

        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }

        const data = await response.json();
        setRooms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []); // Empty dependency array ensures it only runs on mount

  return { rooms, loading, error };
};

export default useFetchRooms;
