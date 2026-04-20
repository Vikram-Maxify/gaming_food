import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { getAdminProfile } from "./slice/adminSlice";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();

    const { isAuthenticated, loading, checked } = useSelector(
        (state) => state.admin
    );

    useEffect(() => {
        if (!checked) {
            dispatch(getAdminProfile());
        }
    }, [checked, dispatch]);

    // ⛔ jab tak check hi nahi hua
    if (!checked) {
        return <div className="p-4">Checking auth...</div>;
    }

    // ❌ not logged in
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;