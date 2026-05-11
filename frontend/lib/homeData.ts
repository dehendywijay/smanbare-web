import type { HeroSlide, SchoolStatConfig } from "@/types/home";

// Homepage hero carousel content.
export const heroSlides: HeroSlide[] = [
  {
    imageUrl: "/img/4.jpeg",
    alt: "SMA Negeri 1 - Gedung",
    title: "Selamat Datang di SMA N 1 Bangunrejo",
    subtitle: "Membentuk Generasi Cerdas dan Berkarakter",
  },
  {
    imageUrl: "/img/2.png",
    alt: "SMA Negeri 1 - Belajar",
    title: "Fasilitas Modern & Terlengkap",
    subtitle: "Mendukung Proses Belajar Mengajar secara Optimal",
  },
  {
    imageUrl: "/img/3.jpeg",
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

