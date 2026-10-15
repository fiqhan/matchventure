"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  BarChart2,
  Trophy,
  CheckCircle2,
  Lock,
  ChevronRight,
  BookOpen,
  Star,
  Award,
  Zap,
  LogIn,
  UserPlus,
  Sparkles,
  X,
} from "lucide-react";
import { getProgress, UserProgress } from "@/lib/progress";

export default function ProgresPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [lockedZoneName, setLockedZoneName] = useState("");
  const [progress, setProgress] = useState<UserProgress>({
    totalXp: 0,
    totalStars: 0,
    completedActivities: [],
    unlockedRewards: [],
    streakDays: 1,
    lastActiveDate: "",
  });

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
      const user = localStorage.getItem("user_name");
      if (user) {
        setIsLoggedIn(true);
        setProgress(getProgress());
      } else {
        setShowAuthModal(true);
      }
    });
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-sky-50/40 flex items-center justify-center">
        <div className="text-xs font-bold text-slate-400">
          Memuat Progres Belajar...
        </div>
      </div>
    );
  }

  const completedActivities = progress.completedActivities || [];

  // Menghitung data dinamis berdasarkan aktivitas yang selesai di localStorage
  const level1CompletedCount = ["akt-1", "akt-2", "akt-3", "akt-4"].filter(
    (id) => completedActivities.includes(id),
  ).length;
  const level1ProgressPercent = Math.round((level1CompletedCount / 4) * 100);

  // Data Zona Pembelajaran Dinamis
  const zonesData = [
    {
      id: 1,
      title: "Persegi",
      desc: "Kenali bentuk-bentuk, rumus, dan sifat-sifat persegi.",
      progress: level1ProgressPercent,
      status: level1ProgressPercent === 100 ? "Selesai" : "Sedang Berjalan",
      comingSoon: false,
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Persegi Panjang",
      desc: "Kenali bentuk-bentuk, rumus, dan sifat-sifat persegi panjang.",
      progress: 0,
      status: "Segera Hadir",
      comingSoon: true,
      image:
        "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Segitiga",
      desc: "Kenali bentuk-bentuk, rumus, dan sifat-sifat segitiga.",
      progress: 0,
      status: "Segera Hadir",
      comingSoon: true,
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Lingkaran",
      desc: "Kenali bentuk-bentuk, rumus, dan sifat-sifat lingkaran.",
      progress: 0,
      status: "Segera Hadir",
      comingSoon: true,
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Trapesium",
      desc: "Kenali bentuk-bentuk, rumus, dan sifat-sifat trapesium.",
      progress: 0,
      status: "Segera Hadir",
      comingSoon: true,
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
    },
  ];

  // Data Pencapaian Dinamis
  const achievementsData = [
    {
      title: "Pembelajar Semangat",
      desc: "Selesaikan aktivitas pertama",
      icon: Star,
      color: "bg-amber-400 text-white",
      unlocked: completedActivities.length > 0,
    },
    {
      title: "Pecinta Bangun Datar",
      desc: "Selesaikan minimal 2 aktivitas",
      icon: BookOpen,
      color: "bg-blue-500 text-white",
      unlocked: completedActivities.length >= 2,
    },
    {
      title: "Ahli Bangun Datar",
      desc: "Selesaikan semua aktivitas Level 1",
      icon: Award,
      color: "bg-emerald-500 text-white",
      unlocked: level1CompletedCount >= 4,
    },
    {
      title: "Master Geometri",
      desc: "Selesaikan semua zona",
      icon: Trophy,
      color: "bg-purple-500 text-white",
      unlocked: false,
    },
  ];

  const handleZoneClick = (zone: (typeof zonesData)[0]) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    if (zone.comingSoon) {
      setLockedZoneName(`Level ${zone.id}: ${zone.title}`);
      setShowComingSoonModal(true);
      return;
    }

    router.push(`/materi`);
  };

  return (
    <div className="min-h-screen bg-sky-50/40 pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 space-y-6">
        {/* ================= 1. HEADER BANNER ================= */}
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
              <span className="text-slate-800">Progres Belajar</span>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                  Progres Belajar
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-medium">
                  Lihat sejauh mana perjalanan belajarmu dalam menjelajahi
                  Bangun Datar. Pantau pencapaian, selesaikan zona, dan raih
                  prestasi!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3-COLUMN MAIN LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ---------------- 2. LEFT SIDEBAR: PROFILE & STATS ---------------- */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 overflow-hidden shrink-0 border border-sky-200 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=200&auto=format&fit=crop"
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm">
                    {localStorage.getItem("user_name") || "Petualang Hebat!"}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                    Jelajahi Bangun Datar, raih ilmu!
                  </p>
                </div>
              </div>

              <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-amber-500" /> Level 1
                  </span>
                  <span className="text-[10px] font-extrabold text-blue-600">
                    {level1ProgressPercent}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-500"
                    style={{ width: `${level1ProgressPercent}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400 font-bold text-right">
                  {level1CompletedCount} / 4 Aktivitas Selesai
                </div>
              </div>

              <div className="space-y-2.5 pt-1 border-t border-slate-100 text-xs">
                {[
                  {
                    label: "Zona Selesai",
                    value: `${level1CompletedCount === 4 ? 1 : 0} / 5`,
                    icon: CheckCircle2,
                    color: "text-emerald-500",
                  },
                  {
                    label: "Aktivitas Selesai",
                    value: `${completedActivities.length} Aktivitas`,
                    icon: BookOpen,
                    color: "text-blue-500",
                  },
                  {
                    label: "Total XP",
                    value: `${progress.totalXp} XP`,
                    icon: Zap,
                    color: "text-amber-500",
                  },
                  {
                    label: "Total Bintang",
                    value: `${progress.totalStars} Bintang`,
                    icon: Star,
                    color: "text-purple-500",
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between font-semibold text-slate-600"
                  >
                    <span className="flex items-center gap-2">
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      {stat.label}
                    </span>
                    <span className="font-extrabold text-slate-800">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ---------------- 3. CENTER: ZONA PEMBELAJARAN LIST ---------------- */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-xs space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-blue-600 text-sm">
                    📍
                  </span>
                  <h2 className="font-extrabold text-slate-800 text-base">
                    Zona Pembelajaran
                  </h2>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Lima zona pembelajaran yang akan membawamu menjelajahi Bangun
                  Datar.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {zonesData.map((zone) => {
                  const isCompleted =
                    zone.id === 1 && level1ProgressPercent === 100;

                  return (
                    <div
                      key={zone.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        isCompleted
                          ? "bg-emerald-50/40 border-emerald-200"
                          : "bg-slate-50/60 border-slate-200/80"
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-3.5 w-full sm:w-auto">
                        <div
                          className={`w-9 h-9 rounded-full font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs ${
                            isCompleted
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {zone.id}
                        </div>

                        <div className="w-20 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 hidden sm:block relative">
                          <Image
                            src={zone.image}
                            alt={zone.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="space-y-1 flex-1">
                          <h4 className="font-bold text-slate-800 text-sm leading-tight">
                            {zone.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1 font-medium">
                            {zone.desc}
                          </p>

                          <div className="w-full max-w-xs bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                            <div
                              className="bg-emerald-500 h-full transition-all duration-500"
                              style={{
                                width: `${zone.id === 1 ? level1ProgressPercent : 0}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="self-end sm:self-center shrink-0">
                        {isCompleted ? (
                          <div className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-extrabold text-xs flex items-center gap-1.5 shadow-xs">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Selesai</span>
                          </div>
                        ) : zone.id === 1 ? (
                          <Link
                            href="/materi"
                            className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                          >
                            <span>Lanjutkan</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleZoneClick(zone)}
                            className="px-4 py-1.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-extrabold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                          >
                            <Lock className="w-3.5 h-3.5" />
                            <span>Segera Hadir</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ---------------- 4. RIGHT SIDEBAR: RINGKASAN & PENCAPAIAN ---------------- */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-blue-600" />
                <h4 className="font-extrabold text-slate-800 text-sm">
                  Ringkasan Progres
                </h4>
              </div>

              <div className="flex items-center justify-between bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                <div className="relative w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center font-black text-slate-800 text-sm">
                  {Math.round((level1CompletedCount / 4) * 20)}%
                  <span className="absolute text-[8px] text-slate-400 bottom-1">
                    Total
                  </span>
                </div>

                <div className="space-y-1 text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>Selesai: {level1CompletedCount === 4 ? 1 : 0}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <span>Segera Hadir: 4</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <h4 className="font-extrabold text-slate-800 text-sm">
                    Pencapaian
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                {achievementsData.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-2 transition-all ${
                      item.unlocked
                        ? "bg-amber-50/40 border-amber-200/80 shadow-xs"
                        : "bg-slate-50/60 border-slate-200 opacity-60 grayscale"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-2xl ${item.color} flex items-center justify-center shadow-sm`}
                    >
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 text-[11px] leading-tight">
                        {item.title}
                      </h5>
                      <p className="text-[9px] text-slate-500 mt-0.5 font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL COMING SOON ================= */}
      {showComingSoonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs px-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-5 border border-sky-100 shadow-xl relative">
            <button
              onClick={() => setShowComingSoonModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-extrabold text-[10px] uppercase tracking-wider">
                Zona Segera Hadir
              </span>
              <h3 className="text-lg font-black text-slate-800">
                {lockedZoneName}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Fitur dan materi untuk level ini masih dalam tahap pengembangan
                oleh tim petualang. Selesaikan Level 1 terlebih dahulu ya!
              </p>
            </div>

            <button
              onClick={() => setShowComingSoonModal(false)}
              className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              Mengerti, Lanjutkan Petualangan!
            </button>
          </div>
        </div>
      )}

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
                dahulu untuk melihat progres dan pencapaian belajarmu.
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
