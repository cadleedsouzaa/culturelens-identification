import React, { useState, useEffect } from 'react';
import { Mic, Square, Send } from 'lucide-react';

// 1. Define what data this component accepts
interface RecorderProps {
  artId?: string; // Optional: defaults to 'general' if not provided
}

const OralHistoryRecorder = ({ artId = "general" }: RecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  // @ts-ignore
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Setup Browser Native Speech Recognition (Safe for Exam)
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true; 
      recognitionInstance.interimResults = true; 
      recognitionInstance.lang = 'en-US'; 

      recognitionInstance.onresult = (event: any) => {
        let finalTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          finalTranscript += event.results[i][0].transcript;
        }
        setTranscript(finalTranscript);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error("Browser Speech Error:", event.error);
      };

      setRecognition(recognitionInstance);
    } else {
      alert("Browser not supported. Please use Google Chrome.");
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      setTranscript("");
      recognition.start();
      setIsRecording(true);
    }
  };

  // --- SUBMIT TO LOCAL STORAGE ---
  const handleSubmit = () => {
    if (!transcript) {
      alert("No text to save!");
      return;
    }

    // Create the story object WITH the artId
    const newStory = {
      id: Date.now(),
      artId: artId, // <--- Important: Tying story to the specific art
      text: transcript,
      date: new Date().toLocaleDateString(),
      title: `Oral History` 
    };

    try {
      const existingData = localStorage.getItem("oral_histories");
      const stories = existingData ? JSON.parse(existingData) : [];
      const updatedStories = [newStory, ...stories];
      
      localStorage.setItem("oral_histories", JSON.stringify(updatedStories));
      
      alert(`Success! Story attached to ${artId} in the Archive.`);
      setTranscript(""); 
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save story.");
    }
  };

  return (
    <div className="w-full bg-stone-800/50 border border-stone-700 rounded-xl p-4 mt-6">
       <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
        {isRecording && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
        Record Story for: <span className="text-yellow-500 capitalize">{artId}</span>
      </h3>

      <div className="flex flex-col gap-3">
        <textarea
          className="w-full bg-stone-900 border border-stone-700 rounded-lg p-3 text-sm text-gray-200 min-h-[100px] focus:outline-none focus:border-yellow-500"
          value={transcript}
          readOnly
          placeholder={isRecording ? "Listening..." : "Click Start to record..."}
        />

        <div className="flex items-center gap-2">
          <button
            onClick={toggleRecording}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-all ${
              isRecording ? "bg-red-500 text-white hover:bg-red-600" : "bg-yellow-500 text-black hover:bg-yellow-400"
            }`}
          >
            {isRecording ? <><Square size={14} /> Stop</> : <><Mic size={14} /> Start Recording</>}
          </button>
          
          {transcript && (
             <button 
                onClick={handleSubmit}
                className="text-green-400 text-xs font-bold flex items-center gap-1 hover:underline ml-auto"
             >
               <Send size={12} /> Submit to Archive
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OralHistoryRecorder;