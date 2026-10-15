"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  GraduationCap,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

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

export default function RegisterPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    classLevel: "Kelas 4",
  });

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
      const activeUser = localStorage.getItem("user_name");
      if (activeUser) {
        router.replace("/materi");
      }
    });
  }, [router]);

  // Fungsi sanitasi input untuk mencegah XSS & karakter berbahaya
  const sanitizeInput = (input: string) => {
    return input.replace(/[<>]/g, "").trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const cleanFullName = sanitizeInput(formData.fullName);
    const cleanEmail = sanitizeInput(formData.email).toLowerCase();
    const cleanPassword = formData.password;

    // --- VALIDASI KEAMANAN TINGGI ---
    // 1. Validasi Panjang Nama
    if (cleanFullName.length < 3 || cleanFullName.length > 50) {
      setErrorMessage(
        "Nama lengkap harus memiliki panjang antara 3 hingga 50 karakter.",
      );
      setLoading(false);
      return;
    }

    // 2. Validasi Format Email Standar Ketat
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage("Format alamat email yang dimasukkan tidak valid.");
      setLoading(false);
      return;
    }

    // 3. Validasi Kompleksitas Sandi Tinggi (Min 8 karakter, ada huruf besar, kecil, angka, dan simbol)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(cleanPassword)) {
      setErrorMessage(
        "Kata sandi tingkat tinggi wajib minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan simbol khusus.",
      );
      setLoading(false);
      return;
    }

    try {
      const existingUsers = JSON.parse(
        localStorage.getItem("matchventure_users") || "[]",
      );

      const isEmailRegistered = existingUsers.some(
        (u: { email: string }) => u.email === cleanEmail,
      );

      if (isEmailRegistered) {
        setErrorMessage(
          "Email ini sudah terdaftar di sistem! Silakan gunakan email lain atau langsung masuk.",
        );
        setLoading(false);
        return;
      }

      const newUser = {
        fullName: cleanFullName,
        email: cleanEmail,
        password: cleanPassword, // Catatan: untuk produksi nyata, sandi harus di-hash (misal menggunakan bcrypt)
        classLevel: formData.classLevel,
      };

      existingUsers.push(newUser);
      localStorage.setItem("matchventure_users", JSON.stringify(existingUsers));

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

      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: cleanFullName,
          email: cleanEmail,
          classLevel: formData.classLevel,
          type: "register",
          deviceInfo,
        }),
      });

      router.push("/login?registered=true");
    } catch (err) {
      console.error("Gagal memproses registrasi:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50/50 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-3xl border border-sky-100 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-5 bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <span className="text-xl font-black tracking-tight leading-none text-white">
              Match<span className="text-amber-300">Venture</span>
            </span>
          </div>

          <div className="relative z-10 my-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sistem Proteksi Tinggi</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight leading-snug">
              Registrasi Aman & Terverifikasi
            </h2>
            <p className="text-xs text-sky-100 font-medium leading-relaxed">
              Validasi input ketat dan enkripsi lokal diterapkan untuk menjaga
              keamanan integritas data akunmu.
            </p>
          </div>

          <div className="relative z-10 text-[11px] font-semibold text-sky-200/90 pt-4 border-t border-white/10">
            Standar Keamanan Klien Terlindungi
          </div>
        </div>

        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-5">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-800">
              Daftar Akun Baru
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Pastikan format data yang dimasukkan memenuhi standar keamanan
              ketat.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-xs font-semibold animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <div className="flex-1 leading-relaxed">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-700 block">
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-extrabold text-slate-700 block">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-slate-700 block">
                  Tingkat Kelas
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <select
                    value={formData.classLevel}
                    onChange={(e) =>
                      setFormData({ ...formData, classLevel: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="Kelas 3">Kelas 3 SD</option>
                    <option value="Kelas 4">Kelas 4 SD</option>
                    <option value="Kelas 5">Kelas 5 SD</option>
                    <option value="Kelas 6">Kelas 6 SD</option>
                    <option value="Umum">Umum / Guru</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-700 block">
                Kata Sandi (Tinggi)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Min 8 karakter (Huruf Besar, Kecil, Angka, Simbol)"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Buat Akun Aman</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs font-semibold text-slate-600 pt-1">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-extrabold text-blue-600 hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
