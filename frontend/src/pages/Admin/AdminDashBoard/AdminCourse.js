import React from "react";
import {
    StyledAdminCourse,
    StyledCommitLog,
    StyledCourseContainer,
    StyledCourseControl,
    StyledCourseHeader,
    StyledCourseRequest,
    StyledPullRequest,
    StyledRequestHeader,
    StyledRequestSection,
} from "../../../style/layout/Admin/StyledAdminCourse";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCodeCommit,
    faCodePullRequest,
    faCommenting,
} from "@fortawesome/free-solid-svg-icons";

function AdminCourse() {
    return (
        <StyledAdminCourse>
            <StyledCourseHeader>
                <h1>Course Management</h1>
            </StyledCourseHeader>
            <StyledCourseRequest>
                <StyledRequestSection>
                    <StyledRequestHeader>
                        <FontAwesomeIcon icon={faCodeCommit} />
                        <h1>Commit Log</h1>
                    </StyledRequestHeader>
                    <StyledCommitLog>
                        <p>2024-2-10 commit log example</p>
                        <p>2024-2-10 commit log example</p>
                        <p>2024-2-10 commit log example</p>
                        <p>2024-2-10 commit log example</p>
                    </StyledCommitLog>
                </StyledRequestSection>
                <StyledRequestSection>
                    <StyledRequestHeader>
                        <FontAwesomeIcon icon={faCodePullRequest} />
                        <h1>Pull Request</h1>
                    </StyledRequestHeader>
                    <StyledPullRequest>
                        <h1>24 Unprocessed Requests</h1>
                        <Button>View</Button>
                    </StyledPullRequest>
                </StyledRequestSection>
            </StyledCourseRequest>
            <StyledCourseContainer>
                <StyledCourseHeader>
                    <h1>Course List</h1>
                    <StyledCourseControl>
                        <Input type="text" placeholder="Search" />
                        <Button>Create</Button>
                    </StyledCourseControl>
                </StyledCourseHeader>
            </StyledCourseContainer>
        </StyledAdminCourse>
    );
}

export default AdminCourse;
