import { useRef, useState } from "react";
import axios from "axios";
import { CrossIcon } from "../icon/CrossIcon";
import { Button, message, Spin } from "antd";
import { BACKEND_URL } from "../config";
import { Loader } from "lucide-react";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
  onContentAdded?: () => void;
}
// Helper to extract YouTube video ID
function extractYouTubeVideoId(url: string): string | null {
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
    // Handle YouTube Shorts - youtube.com/shorts/VIDEO_ID
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
    // Handle m.youtube.com mobile URLs
    else if (url.includes("m.youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1];
      const ampersandPos = videoId.indexOf("&");
      return ampersandPos !== -1 ? videoId.substring(0, ampersandPos) : videoId;
    }
    // Handle YouTube Live - youtube.com/live/VIDEO_ID
    else if (url.includes("/live/")) {
      const liveId = url.split("/live/")[1];
      const questionPos = liveId.indexOf("?");
      return questionPos !== -1 ? liveId.substring(0, questionPos) : liveId;
    }

    return null;
  } catch (error) {
    console.error("Error extracting YouTube ID:", error);
    return null;
  }
}

export function CreateContentModal({ open, onClose, onContentAdded }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [autofillLoading, setAutofillLoading] = useState(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  // When URL input loses focus, try to autofill YouTube title if type is YouTube Video
  const handleUrlBlur = async () => {
    if (selectedOption !== "youtube") return;

    const url = urlRef.current?.value || "";
    if (!url) return;

    const videoId = extractYouTubeVideoId(url);
    if (!videoId) {
      message.error("Invalid YouTube link or maybe you have put the youtube shorts link.");
      return;
    }

    setAutofillLoading(true);

    try {
      const res = await axios.get(`${BACKEND_URL}/api/youtube-title?videoId=${videoId}`);
      //@ts-ignore
      if (res.data && res.data.title && titleRef.current) {
        //@ts-ignore
        titleRef.current.value = res.data.title;
        message.success("YouTube title autofilled!");
      } else {
        message.error("Could not fetch video title.");
      }
    } catch (err) {
      message.error("Could not fetch video title.");
    } finally {
      setAutofillLoading(false);
    }
  };

  const addContent = async () => {
    const title = titleRef.current?.value;
    const link = urlRef.current?.value;

    if (!title || !link || !selectedOption) {
      message.warning("Please fill in all fields before submitting.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("You need to be logged in to add content.");
        return;
      }

      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          title,
          link,
          type: selectedOption,
          description: descriptionRef.current?.value,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      message.success("Content added successfully!");
      setLoading(false);
      if (onContentAdded) {
        onContentAdded();
      }
      onClose();
    } catch (error: any) {
      console.error("Error adding content:", error.response?.data || error.message);
      message.error("Failed to add content. Please try again.");
    }
  };

  return (
    <div>
      {open && (
        <div>
          {/* Background div */}
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-75 flex justify-center items-center z-50"></div>

          <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center px-4 z-50">
            <div className="flex flex-col justify-center w-full max-w-2xl">
              <span className="bg-white dark:bg-gray-800 p-4 bg-opacity-100 shadow-lg rounded-3xl border-black-100 dark:border-gray-700 border">
                <div className="flex justify-between items-center p-2 mb-4">
                  <h1 className="font-bold text-xl sm:text-2xl text-black dark:text-white">
                    Add New Content
                  </h1>
                  <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon />
                  </div>
                </div>

                {/* Body */}
                <div>
                  {/* Content Type Dropdown */}
                  <div className="mb-4">
                    <label className="block text-sm sm:text-md text-black dark:text-white mb-1 font-bold">
                      Content Type
                    </label>
                    <select
                      className="block w-full border border-black dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                      onChange={handleSelectChange}
                      value={selectedOption}
                    >
                      <option value="">Select an option</option>
                      <option value="Link">Link</option>
                      <option value="twitter">Twitter</option>
                      <option value="youtube">YouTube Video</option>
                    </select>
                  </div>

                  {/* URL Input */}
                  <div className="mb-4">
                    <label className="block text-sm sm:text-md font-bold text-black dark:text-white mb-1">
                      URL
                    </label>
                    <input
                      ref={urlRef}
                      type="text"
                      placeholder="https://example.com"
                      className="block w-full border border-black dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                      onBlur={handleUrlBlur}
                    />
                  </div>

                  {/* Title Input */}
                  <div className="mb-4">
                    <label className="block text-sm sm:text-md font-bold text-black dark:text-white mb-1">
                      Title
                    </label>
                    <div className="relative">
                      <input
                        ref={titleRef}
                        type="text"
                        placeholder="Enter content title"
                        className="block w-full border border-black dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                        readOnly={autofillLoading}
                      />
                      {autofillLoading && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                          <Spin size="small" />
                          <span className="text-xs text-gray-500 dark:text-gray-300">Waiting for autofill...</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description Input */}
                  <div className="mb-4">
                    <label className="block text-sm sm:text-md font-bold text-black dark:text-white mb-1">
                      Description
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        ref={descriptionRef}
                        type="text"
                        placeholder="Add small description"
                        className="block w-full border border-black dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex gap-2 justify-end">
                  <Button
                    type="primary"
                    danger
                    size="large"
                    onClick={onClose}
                    className="dark:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    onClick={addContent}
                    className="dark:text-white"
                  >
                    {loading ? <Loader className="animate-spin" /> : "Add Content"}
                  </Button>
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}