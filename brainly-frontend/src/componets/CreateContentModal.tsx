import { useRef, useState } from "react";
import axios from "axios";
import { CrossIcon } from "../icon/CrossIcon";
import { Button , message } from "antd";
import { BACKEND_URL } from "../config";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

// export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
//   const titleRef = useRef<HTMLInputElement>(null);
//   const urlRef = useRef<HTMLInputElement>(null);
//   const descriptionRef = useRef<HTMLInputElement>(null);

//   const [selectedOption, setSelectedOption] = useState<string>("");
// //@ts-ignore
//   const handleSelectChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   const addContent = async () => {
//     const title = titleRef.current?.value;
//     const link = urlRef.current?.value;

//     if (!title || !link || !selectedOption ) {
//       alert("Please fill in all fields before submitting.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("You need to be logged in to add content.");
//         return;
//       }

//       await axios.post(
//         `${BACKEND_URL}/api/v1/content`,
//         {
//           title,
//           link,
//           type: selectedOption,
//           description: descriptionRef.current?.value,
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

//       alert("Content added successfully!");
//       onClose();
//     } catch (error: any) {
//       console.error("Error adding content:", error.response?.data || error.message);
//       alert("Failed to add content. Please try again.");
//     }
//   };

//   return (
//     // <div>
//     //   {open && (
//     //     <div>
//     //       {/* Background div */}
//     //       <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-75 flex justify-center items-center z-50"></div>

//     //       <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center px-4 z-50">
//     //         <div className="flex flex-col justify-center w-full max-w-2xl">
//     //           <span className="bg-white p-4 bg-opacity-100 shadow-lg rounded-3xl border-black-100 border">
//     //             <div className="flex justify-between items-center p-2 mb-4">
//     //               <h1 className="font-bold text-xl sm:text-2xl">Add New Content</h1>
//     //               <div onClick={onClose} className="cursor-pointer">
//     //                 <CrossIcon />
//     //               </div>
//     //             </div>

//     //             {/* Body */}
//     //             <div >
//     //               {/* Content Type Dropdown */}
//     //               <div className="mb-4">
//     //                 <label className="block text-sm sm:text-md text-black mb-1 font-bold">
//     //                   Content Type
//     //                 </label>
//     //                 <select
//     //                   className="block w-full border border-black rounded-md p-2"
//     //                   onChange={handleSelectChange}
//     //                   value={selectedOption}
//     //                 >
//     //                   <option value="">Select an option</option>
//     //                   <option value="Link">Link</option>
//     //                   <option value="twitter">twitter</option>
//     //                   <option value="youtube">youtube</option>
//     //                 </select>
//     //               </div>

//     //               {/* URL Input */}
//     //               <div className="mb-4">
//     //                 <label className="block text-sm sm:text-md font-bold text-black mb-1">
//     //                   URL
//     //                 </label>
//     //                 <input
//     //                   ref={urlRef}
//     //                   type="text"
//     //                   placeholder="https://example.com"
//     //                   className="block w-full border border-black rounded-md p-2"
//     //                 />
//     //               </div>

//     //               {/* Title Input */}
//     //               <div className="mb-4">
//     //                 <label className="block text-sm sm:text-md font-bold text-black mb-1">
//     //                   Title
//     //                 </label>
//     //                 <input
//     //                   ref={titleRef}
//     //                   type="text"
//     //                   placeholder="Enter content title"
//     //                   className="block w-full border border-black rounded-md p-2"
//     //                 />
//     //               </div>

//     //               {/* Description Input */}
//     //               <div className="mb-4">
//     //                 <label className="block text-sm sm:text-md font-bold text-black mb-1">
//     //                   Description
//     //                 </label>
//     //                 <div className="flex flex-col sm:flex-row gap-2">
//     //                   <input
//     //                     ref={descriptionRef}
//     //                     type="text"
//     //                     placeholder="Add small description"
//     //                     className="block w-full border border-black rounded-md p-2"
//     //                   />
//     //                 </div>
//     //               </div>
//     //             </div>

