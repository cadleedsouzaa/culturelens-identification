// whisperService.ts

// TODO: Replace with process.env.VITE_OPENAI_API_KEY in production
const DEEPGRAM_API_KEY = "c2eae0ac952d857fb7e2b192e6460044968df2d2"; 

export const transcribeAudio = async (audioBlob: Blob): Promise<string | null> => {
  // 1. Security Check
  if (!DEEPGRAM_API_KEY) {
    console.error("Missing Deepgram API Key");
    return null;
  }

  if (audioBlob.size === 0) {
    console.error("Audio Blob is empty");
    return null;
  }

  try {
    // 2. Send Request to Deepgram
    // We use the 'nova-2' model (it is their fastest and most accurate model)
    const response = await fetch("https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true", {
      method: "POST",
      headers: {
        Authorization: `Token ${DEEPGRAM_API_KEY}`,
        // Deepgram needs the exact content type of the blob (e.g. "audio/webm")
        "Content-Type": audioBlob.type, 
      },
      body: audioBlob, // Send the raw blob directly
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Deepgram API Error:", errorData);
      throw new Error("Deepgram API Failed");
    }

    const data = await response.json();

    // 3. Parse Deepgram Response
    // Structure: results -> channels[0] -> alternatives[0] -> transcript
    const transcript = data.results?.channels[0]?.alternatives[0]?.transcript;
    
    return transcript || "";

  } catch (error) {
    console.error("Transcription Error:", error);
    return null;
  }
};