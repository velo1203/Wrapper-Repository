import styled from "styled-components";

export const StyledCourseManage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 50px;
`;

export const StyledPreviewCourse = styled.div`
    display: flex;
    flex-direction: column;
    p {
        font-size: 20px;
        font-weight: 700;
    }
`;

export const StyledPreviewCourseContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid var(--Border);
    margin-top: 20px;
    h1 {
        font-size: 20px;
        font-weight: 700;
        padding: 10px;
    }
    p {
        font-size: 18px;
        font-weight: normal;
        padding: 0px 0px 20px 10px;
    }
`;

export const StyledCourseManageControl = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1; /* 추가된 속성 */
    width: 1000px; /* 추가된 속성 */
`;

export const StyledCourseControlSection = styled.div`
    display: flex;
    gap: 20px; /* 간격 조정 */
    h1 {
        font-size: 30px;
        font-weight: 700;
    }
`;

export const StyledControlSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    width: 100%; /* 전체 너비 사용 */
    h1 {
        font-size: 20px;
        font-weight: 700;
    }
`;
