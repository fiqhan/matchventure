"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Trophy,
  Award,
  Star,
  BookOpen,
  CheckCircle2,
  Lock,
  Sparkles,
  Zap,
  LogIn,
  UserPlus,
} from "lucide-react";
import { getProgress, UserProgress } from "@/lib/progress";

export default function PencapaianPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
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
          Memuat Halaman Pencapaian...
        </div>
      </div>
    );
  }

  const completedActivities = progress.completedActivities || [];
  const level1CompletedCount = ["akt-1", "akt-2", "akt-3", "akt-4"].filter(
    (id) => completedActivities.includes(id),
  ).length;

  // Daftar pencapaian dinamis berdasarkan progres klien
  const achievements = [
    {
      id: "ach-1",
      title: "Pembelajar Semangat",
      desc: "Menyelesaikan aktivitas pertama (Bacaan Materi)",
      icon: Star,
      color: "bg-amber-400 text-white",
      unlocked: completedActivities.length > 0,
      rewardXp: "+25 XP",
    },
    {
      id: "ach-2",
      title: "Pecinta Bangun Datar",
      desc: "Menyelesaikan minimal 2 aktivitas interaktif",
      icon: BookOpen,
      color: "bg-blue-500 text-white",
      unlocked: completedActivities.length >= 2,
      rewardXp: "+50 XP",
    },
    {
      id: "ach-3",
      title: "Ahli Bangun Datar",
      desc: "Menyelesaikan seluruh aktivitas Level 1 secara tuntas",
      icon: Award,
      color: "bg-emerald-500 text-white",
      unlocked: level1CompletedCount >= 4,
      rewardXp: "+100 XP",
    },
    {
      id: "ach-4",
      title: "Master Geometri Nusantara",
      desc: "Menyelesaikan seluruh zona dan level petualangan",
      icon: Trophy,
      color: "bg-purple-500 text-white",
      unlocked: false,
      rewardXp: "+250 XP",
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="min-h-screen bg-sky-50/40 pb-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-4 space-y-6">
        {/* ================= HEADER BREADCRUMB ================= */}
        <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-sky-100 shadow-xs">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                Prestasi Petualang
              </div>
              <h1 className="text-base font-extrabold text-slate-800">
                Pencapaian & Lencana
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200 shadow-xs">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-black text-amber-900">
              {unlockedCount} / {achievements.length} Terbuka
            </span>
          </div>
        </div>

        {/* ================= BANNER UTAMA ================= */}
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
          <div className="relative z-10 max-w-xl space-y-3">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-extrabold text-[11px] uppercase tracking-wider">
              Koleksi Prestasi
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Buktikkan Keahlian Geometrimu!
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
              Setiap aktivitas yang kamu selesaikan akan membuka lencana
              kehormatan khusus. Terus jelajahi zona belajar untuk mengumpulkan
              semuanya!
            </p>
          </div>

          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* ================= STATISTIK RINGKAS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-sky-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">
                Total Bintang
              </span>
              <span className="text-xl font-black text-slate-800">
                {progress.totalStars} Bintang
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-sky-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">
                Total XP Pengalaman
              </span>
              <span className="text-xl font-black text-slate-800">
                {progress.totalXp} XP
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-sky-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">
                Status Prestasi
              </span>
              <span className="text-sm font-black text-emerald-600">
                {unlockedCount === achievements.length
                  ? "Sempurna 🏆"
                  : "Sedang Berproses"}
              </span>
            </div>
          </div>
        </div>

        {/* ================= DAFTAR KARTU PENCAPAIAN ================= */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Daftar Lencana & Medali</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((item) => {
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-3xl p-5 border shadow-xs flex items-center gap-4 transition-all ${
                    item.unlocked
                      ? "border-amber-200/80 bg-gradient-to-br from-white to-amber-50/20"
                      : "border-slate-200/80 opacity-60 grayscale"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center shrink-0 shadow-md`}
                  >
                    <item.icon className="w-7 h-7" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-extrabold">
                        {item.rewardXp}
                      </span>
                      {item.unlocked ? (
                        <div className="flex items-center gap-1 text-emerald-600 font-extrabold text-xs">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Terbuka</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-slate-400 font-bold text-xs">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Terkunci</span>
                        </div>
                      )}
                    </div>
                    <h4 className="font-black text-slate-800 text-sm">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
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
                dahulu untuk melihat daftar pencapaian dan lencana prestasimu.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  setShowAuthModal(false);
                  router.push("/login");
                }}
                className="py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowAuthModal(false);
                  router.push("/register");
                }}
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
