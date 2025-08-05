import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingIcon } from "../icon/LoadingIcon";
import { BACKEND_URL } from "../config";
import { ShareCard1 } from "../componets/ShareCard1";
import useGetUsername from "../hooks/useGetUsername";
import { LinkIconShare } from "../icon/LinkIconShare";
export function ShareLinkDashboard() {
  // const [username , setUsername] = useState<string | null>("");
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {username} = useGetUsername();

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        setLoading(true);
        const shareLink = localStorage.getItem("ShareLink");
        const response = await axios.get(`${BACKEND_URL}/api/v1/${shareLink}`);
        console.log(response);
        //@ts-ignore
        setContents(response.data.content || []);
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
      
      <div className="p-4 h-screen flex flex-col min-h-screen bg-gray-100 bottom-2 dark:bg-darkBackground dark:text-white">
        <div className="flex justify-between gap-3 mb-4 flex-wrap items-center">
          <div className="text-2xl font-bold flex mt-3 md:mt-0  justify-center items-center gap-3 border-b-2 border-gray-300 p-1 drop-shadow-lg">
          <div><LinkIconShare/></div>
          <div>{`Shared by ${username}`}</div>
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
                        .filter(({ type }) => type === "Link")
                        .map(({ _id , link, type, title, description }) => (
                            <ShareCard1 _id={_id} key={_id} type={type} link={link} title={title} description={description}/>
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