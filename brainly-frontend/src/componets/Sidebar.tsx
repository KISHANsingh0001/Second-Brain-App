import { DocumentIcon } from "../icon/Document";
import { HomeIcon } from "../icon/HomeIcon";
import { LinkIcon } from "../icon/LinkIcon";
import { Logo } from "../icon/Logo";
import { TwitterIcon } from "../icon/TwitterIcon";
import { YouTubeIcon } from "../icon/YoutubeIcon";
import { SideBarItems } from "./SidebarItem";
// @ts-ignore
import { Button } from "../componets/button";
import { useNavigate } from "react-router-dom";

export function SideBar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/signup") // Redirect to login page
  }

  return (
    <div className="h-screen bg-white border-r w-72 fixed flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <div className="flex pt-4 justify-start gap-2 pl-6 p-3 border-b-2">
          <Logo />
          <h1 className="text-2xl font-extrabold">Second Brain</h1>
        </div>
        <div className="pt-4 pl-1">
          <SideBarItems text="Home" icon={<HomeIcon />} />
          <SideBarItems text="Twitter" icon={<TwitterIcon />} />
          <SideBarItems text="Youtube" icon={<YouTubeIcon />} />
          {/* <SideBarItems text="Document" icon={<DocumentIcon />} /> */}
          <SideBarItems text="Links" icon={<LinkIcon />} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4">
        <Button
          onClick={handleLogout}
          variant="secondary"
          size="sm"
          text="Logout"
        />
      </div>
    </div>
  );
}