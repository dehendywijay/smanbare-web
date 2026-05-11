"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Plus, Search, Pencil, User } from "lucide-react";
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
import { api_guru } from "@/constants/strings";
import { useGuru } from "@/hook/useGuru";
import GuruFormDialog from "@/components/admin/GuruFormDialog";
import { AlertDialogDestructive } from "@/components/admin/alert-delete";
import ReusablePagination from "@/components/shared/ReusablePagination";
import { useAuth } from "@/app/main/auth/authcontext";
export default function AdminGuruStafPage() {
  const { guru, loading, error, refetch } = useGuru();
  const {accessToken} = useAuth();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [foto, setFoto] = useState<File | null>(null);

  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [searchQuery]);

  const resetForm = () => {
    setNama("");
    setJabatan("");
    setFoto(null);
    setSelectedId(null);
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

  const handleEdit = (id: number) => {
    const selectedGuru = guru.find((item) => item.ID === id);

    if (!selectedGuru) {
      toast.error("Data guru tidak ditemukan");
      return;
    }

    setNama(selectedGuru.nama);
    setJabatan(selectedGuru.jabatan);
    setFoto(null);
    setSelectedId(id);
    setIsEdit(true);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("jabatan", jabatan);

      if (foto) {
        formData.append("foto", foto);
      }

      const res =
        isEdit && selectedId
          ? await axios.put(`${api_guru}/${selectedId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          })
          : await axios.post(api_guru, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          });

      toast.success(res.data.message);

      resetForm();
      setIsDialogOpen(false);
      await refetch();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Terjadi kesalahan");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const filteredStaff = guru.filter(
    (s) =>
      s.nama?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const paginatedStaff = filteredStaff.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

  const handleDelete = async (id: number) => {
    try {
      const res = await axios.delete(`${api_guru}/${id}`);

      toast.success(res.data.message);
      await refetch();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Gagal menghapus data");
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <GraduationCap className="text-brand-primary" />
          Manajemen Guru & Staf
        </h1>

        <Button
          onClick={openAddDialog}
          className="rounded-xl bg-brand-primary hover:bg-brand-primary/90 flex items-center gap-2"
        >
          <Plus size={18} />
          Tambah Guru/Staf
        </Button>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
        <div className="relative max-w-sm">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <Input
            placeholder="Cari nama..."
            className="pl-10 rounded-xl border-slate-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="rounded-2xl border border-slate-100 overflow-x-auto">
          <Table className="min-w-200">
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-16">No</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedStaff.map((person, index) => (
                <TableRow key={person.ID}>
                  <TableCell className="font-medium text-slate-500">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-brand-primary overflow-hidden">
                        {person.foto ? (
                          <img
                            src={person.foto}
                            alt={person.nama}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User size={20} />
                        )}
                      </div>

                      <div className="font-bold text-slate-800">
                        {person.nama}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="px-3 py-1 rounded-full bg-brand-surface-alt text-brand-primary text-xs font-bold">
                      {person.jabatan}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={() => handleEdit(person.ID)}
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-brand-primary hover:bg-brand-surface-alt rounded-lg"
                      >
                        <Pencil size={16} />
                      </Button>

                      <AlertDialogDestructive
                        onDelete={() => handleDelete(person.ID)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <ReusablePagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <GuruFormDialog
        open={isDialogOpen}
        isEdit={isEdit}
        nama={nama}
        jabatan={jabatan}
        onOpenChange={handleDialogChange}
        onSubmit={handleSubmit}
        onNamaChange={setNama}
        onJabatanChange={setJabatan}
        onFotoChange={setFoto}
      />
    </div>
  );
}
