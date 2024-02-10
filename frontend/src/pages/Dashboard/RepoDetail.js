import React from "react";
import {
    StyledRepoDetail,
    StyledRepoDetailFooter,
    StyledRepoDetailSection,
    StyledRepoDetailWrapper,
} from "../../style/layout/StyledRepoDetail";
import { Button } from "../../components/Button/Button";
import PopupWrapper from "../../components/PopupWrapper/PopupWrapper";
import { deleteRepo } from "../../service/auth/repo";
import {
    StyledDeletePopup,
    StyledDeletePopupFooter,
} from "../../style/layout/StyledDeletePopup";

function RepoDetail({ repo, username, handleDeleteSuccess }) {
    const [deletePopup, setDeletePopup] = React.useState(false);
    const handleDelete = async () => {
        await deleteRepo(repo.id);
        setDeletePopup(false);
        handleDeleteSuccess();
    };
    const copyURL = () => {
        window.navigator.clipboard.writeText(
            `${window.location.origin}/${username}/${repo.name}`
        );
    };

    return (
        <StyledRepoDetail>
            <h1>Repo Detail</h1>
            <StyledRepoDetailWrapper>
                <StyledRepoDetailSection>
                    <h1>Updated at</h1>
                    <p>{repo.updated_at}</p>
                </StyledRepoDetailSection>
                <StyledRepoDetailSection>
                    <h1>created at</h1>
                    <p>{repo.created_at}</p>
                </StyledRepoDetailSection>
                <StyledRepoDetailSection>
                    <h1>Visits</h1>
                    <p>{repo.visits}</p>
                </StyledRepoDetailSection>
            </StyledRepoDetailWrapper>

            <StyledRepoDetailFooter>
                <Button
                    type="outlined"
                    onClick={() => {
                        copyURL();
                    }}
                >
                    Copy URL
                </Button>
                <Button
                    onClick={() => {
                        setDeletePopup(true);
                    }}
                >
                    Delete
                </Button>
            </StyledRepoDetailFooter>
            {deletePopup && (
                <PopupWrapper onClose={() => setDeletePopup(false)}>
                    <StyledDeletePopup>
                        <h1>Delete Repository</h1>
                        <hr></hr>
                        <p>Are you sure you want to delete this repository?</p>
                        <StyledDeletePopupFooter>
                            <Button
                                type="outlined"
                                onClick={() => {
                                    setDeletePopup(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleDelete}>Delete</Button>
                        </StyledDeletePopupFooter>
                    </StyledDeletePopup>
                </PopupWrapper>
            )}
        </StyledRepoDetail>
    );
}

export default RepoDetail;
