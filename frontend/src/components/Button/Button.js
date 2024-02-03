import styled from "styled-components";

export const Button = styled.button`
    min-height: 40px;
    width: ${(props) => props.width || "125px"};
    font-size: 15px;
    background-color: ${(props) =>
        props.type === "outlined" ? "var(--White)" : "var(--Black)"};
    color: ${(props) =>
        props.type === "outlined" ? "var(--Black)" : "var(--White)"};
    border: ${(props) =>
        props.type === "outlined" ? "1px solid var(--Black)" : "none"};
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    transition: all 0.2s ease-in-out;

    &:hover {
        opacity: 0.8;
    }
`;
