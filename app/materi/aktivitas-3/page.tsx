"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Trophy, Award } from "lucide-react";
import { saveActivityCompletion } from "@/lib/progress";
import AreaPuzzleBoard from "./components/AreaPuzzleBoard";

export default function AreaBuilderMainPage() {
  const [] = useState(2);
  const [gameFinished, setGameFinished] = useState(false);


  const handleCompleteAll = () => {
    setGameFinished(true);
    saveActivityCompletion("akt-3", 50, 5);
  };
  return (
    <div className="min-h-screen bg-[#e3fdfd] pb-16 select-none">
      <div className="max-w-5xl mx-auto px-4 pt-4 space-y-4">
        {/* Navigasi Atas */}
        <div className="flex items-center justify-between bg-white/85 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xs border border-sky-100">
          <Link
            href="/materi"
            className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Materi</span>
          </Link>
          <div className="text-xs font-black text-slate-700">
            Aktivitas 3: Puzzle Area & Lubang Tengah
          </div>
        </div>

        {!gameFinished ? (
          <div className="space-y-4">
            <div className="w-full bg-[#1b1464] text-white py-3 rounded-2xl text-center font-black text-sm tracking-wide shadow-md uppercase">
              Tantangan: Tutup Lubang & Pecahkan Soal Area
            </div>

            {/* Komponen Puzzle Lubang Persegi */}
            <AreaPuzzleBoard onCompleteAll={handleCompleteAll} />
          </div>
        ) : (
          /* Layar Selesai */
          <div className="bg-white rounded-3xl p-8 border border-sky-100 shadow-xs text-center space-y-6 max-w-lg mx-auto">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white shadow-lg">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                Aktivitas Selesai!
              </span>
              <h2 className="text-2xl font-black text-slate-800">
                Arsitek Cilik Luar Biasa!
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Kamu berhasil mencocokkan kepingan puzzle dan menghitung area
                dengan sempurna.
              </p>
            </div>

            <Link
              href="/poin"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Kunjungi Toko Poin & Lanjut</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
