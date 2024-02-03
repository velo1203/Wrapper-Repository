import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main/Main";
import Header from "./components/Header/Header";
import DashBoard from "./pages/Dashboard/DashBoard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Createrepo from "./pages/CreateRepo/CreateRepo";

function App() {
    return (
        <div className="App">
            <Header />

            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/dashboard">
                    <Route path="" element={<DashBoard />} />
                    <Route path="create" element={<Createrepo />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;
