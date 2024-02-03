import React from "react";
import { StyledNotFound } from "../../style/layout/StyledNotfound";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    return (
        <StyledNotFound>
            <h1>404</h1>
            <p>Page not found</p>
            <Button
                onClick={() => {
                    navigate("/");
                }}
            >
                Home
            </Button>
        </StyledNotFound>
    );
}

export default NotFound;
