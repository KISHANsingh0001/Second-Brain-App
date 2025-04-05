import { SignUp } from "./Pages/SignUp";
import { SignIn } from "./Pages/Signin";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ShareDashboard } from "./Pages/ShareDashboard";
import { ShareLinkDashboard } from "./Pages/ShareLinkDashboard";
import { ShareYoutubeDashboard } from "./Pages/ShareYoutubeDashboard";
import { ShareTwitterDashboard } from "./Pages/ShareTwitterDashboard";
import { SideBar } from "./componets/Sidebar";
import UniversalDashboard from "./Pages/universalDashboard";
import { HomeIcon } from "./icon/HomeIcon";
import { TwitterIcon } from "./icon/TwitterIcon";
import { YouTubeIcon } from "./icon/YoutubeIcon";
import { LinkIcon } from "./icon/LinkIcon";

function App() {
  const location = useLocation();

  // Define routes where the original Sidebar should not appear
  const noSidebarRoutes = ["/signup", "/signin" , "/"];

  // Define routes where ShareSidebar should appear
  const shareSidebarRoutes = [
    "/share/:shareLink",
    "/ShareLinkDashboard",
    "/ShareYoutubeDashboard",
    "/ShareTwitterDashboard",
  ];

  // Check current route matches any of the shareSidebarRoutes
  const isShareSidebar = shareSidebarRoutes.some((route) =>
    location.pathname.startsWith(route.replace(":shareLink", ""))
  );

  return (
    <>
      {/* Conditionally render the appropriate sidebar */}
      {!noSidebarRoutes.includes(location.pathname) &&
        (isShareSidebar ? <SideBar isShare={true} /> : <SideBar isShare={false} />)}

      <div className={!noSidebarRoutes.includes(location.pathname) ? "lg:ml-72" : ""}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<UniversalDashboard type="" title="All Content" icon={<HomeIcon/>} />} />
          <Route path="/Twitterdashboard" element={<UniversalDashboard type="twitter" title="Twitter Content" icon={<TwitterIcon/>} />} />
          <Route path="/Youtubedashboard" element={<UniversalDashboard type="youtube" title="Youtube Content" icon={<YouTubeIcon/>} />} />
          <Route path="/Linksdashboard" element={<UniversalDashboard type="Link" title="Your Link's" icon={<LinkIcon/>} />} />
          <Route path="/share/:shareLink" element={<ShareDashboard />} />
          <Route path="/ShareLinkDashboard" element={<ShareLinkDashboard />} />
          <Route path="/ShareYoutubeDashboard" element={<ShareYoutubeDashboard />} />
          <Route path="/ShareTwitterDashboard" element={<ShareTwitterDashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
