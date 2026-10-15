"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Sparkles,
  Star,
  ShoppingBag,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";
import { getProgress, unlockRewardItem, UserProgress } from "@/lib/progress";

interface RewardItem {
  id: string;
  title: string;
  category: string;
  cost: number;
  iconBg: string;
  imageEmoji: string;
}

const rewards: RewardItem[] = [
  {
    id: "rew-1",
    title: "Avatar Burung Cendrawasih",
    category: "Koleksi Profil",
    cost: 100,
    iconBg: "from-amber-400 to-orange-500",
    imageEmoji: "🐦",
  },
  {
    id: "rew-2",
    title: "Lencana Penjelajah Sabang",
    category: "Lencana Spesial",
    cost: 150,
    iconBg: "from-blue-400 to-indigo-600",
    imageEmoji: "🛡️",
  },
  {
    id: "rew-3",
    title: "Tema Mode Malam Nusantara",
    category: "Kustomisasi",
    cost: 200,
    iconBg: "from-purple-500 to-violet-700",
    imageEmoji: "🌙",
  },
  {
    id: "rew-4",
    title: "Avatar Harimau Sumatra",
    category: "Koleksi Profil",
    cost: 250,
    iconBg: "from-emerald-500 to-teal-700",
    imageEmoji: "🐅",
  },
];

export default function PoinPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
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
      setProgress(getProgress());
    });
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-sky-50/40 flex items-center justify-center">
        <div className="text-xs font-bold text-slate-400">
          Memuat Toko Poin...
        </div>
      </div>
    );
  }

  const completed = progress.completedActivities || [];
  const unlockedItems = progress.unlockedRewards || [];
  const userStars = progress.totalStars;

  // Validasi gerbang prasyarat secara ketat berdasarkan aktivitas yang selesai
  let nextActivity = {
    title: "Aktivitas 1: Bacaan Materi Persegi",
    href: "/materi/level-1",
    isLocked: false,
  };

  if (!completed.includes("akt-1")) {
    nextActivity = {
      title: "Aktivitas 1: Bacaan Materi Persegi",
      href: "/materi/level-1",
      isLocked: false,
    };
  } else if (!completed.includes("akt-2")) {
    nextActivity = {
      title: "Aktivitas 2: Peta Interaktif",
      href: "/materi/aktivitas-2",
      isLocked: false,
    };
  } else if (!completed.includes("akt-3")) {
    nextActivity = {
      title: "Aktivitas 3: Puzzle Area",
      href: "/materi/aktivitas-3",
      isLocked: false,
    };
  } else if (!completed.includes("akt-4")) {
    nextActivity = {
      title: "Aktivitas 4: Rincian Progres & Evaluasi",
      href: "/materi/aktivitas-4",
      isLocked: false,
    };
  } else {
    nextActivity = {
      title: "Level 1 Selesai - Zona Berikutnya Segera Hadir",
      href: "/progres",
      isLocked: false,
    };
  }

  const handleRedeem = (item: RewardItem) => {
    const success = unlockRewardItem(item.id, item.cost);
    if (success) {
      setProgress(getProgress());
    }
  };

  return (
    <div className="min-h-screen bg-sky-50/40 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        {/* Header & Navigasi */}
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
                Toko Hadiah & Poin
              </div>
              <h1 className="text-base font-extrabold text-slate-800">
                Klaim Hadiah Petualang
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200 shadow-xs">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="text-xs font-black text-amber-900">
              {userStars} Bintang
            </span>
          </div>
        </div>

        {/* Banner Toko */}
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
          <div className="relative z-10 max-w-xl space-y-3">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-extrabold text-[11px] uppercase tracking-wider">
              Tukar Bintang & XP
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Koleksi Hadiah Istimewa Nusantara
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
              Kumpulkan lebih banyak bintang dengan menyelesaikan materi dan
              kuis secara berurutan, lalu tukar dengan avatar serta lencana
              keren!
            </p>
          </div>

          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Card Navigasi Lanjut dengan Validasi Prasyarat */}
        <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200">
              Misi Berikutnya
            </span>
            <h3 className="font-extrabold text-slate-800 text-sm">
              Lanjut ke {nextActivity.title}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Selesaikan aktivitas secara berurutan untuk membuka tantangan
              berikutnya!
            </p>
          </div>

          <Link
            href={nextActivity.href}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <span>Mulai Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Daftar Hadiah */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-amber-600" />
            <span>Katalog Hadiah Tersedia</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {rewards.map((item) => {
              const isUnlocked = unlockedItems.includes(item.id);
              const canAfford = userStars >= item.cost;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-5 border border-sky-100 shadow-xs flex flex-col justify-between space-y-4 relative overflow-hidden group"
                >
                  <div className="space-y-3 text-center">
                    <div
                      className={`w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br ${item.iconBg} text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-105 transition-transform`}
                    >
                      {item.imageEmoji}
                    </div>

                    <div className="space-y-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-extrabold">
                        {item.category}
                      </span>
                      <h4 className="font-black text-slate-800 text-sm">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-center gap-1 text-amber-600 text-xs font-black">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{item.cost} Bintang</span>
                    </div>

                    {isUnlocked ? (
                      <div className="w-full py-2.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs flex items-center justify-center gap-1.5 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Dimiliki</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        disabled={!canAfford}
                        onClick={() => handleRedeem(item)}
                        className={`w-full py-2.5 rounded-full font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                          canAfford
                            ? "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        {canAfford ? (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Tukar Sekarang</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5" />
                            <span>Kurang Bintang</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
