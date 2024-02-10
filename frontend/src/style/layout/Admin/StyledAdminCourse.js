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
    display: flex;
    gap: 20px;
`;
