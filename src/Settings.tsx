import { storage } from "@vendetta/plugin";
import { Button, FormRow, TextInput, Slider, Select } from "@vendetta/ui/components";
import { useState, useEffect } from "react";
import { Audio } from "@vendetta/ui/native";

// Function to play custom sound
const playCustomSound = (soundUrl: string, volume: number) => {
  const audio = new Audio(soundUrl);
  audio.volume = volume;
  audio.play();
};

// Function to handle setting the custom sound for a context
const setCustomPingSound = (context: string, soundUrl: string, volume: number) => {
  storage.customPingSounds[context] = { soundUrl, volume };
  alert(`Custom sound set for ${context}`);
};

// Settings page UI component
export const SettingsPage = () => {
  const [soundUrl, setSoundUrl] = useState("");
  const [volume, setVolume] = useState(1); // Default to max volume
  const [context, setContext] = useState("DM");

  // Handle setting save
  const handleSaveSettings = () => {
    setCustomPingSound(context, soundUrl, volume);
    setSoundUrl(""); // Clear the input field
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
        <Select
          value={context}
          onChange={(e) => setContext(e.target.value)}
          options={[
            { label: "DM", value: "DM" },
            { label: "Server", value: "server" },
            { label: "Mentions", value: "mentions" }
          ]}
        />
      </FormRow>

      <Button text="Save Sound" onPress={handleSaveSettings} />
    </div>
  );
};
