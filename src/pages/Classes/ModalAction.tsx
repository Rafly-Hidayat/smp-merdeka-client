import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axiosInstance from "../../AxiosInstance";
import toast from "react-hot-toast";

interface ModalProps {
  close: () => void;
  class_name?: string;
  id?: number;
}

const ModalAction: React.FC<ModalProps> = ({ close, class_name, id }) => {
  const [className, setClassName] = useState(class_name);

  const addClass = async () => {
    console.log("object added");
    await axiosInstance
      .post("classes", { className })
      .then((res) => {
        console.log(res);
        close();
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        toast.error(err?.response?.data?.message || "Failed to add data classe", {
          duration: 2000,
          position: "top-center",
        });
      });
  };

  const editClass = async (id: number) => {
    await axiosInstance
      .post(`classes/${id}`, { className })
      .then((res) => {
        console.log(res);
        close();
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        toast.error(err?.response?.data?.message || "Failed to edit data classes", {
          duration: 2000,
          position: "top-center",
        });
      });
  };

  const handleAction = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(id);
    id ? editClass(id) : addClass();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center w-full h-full px-1 md:px-0">
        <div className="flex flex-col items-center justify-center p-4 lg:py-6 lg:px-8 rounded-xl sm:w-1/2 bg-white w-1/2 shadow-md">
          <div className="flex w-full justify-between p-2 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              { id ? 'Update' : 'Add'}
            </h3>
            <IoMdClose className="cursor-pointer" size={24} onClick={close} />
          </div>

          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleAction}>
              <div className="flex flex-col items-start">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6"
                >
                  Class Name
                </label>
                <div className="mt-2 w-full">
                  <input
                    id="className"
                    name="className"
                    type="text"
                    value={className}
                    placeholder="Insert class Name here"
                    required
                    onChange={(e) => setClassName(e.target.value)}
                    className="block px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:italic focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="flex w-40 justify-center rounded-md bg-btn-login hover:bg-opacity-50 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#1ea9de]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAction;
