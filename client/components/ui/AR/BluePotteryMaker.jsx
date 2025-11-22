import React, { useState, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stage, OrbitControls } from '@react-three/drei';

// --- 3D SCENE LOGIC (Inside Canvas) ---
const MakerScene = ({ step }) => {
  const groupRef = useRef();
  
  // 1. GENERATE TEXTURE (Painted Pattern)
  const potteryTexture = useMemo(() => {
    const canvas = document.createElement('canvas'); 
    canvas.width = 1024; 
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Background Blue
    ctx.fillStyle = '#00158f'; 
    ctx.fillRect(0, 0, 1024, 1024);

    // Helper for flowers
    const drawFlowerUnit = (cx, cy, scale) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      // Vines
      ctx.beginPath(); ctx.strokeStyle = 'white'; ctx.lineWidth = 8;
      ctx.moveTo(-60, 40); ctx.bezierCurveTo(-30, -40, 30, -40, 60, 40); ctx.stroke();
      // Leaves
      ctx.fillStyle = 'white';
      ctx.beginPath(); ctx.ellipse(-50, 0, 10, 25, -0.5, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(50, 0, 10, 25, 0.5, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(0, 50, 10, 25, 0, 0, Math.PI*2); ctx.fill();
      // Center
      ctx.beginPath(); ctx.arc(0, -10, 15, 0, Math.PI*2); ctx.fill();
      // Petals
      for(let i=0; i<5; i++) {
        const ang = (i/5)*Math.PI*2;
        ctx.beginPath(); ctx.ellipse(Math.sin(ang)*25, -10 + Math.cos(ang)*25, 8, 15, -ang, 0, Math.PI*2); ctx.fill();
      }
      ctx.restore();
    };

    // Draw Grid
    const rows = 5; const cols = 8;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c / cols) * 1024 + (r % 2 === 0 ? 0 : 60);
        const y = 200 + (r / rows) * 650; 
        drawFlowerUnit(x, y, 1.2);
      }
    }
    
    // Draw Neck/Rim
    ctx.fillStyle = 'white';
    for (let i = 0; i < 20; i++) { ctx.beginPath(); ctx.ellipse((i/20)*1024, 950, 15, 60, 0, 0, Math.PI*2); ctx.fill(); }
    ctx.strokeStyle = 'white'; ctx.lineWidth = 10;
    ctx.beginPath(); ctx.moveTo(0, 880); ctx.lineTo(1024, 880); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 1000); ctx.lineTo(1024, 1000); ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping; 
    tex.wrapT = THREE.RepeatWrapping;
    tex.center.set(0.5, 0.5); 
    tex.rotation = Math.PI; 
    tex.flipY = false;
    return tex;
  }, []);

  // 2. DEFINE SHAPE
  const vaseProfile = useMemo(() => {
    const p = [];
    p.push(new THREE.Vector2(0, 0)); p.push(new THREE.Vector2(1.4, 0)); p.push(new THREE.Vector2(1.3, 0.5));
    p.push(new THREE.Vector2(2.2, 1.2)); p.push(new THREE.Vector2(2.7, 2.2)); p.push(new THREE.Vector2(2.2, 3.2));
    p.push(new THREE.Vector2(1.4, 3.8)); p.push(new THREE.Vector2(1.8, 4.8)); p.push(new THREE.Vector2(1.6, 4.8));
    p.push(new THREE.Vector2(1.2, 3.8)); p.push(new THREE.Vector2(2.5, 2.2)); p.push(new THREE.Vector2(0, 0.2));
    return p;
  }, []);

  // 3. ANIMATION (Spin logic)
  useFrame((state, delta) => {
    if (groupRef.current) {
      const speed = step < 3 ? 2 : 0.5; // Fast during process, Slow at end
      groupRef.current.rotation.y += delta * speed;
    }
  });

  return (
    // FIXED POSITION (Centered nicely)
    <group position={[0, -1, 0]} scale={1.2}>
        <group ref={groupRef}>
          
          {/* STAGE 0: RAW DOUGH */}
          {step === 0 && (
             <mesh position={[0, 2, 0]}>
               <cylinderGeometry args={[1.5, 1.8, 2.5, 32]} />
               <meshStandardMaterial color="#e0e0e0" roughness={1} />
             </mesh>
          )}

          {/* STAGE 1: MOLDED (Matte White) */}
          {step === 1 && (
             <mesh>
               <latheGeometry args={[vaseProfile, 64]} />
               <meshStandardMaterial color="#f0f0f0" roughness={0.8} />
             </mesh>
          )}

          {/* STAGE 2: PAINTED (Matte Blue - No Shine) */}
          {step === 2 && (
             <mesh>
               <latheGeometry args={[vaseProfile, 64]} />
               <meshStandardMaterial 
                 map={potteryTexture} 
                 roughness={1} 
                 metalness={0}
               />
             </mesh>
          )}

          {/* STAGE 3: FIRED (High Gloss) */}
          {step === 3 && (
             <mesh>
               <latheGeometry args={[vaseProfile, 128]} />
               <meshStandardMaterial 
                 map={potteryTexture} 
                 roughness={0.05} 
                 metalness={0.1}
                 envMapIntensity={1.5}
               />
             </mesh>
          )}

        </group>
    </group>
  );
};

