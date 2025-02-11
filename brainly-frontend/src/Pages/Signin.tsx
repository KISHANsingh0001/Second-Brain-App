import { useRef, useState } from "react";
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
      setShow(true); // Show success modal
      setTimeout(()=>{
       navigate("/dash")
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
            <Input placeholder="Enter your Email" reference={emailRef} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <Input placeholder="Enter Your Password" reference={passwordRef} />
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
