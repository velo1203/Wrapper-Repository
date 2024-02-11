import React, { useEffect, useState } from "react";
import {
    StyledAdminChapter,
    StyledChapterControl,
    StyledChapterHeader,
    StyledChapterSection,
    StyledChapterTitle,
} from "../../../style/layout/Admin/StyledAdminChapter";
import { Button } from "../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faEdit } from "@fortawesome/free-solid-svg-icons";
import {
    StyledTable,
    TableCell,
    TableHeaderCell,
} from "../../../components/Table/Table";
import { Input } from "../../../components/Input/Input";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { StyledControlFooter } from "../../../style/layout/Admin/StyledAdminCourseManage";
import {
    createChapter,
    deleteChapter,
    getChapterList,
} from "../../../service/auth/chapter";
import PopupWrapper from "../../../components/PopupWrapper/PopupWrapper";
import {
    StyledPopup,
    StyledPopupFooter,
} from "../../../style/layout/StyledDeletePopup";

function AdminChapterManage({ courseid }) {
    const [chapters, setChapters] = useState([]);
    const [editChapterId, setEditChapterId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [chapterCreate, setChapterCreate] = useState(false);
    const [newchapterTitle, setnewchapterTitle] = useState("");
    const [onEvent, setOnEvent] = useState(false);
    const [detailChapter, setDetailChapter] = useState(null);
    const [original, setOriginal] = useState(null);
    const [deleteChapterId, setDeleteChapterId] = useState(null); // 상태 관리 변수 이름 변경
    useEffect(() => {
        const getChapters = async () => {
            try {
                const chapters = await getChapterList(courseid);
                setChapters(chapters.chapters);
                setOriginal(chapters.chapters); // 원본 데이터 저장
            } catch (e) {
                console.error(e);
            }
        };
        getChapters();
    }, [courseid, onEvent]);

    const handleDetailChapter = (id) => {
        if (detailChapter === id) setDetailChapter(null);
        else setDetailChapter(id);
    };

    const handleAddChapter = async () => {
        try {
            const new_chapter = await createChapter(courseid, newchapterTitle);
            setOnEvent(!onEvent); // 이벤트 발생
            setChapterCreate(false);
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteChapter = async (id) => {
        try {
            const deleted = await deleteChapter(id); // API 호출 함수는 그대로 유지
            setOnEvent(!onEvent); // 이벤트 발생
            setDeleteChapterId(null); // 상태 설정 함수 이름 변경
        } catch (e) {
            console.error(e);
        }
    };

    // 편집 아이콘 클릭 시 호출되는 함수
    const handleEditClick = (chapter) => {
        setEditChapterId(chapter.ChapterID);
        setEditTitle(chapter.title);
    };

    // 입력 필드의 변경사항을 처리하는 함수
    const handleTitleChange = (event) => {
        setEditTitle(event.target.value);
    };

    // 변경사항을 저장하고 편집 모드를 종료하는 함수
    const handleSave = (id) => {
        const updatedChapters = chapters.map((chapter) =>
            chapter.ChapterID === id
                ? { ...chapter, Title: editTitle }
                : chapter
        );
        setChapters(updatedChapters);
        setEditChapterId(null);
    };

    return (
        <StyledAdminChapter>
            {chapterCreate && (
                <PopupWrapper
                    onClose={() => {
                        setChapterCreate(false);
                    }}
                >
                    <StyledPopup>
                        <h1>Create Chapter</h1>
                        <hr />
                        <p>Write Chapter Title</p>
                        <Input
                            type="text"
                            placeholder="Chapter Title"
                            onChange={(e) => {
                                setnewchapterTitle(e.target.value);
                            }}
                        />
                        <StyledPopupFooter>
                            <Button
                                type="outlined"
                                onClick={() => {
                                    setChapterCreate(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    handleAddChapter();
                                }}
                            >
                                Create
                            </Button>
                        </StyledPopupFooter>
                    </StyledPopup>
                </PopupWrapper>
            )}
            {deleteChapterId && ( // 조건부 렌더링에서 상태 변수 이름 변경
                <PopupWrapper onClose={() => setDeleteChapterId(null)}>
                    {" "}
                    // 상태 설정 함수 이름 변경
                    <StyledPopup>
                        <h1>Delete Repository</h1>
                        <hr></hr>
                        <p>Are you sure you want to delete this repository?</p>
                        <StyledPopupFooter>
                            <Button
                                type="outlined"
                                onClick={() => {
                                    setDeleteChapterId(null); // 상태 설정 함수 이름 변경
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    console.log(deleteChapterId); // 상태 변수 이름 변경
                                    handleDeleteChapter(deleteChapterId); // 함수 호출시 상태 변수 이름 변경
                                }}
                            >
                                Delete
                            </Button>
                        </StyledPopupFooter>
                    </StyledPopup>
                </PopupWrapper>
            )}
            <StyledChapterHeader>
                <h1>Chapter Management</h1>
                <StyledChapterControl>
                    <Input type="text" placeholder="Search" />
                    <Button
                        onClick={() => {
                            setChapterCreate(true);
                        }}
                    >
                        Create
                    </Button>
                </StyledChapterControl>
            </StyledChapterHeader>
            <StyledTable>
                <thead>
                    <tr>
                        <TableHeaderCell width="5%">ID</TableHeaderCell>
                        <TableHeaderCell>Chapter Title</TableHeaderCell>
                        <TableHeaderCell>Created</TableHeaderCell>
                        <TableHeaderCell>Updated</TableHeaderCell>
                        <TableHeaderCell></TableHeaderCell>
                    </tr>
                </thead>
                <tbody>
                    {chapters.map((chapter) => (
                        <React.Fragment key={chapter.ChapterID}>
                            <tr>
                                <TableCell>{chapter.ChapterID}</TableCell>
                                <TableCell width="30%">
                                    {editChapterId === chapter.ChapterID ? (
                                        <Input
                                            type="text"
                                            value={editTitle}
                                            onChange={handleTitleChange}
                                        />
                                    ) : (
                                        <StyledChapterTitle>
                                            <p>{chapter.Title}</p>
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                onClick={() =>
                                                    handleEditClick(chapter)
                                                }
                                            />
                                        </StyledChapterTitle>
                                    )}
                                </TableCell>
                                <TableCell>{chapter.created_at}</TableCell>
                                <TableCell>{chapter.updated_at}</TableCell>
                                <TableCell>
                                    {editChapterId === chapter.ChapterID ? (
                                        <Button
                                            onClick={() =>
                                                handleSave(chapter.ChapterID)
                                            }
                                        >
                                            Save
                                        </Button>
                                    ) : (
                                        <FontAwesomeIcon
                                            style={{ padding: "5px" }}
                                            icon={faChevronDown}
                                            onClick={() => {
                                                handleDetailChapter(
                                                    chapter.ChapterID
                                                );
                                            }}
                                        />
                                    )}
                                </TableCell>
                            </tr>
                            {detailChapter === chapter.ChapterID && (
                                <tr>
                                    <TableCell colSpan="5">
                                        <StyledChapterSection>
                                            <p>HTML 시작하기</p>
                                            <p>ID : 1</p>
                                            <Dropdown />
                                        </StyledChapterSection>
                                        <StyledControlFooter>
                                            <Button
                                                type="outlined"
                                                onClick={() => {
                                                    setDeleteChapterId(
                                                        chapter.ChapterID
                                                    );
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            <Button width="120px">
                                                Add Lecture
                                            </Button>
                                        </StyledControlFooter>
                                    </TableCell>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}

                    {chapters.length === 0 && (
                        <tr>
                            <TableCell colSpan="5">
                                <h3>No Chapter</h3>
                            </TableCell>
                        </tr>
                    )}
                </tbody>
                {original !== chapters && (
                    <tfoot>
                        <tr>
                            <TableCell colSpan="5">
                                <StyledControlFooter>
                                    <Button type="outlined">Cancel</Button>
                                    <Button>Save</Button>
                                </StyledControlFooter>
                            </TableCell>
                        </tr>
                    </tfoot>
                )}
            </StyledTable>
        </StyledAdminChapter>
    );
}

export default AdminChapterManage;
