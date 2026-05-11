import type { HeroSlide, SchoolStatConfig } from "@/types/home";

// Homepage hero carousel content.
export const heroSlides: HeroSlide[] = [
  {
    imageUrl: "/img/Sma.jpeg",
    alt: "SMA Negeri 1 - Gedung",
    title: "Selamat Datang di SMA N 1 Bangunrejo",
    subtitle: "Membentuk Generasi Cerdas dan Berkarakter",
  },
  {
    imageUrl: "/img/Sman.jpeg",
    alt: "SMA Negeri 1 - Belajar",
    title: "Fasilitas Modern & Terlengkap",
    subtitle: "Mendukung Proses Belajar Mengajar secara Optimal",
  },
  {
    imageUrl: "/img/Smansa_tugu.jpeg",
    alt: "SMA Negeri 1 - Ekskul",
    title: "Raih Prestasi Bersama Kami",
    subtitle: "Beragam Pilihan Ekstrakurikuler Unggulan",
  },
];

// Homepage stats content using icon keys to keep this file presentation-agnostic.
export const schoolStatsConfig: SchoolStatConfig[] = [
  { label: "Total Siswa", value: 557, iconKey: "students" },
  { label: "Guru & Tendik", value: 49, iconKey: "teachers" },
  { label: "Total Alumni", value: 642, iconKey: "alumni" },
];

