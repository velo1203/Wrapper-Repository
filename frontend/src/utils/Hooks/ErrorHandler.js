import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/userStore";

function useApiErrorHandler() {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const handleError = (error) => {
        if (
            (error.response && error.response.status === 403) ||
            error.response.status === 401
        ) {
            logout();
            navigate("/login");
        }
    };

    return handleError;
}

export default useApiErrorHandler;
