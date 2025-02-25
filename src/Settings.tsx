import { storage } from "@vendetta/plugin";
import { Button, FormRow, TextInput, Slider, Select, FileInput } from "@vendetta/ui/components";
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
  const [file, setFile] = useState<File | null>(null);

  // Handle the file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  // Handle the sound URL change
  const handleSoundUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSoundUrl(e.target.value);
  };

  // Handle setting save
  const handleSaveSettings = () => {
    if (file) {
      // Handle the file upload case (convert to a URL or save the file to the plugin)
      const fileUrl = URL.createObjectURL(file);
      setCustomPingSound(context, fileUrl, volume);
      setFile(null); // Clear the file input
    } else if (soundUrl) {
      // Handle the URL case
      setCustomPingSound(context, soundUrl, volume);
    } else {
      alert("Please provide a valid sound URL or upload a sound file.");
    }

    setSoundUrl(""); // Clear the input fields
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
          onChange={handleSoundUrlChange} 
          placeholder="Enter Sound URL"
        />
      </FormRow>

      <FormRow label="Upload Sound File">
        <FileInput 
          accept="audio/*" 
          onChange={handleFileChange} 
          placeholder="Choose a sound file"
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
