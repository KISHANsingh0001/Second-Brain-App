
// import "../App.css"
// import { Card, message, Tooltip } from "antd";
// import { LinkOutlined, DeleteOutlined } from "@ant-design/icons";
// import { LinkIcon } from "../icon/LinkIcon";
// import { Tweet } from 'react-tweet'
// import YouTube from "react-youtube";
// import { motion } from "framer-motion";
// const { Meta } = Card;

// declare global {
//   interface Window {
//     twttr: any;
//   }
// }
// interface CardProps {
//   _id: string
//   title: string;
//   link: string;
//   type: "twitter" | "youtube" | "Link";
//   description?: string;
//   onDelete?: () => void;
// }
// export const Card1 = (props: CardProps) => {

//   const getTweetId = (url: string) => {
//     const parts = url.split("/");
//     return parts[parts.length - 1];
//   };

//   const getYoutubeId = (url: string) => {
//     try {
//       // Check if it's a video URL (v=)
//       if (url.includes("v=")) {
//         const videoId = url.split("v=")[1];
//         const ampersandPos = videoId.indexOf("&");
//         return ampersandPos !== -1 ? videoId.substring(0, ampersandPos) : videoId;
//       }// Check if it's a playlist URL (list=)
//       else if (url.includes("list=")) {
//         const playlistId = url.split("list=")[1];
//         const ampersandPos = playlistId.indexOf("&");
//         return ampersandPos !== -1 ? playlistId.substring(0, ampersandPos) : playlistId;
//       }
//     } catch (error) {
//       message.warning("Enter the Correct URL of Youtube Video(not Youtube Shorts or Anything");
//       console.error("Error extracting YouTube video ID:", error);
//       return ""; // Return an empty string or handle the error as needed
//     }
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.05 }} // Scale up  on hover


//       transition={{ duration: 0.2 }} // Smooth transition
//       className="drop-shadow-lg bg-white rounded-xl hover:shadow-xl transition-all"
//     >
//       <Card
//         className="dark-card dark:bg-darkBackground dark:border-white dark:text-white bg-white border-black-100"
//         style={{ width: 295, cursor: "pointer" }}
//         cover={
//           <div className="dark:bg-darkBackground dark:text-white">
//             {props.type === "youtube" && (
//               <div className="dark:bg-darkBackground dark:text-white">
//                 {props.link.includes("list=") ? (
//                   // Embed playlist
//                   <YouTube
//                     opts={{
//                       playerVars: {
//                         listType: "playlist",
//                         list: getYoutubeId(props.link), // Pass the playlist ID
//                       },
//                       width: "100%",
//                       height: "150.3px",
//                     }}
//                     className="youtube dark:border-2 "
//                   />
//                 ) : (
//                   // Embed single video
//                   <YouTube
//                     videoId={getYoutubeId(props.link)} // Pass the video ID
//                     opts={{
//                       width: "100%",
//                       height: "150.3px",
//                     }}
//                     className="youtube dark:border-2"
//                   />
//                 )}
//               </div>
//             )}

//             {props.type === "twitter" && (
//               <div className="tweet-container w-full h-[154.4px] overflow-y-auto dark:dark light dark:border-2">
//                 <Tweet id={getTweetId(props.link)} />
//               </div>
//             )}

