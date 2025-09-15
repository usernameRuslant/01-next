export interface BabyToday {
  babySize: number;
  babyWeight: number;
  babyActivity: string;
  babyDevelopment: string;
  image: string;
}
export interface GreetingData {
  curWeekToPregnant: number;
  daysBeforePregnant: number;
  babyToday: BabyToday;
  momHint: string;
}
export interface BabyStatus {
  curWeekToPregnant: number;
  daysBeforePregnant: number;
}
