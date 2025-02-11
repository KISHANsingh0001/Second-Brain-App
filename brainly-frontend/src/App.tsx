import { DashBoard } from "./Pages/Dashboard";
import { SignUp } from "./Pages/SignUp";
import { SignIn } from "./Pages/Signin";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import { TwitterdashBoard } from "./Pages/Twitterdashboard";
import { YoutubedashBoard } from "./Pages/Youtubedashboard";
import { LinksdashBoard } from "./Pages/Linksdashboard";
function App() {
  
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/dash" element={<DashBoard/>}/>
        <Route path="/Twitterdashboard" element={<TwitterdashBoard/>} />
        <Route path="/Youtubedashboard" element={<YoutubedashBoard/>} />
        <Route path="/Linksdashboard" element={<LinksdashBoard/>} />
      </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
