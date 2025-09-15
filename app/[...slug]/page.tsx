// import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
// import StatusBlock from '@/components/StatusBlock/StatusBlock';
// import DashboardClient from '../dashboard.client';

// // export default function NotesPage({ params }: { params: { slug?: string[] } }) {
// //   // Проверяем наличие slug
// //   const slug = params?.slug || [];
// //   const section = slug[0] || 'MyDay';

// //   switch (section) {
// //     case 'MyDay':
// //       return (
// //         <div>
// //           <DashboardClient />
// //         </div>
// //       );
// //     case 'Travel':
// //       return <div> Контент для 2</div>;
// //     case 'Diary':
// //       return <div>Контент для 3</div>;
// //     case 'Profile':
// //       return <div> Контент для 4</div>;
// //     default:
// //       return <div>yfhjghjghjghjghj</div>;
// //   }
// // }
// export default async function NotesPage({
//   params,
// }: {
//   params: Promise<{ slug?: string[] }>;
// }) {
//   const { slug = [] } = await params;
//   const section = slug[0] || 'MyDay';

//   switch (section) {
//     case 'MyDay':
//       return <div>Мой день</div>;
//     case 'Travel':
//       return <div>Подорож</div>;
//     case 'Diary':
//       return <div>Жоденик</div>;
//     case 'Profile':
//       return <div>Профиль</div>;
//     default:
//       return <div>Мой день (дефолт)</div>;
//   }
// }

const page = () => {
  return <div></div>;
};

export default page;
