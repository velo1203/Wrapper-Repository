import styled from "styled-components";

export const StyledCourse = styled.div`
    border: 1px solid var(--Border);
    transition: all 0.1s ease-in-out;
    img {
        width: 100%;
        object-fit: cover;
    }

    &:hover {
        cursor: pointer;
        opacity: 0.9;
    }
`;

export const StyledCourseContainer = styled.div``;

export const StyledCourseContributors = styled.div`
    border-top: 1px solid var(--Border);
    padding-top: 10px;
    h1 {
        font-size: 17px;
    }
`;

export const StyledContributorProfiles = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`;

export const StyledCProfileIcon = styled.div`
    height: 25px;
    width: 25px; /* 너비 추가 */
    border-radius: 50%; /* 모서리를 완전히 둥글게 */
    overflow: hidden; /* 너비를 넘어가는 이미지를 숨김 */
`;

export const StyledCourseContent = styled.div`
    padding-top: 10px;
    h1 {
        font-size: 24px;
    }
    p {
        font-size: 18px;
    }
`;
