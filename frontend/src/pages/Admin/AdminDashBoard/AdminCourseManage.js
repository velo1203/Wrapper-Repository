import React, { useEffect, useState } from "react";
import {
    StyledControlSection,
    StyledCourseManage,
    StyledCourseManageControl,
    StyledPreviewCourse,
    StyledPreviewCourseContent,
    StyledCourseControlSection,
    StyledContributorHeader,
    StyledControlFooter,
} from "../../../style/layout/Admin/StyledAdminCourseManage";
import sampleImg from "../../../asset/react.png";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import DragAndDropUpload from "../../../components/DragAndDropUpload/DragAndDropUpload";
import { getCourse, updateCourse } from "../../../service/auth/course";
import { useNavigate, useParams } from "react-router-dom";
function AdminCourseManage() {
    const [course, setCourse] = useState(null);
    const [title, setTitle] = useState("New Course");
    const [description, setDescription] = useState("Course Description");
    const [courseImage, setCourseImage] = useState(null); // 이미지 파일 상태 추가
    const [imagePreviewUrl, setImagePreviewUrl] = useState(sampleImg); // 이미지 미리보기 URL 상태 추가
    const navigate = useNavigate();
    let { id } = useParams();

    useEffect(() => {
        const getCourses = async () => {
            try {
                const Courses = await getCourse(id);
                if (Courses) {
                    setCourse(Courses);
                    setTitle(Courses.Title || "New Course");
                    setDescription(Courses.Description || "Course Description");
                    setImagePreviewUrl(
                        `http://localhost:5000/${Courses.ImagePath}`
                    ); // 기존 이미지 URL 설정
                } else {
                    navigate("/admin/course");
                }
            } catch (e) {
                console.error(e);
            }
        };
        getCourses();
    }, [id, navigate]);

    const handleFileUpload = (files) => {
        const file = files[0];
        if (file) {
            setCourseImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        console.log("Save Course", title, description, courseImage);
        await updateCourse(id, title, description, courseImage); // 이미지 파일 추가
        alert("Course Updated");
    };

    return (
        <StyledCourseManage>
            <StyledCourseControlSection>
                <h1>Course Management</h1>
            </StyledCourseControlSection>
            <StyledCourseControlSection>
                <StyledPreviewCourse>
                    <p>Preview</p>
                    <StyledPreviewCourseContent>
                        <img src={imagePreviewUrl} alt="React" />
                        <h1>{title}</h1>
                        <p>{description}</p>
                    </StyledPreviewCourseContent>
                </StyledPreviewCourse>
                <StyledCourseManageControl>
                    <StyledControlSection>
                        <h1>Course ManageMent</h1>
                        <p>Course에 대한 제목과 설명</p>
                        <Input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                        <Input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                    </StyledControlSection>
                    <StyledControlSection>
                        <h1>Course Image</h1>
                        <p>Course Image set</p>
                        <DragAndDropUpload onFilesAdded={handleFileUpload} />
                    </StyledControlSection>
                </StyledCourseManageControl>
            </StyledCourseControlSection>
            <StyledControlFooter>
                <Button type="outlined">Delete</Button>
                <Button onClick={handleSave}>Save</Button>
            </StyledControlFooter>
            <StyledCourseControlSection>
                <h1>Contributor Management</h1>
            </StyledCourseControlSection>
            <StyledCourseControlSection>
                <h1>Chapter Manage</h1>
            </StyledCourseControlSection>
        </StyledCourseManage>
    );
}

export default AdminCourseManage;
