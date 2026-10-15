"use client";

import { useState } from "react";
import Link from "next/link";
import { saveActivityCompletion } from "@/lib/progress";
import {
  ChevronLeft,
  Sparkles,
  Award,
  RotateCcw,
  Trophy,
  ArrowRight,
  Grid,
} from "lucide-react";
import { useRouter } from "next/navigation";

type BlockColor = "blue" | "emerald" | "amber" | "rose" | null;

const COLOR_CLASSES: Record<NonNullable<BlockColor>, string> = {
  blue: "bg-blue-500 border-blue-600 text-white shadow-blue-500/30",
  emerald: "bg-emerald-500 border-emerald-600 text-white shadow-emerald-500/30",
  amber: "bg-amber-400 border-amber-500 text-slate-900 shadow-amber-400/30",
  rose: "bg-rose-500 border-rose-600 text-white shadow-rose-500/30",
};

const EDUCATIONAL_FACTS = [
  "Hebat! Kamu menyatukan 4 balok menjadi 1 Persegi Utuh dengan 4 sudut siku-siku!",
  "Luar biasa! Persegi memiliki 4 sisi yang panjangnya sama persis.",
  "Keren! Persegi juga memiliki 4 simetri lipat yang seimbang.",
  "Mantap! Keliling persegi dihitung dengan mengalikan 4 dengan panjang sisinya.",
];

