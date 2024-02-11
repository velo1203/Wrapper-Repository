import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const DropdownButton = styled.div`
    cursor: pointer;
    padding: 10px;
    display: flex;
    align-items: center;
`;

const DropdownContent = styled.div`
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
`;

const DropdownItem = styled.a`
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;

    &:hover {
        background-color: #f1f1f1;
    }
`;

function Dropdown({ items }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <DropdownContainer ref={dropdownRef}>
            <DropdownButton onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faEllipsisV} />
            </DropdownButton>
            {isOpen && (
                <DropdownContent>
                    {items.map((item, index) => (
                        <DropdownItem
                            key={index}
                            href="#"
                            onClick={() => {
                                item.action();
                                setIsOpen(false);
                            }}
                        >
                            {item.label}
                        </DropdownItem>
                    ))}
                </DropdownContent>
            )}
        </DropdownContainer>
    );
}

export default Dropdown;
