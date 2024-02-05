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

export const StyledSponsor = styled.div`
    position: absolute;
    bottom: 50px;
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
    gap: 20px;
    padding: 50px;
    margin: 0 auto;
    max-width: 1200px;
    p {
        font-size: 23px;
    }
`;
