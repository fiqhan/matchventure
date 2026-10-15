"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronRight,
  BookOpen,
  Lock,
  CheckCircle2,
  Trophy,
  Star,
  MapPin,
  Gamepad2,
  BarChart2,
  Lightbulb,
  Check,
  Quote,
  Sparkles,
  X,
  LogIn,
  UserPlus,
} from "lucide-react";
import { getProgress, UserProgress } from "@/lib/progress";

// Data Level dengan status comingSoon
const levelsData = [
  { id: 1, name: "Level 1", desc: "Persegi", locked: false, comingSoon: false },
  {
    id: 2,
    name: "Level 2",
    desc: "Persegi Panjang",
    locked: true,
    comingSoon: true,
  },
  { id: 3, name: "Level 3", desc: "Lingkaran", locked: true, comingSoon: true },
  { id: 4, name: "Level 4", desc: "Segitiga", locked: true, comingSoon: true },
  { id: 5, name: "Level 5", desc: "Trapesium", locked: true, comingSoon: true },
];

export default function MateriPage() {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState(1);
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

  // State untuk mengontrol modal "Coming Soon"
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [lockedLevelName, setLockedLevelName] = useState("");

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

  if (!mounted) {
    return (
      <div className="min-h-screen bg-sky-50/40 flex items-center justify-center">
        <div className="text-xs font-bold text-slate-400">
          Memuat Halaman Materi...
        </div>
      </div>
    );
  }

  const completedActivities = progress.completedActivities || [];

  const level1CompletedCount = ["akt-1", "akt-2", "akt-3", "akt-4"].filter(
    (id) => completedActivities.includes(id),
  ).length;

  const level1ProgressPercent = Math.round((level1CompletedCount / 4) * 100);

  const activitiesData = [
    {
      id: 1,
      activityKey: "akt-1",
      title: "Bacaan Materi",
      desc: "Pelajari rumus, sifat-sifat dan karakteristik persegi.",
      category: "Materi",
      icon: BookOpen,
      completed: completedActivities.includes("akt-1"),
      locked: false,
      bgImage:
        "https://cdn.utakatikotak.com/finder/gambar%20bangun%20datar%20persegi(2).png",
    },
    {
      id: 2,
      activityKey: "akt-2",
      title: "Eksplorasi Persegi",
      desc: "Jelajahi bentuk persegi melalui permainan interaktif.",
      category: "Interaktif",
      icon: Gamepad2,
      completed: completedActivities.includes("akt-2"),
      locked: !completedActivities.includes("akt-1"),
      bgImage:
        "https://i.pinimg.com/736x/85/96/8a/85968a6738222059b3828560404e211d.jpg",
    },
    {
      id: 3,
      activityKey: "akt-3",
      title: "Latihan Bertingkat",
      desc: "Selesaikan soal bertingkat untuk menguji pemahamanmu tentang persegi.",
      category: "Latihan",
      icon: BookOpen,
      completed: completedActivities.includes("akt-3"),
      locked: !completedActivities.includes("akt-2"),
      bgImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE2FSr42epmIrKZinKHf4P1hNCqG2dEIKhUQRkvjTMkfnrdpUTL_Ixsa4&s=10",
    },
    {
      id: 4,
      activityKey: "akt-4",
      title: "Peta Perkembangan",
      desc: "Lihat progres dan pencapaianmu dalam menyelesaikan semua aktivitas.",
      category: "Progres",
      icon: BarChart2,
      completed: completedActivities.includes("akt-4"),
      locked: !completedActivities.includes("akt-3"),
      bgImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJKjM125alQ5pGWZPPId_HuBy-jm7qzRbi4K49fRTYg&s=10",
    },
  ];

  return (
    <div className="min-h-screen bg-sky-50/40 pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 space-y-6">
        {/* ================= HEADER BANNER ================= */}
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
              <span className="text-slate-800">Materi</span>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                  Materi Pembelajaran
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-medium">
                  Jelajahi setiap zona untuk mempelajari tentang bangun datar!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MAIN CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT SIDEBAR: ZONA PEMBELAJARAN */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-3xl p-4 border border-sky-100 shadow-xs space-y-3">
              <div className="flex items-center gap-2 px-2">
                <span className="font-extrabold text-blue-600 text-sm">1</span>
                <h3 className="font-bold text-slate-800 text-sm">
                  Zona Pembelajaran
                </h3>
              </div>

              <div className="space-y-2">
                {levelsData.map((lvl) => {
                  const isActive = selectedLevel === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      onClick={() => {
                        if (!isLoggedIn) {
                          setShowAuthModal(true);
                          return;
                        }
                        if (lvl.comingSoon) {
                          setLockedLevelName(`${lvl.name}: ${lvl.desc}`);
                          setShowComingSoonModal(true);
                          return;
                        }
                        setSelectedLevel(lvl.id);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all cursor-pointer ${
                        isActive
                          ? "bg-blue-50/80 border-2 border-blue-400 text-blue-700 shadow-xs"
                          : "bg-slate-50/60 border border-slate-100 text-slate-700 hover:bg-slate-100/80"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {lvl.id}
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-none flex items-center gap-1.5">
                            <span>{lvl.name}</span>
                            {lvl.comingSoon && (
                              <span className="px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-700 text-[9px] font-black uppercase">
                                Segera
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1 font-medium line-clamp-1">
                            {lvl.desc}
                          </div>
                        </div>
                      </div>

                      {lvl.locked ? (
                        <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-blue-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <p className="text-[11px] font-semibold text-slate-700 leading-tight">
                  Selesaikan semua level dan jadilah ahli Bangun Datar!
                </p>
              </div>
            </div>
          </div>

          {/* CENTER: LEVEL DETAIL & ACTIVITIES */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500 text-white font-extrabold text-xs shadow-xs mb-2">
                  Level 1
                </span>
                <h2 className="text-lg font-bold text-slate-800">
                  Persegi: Bentuk Dasar Bangun Datar
                </h2>
                <p className="text-xs text-slate-500 mt-1 max-w-md leading-relaxed">
                  Kenali bentuk-bentuk Persegi. Pelajari rumus, sifat-sifat, dan
                  karakteristik masing-masing bangun datar melalui aktivitas
                  interaktif yang menyenangkan!
                </p>
              </div>

              <div className="w-full sm:w-auto min-w-[180px] bg-slate-50/80 p-3 rounded-2xl border border-slate-100 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{" "}
                    Progres Level
                  </span>
                  <span className="font-extrabold text-blue-600 text-xs">
                    {level1ProgressPercent}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full transition-all duration-500"
                    style={{ width: `${level1ProgressPercent}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-medium text-right">
                  {level1CompletedCount} / 4 aktivitas selesai
                </span>
              </div>
            </div>

            {/* Daftar Aktivitas */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-slate-800 text-base">
                  Daftar Aktivitas
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activitiesData.map((act) => {
                  return (
                    <div
                      key={act.id}
                      className="bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="relative h-28 bg-slate-100">
                        <div className="relative w-full h-full">
                          <Image
                            src={act.bgImage}
                            alt={act.title}
                            fill
                            className="object-none"
                          />
                        </div>
                        <div className="absolute top-2 right-2">
                          {act.completed ? (
                            <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                          ) : act.locked ? (
                            <div className="w-7 h-7 rounded-full bg-slate-800/60 text-white flex items-center justify-center backdrop-blur-xs">
                              <Lock className="w-3.5 h-3.5" />
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-extrabold flex items-center justify-center">
                              {act.id}
                            </span>
                            <h4 className="font-bold text-slate-800 text-sm">
                              {act.title}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">
                            {act.desc}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                          <span className="text-slate-500 font-semibold flex items-center gap-1">
                            <act.icon className="w-3.5 h-3.5 text-blue-500" />
                            {act.category}
                          </span>

                          {!act.locked ? (
                            <Link
                              href={
                                act.id === 4
                                  ? "/materi/peta-perkembangan"
                                  : `/materi/aktivitas-${act.id}`
                              }
                              onClick={(e) => {
                                if (!isLoggedIn) {
                                  e.preventDefault();
                                  setShowAuthModal(true);
                                }
                              }}
                              className="px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                            >
                              <span>{act.completed ? "Ulangi" : "Mulai"}</span>
                              <ChevronRight className="w-3 h-3" />
                            </Link>
                          ) : (
                            <div className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-400 font-bold text-[11px] flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              <span>Kunci</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: WIDGETS */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-xs text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-sm">
                  Ayo Mulai Petualangan!
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Setiap langkah kecil membawamu lebih dekat menjadi ahli Bangun
                  Datar.
                </p>
              </div>

              <div className="bg-sky-50 rounded-2xl p-3 border border-sky-100 flex items-center justify-center h-28 relative overflow-hidden">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMnggBLJqqi-6Om-XXPey0YFZrs02djKOkqbcyh53hCg&s=10"
                  alt="Map Illustration"
                  className="w-full h-full object-cover rounded-xl shadow-xs"
                  fill
                />
              </div>

              <Link
                href="/poin"
                onClick={(e) => {
                  if (!isLoggedIn) {
                    e.preventDefault();
                    setShowAuthModal(true);
                  }
                }}
                className="w-full py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition-all block cursor-pointer"
              >
                <span>Lihat Toko Poin</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <h4 className="font-extrabold text-slate-800 text-sm">
                  Yang Akan Kamu Pelajari
                </h4>
              </div>

              <ul className="space-y-2 text-xs font-medium text-slate-600">
                {[
                  "Rumus dan sifat-sifat bangun datar",
                  "Karakteristik dan ciri-ciri masing-masing bangun datar",
                  "Penerapan bangun datar dalam kehidupan sehari-hari",
                  "Aktivitas interaktif untuk memahami konsep bangun datar",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-sky-100/60 to-emerald-100/60 rounded-3xl p-5 border border-sky-200/60 text-center relative overflow-hidden space-y-2">
              <Quote className="w-6 h-6 text-sky-400/50 mx-auto" />
              <p className="text-xs font-bold italic text-slate-700 leading-relaxed">
                Bangun datar adalah fondasi penting dalam geometri.
              </p>
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
                {lockedLevelName}
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
                dahulu untuk mulai mengerjakan aktivitas pembelajaran.
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
