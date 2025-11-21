
import React, { useState, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls, useTexture, Html } from '@react-three/drei';
import { DoubleSide } from 'three';

// --- HELPER 1: STICK FIGURE ---
const WarliSketch = ({ position, rotation, scale = 0.5 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    {/* Head */}
    <mesh position={[0, 0.6, 0]}>
      <circleGeometry args={[0.15, 32]} />
      <meshBasicMaterial color="white" side={DoubleSide} />
    </mesh>
    {/* Body (Two Triangles) */}
    <mesh position={[0, 0.25, 0]}>
      <coneGeometry args={[0.25, 0.5, 3]} /> 
      <meshBasicMaterial color="white" />
    </mesh>
    <mesh position={[0, -0.25, 0]} rotation={[0, 0, 3.14]}>
      <coneGeometry args={[0.25, 0.5, 3]} /> 
      <meshBasicMaterial color="white" />
    </mesh>
    {/* Limbs */}
    <mesh position={[0.3, 0.3, 0]} rotation={[0, 0, -0.5]}>
       <planeGeometry args={[0.05, 0.4]} />
       <meshBasicMaterial color="white" side={DoubleSide} />
    </mesh>
    <mesh position={[-0.3, 0.3, 0]} rotation={[0, 0, 0.5]}>
       <planeGeometry args={[0.05, 0.4]} />
       <meshBasicMaterial color="white" side={DoubleSide} />
    </mesh>
  </group>
);

// --- HELPER 2: THE TARPA DANCE CIRCLE ---
const TarpaCircle = () => {
  const dancers = useMemo(() => {
    return new Array(8).fill(0).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 0.6;
      // Calculate position in circle
      return { 
        pos: [Math.cos(angle) * radius, Math.sin(angle) * radius, 0], 
        rot: [0, 0, angle + 1.57] // Rotate to face center
      };
    });
  }, []);

  return (
    <group>
       {dancers.map((d, i) => (
         <WarliSketch key={i} position={d.pos} rotation={d.rot} scale={0.35} />
       ))}
       {/* The Musician in Center */}
       <WarliSketch position={[0,0,0]} rotation={[0,0,0]} scale={0.45} />
    </group>
  );
};

// --- 3D SCENE LOGIC (Inside Canvas) ---
const MakerScene = ({ step, wallColor }) => {
  // Load texture safely
  const texture = useTexture('/warli.jpg'); 

  return (
    // FIX: Position pushed UP, Scale 1.3
    <group position={[0, 1.5, 0]} scale={1.3}>
        <group rotation={[0, -0.2, 0]}>
            
            {/* 1. THE WALL BASE */}
            <mesh>
                <boxGeometry args={[3, 2.2, 0.1]} />
                <meshStandardMaterial color={wallColor} roughness={0.9} />
            </mesh>
            
            {/* 2. STAGE 3: BORDER (White Lines) */}
            {step >= 2 && step < 5 && (
             <group position={[0, 0, 0.06]}>
                <mesh position={[0, 0.9, 0]}> <planeGeometry args={[2.6, 0.05]} /> <meshBasicMaterial color="white" /> </mesh>
                <mesh position={[0, -0.9, 0]}> <planeGeometry args={[2.6, 0.05]} /> <meshBasicMaterial color="white" /> </mesh>
                <mesh position={[-1.3, 0, 0]}> <planeGeometry args={[0.05, 1.8]} /> <meshBasicMaterial color="white" /> </mesh>
                <mesh position={[1.3, 0, 0]}> <planeGeometry args={[0.05, 1.8]} /> <meshBasicMaterial color="white" /> </mesh>
             </group>
            )}

            {/* 3. STAGE 4: SCATTERED FIGURES */}
            {step === 3 && (
             <group position={[0, 0, 0.07]}>
                <WarliSketch position={[-0.8, 0.5, 0]} rotation={[0,0,0.1]} />
                <WarliSketch position={[0.8, 0.5, 0]} rotation={[0,0,-0.1]} />
                <WarliSketch position={[-0.8, -0.5, 0]} rotation={[0,0,-0.1]} />
                <WarliSketch position={[0.8, -0.5, 0]} rotation={[0,0,0.1]} />
             </group>
            )}

            {/* 4. STAGE 5: TARPA DANCE (The Fix!) */}
            {step === 4 && (
                // Z=0.07 ensures it sits ON TOP of the wall (0.05)
                <group position={[0, 0, 0.07]}>
                   <TarpaCircle />
                </group>
            )}

            {/* 5. STAGE 6: FINAL ART TEXTURE */}
            {step === 5 && (
                <mesh position={[0, 0, 0.06]}>
                    <planeGeometry args={[2.8, 2]} />
                    <meshStandardMaterial map={texture} transparent={true} roughness={0.8} />
                </mesh>
            )}
            
            {/* FRAME */}
            <mesh position={[0, 0, -0.01]}>
                <boxGeometry args={[3.2, 2.4, 0.08]} />
                <meshStandardMaterial color="#3e2723" roughness={0.6} />
            </mesh>
        </group>
    </group>
  );
};

