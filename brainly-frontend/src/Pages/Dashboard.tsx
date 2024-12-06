import { useEffect, useState } from "react";
import axios from "axios";
// @ts-ignore
import { Button } from "../componets/button";
import { Card } from "../componets/Card";
import { CreateContentModal } from "../componets/CreateContentModal";
import { PlusIcon } from "../icon/Plusicon";
import { ShareIcon } from "../icon/Shareicon";
import { SideBar } from "../componets/Sidebar";
import { useContent } from "../hooks/useContent";
import { LoadingIcon } from "../icon/LoadingIcon";
import { BACKEND_URL } from "../config";

export function DashBoard() {
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
      const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
      alert(`${shareUrl}`);
    } catch (error) {
      console.error("Error generating share link:", error);
      alert("Failed to generate share link.");
    }
  }

  return (
    <>
      <SideBar />
      <div className="p-4 h-screen flex flex-col ml-72 min-h-screen bg-gray-100 bottom-2">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <div className="flex justify-between gap-3 mb-4 flex-wrap items-center">
          <div className="text-2xl font-bold">All Content</div>
          <div className="flex gap-3">
            <Button
              onClick={shareLink}
              variant="secondary"
              size="md"
              text="Share Brain"
              startIcon={<ShareIcon />}
            />
            <Button
              onClick={() => setModalOpen(true)}
              variant="primary"
              size="md"
              text="Add Content"
              startIcon={<PlusIcon />}
            />
          </div>
        </div>

        {/* Cards */}
        <div className="flex gap-4 flex-wrap">
          {loading ? (
            <div className="flex justify-center items-center w-full">
              <LoadingIcon />
            </div>
          ) : contents?.length > 0 ? (
            contents.map(({ link, type, title }) => (
              <Card key={link} type={type} link={link} title={title} />
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