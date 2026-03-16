import { BaseApi } from '@/shared/lib/baseApi.ts';
import { getAppData } from '@/shared/lib/storage.ts';
import type { ApiResponse } from '@/shared/types/index.ts';

import { type Collection } from '../types/index.ts';

class CollectionsApi extends BaseApi {
  async fetchCollections(): Promise<ApiResponse<Collection[]>> {
    try {
      const appData = getAppData();
      return { data: appData.collections, error: null };
    } catch (error) {
      return { data: null, error: `Failed to fetch collections: ${error}` };
    }
  }

  async createCollection(
    collectionData: Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Collection>> {
    return this.executeWithAppData((appData) => {
      const newCollection: Collection = {
        id: crypto.randomUUID(),
        ...collectionData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return {
        newAppData: { ...appData, collections: [...appData.collections, newCollection] },
        result: newCollection,
      };
    });
  }

  async updateCollection(
    id: string,
    collectionUpdates: Partial<Collection>
  ): Promise<ApiResponse<Collection>> {
    return this.executeWithAppData((appData) => {
      const index = appData.collections.findIndex((collection) => collection.id === id);
      if (index === -1) throw new Error('Collection not found');

      const updated = {
        ...appData.collections[index],
        ...collectionUpdates,
        updatedAt: new Date().toISOString(),
      };

      const newCollections = [...appData.collections];
      newCollections[index] = updated;

      return { newAppData: { ...appData, collections: newCollections }, result: updated };
    });
  }

  async deleteCollection(id: string): Promise<ApiResponse<string>> {
    return this.executeWithAppData((appData) => {
      const index = appData.collections.findIndex((collection) => collection.id === id);
      if (index === -1) throw new Error('Collection not found');

      const newCollections = appData.collections.filter((collection) => collection.id !== id);

      return { newAppData: { ...appData, collections: newCollections }, result: id };
    });
  }
}

export const collectionsApi = new CollectionsApi();
