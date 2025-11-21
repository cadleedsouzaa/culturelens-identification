// import React, { useState, useMemo } from 'react';
// import * as THREE from 'three';
// import { Stage, OrbitControls } from '@react-three/drei';
// import { Canvas } from '@react-three/fiber';

// const MakerScene = ({ step }) => {
//   const paintingTexture = useMemo(() => {
//     const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 512;
//     const ctx = canvas.getContext('2d');
//     const drawFish = (fillColor, strokeOnly) => {
//       ctx.save(); ctx.translate(256, 256);
//       ctx.beginPath(); ctx.moveTo(-150, 0); 
//       ctx.bezierCurveTo(-50, -120, 50, -120, 150, 0); ctx.bezierCurveTo(50, 120, -50, 120, -150, 0);
//       if (fillColor) { ctx.fillStyle = fillColor; ctx.fill(); }
//       ctx.lineWidth = 6; ctx.strokeStyle = 'black'; ctx.stroke(); 
//       ctx.beginPath(); ctx.moveTo(-140, 0); ctx.bezierCurveTo(-45, -110, 45, -110, 140, 0); ctx.bezierCurveTo(45, 110, -45, 110, -140, 0); ctx.lineWidth = 2; ctx.stroke();
//       ctx.beginPath(); ctx.arc(100, -20, 10, 0, Math.PI*2); ctx.fillStyle='white'; ctx.fill(); ctx.stroke();
//       ctx.beginPath(); ctx.arc(100, -20, 4, 0, Math.PI*2); ctx.fillStyle='black'; ctx.fill();
//       ctx.restore();
//     };
//     const textures = [];
//     ctx.fillStyle = '#f5e6d3'; ctx.fillRect(0,0,512,512); textures.push(new THREE.CanvasTexture(canvas));
//     drawFish(null, true); textures.push(new THREE.CanvasTexture(canvas));
//     ctx.fillStyle = '#f5e6d3'; ctx.fillRect(0,0,512,512); drawFish('#ff9900', false); textures.push(new THREE.CanvasTexture(canvas));
//     textures.push(new THREE.CanvasTexture(canvas));
//     return textures;
//   }, []);

//   return (
//     <group position={[0, 1.5, 0]} scale={0.65}>
//         <mesh>
//           <planeGeometry args={[3, 3]} />
//           <meshStandardMaterial map={paintingTexture[step > 3 ? 3 : step]} roughness={1} />
//         </mesh>
//         <mesh position={[0,0,-0.02]}><boxGeometry args={[3.2,3.2,0.05]} /><meshStandardMaterial color="#4a3b2a" /></mesh>
//     </group>
//   );
// };

// const MadhubaniMaker = () => {
//   const [step, setStep] = useState(0);
//   const steps = [
//     { label: "1. Paper Prep", desc: "Handmade paper treated with cow dung wash." },
//     { label: "2. Kachni (Outline)", desc: "Double outlines drawn with bamboo twigs." },
//     { label: "3. Bharni (Filling)", desc: "Bright flat colors filled into the shapes." },
//     { label: "4. Finished Art", desc: "Detailed hatching and borders completed." }
//   ];

//   return (
//     <div className="flex flex-col h-full w-full">
//       <div className="h-[60%] w-full bg-black/20">
//         <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
//           <Stage intensity={0.5} environment="city" adjustCamera={false}>
//              <MakerScene step={step} />
//           </Stage>
//           <OrbitControls enableZoom={false} />
//         </Canvas>
//       </div>
//       <div className="h-[40%] w-full bg-stone-950 border-t border-orange-900/50 p-4 flex flex-col items-center justify-center text-center">
//           <h3 className="text-orange-400 font-bold text-xl uppercase mb-2">{steps[step].label}</h3>
//           <p className="text-gray-400 text-sm mb-4 max-w-xs">{steps[step].desc}</p>
//           <div className="flex gap-4 w-full max-w-xs">
//              <button onClick={() => setStep(0)} className="flex-1 py-3 rounded bg-stone-800 text-gray-400 text-xs font-bold hover:bg-stone-700">RESTART</button>
//              <button onClick={() => step < 3 && setStep(step + 1)} disabled={step === 3} className={`flex-[2] py-3 rounded text-xs font-bold text-black ${step === 3 ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-400'}`}>{step === 3 ? "COMPLETE" : "NEXT STEP →"}</button>
//           </div>
//       </div>
//     </div>
//   );
// };

