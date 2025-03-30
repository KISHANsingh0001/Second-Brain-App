import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

// Define content types
interface ContentItem {
  _id: string;
  title: string;
  type: "Link" |"twitter" | "youtube";
  link: string;
}

export function useContent() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/content`,
        { headers: { Authorization: localStorage.getItem("token") || "" } }
      );
      //@ts-ignore
      setContents(response.data?.content || []);
    } catch (err: any) {
      // Use a generic type for errors
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // refresh at intervals
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refresh();
  //   }, 10 * 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return { contents, loading, error, refresh, setContents};
}
