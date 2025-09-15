// import DashboardClient from './dashboard.client';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* <DashboardClient /> */}
      <div
      // style={{ flex: 1, padding: '16px' }}
      >
        {children}
      </div>
    </div>
  );
}
// 'use client';

// import { ReactNode, useEffect } from 'react';
// import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
// import { useUserStore } from '@/store/userStore';

// export default function RootLayout({ children }: { children: ReactNode }) {
//   const setUser = useUserStore((state) => state.setUser);
//   const username = useUserStore((state) => state.username);

//   // Симулируем запрос к бэку один раз
//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const res = await fetch('/api/me'); // твой API
//         if (!res.ok) throw new Error('Not logged in');
//         const data = await res.json();
//         setUser({ username: data.username, isLoggedIn: true });
//       } catch {
//         setUser({ username: 'Гість', isLoggedIn: false });
//       }
//     }
//     fetchUser();
//   }, [setUser]);

//   return (
//     <div
//       style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
//     >
//       <GreetingBlock username={username} />
//       <div style={{ flex: 1, padding: '16px' }}>{children}</div>
//     </div>
//   );
// }
