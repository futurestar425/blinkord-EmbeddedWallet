import { create } from 'zustand';

interface UserState {
  token: string | null;
  userData: any;
  discordConnected: boolean;
  discordDisconnected: boolean;
  discordClientId: number;
  selectedGuildName: string | null;
  selectedGuildImage: string | null;
  setToken: (token: string) => void;
  setUserData: (userData: any) => void;
  setDiscordConnected: (connected: boolean) => void;
  setDiscordDisconnected: (disconnected: boolean) => void;
  setSelectedGuild: (name: string | null, image: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  token: null,
  userData: null,
  discordConnected: false,
  discordDisconnected: false,
  discordClientId: 1277276051592052787,
  selectedGuildName: null,
  selectedGuildImage: null,
  setToken: (token) => set({ token }),
  setUserData: (userData) => set({ userData }),
  setDiscordConnected: (connected) => set({ discordConnected: connected }),
  setDiscordDisconnected: (disconnected) => set({ discordDisconnected: disconnected }),
  setSelectedGuild: (name, image) => set({ selectedGuildName: name, selectedGuildImage: image }),
}));
