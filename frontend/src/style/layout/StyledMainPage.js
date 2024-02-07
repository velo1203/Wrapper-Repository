import styled from "styled-components";

export const StyledMainPage = styled.div``;

export const StyledMainPageHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 20px;
    h1 {
        font-size: 40px;
    }
    p {
        font-size: 25px;
    }
`;

export const StyledInfo = styled.div`
    position: absolute;
    bottom: 100px;
    font-size: 15px;
    text-align: center;
    cursor: pointer;
    color: var(--Gray);
    transition: all 0.3s ease;
    &:hover {
        color: var(--Black);
    }
`;

export const StyledMainPageContent = styled.div`
    height: 400px;
    background-color: var(--Black);
    color: var(--White);
`;

export const StyledMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 50px;
    margin: 0 auto;
    max-width: 1200px;
    p {
        font-size: 23px;
    }
`;

export const StyledMainSections = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const StyledSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    p {
        font-size: 20px;
    }
    h1 {
        font-size: 24px;
    }
`;

export const SectionIconList = styled.div`
    display: flex;
    gap: 20px;
    font-size: 20px;
`;

export const SectionIcon = styled.div`
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 30px;
    &:hover {
        opacity: 0.8;
    }
`;
