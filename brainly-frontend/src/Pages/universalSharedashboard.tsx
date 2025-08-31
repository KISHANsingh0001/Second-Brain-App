import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingIcon } from "../icon/LoadingIcon";
import { BACKEND_URL } from "../config";
import { ShareCard1 } from "../componets/ShareCard1";
interface dashboardProps {
  type: string;
  title: string;
  icon: JSX.Element;

}
interface Content {
  _id: string;
  link: string;
  type: string;
  title: string;
  description: string;
}

export function UniversalShareDashboard(props: dashboardProps) {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const pathname = window.location.pathname;
  const parts = pathname.split("/");
  const shareLink = parts[parts.length - 1];
  const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/api/v1/${shareLink}`);
        //@ts-ignore
        setContents(response.data.content || []);
        //@ts-ignore
        const email = response.data.email;
        const extractedUsername = email.split("@")[0];
        setUsername(extractedUsername || "");
      } catch (err: any) {
        setError(err.response?.data?.msg || "Failed to load content.");
      } finally {
        setLoading(false);
      }
    };
    fetchSharedContent();
  }, []);

let fillteredContents: any[] = [];
  if (props.type == "") {
    fillteredContents = contents;
  } else if (props.type == "youtube") {
    fillteredContents = contents.filter((content) => content.type === "youtube");
  } else if (props.type == "twitter") {
    fillteredContents = contents.filter((content) => content.type === "twitter");
  } else if (props.type == "Link") {
    fillteredContents = contents.filter((content) => content.type === "Link");
  }

  return <>
    {/* <SideBar /> */}
    <div className="p-4 h-screen flex flex-col min-h-screen bg-gray-100 dark:bg-darkBackground dark:text-white bottom-2 ">
      <div className="text-2xl font-bold flex mt-3 justify-center items-center gap-3 border-b-2 border-gray-300 p-1 drop-shadow-lg">
        {props.icon}
        <div>{`Shared by ${username}`}</div>
      </div>

      {/* Scrollable container for cards */}
      <div className="flex-1 overflow-y-auto justify-center items-center p-2">
        <div className="flex gap-6 flex-wrap items-center">
          {loading ? (
            arr.map((_, index)=>(
               <div key={index} className="w-72 h-72 p-4 bg-gray-300 border border-gray-200 rounded-lg shadow animate-pulse transition-opacity"></div>
            ))
          ) : fillteredContents?.length > 0 ? (
            fillteredContents.map(({ _id, link, type, title, description }) => (
              <ShareCard1
                _id={_id}
                key={_id}
                type={type}
                link={link}
                title={title}
                description={description}
                
              />
            ))
          ) : (
            <div className="text-center text-gray-500 w-full font-semibold">
              No Content Available. Add Some!
            </div>
          )}
        </div>
      </div>
    </div>
  </>
}