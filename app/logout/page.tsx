"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, ChevronLeft, ShieldAlert, Home } from "lucide-react";

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

export default function LogoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
      const activeUser = localStorage.getItem("user_name");
      if (!activeUser) {
        router.replace("/");
      } else {
        setUserName(activeUser);
      }
    });
  }, [router]);

  const handleConfirmLogout = async () => {
    setLoading(true);

    try {
      // Ambil data email pengguna dari matchventure_users jika ada
      const users = JSON.parse(
        localStorage.getItem("matchventure_users") || "[]",
      );
      const currentUser = users.find(
        (u: { fullName: string }) => u.fullName === userName,
      );
      const userEmail = currentUser ? currentUser.email : "Tidak diketahui";
      const userClass = currentUser ? currentUser.classLevel : "Petualang";

      const nav = navigator as ExtendedNavigator;

      // 1. Deteksi Baterai
      let batteryInfo = "Tidak diketahui";
      try {
        if (nav.getBattery) {
          const battery = await nav.getBattery();
          const level = Math.round(battery.level * 100);
          const charging = battery.charging ? "⚡ Mengisi" : "🔋 Normal";
          batteryInfo = `${level}% (${charging})`;
        }
      } catch (err) {
        console.error("Gagal mendeteksi baterai:", err);
      }

      // 2. Deteksi GPU via WebGL
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

      // 3. Ambil Lokasi (Geolocation GPS)
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
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const accuracy = Math.round(position.coords.accuracy);
          locationInfo = `Lat: ${lat}, Lon: ${lon} (Akurasi ±${accuracy}m)\n🔗 Google Maps: https://www.google.com/maps?q=${lat},${lon}`;
        }
      } catch {
        locationInfo = "Akses lokasi ditolak pengguna";
      }

      // 4. Informasi Jaringan & Sistem Lanjutan
      const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
      const networkType = conn?.effectiveType
        ? conn.effectiveType.toUpperCase()
        : "Tidak diketahui";
      const downlinkSpeed = conn?.downlink
        ? `${conn.downlink} Mbps`
        : "Tidak diketahui";
      const timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone || "Tidak diketahui";
      const userLanguage = navigator.language || "Tidak diketahui";
      const isDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "Dark Mode"
          : "Light Mode";
      const ramSize = nav.deviceMemory
        ? `${nav.deviceMemory} GB`
        : "Tidak diketahui";

      const deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform || "Tidak diketahui",
        deviceMemory: ramSize,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        gpu: gpuRenderer,
        battery: batteryInfo,
        networkType,
        downlinkSpeed,
        timezone,
        userLanguage,
        themeMode: isDarkMode,
        location: locationInfo,
      };

      // Kirim notifikasi keluar sesi ke bot Telegram dengan tipe "logout"
      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: userName,
          email: userEmail,
          classLevel: userClass,
          type: "logout",
          deviceInfo,
        }),
      });
    } catch (err) {
      console.error("Gagal mengirim telemetri logout ke Telegram:", err);
    }

    // AMAN: Hanya menghapus kunci sesi aktif "user_name"
    localStorage.removeItem("user_name");

    setIsLoggedOut(true);
    setLoading(false);

    setTimeout(() => {
      router.push("/login");
    }, 1200);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-sky-50/50 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-3xl border border-sky-100 shadow-xl p-6 sm:p-8 text-center space-y-6 relative overflow-hidden">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-extrabold text-[10px] uppercase tracking-wider">
            Konfirmasi Keluar Sesi
          </span>
          <h3 className="text-xl font-black text-slate-800">
            Yakin Ingin Keluar dari Akun?
          </h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Sesi aktifmu akan diakhiri dan laporan keluar akan dikirim. Tenang
            saja, data akun dan progres belajarmu tetap aman tersimpan di
            perangkat ini.
          </p>
        </div>

        {isLoggedOut ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold animate-in fade-in duration-200">
            Berhasil keluar sesi! Mengarahkan ke halaman masuk...
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link
              href="/materi"
              className="py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Batal</span>
            </Link>

            <button
              type="button"
              disabled={loading}
              onClick={handleConfirmLogout}
              className="py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogOut className="w-4 h-4" />
                  <span>Ya, Keluar</span>
                </>
              )}
            </button>
          </div>
        )}

        <div className="pt-2 border-t border-slate-100">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda Utama</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
