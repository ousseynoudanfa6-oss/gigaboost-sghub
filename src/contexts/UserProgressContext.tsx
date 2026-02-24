import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

export const AD_TIERS = [
  { ads: 1, gigs: 2 },
  { ads: 2, gigs: 5 },
  { ads: 3, gigs: 10 },
  { ads: 5, gigs: 25 },
];

interface AdEntry {
  timestamp: string;
  adIndex: number;
}

interface ProgressData {
  adsWatched: number;
  history: AdEntry[];
  completed: boolean;
  referralCode: string;
  referrals: number;
}

interface UserProgressContextType {
  progress: ProgressData;
  watchAd: () => void;
  currentGigs: number;
}

const defaultProgress: ProgressData = {
  adsWatched: 0,
  history: [],
  completed: false,
  referralCode: "",
  referrals: 0,
};

const UserProgressContext = createContext<UserProgressContextType | null>(null);

export const useUserProgress = () => {
  const ctx = useContext(UserProgressContext);
  if (!ctx) throw new Error("useUserProgress must be used within UserProgressProvider");
  return ctx;
};

function getGigs(ads: number) {
  let gigs = 0;
  for (const tier of AD_TIERS) {
    if (ads >= tier.ads) gigs = tier.gigs;
  }
  return gigs;
}

export const UserProgressProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ProgressData>(defaultProgress);

  const storageKey = user ? `gb_progress_${user.id}` : null;

  useEffect(() => {
    if (!storageKey) { setProgress(defaultProgress); return; }
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setProgress(JSON.parse(stored));
    } else {
      const fresh = { ...defaultProgress, referralCode: user!.id.slice(0, 8) };
      setProgress(fresh);
    }
  }, [storageKey]);

  const save = (data: ProgressData) => {
    setProgress(data);
    if (storageKey) localStorage.setItem(storageKey, JSON.stringify(data));
  };

  const watchAd = () => {
    const next = {
      ...progress,
      adsWatched: progress.adsWatched + 1,
      history: [...progress.history, { timestamp: new Date().toISOString(), adIndex: progress.adsWatched + 1 }],
      completed: progress.adsWatched + 1 >= 5,
    };
    save(next);
  };

  const currentGigs = getGigs(progress.adsWatched);

  return (
    <UserProgressContext.Provider value={{ progress, watchAd, currentGigs }}>
      {children}
    </UserProgressContext.Provider>
  );
};
