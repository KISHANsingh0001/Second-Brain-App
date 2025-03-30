import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function useGetUsername() {
  const [username, setUsername] = useState<string | undefined>("");
  const [loading1, setLoading1] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUsername = async () => {
    try {
      setLoading1(true);
      setError(null); // Clear previous errors
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/content`,
        { headers: { Authorization: localStorage.getItem("token") || "" } }
      );

      // Extract the email from the first content's userId field
      //@ts-ignore
      const email = response.data?.content[0]?.userId?.email || "";
      const extractedUsername = email.split("@")[0]; // Extract username before '@'
      setUsername(extractedUsername);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading1(false);
    }
  };

  // Automatically fetch the username when the hook is used
  useEffect(() => {
    getUsername();
  }, []);

  return { username, loading1, error };
}