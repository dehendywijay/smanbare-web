import { MenuItem } from "@/types/type";


//data untuk menu navigasi
export const menuData: MenuItem[] = [
  {
    title: "Beranda",
    href: "/",
  },
  {
    title: "Tentang Kami",
    href: "/main/tentang-kami",
    subItems: [
      { title: "Profil Sekolah", href: "/main/tentang-kami" },
      { title: "Sambutan Kepala Sekolah", href: "/main/sambutan" },
      { title: "Visi & Misi", href: "/main/visi-misi" },
      { title: "Guru & Staff", href: "/main/guru-staf" },
      { title: "Berita Terbaru", href: "/main/berita" },

    ],
  },

  {
    title: "Alumni",
    href: "/main/alumni",
  },
  {
    title: "Ekskul",
    href: "/main/ekskul",
  },
  {
    title: "Hubungi Kami",
    href: "/main/hubungi-kami",
  },
];

//data bagian page tentang-kami
export const facilities = [
  { title: "Laboratorium Modern", description: "Lab Kimia, Fisika, Biologi, dan Komputer dengan peralatan terkini." },
  { title: "Perpustakaan Digital", description: "Akses ke ribuan buku, jurnal, dan sumber belajar online." },
  { title: "Lapangan Olahraga", description: "Fasilitas lengkap untuk basket, voli, futsal, dan atletik." },
  { title: "Ruang Seni & Musik", description: "Studio kedap suara dan panggung pertunjukan untuk kreativitas siswa." },
  { title: "Kantin Sehat", description: "Menyediakan makanan bergizi dan higienis bagi seluruh warga sekolah." },
  { title: "Wi-Fi Area", description: "Akses internet kecepatan tinggi di seluruh area sekolah." },
];


