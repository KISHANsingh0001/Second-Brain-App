// import "../App.css"

// import { Card, message, Tooltip } from "antd";
// import { LinkOutlined, DeleteOutlined } from "@ant-design/icons";
// import { LinkIcon } from "../icon/LinkIcon";
// import { Tweet } from 'react-tweet'
// import YouTube from "react-youtube";
// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import { Loader } from "lucide-react";

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
//   isDeleting?: boolean;
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
//       // Handle youtu.be format (mobile share links)
//       if (url.includes("youtu.be/")) {
//         const videoId = url.split("youtu.be/")[1];
//         // Remove any query parameters (like ?si=...)
//         const questionPos = videoId.indexOf("?");
//         return questionPos !== -1 ? videoId.substring(0, questionPos) : videoId;
//       }
//       // Handle youtube.com/watch?v= format
//       else if (url.includes("v=")) {
//         const videoId = url.split("v=")[1];
//         const ampersandPos = videoId.indexOf("&");
//         return ampersandPos !== -1 ? videoId.substring(0, ampersandPos) : videoId;
//       }
//       // Handle playlist URLs
//       else if (url.includes("list=")) {
//         const playlistId = url.split("list=")[1];
//         const ampersandPos = playlistId.indexOf("&");
//         return ampersandPos !== -1 ? playlistId.substring(0, ampersandPos) : playlistId;
//       }
//       // Handle YouTube Shorts
//       else if (url.includes("/shorts/")) {
//         const shortId = url.split("/shorts/")[1];
//         const questionPos = shortId.indexOf("?");
//         return questionPos !== -1 ? shortId.substring(0, questionPos) : shortId;
//       }
//       // Handle youtube.com/embed/ format
//       else if (url.includes("/embed/")) {
//         const videoId = url.split("/embed/")[1];
//         const questionPos = videoId.indexOf("?");
//         return questionPos !== -1 ? videoId.substring(0, questionPos) : videoId;
//       }

//       return "";
//     } catch (error) {
//       console.error("Error extracting YouTube ID:", error);
//       return "";
//     }
//   };




//   const getPlaylistId = (url: string) => {
//     try {
//       if (url.includes("list=")) {
//         const playlistId = url.split("list=")[1];
//         const ampersandPos = playlistId.indexOf("&");
//         return ampersandPos !== -1 ? playlistId.substring(0, ampersandPos) : playlistId;
//       }
//       return "";
//     } catch (error) {
//       return "";
//     }
//   };
//   // Helper function to determine if URL is a playlist
//   const isPlaylist = (url: string) => {
//     return url.includes("/playlist?list=") || (url.includes("list=") && !url.includes("v="));
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
//               screenSize === 'tablet' ? '320px' : '295px'
//           }}
//           cover={
//             <div className="dark:bg-darkBackground">
//               {props.type === "youtube" && (
//                 <div>
//                   {isPlaylist(props.link) ? (
//                     <YouTube
//                       opts={{
//                         playerVars: {
//                           listType: "playlist",
//                           list: getPlaylistId(props.link),
//                         },
//                         width: "100%",
//                         height: screenSize === 'mobile' ? "185px" : "150px",
//                       }}
//                       className="youtube dark:border-gray-500 w-full dark:border-2 dark:border-gray-600"
//                     />
//                   ) : (
//                     <YouTube
//                       videoId={getYoutubeId(props.link)}
//                       opts={{
//                         width: "100%",
//                         height: screenSize === 'mobile' ? "185px" : "150px",
//                         playerVars: {
//                           autoplay: 0,
//                           controls: 1,
//                           ...(props.link.includes("list=") && { list: getPlaylistId(props.link) }),
//                         },
//                       }}
//                       className="youtube dark:border-gray-700 dark:border-2 dark:border-gray-600"
//                       //@ts-ignore
//                       onError={(error) => {
//                         console.error("YouTube player error:", error);
//                         message.error("Failed to load YouTube video. Please check the URL.");
//                       }}
//                     />
//                   )}
//                 </div>
//               )}

