import React, { createContext, useContext, useState, useEffect } from "react";

// Modal size options
const modalSizes = {
    sm: "max-w-sm w-full sm:w-11/12",
    md: "max-w-md w-full sm:w-11/12",
    lg: "max-w-lg w-full sm:w-11/12",
    xl: "max-w-xl w-full sm:w-11/12",
    xl2: "max-w-2xl w-full sm:w-10/12",
    xl4: "max-w-4xl w-full sm:w-10/12",
    xl5: "max-w-5xl w-full sm:w-10/12",
    xl7: "max-w-7xl w-full sm:w-11/12",
    xl8: "max-w-[90rem] w-full sm:w-11/12",
    full: "max-w-full w-full",
};

// Predefined modal variants
const modalVariants = {
    default: {
        backgroundColor: "bg-white",
        textColor: "text-gray-800",
        borderColor: "border-gray-200",
        borderSize: "border",
        borderRadius: "rounded-xl",
        headerBackground: "bg-blue-800",
        headerTextColor: "text-white",
        footerBackground: "bg-blue-800",
        footerTextColor: "text-white",
        closeButtonBackground: "bg-red-500",
        closeButtonTextColor: "text-white",
        closeButtonHoverBackground: "hover:bg-red-600",
        closeButtonHoverTextColor: "hover:text-white",
        shadow: "shadow-xl shadow-blue-200/50",
    },
    info: {
        backgroundColor: "bg-blue-50",
        textColor: "text-blue-800",
        borderColor: "border-blue-200",
        borderSize: "border-2",
        borderRadius: "rounded-xl",
        headerBackground: "bg-blue-600",
        headerTextColor: "text-white",
        footerBackground: "bg-blue-600",
        footerTextColor: "text-white",
        closeButtonBackground: "bg-blue-500",
        closeButtonTextColor: "text-white",
        closeButtonHoverBackground: "hover:bg-blue-600",
        closeButtonHoverTextColor: "hover:text-white",
        shadow: "shadow-xl shadow-blue-200/50",
    },
    success: {
        backgroundColor: "bg-green-50",
        textColor: "text-green-800",
        borderColor: "border-green-200",
        borderSize: "border-2",
        borderRadius: "rounded-xl",
        headerBackground: "bg-green-600",
        headerTextColor: "text-white",
        footerBackground: "bg-green-600",
        footerTextColor: "text-white",
        closeButtonBackground: "bg-green-500",
        closeButtonTextColor: "text-white",
        closeButtonHoverBackground: "hover:bg-green-600",
        closeButtonHoverTextColor: "hover:text-white",
        shadow: "shadow-xl shadow-green-200/50",
    },
    warning: {
        backgroundColor: "bg-yellow-50",
        textColor: "text-yellow-800",
        borderColor: "border-yellow-200",
        borderSize: "border-2",
        borderRadius: "rounded-xl",
        headerBackground: "bg-yellow-600",
        headerTextColor: "text-white",
        footerBackground: "bg-yellow-600",
        footerTextColor: "text-white",
        closeButtonBackground: "bg-yellow-500",
        closeButtonTextColor: "text-white",
        closeButtonHoverBackground: "hover:bg-yellow-600",
        closeButtonHoverTextColor: "hover:text-white",
        shadow: "shadow-xl shadow-yellow-200/50",
    },
    danger: {
        backgroundColor: "bg-red-50",
        textColor: "text-red-800",
        borderColor: "border-red-200",
        borderSize: "border-2",
        borderRadius: "rounded-xl",
        headerBackground: "bg-red-600",
        headerTextColor: "text-white",
        footerBackground: "bg-red-600",
        footerTextColor: "text-white",
        closeButtonBackground: "bg-red-500",
        closeButtonTextColor: "text-white",
        closeButtonHoverBackground: "hover:bg-red-600",
        closeButtonHoverTextColor: "hover:text-white",
        shadow: "shadow-xl shadow-red-200/50",
    },
    custom: {
        backgroundColor: "",
        textColor: "",
        borderColor: "",
        borderSize: "",
        borderRadius: "",
        headerBackground: "",
        headerTextColor: "",
        footerBackground: "",
        footerTextColor: "",
        closeButtonBackground: "",
        closeButtonTextColor: "",
        closeButtonHoverBackground: "",
        closeButtonHoverTextColor: "",
        shadow: "",
    },
};

const ModalContext = createContext(null);

const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState(null);

    const openModal = (config) => {
        setModalConfig({
            size: "md",
            variant: "default",
            showCloseButton: true,
            closeOnOutsideClick: true,
            showFooter: true,
            ...config,
        });
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalConfig(null);
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && isOpen) {
                closeModal();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen]);

    return (
        <ModalContext.Provider value={{ isOpen, modalConfig, openModal, closeModal }}>
            {children}
            {isOpen && modalConfig && <Modal />}
        </ModalContext.Provider>
    );
};

const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used within ModalProvider");
    return context;
};

const Modal = () => {
    const { isOpen, modalConfig, closeModal } = useModal();

    if (!isOpen || !modalConfig) return null;

    const {
        content,
        size = "md",
        title = "",
        variant = "default",
        customStyles = {},
        showCloseButton = true,
        closeOnOutsideClick = true,
        showFooter = true,
    } = modalConfig;

    const mergedStyles = {
        ...modalVariants[variant],
        ...customStyles,
    };

    const handleOutsideClick = (e) => {
        if (closeOnOutsideClick && e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50 p-4 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            onClick={handleOutsideClick}
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
        >
            <div
                className={`${modalSizes[size] || modalSizes.md} ${mergedStyles.backgroundColor} ${mergedStyles.borderColor} ${mergedStyles.borderSize} ${mergedStyles.borderRadius} ${mergedStyles.shadow} max-h-[90vh] overflow-y-auto transition-transform duration-300 transform ${isOpen ? "scale-100" : "scale-95"
                    }`}
            >
                {/* Header */}
                <div
                    className={`w-full p-4 sm:p-6 ${mergedStyles.headerBackground} ${mergedStyles.headerTextColor} rounded-t-xl`}
                >
                    <div className="flex justify-between items-center">
                        <h2 id="modal-title" className="text-lg sm:text-xl font-semibold truncate">
                            {title}
                        </h2>
                        {showCloseButton && (
                            <button
                                onClick={closeModal}
                                className={`p-2 rounded-full ${mergedStyles.closeButtonBackground} ${mergedStyles.closeButtonTextColor} ${mergedStyles.closeButtonHoverBackground} ${mergedStyles.closeButtonHoverTextColor} transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                                aria-label="Close modal"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className={`w-full p-4 sm:p-6 ${mergedStyles.textColor}`}>{content}</div>

                {/* Footer */}
                {showFooter && (
                    <div
                        className={`w-full p-4 sm:p-6 ${mergedStyles.footerBackground} ${mergedStyles.footerTextColor} rounded-b-xl`}
                    >
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={closeModal}
                                className={`px-4 py-2 rounded-md ${mergedStyles.closeButtonBackground} ${mergedStyles.closeButtonTextColor} ${mergedStyles.closeButtonHoverBackground} ${mergedStyles.closeButtonHoverTextColor} transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export { ModalProvider, useModal };
