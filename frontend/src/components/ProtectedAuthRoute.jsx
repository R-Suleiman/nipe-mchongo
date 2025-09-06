import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function ProtectedAuthRoute({ children }) {
    const { token, user } = useAuth();

    if (token) {
        if (user.usertype === "poster") {
            return <Navigate to="/jobposter/dashboard" replace />;
        } else if (user.usertype === "seeker") {
            return <Navigate to="/job/seeker/dashboard" replace />;
        } else if (user.usertype === "admin") {
            return <Navigate to="/admin/dashboard" replace />;
        }
    }

    return children;
}
