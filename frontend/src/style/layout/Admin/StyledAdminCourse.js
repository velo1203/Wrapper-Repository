import styled from "styled-components";

export const StyledAdminCourse = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StyledCourseHeader = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledCourseRequest = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2개의 컬럼으로 나누어진 그리드 */
    gap: 20px; /* 그리드 아이템 간의 간격 */
`;

export const StyledRequestSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    h1 {
        font-size: 20px;
        font-weight: 700;
    }
`;

export const StyledRequestHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const StyledCommitLog = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 125px;
    overflow-y: scroll;
    p {
        padding: 10px;
        color: var(--Gray);
        background-color: var(--Input);
        border-radius: 5px;
    }
`;

export const StyledPullRequest = styled.div`
    padding: 15px;
    background-color: var(--Input);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    h1 {
        color: var(--Gray);
        font-size: 18px;
    }
`;

export const StyledCourseContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
`;

export const StyledCourseControl = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 50%;
`;
