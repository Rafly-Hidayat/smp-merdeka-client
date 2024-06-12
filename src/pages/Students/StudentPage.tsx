import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstance";
import ModalAction from "./ModalAction";
import toast from "react-hot-toast";

interface Student {
  id: number;
  name: string;
  address: string;
  class: {
    class_name: string;
    id: string;
  };
}

export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [modalAction, setModalAction] = useState<boolean>(false);
  const [student, setStudent] = useState<Student>();

  const getStudents = async () => {
    await axiosInstance
      .get("students")
      .then((res) => {
        setStudents(res?.data?.data);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
      });
  };

  const closeModal = () => {
    getStudents();
    setStudent(undefined);
    setModalAction(false);
  };

  const handleDelete = async (id: number) => {
    await axiosInstance.delete(`students/${id}`).then((res) => {
      console.log(res?.data?.data);
      getStudents();
    })
    .catch((err) => {
      console.log(err?.response?.data?.message);
      toast.error(err?.response?.data?.message || "Failed to get data students", {
        duration: 2000,
        position: "top-center",
      });
    });
  }

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-screen m-4">
      <div className="m-4 flex justify-between items-center">
        <div>
          <div className="text-4xl font-semibold">Students</div>
          <div>List Student of SMP Merdeka</div>
        </div>
        <div>
          <button
            className="flex w-40 justify-center rounded-md bg-btn-login hover:bg-opacity-50 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#1ea9de]"
            onClick={()  => setModalAction(true)}
          >
            Add New Students
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
              Full Name
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Class
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {students?.map((student, index) => (
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
                {student.name}
              </th>
              <td className="px-6 py-4">{student.address}</td>
              <td className="px-6 py-4">{student.class.class_name}</td>
              <td className="px-1 py-4">
                <div className="flex justify-center items-center space-x-4">
                  <a
                    onClick={() => {
                      setStudent(student);
                      setModalAction(true);
                    }}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                  >
                    Update
                  </a>
                  <a
                    onClick={() => handleDelete(student.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
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
          {students.length} Students
        </span>
      </nav>
      {modalAction && (
        <ModalAction
          close={closeModal}
          name={student?.name}
          address={student?.address}
          classId={student?.class.id}
          id={student?.id}
        />
      )}
    </div>
  );
}
