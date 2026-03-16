import { useState, type SubmitEvent } from 'react';

import { Button, Input, Modal } from '@/shared/ui';

import styles from './CollectionModal.module.less';

export interface CollectionModalProps {
  onClose: () => void;
  onSave: (data: { name: string }) => void;
  initialCollection?: { name: string } | null;
}

export function CollectionModal({ onClose, onSave, initialCollection }: CollectionModalProps) {
  const [name, setTitle] = useState(initialCollection?.name ?? '');
  const [errors, setErrors] = useState<{ name?: string }>({});

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrors({ name: 'Title is required' });
      return;
    }

    onSave({ name: name.trim() });
  };

  return (
    <Modal title={initialCollection ? 'Update Collection' : 'Add Collection'} onClose={onClose}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <Input
            label="Title"
            type="text"
            id="collection-text"
            value={name}
            error={errors.name}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <Button type="submit">{initialCollection ? 'Save' : 'Add'}</Button>
          <Button onClick={onClose} variant="delete">
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
