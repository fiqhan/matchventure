"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  Gamepad2,
  MapPin,
  Award,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Check,
  Home,
  Settings,
  Star,
  BookOpen,
  Play,
  Quote,
} from "lucide-react";

// Menu Panduan di Sidebar Kiri
const menuItems = [
  {
    id: 1,
    title: "Cara Memulai",
    desc: "Mulai petualanganmu dari sini!",
    icon: Compass,
  },
  {
    id: 2,
    title: "Navigasi Game",
    desc: "Kenali tombol dan fitur yang ada di dalam game.",
    icon: Gamepad2,
  },
  {
    id: 3,
    title: "Menyelesaikan Zona",
    desc: "Ikuti setiap zona untuk mendapatkan pengalaman belajar terbaik.",
    icon: MapPin,
  },
  {
    id: 4,
    title: "Sistem Penilaian",
    desc: "Ketahui bagaimana cara mendapatkan nilai dan hadiah.",
    icon: Award,
  },
  {
    id: 5,
    title: "Tips & Trik",
    desc: "Jadikan pengalaman belajar lebih seru dan efektif.",
    icon: Lightbulb,
  },
];

// Langkah-langkah Cara Memulai
const stepsCaraMemulai = [
  {
    step: "1",
    title: "Buka Halaman Beranda atau Masuk",
    desc: "Lakukan pendaftaran akun atau masuk ke sistem, lalu klik tombol mulai petualangan pada halaman utama.",
    bgCard: "bg-purple-50/70 border-purple-200",
    iconBg: "bg-purple-500 text-white",
    icon: Compass,
  },
  {
    step: "2",
    title: "Pilih Zona Pembelajaran",
    desc: "Pilih zona materi Bangun Datar yang tersedia di menu peta perkembangan atau halaman materi.",
    bgCard: "bg-emerald-50/70 border-emerald-200",
    iconBg: "bg-emerald-500 text-white",
    icon: MapPin,
  },
  {
    step: "3",
    title: "Selesaikan Aktivitas",
    desc: "Ikuti instruksi bacaan materi dan selesaikan tantangan interaktif yang ada di setiap level.",
    bgCard: "bg-amber-50/70 border-amber-200",
    iconBg: "bg-amber-500 text-white",
    icon: Gamepad2,
  },
  {
    step: "4",
    title: "Dapatkan Hadiah & XP",
    desc: "Setiap penyelesaian aktivitas akan memberikan poin XP, bintang, dan lencana prestasi secara otomatis.",
    bgCard: "bg-rose-50/70 border-rose-200",
    iconBg: "bg-rose-500 text-white",
    icon: Award,
  },
];

// Fitur Navigasi Game
const gameNavigationFeatures = [
  {
    title: "Tombol Beranda",
    desc: "Kembali ke halaman utama untuk melihat ringkasan status.",
    icon: Home,
    color: "bg-blue-500 text-white",
  },
  {
    title: "Pengaturan Profil",
    desc: "Mengubah informasi akun, nama, dan pengaturan suara game.",
    icon: Settings,
    color: "bg-sky-500 text-white",
  },
  {
    title: "Poin & Bintang",
    desc: "Kumpulkan poin XP dan bintang dari setiap aktivitas yang diselesaikan.",
    icon: Star,
    color: "bg-amber-400 text-white",
  },
  {
    title: "Navigasi Zona",
    desc: "Akses peta perkembangan dan pilih zona level pembelajaran.",
    icon: BookOpen,
    color: "bg-emerald-500 text-white",
  },
  {
    title: "Aktivitas",
    desc: "Ikuti instruksi materi dan selesaikan tantangan kuis.",
    icon: Gamepad2,
    color: "bg-indigo-500 text-white",
  },
];

