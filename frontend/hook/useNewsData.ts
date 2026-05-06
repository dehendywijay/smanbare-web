// File: frontend/hooks/useNewsData.ts
"use client";

import { useState, useEffect, useMemo } from "react";
import { News } from "@/types/type";
import { fetchNewsList, createNews, updateNews, deleteNews } from "@/lib/newsApi";

/**
 * @description Custom hook untuk mengelola data berita dengan paginasi.
 *
 * @param {number} [itemsPerPage=10] - Jumlah item per halaman.
 * @returns {object} Objek yang berisi state dan fungsi untuk mengelola data berita.
 * - `paginatedNews`: Array berita untuk halaman saat ini.
 * - `isFormOpen`, `editingNews`, `setIsFormOpen`: State untuk form modal.
 * - `currentPage`, `totalPages`, `setCurrentPage`: State dan fungsi untuk paginasi.
 * - `handleSave`, `handleDelete`, `handleEdit`, `handleAdd`: Fungsi untuk operasi CRUD.
 */
export function useNewsData(itemsPerPage: number = 5) {
  const [news, setNews] = useState<News[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Menghitung jumlah total halaman
  const totalPages = Math.ceil(news.length / itemsPerPage);

  // Memoize data berita yang dipaginasi
  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return news.slice(startIndex, endIndex);
  }, [news, currentPage, itemsPerPage]);

  const getNews = async () => {
    const newsData = await fetchNewsList();
    setNews(newsData);
  };

  useEffect(() => {
    const loadNews = async () => {
      await getNews();
    };
    loadNews();
  }, []);

  /**
   * handleSave menerima FormData karena backend menggunakan c.PostForm()
   * dan c.FormFile() untuk membaca data, bukan JSON.
   */
  const handleSave = async (formData: FormData) => {
    if (editingNews) {
      await updateNews(editingNews.slug, formData);
    } else {
      await createNews(formData);
    }
    await getNews();
    setIsFormOpen(false);
    setEditingNews(null);
  };

  const handleDelete = async (slug: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      await deleteNews(slug);
      await getNews();
    }
  };

  const handleEdit = (newsItem: News) => {
    setEditingNews(newsItem);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingNews(null);
    setIsFormOpen(true);
  };

  return {
    paginatedNews,
    isFormOpen,
    editingNews,
    currentPage,
    totalPages,
    handleSave,
    handleDelete,
    handleEdit,
    handleAdd,
    setIsFormOpen,
    setCurrentPage,
  };
}
