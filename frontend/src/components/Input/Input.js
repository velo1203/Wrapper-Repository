import styled from "styled-components";

export const Input = styled.input`
    width: 100%;
    height: 40px;
    padding: 15px;
    font-size: 15px;
    transition: all 0.2s;
    border-radius: 5px;
    border: 1px solid var(--Black);
    outline: none;
    &:focus {
        border: 1px solid var(--Gray);
    }
`;
