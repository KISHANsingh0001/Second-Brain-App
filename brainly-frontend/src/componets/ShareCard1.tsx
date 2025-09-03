
// import "../App.css"
// import { Card, message, Tooltip } from "antd";
// import { LinkOutlined } from "@ant-design/icons";
// import { Tweet } from 'react-tweet'
// import YouTube from "react-youtube";
// import { LinkIcon } from "../icon/LinkIcon";
// import {motion} from 'framer-motion'
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
// export const ShareCard1 = (props: CardProps) => {

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
//     whileHover={{ scale: 1.05 }} // Scale up slightly on hover
//     transition={{ duration: 0.3 }} 
//     className="drop-shadow-lg bg-white rounded-xl hover:shadow-xl transition-all"
//   >
//       {/* <div className="bg-white rounded-md  border outline-gray-200 max-w-72 p-1 min-h-48 min-w-72 max-h-10 overflow-y-scroll no-scrollbar ">
//         <div className="flex justify-between ">
//           <div className="flex items-center text-md">
//             <div className="pr-2 text-gray-500">
//               <DocumentIcon />
//             </div>
//             {props.title}
//           </div>
//           <div className="flex items-center">
//             <div className="pr-2 text-gray-500">
//               <a href={props.link} target="_black">
//                 <RedirectIcon />
//               </a>
//             </div>
//             <div className="pr-2 text-gray-500">
//               <div onClick={props.onDelete}><DeleteIcon /></div>
//             </div>
//           </div>
//         </div>
//         <div className="p-3">

//           {props.type == "youtube" && <iframe className="w-full" src={props.link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

//           {props.type == "twitter" && <blockquote className="twitter-tweet" >
//             <a href={props.link.replace("x.com", "twitter.com")}></a>
//           </blockquote>
//           }
//           <div className="overflow-x-hidden overflow-y-hidden flex justify-center border">
//             {props.type == "Link" && <img src="https://cdn.textstudio.com/output/sample/normal/9/2/4/5/link-logo-73-5429.png" />}
//           </div>
//         </div>
//       </div> */}
//       {/* ---------------–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */}
//       <Card
//         className="dark-card dark:bg-darkBackground dark:border-white dark:text-white bg-white border-black-100"
//         style={{ width: 295 }}
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
//               <div className="tweet-container w-full h-[150.3px] overflow-y-auto dark:dark light dark:border-2">
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
//             color="blue">

//             <div>
//               <a href={props.link} target="_blank">
//                 <LinkOutlined key="link" className="dark:text-white" />
//               </a>
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
//                 height: "35px", // fixed height for the description
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
// };

// import "../App.css"
// import { Card, message, Tooltip } from "antd";
// import { LinkOutlined } from "@ant-design/icons";
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
// }

// export const ShareCard1 = (props: CardProps) => {
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

// const getYoutubeId = (url: string) => {
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


//   return (
//     <div className={`${screenSize === 'mobile' ? 'w-full px-2' : 'w-auto'} mb-4`}>
//       <motion.div
//         whileHover={{ scale: screenSize === 'mobile' ? 1.01 : 1.04 }}
//         whileTap={{ scale: 0.98 }}
//         transition={{ duration: 0.2 }}
//         className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
//       >
//         <Card
//           className="dark-card dark:bg-darkBackground dark:border-gray-500 dark:text-white border-gray-600"
//           style={{ 
//             width: screenSize === 'mobile' ? '100%' : 
//                   screenSize === 'tablet' ? '320px' : '295px'
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
//                       className="youtube dark:border-gray-500 w-full dark:border-2 dark:border-gray-600"
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
//             </div>
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
import { LinkOutlined } from "@ant-design/icons";
import { LinkIcon } from "../icon/LinkIcon";
import { Tweet } from 'react-tweet'
import YouTube from "react-youtube";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from 'react-intersection-observer'; // Add this import
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
}

export const ShareCard1 = (props: CardProps) => {
  const [screenSize, setScreenSize] = useState<string>('desktop');
  const [loadVideo, setLoadVideo] = useState(false);
  const [loadTweet, setLoadTweet] = useState(false);
  
  // Add this for lazy loading
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
    // Your existing getYoutubeId function
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
    const isPlaylist = (url: string) => {
    return url.includes("/playlist?list=") || (url.includes("list=") && !url.includes("v="));
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
        className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
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
                  {!loadVideo ? (
                    // YouTube thumbnail with play button
                    <div 
                      onClick={() => setLoadVideo(true)}
                      className="cursor-pointer relative dark:border-2 dark:border-gray-600 "
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
                    props.link.includes("list=") ? (
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
                        }}
                        className="youtube dark:border-gray-700 dark:border-2 dark:border-gray-600"
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
                     <FaXTwitter size={30}/>
                    
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
            <div className="px-4 py-2">
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
            </div>
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