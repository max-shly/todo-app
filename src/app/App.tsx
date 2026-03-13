import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles/global.less';

import { TodoPage, CollectionsPage } from '@/pages';

import { Prototype } from './layouts/Prototype/Prototype';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Prototype />}>
            <Route index element={<TodoPage />} />
            <Route path="collections" element={<CollectionsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
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
