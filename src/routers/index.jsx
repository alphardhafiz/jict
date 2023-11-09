import React, { useEffect, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
import Login from "../views/auth/login";
import Home from "../views/admin/dashboard";

// Scroll to Top when switching page
const ScrollToTop = ({ children }) => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return children;
};

// Private routing
const Auth = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        swal({
            title: "Denied!",
            text: `Access Denied, Please Login!`,
            icon: "error",
        });
        return <Navigate to="/login" replace />;
    }
    return children;
};

const Router = () => {
    return (
        <BrowserRouter>
            <ScrollToTop>
                <Routes>
                    {/* Auth Routes  */}
                    <Route path="/login" element={<Login />} />

                    {/* Main Routes */}
                    <Route
                        path="/"
                        element={
                            // <Auth>
                            <Home />
                            // </Auth>
                        }
                    />
                </Routes>
            </ScrollToTop>
        </BrowserRouter>
    );
};

export default Router;