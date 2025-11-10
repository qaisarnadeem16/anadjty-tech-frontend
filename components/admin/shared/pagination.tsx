"use client";

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Pagination as HeroPagination } from '@heroui/react';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
}

const Pagination = ({ totalItems, itemsPerPage, currentPage }: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Don't show pagination if there's only one page or no items
    if (totalPages <= 1 || totalItems === 0) {
        return null;
    }

    const handlePageChange = (page: number) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('page', page.toString());
        router.push(`${pathname}?${newParams.toString()}`);
    };

    return (
        <div className="flex justify-center items-center gap-2">
            <HeroPagination
                total={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                showControls
                color="secondary"
                classNames={{
                    wrapper: 'gap-2',
                    item: 'bg-white border border-gray-200',
                    cursor: 'bg-indigo-600 text-white',
                }}
            />
        </div>
    );
};

export default Pagination;