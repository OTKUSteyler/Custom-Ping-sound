import { storage } from "@vendetta/plugin";
import { registerSettings } from "@vendetta/settings";
import { SettingsPage } from "./settings"; // Import the SettingsPage component from settings.ts

// Default storage setup
storage.customPingSounds = storage.customPingSounds ?? {};

// Function to play custom sound
const playCustomSound = (soundUrl: string, volume: number) => {
  const audio = new Audio(soundUrl);
  audio.volume = volume;
  audio.play();
};

// Function to handle custom sound for DMs, servers, or mentions
const setCustomPingSound = (context: string, soundUrl: string, volume: number) => {
  storage.customPingSounds[context] = { soundUrl, volume };
  alert(`Custom sound set for ${context}`);
};

// Register settings page
export const onLoad = () => {
  registerSettings("custom-ping-sounds-settings", SettingsPage); // Register the settings page
};

export const onUnload = () => {};
