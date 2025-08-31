import "../App.css"
import { Card, message, Tooltip } from "antd";
import { LinkOutlined, DeleteOutlined } from "@ant-design/icons";
import { LinkIcon } from "../icon/LinkIcon";
import { Tweet } from 'react-tweet'
import YouTube from "react-youtube";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";

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
  isDeleting?: boolean;
}

export const Card1 = (props: CardProps) => {
  const [screenSize, setScreenSize] = useState<string>('desktop');

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth <= 640) {
        setScreenSize('mobile');
      } else if (window.innerWidth <= 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    // Initial check
    updateScreenSize();

    // Add event listener
    window.addEventListener('resize', updateScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const getTweetId = (url: string) => {
    try {
      const parts = url.split("/");
      return parts[parts.length - 1];
    } catch (error) {
      console.error("Error extracting Tweet ID:", error);
      return "";
    }
  };

  const getYoutubeId = (url: string) => {
    try {
      // Handle youtu.be format (mobile share links)
      if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1];
        // Remove any query parameters (like ?si=...)
        const questionPos = videoId.indexOf("?");
        return questionPos !== -1 ? videoId.substring(0, questionPos) : videoId;
      }
      // Handle youtube.com/watch?v= format
      else if (url.includes("v=")) {
        const videoId = url.split("v=")[1];
        const ampersandPos = videoId.indexOf("&");
        return ampersandPos !== -1 ? videoId.substring(0, ampersandPos) : videoId;
      }
      // Handle playlist URLs
      else if (url.includes("list=")) {
        const playlistId = url.split("list=")[1];
        const ampersandPos = playlistId.indexOf("&");
        return ampersandPos !== -1 ? playlistId.substring(0, ampersandPos) : playlistId;
      }
      // Handle YouTube Shorts
      else if (url.includes("/shorts/")) {
        const shortId = url.split("/shorts/")[1];
        const questionPos = shortId.indexOf("?");
        return questionPos !== -1 ? shortId.substring(0, questionPos) : shortId;
      }
      // Handle youtube.com/embed/ format
      else if (url.includes("/embed/")) {
        const videoId = url.split("/embed/")[1];
        const questionPos = videoId.indexOf("?");
        return questionPos !== -1 ? videoId.substring(0, questionPos) : videoId;
      }

      return "";
    } catch (error) {
      console.error("Error extracting YouTube ID:", error);
      return "";
    }
  };




  const getPlaylistId = (url: string) => {
    try {
      if (url.includes("list=")) {
        const playlistId = url.split("list=")[1];
        const ampersandPos = playlistId.indexOf("&");
        return ampersandPos !== -1 ? playlistId.substring(0, ampersandPos) : playlistId;
      }
      return "";
    } catch (error) {
      return "";
    }
  };
  // Helper function to determine if URL is a playlist
  const isPlaylist = (url: string) => {
    return url.includes("/playlist?list=") || (url.includes("list=") && !url.includes("v="));
  };

  return (
    <div className={`${screenSize === 'mobile' ? 'w-full px-2' : 'w-auto'} mb-4`}>
      <motion.div
        whileHover={{ scale: screenSize === 'mobile' ? 1.01 : 1.04 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all "
      >
        <Card
          className="dark-card dark:bg-darkBackground dark:border-gray-500 dark:text-white border-gray-600"
          style={{
            width: screenSize === 'mobile' ? '100%' :
              screenSize === 'tablet' ? '320px' : '295px'
          }}
          cover={
            <div className="dark:bg-darkBackground">
              {props.type === "youtube" && (
                <div>
                  {isPlaylist(props.link) ? (
                    <YouTube
                      opts={{
                        playerVars: {
                          listType: "playlist",
                          list: getPlaylistId(props.link),
                        },
                        width: "100%",
                        height: screenSize === 'mobile' ? "185px" : "150px",
                      }}
                      className="youtube dark:border-gray-500 w-full dark:border-2 dark:border-gray-600"
                    />
                  ) : (
                    <YouTube
                      videoId={getYoutubeId(props.link)}
                      opts={{
                        width: "100%",
                        height: screenSize === 'mobile' ? "185px" : "150px",
                        playerVars: {
                          autoplay: 0,
                          controls: 1,
                          ...(props.link.includes("list=") && { list: getPlaylistId(props.link) }),
                        },
                      }}
                      className="youtube dark:border-gray-700 dark:border-2 dark:border-gray-600"
                      //@ts-ignore
                      onError={(error) => {
                        console.error("YouTube player error:", error);
                        message.error("Failed to load YouTube video. Please check the URL.");
                      }}
                    />
                  )}
                </div>
              )}

              {props.type === "twitter" && (
                <div className={`tweet-container custom-scrollbar w-full overflow-y-auto dark:bg-gray-800 dark:dark light dark:border-2 dark:border-gray-600
                               ${screenSize === 'mobile' ? 'h-[200px]' : 'h-[150px]'}`}>
                  <Tweet id={getTweetId(props.link)} />
                </div>
              )}

              {props.type === "Link" && (
                <div className={`flex justify-center items-center bg-gray-50 dark:bg-gray-800 dark:border-2 dark:border-gray-600
                               ${screenSize === 'mobile' ? 'h-[185px]' : 'h-[150px]'}`}>
                  <LinkIcon />
                </div>
              )}
            </div>
          }
          actions={[
            <div className="px-4 py-2" key="link">
              <Tooltip
                title="Open in new tab"
                color="blue"
                placement="bottom"
              >
                <a
                  href={props.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open link in new tab"
                  className="block"
                >
                  <LinkOutlined className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" />
                </a>
              </Tooltip>
            </div>,
            <div className="px-4 py-2" key="delete">
              <Tooltip
                title="Delete this content"
                color="red"
                placement="bottom"
              >
                <button
                  onClick={props.onDelete}
                  aria-label="Delete content"
                  className="block w-full"
                >
                  {props.isDeleting ? <div className=" inset-0  flex items-center justify-center z-10">
                    <Loader className="animate-spin" color="red" />
                  </div> : <DeleteOutlined className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400" />}

                </button>
              </Tooltip>
            </div>,
          ]}
        >
          <Meta
            title={
              <h3 className={`font-medium truncate dark:text-white
                              ${screenSize === 'mobile' ? 'text-base' : 'text-sm'}`}>
                {props.title}
              </h3>
            }
            description={
              <p
                className={`text-gray-600 dark:text-gray-300
                           ${screenSize === 'mobile' ? 'text-sm' : 'text-xs'}`}
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: screenSize === 'mobile' ? 3 : 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  height: screenSize === 'mobile' ? "54px" : "38px",
                }}
              >
                {props.description || "No description provided"}
              </p>
            }
          />
        </Card>
      </motion.div>
    </div>
  );
};