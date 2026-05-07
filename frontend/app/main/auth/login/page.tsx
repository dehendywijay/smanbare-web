"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Home } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simpan nama ke localStorage agar bisa dibaca di Header
    localStorage.setItem("admin_name", username);
    // Logic login ditunda sesuai permintaan
    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Full-screen Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/library_reading_3d.png"
          alt="Library 3D"
          fill
          className="object-cover"
        />
        {/* Dark overlay to ensure text readability everywhere */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 flex w-full">
        {/* Left Side: Visual Branding (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-16 text-white">
          <Link href="/" className="flex items-center gap-3 w-max group">
            <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-110">
              <Image
                src="/img/Smansa.ico"
                alt="Logo"
                fill
                className="object-contain drop-shadow-md"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-heading font-bold text-xl leading-tight tracking-tight drop-shadow-md">
                SMA Negeri 1 Bangunrejo
              </span>
              <span className="font-poppins font-medium text-[11px] leading-none tracking-wide text-brand-secondary/90 drop-shadow-sm">
                B-STAR (Bertaqwa' Santun, Terampil' Adaptif, dan Responsip)
              </span>
            </div>
          </Link>

          <div className="space-y-6">
            <h1 className="text-5xl font-heading font-extrabold leading-tight drop-shadow-lg">
              Sistem Informasi <br />
              Manajemen Sekolah
            </h1>
            <p className="text-xl text-slate-200 max-w-md font-light drop-shadow-md">
              Kelola data berita, kegiatan, dan administrasi sekolah dalam satu platform yang terintegrasi.
            </p>
          </div>

          <div className="text-sm text-slate-300 drop-shadow-md">
            © {new Date().getFullYear()} SMAN 1 Bangunrejo. <br />
            Internal Access Only.
          </div>
        </div>

        {/* Right Side: Glassmorphism Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 relative">
          {/* Glass Panel Background */}
          <div className="absolute inset-y-0 right-0 w-full bg-white/10 backdrop-blur-5xl border-l border-white/5 shadow-1xl" />

          <div className="w-full max-w-md space-y-10 relative z-10">
            <div className="space-y-2">
              <Link href="/" className="inline-flex lg:hidden items-center gap-2 text-white font-medium mb-6 hover:text-brand-secondary transition-colors">
                <Home size={18} /> Kembali ke Beranda
              </Link>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white drop-shadow-sm">Selamat Datang</h2>
              <p className="text-slate-300">Silakan masuk ke akun admin Anda.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-200 ml-1">Username</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-white transition-colors z-10" size={20} />
                    <input
                      type="text"
                      placeholder="Masukkan Username Anda"
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all text-white placeholder:text-slate-400 backdrop-blur-md"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-200 ml-1">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-white transition-colors z-10" size={20} />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all text-white placeholder:text-slate-400 backdrop-blur-md"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/30 bg-white/10 text-brand-primary focus:ring-white/50" />
                  <span className="text-slate-300 font-medium">Ingat saya</span>
                </label>
                <Link href="#" className="text-white font-semibold hover:text-brand-secondary transition-colors drop-shadow-sm">Lupa Password?</Link>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-primary/90 hover:bg-brand-primary text-white py-4 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(29,78,216,0.4)] hover:shadow-[0_0_30px_rgba(29,78,216,0.6)] border border-brand-primary-light/30 flex items-center justify-center gap-2 group active:scale-[0.98] backdrop-blur-md cursor-pointer"
              >
                Masuk Sekarang
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            <p className="text-center text-slate-300 text-sm">
              Butuh bantuan akses? <Link href="/main/hubungi-kami" className="text-white font-bold hover:text-brand-secondary transition-colors">Hubungi IT Support</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
