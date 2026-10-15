"use client";

import Link from "next/link";
import { Compass, Home, MapPin, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sky-50/50 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-sky-100 shadow-xl space-y-6 relative overflow-hidden">
        {/* Glow Background Effect */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-200/40 rounded-full blur-2xl pointer-events-none" />

        {/* Animated Icon */}
        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 animate-bounce">
            <Compass className="w-10 h-10" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-extrabold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Waduh, Tersesat!</span>
          </div>

          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            404 - Halaman Tidak Ditemukan
          </h1>

          <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
            Sepertinya pulau atau alur petualangan yang kamu cari tidak ada di
            dalam peta LearnBox.
          </p>
        </div>

        {/* Back Button */}
        <div className="pt-2 relative z-10">
          <Link
            href="/"
            className="w-full py-3 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Peta Utama (Beranda)</span>
          </Link>
        </div>

        <div className="pt-2 text-[11px] font-bold text-slate-400 flex items-center justify-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-blue-500" />
          <span>Jelajah Nusantara • LearnBox</span>
        </div>
      </div>
    </div>
  );
}
