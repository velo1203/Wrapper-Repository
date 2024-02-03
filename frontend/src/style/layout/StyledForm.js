import styled from "styled-components";

export const StyledForm = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledFormHeader = styled.div`
    justify-content: center;
    display: flex;
    align-items: flex-end;
    gap: 3px;
    padding-bottom: 20px;
    p {
        font-size: 20px;
        color: var(--Gray);
        margin-bottom: 2px;
    }
`;

export const StyledFormContainer = styled.div`
    width: 400px;
    padding: 30px;
    border: 1px solid var(--BorderColor);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 35px;
    box-shadow: var(--BoxShadow);
`;

export const StyledError = styled.p`
    color: var(--Red);
    font-size: 15px;
`;

export const StyledFormInputField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const StyledFormOptions = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0px 5px;
    p {
        color: var(--Gray);
        font-size: 15px;
        cursor: pointer;
    }
    p:hover {
        text-decoration: underline;
        color: var(--Black);
    }
`;
