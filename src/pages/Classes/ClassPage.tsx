import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstance";
import ModalAction from "./ModalAction";

interface Class {
    class_name: string;
    id: number;
}

export default function ClassPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [modalAction, setModalAction] = useState<boolean>(false);
  const [classStudent, setClass] = useState<Class>();

  const getClasses = async () => {
    await axiosInstance
      .get("Classes")
      .then((res) => {
        setClasses(res?.data?.data);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
      });
  };

  const closeModal = () => {
    getClasses();
    setClass(undefined);
    setModalAction(false);
  };

  const handleDelete = async (id: number) => {
    await axiosInstance.delete(`classes/${id}`).then((res) => {
      console.log(res?.data?.data);
      getClasses();
    })
    .catch((err) => {
      console.log(err?.response?.data?.message);
    });
  }

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-screen m-4">
      <div className="m-4 flex justify-between items-center">
        <div>
          <div className="text-4xl font-semibold">Clsses</div>
          <div>List Class of SMP Merdeka</div>
        </div>
        <div>
          <button
            className="flex w-40 justify-center rounded-md bg-btn-login hover:bg-opacity-50 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#1ea9de]"
            onClick={()  => setModalAction(true)}
          >
            Add New Class
          </button>
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Class Name
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {classes?.map((classMap, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {classMap.class_name}
              </th>
              <td className="px-1 py-4">
                <div className="flex justify-center items-center space-x-4">
                  <a
                    onClick={() => {
                      setClasses(classes);
                      setModalAction(true);
                    }}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                  >
                    Update
                  </a>
                  <a
                    onClick={() => handleDelete(classMap.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 md:inline md:w-auto">
          {classes.length} Classes
        </span>
      </nav>
      {modalAction && (
        <ModalAction
          close={closeModal}
          class_name={classStudent?.class_name}
          id={classStudent?.id}
        />
      )}
    </div>
  );
}
