'use client';
import { useQuery } from '@tanstack/react-query';
import css from './StatusBlock.module.css';
import { GreetingData } from '@/types/greeting';
import { getGreeting, getPublicGreeting } from '@/lib/api/api';
import { useAuthStore } from '@/lib/store/authStore';

const StatusBlock = () => {
  const user = useAuthStore((s) => s.user);

  const { data, isLoading, error } = useQuery<GreetingData>({
    queryKey: ['greeting', user ? 'private' : 'public'],
    queryFn: user ? getGreeting : getPublicGreeting,
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Не вдалося завантажити дані</p>;
  return (
    <ul className={css.list}>
      <li className={css.item}>
        <h4>Тиждень</h4>
        <p>{data?.curWeekToPregnant}</p>
      </li>
      <li className={css.item}>
        <h4>Днів до зустрічі</h4>
        <p>~{data?.daysBeforePregnant}</p>
      </li>
    </ul>
  );
};

export default StatusBlock;
