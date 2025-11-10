"use client";

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationShadcnProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

const PaginationShadcn = ({ totalItems, itemsPerPage, currentPage }: PaginationShadcnProps) => {
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

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end for pages around current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        start = 2;
        end = Math.min(5, totalPages - 1);
      }
      
      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 4);
        end = totalPages - 1;
      }
      
      // Add ellipsis before if needed
      if (start > 2) {
        pages.push('ellipsis');
      }
      
      // Add pages around current page
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis after if needed
      if (end < totalPages - 1) {
        pages.push('ellipsis');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    // Remove duplicates
    return pages.filter((page, index, self) => {
      if (page === 'ellipsis') {
        // Only keep ellipsis if it's not adjacent to another ellipsis
        return index === 0 || index === self.length - 1 || 
               (self[index - 1] !== 'ellipsis' && self[index + 1] !== 'ellipsis');
      }
      return self.indexOf(page) === index;
    });
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
        
        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => handlePageChange(page as number)}
                isActive={currentPage === page}
                className="cursor-pointer !text-black"
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationShadcn;

