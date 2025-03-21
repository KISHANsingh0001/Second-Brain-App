// // import { DocumentIcon } from "../icon/Document";
// import { HomeIcon } from "../icon/HomeIcon";
// import { LinkIcon } from "../icon/LinkIcon";
// import { Logo } from "../icon/Logo";
// import { TwitterIcon } from "../icon/TwitterIcon";
// import { YouTubeIcon } from "../icon/YoutubeIcon";
// import { SideBarItems } from "./SidebarItem";
// // @ts-ignore
// import { Button } from "../componets/button";
// import { useNavigate } from "react-router-dom";

// export function SideBar() {
//   const navigate = useNavigate();
//   function handleLogout() {
//     localStorage.removeItem("token");
//     navigate("/signup") // Redirect to login page
//   }

//   return (
//     <div className="h-screen bg-white border-r w-72 fixed flex flex-col justify-between">
//       {/* Top Section */}
//       <div>
//         <div className="flex pt-4 justify-start gap-2 pl-6 p-3 border-b-2">
//           <Logo />
//           <h1 className="text-2xl font-extrabold">Second Brain</h1>
//         </div>
//         <div className="pt-4 pl-1">
//           <div onClick={()=>navigate("/dash")}><SideBarItems text="Home" icon={<HomeIcon />} /></div>
//           <div onClick={()=>navigate("/Twitterdashboard")} ><SideBarItems text="Twitter" icon={<TwitterIcon />} /></div>
//           <div onClick={()=>navigate("/Youtubedashboard")}><SideBarItems text="Youtube" icon={<YouTubeIcon />} /></div>
//           <div onClick={()=>navigate("/Linksdashboard")}><SideBarItems text="Links" icon={<LinkIcon />} /></div>
//           {/* <SideBarItems text="Document" icon={<DocumentIcon />} /> */}
//         </div>
//       </div>

//       {/* Bottom Section */}
//       <div className="p-4">
//         <Button
//           onClick={handleLogout}
//           variant="secondary"
//           size="sm"
//           text="Logout"
//         />
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { HomeIcon } from "../icon/HomeIcon";
import { LinkIcon } from "../icon/LinkIcon";
import { Logo } from "../icon/Logo";
import { TwitterIcon } from "../icon/TwitterIcon";
import { YouTubeIcon } from "../icon/YoutubeIcon";
import { SideBarItems } from "./SidebarItem";
// @ts-ignore
// import { Button } from "../componets/button";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import  MenuIcon  from "../icon/MenuIcon"; // Add a menu icon for the toggle button

export function SideBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/signup"); // Redirect to login page
  }

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      {/* Toggle button for small screens */}
      <div className={`lg:hidden p-4 ${isOpen == true ? `absolute top-[-15px] translate-x-72 transition-transform duration-300 ease-in-out`: `absolute top-[-15px]`}`}>
        <button onClick={toggleSidebar} className="text-gray-700 focus:outline-none">
          <MenuIcon />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`h-screen bg-white border-r w-72 fixed flex flex-col justify-between transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Top Section */}
        <div>
          <div className="flex pt-4 justify-start gap-2 pl-6 p-3 border-b-2">
            <Logo />
            <h1 className="text-2xl font-extrabold">Second Brain</h1>
          </div>
          <div className="pt-4 pl-1">
            <div onClick={() => navigate("/dash")}>
              <SideBarItems text="Home" icon={<HomeIcon />} />
            </div>
            <div onClick={() => navigate("/Twitterdashboard")}>
              <SideBarItems text="Twitter" icon={<TwitterIcon />} />
            </div>
            <div onClick={() => navigate("/Youtubedashboard")}>
              <SideBarItems text="Youtube" icon={<YouTubeIcon />} />
            </div>
            <div onClick={() => navigate("/Linksdashboard")}>
              <SideBarItems text="Links" icon={<LinkIcon />} />
            </div>
            {/* <SideBarItems text="Document" icon={<DocumentIcon />} /> */}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4">
          <Button 
          type="primary"
          danger
          onClick={handleLogout}
          >Logout</Button>
        </div>
      </div>
    </>
  );
}