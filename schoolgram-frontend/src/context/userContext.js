import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user and status data
    const fetchStatusData = async () => {
      try {
          const statusResponse = await axios.get(`http://localhost:5002/${user._id}/status`, config);
          
          // Debugging: Log the status response
          console.log('Status Response:', statusResponse);

          setStatus(statusResponse.data.content);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatusData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ status, setStatus }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
