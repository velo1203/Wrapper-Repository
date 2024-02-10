import styled from "styled-components";

export const DragAndDropContainer = styled.div`
    border: 2px dashed var(--Border);
    background-color: var(--Input);
    border-radius: 5px;
    height: 125px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;
export const DragAndDropText = styled.p`
    text-align: center;
`;
