import styled from "styled-components";

export const StyledDashBoardHeader = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    & h1 {
        font-size: 30px;
    }
`;

export const StyledDashBoardHeaderOptions = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: right;
    width: 500px;
`;
