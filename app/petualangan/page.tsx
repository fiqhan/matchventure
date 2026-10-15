"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Map,
  CheckCircle2,
  ChevronLeft,
  Flame,
  Target,
  ArrowRight,
} from "lucide-react";
import { getProgress, UserProgress } from "@/lib/progress";

export default function PetualanganPage() {
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
          Memuat Arena Petualangan...
        </div>
      </div>
    );
  }

  const completedActivities = progress.completedActivities || [];
  const streakCount = progress.streakDays || 1;

  // Daftar Misi Harian Petualang
  const quests = [
    {
      id: "q1",
      title: "Jelajah Sabang ke Merauke",
      desc: "Baca materi bentang alam di Aktivitas 1 hari ini.",
      reward: "50 XP",
      completed: completedActivities.includes("akt-1"),
    },
    {
      id: "q2",
      title: "Ahli Peta Cilik",
      desc: "Kunjungi minimal 3 pulau di Peta Interaktif Nusantara.",
      reward: "75 XP",
      completed: completedActivities.includes("akt-2"),
    },
    {
      id: "q3",
      title: "Juara Kuis Nusantara",
      desc: "Selesaikan latihan soal kuis di Level 1.",
      reward: "100 XP",
      completed: completedActivities.includes("akt-3"),
    },
  ];

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
              <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                Arena Petualangan
              </div>
              <h1 className="text-base font-extrabold text-slate-800">
                Pusat Misi Nusantara
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 shadow-xs">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="text-xs font-black text-amber-900">
              Streak: {streakCount} Hari
            </span>
          </div>
        </div>

        {/* Banner Utama Petualangan */}
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
          <div className="relative z-10 max-w-xl space-y-3">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-extrabold text-[11px] uppercase tracking-wider">
              Misi Spesial Musim Ini
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Ekspedisi Kepulauan Rempah
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
              Selesaikan misi harian di bawah ini untuk mengumpulkan lencana
              eksklusif dan menduduki puncak peringkat penjelajah nusantara!
            </p>
          </div>

          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Misi Harian Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600" />
              <span>Misi Harian Petualang</span>
            </h3>
            <span className="text-xs font-bold text-slate-400">
              Pilih & Selesaikan
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quests.map((quest) => (
              <div
                key={quest.id}
                className="bg-white rounded-3xl p-5 border border-sky-100 shadow-xs flex flex-col justify-between space-y-4 relative overflow-hidden"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-extrabold border border-amber-200">
                      {quest.reward}
                    </span>
                    {quest.completed && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    )}
                  </div>
                  <h4 className="font-black text-slate-800 text-sm">
                    {quest.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {quest.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  {quest.completed ? (
                    <div className="w-full py-2.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs flex items-center justify-center gap-1.5 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Selesai Diklaim</span>
                    </div>
                  ) : (
                    <Link
                      href="/materi"
                      className="w-full py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/25 transition-all"
                    >
                      <span>Mulai Misi</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zona Peta Navigasi Cepat */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-sm">
                Lanjutkan Perjalanan Belajar
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Masuk kembali ke modul materi utama untuk membuka zona baru.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/materi"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all"
            >
              <span>Buka Modul Materi Pembelajaran</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
