"use client";

import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Home } from "lucide-react";
import { useAuth } from "../authcontext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(username, password);
      toast.success("Login berhasil");
      router.push("/admin");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error || "Username atau password salah",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-white">
      {/* Left Side: Visual Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 text-white">
        {/* Background Image scoped to left side */}
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

        <div className="relative z-10 flex flex-col h-full justify-between">
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
                B-STAR (Bertaqwa&apos; Santun, Terampil&apos; Adaptif, dan Responsip)
              </span>
            </div>
          </Link>

          <div className="space-y-6">
            <h1 className="text-5xl font-heading font-extrabold leading-tight drop-shadow-lg">
              Sistem Informasi <br />
              Manajemen Sekolah
            </h1>
            <p className="text-xl text-slate-200 max-w-md font-light drop-shadow-md">
              Kelola data berita, kegiatan, dan administrasi sekolah dalam satu
              platform yang terintegrasi.
            </p>
          </div>

          <div className="text-sm text-slate-300 drop-shadow-md">
            © {new Date().getFullYear()} SMAN 1 Bangunrejo. <br />
            Internal Access Only.
          </div>
        </div>
      </div>

      {/* Right Side: Plain White Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white">
        <div className="w-full max-w-md space-y-10">
          <div className="space-y-2">
            <Link
              href="/"
              className="inline-flex lg:hidden items-center gap-2 text-slate-500 font-medium mb-6 hover:text-brand-primary transition-colors"
            >
              <Home size={18} /> Kembali ke Beranda
            </Link>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-800">
              Selamat Datang
            </h2>
            <p className="text-slate-500">
              Silakan masuk ke akun admin Anda.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Username
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors z-10"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Masukkan Username Anda"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors z-10"
                    size={20}
                  />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 bg-white text-brand-primary focus:ring-brand-primary/50"
                />
                <span className="text-slate-600 font-medium">Ingat saya</span>
              </label>
              <Link
                href="#"
                className="text-brand-primary font-semibold hover:text-brand-primary-dark transition-colors"
              >
                Lupa Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-primary/90 hover:bg-brand-primary text-white py-4 rounded-2xl font-bold transition-all shadow-[0_4px_14px_0_rgba(29,78,216,0.39)] hover:shadow-[0_6px_20px_rgba(29,78,216,0.23)] border border-brand-primary-light/30 flex items-center justify-center gap-2 group active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Memproses..." : "Masuk Sekarang"}
              {!loading && (
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm">
            Butuh bantuan akses?{" "}
            <Link
              href="/main/hubungi-kami"
              className="text-brand-primary font-bold hover:text-brand-primary-dark transition-colors"
            >
              Hubungi IT Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
