import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider"
import { useNavigate } from "react-router-dom";
function ProtectRoute({ children }) {
    const { isAuth } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuth) navigate('/login');
    }, [isAuth, navigate]);
    return isAuth ? children : null
}

export default ProtectRoute