"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    const activeUser = localStorage.getItem("user_name");
    if (activeUser) {
      router.replace("/materi");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLockedOut) return;

    setLoading(true);
    setErrorMessage("");

    const cleanInput = formData.usernameOrEmail.trim();
    const cleanPassword = formData.password;

    if (!cleanInput || !cleanPassword) {
      setErrorMessage("Kolom masukan tidak boleh kosong.");
      setLoading(false);
      return;
    }

    try {
      const existingUsers = JSON.parse(
        localStorage.getItem("matchventure_users") || "[]",
      );

      const foundUser = existingUsers.find(
        (u: { email: string; password: string; fullName: string }) =>
          (u.email === cleanInput || u.fullName === cleanInput) &&
          u.password === cleanPassword,
      );

      if (!foundUser) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);

        if (newAttempts >= 5) {
          setIsLockedOut(true);
          setErrorMessage(
            "Terlalu banyak percobaan gagal. Akses masuk dikunci sementara demi keamanan, silahkan coba lagi beberapa waktu.",
          );
          setTimeout(() => {
            setIsLockedOut(false);
            setLoginAttempts(0);
          }, 120000);
        } else {
          setErrorMessage(
            `Kredensial salah! Percobaan gagal ke-${newAttempts} dari 5 batas maksimal.`,
          );
        }
        setLoading(false);
        return;
      }

      setLoginAttempts(0);
      localStorage.setItem("user_name", foundUser.fullName);

      window.location.href = "/";
    } catch (err) {
      console.error("Kesalahan sistem login:", err);
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
        <div className="md:col-span-5 bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-500 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <span className="text-xl font-black tracking-tight leading-none text-white">
              Match<span className="text-amber-300">Venture</span>
            </span>
          </div>

          <div className="relative z-10 my-8 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/25 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/20">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Keamanan Berlapis</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight leading-snug">
              Verifikasi Kredensial Pengguna
            </h2>
            <p className="text-xs text-sky-100 font-medium leading-relaxed">
              Sistem dilengkapi pembatasan percobaan sandi (*Brute-Force
              Protection*) untuk mencegah akses tidak sah.
            </p>
          </div>

          <div className="relative z-10 text-[11px] font-semibold text-sky-200/90 pt-4 border-t border-white/10">
            Sesi Terenkripsi Klien
          </div>
        </div>

        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-800">
              Masuk Akun Aman
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Masukkan identitas akun dan sandi yang telah terdaftar.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-xs font-semibold animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <div className="flex-1 leading-relaxed">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 block">
                Nama Pengguna / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  disabled={isLockedOut}
                  placeholder="Masukkan nama pengguna atau email"
                  value={formData.usernameOrEmail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      usernameOrEmail: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 block">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLockedOut}
                  placeholder="Masukkan kata sandi akun"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:bg-white focus:border-blue-500 outline-none transition-all disabled:opacity-50"
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

            {/* Tautan Lupa Kata Sandi */}
            <div className="flex items-center justify-end text-xs pt-1">
              <Link
                href="/lupa-sandi"
                className="font-bold text-blue-600 hover:underline"
              >
                Lupa Kata Sandi?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading || isLockedOut}
              className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isLockedOut ? (
                <span>Akun Dikunci Sementara...</span>
              ) : (
                <>
                  <span>Masuk Aman</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs font-semibold text-slate-600 pt-2">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="font-extrabold text-blue-600 hover:underline"
            >
              Daftar Gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