// --- MAIN COMPONENT (UI + Logic) ---
const WarliMaker = () => {
  const [step, setStep] = useState(0);
  
  const steps = [
    { label: "1. The Mud Wall", desc: "Village huts are built using a mixture of earth, cow dung, and branches." },
    { label: "2. The Geru Wash", desc: "The wall is plastered with red ochre (Geru) to create the canvas." },
    { label: "3. The Border", desc: "A geometric border is painted first to define the sacred space." },
    { label: "4. Basic Figures", desc: "Simple Triangles and Circles are drawn to represent humans." },
    { label: "5. The Tarpa Dance", desc: "Dancers link hands in a spiral, representing the circle of life." },
    { label: "6. The Masterpiece", desc: "Nature details are added to complete the story." }
  ];

  // Step 0 is Brown, Steps 1-5 are Red
  const wallColor = step === 0 ? "#5D4037" : "#8B3A3A";

  return (
    <div className="flex flex-col h-full w-full bg-black">
      
      {/* TOP: 3D CANVAS */}
      <div className="h-[65%] w-full bg-gradient-to-b from-stone-800/50 to-black">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
          
          {/* Add Suspense to prevent crash on texture load */}
          <Suspense fallback={<Html center><div className="text-white text-xs">Loading...</div></Html>}>
            <Stage intensity={0.5} environment="city" adjustCamera={true}>
               <MakerScene step={step} wallColor={wallColor} />
            </Stage>
          </Suspense>

          <OrbitControls enableZoom={true} />
        </Canvas>
      </div>

      {/* BOTTOM: UI PANEL */}
      <div className="h-[35%] w-full bg-stone-900 border-t border-stone-700 p-6 flex flex-col items-center justify-center text-center">
          
          {/* Progress Dots */}
          <div className="flex gap-2 mb-3">
            {steps.map((_, i) => (
                <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${i <= step ? 'bg-yellow-500' : 'bg-stone-700'}`} />
            ))}
          </div>

          <h3 className="text-white font-bold text-2xl mb-2 font-serif">{steps[step].label}</h3>
          <p className="text-white text-sm mb-6 max-w-md">{steps[step].desc}</p>
          
          <div className="flex gap-4 w-full max-w-sm">
             <button 
               onClick={() => setStep(0)} 
               className="px-6 py-3 rounded-xl bg-stone-700 text-white font-bold text-sm hover:bg-stone-600 border border-stone-500"
             >
               Restart
             </button>
             
             {/* Logic: Disable "Next" if we are at the last step (index 5) */}
             <button 
               onClick={() => step < 5 && setStep(step + 1)} 
               disabled={step === 5} 
               className={`flex-1 py-3 rounded-xl border border-white font-bold text-white shadow-lg transition-transform active:scale-95 
                 ${step === 5 ? 'bg-green-500 cursor-default' : 'bg-yellow-500 hover:bg-yellow-400'}`}
             >
               {step === 5 ? "Completed" : "Next Step →"}
             </button>
          </div>
      </div>
    </div>
  );
};

export default WarliMaker;