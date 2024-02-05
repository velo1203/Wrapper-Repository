import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import {
    StyledMainContainer,
    StyledMainPage,
    StyledMainPageContent,
    StyledMainPageHeader,
    StyledSponsor,
} from "../../style/layout/StyledMainPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

function Main() {
    const navigate = useNavigate();
    const contentRef = useRef(null);
    const scrollToContent = () => {
        contentRef.current.scrollIntoView({ behavior: "smooth" }); // 스크롤을 부드럽게 이동합니다.
    };
    return (
        <StyledMainPage>
            <StyledMainPageHeader>
                <h1>당신의 프로젝트를</h1>
                <p>공유하고 창작하세요</p>
                <Button
                    onClick={() => {
                        navigate("/login");
                    }}
                >
                    시작하기
                </Button>
                <StyledSponsor onClick={scrollToContent}>
                    <p>Show sponsor</p>
                    <FontAwesomeIcon icon={faChevronDown} />
                </StyledSponsor>
            </StyledMainPageHeader>
            <StyledMainPageContent ref={contentRef}>
                <StyledMainContainer>
                    <h1>Sponsor</h1>
                    <p>Sponsor List</p>
                </StyledMainContainer>
            </StyledMainPageContent>
        </StyledMainPage>
    );
}

export default Main;
