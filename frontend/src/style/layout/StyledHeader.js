import styled from "styled-components";

export const StyledHeader = styled.div`
    position: fixed;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    height: 70px;
    width: 100%;
    padding: 25px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    background: rgba(255, 255, 255, 0.2);
`;

export const StyledHeaderContainer = styled.div`
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 20px;
    margin: 0 auto;
    max-width: 1200px;
`;

export const StyledHeaderTitle = styled.div`
    display: flex;
    cursor: pointer;
    align-items: flex-end;
    gap: 3px;
    h1 {
        font-size: 28px;
    }
    p {
        font-size: 18px;
        color: var(--Gray);
        font-weight: lighter;
        margin-bottom: 1px;
    }
`;

export const StyledHeaderOptions = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    font-size: 18px;
    margin-bottom: 1px;
`;

export const StyledOption = styled.p`
    font-weight: lighter;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;
