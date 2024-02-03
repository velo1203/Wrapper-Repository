import { useNavigate } from "react-router-dom";
import {
    StyledHeader,
    StyledHeaderContainer,
    StyledHeaderOptions,
    StyledHeaderTitle,
    StyledOption,
} from "../../style/layout/StyledHeader";
import { Button } from "../Button/Button";
import useAuthStore from "../../store/userStore";
function Header() {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const username = useAuthStore((state) => state.username);
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <StyledHeader>
            <StyledHeaderContainer>
                <StyledHeaderTitle onClick={() => navigate("/")}>
                    <h1>Wrapper</h1>
                    <p>Repository</p>
                </StyledHeaderTitle>
                <StyledHeaderOptions>
                    {username !== null ? (
                        <>
                            <StyledOption
                                onClick={() => {
                                    navigate("/dashboard");
                                }}
                            >
                                {username}
                            </StyledOption>
                            <Button
                                onClick={() => {
                                    handleLogout();
                                }}
                            >
                                logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                type="outlined"
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </Button>
                            <Button onClick={() => navigate("/login")}>
                                Login
                            </Button>
                        </>
                    )}
                </StyledHeaderOptions>
            </StyledHeaderContainer>
        </StyledHeader>
    );
}

export default Header;
