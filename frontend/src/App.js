import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main/Main";
import Header from "./components/Header/Header";
import DashBoard from "./pages/Dashboard/DashBoard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Createrepo from "./pages/CreateRepo/CreateRepo";
import NotFound from "./pages/NotFound/404";
import AdminDashBoard from "./pages/Admin/AdminDashBoard/AdminDashBoard";
import Admin from "./pages/Admin/Admin";
import Course from "./pages/Course/Course";
import AdminCourse from "./pages/Admin/AdminDashBoard/AdminCourse";
import AdminCourseManage from "./pages/Admin/AdminDashBoard/AdminCourseManage";
import AdminCourseCreate from "./pages/Admin/AdminDashBoard/AdminCourseCreate";

function App() {
    return (
        <div className="App">
            <Header />

            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Main />} />
                <Route path="/dashboard">
                    <Route path="" element={<DashBoard />} />
                    <Route path="create" element={<Createrepo />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/course">
                    <Route path="" element={<Course />} />
                </Route>
                <Route path="/admin" element={<Admin />}>
                    <Route path="" element={<AdminDashBoard />} />
                    <Route path="course" element={<AdminCourse />} />
                    <Route
                        path="course/manage"
                        element={<AdminCourseManage />}
                    />
                    <Route
                        path="course/create"
                        element={<AdminCourseCreate />}
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
