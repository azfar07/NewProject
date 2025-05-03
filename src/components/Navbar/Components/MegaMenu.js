    "use client";

    import React, { memo } from "react";
    import Link from "next/link";

    function MegaMenu({
    menuOpen,
    columns,
    router,
    isConsultLoading,
    isConsultError,
    }) {
    if (!menuOpen) return null;

    return (
        <div className="absolute top-full left-0 right-0 bg-[#613318] rounded-b-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="grid grid-cols-4 gap-x-12 gap-y-6 text-sm text-white">
            {columns.map((col, idx) => (
                <ul key={idx} className="space-y-2">
                {!isConsultLoading &&
                    !isConsultError &&
                    col.map((item) =>
                    item.prefetch ? (
                        <li
                        key={item.label}
                        onMouseEnter={() => router.prefetch(item.prefetch)}
                        >
                        <Link
                            href={item.prefetch}
                            className="hover:underline block"
                            prefetch
                        >
                            {item.label}
                        </Link>
                        </li>
                    ) : (
                        <li key={item.label}>
                        <button
                            onClick={item.click}
                            className="hover:underline text-left block"
                        >
                            {item.label}
                        </button>
                        </li>
                    )
                    )}
                </ul>
            ))}
            </div>
        </div>
        </div>
    );
    }

    export default memo(MegaMenu);
