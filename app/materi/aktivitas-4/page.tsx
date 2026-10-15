"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  BarChart2,
  Trophy,
  Star,
  CheckCircle2,
  ArrowRight,
  Award,
  Lock,
  LogIn,
  UserPlus,
  AlertCircle,
  X,
} from "lucide-react";
import { getProgress, saveProgress, UserProgress } from "@/lib/progress";

export default function PetaPerkembanganPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
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
        const currentProgress = getProgress();

        // Tandai aktivitas 4 selesai otomatis dan berikan reward XP & Bintang saat dikunjungi
        if (!currentProgress.completedActivities.includes("akt-4")) {
          const updatedActivities = [
            ...currentProgress.completedActivities,
            "akt-4",
          ];
          const newProgress = {
            ...currentProgress,
            completedActivities: updatedActivities,
            totalXp: currentProgress.totalXp + 50, // Tambahan XP dinamis
            totalStars: currentProgress.totalStars + 5, // Tambahan Bintang dinamis
          };
          saveProgress(newProgress);
          setProgress(newProgress);
        } else {
          setProgress(currentProgress);
        }
      } else {
        setShowAuthModal(true);
      }
    });
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-sky-50/40 flex items-center justify-center">
        <div className="text-xs font-bold text-slate-400">
          Memuat Peta Perkembangan...
        </div>
      </div>
    );
  }

  const completedActivities = progress.completedActivities || [];
  const totalStars = progress.totalStars || 0;

  // Cek apakah aktivitas 1, 2, dan 3 sudah selesai
  const level1Requirements = ["akt-1", "akt-2", "akt-3"];
  const isLevel1Complete = level1Requirements.every((id) =>
    completedActivities.includes(id),
  );

  const handleNextZoneClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLevel1Complete) {
      setShowIncompleteModal(true);
    } else {
      router.push("/materi");
    }
  };

  // Riwayat aktivitas Level 1 termasuk Aktivitas 4
  const activityHistory = [
    {
      id: 1,
      title: "Bacaan Materi",
      type: "Materi",
      status: completedActivities.includes("akt-1") ? "Selesai" : "Belum",
      score: "100%",
      date: "Hari ini",
    },
    {
      id: 2,
      title: "Eksplorasi Peta",
      type: "Interaktif",
      status: completedActivities.includes("akt-2") ? "Selesai" : "Belum",
      score: "100%",
      date: "Hari ini",
    },
    {
      id: 3,
      title: "Latihan Bertingkat (Area Puzzle)",
      type: "Latihan",
      status: completedActivities.includes("akt-3") ? "Selesai" : "Belum",
      score: completedActivities.includes("akt-3") ? "300/300 Poin" : "0 Poin",
      date: "Hari ini",
    },
    {
      id: 4,
      title: "Peta Perkembangan",
      type: "Progres",
      status: completedActivities.includes("akt-4") ? "Selesai" : "Aktif",
      score: "100%",
      date: "Sekarang",
    },
  ];

  const completedCount = completedActivities.filter((id) =>
    ["akt-1", "akt-2", "akt-3", "akt-4"].includes(id),
  ).length;

  return (
    <div className="min-h-screen bg-sky-50/40 pb-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-4 space-y-6">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-sky-100 shadow-xs">
          <div className="flex items-center gap-3">
            <Link
              href="/materi"
              className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                Level 1 • Aktivitas 4
              </div>
              <h1 className="text-base font-extrabold text-slate-800">
                Peta Perkembangan Level 1
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
            <Trophy className="w-4 h-4 text-emerald-600" />
            <span>Progres: {Math.round((completedCount / 4) * 100)}%</span>
          </div>
        </div>

        {/* Ringkasan Statistik Level 1 */}
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
                {totalStars} Bintang
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-sky-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">
                Aktivitas Selesai
              </span>
              <span className="text-xl font-black text-slate-800">
                {completedCount} dari 4
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-sky-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">
                Status Level
              </span>
              <span className="text-sm font-black text-emerald-600">
                {isLevel1Complete ? "Tuntas Sempurna 🎉" : "Belum Lengkap"}
              </span>
            </div>
          </div>
        </div>

        {/* Tabel / List Riwayat Aktivitas Level 1 */}
        <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-slate-800 text-base">
              Rincian Aktivitas Geografi & Lingkungan Alam
            </h3>
          </div>

          <div className="space-y-3 pt-2">
            {activityHistory.map((act) => (
              <div
                key={act.id}
                className="p-4 rounded-2xl bg-sky-50/40 border border-sky-100 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-extrabold text-xs shadow-sm">
                    {act.id}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      {act.title}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {act.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    {act.score}
                  </span>
                  <div
                    className={`px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1 ${
                      act.status === "Selesai"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{act.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Lanjut ke Level 2 dengan Validasi Interaktif */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
              Progres Petualangan
            </span>
            <h3 className="text-lg font-black">
              Lanjut ke Zona & Materi Berikutnya
            </h3>
          </div>

          <button
            onClick={handleNextZoneClick}
            className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs flex items-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
          >
            <span>Zona Berikutnya</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ================= MODAL PERINGATAN KEKURANGAN AKTIVITAS ================= */}
      {showIncompleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs px-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-5 border border-amber-100 shadow-xl relative">
            <button
              onClick={() => setShowIncompleteModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-extrabold text-[10px] uppercase tracking-wider">
                Aktivitas Belum Lengkap
              </span>
              <h3 className="text-lg font-black text-slate-800">
                Selesaikan Kekurangan Dulu!
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Kamu belum menyelesaikan semua materi dan latihan di Level 1
                (Aktivitas 1 sampai 3). Selesaikan semua tantangan terlebih
                dahulu untuk membuka zona berikutnya!
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowIncompleteModal(false);
                router.push("/materi");
              }}
              className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              Kembali ke Materi Level 1
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
                dahulu untuk melihat peta perkembangan dan progres belajar.
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
