import { useEffect, useState } from "react";
import axios from "axios";
// @ts-ignore

import { Button } from "antd";
import { ShareAltOutlined , FolderAddOutlined } from "@ant-design/icons";
import { Card1 } from "../componets/Card1";
import { CreateContentModal } from "../componets/CreateContentModal";

import { SideBar } from "../componets/Sidebar";
import { useContent } from "../hooks/useContent";
import { LoadingIcon } from "../icon/LoadingIcon";
import { BACKEND_URL } from "../config";
import { YouTubeIcon } from "../icon/YoutubeIcon";

export function YoutubedashBoard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, loading, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  async function shareLink() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      //@ts-ignore
      const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
      alert(`${shareUrl}`);
    } catch (error) {
      console.error("Error generating share link:", error);
      alert("Failed to generate share link.");
    }
  }
  async function handleDelete(contentId:string) {
    try{
      await axios.delete(`${BACKEND_URL}/api/v1/content/` , {
        //@ts-ignore
        data:{contentId},
        headers:{
          Authorization:localStorage.getItem('token') || "",
        }
      });
      refresh();
    }catch(e){
      console.error("Error deleting content:" ,e);
      alert("Failed to delete content.");
      
    }
  }
  return (
    <>
      <SideBar />
      <div className="p-4 h-screen flex flex-col lg:ml-72 min-h-screen bg-gray-100 bottom-2">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <div className="flex justify-between gap-3 mb-4 flex-wrap items-center">
          <div className={`text-2xl font-bold flex justify-center items-center gap-3`}>
           <span className={`hidden lg:block `}> {<YouTubeIcon/>}</span>
            Youtube Videos
            </div>
          <div className="flex gap-3">
          <Button
              icon={<ShareAltOutlined />}
              size="large"
              onClick={shareLink}
            >
              Share Content
            </Button>
            <Button
              onClick={() => setModalOpen(true)}
              type="primary"
              size="large"
              icon={<FolderAddOutlined />}
            >Add Content</Button>
          
          </div>
        </div>

        {/* Cards */}
        <div className="flex gap-4 flex-wrap">
          {loading ? (
            <div className="flex justify-center items-center w-full">
              <LoadingIcon />
            </div>
          ) : contents?.length > 0 ? (
            contents
                    .filter(({ type }) => type === "youtube")
                    .map(({ _id ,link, type, title }) => (
                        <Card1 _id={_id} key={_id} type={type} link={link} title={title} onDelete={()=> handleDelete(_id)} />
                    ))
          ) : (
            <div className="text-center text-gray-500 w-full">
              No content available. Add some!
            </div>
          )}
        </div>
      </div>
    </>
  );
}