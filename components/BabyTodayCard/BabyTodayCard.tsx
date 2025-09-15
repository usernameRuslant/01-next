'use client';
import { GreetingData } from '@/types/greeting';
import Image from 'next/image';
import React from 'react';
import css from './BabyTodayCard.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { getGreeting, getPublicGreeting } from '@/lib/api/api';

const BabyTodayCard = () => {
  const user = useAuthStore((s) => s.user);
  const { data, isLoading, error } = useQuery<GreetingData>({
    queryKey: ['babyToday', user ? 'private' : 'public'],
    queryFn: user ? getGreeting : getPublicGreeting,
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (error || !data?.babyToday) return <p>Не вдалося завантажити дані</p>;

  const baby = data.babyToday;
  return (
    <div className={css.babyTodayCard}>
      <h3 className={css.babyTodayCard_title}>Малюк сьогодні</h3>
      <div className={css.babyTodayCard_wrapper}>
        <Image
          src={baby.image}
          alt={baby.babyActivity}
          width={100}
          height={100}
          className={css.babyTodayCard_img}
        />
        <ul className={css.babyTodayCard_info}>
          <li>
            <p>
              <span className={css.babyTodayCardWeight}>Розмір:</span>
              Приблизно {baby.babySize} см
            </p>
          </li>
          <li>
            <p>
              <span className={css.babyTodayCardWeight}>Вага:</span> Близько
              {baby.babyWeight} грамів.
            </p>
          </li>
          <li>
            <p>
              <span className={css.babyTodayCardWeight}>Активність:</span>
              {baby.babyActivity}
            </p>
          </li>
        </ul>
      </div>

      <p>{baby.babyDevelopment}</p>
    </div>
  );
};

export default BabyTodayCard;
