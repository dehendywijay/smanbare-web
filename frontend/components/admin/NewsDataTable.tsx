// Komponen ini bertanggung jawab untuk menampilkan daftar berita dalam bentuk tabel.
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import NewsForm from "./NewsForm";
import { formatDate } from "@/lib/date";
import { useNewsData } from "@/hook/useNewsData";
import ReusablePagination from "../shared/ReusablePagination"; // Impor komponen paginasi baru
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { AlertDialogDestructive } from "./alert-delete";
import { api_news } from "@/constants/strings";
import { useAuth } from "@/app/main/auth/authcontext";

export default function NewsDataTable() {
  const router = useRouter();

  const {
    paginatedNews,
    isFormOpen,
    editingNews,
    currentPage,
    totalPages,
    itemsPerPage,
    searchQuery,
    setSearchQuery,
    handleSave,
    handleEdit,
    getNews,
    setIsFormOpen,
    setCurrentPage,
  } = useNewsData();


  const { accessToken } = useAuth();
  const deleteNews = async (slug: string) => {
    const res = await axios.delete(`${api_news}/${slug}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.status === 200) {
      toast.success(res.data.message);
      await getNews();
    } else {
      toast.error(res.data.error);
    }
    return res;
  };



  return (
    <div className="space-y-4 ">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Input
          placeholder="Cari berita..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center gap-2 cursor-point">
          <Button onClick={() => router.push(`/admin/news/add/`)} className="cursor-pointer">
            Tambah Berita
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">No.</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedNews.map((newsItem, index) => (
              <TableRow key={newsItem.ID}>
                <TableCell className="font-medium text-slate-500">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>
                <TableCell className="font-medium">
                  {newsItem.title.split(" ").slice(0, 10).join(" ")}...
                </TableCell>
                <TableCell>{formatDate(newsItem.CreatedAt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(newsItem)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialogDestructive
                      onDelete={() => deleteNews(newsItem.slug)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Gunakan komponen paginasi yang dapat digunakan kembali */}
      <ReusablePagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <NewsForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleSave}
        initialData={editingNews}
      />
    </div>
  );
}
