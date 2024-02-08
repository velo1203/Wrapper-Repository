import styled from "styled-components";

export const StyledRepoDetail = styled.div`
    cursor: default;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
`;

export const StyledRepoDetailFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 20px;
`;
export const StyledRepoDetailWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); // 반응형 그리드
    gap: 20px; // 그리드 아이템 간의 간격
    padding: 20px; // 패딩 추가
`;


export const StyledRepoDetailSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px; // 간격 조정
    padding: 15px; // 패딩 추가

    h1 {
        font-size: 23px; // 폰트 사이즈 조정
        color: #333; // 폰트 색상 변경
        margin-bottom: 5px; // 하단 여백 추가
    }

    p {
        font-size: 16px; // 폰트 사이즈 조정
        color: #666; // 폰트 색상 변경
    }
`;