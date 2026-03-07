import { Outlet } from 'react-router-dom';

import styles from './AppMain.module.less';

export function AppMain() {
  return (
    <main className={styles.main}>
      <Outlet />
    </main>
  );
}
