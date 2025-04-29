import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router/router";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ModalProvider } from "./context/ModalContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <ModalProvider>
                <RouterProvider router={Router} />
            </ModalProvider>
        </AuthProvider>
    </StrictMode>
);