//               {props.type === "twitter" && (
//                 <div className={`tweet-container custom-scrollbar w-full overflow-y-auto dark:bg-gray-800 dark:dark light dark:border-2 dark:border-gray-600
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
//             <div className="px-4 py-2" key="link">
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
//             <div className="px-4 py-2" key="delete">
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
//                   {props.isDeleting ? <div className=" inset-0  flex items-center justify-center z-10">
//                     <Loader className="animate-spin" color="red" />
//                   </div> : <DeleteOutlined className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400" />}

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

import "../App.css"
import { Card, message, Tooltip } from "antd";
import { LinkOutlined, DeleteOutlined } from "@ant-design/icons";
import { LinkIcon } from "../icon/LinkIcon";
import { Tweet } from 'react-tweet'
import YouTube from "react-youtube";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { useInView } from 'react-intersection-observer';
import { FaXTwitter } from "react-icons/fa6";

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
  const [loadVideo, setLoadVideo] = useState(false);
  const [loadTweet, setLoadTweet] = useState(false);
  
  // Add lazy loading with intersection observer
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

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
  
  // Get YouTube thumbnail URL
const getYouTubeThumbnail = (url: string) => {
  // For playlists, use a custom playlist thumbnail
  if (isPlaylist(url)) {
    return "https://wallpapers.com/images/featured/youtube-logo-background-xuljaasdgk44enmb.jpg"; 
  }
  
  // For regular videos, continue using the video ID
  const videoId = getYoutubeId(url);
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
};
  
  // Helper function to determine if URL is a playlist
  const isPlaylist = (url: string) => {
    return url.includes("/playlist?list=") || (url.includes("list=") && !url.includes("v="));
  };

  // Only render the actual content if in view
  if (!inView) {
    return (
      <div 
        ref={ref}
        className={`${screenSize === 'mobile' ? 'w-full px-2' : 'w-auto'} mb-4`}
      >
        <div 
          className={`rounded-lg overflow-hidden shadow-md bg-gray-200 dark:bg-gray-700 animate-pulse`}
          style={{ 
            width: screenSize === 'mobile' ? '100%' : 
                  screenSize === 'tablet' ? '320px' : '295px',
            height: '300px'
          }}
        />
      </div>
    );
  }

  return (
    <div className={`${screenSize === 'mobile' ? 'w-full px-2' : 'w-auto'} mb-4`} ref={ref}>
      <motion.div
        whileHover={{ scale: screenSize === 'mobile' ? 1.01 : 1.04 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all relative"
      >
        {/* Deletion overlay */}
        {props.isDeleting && (
          <div className="absolute inset-0 bg-white bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-70 flex items-center justify-center z-10">
            <Loader className="animate-spin" size={30} color="red" />
          </div>
        )}
        
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
                  {!loadVideo ? (
                    // YouTube thumbnail with play button
                    <div 
                      onClick={() => setLoadVideo(true)}
                      className="cursor-pointer relative dark:border-2 dark:border-gray-600"
                      style={{ height: screenSize === 'mobile' ? "185px" : "150px" }}
                    >
                      <img 
                        src={getYouTubeThumbnail(props.link)}
                        alt="YouTube thumbnail"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Actual YouTube embed - only loaded after clicking
                    isPlaylist(props.link) ? (
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
                    )
                  )}
                </div>
              )}

              {props.type === "twitter" && (
                <div>
                  {!loadTweet ? (
                    // Twitter placeholder with load button
                    <div 
                      onClick={() => setLoadTweet(true)}
                      className={`cursor-pointer flex flex-col items-center justify-center bg-blue-50 dark:bg-gray-800 dark:border-2 dark:border-gray-600
                                ${screenSize === 'mobile' ? 'h-[200px]' : 'h-[150px]'}`}
                    >
                      <FaXTwitter size={30} className="mb-2" />
                      <span className="text-gray-600 dark:text-gray-300">Click to load tweet</span>
                    </div>
                  ) : (
                    // Actual Tweet component
                    <div className={`tweet-container custom-scrollbar w-full overflow-y-auto dark:bg-gray-800 dark:dark light dark:border-2 dark:border-gray-600
                                  ${screenSize === 'mobile' ? 'h-[200px]' : 'h-[150px]'}`}>
                      <Tweet id={getTweetId(props.link)} />
                    </div>
                  )}
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
                  disabled={props.isDeleting}
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