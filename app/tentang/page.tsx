"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Target,
  Compass,
  Sparkles,
  Gamepad2,
  BookOpen,
  Award,
  Users,
  Heart,
  ChevronRight,
  Globe,
  Quote,
  Lock,
  LogIn,
  UserPlus,
} from "lucide-react";

const featuresList = [
  {
    title: "Pembelajaran Interaktif",
    desc: "Metode belajar visual dan berbasis permainan (gamifikasi) yang membuat materi Bangun Datar jadi menyenangkan.",
    icon: Gamepad2,
    color: "bg-indigo-500 text-white",
    border: "border-indigo-100",
    bg: "bg-indigo-50/50",
  },
  {
    title: "Kurikulum Bangun Datar Terpadu",
    desc: "Mengenalkan sifat-sifat bangun datar dan aplikasinya dalam kehidupan sehari-hari.",
    icon: Globe,
    color: "bg-emerald-500 text-white",
    border: "border-emerald-100",
    bg: "bg-emerald-50/50",
  },
  {
    title: "Sistem Hadiah & Lencana",
    desc: "Mendorong motivasi belajar melalui pengumpulan poin, bintang, level, serta lencana prestasi yang membanggakan.",
    icon: Award,
    color: "bg-amber-500 text-white",
    border: "border-amber-100",
    bg: "bg-amber-50/50",
  },
  {
    title: "Mudah Diakses Kapan Saja",
    desc: "Dapat diakses melalui laptop, tablet, maupun smartphone untuk mendukung belajar mandiri siswa.",
    icon: BookOpen,
    color: "bg-blue-500 text-white",
    border: "border-blue-100",
    bg: "bg-blue-50/50",
  },
];

export default function TentangPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
      const user = localStorage.getItem("user_name");
      if (user) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  const handleProtectedClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50/40 pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 space-y-6">
        {/* ================= 1. HEADER BANNER MATERI ================= */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-200 via-sky-300 to-emerald-200 p-6 sm:p-8 border border-sky-100 shadow-sm">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop')`,
            }}
          />

          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Beranda
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-800">Tentang MatchVenture</span>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                  Tentang MatchVenture
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-medium">
                  MatchVenture adalah platform pembelajaran interaktif yang
                  dirancang untuk membantu siswa memahami konsep geometri
                  melalui petualangan edukasi digital.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 2. VISI & MISI ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-amber-300">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-sky-200 tracking-wider uppercase">
                  Visi Kami
                </span>
                <h2 className="text-xl sm:text-2xl font-black mt-1 leading-snug">
                  Mewujudkan Generasi Muda yang Cerdas, Memahami Bangun Datar,
                  dan Mempermudah Pembelajaran.
                </h2>
              </div>
              <p className="text-xs text-sky-100 leading-relaxed font-medium">
                Melalui petualangan edukasi digital Jelajah Bangun Datar, kami
                ingin menginspirasi siswa untuk mengeksplorasi konsep geometri
                serta memahami sifat-sifat bangun datar secara interaktif.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-sky-200">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Belajar hari ini, untuk jadi Master Geometri esok</span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs flex flex-col justify-between space-y-5">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-600" />
              <h3 className="font-extrabold text-slate-800 text-base">
                Misi Pembelajaran
              </h3>
            </div>

            <div className="space-y-4">
              {[
                {
                  num: "01",
                  title: "Menyajikan Pembelajaran Bermakna",
                  desc: "Mengemas materi Bangun Datar yang interaktif.",
                },
                {
                  num: "02",
                  title: "Mendorong Kemandirian & Keterlibatan Siswa",
                  desc: "Memberikan pengalaman belajar berbasis proyek dan tantangan level yang melatih berpikir kritis.",
                },
                {
                  num: "03",
                  title: "Menanamkan Pemahaman Konsep Bangun Datar",
                  desc: "Mengenalkan keberagaman sifat-sifat bangun datar dan aplikasinya dalam kehidupan sehari-hari.",
                },
              ].map((misi, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-sky-50/50 border border-sky-100/80"
                >
                  <span className="font-black text-blue-600 text-base shrink-0">
                    {misi.num}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      {misi.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                      {misi.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= 3. KEUNGGULAN PLATFORM ================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-extrabold text-xs">
              Keunggulan
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              Mengapa Belajar di{" "}
              <span className="text-blue-600">MatchVenture?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Dirancang khusus untuk menghadirkan pengalaman belajar yang seru,
              efektif, dan penuh motivasi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuresList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border ${item.border} ${item.bg} flex flex-col justify-between gap-4 shadow-xs hover:shadow-md transition-all`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center shadow-sm`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= 4. TIM & CTA ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <h3 className="font-extrabold text-slate-800 text-base">
                Dikembangkan dengan Semangat Edukasi
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Platform MatchVenture dikembangkan sebagai wujud kontribusi dalam
              pemanfaatan teknologi untuk dunia pendidikan di Indonesia. Kami
              terus berinovasi untuk menyajikan materi-materi sekolah secara
              interaktif, visual, dan menyenangkan bagi anak-anak Indonesia.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 pt-2">
              <Heart className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              <span>Dibuat khusus untuk Siswa di Indonesia</span>
            </div>
          </div>

          <div className="lg:col-span-4 bg-gradient-to-br from-sky-400 to-blue-600 rounded-3xl p-6 text-white shadow-md space-y-4 text-center">
            <Quote className="w-6 h-6 text-sky-200 mx-auto" />
            <div>
              <h4 className="font-black text-base">Siap Menjelajah?</h4>
              <p className="text-xs text-sky-100 mt-1 font-medium">
                Mulai petualangan belajarmu sekarang dan raih prestasimu!
              </p>
            </div>
            <Link
              href="/materi"
              onClick={handleProtectedClick}
              className="w-full py-2.5 rounded-full bg-white hover:bg-slate-100 text-blue-700 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all block cursor-pointer"
            >
              <span>Mulai Belajar Sekarang</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ================= MODAL PERINGATAN WAJIB LOGIN / DAFTAR ================= */}
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
                dahulu untuk mulai belajar dan menjelajahi materi.
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
    </div>
  );
}
