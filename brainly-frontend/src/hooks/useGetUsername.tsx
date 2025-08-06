import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function useGetUsername() {
  const [username, setUsername] = useState<string | null>("");
  const [loading1, setLoading1] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

// Describe structure of the response
  interface UserResponse {
    users: string; 
  }

  const getUsername = async () => {
    try {
      setLoading1(true);
      setError(null); 

      const response = await axios.get<UserResponse>(`${BACKEND_URL}/api/v1/users`, {
        headers: { Authorization: localStorage.getItem("token") || "" },
      });

      // Extract the email from the response
      const email = response.data.users; // Ensure `users` exists in the response
      console.log("Fetched email:", email);

      // Extract username before '@'
      const extractedUsername = email.split("@")[0];
      setUsername(extractedUsername);
    } catch (err: any) {
      console.error("Error fetching username:", err);
      setError(err.response?.data?.msg || err.message);
    } finally {
      setLoading1(false);
    }
  };
  useEffect(() => {
    getUsername();
  }, []);

  const memoizedUsername = useMemo(() => username, [username]);
  return { username:memoizedUsername, loading1, error };
}