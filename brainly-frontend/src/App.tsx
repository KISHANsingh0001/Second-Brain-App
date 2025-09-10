import { SignUp } from "./Pages/SignUp";
import { SignIn } from "./Pages/Signin";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import UniversalDashboard from "./Pages/universalDashboard";
import { SidebarModified } from "./componets/RetractingSidebar";
import { FiHome, FiLink, FiVideo } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { UniversalShareDashboard } from "./Pages/universalSharedashboard";
import { OnboardingTour } from "./componets/OnboardingTour";

function App() {
  const location = useLocation();


  // Define routes where the Sidebar should not appear
  const noSidebarRoutes = ["/signup", "/signin", "/"];

  // Define routes where ShareSidebar should appear
  const shareSidebarRoutes = [
    "/share/:shareLink",
    "/ShareLinkDashboard",
    "/ShareYoutubeDashboard",
    "/ShareTwitterDashboard",
  ];

  // Check if the current route matches any of the shareSidebarRoutes
  const isShareSidebar = shareSidebarRoutes.some((route) =>
    location.pathname.startsWith(route.replace(":shareLink", ""))
  );
  const showTour = !noSidebarRoutes.includes(location.pathname);

  return (
    <div className="h-screen flex">
      {/* Conditionally render the  sidebar */}
      {!noSidebarRoutes.includes(location.pathname) &&
        (isShareSidebar ? (
          <SidebarModified share={true} />
        ) : (
          <SidebarModified share={false} />
        ))}

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={<UniversalDashboard type="" title="All Content" icon={<FiHome />} />}
          />
          <Route
            path="/Twitterdashboard"
            element={<UniversalDashboard type="twitter" title="Twitter Content" icon={<FaXTwitter />} />}
          />
          <Route
            path="/Youtubedashboard"
            element={<UniversalDashboard type="youtube" title="YouTube Content" icon={<FiVideo />} />}
          />
          <Route
            path="/Linksdashboard"
            element={<UniversalDashboard type="Link" title="Your Links" icon={<FiLink />} />}
          />
          <Route path="/share/:shareLink" element={<UniversalShareDashboard type="" title="All Content" icon={<FiHome />} />} />
          <Route path="/ShareLinkDashboard/:shareLink" element={<UniversalShareDashboard type="Link" title="Your Links" icon={<FiLink />} />} />
          <Route path="/ShareYoutubeDashboard/:shareLink" element={<UniversalShareDashboard type="youtube" title="YouTube Content" icon={<FiVideo />} />} />
          <Route path="/ShareTwitterDashboard/:shareLink" element={<UniversalShareDashboard type="twitter" title="Twitter Content" icon={<FaXTwitter />} />} />

        </Routes>

         {showTour && <OnboardingTour />}
      </div>
    </div>
  );
}

export default function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
