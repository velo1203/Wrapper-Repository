import styled from "styled-components";

export const StyledSideBar = styled.div`
    width: 250px;
    height: 100%;
    margin-top: 70px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    padding-top: 50px;
    background-color: var(--White);
    border-right: 1px solid var(--Border);
`;

export const StyledSideBarSection = styled.div`
    padding: 5px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 10px;
`;
export const StyledSideBarSectionLabel = styled.div`
    color: var(--Gray);
    padding: 10px;
`;

export const StyledSideBarSectionItem = styled.div`
    padding: 15px 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    cursor: pointer;
    color: ${(props) => (props.selected ? "var(--Black)" : "var(--Gray)")};
    background-color: ${(props) => (props.selected ? "#f5f5f5" : "")};
    gap: 10px;
    transition: all 0.3s ease;
    &:hover {
        background-color: #f5f5f5;
    }
    div {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;
