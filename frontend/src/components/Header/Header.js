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
import { useEffect, useState } from "react";
import { authenticateAdmin } from "../../service/auth/auth";
function Header() {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부 상태
    const logout = useAuthStore((state) => state.logout);
    const username = useAuthStore((state) => state.username);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await authenticateAdmin(); // 관리자 인증
                setIsAdmin(response.admin); // 관리자 여부 상태 업데이트
            } catch (error) {
                console.error("관리자 인증 실패:", error);
                setIsAdmin(false); // 에러 발생 시 관리자가 아님으로 처리
            }
        };

        checkAdmin();
    }, [username]); // username이 변경될 때마다 실행

    return (
        <StyledHeader>
            <StyledHeaderContainer>
                <StyledHeaderTitle onClick={() => navigate("/")}>
                    <h1>Wrapper</h1>
                    <p>Course</p>
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
                            <StyledOption
                                onClick={() => {
                                    navigate("/course");
                                }}
                            >
                                Course
                            </StyledOption>
                            {isAdmin ? (
                                <Button
                                    type="outlined"
                                    onClick={() => {
                                        navigate("/admin");
                                    }}
                                >
                                    Admin
                                </Button>
                            ) : null}
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
