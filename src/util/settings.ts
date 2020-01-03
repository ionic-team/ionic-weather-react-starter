import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

class SettingsService {
  setScale(value: string): Promise<void> {
    return Storage.set({ key: 'scale', value });
  }

  async getScale(): Promise<string> {
    const data = await Storage.get({ key: 'scale' });
    return data.value || 'F';
  }
}

export const settings = new SettingsService();
