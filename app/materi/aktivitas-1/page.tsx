"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { saveActivityCompletion } from "@/lib/progress";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Sparkles,
  HelpCircle,
  Award,
} from "lucide-react";

// Data Halaman / Slide Bacaan Materi
const slideContents = [
  {
    slide: 1,
    title: "Bentuk Persegi",
    subtitle: "Mengenal Bentuk Persegi",
    image:
      "https://cdn.utakatikotak.com/finder/gambar%20bangun%20datar%20persegi(2).png",
    paragraphs: [
      "Persegi adalah salah satu bentuk bangun datar yang sangat rapi. Di sekitar kita, ada banyak sekali benda yang berbentuk persegi, seperti ubin lantai, papan catur, atau biskuit kotak.",
      "Pojok-pojok pada persegi semuanya berbentuk tegak lurus dan sama besar. Jika kamu mengukur garis pinggirnya, semuanya akan terlihat seimbang.",
    ],
    funFact:
      "Bentuk kotak pada persegi memiliki 4 pojok (sudut) dan 4 garis pinggir (sisi) yang semuanya sama panjang!",
    quiz: {
      question:
        "Di bawah ini, benda manakah yang biasanya memiliki bentuk permukaan persegi?",
      options: [
        "Papan catur.",
        "Bola basket",
        "Atap rumah segitiga",
        "Roda sepeda",
      ],
      correctIndex: 0,
    },
  },
  {
    slide: 2,
    title: "Sisi dan Sudut Persegi",
    subtitle: "Mengenal sisi dan sudut Persegi",
    image:
      "https://i.pinimg.com/736x/85/96/8a/85968a6738222059b3828560404e211d.jpg",
    paragraphs: [
      "Persegi dibatasi oleh garis-garis lurus yang dinamakan sisi. Keunikan dari persegi adalah keempat sisinya memiliki ukuran yang persis sama panjang, tidak ada yang lebih pendek atau lebih panjang.",
      "Pertemuan antara dua sisi persegi membentuk pojok yang tegak lurus. Pojok tegak lurus ini di dalam matematika disebut dengan nama sudut siku-siku.",
    ],
    funFact:
      "Karena semua pojoknya tegak lurus, persegi memiliki 4 sudut siku-siku yang bentuknya mirip seperti huruf 'L'!",
    quiz: {
      question:
        "Apa nama jenis sudut yang terbentuk di setiap pojok bangun datar persegi?",
      options: [
        "Sudut lancip",
        "Sudut tumpul",
        "Sudut siku-siku",
        "Sudut lurus",
      ],
      correctIndex: 2,
    },
  },
  {
    slide: 3,
    title: "Simetri Lipat dan Keliling",
    subtitle: "Mengenal Simetri Lipat dan Keliling Persegi",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE2FSr42epmIrKZinKHf4P1hNCqG2dEIKhUQRkvjTMkfnrdpUTL_Ixsa4&s=10",
    paragraphs: [
      "Persegi adalah bangun datar yang sangat seimbang. Jika kamu melipat kertas berbentuk persegi secara vertikal, horizontal, atau menyilang (diagonal), belahan kertasnya akan saling menutupi dengan pas.",
      "Selain bisa dilipat, kita juga bisa menghitung panjang seluruh pinggiran persegi. Jumlah dari keempat panjang sisi persegi tersebut dinamakan Keliling.",
    ],
    funFact:
      "Persegi memiliki 4 simetri lipat. Karena keempat sisinya sama, rumus untuk menghitung kelilingnya sangat mudah, yaitu 4 dikali panjang sisi!",
    quiz: {
      question:
        "Sebuah taman berbentuk persegi memiliki panjang sisi 8 meter. Berapakah keliling taman tersebut?",
      options: ["16 meter", "24 meter", "32 meter", "64 meter"],
      correctIndex: 2,
    },
  },
  {
    slide: 4,
    title: "Luas dan Garis Diagonal",
    subtitle: "Mengenal Luas dan Garis Diagonal Persegi",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJKjM125alQ5pGWZPPId_HuBy-jm7qzRbi4K49fRTYg&s=10",
    paragraphs: [
      "Persegi memiliki wilayah dalam yang disebut daerah luas. Untuk menghitung Luas Persegi, kita cukup mengalikan ukuran sisi bawah dengan ukuran sisi tegaknya, atau dirumuskan dengan sisi dikali sisi (\(s \times s\)).",
      "Di dalam persegi juga terdapat dua garis menyilang dari pojok ke pojok yang disebut garis diagonal. Kedua garis diagonal ini memiliki panjang yang sama dan saling memotong secara tegak lurus tepat di titik tengah persegi.",
    ],
    funFact:
      "Jika kamu memotong persegi tepat pada kedua garis diagonalnya, kamu akan mendapatkan 4 buah segitiga sama kaki yang ukurannya sama persis!",
    quiz: {
      question:
        "Sebuah ubin berbentuk persegi memiliki panjang sisi sebesar 10 cm. Berapakah luas permukaan ubin tersebut?",
      options: ["40 cm²", "20 cm²", "100 cm²", "50 cm²"],
      correctIndex: 2,
    },
  },
];

