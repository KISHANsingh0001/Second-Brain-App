
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
// export const Card1 = (props: CardProps) => {


//   useEffect(() => {
//     if (props.type === "twitter" && window.twttr) {
//       window.twttr.widgets.load();
//     }
//   }, [props.type]);

//   const getEmbedUrl = (url: string) => {
//     const videoId = url.split("v=")[1];
//     const PositionAmpersand = videoId.indexOf("&");
//     return PositionAmpersand !== -1 ? videoId.substring(0, PositionAmpersand) : videoId;
//   };

//   const getTweetId = (url: string) => {
//     const parts = url.split("/");
//     console.log(parts);

//     return parts[parts.length - 1]; // Extract the tweet ID from the URL
//   };

//   return (
//     // <div className="drop-shadow-lg">
//     //   {/* <div className="bg-white rounded-md  border outline-gray-200 max-w-72 p-1 min-h-48 min-w-72 max-h-10 overflow-y-scroll no-scrollbar ">
//     //     <div className="flex justify-between ">
//     //       <div className="flex items-center text-md">
//     //         <div className="pr-2 text-gray-500">
//     //           <DocumentIcon />
//     //         </div>
//     //         {props.title}
//     //       </div>
//     //       <div className="flex items-center">
//     //         <div className="pr-2 text-gray-500">
//     //           <a href={props.link} target="_black">
//     //             <RedirectIcon />
//     //           </a>
//     //         </div>
//     //         <div className="pr-2 text-gray-500">
//     //           <div onClick={props.onDelete}><DeleteIcon /></div>
//     //         </div>
//     //       </div>
//     //     </div>
//     //     <div className="p-3">

//     //       {props.type == "youtube" && <iframe className="w-full" src={props.link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

//     //       {props.type == "twitter" && <blockquote className="twitter-tweet" >
//     //         <a href={props.link.replace("x.com", "twitter.com")}></a>
//     //       </blockquote>
//     //       }
//     //       <div className="overflow-x-hidden overflow-y-hidden flex justify-center border">
//     //         {props.type == "Link" && <img src="https://cdn.textstudio.com/output/sample/normal/9/2/4/5/link-logo-73-5429.png" />}
//     //       </div>
//     //     </div>
//     //   </div> */}
//     //   {/* ---------------–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */}
//     //   <Card
//     //     className="dark:bg-darkBackground dark:border-gray-700 dark:text-white bg-white border-gray-300 text-gray-900"
//     //     style={{ width: 295, cursor: "pointer" }}
//     //     cover={
//     //       <div className="dark:bg-darkBackground dark:text-white ">
//     //         {props.type === "youtube" && (
//     //           <div className=" dark:bg-darkBackground dark:text-white">
//     //             <iframe
//     //               className="w-full dark:bg-darkBackground dark:text-white"
//     //               src={`https://www.youtube.com/embed/${getEmbedUrl(props.link)}`}
//     //               title="YouTube video player"
//     //               frameBorder="0"
//     //               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//     //               referrerPolicy="strict-origin-when-cross-origin"
//     //               allowFullScreen
//     //             ></iframe></div>
//     //         )}

//     //         {props.type === "twitter" && (
//     //           <div style={{ width: "100%", overflow: "hidden", overflowY: "auto", height: 155 }}>
//     //             <blockquote className="twitter-tweet" data-theme="white" data-align="center">
//     //               <a href={props.link.replace("x.com", "twitter.com")}></a>
//     //             </blockquote>

//     //           </div>
//     //         )}

//     //         {props.type === "Link" && (
//     //           <img src="https://static.vecteezy.com/system/resources/previews/006/693/402/non_2x/link-icon-template-black-color-editable-free-vector.jpg" className="object-cover w-[100%] h-[150.3px]" />
//     //         )}
//     //       </div>
//     //     }
//     //     actions={[
//     //       <Tooltip
//     //         title={`Open the Content in a New Tab`}
//     //         trigger={"hover"}
//     //         arrow
//     //         color="blue">

