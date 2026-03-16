import { type ApiResponse } from '../types/index';

import { type AppData, getAppData, saveAppData } from './storage';

export abstract class BaseApi {
  protected async executeWithAppData<R>(
    operation: (appData: AppData) => { newAppData: AppData; result: R }
  ): Promise<ApiResponse<R>> {
    try {
      const appData = getAppData();
      const { newAppData, result } = operation(appData);
      saveAppData(newAppData);
      return { data: result, error: null };
    } catch (error) {
      return { data: null, error: `Operation failed: ${error}` };
    }
  }
}
