import styled from "styled-components";

export const StyledCreateRepo = styled.div`
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 650px;
    p {
        font-size: 18px;
    }
`;

export const StyledCreateRepoField = styled.div`
    display: flex;
    flex-direction: column;

    label {
        font-size: 16px;
        margin: 5px;
    }
    input {
        height: 50px;
    }
`;

export const StyledImportant = styled.span`
    color: var(--Red);
    font-size: 20px;
    font-weight: bold;
`;

export const StyledExampleLink = styled.p`
    color: var(--Gray);
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
        opacity: 0.8;
    }
`;

export const StyledCreateRepoZip = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;
`;

export const StyledCreateRepoButtons = styled.div`
    margin-top: 25px;
    display: flex;
    gap: 20px;
    align-items: center;
`;
