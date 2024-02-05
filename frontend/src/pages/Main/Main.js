import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { StyledMainPage } from "../../style/layout/StyledMainPage";

function Main() {
    const navigate = useNavigate();
    return (
        <StyledMainPage>
            <h1>당신의 프로젝트를</h1>
            <p>공유하고 창작하세요</p>
            <Button
                onClick={() => {
                    navigate("/dashboard");
                }}
            >
                시작하기
            </Button>
        </StyledMainPage>
    );
}

export default Main;
