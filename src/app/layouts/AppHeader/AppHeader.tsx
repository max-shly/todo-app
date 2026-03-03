import styles from './AppHeader.module.less';

export function AppHeader() {
  return (
    <header className={styles.header}>
      <div className="containerCentered">TODO List</div>
    </header>
  );
}
