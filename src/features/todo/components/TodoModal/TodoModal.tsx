import { useState, type SubmitEvent } from 'react';

import { Button } from '@/shared/ui/Button/Button.js';
import { Input } from '@/shared/ui/Input/Input.js';
import { Modal } from '@/shared/ui/Modal/Modal.js';

import styles from './TodoModal.module.less';

export interface TodoModalProps {
  onClose: () => void;
  onSave: (data: { title: string; date: string }) => void;
  initialTodo?: { title: string; date: string } | null;
}

export function TodoModal({ onClose, onSave, initialTodo }: TodoModalProps) {
  const [title, setTitle] = useState(initialTodo?.title ?? '');
  const [date, setDate] = useState(initialTodo?.date ?? new Date().toISOString().split('T')[0]);
  const [errors, setErrors] = useState<{ title?: string }>({});

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrors({ title: 'Title is required' });
      return;
    }

    onSave({ title: title.trim(), date });
  };

  return (
    <Modal title={initialTodo ? 'Update TODO' : 'Add TODO'} onClose={onClose}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <Input
            label="Title"
            type="text"
            id="todo-text"
            value={title}
            error={errors.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className={styles.actions}>
          <Button type="submit">{initialTodo ? 'Save' : 'Add'}</Button>
          <Button onClick={onClose} variant="delete">
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
