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

                <Route path="/admin" element={<Admin/>}>
                    <Route path="" element={<AdminDashBoard />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
