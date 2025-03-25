import { injectable } from "inversify";
import AsyncStorage from "@react-native-async-storage/async-storage";

export abstract class LocalStorageService {
  abstract getItem(key: string): Promise<string | null>;
  abstract setItem(key: string, value: string): Promise<void>;
  abstract deleteItem(key: string): Promise<void>;
}

@injectable()
export class LocalStorageServiceImpl extends LocalStorageService {
  async getItem(key: string): Promise<string | null> {
    return await AsyncStorage.getItem(key);
  }

  async setItem(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }

  async deleteItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}
