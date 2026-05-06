"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type GuruFormDialogProps = {
  open: boolean;
  isEdit: boolean;
  nama: string;
  jabatan: string;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onNamaChange: (value: string) => void;
  onJabatanChange: (value: string) => void;
  onFotoChange: (file: File | null) => void;
};

export default function GuruFormDialog({
  open,
  isEdit,
  nama,
  jabatan,
  onOpenChange,
  onSubmit,
  onNamaChange,
  onJabatanChange,
  onFotoChange,
}: GuruFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-[32px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEdit ? "Edit Guru & Staf" : "Tambah Guru & Staf"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Masukkan Nama..."
            value={nama}
            onChange={(e) => onNamaChange(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Masukkan Jabatan..."
            value={jabatan}
            onChange={(e) => onJabatanChange(e.target.value)}
          />

          <Input
            type="file"
            onChange={(e) => onFotoChange(e.target.files?.[0] || null)}
          />

          <DialogFooter>
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              variant="outline"
            >
              Batal
            </Button>

            <Button type="submit" className="bg-brand-primary">
              {isEdit ? "Update" : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
