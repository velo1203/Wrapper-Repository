import React, { useEffect } from "react";
import { StyledDefaultPage } from "../../style/layout/StyledDefaultPage";
import { Outlet, useNavigate } from "react-router-dom";
import { authenticateAdmin } from "../../service/auth/auth";
import SideBar from "../../components/SideBar/SideBar";
import SideBarConfig from "../../Config/AdminSideBarConfig.json";
function Admin() {
    const navigate = useNavigate();
    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await authenticateAdmin();
                console.log(response);
            } catch (error) {
                navigate("/");
            }
        };
        checkAdmin();
    });
    return (
        <StyledDefaultPage>
            <SideBar config={SideBarConfig} />
            <Outlet />
        </StyledDefaultPage>
    );
}

export default Admin;
