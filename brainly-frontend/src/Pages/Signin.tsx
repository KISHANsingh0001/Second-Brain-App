import { useEffect, useRef, useState } from "react";
import { LoadingIcon } from "../icon/LoadingIcon";
import { Input } from "../componets/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { ModalSignIn } from "../componets/ModalSignIn";
import { Link, useNavigate } from "react-router-dom";

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false); // To show modal on success
  const [error, setError] = useState<string | null>(null); // To store error messages
  const [responseMessage, setResponseMessage] = useState<string | null>(null); // To display server response
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
        const checkExistingToken = async () => {
          setLoading(true)
            const token = localStorage.getItem("token");
            
            if (token) {
                try {
                    // Verify token is still valid by making a test request
                    const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                        headers: {
                            Authorization: token
                        }
                    });
                    
                    // If request succeeds, token is valid - redirect to dashboard
                    if (response.status === 200) {
                        navigate("/dashboard");
                        return;
                    }
                } catch (error) {
                    // Token is invalid or expired, remove it
                    localStorage.removeItem("token");
                    console.log("Token expired or invalid, removed from storage");
                }
            }
            
            setLoading(false);
        };

        checkExistingToken();
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white dark:bg-darkBackground">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-gray-600 dark:text-white">Checking authentication...</span>
            </div>
        );
    }

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResponseMessage(null); // Clear previous messages

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    
    if (!email || !password) {
      setError("Email and password are required!");
      setLoading(false);
      return;
    }

    // Email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid Email Format");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        email,
        password,
      });
      //@ts-ignore
      const token = res.data.token;
      localStorage.setItem("token" , token);

      // Assume the backend sends a success message in the response
      //@ts-ignore
      setResponseMessage("SignIn successful!");
      if (!localStorage.getItem('secondBrain_hasLoggedIn'))
         {
            localStorage.setItem('secondBrain_hasLoggedIn', 'true');
            // Remove existing tour completion to ensure new users see it
            localStorage.removeItem('secondBrain_tourComplete');
          }
      setShow(true); // Show success modal
      setTimeout(()=>{
       navigate("/dashboard")
      },2000);
    } catch (err) {
      // Extract `msg` from the error response
      //@ts-ignore
      const errorMessage = "SignIn failed.Invalid Credentials";
      setError(errorMessage); // Update error state
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          SignIn
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <Input placeholder="Enter your Email" reference={emailRef} type="text" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <Input placeholder="Enter Your Password" reference={passwordRef} type="password" />
          </div>

          {/* Display error message */}
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          {/* Display response message */}
          {responseMessage && (
            <p className="text-green-500 text-sm mb-4">{responseMessage}</p>
          )}

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <LoadingIcon />
                  Loading...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-sm mt-4 ">
          Don't have an account? 
          <Link to="/signup" className="text-blue-600 ml-2">
          Get Started
          </Link>
        </p>
      </div>

      {/* Modal for Success */}
      {show && (
        <ModalSignIn
         show={show} onClose={() => setShow(false) }>
          <h2 className="text-lg font-bold">Signup Successful!</h2>
          <p className="mt-2 text-gray-600">{responseMessage}</p>
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => setShow(false)}
          >
            Close
          </button>
        </ModalSignIn>
      )}
    </div>
  );
}
// import { useEffect, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { BACKEND_URL } from "../config";
// import { ModalSignIn } from "../componets/ModalSignIn";
// import { Logo } from "../icon/Logo";

// export function SignIn() {
//   const [loading, setLoading] = useState(false);
//   const [show, setShow] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [responseMessage, setResponseMessage] = useState<string | null>(null);
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkExistingToken = async () => {
//       setLoading(true);
//       const token = localStorage.getItem("token");
      
//       if (token) {
//         try {
//           const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
//             headers: {
//               Authorization: token
//             }
//           });
          
//           if (response.status === 200) {
//             navigate("/dashboard");
//             return;
//           }
//         } catch (error) {
//           localStorage.removeItem("token");
//           console.log("Token expired or invalid, removed from storage");
//         }
//       }
      
//       setLoading(false);
//     };

//     checkExistingToken();
//   }, [navigate]);

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError(null);
//     setResponseMessage(null);

//     const email = emailRef.current?.value;
//     const password = passwordRef.current?.value;
    
//     if (!email || !password) {
//       setError("Email and password are required!");
//       setLoading(false);
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError("Invalid Email Format");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//         email,
//         password,
//       });
//       //@ts-ignore
//       const token = res.data.token;
//       localStorage.setItem("token", token);

//       setResponseMessage("SignIn successful!");
//       setShow(true);
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 2000);
//     } catch (err) {
//       setError("SignIn failed. Invalid Credentials");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   if (loading && !show) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="ml-3 text-gray-600 dark:text-gray-300">Checking authentication...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
//       <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full max-w-md md:max-w-lg flex">
//         {/* Left side - Form */}
//         <div className="w-full p-8 md:p-10">
//           <div className="flex justify-center mb-6">
//             <Logo />
//           </div>
          
//           <div className="text-center mb-8">
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
//             <p className="text-gray-500 dark:text-gray-400 mt-1">Login to your Second Brain account</p>
//           </div>
          
//           <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 ref={emailRef}
//                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
//                 placeholder="you@example.com"
//                 required
//               />
//             </div>
            
//             <div>
//               <div className="flex items-center justify-between mb-1">
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Password
//                 </label>
//                 <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
//                   Forgot your password?
//                 </a>
//               </div>
//               <input
//                 id="password"
//                 type="password"
//                 ref={passwordRef}
//                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
//                 placeholder="••••••••"
//                 required
//               />
//             </div>

//             {/* Error message */}
//             {error && (
//               <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-3 rounded-md text-sm">
//                 {error}
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full h-full bg-black-100 text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//             >
//               {loading ? 'Signing in...' : 'Login'}
//             </button>
//           </form>
//           <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
//             Don't have an account?{' '}
//             <Link to="/signup" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* Modal for Success */}
//       {show && (
//         <ModalSignIn show={show} onClose={() => setShow(false)}>
//           <div className="text-center p-4">
//             <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
//               <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <h2 className="text-lg font-bold text-gray-900">Login Successful!</h2>
//             <p className="mt-2 text-gray-600">{responseMessage}</p>
//             <p className="text-sm text-gray-500 mt-2">Redirecting to dashboard...</p>
//           </div>
//         </ModalSignIn>
//       )}
//     </div>
//   );
// }