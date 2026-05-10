import axios from "axios";
import { News } from "@/types/type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8081/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});


/**
 * Mengambil daftar semua berita dari API.
 * @returns {Promise<News[]>} Sebuah promise yang resolve dengan array objek berita.
 */
export async function fetchNewsList(): Promise<News[]> {
  const { data } = await apiClient.get<News[]>("/news");
  return data;
}

/**
 * Mengambil satu berita berdasarkan slug-nya.
 * @param {string} slug - Slug dari berita yang akan diambil.
 * @returns {Promise<News>} Sebuah promise yang resolve dengan objek berita.
 */
export async function fetchNewsBySlug(slug: string): Promise<News> {
  const { data } = await apiClient.get<News>(`/news/${slug}`);
  return data;
}

/**
 * Membuat berita baru.
 * Backend mengharapkan multipart/form-data (c.PostForm), bukan JSON.
 * @param {FormData} formData - FormData yang berisi field: title, content, image.
 * @returns {Promise<News>} Sebuah promise yang resolve dengan objek berita yang baru dibuat.
 */
export async function createNews(formData: FormData): Promise<News> {
  const { data } = await apiClient.post<News>("/news", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

/**
 * Memperbarui berita yang sudah ada.
 * Backend mengharapkan multipart/form-data (c.PostForm), bukan JSON.
 * @param {string} slug - Slug dari berita yang akan diperbarui.
 * @param {FormData} formData - FormData yang berisi field: title, content, dan opsional image.
 * @returns {Promise<News>} Sebuah promise yang resolve dengan objek berita yang telah diperbarui.
 */
export async function updateNews(slug: string,token: string, formData: FormData): Promise<News> {
  const { data } = await apiClient.put<News>(`/news/${slug}`, formData, {
   headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
    withCredentials: true,
  });
  return data;
}

/**
 * Menghapus berita berdasarkan slug-nya.
 * @param {string} slug - Slug dari berita yang akan dihapus.
 * @returns {Promise<void>} Sebuah promise yang resolve ketika berita berhasil dihapus.
 */
export async function deleteNews(slug: string): Promise<void> {
  await apiClient.delete(`/news/${slug}`);
}
