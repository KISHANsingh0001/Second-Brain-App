import { useRef, useState } from "react";
import axios from "axios";
import { CrossIcon } from "../icon/CrossIcon";
import { Button } from "./button";
import { BACKEND_URL } from "../config";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  const [selectedOption, setSelectedOption] = useState<string>("");
//@ts-ignore
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const addContent = async () => {
    const title = titleRef.current?.value;
    const link = urlRef.current?.value;

    if (!title || !link || !selectedOption) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to be logged in to add content.");
        return;
      }

      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          title,
          link,
          type: selectedOption,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Content added successfully!");
      onClose();
    } catch (error: any) {
      console.error("Error adding content:", error.response?.data || error.message);
      alert("Failed to add content. Please try again.");
    }
  };

  return (
    <div>
      {open && (
        <div>
          {/* Background div */}
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-65 flex justify-center items-center"></div>

          <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center px-4">
            <div className="flex flex-col justify-center w-full max-w-2xl">
              <span className="bg-white rounded-lg p-4 bg-opacity-100 shadow-lg">
                <div className="flex justify-between items-center p-2 mb-4">
                  <h1 className="font-bold text-xl sm:text-2xl">Add New Content</h1>
                  <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon />
                  </div>
                </div>

                {/* Body */}
                <div>
                  {/* Content Type Dropdown */}
                  <div className="mb-4">
                    <label className="block text-sm sm:text-md text-black mb-1 font-bold">
                      Content Type
                    </label>
                    <select
                      className="block w-full border border-black rounded-md p-2"
                      onChange={handleSelectChange}
                      value={selectedOption}
                    >
                      <option value="">Select an option</option>
                      <option value="Link">Link</option>
                      <option value="twitter">twitter</option>
                      <option value="youtube">youtube</option>
                    </select>
                  </div>

                  {/* URL Input */}
                  <div className="mb-4">
                    <label className="block text-sm sm:text-md font-bold text-black mb-1">
                      URL
                    </label>
                    <input
                      ref={urlRef}
                      type="text"
                      placeholder="https://example.com"
                      className="block w-full border border-black rounded-md p-2"
                    />
                  </div>

                  {/* Title Input */}
                  <div className="mb-4">
                    <label className="block text-sm sm:text-md font-bold text-black mb-1">
                      Title
                    </label>
                    <input
                      ref={titleRef}
                      type="text"
                      placeholder="Enter content title"
                      className="block w-full border border-black rounded-md p-2"
                    />
                  </div>

                  {/* Tags
                  <div className="mb-4">
                    <label className="block text-sm sm:text-md font-bold text-black mb-1">
                      Tags
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        placeholder="Add tags"
                        className="block w-full border border-black rounded-md p-2"
                      />
                      <button className="bg-gray-200 text-black px-4 py-2 rounded-md">
                        + Add
                      </button>
                    </div>
                  </div> */}
                </div>

                {/* Footer */}
                <div className="flex gap-2 justify-end">
                  <Button variant="secondary" text="Cancel" size="md" onClick={onClose} />
                  <Button variant="primary" text="Add Content" size="md" onClick={addContent} />
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}