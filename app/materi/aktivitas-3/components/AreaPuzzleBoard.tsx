"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  RotateCcw,
  Puzzle,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from "lucide-react";

interface AreaPuzzleBoardProps {
  onCompleteAll: () => void;
}

const puzzleLevels = [
  {
    level: 1,
    title: "Level 1: Lubang Kotak (Luas: 4)",
    targetPiece: "patch-2x2",
    correctArea: 4,
    hint: "Tutup lubang persegi di tengah dengan kepingan berukuran 2x2.",
    initialGrid: [
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      true,
      true,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
    ],
    holeIndices: [5, 6, 9, 10],
    pieces: [
      {
        id: "patch-1x1",
        label: "1x1",
        area: 1,
        width: "w-10 h-10",
        bg: "bg-emerald-500",
      },
      {
        id: "patch-2x2",
        label: "2x2",
        area: 4,
        width: "w-20 h-20",
        bg: "bg-emerald-500 grid grid-cols-2 p-1 gap-1",
      },
    ],
  },
  {
    level: 2,
    title: "Level 2: Lubang Memanjang (Luas: 4)",
    targetPiece: "patch-1x4",
    correctArea: 4,
    hint: "Lubang berbentuk garis panjang 1x4. Cari kepingan yang pas!",
    initialGrid: [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ],
    holeIndices: [10, 11, 12, 13],
    pieces: [
      {
        id: "patch-2x2",
        label: "2x2",
        area: 4,
        width: "w-20 h-20",
        bg: "bg-emerald-500 grid grid-cols-2 p-1 gap-1",
      },
      {
        id: "patch-1x4",
        label: "1x4",
        area: 4,
        width: "w-36 h-10",
        bg: "bg-emerald-500 flex justify-around items-center px-1",
      },
    ],
  },
  {
    level: 3,
    title: "Level 3: Lubang Persegi Panjang Besar (Luas: 6)",
    targetPiece: "patch-2x3",
    correctArea: 6,
    hint: "Tutup lubang besar berukuran 2x3 di tengah dengan kepingan yang tepat!",
    initialGrid: [
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ],
    holeIndices: [6, 7, 8, 11, 12, 13],
    pieces: [
      {
        id: "patch-1x4",
        label: "1x4",
        area: 4,
        width: "w-36 h-10",
        bg: "bg-emerald-500 flex justify-around items-center px-1",
      },
      {
        id: "patch-2x3",
        label: "2x3",
        area: 6,
        width: "w-28 h-20",
        bg: "bg-emerald-500 grid grid-cols-3 grid-rows-2 p-1 gap-1",
      },
    ],
  },
];

