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
import {
    deleteCourse,
    getCourse,
    updateCourse,
} from "../../../service/auth/course";
import { useNavigate, useParams } from "react-router-dom";
import PopupWrapper from "../../../components/PopupWrapper/PopupWrapper";
import {
    StyledDeletePopup,
    StyledPopup,
} from "../../../style/layout/StyledDeletePopup";
import AdminChapterManage from "./AdminChapterMange";
function AdminCourseManage() {
    const [course, setCourse] = useState(null);
    const [deletePopup, setDeletePopup] = useState(false);
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
    const handleDelete = async () => {
        try {
            await deleteCourse(course.CourseID);
            alert("Course Deleted");
            navigate("/admin/course");
        } catch (e) {
            console.error(e);
        }
    };
    const handleFileUpload = (files) => {
        const file = files[0];
        if (file) {
            // 이미지 파일인지 확인
            if (file.type.startsWith("image/")) {
                setCourseImage(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviewUrl(reader.result); // 이미지 미리보기 URL 설정
                };
                reader.readAsDataURL(file); // 파일을 Data URL로 읽어서 미리보기 생성
            } else {
                alert("Please upload an image file."); // 이미지 파일이 아닌 경우 경고
            }
        }
    };

    const handleSave = async () => {
        console.log("Save Course", title, description, courseImage);
        try {
            await updateCourse(id, title, description, courseImage); // 이미지 파일 추가
            alert("Course Updated");
        } catch (e) {
            console.error(e);
        }
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
                <Button
                    type="outlined"
                    onClick={() => {
                        setDeletePopup(true);
                    }}
                >
                    Delete
                </Button>
                <Button onClick={handleSave}>Save</Button>
            </StyledControlFooter>
            <StyledCourseControlSection>
                <h1>Contributor Management</h1>
            </StyledCourseControlSection>
            <StyledCourseControlSection>
                {id && <AdminChapterManage courseid={id} />}
            </StyledCourseControlSection>
            {deletePopup && (
                <PopupWrapper
                    onClose={() => {
                        setDeletePopup(false);
                    }}
                >
                    <StyledPopup>
                        <h1>Delete Course</h1>
                        <hr></hr>
                        <p>Are you sure you want to delete this Coures?</p>
                        <StyledControlFooter>
                            <Button
                                type="outlined"
                                onClick={() => {
                                    setDeletePopup(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleDelete}>Delete</Button>
                        </StyledControlFooter>
                    </StyledPopup>
                </PopupWrapper>
            )}
        </StyledCourseManage>
    );
}

export default AdminCourseManage;
