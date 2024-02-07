import React, { useState } from "react";
import {
    StyledError,
    StyledForm,
    StyledFormContainer,
    StyledFormHeader,
    StyledFormInputField,
    StyledFormOptions,
} from "../../style/layout/StyledForm";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { login } from "../../service/auth/auth";
import useAuthStore from "../../store/userStore";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const setAuth = useAuthStore((state) => state.setAuth);
    const [error, setError] = useState("");
    const handleLogin = async () => {
        try {
            const response = await login(email, password);
            setAuth({ token: response.token, username: response.username });
            navigate("/dashboard");
        } catch (error) {
            setError(error.response.data.error);
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
                        type="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    {error && <StyledError>{error}</StyledError>}
                </StyledFormInputField>
                <StyledFormOptions>
                    <p>Forgot password</p>
                    <p
                        onClick={() => {
                            navigate("/register");
                        }}
                    >
                        Register
                    </p>
                </StyledFormOptions>
                <Button
                    width="100%"
                    onClick={() => {
                        handleLogin();
                    }}
                >
                    Login
                </Button>
            </StyledFormContainer>
        </StyledForm>
    );
}
export default Login;
