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

export const StyledDashboardTable = styled.table`
    width: 100%;
    margin-top: 50px;
    border-collapse: collapse;
`;

export const TableHeaderCell = styled.th`
    padding: 15px 20px;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    color: var(--Gray);
`;

export const TableCell = styled.td`
    padding: 15px 20px;
    font-size: 18px;
    font-weight: normal;
    border-bottom: 2px solid var(--BorderColor);
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; /* 텍스트가 오버플로우 될 때 "..."으로 표시 */
    max-width: 150px; /* 최대 너비 설정, 필요에 따라 조정해주세요 */

    a {
        color: var(--Gray);
    }
    a:hover {
        opacity: 0.8;
    }
`;
