"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Play, ChevronRight, Lock, UserPlus, LogIn } from "lucide-react";
import { getProgress } from "@/lib/progress";

export default function HeroBanner() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [progress, setProgress] = useState({
    totalStars: 12,
    completedActivities: [] as string[],
  });

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
      setProgress(getProgress());

      // Cek apakah user sudah login/mendaftar
      const user = localStorage.getItem("user_name");
      if (user) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  const totalStars = mounted ? progress.totalStars : 12;
  const completedCount = mounted ? progress.completedActivities.length : 0;

  const handleCtaClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 pb-8">
        {/* Main Banner Container */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 p-6 sm:p-10 lg:p-12 shadow-lg shadow-sky-500/10 min-h-[380px] sm:min-h-[420px] flex flex-col justify-between border border-sky-100">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-50 mix-blend-multiply pointer-events-none"
            style={{
              backgroundImage: `url('https://www.shutterstock.com/image-vector/element-shape-design-geometric-abstract-260nw-2460830135.jpg')`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-sky-100/90 via-sky-100/70 to-transparent z-0 pointer-events-none" />

          {/* Content Section */}
          <div className="relative z-10 max-w-xl flex flex-col items-start gap-4">
            {/* Badge Tag Dinamis */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 backdrop-blur-sm border border-amber-200 text-amber-800 text-xs font-extrabold shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>
                {totalStars} Bintang Dikumpulkan • {completedCount} Misi Selesai
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-800 leading-tight">
              Jelajah <span className="text-amber-600">Bangun Datar</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg font-bold text-slate-700 leading-snug">
              Petualangan Mengenal Bangun Datar dengan Cara yang Seru dan
              Interaktif!
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
              Ayo, jelajahi bangun datar melalui permainan edukatif yang
              menyenangkan. Tingkatkan pemahamanmu sambil bersenang-senang!
            </p>

            {/* Action CTA Button */}
            <div className="pt-2">
              <Link
                href="/materi"
                onClick={handleCtaClick}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-extrabold text-sm shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-slate-900/10 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-slate-900 text-slate-900 ml-0.5" />
                </div>
                <span>Mulai Petualangan</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Peringatan Wajib Login / Daftar */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs px-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-5 border border-sky-100 shadow-xl relative">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-extrabold text-[10px] uppercase tracking-wider">
                Akses Terbatas
              </span>
              <h3 className="text-lg font-black text-slate-800">
                Yuk, Masuk atau Daftar Dulu!
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Kamu harus masuk ke akunmu atau mendaftar secara gratis terlebih
                dahulu untuk memulai petualangan belajar.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={() => router.push("/login")}
                className="py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk</span>
              </button>

              <button
                onClick={() => router.push("/register")}
                className="py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Daftar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
