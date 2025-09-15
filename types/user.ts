export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
  dueDate: string;
  babyGender: string;
  theme: string;
}
export interface GreetingUser {
  name: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}
export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}
export interface UpdateUserPayload {
  name?: string;
  dueDate?: string;
  babyGender?: 'boy' | 'girl' | 'unknown';
}
