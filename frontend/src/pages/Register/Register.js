import React, { useState } from "react";
import {
    StyledForm,
    StyledFormContainer,
    StyledFormHeader,
    StyledFormInputField,
} from "../../style/layout/StyledForm";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { register } from "../../service/auth/auth";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setUserName] = useState("");
    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match");
            return;
        }
        try {
            await register(email, password, userName);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <StyledForm>
            <StyledFormContainer>
                <StyledFormHeader>
                    <h1>Wrapper</h1>
                    <p>Repo</p>
                </StyledFormHeader>
                <StyledFormInputField>
                    <Input
                        placeholder="Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <Input
                        placeholder="UserName"
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <Input
                        placeholder="Confirm Password"
                        type="password"
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                </StyledFormInputField>
                <Button
                    width="100%"
                    onClick={() => {
                        handleRegister();
                    }}
                >
                    Register
                </Button>
            </StyledFormContainer>
        </StyledForm>
    );
}

export default Register;
