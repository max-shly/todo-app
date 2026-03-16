import { CollectionItem } from '..';

import styles from './CollectionList.module.less';

import type { Collection } from '../../types';

interface CollectionListProps {
  collections: Collection[];
  onEditCollection: (collection: Collection) => void;
  onDeleteCollection: (id: string) => void;
}

export function CollectionList({
  collections,
  onEditCollection,
  onDeleteCollection,
}: CollectionListProps) {
  if (collections.length === 0) return <p className={styles.empty}>No Collections</p>;

  return (
    <div className={styles.list}>
      {collections.map((collection) => (
        <CollectionItem
          key={collection.id}
          collection={collection}
          onEditCollection={onEditCollection}
          onDeleteCollection={onDeleteCollection}
        />
      ))}
    </div>
  );
}
