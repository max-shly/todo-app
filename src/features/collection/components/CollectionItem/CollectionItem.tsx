import { Button } from '@/shared/ui';

import styles from './CollectionItem.module.less';

import type { Collection } from '../../types';

interface CollectionProps {
  collection: Collection;
  onEditCollection: (collection: Collection) => void;
  onDeleteCollection: (id: string) => void;
}

export function CollectionItem({
  collection,
  onEditCollection,
  onDeleteCollection,
}: CollectionProps) {
  return (
    <div className={styles.item} data-id={collection.id}>
      <div className={styles.info}>
        <div className={styles.title} title={collection.name}>
          {collection.name}
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="secondary" onClick={() => onEditCollection(collection)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="15"
            height="15"
            viewBox="0 0 24 24"
          >
            <path d="M18.4,4.4l1.2,1.2L6.2,19H5v-1.2L18.4,4.4 M18.4,2c-0.3,0-0.5,0.1-0.7,0.3L3,17v4h4L21.7,6.3c0.4-0.4,0.4-1,0-1.4l-2.6-2.6 C18.9,2.1,18.7,2,18.4,2L18.4,2z" />
            <path d="M15.8 4.3H17.8V9.2H15.8z" transform="rotate(-45.001 16.75 6.75)" />
          </svg>
        </Button>
        <Button variant="secondary" onClick={() => onDeleteCollection(collection.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="15"
            height="15"
            viewBox="0 0 30 30"
          >
            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
