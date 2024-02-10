import React, { useState } from "react";
import {
    StyledAdminChapter,
    StyledChapterControl,
    StyledChapterHeader,
    StyledChapterSection,
    StyledChapterTitle,
} from "../../../style/layout/Admin/StyledAdminChapterTb";
import { Button } from "../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faEdit } from "@fortawesome/free-solid-svg-icons";
import {
    StyledTable,
    TableCell,
    TableHeaderCell,
} from "../../../components/Table/Table";
import { Input } from "../../../components/Input/Input";

function AdminChapterManage() {
    const [chapters, setChapters] = useState([
        {
            id: 1,
            title: "Introduction to React",
            lastUpdated: "2024-02-01",
            lecturesCount: "1000개",
        },
        // 추가 챕터 데이터...
    ]);
    const [editChapterId, setEditChapterId] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    // 편집 아이콘 클릭 시 호출되는 함수
    const handleEditClick = (chapter) => {
        setEditChapterId(chapter.id);
        setEditTitle(chapter.title);
    };

    // 입력 필드의 변경사항을 처리하는 함수
    const handleTitleChange = (event) => {
        setEditTitle(event.target.value);
    };

    // 변경사항을 저장하고 편집 모드를 종료하는 함수
    const handleSave = (id) => {
        const updatedChapters = chapters.map((chapter) =>
            chapter.id === id ? { ...chapter, title: editTitle } : chapter
        );
        setChapters(updatedChapters);
        setEditChapterId(null);
    };

    return (
        <StyledAdminChapter>
            <StyledChapterHeader>
                <h1>Chapter Management</h1>
                <StyledChapterControl>
                    <Input type="text" placeholder="Search" />
                    <Button>Create</Button>
                </StyledChapterControl>
            </StyledChapterHeader>
            <StyledTable>
                <thead>
                    <tr>
                        <TableHeaderCell width="5%">Order</TableHeaderCell>
                        <TableHeaderCell>Chapter Title</TableHeaderCell>
                        <TableHeaderCell>Last Updated</TableHeaderCell>
                        <TableHeaderCell>Lectures</TableHeaderCell>
                        <TableHeaderCell></TableHeaderCell>
                    </tr>
                </thead>
                <tbody>
                    {chapters.map((chapter) => (
                        <tr key={chapter.id}>
                            <TableCell>{chapter.id}</TableCell>
                            <TableCell width="30%">
                                {editChapterId === chapter.id ? (
                                    <Input
                                        type="text"
                                        value={editTitle}
                                        onChange={handleTitleChange}
                                    />
                                ) : (
                                    <StyledChapterTitle>
                                        <p>{chapter.title}</p>
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            onClick={() =>
                                                handleEditClick(chapter)
                                            }
                                        />
                                    </StyledChapterTitle>
                                )}
                            </TableCell>
                            <TableCell>{chapter.lastUpdated}</TableCell>
                            <TableCell>{chapter.lecturesCount}</TableCell>
                            <TableCell>
                                {editChapterId === chapter.id ? (
                                    <Button
                                        onClick={() => handleSave(chapter.id)}
                                    >
                                        Save
                                    </Button>
                                ) : (
                                    <FontAwesomeIcon icon={faChevronDown} />
                                )}
                            </TableCell>
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </StyledAdminChapter>
    );
}

export default AdminChapterManage;
