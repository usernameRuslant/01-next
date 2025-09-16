'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/lib/api/clientApi';

export default function AvatarBlock() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (!user) return <p>Нет данных</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: 20 }}>
      <Image
        src={user.avatarUrl}
        alt={user.name}
        width={120}
        height={120}
        style={{ borderRadius: '50%' }}
      />
      <p>{user.name}</p>
    </div>
  );
}
