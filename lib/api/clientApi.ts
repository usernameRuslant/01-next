// import { GreetingData } from '@/types/greeting';
// import { api } from './api';
// import { GreetingUser } from '@/types/user';

// export const fetchGreeting = async (): Promise<GreetingData> => {
//   const { data } = await api.get<GreetingData>('/weeks/greeting/public');
//   return data;
// };
// export const getCurrentUser = async (): Promise<GreetingUser> => {
//   try {
//     const { data } = await api.get<GreetingUser>('/users/current');
//     return data;
//   } catch (error: any) {
//     if (error.response?.status === 401) {
//       // мок для разработки без авторизации
//       const mockUser: GreetingUser = {
//         name: 'Ганна',
//       };
//       return mockUser;
//     }
//     throw error;
//   }
// };
// export const getCurrentUser = async (): Promise<GreetingUser> => {
//   try {
//     const { data } = await api.get<GreetingUser>('/users/current');
//     return data;
//   } catch (err: unknown) {
//     const error = err as { response?: { status?: number } };

//     if (error.response?.status === 401) {
//       // мок для разработки без авторизации
//       const mockUser: GreetingUser = {
//         name: 'Ирина',
//       };
//       return mockUser;
//     }

//     throw err;
//   }
// };
