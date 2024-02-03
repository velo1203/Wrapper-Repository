import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// 스타일 컴포넌트의 경로를 확인하고 필요에 따라 수정하세요
import {
    StyledCreateRepo,
    StyledCreateRepoButtons,
    StyledCreateRepoField,
    StyledCreateRepoZip,
    StyledExampleLink,
    StyledImportant,
} from "../../style/layout/StyledCreateRepo";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { createRepo } from "../../service/auth/repo";
import { StyledDefaultPage } from "../../style/layout/StyledDefaultPage";

function Createrepo() {
    const [repoName, setRepoName] = useState("");
    const [repoDescription, setRepoDescription] = useState("");
    const [zipFile, setZipFile] = useState(null);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleZipUploadClick = () => {
        fileInputRef.current.click(); // 숨겨진 파일 입력을 클릭
    };

    const handleFileChange = (e) => {
        setZipFile(e.target.files[0]); // 선택된 파일 설정
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!zipFile) {
            alert("ZIP 파일을 선택해주세요.");
            return;
        }

        try {
            // 서버로 데이터 전송
            const response = await createRepo(
                repoName,
                repoDescription,
                zipFile
            );
            console.log("Repository created successfully:", response);
            navigate("/dashboard"); // 성공 시 리디렉션할 경로를 지정하세요.
        } catch (error) {
            console.error("Repository creation failed:", error);
        }
    };

    return (
        <StyledDefaultPage>
            <StyledCreateRepo>
                <h1>Create Repository</h1>
                <p>HTML과 CSS파일을 업로드합니다.</p>
                <StyledCreateRepoField>
                    <label>Repository Name</label>
                    <Input
                        type="text"
                        placeholder="Name"
                        value={repoName}
                        onChange={(e) => setRepoName(e.target.value)}
                    />
                </StyledCreateRepoField>

                <StyledCreateRepoField>
                    <label>Repository Description</label>
                    <Input
                        type="text"
                        placeholder="Description"
                        value={repoDescription}
                        onChange={(e) => setRepoDescription(e.target.value)}
                    />
                </StyledCreateRepoField>

                <p>
                    파일을 올릴 때는 Zip 파일로 압축해서 올려야 합니다.
                    <StyledImportant>*</StyledImportant>
                </p>
                <StyledCreateRepoZip>
                    <p>
                        Html 파일 이름을 index.html로 작명해야 합니다.
                        <StyledImportant>*</StyledImportant>
                    </p>
                    <Button type="button" onClick={handleZipUploadClick}>
                        Zip Upload
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept=".zip"
                        onChange={handleFileChange}
                    />
                </StyledCreateRepoZip>

                <h3>Example URL</h3>
                <StyledExampleLink>
                    http://localhost:3000/hosung/{repoName}
                </StyledExampleLink>

                <hr />

                <StyledCreateRepoButtons>
                    <Button type="outlined" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button type="submit" onClick={handleSubmit}>
                        Create
                    </Button>
                </StyledCreateRepoButtons>
            </StyledCreateRepo>
        </StyledDefaultPage>
    );
}

export default Createrepo;
