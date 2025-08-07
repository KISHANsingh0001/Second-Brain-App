
import "../App.css"
import { Card, message, Tooltip } from "antd";
import { LinkOutlined, DeleteOutlined } from "@ant-design/icons";
import { LinkIcon } from "../icon/LinkIcon";
import { Tweet } from 'react-tweet'
import YouTube from "react-youtube";
import { motion } from "framer-motion";
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
export const Card1 = (props: CardProps) => {

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
      whileHover={{ scale: 1.05 }} // Scale up  on hover


      transition={{ duration: 0.2 }} // Smooth transition
      className="drop-shadow-lg bg-white rounded-xl hover:shadow-xl transition-all"
    >
      <Card
        className="dark-card dark:bg-darkBackground dark:border-white dark:text-white bg-white border-black-100"
        style={{ width: 295, cursor: "pointer" }}
        cover={
          <div className="dark:bg-darkBackground dark:text-white">
            {props.type === "youtube" && (
              <div className="dark:bg-darkBackground dark:text-white">
                {props.link.includes("list=") ? (
                  // Embed playlist
                  <YouTube
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
              <div className="tweet-container w-full h-[154.4px] overflow-y-auto dark:dark light dark:border-2">
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
            color="blue"
          >
            <div className="">
              <a href={props.link} target="_blank" rel="noopener noreferrer">
                <LinkOutlined key="link" className="dark:text-white" />
              </a>
            </div>
          </Tooltip>,
          <Tooltip
            title={"Are You Sure You Want To Delete ? "}
            trigger={"hover"}
            color="Red"
            arrow
          >
            <div onClick={props.onDelete}>
              <DeleteOutlined
                key="delete"
                className="dark:text-white hover:text-blue-600"
              />
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
                height: "35px", // Set a fixed height for the description
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
}