import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Html, Center, Environment } from '@react-three/drei';
import { ArrowLeft, Trash2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- IMPORTS (Ensure these paths match your folder structure) ---
import ChannapatnaToy from '../components/ui/AR/ChannapatnaToy';
import WarliArt from '../components/ui/AR/WarliArt';
import KolamArt from '../components/ui/AR/KolamArt';
import BluePottery from '../components/ui/AR/BluePottery';
import MadhubaniArt from '../components/ui/AR/MadhubaniArt';

const Loader = () => (
  <Html center>
    <div className="text-yellow-500 text-xs font-bold animate-pulse">Loading...</div>
  </Html>
);

// --- INDIVIDUAL ARCHIVE CARD COMPONENT ---
const ArchiveItem = ({ title, subtitle, color, artId, allStories, children }) => {
  
  // Filter logic: Find stories belonging to this specific art piece
  const relatedStories = allStories.filter(story => story.artId === artId);

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl 
          hover:border-yellow-600/50 transition-all group flex flex-col h-[550px] w-full">

      {/* HEADER */}
      <div className="p-4 border-b border-stone-800 bg-stone-950/50 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-100 group-hover:text-yellow-500">{title}</h2>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
      </div>

      {/* 3D VIEW (Top Half) */}
      <div className="h-[50%] relative bg-stone-900 border-b border-stone-800">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 40 }}>
          <Suspense fallback={<Loader />}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Environment preset="city" />

            <Stage intensity={0.5} environment="city" adjustCamera={false}>
              <Center>{children}</Center>
            </Stage>
          </Suspense>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
        </Canvas>
        <div className="absolute bottom-2 right-2 text-[10px] text-white/40">3D Interactive</div>
      </div>

      {/* STORIES LIST (Bottom Half) */}
      <div className="flex-1 bg-stone-950 p-4 overflow-y-auto">
        <h4 className="text-[10px] uppercase tracking-widest text-stone-500 mb-3 font-bold flex items-center gap-2">
          <FileText size={12} /> Oral Histories ({relatedStories.length})
        </h4>
        
        {relatedStories.length === 0 ? (
          <div className="text-center mt-8 text-stone-700 text-xs italic">
            No stories recorded yet.
          </div>
        ) : (
          <div className="space-y-3">
            {relatedStories.map((story) => (
              <div key={story.id} className="bg-stone-900 p-3 rounded-lg border border-stone-800 text-xs text-gray-300 hover:border-yellow-500/30 transition-colors">
                <p className="leading-relaxed">"{story.text}"</p>
                <span className="text-[10px] text-yellow-600 mt-2 block font-mono">{story.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
const Archive = () => {
  const [stories, setStories] = useState([]);

  // Load from LocalStorage on page load
  useEffect(() => {
    const saved = localStorage.getItem("oral_histories");
    if (saved) {
      setStories(JSON.parse(saved));
    }
  }, []);

  const clearHistory = () => {
    if(window.confirm("Delete ALL oral histories?")) {
      localStorage.removeItem("oral_histories");
      setStories([]);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white pb-24">

      {/* PAGE HEADER */}
      <div className="sticky top-0 bg-stone-950/90 backdrop-blur-md p-4 border-b border-stone-800 z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 bg-stone-900 rounded-full hover:bg-stone-800 transition">
            <ArrowLeft size={20} className="text-gray-400" />
          </Link>
          <div>
            <h1 className="text-xl font-serif text-yellow-500">The Archive</h1>
            <p className="text-xs text-gray-500">Digitized Heritage Collection</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
           {stories.length > 0 && (
              <button onClick={clearHistory} className="text-red-500 hover:text-red-400 text-xs flex items-center gap-1">
                <Trash2 size={14} /> Clear All Oral Histories
              </button>
            )}
        </div>
      </div>

      {/* GRID LAYOUT */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">

        {/* 1. CHANNAPATNA */}
        <ArchiveItem 
          title="Channapatna Toys" 
          subtitle="Karnataka" 
          color="bg-red-500" 
          artId="channapatna" 
          allStories={stories}
        >
          <div className="h-[85vh] w-full">
            <ChannapatnaMaker />
          </div>
        </ArchiveItem>

        {/* 2. BLUE POTTERY */}
        <ArchiveItem 
          title="Jaipur Blue Pottery" 
          subtitle="Rajasthan" 
          color="bg-blue-600" 
          artId="blue-pottery" 
          allStories={stories}
        >
          <BluePottery />
        </ArchiveItem>

        {/* 3. WARLI */}
        <ArchiveItem 
          title="Warli Art" 
          subtitle="Maharashtra" 
          color="bg-white" 
          artId="warli" 
          allStories={stories}
        >
          <WarliArt />
        </ArchiveItem>

        {/* 4. MADHUBANI */}
        <ArchiveItem 
          title="Madhubani Art" 
          subtitle="Bihar" 
          color="bg-orange-400" 
          artId="madhubani" 
          allStories={stories}
        >
          <MadhubaniArt />
        </ArchiveItem>

        {/* 5. KOLAM */}
        <ArchiveItem 
          title="Kolam / Rangoli" 
          subtitle="Tamil Nadu" 
          color="bg-pink-500" 
          artId="kolam" 
          allStories={stories}
        >
          <KolamArt />
        </ArchiveItem>

      </div>
    </div>
  );
};

export default Archive;