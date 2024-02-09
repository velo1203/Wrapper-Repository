import React, { useEffect } from "react";
import { StyledDefaultPage } from "../../style/layout/StyledDefaultPage";
import { Outlet, useNavigate } from "react-router-dom";
import { authenticateAdmin } from "../../service/auth/auth";
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
            <Outlet />
        </StyledDefaultPage>
    );
}

export default Admin;
