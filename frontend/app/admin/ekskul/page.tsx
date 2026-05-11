"use client";

import { useState } from "react";
import { Plus, Search, Pencil, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { api_eskul } from "@/constants/strings";
import { useEskul } from "@/hook/useEskul";
import EskulFormDialog from "@/components/admin/EskulFormDialog";
import { AlertDialogDestructive } from "@/components/admin/alert-delete";
import { useAuth } from "@/app/main/auth/authcontext";

export default function AdminEskulPage() {
  const router = useRouter();
  const { eskul, loading, error, refetch } = useEskul();
  const {accessToken} = useAuth();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [nama, setNama] = useState("");
  const [pembina, setPembina] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [prestasi, setPrestasi] = useState("");
  const [jadwal, setJadwal] = useState("");
  const [foto, setFoto] = useState<File | null>(null);

  const resetForm = () => {
    setNama("");
    setPembina("");
    setTujuan("");
    setPrestasi("");
    setJadwal("");
    setFoto(null);
    setSelectedSlug(null);
    setIsEdit(false);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);

    if (!open) {
      resetForm();
    }
  };

  const handleEdit = (slug: string) => {
    const selectedEskul = eskul.find((item) => item.slug === slug);

    if (!selectedEskul) {
      toast.error("Data eskul tidak ditemukan");
      return;
    }

    setNama(selectedEskul.nama);
    setPembina(selectedEskul.pembina);
    setTujuan(selectedEskul.tujuan);
    setPrestasi(selectedEskul.prestasi || "");
    setJadwal(selectedEskul.jadwal);
    setFoto(null);

    setSelectedSlug(selectedEskul.slug);
    setIsEdit(true);
    setIsDialogOpen(true);


  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("pembina", pembina);
      formData.append("tujuan", tujuan);
      formData.append("prestasi", prestasi);
      formData.append("jadwal", jadwal);

      if (foto) {
        formData.append("foto", foto);
      }

      const res =
        isEdit && selectedSlug
          ? await axios.put(`${api_eskul}/${selectedSlug}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          })
          : await axios.post(api_eskul, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          });

      toast.success(res.data);

      resetForm();
      setIsDialogOpen(false);
      await refetch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Terjadi kesalahan");
    }
  };

  const handleDelete = async (slug: string) => {
    try {
      const res = await axios.delete(`${api_eskul}/${slug}`);

      toast.success(res.data);
      await refetch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Gagal menghapus data");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const filteredEskul = eskul.filter((item) =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">
          Manajemen Eskul
        </h1>

        <Button
          onClick={openAddDialog}
          className="rounded-xl bg-brand-primary hover:bg-brand-primary/90 flex items-center gap-2"
        >
          <Plus size={18} />
          Tambah Eskul
        </Button>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
        <div className="relative max-w-sm">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <Input
            placeholder="Cari nama eskul..."
            className="pl-10 rounded-xl border-slate-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="rounded-2xl border border-slate-100 overflow-x-auto">
          <Table className="min-w-[900px]">
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-16">No</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Pembina</TableHead>
                <TableHead>Jadwal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredEskul.map((item, index) => (
                <TableRow key={item.ID}>
                  <TableCell className="font-bold text-slate-400">
                    {index + 1}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-brand-primary overflow-hidden">
                        {item.foto ? (
                          <img
                            src={item.foto}
                            alt={item.nama}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User size={20} />
                        )}
                      </div>

                      <div className="font-bold text-slate-800">
                        {item.nama}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{item.pembina}</TableCell>

                  <TableCell>{item.jadwal}</TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={() => handleEdit(item.slug)}
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-brand-primary hover:bg-brand-surface-alt rounded-lg"
                      >
                        <Pencil size={16} />
                      </Button>

                      <AlertDialogDestructive
                        onDelete={() => handleDelete(item.slug)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <EskulFormDialog
        open={isDialogOpen}
        isEdit={isEdit}
        nama={nama}
        pembina={pembina}
        tujuan={tujuan}
        prestasi={prestasi}
        jadwal={jadwal}
        onOpenChange={handleDialogChange}
        onSubmit={handleSubmit}
        onNamaChange={setNama}
        onPembinaChange={setPembina}
        onTujuanChange={setTujuan}
        onPrestasiChange={setPrestasi}
        onJadwalChange={setJadwal}
        onFotoChange={setFoto}
      />
    </div>
  );
}