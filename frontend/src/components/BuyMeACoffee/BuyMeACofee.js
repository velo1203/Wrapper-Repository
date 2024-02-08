import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import styled from "styled-components";

const StyledBuyMeACoffee = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    height: 50px;
    width: 175px;
    background-color: var(--Yellow);
    border-radius: 5px;
    border: none;
    cursor: pointer;
    gap: 5px;
    color: var(--Black);
    padding: 10px;
    p {
        font-size: 15px;
        font-weight: bold;
    }
    transition: all 0.2s;
    &:hover {
        opacity: 0.8;
    }
`;

function BuyMeACoffee() {
    const CoffeeURL = "https://www.buymeacoffee.com/hokitoki129";
    return (
        <StyledBuyMeACoffee
            onClick={() => {
                window.open(CoffeeURL);
            }}
        >
            <FontAwesomeIcon icon={faCoffee} />
            <p> Buy me a coffee</p>
        </StyledBuyMeACoffee>
    );
}

export default BuyMeACoffee;
