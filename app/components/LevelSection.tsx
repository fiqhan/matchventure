"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  ArrowRight,
  ChevronRight,
  Lock,
  Sparkles,
  CheckCircle2,
  UserPlus,
  LogIn,
} from "lucide-react";
import { getProgress, UserProgress } from "@/lib/progress";

const rawLevels = [
  {
    id: 1,
    title: "Persegi",
    description: "Mengenal bentuk persegi dan sifat-sifatnya.",
    bgHeader: "from-emerald-400 to-teal-500",
    btnColor: "bg-emerald-500 hover:bg-emerald-600",
    borderColor: "border-emerald-200",
  },
  {
    id: 2,
    title: "Persegi Panjang",
    description: "Mengenal bentuk persegi panjang dan sifat-sifatnya.",
    bgHeader: "from-sky-400 to-blue-500",
    btnColor: "bg-sky-500 hover:bg-sky-600",
    borderColor: "border-sky-200",
    comingSoon: true,
  },
  {
    id: 3,
    title: "Lingkaran",
    description: "Mengenal bentuk lingkaran dan sifat-sifatnya.",
    bgHeader: "from-amber-300 to-amber-500",
    btnColor: "bg-amber-500 hover:bg-amber-600",
    borderColor: "border-amber-200",
    comingSoon: true,
  },
  {
    id: 4,
    title: "Segitiga",
    description: "Mengenal bentuk segitiga dan sifat-sifatnya.",
    bgHeader: "from-purple-400 to-indigo-500",
    btnColor: "bg-indigo-500 hover:bg-indigo-600",
    borderColor: "border-purple-200",
    comingSoon: true,
  },
  {
    id: 5,
    title: "Trapesium",
    description: "Mengenal bentuk trapesium dan sifat-sifatnya.",
    bgHeader: "from-rose-400 to-pink-500",
    btnColor: "bg-rose-500 hover:bg-rose-600",
    borderColor: "border-rose-200",
    comingSoon: true,
  },
];

export default function LevelSection() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [progress, setProgress] = useState<UserProgress>({
    totalXp: 0,
    totalStars: 12,
    completedActivities: [],
    unlockedRewards: [],
    streakDays: 1,
    lastActiveDate: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [lockedName, setLockedName] = useState("");

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

  const completedActivities = mounted ? progress.completedActivities || [] : [];
  const level1Done = ["akt-1", "akt-2", "akt-3"].every((id) =>
    completedActivities.includes(id),
  );

  const handleLevelClick = (
    e: React.MouseEvent,
    isLocked: boolean,
    levelId: number,
    levelTitle: string,
  ) => {
    // Jika belum login, cegah navigasi dan tampilkan modal autentikasi
    if (!isLoggedIn) {
      e.preventDefault();
      setShowAuthModal(true);
      return;
    }

    // Jika level dikunci (coming soon)
    if (isLocked) {
      e.preventDefault();
      setLockedName(`Level ${levelId}: ${levelTitle}`);
      setShowModal(true);
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-12 relative">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800">
              Materi & Level
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Mulai petualanganmu dari level 1 dan jelajahi semua Bangun Datar!
            </p>
          </div>
        </div>

        <Link
          href="/materi"
          onClick={(e) => {
            if (!isLoggedIn) {
              e.preventDefault();
              setShowAuthModal(true);
            }
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-700 font-bold text-xs sm:text-sm transition-colors self-start sm:self-auto cursor-pointer"
        >
          <span>Lihat Semua</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Level Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {rawLevels.map((level) => {
          const isLevel1 = level.id === 1;
          const isLocked = level.comingSoon;

          return (
            <div
              key={level.id}
              className={`bg-white rounded-3xl border ${level.borderColor} overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative`}
            >
              {/* Header Banner Kartu */}
              <div
                className={`h-24 bg-gradient-to-r ${level.bgHeader} relative p-3 flex items-start justify-between`}
              >
                <div className="w-9 h-9 rounded-full bg-white/90 text-slate-800 font-extrabold text-base flex items-center justify-center shadow-md">
                  {level.id}
                </div>

                {isLevel1 && level1Done && isLoggedIn && (
                  <span className="px-2 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
                  </span>
                )}

                {isLocked && (
                  <span className="px-2 py-1 rounded-full bg-slate-900/60 backdrop-blur-xs text-white text-[10px] font-extrabold flex items-center gap-1 shadow-sm">
                    <Lock className="w-3 h-3" /> Segera
                  </span>
                )}
              </div>

              {/* Konten Kartu */}
              <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-800 text-base">
                    {level.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {level.description}
                  </p>
                </div>

                {/* Action Button Card */}
                <div className="flex justify-end pt-2">
                  <Link
                    href="/materi"
                    onClick={(e) =>
                      handleLevelClick(
                        e,
                        Boolean(isLocked),
                        level.id,
                        level.title,
                      )
                    }
                    className={`w-8 h-8 rounded-full ${
                      isLocked
                        ? "bg-slate-100 text-slate-400 hover:bg-slate-200"
                        : `${level.btnColor} text-white group-hover:scale-110`
                    } flex items-center justify-center shadow-sm transition-transform cursor-pointer`}
                  >
                    {isLocked ? (
                      <Lock className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Kustom Coming Soon */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs px-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-5 border border-sky-100 shadow-xl relative">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-extrabold text-[10px] uppercase tracking-wider">
                Zona Segera Hadir
              </span>
              <h3 className="text-lg font-black text-slate-800">
                {lockedName}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Level ini masih dalam tahap pengembangan oleh tim petualang.
                Selesaikan Level 1 terlebih dahulu ya!
              </p>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              Mengerti, Lanjutkan Petualangan!
            </button>
          </div>
        </div>
      )}

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
                dahulu untuk mulai menjelajahi materi dan level pembelajaran.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
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
    </section>
  );
}
