import { TodoContainer } from '@/features/todo/components/TodoContainer/TodoContainer';

import styles from './AppMain.module.less';

export function AppMain() {
  return (
    <main className={styles.main}>
      <div className="containerCentered">
        <TodoContainer />
      </div>
    </main>
  );
}
