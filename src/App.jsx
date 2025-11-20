import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// CONTEXT PROVIDERS
import { AuthProvider } from "./context/AuthContext";
import { EnrollmentProvider } from "./context/EnrollmentContext";

// USER PAGES
import Landing from "./pages/Landing";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyEnrollments from "./pages/MyEnrollments";

// ADMIN PAGES
import AdminDashboard from "./admin/AdminDashboard";
import AdminAddCourse from "./admin/AdminAddCourse";
import AdminEditCourse from "./admin/AdminEditCourse";
import AdminManageCourses from "./admin/AdminManageCourses";
import AdminUsers from "./admin/AdminUsers";
import AdminEnrollments from "./admin/AdminEnrollments";
import AdminLayout from "./admin/AdminLayout";

// ROUTE GUARD
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <EnrollmentProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Landing />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* USER PROTECTED ROUTES */}
            <Route
              path="/enrollments"
              element={
                <ProtectedRoute>
                  <MyEnrollments />
                </ProtectedRoute>
              }
            />

           {/* ADMIN PROTECTED ROUTES */}
<Route
  path="/admin"
  element={
    <ProtectedRoute adminOnly={true}>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<AdminDashboard />} />
  <Route path="courses" element={<AdminManageCourses />} />
  <Route path="add-course" element={<AdminAddCourse />} />
  <Route
  path="/admin/edit/:id"
  element={
    <ProtectedRoute adminOnly={true}>
      <AdminEditCourse />
    </ProtectedRoute>
  }
/>
  <Route path="users" element={<AdminUsers />} />
  <Route path="enrollments" element={<AdminEnrollments />} />
</Route>
          </Routes>

          <Footer />
        </BrowserRouter>
      </EnrollmentProvider>
    </AuthProvider>
  );
}
