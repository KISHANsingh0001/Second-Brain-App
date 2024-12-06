import { DashBoard } from "./Pages/Dashboard";
import { SignUp } from "./Pages/SignUp";
import { SignIn } from "./Pages/Signin";
import { BrowserRouter , Routes , Route } from "react-router-dom";
function App() {
  
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/dash" element={<DashBoard/>}/>
      </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
