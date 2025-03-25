import { injectable } from "inversify";
import * as SecureStore from "expo-secure-store";

export abstract class SecureStorageService {
  abstract getItem(key: string): Promise<string | null>;
  abstract setItem(key: string, value: string): Promise<void>;
  abstract deleteItem(key: string): Promise<void>;
}

@injectable()
export class SecureStorageServiceImpl extends SecureStorageService {
  async getItem(key: string): Promise<string | null> {
    return await SecureStore.getItemAsync(key);
  }

  async setItem(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  }

  async deleteItem(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }
}
