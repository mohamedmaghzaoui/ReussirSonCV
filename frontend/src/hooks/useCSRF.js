// src/hooks/useCSRF.js
import { useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
// get csrf token from django backend
export const useCSRF = () => {
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        const res = await axios.get(`${apiUrl}/csrf/`, {
          withCredentials: true,
        });
  
        axios.defaults.headers.common["X-CSRFToken"] = res.data.csrfToken;
      } catch (error) {
        console.error("Erreur lors de la récupération du CSRF token", error);
      }
    };

    fetchCSRFToken();
  }, []);
};




