"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  BookOpen,
  BarChart2,
  HelpCircle,
  Info,
  User,
  Lock,
  UserPlus,
  LogIn,
} from "lucide-react";

const navItems = [
  { name: "Beranda", href: "/", icon: Home },
  { name: "Materi", href: "/materi", icon: BookOpen },
  { name: "Progres", href: "/progres", icon: BarChart2 },
  { name: "Panduan", href: "/panduan", icon: HelpCircle },
  { name: "Tentang", href: "/tentang", icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState("Akun");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
      // Membaca data nama pengguna dari sesi login / localStorage
      try {
        const storedUser =
          localStorage.getItem("user_name") || localStorage.getItem("user");
        if (storedUser) {
          setIsLoggedIn(true);
          // Jika disimpan sebagai objek JSON atau string biasa
          if (storedUser.startsWith("{")) {
            const userData = JSON.parse(storedUser);
            if (userData.name) {
              // Ambil nama depannya saja atau nama lengkap
              const firstName = userData.name.split(" ")[0];
              setUserName(firstName);
            }
          } else {
            setUserName(storedUser.split(" ")[0]);
          }
        }
      } catch (e) {
        console.error("Gagal membaca data pengguna:", e);
      }
    });
  }, []);

  const displayUser = mounted ? userName : "Akun";

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    // Jangan tampilkan modal jika pengguna sedang berada di halaman login/register atau ingin menuju ke sana
    if (
      pathname === "/login" ||
      pathname === "/register" ||
      href === "/login" ||
      href === "/register"
    ) {
      return;
    }

    // Jika mengeklik menu Progres dan belum login, cegah dan tampilkan modal
    if (href === "/progres" && !isLoggedIn) {
      e.preventDefault();
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <header className="w-full bg-white shadow-sm sticky top-0 z-50 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* 1. Logo & Tagline */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-[#0B2545] tracking-tight leading-none">
                Match<span className="text-[#007AFF]">Venture</span>
              </span>
              <span className="text-[11px] font-bold text-[#4B6B94] tracking-wide mt-1">
                Belajar • Main • Paham
              </span>
            </div>
          </Link>

          {/* 2. Navigation Menu */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative flex items-center gap-2 py-2 text-sm font-bold transition-colors ${
                    isActive
                      ? "text-[#007AFF]"
                      : "text-[#5C728A] hover:text-[#007AFF]"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-[#007AFF]" : "text-[#7B91B0]"
                    }`}
                  />
                  <span>{item.name}</span>

                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#007AFF] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 3. Tombol Akun / Profil Login */}
          <div>
            <Link
              href={isLoggedIn ? "/profile" : "/login"}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#E8F1FD] hover:bg-[#D8E6FC] transition-colors shadow-xs"
            >
              <div className="w-7 h-7 rounded-full bg-[#007AFF] text-white flex items-center justify-center shadow-sm">
                <User className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-[#007AFF] max-w-[120px] truncate">
                {displayUser}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Modal Peringatan Wajib Login / Daftar untuk Menu Terproteksi */}
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
                dahulu untuk melihat progres pencapaian belajar.
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