// Konten Detail untuk Setiap Menu Panduan
export default function PanduanPage() {
  const [activeMenu, setActiveMenu] = useState(1);

  return (
    <div className="min-h-screen bg-sky-50/40 pb-16">
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
              <span className="text-slate-800">Panduan Penggunaan</span>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                  Panduan Penggunaan
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-medium">
                  Ikuti langkah-langkah berikut untuk memulai petualangan
                  belajarmu dengan mudah dan menyenangkan!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3-COLUMN MAIN LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ---------------- 2. LEFT SIDEBAR: MENU PANDUAN ---------------- */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-3xl p-4 border border-sky-100 shadow-xs space-y-3">
              <div className="flex items-center gap-2 px-2">
                <Compass className="w-4 h-4 text-blue-600" />
                <h3 className="font-extrabold text-slate-800 text-sm">
                  Menu Panduan
                </h3>
              </div>

              <div className="space-y-2">
                {menuItems.map((item) => {
                  const isActive = activeMenu === item.id;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveMenu(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all cursor-pointer ${
                        isActive
                          ? "bg-blue-50/80 border-2 border-blue-400 text-blue-700 shadow-xs"
                          : "bg-slate-50/60 border border-slate-100 text-slate-700 hover:bg-slate-100/80"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-tight">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5 font-medium line-clamp-1">
                            {item.desc}
                          </div>
                        </div>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 shrink-0 ${isActive ? "text-blue-600" : "text-slate-400"}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-3xl p-5 border border-sky-100 text-center space-y-3 shadow-xs">
              <div className="w-10 h-10 mx-auto rounded-full bg-sky-100 text-blue-600 flex items-center justify-center shadow-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-xs">
                  Selamat menjelajah!
                </h4>
                <p className="text-[11px] text-slate-600 mt-1 font-medium">
                  Ilmu hari ini, masa depan esok!
                </p>
              </div>
            </div>
          </div>

          {/* ---------------- 3. CENTER: DYNAMIC MAIN CONTENT GUIDE ---------------- */}
          <div className="lg:col-span-6 space-y-6">
            {activeMenu === 1 && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-sky-100 shadow-xs space-y-5 animate-in fade-in duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center shrink-0 shadow-sm">
                    1
                  </div>
                  <div>
                    <h2 className="font-extrabold text-slate-800 text-base">
                      Cara Memulai Petualangan
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Ikuti langkah-langkah sederhana berikut untuk mulai
                      menjelajahi platform.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stepsCaraMemulai.map((s, idx) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border ${s.bgCard} flex flex-col justify-between gap-3 shadow-xs`}
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className={`w-8 h-8 rounded-xl ${s.iconBg} flex items-center justify-center shadow-sm font-extrabold text-xs`}
                          >
                            {s.step}
                          </div>
                          <Icon className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">
                            {s.title}
                          </h4>
                          <p className="text-[11px] text-slate-600 mt-1 leading-relaxed font-medium">
                            {s.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeMenu === 2 && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-sky-100 shadow-xs space-y-5 animate-in fade-in duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center shrink-0 shadow-sm">
                    2
                  </div>
                  <div>
                    <h2 className="font-extrabold text-slate-800 text-base">
                      Navigasi Game & Fitur Utama
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Kenali fungsi tombol dan menu navigasi yang tersedia di
                      dalam platform.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {gameNavigationFeatures.map((feat, idx) => {
                    const Icon = feat.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/70 border border-slate-100"
                      >
                        <div
                          className={`w-8 h-8 rounded-xl ${feat.color} flex items-center justify-center shrink-0 shadow-xs mt-0.5`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-xs">
                            {feat.title}
                          </h5>
                          <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                            {feat.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeMenu === 3 && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-sky-100 shadow-xs space-y-5 animate-in fade-in duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center shrink-0 shadow-sm">
                    3
                  </div>
                  <div>
                    <h2 className="font-extrabold text-slate-800 text-base">
                      Menyelesaikan Zona Pembelajaran
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Panduan menuntaskan level demi level Bangun Datar.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-600 leading-relaxed font-medium">
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                    <h4 className="font-extrabold text-emerald-900 text-sm">
                      Prasyarat Level 1 (Persegi)
                    </h4>
                    <p>
                      Selesaikan aktivitas 1 hingga 4 secara berurutan untuk
                      membuka pencapaian zona secara penuh dan mengaktifkan
                      lencana penghargaan.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 space-y-1.5">
                    <h4 className="font-extrabold text-sky-900 text-sm">
                      Zona Berikutnya
                    </h4>
                    <p>
                      Zona lanjutan seperti Persegi Panjang, Segitiga, dan
                      Lingkaran akan terbuka otomatis sesuai perkembangan
                      kurikulum belajar Anda.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeMenu === 4 && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-sky-100 shadow-xs space-y-5 animate-in fade-in duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center shrink-0 shadow-sm">
                    4
                  </div>
                  <div>
                    <h2 className="font-extrabold text-slate-800 text-base">
                      Sistem Penilaian & Hadiah
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Cara mendapatkan akumulasi XP dan bintang.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                    <h4 className="font-black text-amber-900 text-sm">
                      ⭐ Bintang Prestasi
                    </h4>
                    <p className="text-xs text-amber-800 font-medium">
                      Didapatkan saat menyelesaikan aktivitas modul pembelajaran
                      secara tuntas.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
                    <h4 className="font-black text-blue-900 text-sm">
                      ⚡ Poin XP
                    </h4>
                    <p className="text-xs text-blue-800 font-medium">
                      Akumulasi pengalaman belajar untuk menaikkan level
                      petualang Anda.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeMenu === 5 && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-sky-100 shadow-xs space-y-5 animate-in fade-in duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center shrink-0 shadow-sm">
                    5
                  </div>
                  <div>
                    <h2 className="font-extrabold text-slate-800 text-base">
                      Tips & Trik Belajar Efektif
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Maksimalkan sesi belajar geometri Anda agar lebih
                      menyenangkan.
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs font-medium text-slate-600">
                  {[
                    "Catat rumus-rumus penting pada buku catatan kecil.",
                    "Ulangi materi yang belum dipahami melalui menu progres.",
                    "Jaga konsistensi belajar setiap hari untuk mempertahankan streak.",
                    "Manfaatkan fitur profil untuk memantau pencapaian total XP.",
                  ].map((tip, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ---------------- 4. RIGHT SIDEBAR: TIPS & CTA ---------------- */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <h4 className="font-extrabold text-slate-800 text-sm">
                  Tips Penting
                </h4>
              </div>

              <ul className="space-y-2.5 text-xs font-medium text-slate-600">
                {[
                  "Pastikan koneksi penyimpanan lokal stabil.",
                  "Baca setiap instruksi materi dengan teliti.",
                  "Jangan ragu untuk mencoba dan bereksperimen.",
                  "Kamu bisa mengulang materi kapan saja.",
                ].map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>

              <div className="p-3 rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50 border border-sky-100 text-center relative">
                <Quote className="w-4 h-4 text-sky-300 mx-auto mb-1" />
                <p className="text-[11px] font-bold italic text-slate-700 leading-tight">
                  Setiap langkah kecil adalah kemajuan besar!
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-600 rounded-3xl p-5 text-white shadow-md shadow-indigo-500/20 space-y-4 text-center">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner">
                <Award className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h4 className="font-black text-sm">Siap Memulai?</h4>
                <p className="text-[11px] text-white/80 mt-1 font-medium leading-relaxed">
                  Ayo jelajahi semua zona dan raih prestasimu!
                </p>
              </div>

              <Link
                href="/materi"
                className="w-full py-2.5 rounded-full bg-white hover:bg-slate-100 text-indigo-700 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all block"
              >
                <Play className="w-3.5 h-3.5 fill-indigo-700" />
                <span>Mulai Petualangan</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
