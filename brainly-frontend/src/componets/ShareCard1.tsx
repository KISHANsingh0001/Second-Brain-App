
import "../App.css"
import { Card, message, Tooltip } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import { Tweet } from 'react-tweet'
import YouTube from "react-youtube";
import { LinkIcon } from "../icon/LinkIcon";
import {motion} from 'framer-motion'
const { Meta } = Card;

declare global {
  interface Window {
    twttr: any;
  }
}
interface CardProps {
  _id: string
  title: string;
  link: string;
  type: "twitter" | "youtube" | "Link";
  description?: string;
  onDelete?: () => void;
}
export const ShareCard1 = (props: CardProps) => {

  const getTweetId = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  const getYoutubeId = (url: string) => {
    try {
      // Check if it's a video URL (v=)
      if (url.includes("v=")) {
        const videoId = url.split("v=")[1];
        const ampersandPos = videoId.indexOf("&");
        return ampersandPos !== -1 ? videoId.substring(0, ampersandPos) : videoId;
      }// Check if it's a playlist URL (list=)
      else if (url.includes("list=")) {
        const playlistId = url.split("list=")[1];
        const ampersandPos = playlistId.indexOf("&");
        return ampersandPos !== -1 ? playlistId.substring(0, ampersandPos) : playlistId;
      }
    } catch (error) {
      message.warning("Enter the Correct URL of Youtube Video(not Youtube Shorts or Anything");
      console.error("Error extracting YouTube video ID:", error);
      return ""; // Return an empty string or handle the error as needed
    }
  };




  return (
    <motion.div
    whileHover={{ scale: 1.05 }} // Scale up slightly on hover
    transition={{ duration: 0.3 }} 
    className="drop-shadow-lg bg-white rounded-xl hover:shadow-xl transition-all"
  >
      {/* <div className="bg-white rounded-md  border outline-gray-200 max-w-72 p-1 min-h-48 min-w-72 max-h-10 overflow-y-scroll no-scrollbar ">
        <div className="flex justify-between ">
          <div className="flex items-center text-md">
            <div className="pr-2 text-gray-500">
              <DocumentIcon />
            </div>
            {props.title}
          </div>
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <a href={props.link} target="_black">
                <RedirectIcon />
              </a>
            </div>
            <div className="pr-2 text-gray-500">
              <div onClick={props.onDelete}><DeleteIcon /></div>
            </div>
          </div>
        </div>
        <div className="p-3">

          {props.type == "youtube" && <iframe className="w-full" src={props.link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

          {props.type == "twitter" && <blockquote className="twitter-tweet" >
            <a href={props.link.replace("x.com", "twitter.com")}></a>
          </blockquote>
          }
          <div className="overflow-x-hidden overflow-y-hidden flex justify-center border">
            {props.type == "Link" && <img src="https://cdn.textstudio.com/output/sample/normal/9/2/4/5/link-logo-73-5429.png" />}
          </div>
        </div>
      </div> */}
      {/* ---------------–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */}
      <Card
        className="dark-card dark:bg-darkBackground dark:border-white dark:text-white bg-white border-black-100"
        style={{ width: 295 }}
        cover={
          <div className="dark:bg-darkBackground dark:text-white">
            {props.type === "youtube" && (
              <div className="dark:bg-darkBackground dark:text-white">
                {props.link.includes("list=") ? (
                  // Embed playlist
                  <YouTube
                    videoId={null} // Playlist URL HAI
                    opts={{
                      playerVars: {
                        listType: "playlist",
                        list: getYoutubeId(props.link), // Pass the playlist ID
                      },
                      width: "100%",
                      height: "150.3px",
                    }}
                    className="youtube dark:border-2 "
                  />
                ) : (
                  // Embed single video
                  <YouTube
                    videoId={getYoutubeId(props.link)} // Pass the video ID
                    opts={{
                      width: "100%",
                      height: "150.3px",
                    }}
                    className="youtube dark:border-2"
                  />
                )}
              </div>
            )}

            {props.type === "twitter" && (
              <div className="tweet-container w-full h-[150.3px] overflow-y-auto dark:dark light dark:border-2">
                <Tweet id={getTweetId(props.link)} />

              </div>
            )}

            {props.type === "Link" && (
              <div className="flex justify-center items-center h-[150.3px] dark:border-2">
                <LinkIcon />
              </div>
            )}
          </div>
        }
        actions={[
          <Tooltip
            title={`Open the Content in a New Tab`}
            trigger={"hover"}
            arrow
            color="blue">

            <div>
              <a href={props.link} target="_blank">
                <LinkOutlined key="link" className="dark:text-white" />
              </a>
            </div>
          </Tooltip>,

        ]}
      >
        <Meta
          title={
            <span className="dark:text-white text-gray-900">{props.title}</span>
          }
          description={
            <div
              className="dark:text-gray-300 text-gray-700"
              style={{
                height: "35px", // fixed height for the description
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {props.description || "Description is not Given"}
            </div>
          }
        />
      </Card>
    </motion.div>
  );
};
