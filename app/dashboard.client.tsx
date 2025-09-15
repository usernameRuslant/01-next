import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
import MomTipCard from '@/components/MomTipCard/MomTipCard';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import css from './dashboard.module.css';

const DashboardClient = async () => {
  return (
    <div className={css.container}>
      <div className={css.statusBlock}>
        <StatusBlock />
        <BabyTodayCard />
        <MomTipCard />
      </div>
      <div>
        <div
          style={{
            maxWidth: 390,
            width: 390,
            height: 499,
            borderRadius: 32,
            backgroundColor: 'red',
            marginBottom: 32,
          }}
        ></div>
        <div
          style={{
            maxWidth: 390,

            height: 210,
            borderRadius: 32,
            backgroundColor: 'red',
          }}
        ></div>
      </div>
    </div>
  );
};

export default DashboardClient;
