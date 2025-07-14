import { createContext, useContext, useState } from "react";

// Modal size options
const modalSizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    xl2: "max-w-2xl",
    xl4: "max-w-4xl",
    xl5: "max-w-5xl",
    xl7: "max-w-7xl",
    full: "max-w-full",
};

// Predefined modal variants
const modalVariants = {
    default: {
        backgroundColor: "bg-white",
        textColor: "text-gray-800",
        borderColor: "border-gray-200",
        borderSize: "border",
        borderRadius: "rounded-lg",
        headerBackground: "bg-blue-800",
        headerTextColor: "text-white",
        footerBackground: "bg-blue-800",
        footerTextColor: "text-white",
        closeButtonBackground: "bg-red-500",
        closeButtonTextColor: "text-white",
        closeButtonHoverBackground: "hover:bg-red-600",
        closeButtonHoverTextColor: "hover:text-white",
        shadow: "shadow-lg shadow-blue-200",
    },
    info: {
        backgroundColor: "bg-blue-50",
        textColor: "text-blue-800",
        borderColor: "border-blue-200",
        borderSize: "border-2",
        borderRadius: "rounded-lg",
        headerBackground: "bg-blue-600",
        headerTextColor: "text-white",
        footerBackground: "bg-blue-600",
        footerTextColor: "text-white",
        closeButtonBackground: "bg-blue-500",
        closeButtonTextColor: "text-white",
        closeButtonHoverBackground: "hover:bg-blue-600",
        closeButtonHoverTextColor: "hover:text-white",
        shadow: "shadow-lg shadow-blue-200",
    },
    success: {
        backgroundColor: "bg-green-50",
        textColor: "text-green-800",
        borderColor: "border-green-200",
        borderSize: "border-2",
        borderRadius: "rounded-lg",
        headerBackground: "bg-green-600",
        headerTextColor: "text-white",
        footerBackground: "bg-green-600",
        footerTextColor: "text-white",
        closeButtonBackground: "bg-green-500",
        closeButtonTextColor: "text-white",
        closeButtonHoverBackground: "hover:bg-green-600",
        closeButtonHoverTextColor: "hover:text-white",
        shadow: "shadow-lg shadow-green-200",
    },
    warning: {
        backgroundColor: "bg-yellow-50",
        textColor: "text-yellow-800",
        borderColor: "border-yellow-200",
        borderSize: "border-2",
        borderRadius: "rounded-lg",
        headerBackground: "bg-yellow-600",
        headerTextColor: "text-white",
        footerBackground: "bg-yellow-600",
        footerTextColor: "text-white",
        closeButtonBackground: "bg-yellow-500",
        closeButtonTextColor: "text-white",
        closeButtonHoverBackground: "hover:bg-yellow-600",
        closeButtonHoverTextColor: "hover:text-white",
        shadow: "shadow-lg shadow-yellow-200",
    },
    danger: {
        backgroundColor: "bg-red-50",
        textColor: "text-red-800",
        borderColor: "border-red-200",
        borderSize: "border-2",
        borderRadius: "rounded-lg",
        headerBackground: "bg-red-600",
        headerTextColor: "text-white",
        footerBackground: "bg-red-600",
        footerTextColor: "text-white",
        closeButtonBackground: "bg-red-500",
        closeButtonTextColor: "text-white",
        closeButtonHoverBackground: "hover:bg-red-600",
        closeButtonHoverTextColor: "hover:text-white",
        shadow: "shadow-lg shadow-red-200",
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

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
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

    return (
        <ModalContext.Provider value={{ isOpen, modalConfig, openModal, closeModal }}>
            {children}
            <Modal />
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);

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

    // Merge predefined styles with custom styles
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
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50 m-4"
            onClick={handleOutsideClick}
        >
            <div
                className={`${mergedStyles.backgroundColor || "bg-white"} ${mergedStyles.borderColor || "border-gray-200"
                    } ${mergedStyles.borderSize || "border"} ${mergedStyles.borderRadius || "rounded-lg"} ${mergedStyles.shadow || "shadow-lg shadow-blue-200"
                    } w-full ${modalSizes[size]} max-h-[90vh] overflow-y-auto`}
            >
                {/* Header */}
                <div
                    className={`w-full p-4 rounded-t-md ${mergedStyles.headerBackground || "bg-blue-800"
                        } ${mergedStyles.headerTextColor || "text-white"}`}
                >
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">{title}</h2>
                        {showCloseButton && (
                            <button
                                onClick={closeModal}
                                className={`p-1 rounded-full ${mergedStyles.closeButtonBackground || "bg-red-500"} ${mergedStyles.closeButtonTextColor || "text-white"
                                    } ${mergedStyles.closeButtonHoverBackground || "hover:bg-red-600"} ${mergedStyles.closeButtonHoverTextColor || "hover:text-white"
                                    }`}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className={`w-full p-6 ${mergedStyles.textColor || "text-gray-800"}`}>
                    {content}
                </div>

                {/* Footer */}
                {showFooter && (
                    <div
                        className={`w-full p-4 rounded-b-md ${mergedStyles.footerBackground || "bg-blue-800"
                            } ${mergedStyles.footerTextColor || "text-white"}`}
                    >
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={closeModal}
                                className={`px-4 py-2 rounded-md ${mergedStyles.closeButtonBackground || "bg-red-500"
                                    } ${mergedStyles.closeButtonTextColor || "text-white"} ${mergedStyles.closeButtonHoverBackground || "hover:bg-red-600"
                                    } ${mergedStyles.closeButtonHoverTextColor || "hover:text-white"}`}
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
