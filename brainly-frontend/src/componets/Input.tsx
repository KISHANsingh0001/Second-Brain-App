import { useState } from "react";
import EyeIcon from "../icon/Eyeicon";
import EyeOffIcon from "../icon/EyeOfficon";

interface InputProps {
  placeholder: string;
  reference: any;
  type?: "text" | "password";
}

export function Input({ placeholder, reference, type = "text" }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center relative">
      <input
        ref={reference}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={showPassword && type === "password" ? "text" : type}
        placeholder={placeholder}
      />
      {type === "password" && (
        <div
          className="absolute right-3 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword == false ? <EyeOffIcon/> : <EyeIcon/>}
        </div>
      )}
    </div>
  );
}