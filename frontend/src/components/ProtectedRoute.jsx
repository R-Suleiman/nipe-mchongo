import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function ProtectedRoute({ children, allowedUser }) {
    const { token, user } = useAuth();

    if (!token) return <Navigate to="/login" replace />;

    if (allowedUser !== user.usertype) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

