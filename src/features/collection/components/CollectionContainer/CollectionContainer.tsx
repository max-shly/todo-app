import toast from 'react-hot-toast';

import { CollectionHeader, CollectionList, CollectionModal } from '..';
import { useCollectionModal, useCollections } from '../../hooks';

import styles from './CollectionContainer.module.less';

export function CollectionContainer() {
  const { collections, isLoading, addCollection, updateCollection, deleteCollection } =
    useCollections();
  const {
    isOpen: isOpenModal,
    editingCollection,
    open: openModal,
    close: closeModal,
  } = useCollectionModal();

  const handleSave = async (data: { name: string }) => {
    try {
      if (editingCollection) {
        await updateCollection({ ...editingCollection, ...data });
        toast.success('Collection updated!');
      } else {
        await addCollection(data);
        toast.success('Collection added!');
      }
      closeModal();
    } catch {
      // Ошибка уже показана глобально, модалка остаётся открытой
    }
  };

  const handleDeleteSingle = async (id: string) => {
    try {
      await deleteCollection(id);
      toast.success('Collection deleted!');
    } catch {
      // ошибка уже обработана
    }
  };

  if (isLoading) {
    return (
      <section className={styles.container}>
        <p>Loading....</p>
      </section>
    );
  }

  return (
    <>
      <section className={styles.container}>
        <CollectionHeader onAddCollection={openModal} hasCollections={collections.length > 0} />
        <div className={styles.body}>
          <div className={styles.header}>Header</div>
          <CollectionList
            collections={collections}
            onEditCollection={openModal}
            onDeleteCollection={handleDeleteSingle}
          />
        </div>
      </section>
      {isOpenModal && (
        <CollectionModal
          initialCollection={editingCollection}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </>
  );
}
