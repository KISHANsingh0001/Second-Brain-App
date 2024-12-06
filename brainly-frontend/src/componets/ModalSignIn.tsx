
export function ModalSignIn({ show, onClose }:any) {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm transform transition-all duration-300 scale-100">
          <div className="flex items-center justify-center mb-4">
            <svg
              className="h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2l4-4m0 0a9 9 0 11-6.364-2.636A9 9 0 0112 21a9 9 0 010-18z"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center mb-4">
            Signed In Successful
          </h2>
          <p className="text-center text-gray-700 mb-4">
            You have Signed In successfully! Please Wait Redirecting to the dashboard...
          </p>
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Close
          </button>
        </div>
      </div>
    );
  }