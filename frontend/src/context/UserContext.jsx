import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // <-- Use navigate hook

  // Fetch user from Django server
  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/user/`);
      console.log(res);
      return res.data;
    } catch (err) {
      const status = err.response?.status;

      // Treat 401 (unauthenticated) and 403 (forbidden) as "not logged in"
      if (status === 401 || status === 403) {
        return null;
      }

      console.error("Fetch user error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user function
  const logoutUser = async () => {
    try {
      // Call your logout API to invalidate the session
      await axios.post(`${apiUrl}/logout/`);
    } catch (err) {
      console.error("Logout error:", err);
      throw err;
    }
  };

  // Query to get the current user data
  const {
    data: user,
    error,
    refetch, //  manually trigger a refetch
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5,
    onSuccess: (data) => {
      console.log("User data fetched successfully:", data);
    },
    refetchOnWindowFocus: false,
  });

  // Logout function with immediate refetch
  const logout = async () => {
    try {
      // Call logout API to invalidate the session
      await logoutUser();
      navigate("/");

      // Immediately refetch the user data after logging out
      refetch(); // trigger a fresh fetch of the user data

      console.log(
        "Logged out successfully, data will be refetched immediately.",
      );
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, error, logout, refetch }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
