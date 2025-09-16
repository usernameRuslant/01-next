'use client';

import { getCurrentUser, refreshSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  // 1. перевірка сессії (сессія + отримання користувача) на клієнті для того, щоб мати актуальний стан аутентифікації для подальшого відображення потрібного інтерфейсу.

  useEffect(() => {
    const asyncWrapper = async () => {
      try {
        await refreshSession();
        const user = await getCurrentUser();
        setUser(user);
      } catch (error) {
        // router.replace('/sign-in');
        console.log(error);
      }
    };
    asyncWrapper();
  }, [router, setUser]);

  // стан isRefreshing ???

  return children;
};

export default AuthProvider;
