"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Globe, Shield, Lock, UserPlus, LogIn } from "lucide-react";

export default function Footer() {
  const router = useRouter();
  const [currentYear, setCurrentYear] = useState(2026);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setCurrentYear(new Date().getFullYear());

      // Cek apakah user sudah login/mendaftar
      const user = localStorage.getItem("user_name");
      if (user) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  const handleProtectedLink = (e: React.MouseEvent, href: string) => {
    if ((href === "/progres" || href === "/materi") && !isLoggedIn) {
      e.preventDefault();
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <footer className="bg-white border-t border-sky-100 mt-16 pt-12 pb-8 text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          {/* Top Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Brand Info */}
            <div className="md:col-span-5 space-y-3">
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tight leading-none text-slate-800">
                    Match<span className="text-blue-600">Venture</span>
                  </span>
                  <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase mt-0.5">
                    Belajar • Main • Paham
                  </span>
                </div>
              </Link>
              <p className="text-xs text-slate-500 font-medium max-w-sm leading-relaxed">
                Platform media pembelajaran digital interaktif berkonsep
                gamifikasi untuk mengenalkan Bangun Datar kepada anak-anak
                Indonesia.
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">
                Navigasi Utama
              </h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li>
                  <Link
                    href="/"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/materi"
                    onClick={(e) => handleProtectedLink(e, "/materi")}
                    className="hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Materi Pembelajaran
                  </Link>
                </li>
                <li>
                  <Link
                    href="/progres"
                    onClick={(e) => handleProtectedLink(e, "/progres")}
                    className="hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Progres Belajar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/panduan"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Panduan Penggunaan
                  </Link>
                </li>
              </ul>
            </div>

            {/* Info & Support */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">
                Dukungan & Informasi
              </h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li>
                  <Link
                    href="/tentang"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Tentang MatchVenture
                  </Link>
                </li>
                <li className="flex items-center gap-1.5 text-slate-500">
                  <Globe className="w-3.5 h-3.5 text-blue-500" />
                  <span>Kurikulum Berbasis Terpadu</span>
                </li>
                <li className="flex items-center gap-1.5 text-slate-500">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Aman & Ramah Anak</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1">
              <span>
                © {currentYear} MatchVenture. Dibuat oleh @SkylineDevs
              </span>
              <span>untuk pendidikan Indonesia.</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="italic font-bold text-slate-600">
                Belajar hari ini, untuk Indonesia esok
              </span>
            </div>
          </div>
        </div>
      </footer>

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
                dahulu untuk melihat progres dan materi belajar.
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
    </>
  );
}
