// File: frontend/components/ui/ReusablePagination.tsx
"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ReusablePaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

/**
 * @description Komponen paginasi yang dapat digunakan kembali.
 * Menampilkan kontrol paginasi dan menangani logika untuk perpindahan halaman.
 *
 * @param {object} props - Properti untuk komponen paginasi.
 * @param {number} props.totalPages - Jumlah total halaman.
 * @param {number} props.currentPage - Halaman yang sedang aktif.
 * @param {(page: number) => void} props.onPageChange - Fungsi callback yang dipanggil saat halaman berubah.
 * @returns {JSX.Element} Element JSX dari komponen paginasi.
 */
export default function ReusablePagination({
  totalPages,
  currentPage,
  onPageChange,
}: ReusablePaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    // Logika untuk menampilkan nomor halaman, bisa disesuaikan
    // Misalnya, hanya menampilkan beberapa nomor di sekitar halaman saat ini
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === currentPage}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return pageNumbers;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePrevious();
            }}
          />
        </PaginationItem>
        {renderPageNumbers()}
        {/* Anda bisa menambahkan logika untuk elipsis di sini jika diperlukan */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
