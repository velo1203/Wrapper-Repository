import React, { useEffect, useState } from "react";
import {
    StyledControlSection,
    StyledCourseManage,
    StyledCourseManageControl,
    StyledPreviewCourse,
    StyledPreviewCourseContent,
    StyledCourseControlSection,
    StyledControlFooter,
} from "../../../style/layout/Admin/StyledAdminCourseManage";
import sampleImg from "../../../asset/react.png";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import DragAndDropUpload from "../../../components/DragAndDropUpload/DragAndDropUpload";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../../../service/auth/course";

function AdminCourseCreate() {
    const [courseImage, setcourseImage] = useState(null);
    const [title, setTitle] = useState("New Course");
    const [description, setDescription] = useState("Course Description");
    const [imagePreviewUrl, setImagePreviewUrl] = useState(sampleImg);
    const navigate = useNavigate();
    useEffect(() => {
        // 업로드한 이미지가 있을 경우, 이미지 URL 생성
        if (courseImage) {
            const url = URL.createObjectURL(courseImage);
            setImagePreviewUrl(url);

            // 컴포넌트 언마운트 시, 생성된 URL 해제
            return () => URL.revokeObjectURL(url);
        }
    }, [courseImage]);
    const handleFileUpload = (files) => {
        setcourseImage(files[0]);
    };

    const handleSubmit = () => {
        // 새로운 코스 생성
        if (!title || !description || !courseImage) {
            alert("write title, description and upload image");
            return;
        }
        createCourse(title, description, courseImage).then(() => {
            alert("Course Created");
            navigate("/admin/course");
        });
    };
    return (
        <StyledCourseManage>
            <StyledCourseControlSection>
                <h1>Create New Course</h1>
            </StyledCourseControlSection>
            <StyledCourseControlSection>
                <StyledPreviewCourse>
                    <p>Preview</p>
                    <StyledPreviewCourseContent>
                        <img src={imagePreviewUrl} alt="Course" />
                        <h1>{title}</h1>
                        <p>{description}</p>
                    </StyledPreviewCourseContent>
                </StyledPreviewCourse>
                <StyledCourseManageControl>
                    <StyledControlSection>
                        <h1>Course Information</h1>
                        <p>Course에 대한 제목과 설명</p>
                        <Input
                            type="text"
                            placeholder="Title"
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                        <Input
                            type="text"
                            placeholder="Description"
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                    </StyledControlSection>
                    <StyledControlSection>
                        <h1>Course Image</h1>
                        <p>
                            Course Image Size <strong>400x250</strong>
                        </p>
                        <DragAndDropUpload onFilesAdded={handleFileUpload} />
                    </StyledControlSection>
                </StyledCourseManageControl>
            </StyledCourseControlSection>
            <StyledControlFooter>
                <Button
                    type="outlined"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    cancel
                </Button>
                <Button
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    Save
                </Button>
            </StyledControlFooter>
        </StyledCourseManage>
    );
}

export default AdminCourseCreate;
