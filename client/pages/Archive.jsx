import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Html, Center, Environment } from '@react-three/drei';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- IMPORTS ---
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

const ArchiveItem = ({ title, subtitle, color, children }) => {
  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl 
         hover:border-yellow-600/50 transition-all group flex flex-col h-[380px] w-full">

      {/* HEADER */}
      <div className="p-4 border-b border-stone-800 bg-stone-950/50 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-100 group-hover:text-yellow-500">{title}</h2>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
      </div>

      {/* 3D VIEW */}
      <div className="flex-1 relative bg-stone-900">
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
    </div>
  );
};

const Archive = () => {
  return (
    <div className="min-h-screen bg-stone-950 text-white pb-24">

      {/* HEADER */}
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

        <nav className="flex gap-4 text-xs text-gray-400">
          <Link to="/" className="hover:text-white">Scanner</Link>
          <Link to="/archive" className="text-yellow-500">Collection</Link>
        </nav>
      </div>

      {/* FIXED 2-COLUMN GRID */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">

        <ArchiveItem title="Channapatna Toys" subtitle="Karnataka" color="bg-red-500">
          <ChannapatnaToy />
        </ArchiveItem>

        <ArchiveItem title="Jaipur Blue Pottery" subtitle="Rajasthan" color="bg-blue-600">
          <BluePottery />
        </ArchiveItem>

        <ArchiveItem title="Warli Art" subtitle="Maharashtra" color="bg-white">
          <WarliArt />
        </ArchiveItem>

        <ArchiveItem title="Madhubani Art" subtitle="Bihar" color="bg-orange-400">
          <MadhubaniArt />
        </ArchiveItem>

        <ArchiveItem title="Kolam / Rangoli" subtitle="Tamil Nadu" color="bg-pink-500">
          <KolamArt />
        </ArchiveItem>

        {/* placeholder */}
        <div className="hidden md:flex items-center justify-center border-2 border-dashed border-stone-800 rounded-2xl h-[380px] text-stone-600 text-sm">
          More artifacts coming soon...
        </div>

      </div>
    </div>
  );
};

export default Archive;
