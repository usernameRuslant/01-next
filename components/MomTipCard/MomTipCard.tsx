'use client';
import { useAuthStore } from '@/lib/store/authStore';
import css from './MomTipCard.module.css';
import { getGreeting, getPublicGreeting } from '@/lib/api/api';
import { useQuery } from '@tanstack/react-query';
import { GreetingData } from '@/types/greeting';

const MomTipCard = () => {
  const user = useAuthStore((s) => s.user);
  const { data, isLoading, error } = useQuery<GreetingData>({
    queryKey: ['momTip', user ? 'private' : 'public'],
    queryFn: user ? getGreeting : getPublicGreeting,
  });
  if (isLoading) return <p>Завантаження...</p>;
  if (error || !data?.momHint) return <p>Не вдалося завантажити пораду</p>;

  return (
    <div className={css.momTipCard}>
      <h3 className={css.momTipCard_title}>Порада для мами</h3>
      <p>{data.momHint}</p>
    </div>
  );
};

export default MomTipCard;