//             {props.type === "Link" && (
//               <div className="flex justify-center items-center h-[150.3px] dark:border-2">
//                 <LinkIcon />
//               </div>
//             )}
//           </div>
//         }
//         actions={[
//           <Tooltip
//             title={`Open the Content in a New Tab`}
//             trigger={"hover"}
//             arrow
//             color="blue"
//           >
//             <div className="">
//               <a href={props.link} target="_blank" rel="noopener noreferrer">
//                 <LinkOutlined key="link" className="dark:text-white" />
//               </a>
//             </div>
//           </Tooltip>,
//           <Tooltip
//             title={"Are You Sure You Want To Delete ? "}
//             trigger={"hover"}
//             color="Red"
//             arrow
//           >
//             <div onClick={props.onDelete}>
//               <DeleteOutlined
//                 key="delete"
//                 className="dark:text-white hover:text-blue-600"
//               />
//             </div>
//           </Tooltip>,
//         ]}
//       >
//         <Meta
//           title={
//             <span className="dark:text-white text-gray-900">{props.title}</span>
//           }
//           description={
//             <div
//               className="dark:text-gray-300 text-gray-700"
//               style={{
//                 height: "35px", // Set a fixed height for the description
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               {props.description || "Description is not Given"}
//             </div>
//           }
//         />
//       </Card>
//     </motion.div>
//   );
// }

// import "../App.css"
// import { Card, message, Tooltip } from "antd";
// import { LinkOutlined, DeleteOutlined } from "@ant-design/icons";
// import { LinkIcon } from "../icon/LinkIcon";
// import { Tweet } from 'react-tweet'
// import YouTube from "react-youtube";
// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";

// const { Meta } = Card;

// declare global {
//   interface Window {
//     twttr: any;
//   }
// }

// interface CardProps {
//   _id: string
//   title: string;
//   link: string;
//   type: "twitter" | "youtube" | "Link";
//   description?: string;
//   onDelete?: () => void;
// }

// export const Card1 = (props: CardProps) => {
//   const [screenSize, setScreenSize] = useState<string>('desktop');

//   useEffect(() => {
//     const updateScreenSize = () => {
//       if (window.innerWidth <= 640) {
//         setScreenSize('mobile');
//       } else if (window.innerWidth <= 1024) {
//         setScreenSize('tablet');
//       } else {
//         setScreenSize('desktop');
//       }
//     };
    
//     // Initial check
//     updateScreenSize();
    
//     // Add event listener
//     window.addEventListener('resize', updateScreenSize);
    
//     // Cleanup
//     return () => window.removeEventListener('resize', updateScreenSize);
//   }, []);

//   const getTweetId = (url: string) => {
//     try {
//       const parts = url.split("/");
//       return parts[parts.length - 1];
//     } catch (error) {
//       console.error("Error extracting Tweet ID:", error);
//       return "";
//     }
//   };

//   const getYoutubeId = (url: string) => {
//     try {
//       if (url.includes("v=")) {
//         const videoId = url.split("v=")[1];
//         const ampersandPos = videoId.indexOf("&");
//         return ampersandPos !== -1 ? videoId.substring(0, ampersandPos) : videoId;
//       } else if (url.includes("list=")) {
//         const playlistId = url.split("list=")[1];
//         const ampersandPos = playlistId.indexOf("&");
//         return ampersandPos !== -1 ? playlistId.substring(0, ampersandPos) : playlistId;
//       } else if (url.includes("/shorts/")) {
//         const shortId = url.split("/shorts/")[1];
//         const questionPos = shortId.indexOf("?");
//         return questionPos !== -1 ? shortId.substring(0, questionPos) : shortId;
//       }
//       return "";
//     } catch (error) {
//       console.error("Error extracting YouTube ID:", error);
//       return "";
//     }
//   };

