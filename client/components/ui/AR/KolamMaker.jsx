

import React, { useState, useMemo } from 'react';
import { useTexture, Stage, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const DotsGrid = () => {
  const dots = useMemo(() => {
    const arr = [];
    for(let x = -1; x <= 1; x+=0.5) { for(let y = -1; y <= 1; y+=0.5) { if (Math.abs(x) + Math.abs(y) <= 1.6) arr.push([x, y, 0.06]); } }
    return arr;
  }, []);
  return <group>{dots.map((pos, i) => <mesh key={i} position={pos}><sphereGeometry args={[0.03, 16, 16]} /><meshStandardMaterial color="white" /></mesh>)}</group>;
};

const MakerScene = ({ step }) => {
  const texture = useTexture('/kolam.png');

  return (
    <group position={[0, 0.5, 0]} rotation={[0.3, 0, 0]} scale={1.2}>
        <group>
          <mesh position={[0, 0, 0]}><boxGeometry args={[3, 3, 0.1]} /><meshStandardMaterial color="#1a1a1a" roughness={0.8} /></mesh>
          {step >= 1 && step < 3 && <DotsGrid />}
          {step === 2 && <group>
              <mesh position={[0,0,0.06]}><torusGeometry args={[0.8, 0.02, 16, 100]} /><meshStandardMaterial color="white" /></mesh>
              <mesh position={[0,0,0.06]} rotation={[0,0,0.78]}><torusGeometry args={[0.5, 0.02, 16, 100]} /><meshStandardMaterial color="white" /></mesh>
            </group>}
          {step === 3 && <mesh position={[0, 0, 0.06]}><planeGeometry args={[2.8, 2.8]} /><meshStandardMaterial map={texture} transparent /></mesh>}
          <mesh position={[0, 0, -0.05]}><boxGeometry args={[3.2, 3.2, 0.05]} /><meshStandardMaterial color="#333" /></mesh>
        </group>
    </group>
  );
};

const KolamMaker = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "1. Floor Prep", desc: "Entrance cleaned and sprinkled with water." },
    { label: "2. Pulli (Grid)", desc: "Rice flour dots laid for symmetry." },
    { label: "3. Neli (Lines)", desc: "Curved lines drawn around dots." },
    { label: "4. Completion", desc: "Pattern completed for prosperity." }
  ];

  return (
    <div className="flex flex-col h-full w-full bg-black">
      <div className="h-full w-full bg-gradient-to-b from-stone-800/50 to-black">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
          <Stage intensity={0.5} environment="city" adjustCamera={true}>
             <MakerScene step={step} />
          </Stage>
          <OrbitControls enableZoom={true} />
        </Canvas>
      </div>
      <div className="h-[35%] w-full bg-stone-900 border-t border-pink-900/30 p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-white font-bold text-2xl mb-2">{steps[step].label}</h3>
          <p className="text-white text-sm mb-6 max-w-md">{steps[step].desc}</p>
          <div className="flex gap-4 w-full max-w-sm">
             <button onClick={() => setStep(0)} className="px-6 py-3 rounded-xl bg-stone-700 text-white font-bold text-sm hover:bg-stone-600 border border-stone-500">Restart</button>
             <button onClick={() => step < 3 && setStep(step + 1)} disabled={step === 3} className={`flex-1 py-3 rounded-xl border border-white font-bold text-white shadow-lg ${step === 3 ? 'bg-green-500' : 'bg-pink-500 hover:bg-pink-400'}`}>{step === 3 ? "Completed" : "Next Step →"}</button>
          </div>
      </div>
    </div>
  );
};
export default KolamMaker;