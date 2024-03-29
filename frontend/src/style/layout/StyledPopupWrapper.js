import styled from "styled-components";

export const StyledPopupBackground = styled.div`
    position: fixed; /* 고정 위치 */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* 반투명 검정색 */
    display: flex;
    align-items: center; /* 수직 정렬 */
    justify-content: center; /* 수평 정렬 */
    z-index: 1000; /* 다른 요소보다 상위에 위치 */
    overflow-y: auto;
`;

export const StyledPopupContent = styled.div`
    background-color: var(--White); /* 배경색 */
    padding: 20px; /* 내부 여백 */
    border-radius: 10px; /* 모서리 둥글게 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
    max-width: 720px; /* 최대 너비 */
    width: 90%; /* 너비 */
`;
