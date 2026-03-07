import { NavLink } from 'react-router-dom';

import styles from './AppHeader.module.less';

export function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={`containerCentered ${styles.headerContainer}`}>
        <NavLink to="/" className={styles.logo}>
          TODO List
        </NavLink>

        <nav>
          <NavLink to="/collections" className={({ isActive }) => (isActive ? styles.active : '')}>
            Collections
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