export default function SquareBlockJamPage() {
  const router = useRouter();
  const [board, setBoard] = useState<BlockColor[][]>([
    ["blue", "emerald", "blue", "amber"],
    ["blue", "emerald", "amber", "amber"],
    ["rose", "blue", "emerald", "rose"],
    ["rose", "amber", "emerald", "rose"],
  ]);

  const [selectedCell, setSelectedCell] = useState<{
    r: number;
    c: number;
  } | null>(null);
  const [score, setScore] = useState(0);
  const [combos, setCombos] = useState(0);
  const [factText, setFactText] = useState(
    "Geser balok warna untuk membentuk Persegi 2x2 utuh!",
  );

  const TARGET_SCORE = 100;
  const isGameWon = score >= TARGET_SCORE;

  // Fungsi Cek dan Hancurkan Persegi 2x2
  const checkAndClearSquares = (currentBoard: BlockColor[][]) => {
    let gainedPoints = 0;
    const nextBoard = currentBoard.map((row) => [...row]);
    let matched = false;

    // Cek semua kemungkinan blok 2x2
    for (let r = 0; r < nextBoard.length - 1; r++) {
      for (let c = 0; c < nextBoard[r].length - 1; c++) {
        const color = nextBoard[r][c];
        if (
          color !== null &&
          nextBoard[r][c + 1] === color &&
          nextBoard[r + 1][c] === color &&
          nextBoard[r + 1][c + 1] === color
        ) {
          nextBoard[r][c] = null;
          nextBoard[r][c + 1] = null;
          nextBoard[r + 1][c] = null;
          nextBoard[r + 1][c + 1] = null;
          gainedPoints += 25;
          matched = true;
        }
      }
    }

    if (matched) {
      const nextCombo = combos + 1;
      const factIndex = nextCombo % EDUCATIONAL_FACTS.length;
      setFactText(EDUCATIONAL_FACTS[factIndex]);
      setCombos(nextCombo);
    }

    return { nextBoard, gainedPoints };
  };

  // Fungsi Mengklik / Menggeser Balok
  const handleCellClick = (r: number, c: number) => {
    if (isGameWon) return;

    // Jika belum ada yang dipilih, pilih balok (pastikan bukan sel kosong)
    if (!selectedCell) {
      if (board[r][c] !== null) {
        setSelectedCell({ r, c });
      }
      return;
    }

    // Jika mengeklik sel yang sama, batalkan pilihan
    if (selectedCell.r === r && selectedCell.c === c) {
      setSelectedCell(null);
      return;
    }

    // Cek apakah sel tujuan adalah tetangga kosong (atas, bawah, kiri, kanan)
    const isAdjacent =
      Math.abs(selectedCell.r - r) + Math.abs(selectedCell.c - c) === 1;

    if (isAdjacent) {
      const newBoard = board.map((row) => [...row]);

      // Tukar posisi balok dengan sel kosong (atau geser)
      const targetColor = newBoard[r][c];
      newBoard[r][c] = newBoard[selectedCell.r][selectedCell.c];
      newBoard[selectedCell.r][selectedCell.c] = targetColor;

      // Cek apakah membentuk persegi setelah digeser
      const { nextBoard, gainedPoints } = checkAndClearSquares(newBoard);

      setBoard(nextBoard);
      setScore((prev) => prev + gainedPoints);
      setSelectedCell(null);
    } else {
      // Jika mengeklik balok lain, pindahkan pilihan ke balok tersebut
      if (board[r][c] !== null) {
        setSelectedCell({ r, c });
      } else {
        setSelectedCell(null);
      }
    }
  };

  // Fungsi tombol arah tambahan untuk kenyamanan mobile
  const handleMoveDirection = (dir: "up" | "down" | "left" | "right") => {
    if (!selectedCell) return;
    const { r, c } = selectedCell;
    let targetR = r;
    let targetC = c;

    if (dir === "up") targetR = r - 1;
    if (dir === "down") targetR = r + 1;
    if (dir === "left") targetC = c - 1;
    if (dir === "right") targetC = c + 1;

    if (targetR >= 0 && targetR < 4 && targetC >= 0 && targetC < 4) {
      handleCellClick(targetR, targetC);
    }
  };

  // Reset Papan Game
  const handleReset = () => {
    setBoard([
      ["blue", "emerald", "blue", "amber"],
      ["blue", "emerald", "amber", "amber"],
      ["rose", "blue", "emerald", "rose"],
      ["rose", "amber", "emerald", "rose"],
    ]);
    setScore(0);
    setCombos(0);
    setSelectedCell(null);
    setFactText("Geser balok warna untuk membentuk Persegi 2x2 utuh!");
  };

  const handleShuffle = () => {
    // Mengacak susunan warna secara acak di papan
    const flatColors: BlockColor[] = [
      "blue",
      "blue",
      "blue",
      "blue",
      "emerald",
      "emerald",
      "emerald",
      "emerald",
      "amber",
      "amber",
      "amber",
      "amber",
      "rose",
      "rose",
      "rose",
      "rose",
    ];
    // Shuffle Fisher-Yates sederhana
    for (let i = flatColors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [flatColors[i], flatColors[j]] = [flatColors[j], flatColors[i]];
    }

    const newBoard: BlockColor[][] = [
      flatColors.slice(0, 4),
      flatColors.slice(4, 8),
      flatColors.slice(8, 12),
      flatColors.slice(12, 16),
    ];

    setBoard(newBoard);
    setSelectedCell(null);
  };

  return (
    <div className="min-h-screen bg-sky-50/40 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-4 space-y-6">
        {/* Header Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-sky-100 shadow-xs">
          <div className="flex items-center gap-3">
            <Link
              href="/materi"
              className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                Pertemuan 2 • Aktivitas 2
              </div>
              <h1 className="text-base font-extrabold text-slate-800">
                Square Block Jam: Puzzle Persegi
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleShuffle}
              className="px-3 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>🔀 Acak</span>
            </button>
            <div className="bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span className="text-xs font-black text-amber-900">
                Poin: {score} / {TARGET_SCORE}
              </span>
            </div>
          </div>
        </div>

        {/* Layout Utama Game */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Papan Game Grid 4x4 */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-sky-100 shadow-xs space-y-4 text-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Grid className="w-4 h-4 text-blue-600" />
                <h3 className="font-extrabold text-slate-800 text-sm">
                  Papan Balok Persegi
                </h3>
              </div>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                Combo: {combos}x
              </span>
            </div>

            {/* Board Grid */}
            <div className="grid grid-cols-4 gap-3 bg-sky-100/70 p-4 rounded-2xl border border-sky-200 aspect-square max-w-[340px] mx-auto">
              {board.map((row, rIdx) =>
                row.map((color, cIdx) => {
                  const isSelected =
                    selectedCell?.r === rIdx && selectedCell?.c === cIdx;

                  return (
                    <button
                      key={`${rIdx}-${cIdx}`}
                      onClick={() => handleCellClick(rIdx, cIdx)}
                      className={`relative rounded-2xl border-2 font-black transition-all flex items-center justify-center text-xs shadow-sm ${
                        color
                          ? `${COLOR_CLASSES[color]}${
                              isSelected
                                ? "ring-4 ring-amber-400 scale-105"
                                : ""
                            }`
                          : "bg-white/50 border-dashed border-sky-200"
                      }`}
                    >
                      {color && (
                        <div className="w-3 h-3 rounded-md bg-white/30" />
                      )}
                    </button>
                  );
                }),
              )}
            </div>

            <p className="text-[11px] font-medium text-slate-400 italic">
              *Klik balok warna, lalu klik kotak kosong di sebelahnya untuk
              menggeser.
            </p>
            {/* Panel Kontrol Arah untuk Mobile / Alternatif */}
            <div className="pt-3 border-t border-slate-100 flex flex-col items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400">
                Kontrol Geser (Pilih balok dulu, lalu arahkan):
              </span>
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => handleMoveDirection("up")}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black flex items-center justify-center shadow-xs transition-colors"
                >
                  ⬆️
                </button>
                <div className="flex gap-6">
                  <button
                    onClick={() => handleMoveDirection("left")}
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black flex items-center justify-center shadow-xs transition-colors"
                  >
                    ⬅️
                  </button>
                  <button
                    onClick={() => handleMoveDirection("right")}
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black flex items-center justify-center shadow-xs transition-colors"
                  >
                    ➡️
                  </button>
                </div>
                <button
                  onClick={() => handleMoveDirection("down")}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black flex items-center justify-center shadow-xs transition-colors"
                >
                  ⬇️
                </button>
              </div>
            </div>
          </div>

          {/* Panel Edukasi & Selesai Game */}
          <div className="md:col-span-5 space-y-4">
            {/* Box Informasi Edukasi */}
            <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-500">
                <Sparkles className="w-4 h-4" />
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">
                  Fakta Persegi
                </h4>
              </div>
              <p className="text-xs font-semibold text-slate-600 leading-relaxed bg-amber-50/60 p-4 rounded-2xl border border-amber-200/60">
                {factText}
              </p>
            </div>

            {/* Banner Penyelesaian Game (Terganti saat Menang) */}
            {isGameWon ? (
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-md text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-amber-300 shadow-inner">
                  <Award className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-base">Puzzle Selesai! 🎉</h4>
                  <p className="text-xs text-emerald-100 font-medium leading-relaxed">
                    Kamu berhasil menyusun balok-balok persegi dan mengumpulkan
                    100 Poin!
                  </p>
                </div>
                <button
                  onClick={() => {
                    saveActivityCompletion("akt-2", 30, 5);
                    router.push("/poin");
                  }}
                  className="w-full py-3 rounded-full bg-white hover:bg-slate-100 text-emerald-700 font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>Selesai & Kunjungi Toko Poin</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-xs text-center space-y-2">
                <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100">
                  Target Misi
                </span>
                <p className="text-xs font-extrabold text-slate-700">
                  Kumpulkan total {TARGET_SCORE} Poin untuk membuka tombol klaim
                  XP.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
