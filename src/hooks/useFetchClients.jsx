import { useState, useEffect } from "react";

// Custom Hook to Fetch Clients
const useFetchClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/dashboard/guests/");

        if (!response.ok) {
          throw new Error("Failed to fetch Clients");
        }

        const data = await response.json();
        setClients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []); // Empty dependency array ensures it only runs on mount

  return { clients, loading, error };
};

export default useFetchClients;
