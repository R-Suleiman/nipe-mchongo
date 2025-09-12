import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router/router";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ModalProvider } from "./context/ModalContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrimeReactProvider } from "primereact/api";
// PrimeReact core
import 'primereact/resources/themes/lara-light-blue/theme.css';   // Theme (can be changed)
import 'primereact/resources/primereact.min.css';                // Core styles
// import 'primeicons/primeicons.css';                              // Icons


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <PrimeReactProvider>
                <ModalProvider>
                    <ToastContainer />
                    <RouterProvider router={Router} />
                </ModalProvider>
            </PrimeReactProvider>
        </AuthProvider>
    </StrictMode>
);
