import { GreetingData } from '@/types/greeting';
import {
  LoginCredentials,
  RegisterCredentials,
  UpdateUserPayload,
  User,
} from '@/types/user';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

//reg
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

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append('avatar', file);

  const { data } = await api.patch<User>('/users/current/avatars', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
};
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
