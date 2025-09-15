'use client';
import { useAuthStore } from '@/lib/store/authStore';
import css from './Sidebar.module.css';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api/api';

const Sidebar = () => {
  const isLog = useAuthStore((state) => state.isAuthenticated);
  const links = [
    { href: '/', label: 'Мій день' },
    { href: '/travel', label: 'Подорож' },
    { href: '/diary', label: 'Щоденик' },
    { href: '/profile', label: 'Профіль' },
  ];
  const router = useRouter();
  const clearUser = useAuthStore((s) => s.clearIsAuthenticated);

  const onLogout = async () => {
    try {
      await logout();
      clearUser();
      router.push('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <nav className={css.navigation}>
      <ul>
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              // style={{
              //   color: pathname === href ? 'blue' : 'black',
              //   fontWeight: pathname === href ? 'bold' : 'normal',
              //   textDecoration: 'none',
              // }}
            >
              {label}
            </Link>
          </li>
        ))}
        <li className={css.home}>
          <Link href="/sign-in">Sign-in</Link>
        </li>
        <li className={css.home}>
          <Link href="/sign-up">Sign-Up</Link>
        </li>
        {isLog && (
          <li className={css.logout}>
            <button onClick={onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
