"use client";

import { useState } from "react";
import axios from "axios";
import TextEditor from "@/components/text-editor";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { useRouter } from "next/navigation";
import { api_news } from "@/constans/strings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("");

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);

      if (image) {
        formData.append("image", image);
      }

      const res = await axios.post(`${api_news}`, formData);

      toast.success(res.data.message);
      router.push("/admin/news");

      setTitle("");
      setContent("");
      setImage(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Terjadi kesalahan");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Masukkan judul..."
          className="w-full border rounded-md p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="col-span-3"
        />

        <TextEditor onChange={setContent} value={""} />
        
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="category" className="text-left">
            Kategori
          </label>
          <Select value={category || ""} onValueChange={setCategory}>
            <SelectTrigger className="col-span-3 ">
              <SelectValue placeholder="Pilih kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pengumuman">Pengumuman</SelectItem>
              <SelectItem value="Prestasi">Prestasi</SelectItem>
              <SelectItem value="Event">Event</SelectItem>
              <SelectItem value="Berita">Berita</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>

      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto px-6 py-10">
        <div className="text-gray-700 md:col-span-3">
          <RevealOnScroll
            as="article"
            direction="up"
            rootMargin="0px 0px -10% 0px"
          >
            <RevealOnScroll
              as="h2"
              direction="up"
              className="text-black font-bold text-3xl md:text-4xl mb-4 leading-tight"
            >
              {title || "Judul Berita"}
            </RevealOnScroll>
            <RevealOnScroll
              as="div"
              direction="up"
              delayClassName="delay-100"
              className="flex items-center gap-4 text-sm text-gray-500 mb-6"
            >
              {image && (
                <RevealOnScroll
                  direction="up"
                  delayClassName="delay-150"
                  className="relative w-full h-96 mb-8 rounded-lg overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    width={200}
                  />
                </RevealOnScroll>
              )}
              <div>•</div>
            </RevealOnScroll>
            <RevealOnScroll direction="up" delayClassName="delay-200">
              <div
                className="prose max-w-none text-gray-600 leading-relaxed text-lg whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: content || "" }}
              />
            </RevealOnScroll>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}
