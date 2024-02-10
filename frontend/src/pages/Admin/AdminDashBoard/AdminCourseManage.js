import React from "react";
import {
    StyledControlSection,
    StyledCourseManage,
    StyledCourseManageControl,
    StyledPreviewCourse,
    StyledPreviewCourseContent,
    StyledCourseControlSection,
} from "../../../style/layout/Admin/StyledAdminCourseManage";
import sampleImg from "../../../asset/react.png";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import DragAndDropUpload from "../../../components/DragAndDropUpload/DragAndDropUpload";
function AdminCourseManage() {
    return (
        <StyledCourseManage>
            <StyledCourseControlSection>
                <h1>Course Management</h1>
            </StyledCourseControlSection>
            <StyledCourseControlSection>
                <StyledPreviewCourse>
                    <p>Preview</p>
                    <StyledPreviewCourseContent>
                        <img src={sampleImg} alt="React" />
                        <h1>React Course</h1>
                        <p>Course Description</p>
                    </StyledPreviewCourseContent>
                </StyledPreviewCourse>
                <StyledCourseManageControl>
                    <StyledControlSection>
                        <h1>Course ManageMent</h1>
                        <p>Course에 대한 제목과 설명</p>
                        <Input type="text" placeholder="Title" />
                        <Input type="text" placeholder="Description" />
                    </StyledControlSection>
                    <StyledControlSection>
                        <h1>Course Image</h1>
                        <p>Course Image set</p>
                        <DragAndDropUpload />
                    </StyledControlSection>
                </StyledCourseManageControl>
            </StyledCourseControlSection>
            <StyledCourseControlSection>
                <h1>Contributor Management</h1>
            </StyledCourseControlSection>
            <StyledCourseControlSection>
                <h1>Contributor Management</h1>
            </StyledCourseControlSection>
        </StyledCourseManage>
    );
}

export default AdminCourseManage;
