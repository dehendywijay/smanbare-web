"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TextEditor from "@/components/text-editor"; // Komponen editor teks kustom
import { useState, useEffect } from "react";
import { News } from "@/types/type"; // Tipe data untuk berita
import { AlertDialogSure } from "./alert-sure";
import { useRouter } from "next/navigation";

// Definisikan properti yang diterima oleh komponen NewsForm
interface NewsFormProps {
  open: boolean; // Status modal (terbuka/tertutup)
  onOpenChange: (open: boolean) => void; // Fungsi untuk mengubah status modal
  onSave: (formData: FormData) => void; // Fungsi yang dipanggil saat menyimpan
  initialData?: News | null; // Data awal untuk mode edit
}

// Komponen utama untuk form berita
export default function NewsForm({
  open,
  onOpenChange,
  onSave,
  initialData,
}: NewsFormProps) {
  // State untuk setiap field dalam form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [kategori, setKategori] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  // useEffect untuk mengisi form dengan data awal saat mode edit
  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(initialData.title);
      setContent(initialData.content);
      setKategori(initialData.kategori);
    } else {
      // Reset form jika tidak ada data awal (mode tambah)
      setTitle("");
      setContent("");
      setKategori("");
    }
  }, [initialData, open]);

  const router = useRouter();
  // Fungsi yang dipanggil saat tombol 'Save' diklik
  const handleSubmit = () => {
    // Membuat FormData karena backend menggunakan c.PostForm() dan c.FormFile()
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("kategori", kategori);

    if (thumbnail) {
      formData.append("image", thumbnail);
    }

    onSave(formData);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-200">
        <DialogHeader>
          {/* Judul modal berubah tergantung mode (tambah/edit) */}
          <DialogTitle>{initialData ? "Edit" : "Tambah"} Berita</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Field untuk Judul */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Judul
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          {/* Field untuk Konten (menggunakan TextEditor) */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="content" className="text-right pt-2">
              Konten
            </Label>
            <div className="col-span-3">
              <TextEditor value={content} onChange={setContent} />
            </div>
          </div>
          {/* Field untuk Thumbnail */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="thumbnail" className="text-right">
              Thumbnail
            </Label>
            <Input
              id="thumbnail"
              type="file"
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
              className="col-span-3"
            />
          </div>
          {/* Field untuk Kategori */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="kategori" className="text-right">
              Kategori
            </Label>
            <Select value={kategori} onValueChange={setKategori}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder= {initialData ? initialData.kategori : "Pilih Kategori"} />
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="Pengumuman">Pengumuman</SelectItem>
              <SelectItem value="Prestasi">Prestasi</SelectItem>
              <SelectItem value="Event">Event</SelectItem>
              <SelectItem value="Berita">Berita</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          {/* Tombol untuk membatalkan dan menutup modal */}
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Batal
            </Button>
          </DialogClose>
          {/* Tombol untuk menyimpan data */}
          {/* <Button type="submit" onClick={handleSubmit}>
            Simpan
          </Button> */}
          <AlertDialogSure onSave={handleSubmit} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
