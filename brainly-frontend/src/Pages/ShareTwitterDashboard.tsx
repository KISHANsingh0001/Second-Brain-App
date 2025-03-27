import { useEffect, useState } from "react";
import axios from "axios";
import { Card1 } from "../componets/Card1";
import {ShareSidebar} from "../componets/ShareSidebar"
import { LoadingIcon } from "../icon/LoadingIcon";
import { BACKEND_URL } from "../config";
import { HomeIcon } from "../icon/HomeIcon";
import { exportedShareLink } from "./ShareDashboard";
export function ShareTwitterDashboard() {
  const [username , setUsername] = useState<string | null>("");
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        setLoading(true);
        const shareLink = window.location.pathname.split("/").pop(); // Extract the share link from the URL
        const response = await axios.get(`${BACKEND_URL}/api/v1/${exportedShareLink}`);
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
      <ShareSidebar
       />
      <div className="p-4 h-screen flex flex-col lg:ml-72 min-h-screen bg-gray-100 bottom-2">
        <div className="flex justify-between gap-3 mb-4 flex-wrap items-center">
          <div className="text-2xl font-bold flex justify-center items-center gap-3">
            {/* <HomeIcon /> */}
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
            ) : contents?.length > 0 ? (
                contents
                        .filter(({ type }) => type === "twitter")
                        .map(({ _id , link, type, title }) => (
                            <Card1 _id={_id} key={_id} type={type} link={link} title={title}/>
                        ))
              ): (
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