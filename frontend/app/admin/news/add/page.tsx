"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import TextEditor from "@/components/text-editor";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api_news } from "@/constants/strings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  PlusCircle,
  Image as ImageIcon,
  Type,
  Layers,
  Eye,
  Save,
  ArrowLeft,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/app/main/auth/authcontext";

export default function CreatePostForm() { 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [kategori, setKategori] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !kategori) {
      toast.error("Mohon isi semua field yang wajib");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("kategori", kategori);

      if (image) {
        formData.append("image", image);
      }

      const res = await axios.post(`${api_news}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      toast.success(res.data.message || "Berita berhasil ditambahkan");
      router.push("/admin/news");

      setTitle("");
      setContent("");
      setImage(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.error ||
          "Waktu Session sudah habis mohon login kembali",
      );
     
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="space-y-1">
            <button
              onClick={() => router.back()}
              className="group flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              Kembali ke Daftar Berita
            </button>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <PlusCircle className="w-8 h-8 text-blue-600" />
              Tambah Berita Baru
            </h1>
            <p className="text-slate-500">
              Buat dan publikasikan berita terbaru untuk civitas SMANSA.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="hidden sm:flex"
            >
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 shadow-lg shadow-blue-200"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Menyimpan...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Publikasikan Berita
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form Column */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-slate-100 bg-white/50">
                <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                  <Type className="w-5 h-5 text-blue-500" />
                  Konten Berita
                </CardTitle>
                <CardDescription>
                  Isi detail informasi berita di bawah ini.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Title Input */}
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-sm font-medium text-slate-700"
                  >
                    Judul Berita <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Contoh: Juara Umum Lomba Sains Nasional..."
                    className="h-12 text-lg font-semibold border-slate-200 focus:border-blue-400 focus:ring-blue-400 transition-all"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Category Selection */}
                <div className="space-y-2">
                  <Label
                    htmlFor="kategori"
                    className="text-sm font-medium text-slate-700"
                  >
                    Kategori <span className="text-red-500">*</span>
                  </Label>
                  <Select value={kategori} onValueChange={setKategori}>
                    <SelectTrigger className="h-11 border-slate-200 focus:ring-blue-400">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-slate-400" />
                        <SelectValue placeholder="Pilih kategori berita" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pengumuman">Pengumuman</SelectItem>
                      <SelectItem value="Prestasi">Prestasi</SelectItem>
                      <SelectItem value="Event">Event</SelectItem>
                      <SelectItem value="Berita">Berita</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rich Text Editor */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Isi Berita <span className="text-red-500">*</span>
                  </Label>
                  <div className="rounded-lg border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-400/20 focus-within:border-blue-400 transition-all">
                    <TextEditor onChange={setContent} value={content} />
                  </div>
                  <p className="text-xs text-slate-400 italic">
                    Gunakan toolbar untuk memformat teks Anda.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Image Upload Card */}
            <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-slate-100 bg-white/50">
                <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                  <ImageIcon className="w-5 h-5 text-purple-500" />
                  Gambar Utama
                </CardTitle>
                <CardDescription>
                  Tambahkan gambar sampul untuk berita ini.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {!previewUrl ? (
                    <div
                      className="relative border-2 border-dashed border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-blue-300 transition-all cursor-pointer group"
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      }
                    >
                      <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <ImageIcon className="w-8 h-8 text-slate-400 group-hover:text-blue-500" />
                      </div>
                      <p className="text-sm font-medium text-slate-600">
                        Klik untuk upload atau drag and drop
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        PNG, JPG atau WEBP (Maks. 2MB)
                      </p>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                      />
                    </div>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden shadow-md group">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            document.getElementById("image-upload")?.click()
                          }
                        >
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Ganti Gambar
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setImage(null);
                            setPreviewUrl(null);
                          }}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Hapus
                        </Button>
                      </div>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar / Preview Column */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden bg-white border-t-4 border-t-blue-600">
                <CardHeader className="pb-3 border-b border-slate-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Eye className="w-5 h-5 text-blue-500" />
                      Pratinjau Live
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-100"
                    >
                      Draft
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-5 space-y-4">
                    {/* Category Badge Preview */}
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white rounded">
                        {kategori || "KATEGORI"}
                      </span>
                      <span className="text-[11px] text-slate-400 uppercase font-medium tracking-tight">
                        {new Date().toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Title Preview */}
                    <h2 className="text-xl font-bold text-slate-900 leading-tight line-clamp-3">
                      {title || "Judul berita akan muncul di sini..."}
                    </h2>

                    {/* Image Preview in Card */}
                    <div className="aspect-video w-full rounded-lg bg-slate-100 overflow-hidden relative">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                          <ImageIcon className="w-10 h-10 mb-2 opacity-20" />
                          <span className="text-xs">Tidak ada gambar</span>
                        </div>
                      )}
                    </div>

                    {/* Content Preview Snippet */}
                    <div className="prose prose-sm max-w-none text-slate-600 line-clamp-4 text-sm leading-relaxed overflow-hidden">
                      {content ? (
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                      ) : (
                        "Konten berita akan muncul di sini saat Anda mulai mengetik..."
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-50">
                      <Button
                        variant="ghost"
                        className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 justify-between group text-xs font-semibold"
                      >
                        Baca Selengkapnya
                        <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Publication Tips */}
              <Card className="border-none shadow-md bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" />
                    Tips Publikasi
                  </h3>
                  <ul className="text-xs space-y-2 text-blue-100">
                    <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-1 shrink-0" />
                      Gunakan judul yang menarik namun tetap informatif.
                    </li>
                    <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-1 shrink-0" />
                      Pastikan gambar utama memiliki kualitas yang baik.
                    </li>
                    <li className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-1 shrink-0" />
                      Periksa kembali ejaan sebelum mempublikasikan.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
