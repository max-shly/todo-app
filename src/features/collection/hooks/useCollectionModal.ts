import { useCallback, useState } from 'react';

import type { Collection } from '../types';

export function useCollectionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);

  const open = useCallback((collection: Collection | null) => {
    setIsOpen(true);
    setEditingCollection(collection);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setEditingCollection(null);
  }, []);

  return { isOpen, editingCollection, open, close };
}
