"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Music2,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { menuData } from "@/lib/data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/324948335046042",
      hoverBg: "hover:bg-blue-600",
      hoverText: "hover:text-white",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/smansabangunrejo/?hl=en",
      hoverBg:
        "hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600",
      hoverText: "hover:text-white",
      label: "Instagram",
    },
    {
      icon: Music2,
      href: "https://www.tiktok.com/@osissmansabangunrejo_?is_from_webapp=1&sender_device=pc",
      hoverBg: "hover:bg-slate-100",
      hoverText: "hover:text-slate-900",
      label: "TikTok",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/channel/UCWwq4domYrvlazIWwi9IENQ",
      hoverBg: "hover:bg-red-600",
      hoverText: "hover:text-white",
      label: "Youtube",
    },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 overflow-hidden relative">
      {/* Decorative Gradient Blur */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-primary/10 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Branding & Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3" prefetch={false}>
              <div className="relative w-12 h-12">
                <Image
                  src="/img/Smansa.ico"
                  alt="Logo SMAN 1 Bangunrejo"
                  fill
                  className="object-contain brightness-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-white text-lg leading-tight uppercase tracking-tight">
                  SMA Negeri 1
                </span>
                <span className="font-heading font-bold text-brand-secondary text-lg leading-tight uppercase tracking-tight">
                  Bangunrejo
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Membentuk generasi cerdas, berkarakter, dan berdaya saing global
              berlandaskan iman dan takwa.
            </p>
            <div className="flex items-center gap-4">
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Kunjungi ${social.label} kami`}
                  whileHover={{
                    scale: 1.15,
                    rotate: 5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm",
                    "bg-slate-900/50 border border-slate-800 text-slate-400 backdrop-blur-sm",
                    social.hoverBg,
                    social.hoverText,
                  )}
                >
                  <social.icon size={20} strokeWidth={2.5} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Tautan Cepat */}
          <div className="space-y-6 lg:pl-8">
            <h4 className="text-white font-heading font-bold text-lg">
              Tautan Cepat
            </h4>
            <ul className="space-y-3">
              {menuData.slice(1).map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 hover:text-white transition-colors text-sm"
                  >
                    <ArrowRight
                      size={14}
                      className="text-brand-primary transition-transform group-hover:translate-x-1"
                    />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Kontak Kami */}
          <div className="space-y-6">
            <h4 className="text-white font-heading font-bold text-lg">
              Kontak Kami
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <MapPin size={20} className="text-brand-primary shrink-0" />
                <span className="text-sm leading-relaxed">
                  Jl. Raya Sidorejo, Kec. Bangunrejo, <br />
                  Kab. Lampung Tengah, Lampung 34173
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-brand-primary shrink-0" />
                <span className="text-sm">+62 811-7970-1215</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-brand-primary shrink-0" />
                <span className="text-sm">info@sman1bangunrejo.sch.id</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Lokasi Map */}
          <div className="space-y-6">
            <h4 className="text-white font-heading font-bold text-lg">
              Lokasi Sekolah
            </h4>
            <div className="rounded-xl overflow-hidden grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 border border-slate-800 aspect-video relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.599073888293!2d105.0142012!3d-5.168013500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e474b21204d4515%3A0xb961d99aa077aa7d!2sSMAN%201%20Bangunrejo!5e0!3m2!1sid!2sid!4v1714451820610!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Lokasi SMAN 1 Bangunrejo"
              />
              <div className="absolute inset-0 bg-brand-primary/10 pointer-events-none group-hover:opacity-0 transition-opacity" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500">
            © {currentYear}{" "}
            <span className="text-slate-400 font-bold">
              SMA Negeri 1 Bangunrejo
            </span>
            . All Rights Reserved.
          </p>
          <p className="text-xs text-slate-600 flex flex-col items-center md:items-end gap-1 font-medium">
            <span>Built by</span>

            <a
              href="https://github.com/dehendywijay"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group/name px-1.5 py-0.5"
            >
              <span className="relative z-10 text-brand-primary font-bold transition-all duration-300 group-hover/name:text-white inline-block group-hover/name:scale-110">
                Dehendy
              </span>
              <span className="absolute inset-0 bg-brand-primary scale-x-0 group-hover/name:scale-x-100 transition-transform duration-300 origin-left rounded-md -z-0" />
            </a>

            <a
              href="https://github.com/DikaRamadhani"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group/name px-1.5 py-0.5"
            >
              <span className="relative z-10 text-brand-primary font-bold transition-all duration-300 group-hover/name:text-white inline-block group-hover/name:scale-110">
                Dika
              </span>
              <span className="absolute inset-0 bg-brand-primary scale-x-0 group-hover/name:scale-x-100 transition-transform duration-300 origin-left rounded-md -z-0" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
