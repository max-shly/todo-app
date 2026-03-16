import { Button } from '@/shared/ui';

import styles from './CollectionHeader.module.less';

import type { Collection } from '../../types';

interface CollectionHeaderProps {
  hasCollections: boolean;
  onAddCollection: (collection: Collection | null) => void;
}

export function CollectionHeader({ onAddCollection }: CollectionHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.btns}>
        <Button onClick={() => onAddCollection(null)}>Add Collection</Button>
      </div>
    </header>
  );
}
