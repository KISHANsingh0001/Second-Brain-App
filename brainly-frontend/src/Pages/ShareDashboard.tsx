import { useEffect, useState } from "react";
import axios from "axios";
import { Card1 } from "../componets/Card1";
import { ShareSidebar } from "../componets/ShareSidebar";
import { LoadingIcon } from "../icon/LoadingIcon";
import { BACKEND_URL } from "../config";

export let exportedShareLink: string | undefined; // variable to store the share hash

export function ShareDashboard() {
  const [username, setUsername] = useState<string | null>("");
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        setLoading(true);
        const shareLink = window.location.pathname.split("/").pop(); // Extracting the share hash from the URL
        exportedShareLink = shareLink; // Store the share hash in the exported variablee

        const response = await axios.get(`${BACKEND_URL}/api/v1/${shareLink}`);
        console.log(response);
        //@ts-ignore
        setContents(response.data.content || []);
        //@ts-ignore
        setUsername(response.data.email || "");
      } catch (err: any) {
        setError(err.response?.data?.msg || "Failed to load content.");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, []);

  return (
    <>
      <ShareSidebar />
      <div className="p-4 h-screen flex flex-col lg:ml-72 min-h-screen bg-gray-100 bottom-2">
        <div className="flex justify-between gap-3 mb-4 flex-wrap items-center">
          <div className="text-2xl font-bold flex justify-center items-center gap-3">
            {`Shared by ${username}`}
          </div>
        </div>

        {/* Scrollable container for cards */}
        <div className="flex-1 overflow-y-auto justify-center items-center">
          <div className="flex gap-6 flex-wrap items-center">
            {loading ? (
              <div className="flex justify-center items-center w-full">
                <LoadingIcon />
              </div>
            ) : error ? (
              <div className="text-center text-red-500 w-full font-semibold">
                {error}
              </div>
            ) : contents.length > 0 ? (
              contents.map(({ _id, link, type, title }: any) => (
                <Card1
                  _id={_id}
                  key={_id}
                  type={type}
                  link={link}
                  title={title}
                  onDelete={undefined} // Disable delete functionality
                />
              ))
            ) : (
              <div className="text-center text-gray-500 w-full font-semibold">
                No Content Available.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}