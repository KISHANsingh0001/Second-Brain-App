import { useEffect, useState } from "react";
import axios from "axios";
import { Card1 } from "../componets/Card1";
import { CreateContentModal } from "../componets/CreateContentModal";
import { useContent } from "../hooks/useContent";
import { LoadingIcon } from "../icon/LoadingIcon";
import { BACKEND_URL } from "../config";
import { Button , Popover, Tooltip , message } from "antd";
import {
  ApiTwoTone,
  FolderAddOutlined,
  ShareAltOutlined,
} from "@ant-design/icons"


interface dashboardProps{
    type: string;
    title: string;
    icon : JSX.Element;
    
}
export default function UniversalDashboard(props: dashboardProps) {
    const [shareLink, setShareLink] = useState<string | null>(
      localStorage.getItem("ShareLink") || null
    );
    const [share , setShare] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const { contents, loading, refresh, setContents } = useContent();
   
    useEffect(() => {
      refresh();
    }, [modalOpen]);
  
    async function shareLinkTrue() {
      try {
        setShare(true);
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/brain/share`,
          { share: true },
          {
            headers: {
              Authorization: localStorage.getItem("token") || "",
            },
          }
        );
        const data = response.data as { hash: string };
        const shareUrl = `${window.location.origin}/share/${data.hash}`;
        setShareLink(shareUrl);
        localStorage.setItem("ShareLink", data.hash);
        // alert(`${shareUrl}`);
        message.success(`Your Shareable Link : ${shareUrl}`);
      } catch (error) {
        console.error("Error generating share link:", error);
        alert("Failed to generate share link.");
      }
    }
    async function shareLinkFalse() {
      try {
        setShare(false);
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/brain/share`,
          { share: false },
          {
            headers: {
              Authorization: localStorage.getItem("token") || "",
            },
          }
        );
        setShareLink(null);
        //@ts-ignore
        localStorage.removeItem("ShareLink");
        // alert(`Now Your Brain is not Publicly Available`);
        message.warning(`Now Your Brain is not Publicly Available`);
      } catch (error) {
        console.error("Error generating share link:", error);
        alert("Failed to generate share link.");
      }
    }
  
    async function handleDelete(contentId: string) {
      try {
        
        await axios.delete(`${BACKEND_URL}/api/v1/content`, {
          //@ts-ignore
          data: { contentId },
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        });
        message.success(`Deleted Successfully`)
        refresh();
        
        setContents((prevContents) =>
          prevContents.filter((content) => content._id !== contentId)
        );
      } catch (error) {
        console.error("Error deleting content:", error);
        alert("Failed to delete content.");
      }
    }
   let fillteredContents: any[] = [];
   if(props.type == ""){
    fillteredContents = contents;
   }else if(props.type == "youtube"){
    fillteredContents = contents.filter((content) => content.type === "youtube");
   }else if(props.type == "twitter"){
    fillteredContents = contents.filter((content) => content.type === "twitter");
   }else if(props.type == "Link"){
    fillteredContents = contents.filter((content) => content.type === "Link");
   }

 return<>
 {/* <SideBar /> */}
 <div className="p-4 h-screen flex flex-col min-h-screen bg-gray-100 dark:bg-darkBackground dark:text-white bottom-2 ">
   <CreateContentModal
     open={modalOpen}
     onClose={() => setModalOpen(false)}
   />
   <div className="flex justify-between mt-3 md:mt-0 gap-3 mb-2 flex-wrap items-center border-b-2 border-gray-300 p-1 drop-shadow-lg">
     <div className="text-2xl font-bold flex justify-center items-center gap-3  ">
       {props.icon}
       {props.title}
     </div>
     <div className="flex gap-3 flex-wrap mb-1">
            <Popover
              content={
                shareLink ? (
                  <div>
                    <p className="text-sm break-all text-blue-500">{shareLink}</p>
                  </div>
                ) : (
                  <p className="text-sm text-red-600">No link generated yet.</p>
                )
              }
              title="Shareable Link"
              trigger="hover"
            >
              {share === false ? (
              
                  <Button
                    icon={<ShareAltOutlined />}
                    size="large"
                    onClick={shareLinkTrue}
                  >
                    Share Content
                  </Button>
                
              ) : (
               
                  <Button
                    icon={<ApiTwoTone />}
                    size="large"
                    onClick={shareLinkFalse}
                    danger
                  >
                    UnShare Content
                  </Button>
                
              )}
            </Popover>

            <Tooltip
              title={`Add New Content to Your Brain`}
              trigger={"hover"}
              color="geekblue"
              arrow
            >
              <Button
                onClick={() => setModalOpen(true)}
                type="primary"
                size="large"
                icon={<FolderAddOutlined />}
              >
                Add Content
              </Button>
            </Tooltip>
          </div>
        </div>

   {/* Scrollable container for cards */}
   <div className="flex-1 overflow-y-auto justify-center items-center">
     <div className="flex gap-6 flex-wrap items-center">
       {loading ? (
         <div className="flex justify-center items-center w-full">
           <LoadingIcon />
         </div>
       ) : fillteredContents?.length > 0 ? (
          fillteredContents.map(({ _id, link, type, title , description }) => (
           <Card1
             _id={_id}
             key={_id}
             type={type}
             link={link}
             title={title}
             description={description}
             onDelete={() => handleDelete(_id)}
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