// export default MadhubaniMaker;
import React, { useState, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { Stage, OrbitControls, useTexture, Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const MakerScene = ({ step }) => {
  // 1. LOAD YOUR REAL IMAGE
  const realTexture = useTexture('/madhubani.jpg');

  // 2. GENERATE PROCEDURAL STEPS (To match the style)
  const processTextures = useMemo(() => {
    const generated = [];
    
    const createBase = () => {
      const c = document.createElement('canvas');
      c.width = 1024; c.height = 1024;
      return c;
    };

    const drawPattern = (ctx, mode) => {
      // A. BACKGROUND (The Signature Yellow/Orange)
      ctx.fillStyle = '#ffb700'; // Mustard Yellow
      ctx.fillRect(0, 0, 1024, 1024);

      // B. THE GRID (Red Borders)
      if (mode >= 1) {
        ctx.strokeStyle = '#d9381e'; // Deep Red
        ctx.lineWidth = 50;
        
        // Outer Frame
        ctx.strokeRect(25, 25, 974, 974);
        // Center Cross
        ctx.beginPath();
        ctx.moveTo(512, 0); ctx.lineTo(512, 1024);
        ctx.moveTo(0, 512); ctx.lineTo(1024, 512);
        ctx.stroke();

        // White Dots on Border (Step 3 only)
        if (mode >= 3) {
            ctx.fillStyle = 'white';
            for(let i=50; i<1000; i+=60) {
                ctx.beginPath(); ctx.arc(i, 25, 8, 0, Math.PI*2); ctx.fill(); // Top
                ctx.beginPath(); ctx.arc(i, 999, 8, 0, Math.PI*2); ctx.fill(); // Bottom
                ctx.beginPath(); ctx.arc(25, i, 8, 0, Math.PI*2); ctx.fill(); // Left
                ctx.beginPath(); ctx.arc(999, i, 8, 0, Math.PI*2); ctx.fill(); // Right
                ctx.beginPath(); ctx.arc(i, 512, 8, 0, Math.PI*2); ctx.fill(); // Mid H
                ctx.beginPath(); ctx.arc(512, i, 8, 0, Math.PI*2); ctx.fill(); // Mid V
            }
        }
      }

      // C. THE FISH (Bottom Left Panel)
      // We focus on drawing the fish to match the animation context
      if (mode >= 1) {
        ctx.save();
        ctx.translate(256, 768); // Move to bottom-left quadrant
        ctx.scale(1.2, 1.2);
        
        // Fish Outline
        ctx.beginPath();
        ctx.moveTo(-100, -50);
        ctx.quadraticCurveTo(0, -120, 120, -20); // Top back
        ctx.quadraticCurveTo(0, 100, -100, -50); // Belly
        ctx.fillStyle = (mode >= 2) ? '#ff7f50' : '#ffb700'; // Orange Fill
        ctx.fill();
        ctx.lineWidth = 6; 
        ctx.strokeStyle = 'black'; 
        ctx.stroke();

        // Tail
        ctx.beginPath();
        ctx.moveTo(-100, -50);
        ctx.lineTo(-160, -90);
        ctx.lineTo(-160, -10);
        ctx.closePath();
        if (mode >= 2) { ctx.fillStyle = '#4682b4'; ctx.fill(); } // Blue Tail
        ctx.stroke();

        // Fins (Green)
        if (mode >= 2) {
            ctx.fillStyle = '#228b22'; // Forest Green
            ctx.beginPath(); ctx.ellipse(50, -80, 15, 30, 0.5, 0, Math.PI*2); ctx.fill(); ctx.stroke();
            ctx.beginPath(); ctx.ellipse(20, 20, 15, 30, -0.5, 0, Math.PI*2); ctx.fill(); ctx.stroke();
        }

        // Details (Scales)
        if (mode >= 3) {
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            for(let x=-60; x<80; x+=20) {
                ctx.beginPath(); ctx.moveTo(x, -60); ctx.lineTo(x, 20); ctx.stroke();
            }
        }
        ctx.restore();
      }

      // D. THE PEACOCK (Top Left - Rough shape)
      if (mode >= 2) {
          ctx.save();
          ctx.translate(256, 256);
          ctx.beginPath(); ctx.arc(0, 20, 60, 0, Math.PI*2); // Body
          ctx.fillStyle = '#4682b4'; ctx.fill(); ctx.stroke(); // Blue Bird
          ctx.restore();
      }
    };

    // --- GENERATE FRAMES ---
    
    // 0. Paper Prep (Beige)
    let { c: c0, ctx: ctx0 } = { c: createBase(), ctx: createBase().getContext('2d') };
    ctx0 = c0.getContext('2d');
    ctx0.fillStyle = '#F5E6D3'; ctx0.fillRect(0,0,1024,1024);
    generated.push(new THREE.CanvasTexture(c0));

    // 1. Outline (Kachni)
    let c1 = createBase(); let ctx1 = c1.getContext('2d');
    drawPattern(ctx1, 1);
    generated.push(new THREE.CanvasTexture(c1));

    // 2. Color Fill (Bharni)
    let c2 = createBase(); let ctx2 = c2.getContext('2d');
    drawPattern(ctx2, 2);
    generated.push(new THREE.CanvasTexture(c2));

    // 3. Details (Godna)
    let c3 = createBase(); let ctx3 = c3.getContext('2d');
    drawPattern(ctx3, 3);
    generated.push(new THREE.CanvasTexture(c3));

    return generated;
  }, []);

  // LOGIC: Show Process 0-3, then Real Image at 4
  const currentMap = step === 4 ? realTexture : processTextures[step];

  return (
    // FIX: Position and Scale
    <group position={[0, 1.5, 0]} scale={1.2}>
        <mesh>
          <planeGeometry args={[3, 3]} />
          {/* Key forces update */}
          <meshBasicMaterial key={step} map={currentMap} />
        </mesh>
        {/* Frame */}
        <mesh position={[0,0,-0.05]}>
            <boxGeometry args={[3.2,3.2,0.1]} />
            <meshStandardMaterial color="#5D4037" />
        </mesh>
    </group>
  );
};

const MadhubaniMaker = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "1. Paper Prep", desc: "Handmade paper treated with cow dung wash." },
    { label: "2. Kachni (Outline)", desc: "Double outlines drawn with bamboo twigs." },
    { label: "3. Bharni (Filling)", desc: "Bright flat colors (Red, Yellow, Blue) are filled." },
    { label: "4. Godna (Details)", desc: "Intricate hatching lines and dots added." },
    { label: "5. Masterpiece", desc: "The final 4-panel composition." }
  ];

  return (
    <div className="flex flex-col h-full w-full bg-black">
      
      <div className="h-[65%] w-full bg-gradient-to-b from-stone-800/50 to-black">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
          {/* Add Suspense for Image Loading */}
          <Suspense fallback={<Html center><div className="text-white text-xs">Loading Art...</div></Html>}>
            <Stage intensity={0.5} environment="city" adjustCamera={false}>
               <MakerScene step={step} />
            </Stage>
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      <div className="h-[35%] w-full bg-stone-900 border-t border-orange-900/30 p-6 flex flex-col items-center justify-center text-center">
          <div className="flex gap-2 mb-3">
            {steps.map((_, i) => (<div key={i} className={`h-1.5 w-8 rounded-full transition-all ${i <= step ? 'bg-orange-500' : 'bg-stone-700'}`} />))}
          </div>
          <h3 className="text-orange-400 font-bold text-2xl mb-2 font-serif">{steps[step].label}</h3>
          <p className="text-gray-300 text-sm mb-6 max-w-md">{steps[step].desc}</p>
          <div className="flex gap-4 w-full max-w-sm">
             <button onClick={() => setStep(0)} className="px-6 py-3 rounded-xl bg-stone-700 text-white font-bold text-sm hover:bg-stone-600 border border-stone-500">Restart</button>
             <button onClick={() => step < 4 && setStep(step + 1)} disabled={step === 4} className={`flex-1 py-3 rounded-xl font-bold text-black shadow-lg transition-transform active:scale-95 ${step === 4 ? 'bg-green-500 cursor-default' : 'bg-orange-500 hover:bg-orange-400'}`}>{step === 4 ? "Completed" : "Next Step →"}</button>
          </div>
      </div>
    </div>
  );
};
export default MadhubaniMaker;