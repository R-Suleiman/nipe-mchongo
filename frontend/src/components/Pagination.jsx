import React from "react";

export default function Pagination({ currentPage, lastPage, onPageChange }) {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(lastPage, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="flex items-center gap-2 mt-6 flex-wrap">
            {/* Previous button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-blue-600 text-white cursor-pointer rounded disabled:opacity-50"
            >
                Prev
            </button>

            {/* First page */}
            {currentPage > 3 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="px-3 py-1 bg-white border rounded cursor-pointer"
                    >
                        1
                    </button>
                    <span className="text-gray-500">...</span>
                </>
            )}

            {/* Page numbers */}
            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 border rounded cursor-pointer ${
                        page === currentPage
                            ? "bg-blue-600 text-white"
                            : "bg-white"
                    }`}
                >
                    {page}
                </button>
            ))}

            {/* Last page */}
            {currentPage < lastPage - 2 && (
                <>
                    <span className="text-gray-500">...</span>
                    <button
                        onClick={() => onPageChange(lastPage)}
                        className="px-3 py-1 bg-white border rounded cursor-pointer"
                    >
                        {lastPage}
                    </button>
                </>
            )}

            {/* Next button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}
