"use client";

import { useState } from "react";
import { UserCheck, Save, Image as ImageIcon, Upload, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TextEditor from "@/components/text-editor";
import { toast } from "sonner";
import { useKepalaDetail } from "@/hook/useKepala";
import { api_kepala } from "@/constants/strings";
import axios from "axios";
import { set } from "react-hook-form";
import { useAuth } from "@/app/main/auth/authcontext";

export default function AdminKepalaSekolahPage() {
  const { kepala, loading, error, refetch } = useKepalaDetail(1);
  const [nama, setNama] = useState("");
  const [content, setContent] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const [isEdit, setIsEdit] = useState(false);
  const { accessToken } = useAuth();



  const handleEdit = () => {
    setIsEdit(true);
    setNama(kepala?.name || "");
    setContent(kepala?.content || "");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("content", content);

      if (foto) {
        formData.append("foto", foto);
      }

      const res = kepala
        ? await axios.put(`${api_kepala}/1`, formData , {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        })
        : await axios.post(api_kepala, formData);

      setIsEdit(false);
      toast.success(res.data.message);
      await refetch();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Terjadi kesalahan");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <UserCheck className="text-brand-primary" /> Pengaturan Kepala Sekolah
        </h1>
        {!isEdit ? (
          <Button
            type="button"
            className="rounded-xl px-6 bg-brand-primary hover:bg-brand-primary/90 flex items-center gap-2"
            onClick={handleEdit}
          >
            <Save size={18} /> Edit Kepala Sekolah
          </Button>
        ) : null}
      </div>

      {isEdit ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Photo Section */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Foto Profil
              </label>
              <div className="relative group aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center">
                {kepala?.foto ? (
                  <>
                    <img
                      src={preview || kepala.foto}
                      alt="Kepala Sekolah"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="cursor-pointer bg-white text-slate-900 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                        <Upload size={14} /> Ganti Foto
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon
                      size={40}
                      className="mx-auto text-slate-300 mb-2"
                    />
                    <p className="text-xs text-slate-400">
                      Pilih foto Kepala Sekolah
                    </p>
                    <input type="file" onChange={handleImageChange} />
                  </div>
                )}
              </div>
            </div>

            {/* Details Section */}
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Nama Lengkap
                </label>
                <Input
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Masukkan nama lengkap beserta gelar..."
                  className="rounded-xl border-slate-200 focus:ring-brand-primary/20"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Sambutan Kepala Sekolah
                </label>
                <div className="min-h-[300px]">
                  <TextEditor value={content} onChange={setContent} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="ghost"
              className="rounded-xl px-8 text-slate-500 hover:text-slate-700 hover:bg-slate-100 flex items-center gap-2"
              onClick={() => setIsEdit(false)}
            >
              <ArrowLeft size={18} /> Kembali
            </Button>
            <Button
              type="submit"
              className="rounded-xl px-8 bg-brand-primary hover:bg-brand-primary/90 flex items-center gap-2"
            >
              <Save size={18} /> Simpan Perubahan
            </Button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Photo Section */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
              Foto Profil
            </label>
            <div className="relative group aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center">
              {kepala?.foto ? (
                <>
                  <img
                    src={kepala.foto}
                    alt="Kepala Sekolah"
                    className="w-full h-full object-cover"
                  />
                </>
              ) : (
                <div className="text-center p-4">
                  <ImageIcon
                    size={40}
                    className="mx-auto text-slate-300 mb-2"
                  />
                  <p className="text-xs text-slate-400">
                    Pilih foto Kepala Sekolah
                  </p>
                  <input type="file" onChange={handleImageChange} />
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Nama Lengkap
              </label>
              <p className="text-sm text-slate-500">{kepala?.name}</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                Sambutan Kepala Sekolah
              </label>
              <div
                className={"min-h-[300px]"}
                dangerouslySetInnerHTML={{ __html: kepala?.content || "" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
