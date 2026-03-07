import { useEffect, useRef } from 'react';

import { createPortal } from 'react-dom';

import { Button } from '@/shared/ui';

import styles from './Modal.module.less';

export interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ title, onClose, children }: ModalProps) {
  /* const onCloseModal = useEffectEvent(() => {
    onClose?.();
  });*/
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // onCloseModal();
        onCloseRef.current();
      }
    };

    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleCloseModal = () => {
    onClose?.();
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleCloseModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          {title && <div className={styles.title}>{title}</div>}
          <Button variant="secondary" onClick={handleCloseModal} className={styles.btnClose}>
            X
          </Button>
        </header>
        <main>{children}</main>
      </div>
    </div>,
    document.body
  );
}
