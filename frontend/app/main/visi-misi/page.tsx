import Sidebar from "@/components/news/SideNews";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import PageHero from "@/components/shared/PageHero";
import { Target, Lightbulb, CheckCircle2, ShieldCheck, Heart } from "lucide-react";

export default function Home() {
  const missions = [
    "Memperkuat keimanan dan ketaqwaan kepada Tuhan Yang Maha Esa melalui pendidikan agama dan pembiasaan religius.",
    "Meningkatkan prestasi akademik dan non-akademik melalui pembelajaran yang efektif dan pengembangan potensi peserta didik.",
    "Mengembangkan budaya sekolah yang unggul, disiplin, dan berkarakter.",
    "Mewujudkan lingkungan sekolah yang hijau, bersih, sehat, dan peduli lingkungan (Adiwiyata)."
  ];

  return (
    <main className="bg-white min-h-screen">
      <PageHero 
        title="Visi dan Misi" 
        imageUrl="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920&auto=format&fit=crop" 
        alt="Visi Misi"
        breadcrumbs={[{ label: "Visi & Misi" }]}
      />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          <section className="lg:col-span-3 space-y-20">
            
            {/* Visi Section */}
            <RevealOnScroll direction="up" className="relative p-12 rounded-[40px] bg-brand-primary text-white overflow-hidden shadow-2xl shadow-brand-primary/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="relative z-10 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                  <Lightbulb size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">Visi Sekolah</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold leading-tight">
                  Terwujudnya insan yang <span className="text-brand-secondary">berakhlak mulia</span>, berprestasi, berbudaya, dan berwawasan lingkungan.
                </h2>
              </div>
            </RevealOnScroll>

            {/* Misi Section */}
            <div className="space-y-12">
              <RevealOnScroll direction="up" className="space-y-4">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-surface-alt border border-brand-primary/10">
                  <Target size={16} className="text-brand-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Misi Kami</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900">
                  Langkah Strategis <span className="text-brand-primary">Masa Depan</span>
                </h2>
              </RevealOnScroll>

              <div className="grid gap-6">
                {missions.map((mission, index) => (
                  <RevealOnScroll 
                    key={index} 
                    direction="up" 
                    delayClassName={`delay-${index * 100}`}
                    className="group flex gap-6 p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-primary shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                      <CheckCircle2 size={24} />
                    </div>
                    <p className="text-slate-700 text-lg leading-relaxed pt-1">
                      {mission}
                    </p>
                  </RevealOnScroll>
                ))}
              </div>
            </div>

            {/* Tujuan Section */}
            <RevealOnScroll direction="up" className="p-12 rounded-[40px] bg-slate-900 text-white space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20">
                <ShieldCheck size={16} className="text-brand-secondary" />
                <span className="text-xs font-bold uppercase tracking-wider">Tujuan Utama</span>
              </div>
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-medium">
                Menghasilkan lulusan yang beriman, berakhlak mulia, memiliki kecakapan akademik yang kuat, serta siap melanjutkan ke jenjang pendidikan tinggi maupun dunia kerja.
              </p>
              <div className="pt-4 flex items-center gap-2 text-brand-secondary">
                <Heart size={20} fill="currentColor" />
                <span className="font-bold uppercase tracking-widest text-sm">Grow Together with SMANSA</span>
              </div>
            </RevealOnScroll>

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
