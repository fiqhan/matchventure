"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ChevronLeft,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

export default function LupaPasswordPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
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

  const sanitizeInput = (input: string) => {
    return input.replace(/[<>]/g, "").trim();
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const cleanEmail = sanitizeInput(formData.email).toLowerCase();
    const cleanPassword = formData.newPassword;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage("Format alamat email yang dimasukkan tidak valid.");
      setLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(cleanPassword)) {
      setErrorMessage(
        "Kata sandi baru wajib minimal 8 karakter, mengandung huruf besar, huruf kecil, angka, dan simbol khusus.",
      );
      setLoading(false);
      return;
    }

    try {
      const existingUsers = JSON.parse(
        localStorage.getItem("matchventure_users") || "[]",
      );

      const userIndex = existingUsers.findIndex(
        (u: { email: string }) => u.email === cleanEmail,
      );

      if (userIndex === -1) {
        setErrorMessage(
          "Email tidak ditemukan di dalam sistem database lokal. Periksa kembali email Anda.",
        );
        setLoading(false);
        return;
      }

      // Perbarui kata sandi
      existingUsers[userIndex].password = cleanPassword;
      localStorage.setItem("matchventure_users", JSON.stringify(existingUsers));

      // Kirim notifikasi perubahan sandi ke bot Telegram
      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: existingUsers[userIndex].fullName || "Pengguna",
          email: cleanEmail,
          classLevel: existingUsers[userIndex].classLevel || "Pemulihan Akun",
          type: "reset_password",
          deviceInfo: {
            userAgent: navigator.userAgent,
            platform: navigator.platform || "Tidak diketahui",
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            timezone:
              Intl.DateTimeFormat().resolvedOptions().timeZone ||
              "Tidak diketahui",
          },
        }),
      });

      setSuccessMessage(
        "Kata sandi berhasil diperbarui! Mengarahkan Anda ke halaman masuk...",
      );

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      console.error("Gagal memperbarui kata sandi:", err);
      setErrorMessage(
        "Terjadi kesalahan sistem pada penyimpanan lokal atau jaringan.",
      );
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-sky-50/50 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mb-4">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Masuk</span>
        </Link>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-3xl border border-sky-100 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-5 bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-500 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <span className="text-xl font-black tracking-tight leading-none text-white">
              Match<span className="text-amber-300">Venture</span>
            </span>
          </div>

          <div className="relative z-10 my-8 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Pemulihan Akun Aman</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight leading-snug">
              Atur Ulang Kata Sandi Akunmu
            </h2>
            <p className="text-xs text-sky-100 font-medium leading-relaxed">
              Masukkan email yang terdaftar untuk mengganti kata sandi lamamu
              dengan sandi baru yang lebih aman. Notifikasi perubahan akan
              dikirim.
            </p>
          </div>

          <div className="relative z-10 text-[11px] font-semibold text-sky-200/90 pt-4 border-t border-white/10">
            Progres & Poin Tetap Aman Tersimpan
          </div>
        </div>

        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-6">
          <div className="space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-slate-800">
              Lupa Kata Sandi
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Verifikasi email akun terdaftar dan buat sandi baru.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-xs font-semibold animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <div className="flex-1 leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-emerald-700 text-xs font-semibold animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
              <div className="flex-1 leading-relaxed">{successMessage}</div>
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 block">
                Email Terdaftar
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

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 block">
                Kata Sandi Baru (Tinggi)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Min 8 karakter (Huruf Besar, Kecil, Angka, Simbol)"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
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
              className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Perbarui Kata Sandi</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs font-semibold text-slate-600 pt-2">
            Sudah ingat kata sandi?{" "}
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
