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

export const StyledCourseControl = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 50%;
`;

export const StyledCourseContainer = styled.div`
    padding: 20px;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(
        auto-fill,
        minmax(300px, 1fr)
    ); // 그리드 아이템이 최소 250px, 최대 1fr의 너비를 가지도록 설정
`;
