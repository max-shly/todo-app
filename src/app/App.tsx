import { Toaster } from 'react-hot-toast';

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
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '14px',
          },
        }}
      />
    </>
  );
}

export default App;
