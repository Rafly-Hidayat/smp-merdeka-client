import { useState } from "react";
import StudentPage from "./pages/Students/StudentPage";
import ClassPage from "./pages/Classes/ClassPage";
import logo from "./assets/main_logo.png";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("student");
  const dataUser = JSON.parse(localStorage.getItem("user") || "{}");
  const { username, email } = dataUser;

  const HandleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="">
      <div className="h-20 flex justify-between items-center my-2 mr-4">
        <div className="flex items-center">
          <img src={logo} className="mx-auto h-40 w-auto" />
          <div className="text-center font-bold text-2xl">SMP Merdeka</div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex flex-col items-start">
            <div className="font-semibold">{username || "Guest"}</div>
            <div className="font-light">{email || "guest@example.com"}</div>
          </div>
          <div className="cursor-pointer" onClick={HandleLogout}>
            <IoMdLogOut className="text-red-500" size={30} />
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200 dark:border-gray-700 m-4">
        <ul
          className="flex flex-wrap -mb-px"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          <li className="mr-2" role="presentation">
            <button
              className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
                activeTab === "student" && "border-blue-500 text-blue-500"
              }`}
              id="student-tab"
              data-tabs-target="#student"
              type="button"
              role="tab"
              aria-controls="student"
              aria-selected="false"
              onClick={() => setActiveTab("student")}
            >
              Students
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
                activeTab === "class" && "border-blue-500 text-blue-500"
              }`}
              id="class-tab"
              data-tabs-target="#class"
              type="button"
              role="tab"
              aria-controls="class"
              aria-selected="true"
              onClick={() => setActiveTab("class")}
            >
              Classes
            </button>
          </li>
        </ul>
      </div>

      <div id="myTabContent">
        {activeTab === "student" && <StudentPage />}
        {activeTab === "class" && <ClassPage />}
      </div>
    </div>
  );
}
