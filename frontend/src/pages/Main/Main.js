import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import {
    SectionIcon,
    SectionIconList,
    StyledInfo,
    StyledMainContainer,
    StyledMainPage,
    StyledMainPageContent,
    StyledMainPageHeader,
    StyledMainSections,
    StyledSection,
    StyledSponsor,
} from "../../style/layout/StyledMainPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import {
    faGithub,
    faInstagram,
    faNpm,
} from "@fortawesome/free-brands-svg-icons";
import BuyMeACoffee from "../../components/BuyMeACoffee/BuyMeACofee";

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
                <StyledInfo onClick={scrollToContent}>
                    <p>Show Info</p>
                    <FontAwesomeIcon icon={faChevronDown} />
                </StyledInfo>
            </StyledMainPageHeader>
            <StyledMainPageContent ref={contentRef}>
                <StyledMainContainer>
                    <h1>Information</h1>
                    <StyledMainSections>
                        <StyledSection>
                            <h1>Donate!</h1>
                            <BuyMeACoffee />
                        </StyledSection>
                        <StyledSection>
                            <h1>Copyright</h1>
                            <p>ⓒ 2024. Devho all rights reserved.</p>
                            <p>
                                This project is licensed under the{" "}
                                <strong>MIT</strong> License
                            </p>
                        </StyledSection>
                        <StyledSection>
                            <h1>Follow my SNS</h1>
                            <SectionIconList>
                                <SectionIcon
                                    onClick={() => {
                                        window.open(
                                            "https://www.instagram.com/dev._ho/"
                                        );
                                    }}
                                >
                                    <FontAwesomeIcon icon={faInstagram} />
                                </SectionIcon>
                                <SectionIcon
                                    onClick={() => {
                                        window.open(
                                            "https://github.com/velo1203"
                                        );
                                    }}
                                >
                                    <FontAwesomeIcon icon={faGithub} />
                                </SectionIcon>
                                <SectionIcon>
                                    <FontAwesomeIcon
                                        icon={faNpm}
                                        onClick={() => {
                                            window.open(
                                                "https://www.npmjs.com/~devho"
                                            );
                                        }}
                                    />
                                </SectionIcon>
                            </SectionIconList>
                        </StyledSection>
                    </StyledMainSections>
                </StyledMainContainer>
            </StyledMainPageContent>
        </StyledMainPage>
    );
}

export default Main;
