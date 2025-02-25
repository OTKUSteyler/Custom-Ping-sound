import { storage } from "@vendetta/plugin";
import { registerSettings } from "@vendetta/settings";
import { Button, FormRow, TextInput, Slider } from "@vendetta/ui/components";
import { useState, useEffect } from "react";
import { Audio } from "@vendetta/ui/native";

// Default storage setup
storage.customPingSounds = storage.customPingSounds ?? {};

// Function to play custom sound
const playCustomSound = (soundUrl: string, volume: number) => {
  const audio = new Audio(soundUrl);
  audio.volume = volume;
  audio.play();
};

// Function to handle custom sound for DMs and servers
const setCustomPingSound = (context: string, soundUrl: string, volume: number) => {
  storage.customPingSounds[context] = { soundUrl, volume };
  alert(`Custom sound set for ${context}`);
};

// Settings page UI component
const SettingsPage = () => {
  const [soundUrl, setSoundUrl] = useState("");
  const [volume, setVolume] = useState(1); // Default to max volume
  const [context, setContext] = useState("DM");

  const handleSaveSettings = () => {
    setCustomPingSound(context, soundUrl, volume);
  };

  useEffect(() => {
    // Play the saved custom sound for testing
    if (storage.customPingSounds[context]) {
      const { soundUrl, volume } = storage.customPingSounds[context];
      playCustomSound(soundUrl, volume);
    }
  }, [context]);

  return (
    <div>
      <h2>Custom Ping Sounds</h2>
      
      <FormRow label="Sound URL">
        <TextInput 
          value={soundUrl} 
          onChange={(e) => setSoundUrl(e.target.value)} 
          placeholder="Enter Sound URL"
        />
      </FormRow>
      
      <FormRow label="Volume">
        <Slider
          value={volume}
          onChange={setVolume}
          min={0}
          max={1}
          step={0.1}
        />
      </FormRow>

      <FormRow label="Select Context">
        <TextInput 
          value={context} 
          onChange={(e) => setContext(e.target.value)} 
          placeholder="Enter DM or Server Name"
        />
      </FormRow>

      <Button text="Save Sound" onPress={handleSaveSettings} />
    </div>
  );
};

// Register settings page
export const onLoad = () => {
  registerSettings("custom-ping-sounds-settings", SettingsPage);
};

export const onUnload = () => {};
