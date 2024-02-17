import React, { useEffect, useState } from "react";
import { StyledAdminDashboard } from "../../../style/layout/Admin/StyledAdminDashboard";
import { StyledDefaultPage } from "../../../style/layout/StyledDefaultPage";
import {
    StyledTable,
    TableCell,
    TableHeaderCell,
} from "../../../components/Table/Table";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { getAllRepo } from "../../../service/auth/repo";
import { getuser } from "../../../service/auth/auth";

function AdminDashBoard() {
    const [repos, setRepos] = useState([]);
    const [users, setUsers] = useState({}); // 사용자 정보를 저장할 객체

    useEffect(() => {
        const getRepos = async () => {
            const data = await getAllRepo();
            if (data) {
                setRepos(data);
                // 모든 레포에 대한 사용자 정보를 가져옵니다.
                await Promise.all(
                    data.map(async (repo) => {
                        if (!users[repo.user_id]) {
                            // 중복 요청 방지
                            const userData = await getuser(repo.user_id);
                            setUsers((prevUsers) => ({
                                ...prevUsers,
                                [repo.user_id]: userData,
                            }));
                        }
                    })
                );
            }
        };
        getRepos();
    }, []);

    const getUser = async (id) => {
        const data = await getuser(id);
        if (data) {
            console.log(data);
        }
        return data;
    };

    return (
        <StyledDefaultPage>
            <h1>유저들의 레포지토리</h1>
            <StyledTable>
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
                        <TableHeaderCell style={{ width: "20%" }}>
                            owner
                        </TableHeaderCell>
                    </tr>
                </thead>
                <tbody>
                    {repos.map((repo, index) => (
                        <tr key={index}>
                            <TableCell>{repo.name}</TableCell>
                            <TableCell>{repo.description}</TableCell>
                            <TableCell>
                                <a
                                    href={`${window.location.origin}/${
                                        users[repo.user_id]?.username
                                    }/${repo.name}`}
                                >
                                    {window.location.origin}/
                                    {users[repo.user_id]?.username}/{repo.name}
                                </a>
                            </TableCell>
                            <TableCell>
                                <p>{users[repo.user_id]?.username}</p>
                            </TableCell>
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </StyledDefaultPage>
    );
}

export default AdminDashBoard;
