"use client";

import { BookOpen, Store, Gamepad2, Lightbulb, Trophy } from "lucide-react";
import { getProgress } from "@/lib/progress";
import { useState, useEffect } from "react";

export default function FeatureCards() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState({
    totalXp: 0,
    totalStars: 0,
    completedActivities: [] as string[],
  });

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
      setProgress(getProgress());
    });
  }, []);

  const completedCount = mounted ? progress.completedActivities.length : 0;
  const totalStars = mounted ? progress.totalStars : 0;
  const totalXp = mounted ? progress.totalXp : 0;

  const features = [
    {
      title: "Kenali Bangun Datar",
      description: "Jelajahi berbagai bentuk geometri dasar.",
      icon: BookOpen,
      bgColor: "bg-emerald-500",
      borderColor: "border-emerald-100",
      stat: `XP: ${totalXp}`,
    },
    {
      title: "Koleksi Toko Poin",
      description: "Tukar bintang dan XP dengan avatar serta lencana.",
      icon: Store,
      bgColor: "bg-amber-500",
      borderColor: "border-amber-100",
      stat: `${totalStars} Bintang`,
    },
    {
      title: "Selesaikan Misi",
      description: "Dapatkan poin dan bintang di setiap tantangan.",
      icon: Gamepad2,
      bgColor: "bg-indigo-500",
      borderColor: "border-indigo-100",
      stat: `${completedCount} Selesai`,
    },
    {
      title: "Tingkatkan Pengetahuan",
      description: "Belajar dengan cara interaktif dan menyenangkan.",
      icon: Lightbulb,
      bgColor: "bg-blue-500",
      borderColor: "border-blue-100",
      stat: "Interaktif",
    },
    {
      title: "Raih Prestasi",
      description: "Lihat progres belajarmu secara real-time.",
      icon: Trophy,
      bgColor: "bg-rose-500",
      borderColor: "border-rose-100",
      stat: `${completedCount > 0 ? Math.round((completedCount / 3) * 100) : 0}% Progres`,
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className={`p-5 rounded-3xl bg-white border ${feature.borderColor} shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-3">
                <div
                  className={`w-12 h-12 rounded-2xl ${feature.bgColor} text-white flex items-center justify-center shadow-md`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="inline-block px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 text-[10px] font-extrabold border border-sky-100">
                  {feature.stat}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
