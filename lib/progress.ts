export interface UserProgress {
  totalXp: number;
  totalStars: number;
  completedActivities: string[];
  unlockedRewards: string[];
  streakDays: number;
  lastActiveDate: string;
  userName?: string; // Tambahan properti nama pengguna
}

const STORAGE_KEY = "learnbox_user_progress_v1";

function getTodayDateString(): string {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

export function getProgress(): UserProgress {
  if (typeof window === "undefined") {
    return {
      totalXp: 0,
      totalStars: 0,
      completedActivities: [],
      unlockedRewards: [],
      streakDays: 0,
      lastActiveDate: "",
      userName: "Petualang Cilik",
    };
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      const initialProgress: UserProgress = {
        totalXp: 0,
        totalStars: 0,
        completedActivities: [],
        unlockedRewards: [],
        streakDays: 0,
        lastActiveDate: getTodayDateString(),
        userName: "Petualang Cilik",
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProgress));
      return initialProgress;
    }

    const progress: UserProgress = JSON.parse(data);

    // Pastikan properti userName selalu ada
    if (!progress.userName) {
      progress.userName = "Petualang Cilik";
    }

    const today = getTodayDateString();
    if (progress.lastActiveDate !== today) {
      const lastDate = new Date(progress.lastActiveDate || today);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        progress.streakDays = (progress.streakDays || 0) + 1;
      } else if (diffDays > 1) {
        progress.streakDays = 1;
      }

      progress.lastActiveDate = today;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }

    return progress;
  } catch (error) {
    console.error("Gagal membaca progres dari localStorage:", error);
    return {
      totalXp: 0,
      totalStars: 0,
      completedActivities: [],
      unlockedRewards: [],
      streakDays: 0,
      lastActiveDate: "",
      userName: "Petualang Cilik",
    };
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Gagal menyimpan progres ke localStorage:", error);
  }
}

// Fungsi baru untuk memperbarui nama pengguna secara dinamis
export function setUserName(name: string): void {
  const progress = getProgress();
  progress.userName = name;
  saveProgress(progress);
}

export function completeActivity(
  activityId: string,
  xpReward: number = 50,
  starReward: number = 3,
): boolean {
  const progress = getProgress();

  if (!progress.completedActivities.includes(activityId)) {
    progress.completedActivities.push(activityId);
    progress.totalXp += xpReward;
    progress.totalStars += starReward;
    progress.lastActiveDate = getTodayDateString();
    saveProgress(progress);
    return true;
  }

  return false;
}

export function saveActivityCompletion(
  activityId: string,
  xpReward: number = 50,
  starReward: number = 3,
): boolean {
  return completeActivity(activityId, xpReward, starReward);
}

export function unlockRewardItem(rewardId: string, cost: number): boolean {
  const progress = getProgress();

  if (
    progress.totalStars >= cost &&
    !progress.unlockedRewards.includes(rewardId)
  ) {
    progress.totalStars -= cost;
    progress.unlockedRewards.push(rewardId);
    saveProgress(progress);
    return true;
  }

  return false;
}
