import { AppHeader } from '../AppHeader/AppHeader';
import { AppMain } from '../AppMain/AppMain';

import styles from './Prototype.module.less';

export function Prototype() {
  return (
    <div className={styles.prototype}>
      <AppHeader />
      <AppMain />
    </div>
  );
}
