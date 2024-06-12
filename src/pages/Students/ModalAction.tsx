import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import axiosInstance from "../../AxiosInstance";
import toast from "react-hot-toast";

interface ModalProps {
  close: () => void;
  name?: string;
  address?: string;
  class?: {
    class_name?: string;
  };
  classId?: string;
  id?: number;
}

interface Class {
  id: number;
  class_name: string;
}

const ModalAction: React.FC<ModalProps> = ({ close, name, address, classId, id }) => {
  const [studentName, setStudentName] = useState(name);
  const [studentAddress, setStudentAddress] = useState(address);
  const [classIdState, setClassIdState] = useState(classId);
  const [classes, setClasses] = useState<Class[]>([]);

  const addStudent = async () => {
    console.log('object added')
    if (!classIdState) {
      toast.error("Please select class", {
        duration: 2000,
        position: "top-center",
      });
      return
    }
    await axiosInstance
      .post("students", { name: studentName, address: studentAddress, classId: classIdState })
      .then((res) => {
        console.log(res);
        close();
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        toast.error(err?.response?.data?.message || "Failed to add data student", {
          duration: 2000,
          position: "top-center",
        });
      });
  };

  const editStudent = async (id: number) => {
    await axiosInstance
      .post(`students/${id}`, { name: studentName, address: studentAddress, classId: classIdState })
      .then((res) => {
        console.log(res);
        close();
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        toast.error(err?.response?.data?.message || "Failed to edit data student", {
          duration: 2000,
          position: "top-center",
        });
      });
  };

  const handleAction = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(id)
    id ? editStudent(id) : addStudent();
  };

  useEffect(() => {
    const getClasses = async () => {
      await axiosInstance
        .get("classes")
        .then((res) => {
          setClasses(res?.data?.data);
        })
        .catch((err) => {
          console.log(err?.response?.data?.message);
          toast.error(err?.response?.data?.message || "Failed to get data classes", {
            duration: 2000,
            position: "top-center",
          });
        });
    };

    getClasses();
  }, []);

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
                  Name
                </label>
                <div className="mt-2 w-full">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={studentName}
                    placeholder="Insert name here"
                    required
                    onChange={(e) => setStudentName(e.target.value)}
                    className="block px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:italic focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex flex-col items-start">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6"
                >
                  Address
                </label>
                <div className="mt-2 w-full">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={studentAddress}
                    placeholder="Insert address here"
                    required
                    onChange={(e) => setStudentAddress(e.target.value)}
                    className="block px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:italic focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex flex-col items-start">
                <label
                  htmlFor="className"
                  className="block text-sm font-medium leading-6"
                >
                  Class Name
                </label>
                <div className="mt-2 w-full">
                  <select
                    id="className"
                    name="className"
                    value={classIdState}
                    required
                    defaultValue={1}
                    onChange={(e) => setClassIdState(e.target.value)}
                    className="block px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:italic focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>===SELECT CLASS===</option>
                    {classes.map((classOption) => (
                      <option key={classOption.id} value={classOption.id}>
                        {classOption.class_name}
                      </option>
                    ))}
                  </select>
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
