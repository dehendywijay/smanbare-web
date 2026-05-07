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
    title: "Galeri",
    href: "/main/galeri",
    subItems: [
      { title: "Dokumentasi Kegiatan", href: "/main/galeri/dokumentasi" },
      { title: "Video Kegiatan", href: "/main/galeri/video" },
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


export const galleryData = {
  dokumentasi: [
    { title: "Upacara Hari Guru", date: "25 Nov 2023", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop" },
    { title: "Lomba HUT RI", date: "17 Agu 2023", image: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=800&auto=format&fit=crop" },
    { title: "Pentas Seni Smansa", date: "10 Okt 2023", image: "https://images.unsplash.com/photo-1514525253344-99a42994a438?q=80&w=800&auto=format&fit=crop" },
    { title: "Kegiatan Bakti Sosial", date: "05 Des 2023", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop" },
  ],
  videos: [
    { title: "Profile SMAN 1 Bangunrejo", date: "2023", youtubeId: "dQw4w9WgXcQ" },
    { title: "Highlight HUT Ke-30", date: "2023", youtubeId: "dQw4w9WgXcQ" },
  ]
};

export const Kategori={
  berita : "Berita",
  pengumuman : "Pengumuman",
  prestasi : "Prestasi"
}