export default function BacaanMateriPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentData = slideContents[currentSlide];
  const isLastSlide = currentSlide === slideContents.length - 1;

  const handleNextSlide = () => {
    if (!isLastSlide) {
      setCurrentSlide(currentSlide + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsPlayingAudio(false);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsPlayingAudio(false);
    }
  };

  const handleSelectQuiz = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-sky-50/40 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-4 space-y-6">
        {/* ================= 1. HEADER BREADCRUMB & CONTROL ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-sky-100 shadow-xs">
          <div className="flex items-center gap-3">
            <Link
              href="/materi"
              className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                <span>Pertemuan 1</span>
                <span>•</span>
                <span>Aktivitas 1</span>
              </div>
              <h1 className="text-base font-extrabold text-slate-800">
                Bacaan Materi: Misi Rahasia Persegi
              </h1>
            </div>
          </div>

          {/* Slide Progress & Audio Toggle */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`px-3 py-1.5 rounded-full border text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                isPlayingAudio
                  ? "bg-amber-100 border-amber-300 text-amber-800 animate-pulse"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  <span>Suara: On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-400" />
                  <span>Bacakan Suara</span>
                </>
              )}
            </button>

            <span className="text-xs font-black text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
              {currentSlide + 1} / {slideContents.length}
            </span>
          </div>
        </div>

        {/* Progress Line */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{
              width: `${((currentSlide + 1) / slideContents.length) * 100}%`,
            }}
          />
        </div>

        {/* ================= 2. MAIN BACAAN CONTENT ================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-6">
          {/* Image Banner */}
          <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden border border-sky-100 shadow-inner">
            <div className="relative w-full h-full">
              <Image
                src={currentData.image}
                alt={currentData.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-500/90 backdrop-blur-sm text-[10px] font-extrabold uppercase tracking-wider mb-1">
                Halaman {currentData.slide}
              </span>
              <h2 className="text-xl sm:text-2xl font-black leading-tight">
                {currentData.title}
              </h2>
              <p className="text-xs text-sky-200 font-medium mt-0.5">
                {currentData.subtitle}
              </p>
            </div>
          </div>

          {/* Text Paragraphs */}
          <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            {currentData.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className="bg-sky-50/40 p-4 rounded-2xl border border-sky-100/60"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Fun Fact Box */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-900 font-black flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-amber-900 text-xs uppercase tracking-wider">
                Tahukah Kamu?
              </h4>
              <p className="text-xs font-semibold text-amber-800 mt-0.5 leading-relaxed">
                {currentData.funFact}
              </p>
            </div>
          </div>

          {/* Mini Interactive Quiz Check */}
          <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <h4 className="font-extrabold text-slate-800 text-xs">
                Cek Pemahaman Singkat
              </h4>
            </div>

            <p className="text-xs font-bold text-slate-700">
              {currentData.quiz.question}
            </p>

            <div className="space-y-2 pt-1">
              {currentData.quiz.options.map((opt, optIdx) => {
                const isSelected = selectedAnswer === optIdx;
                const isCorrect = optIdx === currentData.quiz.correctIndex;

                let btnStyle =
                  "bg-white text-slate-700 border-slate-200 hover:bg-slate-50";
                if (showResult && isSelected) {
                  btnStyle = isCorrect
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                    : "bg-rose-500 text-white border-rose-500";
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectQuiz(optIdx)}
                    className={`w-full p-3 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {showResult && isSelected && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-white/20 rounded-md">
                        {isCorrect ? "Benar! 🎉" : "Coba Lagi! ❌"}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= 3. NAVIGATION CONTROLS ================= */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrevSlide}
            disabled={currentSlide === 0}
            className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-700 font-extrabold text-xs flex items-center gap-2 hover:bg-slate-50 disabled:opacity-40 transition-all shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          {!isLastSlide ? (
            <button
              onClick={handleNextSlide}
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                saveActivityCompletion("akt-1", 20, 5);
                router.push("/poin");
              }}
              className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20 transition-all"
            >
              <Award className="w-4 h-4" />
              <span>Selesai & Ambil Poin</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