// --- MAIN COMPONENT (Split Layout) ---
const BluePotteryMaker = () => {
  const [step, setStep] = useState(0);
  
  const steps = [
    { label: "1. The Dough", desc: "Unlike clay, this is a mix of Quartz powder, Glass powder, and Multani Mitti." },
    { label: "2. Casting / Molding", desc: "The dough is flattened and pressed into molds to create the shape." },
    { label: "3. Oxide Painting", desc: "Cobalt Oxide (Blue) and Copper Oxide (Green) are painted by hand." },
    { label: "4. Glazing & Firing", desc: "A glass glaze is applied. Heating at 800°C turns it shiny." }
  ];

  return (
    <div className="flex flex-col h-full w-full bg-stone-950">
      
      {/* TOP: 3D (70%) */}
      <div className="h-full w-full bg-gradient-to-b from-stone-800/50 to-black">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
          <Stage intensity={0.6} environment="city" adjustCamera={true}>
             <MakerScene step={step} />
          </Stage>
          <OrbitControls enableZoom={true} />
        </Canvas>
      </div>

      {/* BOTTOM: UI (30%) - Blue Theme */}
      <div className="h-[30%] w-full bg-stone-900 border-t border-blue-900/30 p-6 flex flex-col items-center justify-center text-center relative z-10">
          
          {/* Progress Bar */}
          <div className="flex gap-2 mb-3">
            {steps.map((_, i) => (
                <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${i <= step ? 'bg-blue-500' : 'bg-stone-700'}`} />
            ))}
          </div>

          <h3 className="text-white/80 font-bold text-2xl mb-1 font-serif">{steps[step].label}</h3>
          <p className="text-white/80 text-sm mb-4 max-w-md">{steps[step].desc}</p>
          
          <div className="flex gap-4 w-full max-w-sm">
             <button 
               onClick={() => setStep(0)} 
               className="px-6 py-3 rounded-xl bg-stone-700 text-white font-bold text-sm hover:bg-stone-600 border border-stone-500"
             >
               Restart
             </button>
             <button 
               onClick={() => step < 3 && setStep(step + 1)} 
               disabled={step === 3} 
               className={`flex-1 py-3 rounded-xl font-bold border border-white text-white/80 shadow-lg transition-transform active:scale-95 
                 ${step === 3 ? 'bg-green-500 cursor-default' : 'bg-blue-500 hover:bg-blue-400'}`}
             >
               {step === 3 ? "Process Complete" : "Next Step →"}
             </button>
          </div>
      </div>
    </div>
  );
};

export default BluePotteryMaker;