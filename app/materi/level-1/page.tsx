"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  BookOpen,
  MapPin,
  HelpCircle,
  BarChart2,
  CheckCircle2,
  Star,
  Sparkles,
  Play,
  type LucideIcon,
} from "lucide-react";
import { getProgress } from "@/lib/progress";

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
  badge: string;
  xp: number;
}

const activities: ActivityItem[] = [
  {
    id: "akt-1",
    title: "Aktivitas 1: Bacaan & Narasi",
    description:
      "Mengenal Sifat-sifat, Ciri-ciri, dan rumus Bangun Datar Persegi",
    icon: BookOpen,
    href: "/materi/aktivitas-1",
    color: "from-blue-500 to-indigo-600",
    badge: "Materi Utama",
    xp: 20,
  },
  {
    id: "akt-2",
    title: "Aktivitas 2: Peta Interaktif",
    description: "Eksplorasi Bangun Datar",
    icon: MapPin,
    href: "/materi/aktivitas-2",
    color: "from-emerald-500 to-teal-600",
    badge: "Eksplorasi Peta",
    xp: 30,
  },
  {
    id: "akt-3",
    title: "Aktivitas 3: Kuis & Latihan Soal",
    description: "Uji pemahamanmu dengan kuis interaktif bertingkat.",
    icon: HelpCircle,
    href: "/materi/aktivitas-3",
    color: "from-amber-500 to-orange-600",
    badge: "Uji Kemampuan",
    xp: 50,
  },
  {
    id: "akt-4",
    title: "Aktivitas 4: Rincian Progres",
    description: "Lihat ringkasan pencapaian dan riwayat skor Level 1.",
    icon: BarChart2,
    href: "/materi/aktivitas-4",
    color: "from-purple-500 to-violet-600",
    badge: "Evaluasi",
    xp: 50,
  },
];

export default function Level1Page() {
  // Inisialisasi state secara langsung tanpa useEffect untuk menghindari cascading render
  const [completedList] = useState<string[]>(() => {
    const progress = getProgress();
    return progress.completedActivities || [];
  });

  return (
    <div className="min-h-screen bg-sky-50/40 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        {/* Header Navigation */}
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
                Zona Pembelajaran 1
              </div>
              <h1 className="text-base font-extrabold text-slate-800">
                Bangun Datar Persegi
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-black text-amber-800">
              {completedList.length} / 4 Selesai
            </span>
          </div>
        </div>

        {/* Level Banner Card */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
          <div className="relative z-10 max-w-xl space-y-3">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-extrabold text-[11px] uppercase tracking-wider">
              Level 1 • Bangun Datar Persegi
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Misi Rahasia Persegi
            </h2>
            <p className="text-xs sm:text-sm text-sky-100 font-medium leading-relaxed">
              Selesaikan keempat aktivitas di bawah ini untuk mengumpulkan total
              350 XP dan membuka akses menuju Level 2!
            </p>
          </div>

          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* List Aktivitas */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">
            Daftar Aktivitas Belajar
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.map((act) => {
              const Icon = act.icon;
              const isDone = completedList.includes(act.id);

              return (
                <div
                  key={act.id}
                  className="bg-white rounded-3xl p-5 border border-sky-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${act.color} text-white flex items-center justify-center font-black shadow-md shrink-0`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                          {act.badge}
                        </span>
                        <h4 className="font-extrabold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                          {act.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                          {act.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-extrabold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>+{act.xp} XP</span>
                    </div>

                    <Link
                      href={act.href}
                      className={`px-4 py-2 rounded-full font-extrabold text-xs flex items-center gap-1.5 transition-all ${
                        isDone
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"
                      }`}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Ulangi</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Mulai</span>
                        </>
                      )}
                    </Link>
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