//     //             {/* Footer */}
//     //             <div className="flex gap-2 justify-end">
//     //               <Button type="primary" danger size="large" onClick={onClose}>Cancel</Button>
//     //               <Button type="primary" size="large" onClick={addContent}>Add Content</Button>
//     //             </div>
//     //           </span>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   )}
//     // </div>
//     <div>
//     {open && (
//       <div>
//         {/* Background div */}
//         <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-75 flex justify-center items-center z-50"></div>

//         <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center px-4 z-50">
//           <div className="flex flex-col justify-center w-full max-w-2xl">
//             <span className="bg-white dark:bg-gray-800 p-4 bg-opacity-100 shadow-lg rounded-3xl border-black-100 dark:border-gray-700 border">
//               <div className="flex justify-between items-center p-2 mb-4">
//                 <h1 className="font-bold text-xl sm:text-2xl text-black dark:text-white">
//                   Add New Content
//                 </h1>
//                 <div onClick={onClose} className="cursor-pointer">
//                   <CrossIcon />
//                 </div>
//               </div>

//               {/* Body */}
//               <div>
//                 {/* Content Type Dropdown */}
//                 <div className="mb-4">
//                   <label className="block text-sm sm:text-md text-black dark:text-white mb-1 font-bold">
//                     Content Type
//                   </label>
//                   <select
//                     className="block w-full border border-black dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-black dark:text-white"
//                     onChange={handleSelectChange}
//                     value={selectedOption}
//                   >
//                     <option value="">Select an option</option>
//                     <option value="Link">Link</option>
//                     <option value="twitter">Twitter</option>
//                     <option value="youtube">YouTube</option>
//                   </select>
//                 </div>

//                 {/* URL Input */}
//                 <div className="mb-4">
//                   <label className="block text-sm sm:text-md font-bold text-black dark:text-white mb-1">
//                     URL
//                   </label>
//                   <input
//                     ref={urlRef}
//                     type="text"
//                     placeholder="https://example.com"
//                     className="block w-full border border-black dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-black dark:text-white"
//                   />
//                 </div>

//                 {/* Title Input */}
//                 <div className="mb-4">
//                   <label className="block text-sm sm:text-md font-bold text-black dark:text-white mb-1">
//                     Title
//                   </label>
//                   <input
//                     ref={titleRef}
//                     type="text"
//                     placeholder="Enter content title"
//                     className="block w-full border border-black dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-black dark:text-white"
//                   />
//                 </div>

//                 {/* Description Input */}
//                 <div className="mb-4">
//                   <label className="block text-sm sm:text-md font-bold text-black dark:text-white mb-1">
//                     Description
//                   </label>
//                   <div className="flex flex-col sm:flex-row gap-2">
//                     <input
//                       ref={descriptionRef}
//                       type="text"
//                       placeholder="Add small description"
//                       className="block w-full border border-black dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-black dark:text-white"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="flex gap-2 justify-end">
//                 <Button
//                   type="primary"
//                   danger
//                   size="large"
//                   onClick={onClose}
//                   className=" dark:text-white"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="primary"
//                   size="large"
//                   onClick={addContent}
//                   className=" dark:text-white"
//                 >
//                   Add Content
//                 </Button>
//               </div>
//             </span>
//           </div>
//         </div>
//       </div>
//     )}
//   </div>
//   );
// }
export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const addContent = async () => {
    const title = titleRef.current?.value;
    const link = urlRef.current?.value;

    if (!title || !link || !selectedOption) {
      message.warning("Please fill in all fields before submitting."); // Show warning message
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("You need to be logged in to add content."); // Show error message
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

      message.success("Content added successfully!"); // Show success message
      onClose();
    } catch (error: any) {
      console.error("Error adding content:", error.response?.data || error.message);
      message.error("Failed to add content. Please try again."); // Show error message
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
                    />
                  </div>

                  {/* Title Input */}
                  <div className="mb-4">
                    <label className="block text-sm sm:text-md font-bold text-black dark:text-white mb-1">
                      Title
                    </label>
                    <input
                      ref={titleRef}
                      type="text"
                      placeholder="Enter content title"
                      className="block w-full border border-black dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-black dark:text-white"
                    />
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
                    Add Content
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