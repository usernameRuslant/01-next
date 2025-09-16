// import { GreetingData } from '@/types/greeting';
// import { api } from './api';
// import { GreetingUser } from '@/types/user';

import { api } from '@/app/api/api';
import { nextServer } from './api';

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
//reg
import { GreetingData } from '@/types/greeting';
import {
  LoginCredentials,
  RegisterCredentials,
  UpdateUserPayload,
  User,
} from '@/types/user';

export const register = async (credentials: RegisterCredentials) => {
  const { data } = await api.post<void>('/auth/register', credentials);
  return data;
};
//log
export const login = async (credentials: LoginCredentials) => {
  const { data } = await api.post<User>('/auth/login', credentials);
  return data; // тут уже User
};
//
export const getCurrentUser = async () => {
  const { data } = await api.get<User>('/users/current');
  return data;
};

export const updateUser = async (credentials: UpdateUserPayload) => {
  const { data } = await api.patch<User>('/users/current', credentials);
  console.log(credentials);
  return data;
};

// export const uploadAvatar = async (file: File) => {
//   const formData = new FormData();
//   formData.append('avatar', file);

//   const { data } = await nextServer.patch<User>(
//     '/users/current/avatars',
//     formData,
//     {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     }
//   );

//   return data;
// };
export const uploadAvatar = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append('avatar', file);

  const { data } = await api.patch<User>('/users/current/avatars', formData);

  return data;
};
////////////////////////////////////
export const refreshSession = async () => {
  const { data } = await api.get('/auth/session');
  return data;
};

export const logout = async () => {
  await api.post('/auth/logout', {});
};
//
export const getGreeting = async (): Promise<GreetingData> => {
  const { data } = await api.get<GreetingData>('/weeks/greeting');
  return data;
};
export const getPublicGreeting = async (): Promise<GreetingData> => {
  const { data } = await api.get<GreetingData>('/weeks/greeting/public');
  return data;
};
