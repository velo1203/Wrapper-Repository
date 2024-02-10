import React from "react";
import {
    StyledAdminCourse,
    StyledCourseContainer,
    StyledCourseControl,
    StyledCourseHeader,
} from "../../../style/layout/Admin/StyledAdminCourse";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import SampleImage from "../../../asset/react.png";
import {
    StyledCProfileIcon,
    StyledContributorProfiles,
    StyledCourse,
    StyledCourseContent,
    StyledCourseContributors,
    StyledCourseFooter,
} from "../../../style/layout/StyledCourse";

import sampleProfile from "../../../asset/profile.jpg";
import { useNavigate } from "react-router-dom";
function AdminCourse() {
    const navigate = useNavigate();
    return (
        <StyledAdminCourse>
            <StyledCourseHeader>
                <h1>Course Management</h1>
                <StyledCourseControl>
                    <Input type="text" placeholder="Search" />
                    <Button>Create</Button>
                </StyledCourseControl>
            </StyledCourseHeader>
            <StyledCourseContainer>
                <StyledCourse
                    onClick={() => {
                        navigate("manage");
                    }}
                >
                    <img src={SampleImage} />
                    <StyledCourseContainer>
                        <StyledCourseContent>
                            <h1>React Course</h1>
                            <p>React Course Description</p>
                        </StyledCourseContent>
                        <StyledCourseContributors>
                            <h1>Contributors</h1>
                            <StyledContributorProfiles>
                                <StyledCProfileIcon>
                                    <img src={sampleProfile} />
                                </StyledCProfileIcon>
                            </StyledContributorProfiles>
                        </StyledCourseContributors>
                    </StyledCourseContainer>
                </StyledCourse>
            </StyledCourseContainer>
        </StyledAdminCourse>
    );
}

export default AdminCourse;
