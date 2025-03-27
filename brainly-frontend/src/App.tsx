import { DashBoard } from "./Pages/Dashboard";
import { SignUp } from "./Pages/SignUp";
import { SignIn } from "./Pages/Signin";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import { TwitterdashBoard } from "./Pages/Twitterdashboard";
import { YoutubedashBoard } from "./Pages/Youtubedashboard";
import { LinksdashBoard } from "./Pages/Linksdashboard";
import { ShareDashboard } from "./Pages/ShareDashboard";
import { ShareLinkDashboard } from "./Pages/ShareLinkDashboard";
import {ShareYoutubeDashboard} from "./Pages/ShareYoutubeDashboard";
import { ShareTwitterDashboard } from "./Pages/ShareTwitterDashboard";

function App() {
  
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/Twitterdashboard" element={<TwitterdashBoard/>} />
        <Route path="/Youtubedashboard" element={<YoutubedashBoard/>} />
        <Route path="/Linksdashboard" element={<LinksdashBoard/>} />
        <Route path="/share/:shareLink" element={<ShareDashboard/>}/>
        <Route path="/ShareLinkDashboard" element={<ShareLinkDashboard/>}/>
        <Route path="/ShareYoutubeDashboard" element={<ShareYoutubeDashboard/>}/>
        <Route path="/ShareTwitterDashboard" element={<ShareTwitterDashboard/>}/>
      </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
