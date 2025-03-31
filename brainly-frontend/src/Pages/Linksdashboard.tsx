import { useEffect, useState } from "react";
import axios from "axios";
// @ts-ignore
import { Card, Card1 } from "../componets/Card1";
import { CreateContentModal } from "../componets/CreateContentModal";
import { Button } from "antd";
import { SideBar } from "../componets/Sidebar";
import { useContent } from "../hooks/useContent";
import { LoadingIcon } from "../icon/LoadingIcon";
import { BACKEND_URL } from "../config";
import {
  ApiTwoTone,
  FolderAddOutlined,
  ShareAltOutlined,
} from "@ant-design/icons"
export function LinksdashBoard() {
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
      //@ts-ignore
      const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
      alert(`${shareUrl}`);
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
      //@ts-ignore
      const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
      alert(`Now Your Brain is not Publicly Available`);
    } catch (error) {
      console.error("Error generating share link:", error);
      alert("Failed to generate share link.");
    }
  }
  async function handleDelete(contentId: string) {
    try {
      
      // setContents((prevContents) =>
      //   prevContents.filter((content) => content._id !== contentId)
      // );
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        //@ts-ignore
        data: { contentId },
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });
      refresh();
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content.");
    }
  }

  return (
    <>
      {/* <SideBar /> */}
      <div className="p-4 h-screen flex flex-col  min-h-screen bg-gray-100 bottom-2">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <div className="flex justify-between  mt-3 md:mt-0 gap-3 mb-4 flex-wrap items-center">
          <div className="text-2xl font-bold">Your Links ⛓️‍💥</div>
          <div className="flex gap-3 flex-wrap">
          {share == false ? 
            <div>
              <Button
              icon={<ShareAltOutlined />}
              size="large"
              onClick={shareLinkTrue}
              
            >
              Share Content
            </Button>
            </div> : <div>
              <Button
              icon={<ApiTwoTone />}
              size="large"
              onClick={shareLinkFalse}
              danger
            >
              UnShare Content
            </Button>
            </div>}
            <Button
              onClick={() => setModalOpen(true)}
              type="primary"
              size="large"
              icon={<FolderAddOutlined />}
            >Add Content</Button>
          </div>
        </div>

        {/* Cards */}
        <div className="flex gap-6 flex-wrap">
          {loading ? (
            <div className="flex justify-center items-center w-full">
              <LoadingIcon />
            </div>
          ) : contents?.length > 0 ? (
            contents
                    .filter(({ type }) => type === "Link")
                    .map(({ _id , link, type, title }) => (
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