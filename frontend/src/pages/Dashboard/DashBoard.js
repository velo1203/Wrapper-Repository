import React, { useEffect, useState } from "react";
import { StyledDefaultPage } from "../../style/layout/StyledDefaultPage";
import {
    StyledDashBoardHeader,
    StyledDashBoardHeaderOptions,
    StyledDashboardTable,
    TableCell,
    TableHeaderCell,
} from "../../style/layout/StyledDashboard";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";
import { getRepoList } from "../../service/auth/repo";
import useAuthStore from "../../store/userStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
function DashBoard() {
    const chevronDown = <FontAwesomeIcon icon={faChevronDown} />;
    const username = useAuthStore((state) => state.username);
    const navigate = useNavigate();
    const [repos, setRepos] = useState([]); // 리포지토리 목록을 저장할 상태
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
    useEffect(() => {
        const fetchRepoList = async () => {
            try {
                const response = await getRepoList(); // 리포지토리 목록 가져오기
                setRepos(response); // 상태 업데이트
            } catch (error) {
                console.error("Failed to fetch repository list:", error);
                if (error.response.status === 401) {
                    navigate("/login");
                }
                // 에러 처리, 예를 들어 사용자에게 알림 표시
            }
        };

        fetchRepoList(); // 함수 실행
    }, [navigate]); // 빈 의존성 배열을 전달하여 컴포넌트 마운트 시에만 실행되도록 함
    const filteredRepos = repos.filter(
        (repo) =>
            repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            repo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <StyledDefaultPage>
            <StyledDashBoardHeader>
                <h1>Repository</h1>
                <StyledDashBoardHeaderOptions>
                    <Input
                        placeholder="검색어 입력.."
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                    />
                    <Button
                        onClick={() => {
                            navigate("create");
                        }}
                    >
                        Create
                    </Button>
                </StyledDashBoardHeaderOptions>
            </StyledDashBoardHeader>
            <StyledDashboardTable>
                <thead>
                    <tr>
                        <TableHeaderCell style={{ width: "20%" }}>
                            Repo Name
                        </TableHeaderCell>
                        <TableHeaderCell style={{ width: "20%" }}>
                            Description
                        </TableHeaderCell>
                        <TableHeaderCell style={{ width: "40%" }}>
                            URL
                        </TableHeaderCell>
                        <TableHeaderCell
                            style={{ width: "5%" }}
                        ></TableHeaderCell>
                    </tr>
                </thead>
                <tbody>
                    {filteredRepos.length > 0 ? (
                        filteredRepos.map((repo, i) => (
                            <tr key={i}>
                                <TableCell>{repo.name}</TableCell>
                                <TableCell>{repo.description}</TableCell>
                                <TableCell>
                                    <a
                                        href={`${window.location.origin}/${username}/${repo.name}`}
                                    >
                                        {window.location.origin}/{username}/
                                        {repo.name}
                                    </a>
                                </TableCell>
                                <TableCell>{chevronDown}</TableCell>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <TableCell
                                colSpan="4"
                                style={{
                                    textAlign: "center",
                                    fontSize: "1.3rem",
                                }}
                            >
                                레포지토리가 없습니다.
                            </TableCell>
                        </tr>
                    )}
                </tbody>
            </StyledDashboardTable>
        </StyledDefaultPage>
    );
}

export default DashBoard;