//   return (
//     <div className={`${screenSize === 'mobile' ? 'w-full px-2' : 'w-auto'} mb-4`}>
//       <motion.div
//         whileHover={{ scale: screenSize === 'mobile' ? 1.01 : 1.04 }}
//         whileTap={{ scale: 0.98 }}
//         transition={{ duration: 0.2 }}
//         className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all "
//       >
//         <Card
//           className="dark-card dark:bg-darkBackground dark:border-gray-500 dark:text-white border-gray-600"
//           style={{ 
//             width: screenSize === 'mobile' ? '100%' : 
//                    screenSize === 'tablet' ? '320px' : '295px'
//           }}
//           cover={
//             <div className="dark:bg-darkBackground">
//               {props.type === "youtube" && (
//                 <div>
//                   {props.link.includes("list=") ? (
//                     <YouTube
//                       opts={{
//                         playerVars: {
//                           listType: "playlist",
//                           list: getYoutubeId(props.link),
//                         },
//                         width: "100%",
//                         height: screenSize === 'mobile' ? "185px" : "150px",
//                       }}
//                       className="youtube dark:border-gray-500 w-full border-2 p-10"
//                     />
//                   ) : (
//                     <YouTube
//                       videoId={getYoutubeId(props.link)}
//                       opts={{
//                         width: "100%",
//                         height: screenSize === 'mobile' ? "185px" : "150px",
//                       }}
//                       className="youtube dark:border-gray-700 dark:border-2 dark:border-gray-600"
//                     />
//                   )}
//                 </div>
//               )}

//               {props.type === "twitter" && (
//                 <div className={`tweet-container  custom-scrollbar w-full overflow-y-auto dark:bg-gray-800  dark:dark light dark:border-2 dark:border-gray-600
//                                ${screenSize === 'mobile' ? 'h-[200px]' : 'h-[150px]'}`}>
//                   <Tweet id={getTweetId(props.link)} />
//                 </div>
//               )}

//               {props.type === "Link" && (
//                 <div className={`flex justify-center items-center bg-gray-50 dark:bg-gray-800 dark:border-2 dark:border-gray-600
//                                ${screenSize === 'mobile' ? 'h-[185px]' : 'h-[150px]'}`}>
//                   <LinkIcon />
//                 </div>
//               )}
//             </div>
//           }
//           actions={[
//             <div className="px-4 py-2">
//               <Tooltip
//                 title="Open in new tab"
//                 color="blue"
//                 placement="bottom"
//               >
//                 <a 
//                   href={props.link} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   aria-label="Open link in new tab"
//                   className="block"
//                 >
//                   <LinkOutlined className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" />
//                 </a>
//               </Tooltip>
//             </div>,
//             <div className="px-4 py-2">
//               <Tooltip
//                 title="Delete this content"
//                 color="red"
//                 placement="bottom"
//               >
//                 <button
//                   onClick={props.onDelete}
//                   aria-label="Delete content"
//                   className="block w-full"
//                 >
//                   <DeleteOutlined className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400" />
//                 </button>
//               </Tooltip>
//             </div>,
//           ]}
//         >
//           <Meta
//             title={
//               <h3 className={`font-medium truncate dark:text-white
//                               ${screenSize === 'mobile' ? 'text-base' : 'text-sm'}`}>
//                 {props.title}
//               </h3>
//             }
//             description={
//               <p 
//                 className={`text-gray-600 dark:text-gray-300
//                            ${screenSize === 'mobile' ? 'text-sm' : 'text-xs'}`}
//                 style={{
//                   display: "-webkit-box",
//                   WebkitLineClamp: screenSize === 'mobile' ? 3 : 2,
//                   WebkitBoxOrient: "vertical",
//                   overflow: "hidden",
//                   height: screenSize === 'mobile' ? "54px" : "38px",
//                 }}
//               >
//                 {props.description || "No description provided"}
//               </p>
//             }
//           />
//         </Card>
//       </motion.div>
//     </div>
//   );
// };

// brainly-frontend/src/componets/Card1.tsx
import "../App.css"
import { Card, message, Tooltip } from "antd";
import { LinkOutlined, DeleteOutlined } from "@ant-design/icons";
import { LinkIcon } from "../icon/LinkIcon";
import { Tweet } from 'react-tweet'
import YouTube from "react-youtube";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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

  // Helper function to determine if URL is a playlist
  const isPlaylist = (url: string) => {
    return url.includes("list=");
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
                          list: getYoutubeId(props.link),
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
                          // Optional: Add player variables for better control
                          autoplay: 0,
                          controls: 1,
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
                  <DeleteOutlined className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400" />
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