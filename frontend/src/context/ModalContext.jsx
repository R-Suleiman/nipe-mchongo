import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalContent, setModalContent] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [size, setSize] = useState("md");
    const [title, setTitle] = useState("");

    const openModal = (content, modalSize = "md", title = "") => {
        setModalContent(content);
        setSize(modalSize);
        setTitle(title);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalContent(null);
    };

    return (
        <ModalContext.Provider
            value={{ isOpen, modalContent, size, title, openModal, closeModal }}
        >
            {children}
            <Modal />
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);

const Modal = () => {
    const { isOpen, modalContent, closeModal, size, title } = useModal();

    if (!isOpen) return null;

    const widthClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        xl2: "max-w-2xl",
        xl4: "max-w-4xl",
        xl7: "max-w-7xl",
        xl5: "max-w-5xl",
        full: "max-w-full",
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 backdrop-blur-sm z-50 m-4">
            <div
                className={`bg-white rounded-lg shadow-lg shadow-blue-200 w-full ${widthClasses[size]} max-h-lvh overflow-y-auto`}
            >
                <div className="w-full p-4 rounded-t-md bg-blue-800">
                    <h2 className="text-xl text-center text-white">{title}</h2>
                </div>
                <div className="w-full p-6">
                    {modalContent}
                </div>
                    <div className="w-full p-2 bg-blue-800">
                        <div className="w-fit mx-auto">
                            <button
                                onClick={closeModal}
                                className="mt-4 w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md hover:cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
            </div>
        </div>
    );
};
//
