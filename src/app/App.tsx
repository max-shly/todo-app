import { AppHeader } from './layouts/AppHeader/AppHeader';
import { AppMain } from './layouts/AppMain/AppMain';
import './styles/global.less';
import styles from './styles/prototype.module.less';

function App() {
  return (
    <>
      <div className={styles.prototype}>
        <AppHeader />
        <AppMain />
      </div>
    </>
  );
}

export default App;
