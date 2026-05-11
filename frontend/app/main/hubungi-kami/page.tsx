import Sidebar from "@/components/news/SideNews";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import PageHero from "@/components/shared/PageHero";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  ChevronDown
} from "lucide-react";

export default function ContactPage() {
  const contactInfo = [
    {
      title: "Alamat",
      detail: "Jl. Raya Sidorejo, Kec. Bangunrejo, Kab. Lampung Tengah",
      icon: MapPin,
    },
    {
      title: "Telepon",
      detail: "+62 811-7970-1215",
      icon: Phone,
    },
    {
      title: "Email",
      detail: "info@sman1bangunrejo.sch.id",
      icon: Mail,
    },
    {
      title: "Jam Layanan",
      detail: "Senin - Jumat, 07.00 - 15.00 WIB",
      icon: Clock,
    },
  ];

  return (
    <main className="bg-white min-h-screen">
      <PageHero
        title="Hubungi Kami"
        imageUrl="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920&auto=format&fit=crop"
        alt="Hubungi Kami"
        breadcrumbs={[{ label: "Hubungi Kami" }]}
      />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          {/* Main Content */}
          <section className="lg:col-span-3 space-y-20">

            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-8">
              {contactInfo.map((info, index) => (
                <RevealOnScroll
                  key={index}
                  direction="up"
                  delayClassName={`delay-${index * 100}`}
                  className="group flex gap-6 p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-primary shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                    <info.icon size={28} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-lg text-slate-900">{info.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{info.detail}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            {/* Contact Form & FAQ */}
            <div className="grid md:grid-cols-2 gap-16">
              {/* Form */}
              <RevealOnScroll direction="left" className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-heading font-extrabold text-slate-900">Kirim Pesan</h3>
                  <p className="text-slate-500 text-sm">Punya pertanyaan? Kirim pesan langsung kepada tim kami.</p>
                </div>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Nama Lengkap" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors text-sm" />
                    <input type="email" placeholder="Email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors text-sm" />
                  </div>
                  <input type="text" placeholder="Subjek" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors text-sm" />
                  <textarea placeholder="Pesan Anda" rows={5} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-colors text-sm" />
                  <button className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 group">
                    Kirim Sekarang <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
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