export default function AreaPuzzleBoard({
  onCompleteAll,
}: AreaPuzzleBoardProps) {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  const currentLevel = puzzleLevels[currentLevelIdx];

  const handleDragStart = (e: React.DragEvent, pieceType: string) => {
    e.dataTransfer.setData("text/plain", pieceType);
    setSelectedPiece(pieceType);
  };

  const handleDropOnHole = (e: React.DragEvent) => {
    e.preventDefault();
    if (isSolved) return;

    if (selectedPiece === currentLevel.targetPiece) {
      setIsSolved(true);
      setShowQuestion(true);
      setFeedback({
        message: "Kepingan pas! Silakan jawab pertanyaan area di bawah.",
        type: "success",
      });
    } else {
      setFeedback({
        message:
          "Kepingan belum pas untuk menutup lubang ini! Pastikan ukuran luasnya sesuai.",
        type: "error",
      });
    }
  };

  const handleCheckAnswer = () => {
    if (parseInt(userAnswer.trim(), 10) === currentLevel.correctArea) {
      setScore((prev) => prev + 10);
      if (currentLevelIdx < puzzleLevels.length - 1) {
        setFeedback({
          message: "Hebat! Jawaban benar. Lanjut ke level berikutnya! 🚀",
          type: "success",
        });
        setTimeout(() => {
          setCurrentLevelIdx((prev) => prev + 1);
          setSelectedPiece(null);
          setIsSolved(false);
          setShowQuestion(false);
          setUserAnswer("");
          setFeedback(null);
        }, 1200);
      } else {
        onCompleteAll();
      }
    } else {
      setFeedback({
        message: `Perhitungan area belum tepat. Target luas lubang ini adalah ${currentLevel.correctArea} kotak satuan!`,
        type: "error",
      });
    }
  };

  const handleReset = () => {
    setSelectedPiece(null);
    setIsSolved(false);
    setShowQuestion(false);
    setUserAnswer("");
    setFeedback(null);
  };

  const colsCount = currentLevel.level === 1 ? 4 : 5;

  return (
    <div className="space-y-4 w-full max-w-lg mx-auto pb-8">
      {/* Header Level Info */}
      <div className="flex items-center justify-between bg-white px-5 py-2.5 rounded-2xl border border-sky-100 shadow-xs">
        <div>
          <span className="text-xs font-black text-indigo-600 uppercase tracking-wider">
            {currentLevel.title}
          </span>
          <p className="text-[11px] font-bold text-slate-500">
            Tahap {currentLevelIdx + 1} dari {puzzleLevels.length}
          </p>
        </div>
        <div className="px-3 py-1 bg-amber-100 text-amber-800 font-black text-xs rounded-xl border border-amber-300">
          Skor: {score} Poin
        </div>
      </div>

      {/* Banner Feedback Kustom */}
      {feedback && (
        <div
          className={`p-3 rounded-2xl border flex items-start gap-2.5 text-xs font-semibold animate-in fade-in duration-200 ${
            feedback.type === "error"
              ? "bg-rose-50 border-rose-200 text-rose-700"
              : "bg-emerald-50 border-emerald-200 text-emerald-700"
          }`}
        >
          {feedback.type === "error" ? (
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
          ) : (
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
          )}
          <div className="flex-1 leading-relaxed">{feedback.message}</div>
        </div>
      )}

      {/* Area Utama Puzzle */}
      <div className="bg-white rounded-3xl p-6 border border-sky-100 shadow-sm space-y-5 text-center">
        <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 px-1">
          <span>{currentLevel.hint}</span>
          <button
            onClick={handleReset}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ulangi</span>
          </button>
        </div>

        {/* Papan Bingkai Puzzle */}
        <div className="w-56 h-56 mx-auto bg-slate-100 border-2 border-slate-300 rounded-2xl p-3 flex items-center justify-center shadow-inner">
          <div
            className={`grid gap-1.5 w-full h-full`}
            style={{
              gridTemplateColumns: `repeat(${colsCount}, minmax(0, 1fr))`,
            }}
          >
            {currentLevel.initialGrid.map((isFilled, idx) => {
              const isHole = currentLevel.holeIndices.includes(idx);

              if (isHole) {
                return (
                  <div
                    key={idx}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={isSolved ? undefined : handleDropOnHole}
                    className={`rounded-lg border-2 transition-all flex items-center justify-center ${
                      isSolved
                        ? "bg-emerald-500 border-emerald-600 shadow-inner"
                        : "bg-white border-dashed border-amber-400 shadow-xs hover:bg-amber-50/50"
                    }`}
                  >
                    {isSolved && idx === currentLevel.holeIndices[0] && (
                      <Puzzle className="w-5 h-5 text-white/90 animate-pulse" />
                    )}
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  className={`rounded-lg border ${
                    isFilled
                      ? "bg-indigo-600 border-indigo-700 shadow-xs"
                      : "bg-transparent border-transparent"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Bagian Pertanyaan Perhitungan Area */}
        {showQuestion && (
          <div className="bg-[#faedcd] border-2 border-amber-300 p-4 rounded-2xl space-y-3 animate-fadeIn">
            <div className="text-xs font-black text-slate-800">
              🎉 Kepingan pas! Pertanyaan Tantangan:
            </div>
            <p className="text-xs font-bold text-slate-700">
              Berapa total satuan luas (
              <span className="text-purple-700">Area</span>) dari kepingan
              penutup tersebut?
            </p>
            <div className="flex items-center justify-center gap-2">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Ketik jawaban..."
                className="w-36 px-3 py-2 bg-white border-2 border-slate-300 rounded-xl text-center font-black text-slate-800 text-xs shadow-inner outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleCheckAnswer}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center gap-1"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Cek</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Palet Kepingan Pilihan di Bawah */}
      <div className="flex items-center justify-center gap-4 bg-[#fefae0] p-4 rounded-2xl border-2 border-slate-300 shadow-inner max-w-sm mx-auto">
        <span className="text-xs font-bold text-slate-700">
          Pilih Kepingan:
        </span>
        <div className="flex items-center gap-3">
          {currentLevel.pieces.map((piece) => (
            <div
              key={piece.id}
              draggable
              onDragStart={(e) => handleDragStart(e, piece.id)}
              onClick={() => setSelectedPiece(piece.id)}
              className={`${piece.width} ${piece.bg} border-2 border-emerald-700 rounded-xl shadow-sm cursor-grab active:cursor-grabbing hover:scale-105 transition-transform flex items-center justify-center`}
              title={`Kepingan ${piece.label} (Luas: ${piece.area})`}
            >
              {piece.id === "patch-2x2" && (
                <>
                  <div className="border border-emerald-700/30 rounded-xs bg-emerald-400 w-full h-full" />
                  <div className="border border-emerald-700/30 rounded-xs bg-emerald-400 w-full h-full" />
                </>
              )}
              {piece.id === "patch-1x4" && (
                <div className="w-full h-full bg-emerald-400 rounded-xs" />
              )}
              {piece.id === "patch-2x3" && (
                <div className="w-full h-full grid grid-cols-3 grid-rows-2 gap-0.5 p-0.5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-emerald-400 border border-emerald-600/30 rounded-xs"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
