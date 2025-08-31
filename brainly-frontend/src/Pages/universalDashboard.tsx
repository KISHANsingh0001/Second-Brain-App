import { useEffect, useState } from "react";
import axios from "axios";
import { Card1 } from "../componets/Card1";
import { CreateContentModal } from "../componets/CreateContentModal";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import { Button, Popover, Tooltip, message } from "antd";
import {
  ApiTwoTone,
  CopyOutlined,
  FolderAddOutlined,
  ShareAltOutlined,
} from "@ant-design/icons"


interface dashboardProps {
  type: string;
  title: string;
  icon: JSX.Element;

}
export default function UniversalDashboard(props: dashboardProps) {
  const [shareLink, setShareLink] = useState<string | null>(
    localStorage.getItem("ShareLink") || null
  );
  const [share, setShare] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, loading, refresh, setContents } = useContent();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

  useEffect(() => {
    refresh();
  }, []);

  async function shareLinkTrue() {
    try {
      setIsSharing(true); // Start loading


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
      message.success(`Your Shareable Link is ready!`);

      setShare(true);

    } catch (error) {
      console.error("Error generating share link:", error);
      message.error("Failed to generate share link.");
    } finally {
      setIsSharing(false);
    }
  }


  async function shareLinkFalse() {
    try {
      setIsSharing(true); // Start loading

       await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: false },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );

      setShareLink(null);
      localStorage.removeItem("ShareLink");
      message.warning(`Now Your Brain is not Publicly Available`);

      setShare(false);

    } catch (error) {
      console.error("Error disabling sharing:", error);
      message.error("Failed to disable sharing.");
    } finally {
      setIsSharing(false);
    }
  }
    async function handleDelete(contentId: string) {
    try {
      setDeletingId(contentId); // Set the currently deleting card
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        //@ts-ignore
        data: { contentId },
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });
      message.success(`Deleted Successfully`);
      setContents((prevContents) =>
        prevContents.filter((content) => content._id !== contentId)
      );
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content.");
    } finally {
      setDeletingId(null); // Reset after deletion
    }
  }
  let fillteredContents: any[] = [];
  if (props.type == "") {
    fillteredContents = contents;
  } else if (props.type == "youtube") {
    fillteredContents = contents.filter((content) => content.type === "youtube");
  } else if (props.type == "twitter") {
    fillteredContents = contents.filter((content) => content.type === "twitter");
  } else if (props.type == "Link") {
    fillteredContents = contents.filter((content) => content.type === "Link");
  }

  return <>
    {/* <SideBar /> */}
    <div className="p-4 h-screen flex flex-col min-h-screen bg-gray-100 dark:bg-darkBackground dark:text-white bottom-2 ">
      <CreateContentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onContentAdded={()=>{
          refresh();
          setModalOpen(false);
        }}
      />
      <div className="flex justify-between mt-3 md:mt-0 gap-3 mb-2 flex-wrap items-center border-b-2 border-gray-300 p-1 drop-shadow-lg">
        <div className="text-2xl font-bold flex justify-center items-center gap-3  ">
          {props.icon}
          {props.title}
        </div>
        <div className="flex gap-1 mb-1 md:gap-2 lg:gap-4">
          <Popover
            content={
              shareLink ? (
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm break-all text-blue-500 mr-2">{shareLink}</p>
                    <Button
                      type="text"
                      size="small"
                      icon={<CopyOutlined />}
                      className="flex-shrink-0 text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        navigator.clipboard.writeText(shareLink);
                        message.success('Link copied to clipboard');
                      }}
                      title="Copy to clipboard"
                    />
                  </div>
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
                loading={isSharing}

              >
                {isSharing ? 'Generating...' : 'Share Content'}
              </Button>
            ) : (
              <Button
                icon={<ApiTwoTone />}
                size="large"
                onClick={shareLinkFalse}
                danger
                loading={isSharing}

              >
                {isSharing ? 'Removing...' : 'UnShare Content'}
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
            // <div className="flex justify-center items-center w-screen h-screen">
            //   <span className="loader"></span>
            // </div>
            arr.map((_, index)=>(
               <div key={index} className="w-72 h-72 p-4 bg-gray-300 border border-gray-200 rounded-lg shadow animate-pulse transition-opacity"></div>
            ))
          ) : fillteredContents?.length > 0 ? (
            fillteredContents.map(({ _id, link, type, title, description }) => (
              <Card1
                _id={_id}
                key={_id}
                type={type}
                link={link}
                title={title}
                description={description}
                onDelete={() => handleDelete(_id)}
                isDeleting={deletingId === _id} // Pass prop to show spinner
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

