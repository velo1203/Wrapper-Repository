import React, { useState } from "react";
import {
    StyledSideBar,
    StyledSideBarSection,
    StyledSideBarSectionItem,
    StyledSideBarSectionLabel,
} from "../../style/layout/StyledSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
function SideBar({ config }) {
    const [selectedItem, setSelectedItem] = useState(0);
    const navigate = useNavigate();
    const handleItemClick = (itemId) => {
        setSelectedItem(itemId); // 선택된 항목의 상태를 업데이트합니다.
    };
    const mapIcon = (iconName) => {
        // iconName이 'faTable'과 같은 형태일 때, Icons에서 해당 아이콘을 찾습니다.
        return Icons[iconName];
    };
    return (
        <StyledSideBar>
            {config.map((section, index) => (
                <StyledSideBarSection key={index}>
                    <StyledSideBarSectionLabel>
                        {section.label}
                    </StyledSideBarSectionLabel>
                    {section.items.map((item, index) => (
                        <StyledSideBarSectionItem
                            selected={selectedItem === index}
                            key={index}
                            onClick={() => {
                                handleItemClick(index);
                                navigate(item.route);
                            }}
                        >
                            <div>
                                <FontAwesomeIcon icon={mapIcon(item.icon)} />
                                <p>{item.label}</p>
                            </div>
                            <span>
                                {selectedItem === index && (
                                    <FontAwesomeIcon
                                        icon={mapIcon("faAngleRight")}
                                    />
                                )}
                            </span>
                        </StyledSideBarSectionItem>
                    ))}
                </StyledSideBarSection>
            ))}
        </StyledSideBar>
    );
}

export default SideBar;
