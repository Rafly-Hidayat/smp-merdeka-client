import { useState } from "react";
import logo from "../assets/main_logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../AxiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //   const [isLogging, setisLogging] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    await axiosInstance
      .post("users/login", data)
      .then((res) => {
        const dataUser = JSON.stringify(res?.data?.data);
        localStorage.setItem("user", dataUser);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        toast.error(err?.response?.data?.message || "Login Failed", {
          duration: 2000,
          position: "top-center",
        });
      });
  };

  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover flex items-center justify-center"
      style={{ backgroundImage: `url('background.svg')` }}
    >
      <div className="flex items-center justify-center w-full px-4 md:px-0">
        <div className="flex flex-col items-center justify-center p-4 lg:py-6 lg:px-8 rounded-xl sm:w-1/4 bg-white bg-opacity-70 w-full shadow-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm space-y-4">
            <img className="mx-auto h-40 w-auto" src={logo} />
            <div className="justify-center items-center w-full">
              <div className="text-center font-bold text-2xl">SMP Merdeka</div>
            </div>

            <div className="bg-gradient-to-r from-transparent via-gray-500 to-transparent h-px"></div>
          </div>

          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6"
                >
                  username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    placeholder="Insert username here"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    className="block px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:italic focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    placeholder="Insert password here"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:italic focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer text-gray-600"
                  >
                    {showPassword ? (
                      <FaEye className="h-5 w-5" />
                    ) : (
                      <FaEyeSlash className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="flex w-40 justify-center rounded-md bg-btn-login hover:bg-opacity-50 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#1ea9de]"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
