"use client"

import Sidebar from "@/components/news/SideNews";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import PageHero from "@/components/shared/PageHero";
import Image from "next/image";
import { Quote } from "lucide-react";
import { useKepalaDetail } from "@/hook/useKepala";

export default function Home() {
  const { kepala, loading, error } = useKepalaDetail(1);

  loading;
  error;

  return (
    <main className="bg-white min-h-screen">
      <PageHero
        title="Sambutan Kepala Sekolah"
        imageUrl="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920&auto=format&fit=crop"
        alt="Sambutan"
        breadcrumbs={[{ label: "Sambutan" }]}
      />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          <section className="lg:col-span-3 space-y-12">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              {/* Profile Image */}
              <RevealOnScroll direction="left" className="relative w-full max-w-[300px] aspect-[3/4] shrink-0">
                <div className="absolute -inset-4 border-2 border-brand-primary/20 rounded-3xl translate-x-4 translate-y-4 -z-10" />
                <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl bg-slate-200">
                  {kepala?.foto ? (
                    <img
                      src={kepala?.foto || ""}
                      alt="Kepala Sekolah"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#a1a1aa" className="w-32 h-32 opacity-60">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-primary to-transparent text-white">
                    <p className="font-heading font-bold text-lg">{kepala?.name}</p>
                    <p className="text-xs uppercase tracking-widest text-white/80">Kepala Sekolah</p>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Message Content */}
              <RevealOnScroll direction="right" className="flex-1 space-y-8">
                <div className="relative pl-10 border-l-4 border-brand-primary/20 italic text-xl text-slate-600 leading-relaxed">
                  <Quote className="absolute -left-2 -top-6 text-brand-primary/10 w-20 h-20 -z-10" />
                  <div
                    className="space-y-4 text-slate-600 leading-relaxed text-lg italic"
                    dangerouslySetInnerHTML={{ __html: kepala?.content || "" }}
                  />
                </div>

                <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                  <p>
                    Selamat datang di website resmi <strong>SMA Negeri 1 Bangunrejo</strong>. Website ini kami hadirkan sebagai media informasi, komunikasi, dan kolaborasi bagi seluruh warga sekolah serta masyarakat luas.
                  </p>
                  <p>
                    Melalui platform ini, kami ingin menghadirkan informasi sekolah yang lebih cepat, terbuka, dan bermanfaat. Kami percaya bahwa sinergi antara sekolah, orang tua, dan masyarakat adalah kunci utama dalam mencetak generasi masa depan yang luar biasa.
                  </p>
                  <p>
                    Terima kasih atas kunjungan Anda. Mari kita bersama-sama membangun masa depan pendidikan yang lebih baik bagi putra-putri bangsa.
                  </p>
                </div>

                <div className="pt-8">
                  <p className="font-heading font-bold text-slate-900 text-lg uppercase tracking-wider">Muhammad Zaenudin S.Pd</p>
                  <p className="text-brand-primary font-bold text-sm">Kepala Sekolah SMA N 1 Bangunrejo</p>
                </div>
              </RevealOnScroll>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <RevealOnScroll direction="left" delayClassName="delay-300">
              <Sidebar />
            </RevealOnScroll>
          </aside>
        </div>
      </div>
    </main>
  );
}
