import PageHero from "@/components/shared/PageHero";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { facilities } from "@/lib/data";
import { 
  History, 
  Target, 
  Building2, 
  Library, 
  FlaskConical, 
  Monitor, 
  Trophy, 
  Music, 
  HeartPulse 
} from "lucide-react";

const facilityIcons: Record<string, any> = {
  "Perpustakaan": Library,
  "Laboratorium IPA": FlaskConical,
  "Laboratorium Komputer": Monitor,
  "Lapangan Olahraga": Trophy,
  "Ruang Kesenian": Music,
  "UKS": HeartPulse,
};

export default function TentangKamiPage() {
  return (
    <main className="bg-white min-h-screen">
      <PageHero 
        title="Tentang Kami" 
        imageUrl="/img/Sma.jpeg" 
        alt="Tentang Kami"
        breadcrumbs={[{ label: "Tentang Kami" }]}
      />

      <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
        {/* Sejarah Section */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <RevealOnScroll direction="left" className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-surface-alt border border-brand-primary/10">
              <History size={16} className="text-brand-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Sejarah Sekolah</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 leading-tight">
              Pilar Pendidikan Sejak <span className="text-brand-primary">1980</span>
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
              <p>
                Berdiri sejak tahun 1980, SMA Negeri 1 Bangunrejo telah menjadi salah satu pilar pendidikan di kota kami. Bermula dari sebuah bangunan sederhana, sekolah ini terus berkembang dan berinovasi untuk memberikan pendidikan berkualitas yang relevan dengan tantangan zaman.
              </p>
              <p>
                Dengan dedikasi para pendiri dan dukungan masyarakat, SMANSA telah melahirkan ribuan alumni yang berprestasi di berbagai bidang, baik di tingkat nasional maupun internasional. Kami bangga menjadi bagian dari perjalanan mereka dan akan terus berkomitmen untuk mencetak generasi penerus yang unggul dan berkarakter.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=1000&auto=format&fit=crop" 
              alt="Gedung Sekolah" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brand-primary/10 mix-blend-overlay" />
          </RevealOnScroll>
        </section>

        {/* Fasilitas Section */}
        <section className="space-y-16">
          <RevealOnScroll direction="up" className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-surface-alt border border-brand-primary/10">
              <Building2 size={16} className="text-brand-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Sarana & Prasarana</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900">
              Fasilitas <span className="text-brand-primary">Unggulan</span>
            </h2>
            <p className="text-slate-600">
              Kami menyediakan fasilitas modern dan lengkap untuk menunjang aktivitas akademik dan non-akademik siswa.
            </p>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => {
              const Icon = facilityIcons[facility.title] || Building2;
              return (
                <RevealOnScroll 
                  key={facility.title} 
                  direction="up" 
                  delayClassName={`delay-${index * 100}`}
                  className="group relative bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-brand-primary/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-slate-900 mb-3 group-hover:text-brand-primary transition-colors">
                    {facility.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {facility.description}
                  </p>
                  
                  {/* Decorative line */}
                  <div className="absolute bottom-0 left-8 right-8 h-1 bg-brand-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
                </RevealOnScroll>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

import Image from "next/image";
