import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

// Modal size options with enhanced responsive design
const modalSizes = {
    sm: "max-w-sm w-full xs:w-11/12",
    md: "max-w-md w-full xs:w-11/12",
    lg: "max-w-lg w-full xs:w-11/12",
    xl: "max-w-xl w-full xs:w-11/12",
    xl2: "max-w-2xl w-full xs:w-10/12",
    xl4: "max-w-4xl w-full xs:w-10/12",
    xl5: "max-w-5xl w-full xs:w-10/12",
    xl7: "max-w-7xl w-full xs:w-11/12",
    xl8: "max-w-[90rem] w-full xs:w-11/12",
    full: "max-w-full w-full h-full max-h-full rounded-none",
};

// Enhanced modal variants with better visual hierarchy
const modalVariants = {
    default: {
        backgroundColor: "bg-white dark:bg-gray-800",
        textColor: "text-gray-800 dark:text-gray-200",
        borderColor: "border-gray-200 dark:border-gray-700",
        borderSize: "border",
        borderRadius: "rounded-xl",
        headerBackground: "bg-blue-600 dark:bg-blue-800",
        headerTextColor: "text-white",
        footerBackground: "bg-gray-100 dark:bg-gray-700",
        footerTextColor: "text-gray-700 dark:text-gray-300",
        closeButtonBackground: "bg-transparent",
        closeButtonTextColor: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
        closeButtonHoverBackground: "hover:bg-gray-100 dark:hover:bg-gray-700",
        shadow: "shadow-2xl shadow-gray-500/20 dark:shadow-gray-900/30",
    },
    info: {
        backgroundColor: "bg-blue-50 dark:bg-blue-900/20",
        textColor: "text-blue-800 dark:text-blue-200",
        borderColor: "border-blue-200 dark:border-blue-700",
        borderSize: "border",
        borderRadius: "rounded-xl",
        headerBackground: "bg-blue-500 dark:bg-blue-700",
        headerTextColor: "text-white",
        footerBackground: "bg-blue-100 dark:bg-blue-900/30",
        footerTextColor: "text-blue-800 dark:text-blue-200",
        closeButtonBackground: "bg-red-600",
        closeButtonTextColor: "text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200",
        closeButtonHoverBackground: "hover:bg-blue-100 dark:hover:bg-blue-900/30",
        // shadow: "shadow-2xl shadow-blue-500/20 dark:shadow-blue-900/30",
    },
    success: {
        backgroundColor: "bg-green-50 dark:bg-green-900/20",
        textColor: "text-green-800 dark:text-green-200",
        borderColor: "border-green-200 dark:border-green-700",
        borderSize: "border",
        borderRadius: "rounded-xl",
        headerBackground: "bg-green-500 dark:bg-green-700",
        headerTextColor: "text-white",
        footerBackground: "bg-green-100 dark:bg-green-900/30",
        footerTextColor: "text-green-800 dark:text-green-200",
        closeButtonBackground: "bg-transparent",
        closeButtonTextColor: "text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200",
        closeButtonHoverBackground: "hover:bg-green-100 dark:hover:bg-green-900/30",
        shadow: "shadow-2xl shadow-green-500/20 dark:shadow-green-900/30",
    },
    warning: {
        backgroundColor: "bg-yellow-50 dark:bg-yellow-900/20",
        textColor: "text-yellow-800 dark:text-yellow-200",
        borderColor: "border-yellow-200 dark:border-yellow-700",
        borderSize: "border",
        borderRadius: "rounded-xl",
        headerBackground: "bg-yellow-500 dark:bg-yellow-700",
        headerTextColor: "text-white",
        footerBackground: "bg-yellow-100 dark:bg-yellow-900/30",
        footerTextColor: "text-yellow-800 dark:text-yellow-200",
        closeButtonBackground: "bg-transparent",
        closeButtonTextColor: "text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-200",
        closeButtonHoverBackground: "hover:bg-yellow-100 dark:hover:bg-yellow-900/30",
        shadow: "shadow-2xl shadow-yellow-500/20 dark:shadow-yellow-900/30",
    },
    danger: {
        backgroundColor: "bg-red-50 dark:bg-red-900/20",
        textColor: "text-red-800 dark:text-red-200",
        borderColor: "border-red-200 dark:border-red-700",
        borderSize: "border",
        borderRadius: "rounded-xl",
        headerBackground: "bg-red-500 dark:bg-red-700",
        headerTextColor: "text-white",
        footerBackground: "bg-red-100 dark:bg-red-900/30",
        footerTextColor: "text-red-800 dark:text-red-200",
        closeButtonBackground: "bg-transparent",
        closeButtonTextColor: "text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200",
        closeButtonHoverBackground: "hover:bg-red-100 dark:hover:bg-red-900/30",
        shadow: "shadow-2xl shadow-red-500/20 dark:shadow-red-900/30",
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

    const openModal = useCallback((config) => {
        setModalConfig({
            size: "md",
            variant: "default",
            showCloseButton: true,
            closeOnOutsideClick: true,
            showFooter: true,
            closeOnEscape: true,
            ...config,
        });
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        // Don't clear config immediately to allow for smooth exit animation
        setTimeout(() => setModalConfig(null), 300);
    }, []);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && isOpen && modalConfig?.closeOnEscape) {
                closeModal();
            }
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen, modalConfig, closeModal]);

    // Prevent body scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <ModalContext.Provider value={{ isOpen, modalConfig, openModal, closeModal }}>
            {children}
            {modalConfig && <Modal />}
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

    if (!modalConfig) return null;

    const {
        content,
        size = "md",
        title = "",
        variant = "default",
        customStyles = {},
        showCloseButton = true,
        closeOnOutsideClick = true,
        showFooter = true,
        footerContent,
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
            className={`fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4 sm:p-6 transition-all duration-300 ease-out
                ${isOpen ? "opacity-100 backdrop-blur-md bg-black/40" : "opacity-0 pointer-events-none"}`}
            onClick={handleOutsideClick}
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
        >
            <div
                className={`
                    ${modalSizes[size] || modalSizes.md}
                    max-h-[90dvh] w-full overflow-y-auto
                    transition-all duration-300 ease-out
                    ${isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"}
                    ${mergedStyles.backgroundColor}
                    ${mergedStyles.borderColor}
                    ${mergedStyles.borderSize}
                    ${mergedStyles.borderRadius}
                    ${mergedStyles.shadow}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header - Sticky */}
                <div
                    className={`sticky top-0 z-10 flex items-center justify-between w-full px-4 py-3 xs:px-5 xs:py-4 border-b
                        ${mergedStyles.headerBackground} ${mergedStyles.headerTextColor}`}
                >
                    <h2
                        id="modal-title"
                        className="text-lg xs:text-xl font-semibold truncate max-w-[70%]"
                    >
                        {title}
                    </h2>
                    {showCloseButton && (
                        <button
                            onClick={closeModal}
                            className={`p-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                                ${mergedStyles.closeButtonBackground} ${mergedStyles.closeButtonTextColor}
                                ${mergedStyles.closeButtonHoverBackground}`}
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5 xs:w-6 xs:h-6" />
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className={`px-4 py-4 xs:px-5 xs:py-5 text-base ${mergedStyles.textColor}`}>
                    {content}
                </div>

                {/* Footer - Responsive */}
                {showFooter && (
                    <div
                        className={`flex flex-col xs:flex-row justify-end gap-3 px-4 py-3 xs:px-5 xs:py-4 border-t
                            ${mergedStyles.footerBackground} ${mergedStyles.footerTextColor}`}
                    >
                        {footerContent || (
                            <button
                                onClick={closeModal}
                                className={`
      w-32 justify-center text-center
      px-4 py-2 rounded-lg font-medium
      transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
      bg-red-600 text-white hover:bg-red-700 focus:ring-red-400
    `}
                            >
                                Close
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export { ModalProvider, useModal };