//     //         <div>
//     //           <a href={props.link} target="_blank">
//     //             <LinkOutlined key="link" />
//     //           </a>
//     //         </div>
//     //       </Tooltip>,
//     //       <Tooltip
//     //         title={'Are You Sure You Want To Delete ? '}
//     //         trigger={"hover"}
//     //         color="Red"
//     //         arrow
//     //       >
//     //         <div onClick={props.onDelete}>
//     //           <DeleteOutlined key="delete" />
//     //         </div>
//     //       </Tooltip>
//     //     ]}
//     //   >
//     //     <Meta
//     //       title={props.title}
//     //       description={
//     //         <div
//     //         style={{
//     //           height: "35px", // Set a fixed height for the description
//     //           overflow: "hidden",
//     //           textOverflow: "ellipsis",
//     //           whiteSpace: "nowrap",
//     //         }}
//     //       >
//     //         {props.description || "Description is not Given"}
//     //       </div>
//     //       }
//     //     />
//     //   </Card>
//     // </div>
//     <div className="drop-shadow-lg bg-white rounded-xl hover:shadow-xl transition-all">
//       <Card
//         className="dark-card dark:bg-darkBackground dark:border-gray-700 dark:text-white bg-white border-black-100 dark:border-gray-300"
//         style={{ width: 295, cursor: "pointer" }}
//         cover={
//           <div className="dark:bg-darkBackground dark:text-white">
//             {props.type === "youtube" && (
//               <div className="dark:bg-darkBackground dark:text-white">
//                 <iframe
//                   className="w-full dark:bg-darkBackground dark:text-white"
//                   src={`https://www.youtube.com/embed/${getEmbedUrl(props.link)}`}
//                   title="YouTube video player"
//                   frameBorder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                   referrerPolicy="strict-origin-when-cross-origin"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//             )}

//             {props.type === "twitter" && (
//               <div
//                 style={{
//                   width: "100%",
//                   overflow: "hidden",
//                   overflowY: "auto",
//                   height: 155,
//                 }}
//               >
//                 <blockquote
//                   className="twitter-tweet tweet "
//                   data-theme={document.documentElement.classList.contains("dark") ? "dark" : "light"}
//                   data-align="center"
//                 >
//                   <a href={props.link.replace("x.com", "twitter.com")}></a>
//                 </blockquote>
//                  {/* <Tweet id={getTweetId(props.link)} /> */}
//               </div>
//             )}

//             {props.type === "Link" && (
//               // <img
//               //   src="https://static.vecteezy.com/system/resources/previews/006/693/402/non_2x/link-icon-template-black-color-editable-free-vector.jpg"
//               //   className="object-cover w-[100%] h-[150.3px]"
//               // />
//               <div className="flex justify-center items-center h-[150.3px]">
//                <LinkIcon/>
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
//               <DeleteOutlined key="delete" className="dark:text-white hover:text-blue-600"/>
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
//     </div>
//   );
// };

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
    // <div className="drop-shadow-lg bg-white rounded-xl hover:shadow-xl transition-all">
    //   <Card
    //     className="dark-card dark:bg-darkBackground dark:border-white dark:text-white bg-white border-black-100"
    //     style={{ width: 295, cursor: "pointer" }}
    //     cover={
    //       <div className="dark:bg-darkBackground dark:text-white">
    //         {props.type === "youtube" && (
    //           <div className="dark:bg-darkBackground dark:text-white">
    //             <YouTube
    //               videoId={getYoutubeId(props.link)} 
    //               opts={{
    //                 width: "100%", 
    //                 height: "20%",
    //               }}
    //               className="youtube dark:border-2" 
    //             />
    //           </div>
    //         )}

    //         {props.type === "twitter" && (
    //           <div className="tweet-container w-full h-[150.3px] overflow-y-auto dark:dark light dark:border-2">
    //             <Tweet id={getTweetId(props.link)} />
    //           </div>
    //         )}

    //         {props.type === "Link" && (
    //           <div className="flex justify-center items-center h-[150.3px] dark:border-2">
    //             <LinkIcon />
    //           </div>
    //         )}
    //       </div>
    //     }
    //     actions={[
    //       <Tooltip
    //         title={`Open the Content in a New Tab`}
    //         trigger={"hover"}
    //         arrow
    //         color="blue"
    //       >
    //         <div className="">
    //           <a href={props.link} target="_blank" rel="noopener noreferrer">
    //             <LinkOutlined key="link" className="dark:text-white" />
    //           </a>
    //         </div>
    //       </Tooltip>,
    //       <Tooltip
    //         title={"Are You Sure You Want To Delete ? "}
    //         trigger={"hover"}
    //         color="Red"
    //         arrow
    //       >
    //         <div onClick={props.onDelete}>
    //           <DeleteOutlined
    //             key="delete"
    //             className="dark:text-white hover:text-blue-600"
    //           />
    //         </div>
    //       </Tooltip>,
    //     ]}
    //   >
    //     <Meta
    //       title={
    //         <span className="dark:text-white text-gray-900">{props.title}</span>
    //       }
    //       description={
    //         <div
    //           className="dark:text-gray-300 text-gray-700"
    //           style={{
    //             height: "35px", // Set a fixed height for the description
    //             overflow: "hidden",
    //             textOverflow: "ellipsis",
    //             whiteSpace: "nowrap",
    //           }}
    //         >
    //           {props.description || "Description is not Given"}
    //         </div>
    //       }
    //     />
    //   </Card>

    // </div>
    <motion.div
      whileHover={{ scale: 1.05 }} // Scale up  on hover


      transition={{ duration: 0.3 }} // Smooth transition
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