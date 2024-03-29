import styled from "styled-components";

export const StyledAdminChapter = styled.table`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const StyledChapterHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    h1 {
        font-size: 24px;
    }
`;

export const StyledChapterControl = styled.div`
    display: flex;
    gap: 10px;
    min-width: 400px;
`;

export const StyledChapterTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const StyledChapterSection = styled.div`
    display: flex;
    margin-bottom: 10px;
    font-size: 17px;
    justify-content: space-between;
    background-color: var(--Input);
    padding: 10px 20px;
    align-items: center;
`;
