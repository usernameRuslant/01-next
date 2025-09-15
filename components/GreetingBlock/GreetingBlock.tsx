'use client';

import css from './GreetingBlock.module.css';

import { useAuthStore } from '@/lib/store/authStore';

const GreetingBlock = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <div className={css.greetingBlock}>
      <h2>Доброго ранку, {user?.name || 'Майбутня мама'}!</h2>
    </div>
  );
};

export default GreetingBlock;
