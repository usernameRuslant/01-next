import { create } from 'zustand';

interface BabyToday {
  babySize: number;
  babyWeight: number;
  babyActivity: string;
  babyDevelopment: string;
  image: string;
}

interface DashboardState {
  curWeekToPregnant: number;
  daysBeforePregnant: number;
  babyToday: BabyToday;
  momHint: string;
  isLoading: boolean;
  setDashboardData: (data: Partial<DashboardState>) => void;
}

export const useDashboardStore = create<DashboardState>()((set) => ({
  curWeekToPregnant: 0,
  daysBeforePregnant: 0,
  babyToday: {
    babySize: 0,
    babyWeight: 0,
    babyActivity: 'Немає даних',
    babyDevelopment: 'Немає даних',
    image: '',
  },
  momHint: '',
  isLoading: true,
  setDashboardData: (data) =>
    set((state) => ({ ...state, ...data, isLoading: false })),
}));
