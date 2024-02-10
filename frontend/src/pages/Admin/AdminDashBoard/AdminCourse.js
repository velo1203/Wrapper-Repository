import React, { useEffect, useState } from "react";
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
    StyledCourseContents,
    StyledCourseContributors,
    StyledCourseFooter,
} from "../../../style/layout/StyledCourse";

import sampleProfile from "../../../asset/profile.jpg";
import { useNavigate } from "react-router-dom";
import { getCourseList } from "../../../service/auth/course";
function AdminCourse() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourses = async () => {
            const Courses = await getCourseList();
            setCourses(Courses.courses);
        };
        getCourses();
    }, []);

    return (
        <StyledAdminCourse>
            <StyledCourseHeader>
                <h1>Course Management</h1>
                <StyledCourseControl>
                    <Input type="text" placeholder="Search" />
                    <Button
                        onClick={() => {
                            navigate("create");
                        }}
                    >
                        Create
                    </Button>
                </StyledCourseControl>
            </StyledCourseHeader>
            <StyledCourseContainer>
                {courses.length > 0 &&
                    courses.map((course, index) => {
                        console.log(
                            `http://localhost:5000/${course.ImagePath}`
                        );
                        return (
                            <StyledCourse
                                onClick={() => {
                                    navigate("manage");
                                }}
                                key={index}
                            >
                                <img
                                    src={`http://localhost:5000/${course.ImagePath}`}
                                />
                                <StyledCourseContents>
                                    <StyledCourseContent>
                                        <h1>{course.Title}</h1>
                                        <p>{course.Description}</p>
                                    </StyledCourseContent>
                                    <StyledCourseContributors>
                                        <h1>Contributors</h1>
                                        <StyledContributorProfiles>
                                            <StyledCProfileIcon>
                                                <img src={sampleProfile} />
                                            </StyledCProfileIcon>
                                        </StyledContributorProfiles>
                                    </StyledCourseContributors>
                                </StyledCourseContents>
                            </StyledCourse>
                        );
                    })}
            </StyledCourseContainer>
        </StyledAdminCourse>
    );
}

export default AdminCourse;
