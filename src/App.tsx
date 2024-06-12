import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UnprotectedRoutes from "./unprotectedRoutes";
import ProtectedRoutes from "./protectedRoutes";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import StudentPage from "./pages/Students/StudentPage";
import { Toaster } from "react-hot-toast";

import Layout from "./Layout";
import ClassPage from "./pages/Classes/ClassPage";

function App() {
  return (
    <div>
      <Toaster />
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <UnprotectedRoutes>
                <LoginPage />
              </UnprotectedRoutes>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Layout />
              </ProtectedRoutes>
            }
          >
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/students" element={<StudentPage />} />
            <Route path="/classes" element={<ClassPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
