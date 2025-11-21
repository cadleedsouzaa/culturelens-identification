
// // import React, { useState, useMemo, useRef } from 'react';
// // import * as THREE from 'three';
// // import { Canvas, useFrame } from '@react-three/fiber';
// // import { Stage, OrbitControls } from '@react-three/drei';

// // const MakerScene = ({ step }) => {
// //   const groupRef = useRef();
  
// //   const potteryTexture = useMemo(() => {
// //     const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 512;
// //     const ctx = canvas.getContext('2d'); ctx.fillStyle = '#00158f'; ctx.fillRect(0,0,512,512);
// //     ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(256, 200, 40, 0, Math.PI*2); ctx.fill();
// //     for(let i=0; i<10; i++) { ctx.beginPath(); ctx.ellipse((i/10)*512, 480, 10, 40, 0, 0, Math.PI*2); ctx.fill(); }
// //     const tex = new THREE.CanvasTexture(canvas); tex.center.set(0.5, 0.5); tex.rotation = Math.PI; tex.flipY = false; return tex;
// //   }, []);

// //   const vaseProfile = useMemo(() => {
// //     const p = []; p.push(new THREE.Vector2(0,0)); p.push(new THREE.Vector2(1.4,0)); 
// //     p.push(new THREE.Vector2(2.6,2.0)); p.push(new THREE.Vector2(1.4,3.8)); 
// //     p.push(new THREE.Vector2(1.8,4.8)); p.push(new THREE.Vector2(1.6,4.8)); 
// //     p.push(new THREE.Vector2(1.2,3.8)); p.push(new THREE.Vector2(2.4,2.0)); p.push(new THREE.Vector2(0,0.2));
// //     return p;
// //   }, []);

// //   useFrame((state, delta) => {
// //     if (groupRef.current) groupRef.current.rotation.y += delta * (step < 3 ? 2 : 0.5);
// //   });

// //   return (
// //     <group position={[0, 2.0, 0]} scale={0.6}>
// //         <group ref={groupRef}>
// //           {step === 0 && <mesh position={[0, 2, 0]}><cylinderGeometry args={[1.5, 1.8, 2.5, 32]} /><meshStandardMaterial color="#e0e0e0" roughness={1} /></mesh>}
// //           {step === 1 && <mesh><latheGeometry args={[vaseProfile, 64]} /><meshStandardMaterial color="#f0f0f0" roughness={0.8} /></mesh>}
// //           {step === 2 && <mesh><latheGeometry args={[vaseProfile, 64]} /><meshStandardMaterial map={potteryTexture} roughness={1} metalness={0} /></mesh>}
// //           {step === 3 && <mesh><latheGeometry args={[vaseProfile, 128]} /><meshStandardMaterial map={potteryTexture} roughness={0.05} metalness={0.1} envMapIntensity={1.5} /></mesh>}
// //         </group>
// //     </group>
// //   );
// // };

// // const BluePotteryMaker = () => {
// //   const [step, setStep] = useState(0);
// //   const steps = [
// //     { label: "1. Quartz Dough", desc: "Mix of Quartz, Glass powder & Gum." },
// //     { label: "2. Molding", desc: "Pressed into molds to create shape." },
// //     { label: "3. Painting", desc: "Painted with Cobalt Oxide (Blue)." },
// //     { label: "4. Firing", desc: "Heated to 800°C for glass finish." }
// //   ];

// //   return (
// //     <div className="flex flex-col h-full w-full">
// //       <div className="h-[60%] w-full bg-black/20">
// //         <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 40 }}>
// //           <Stage intensity={0.5} environment="city" adjustCamera={false}>
// //              <MakerScene step={step} />
// //           </Stage>
// //           <OrbitControls enableZoom={false} />
// //         </Canvas>
// //       </div>
// //       <div className="h-[40%] w-full bg-stone-950 border-t border-blue-900/50 p-4 flex flex-col items-center justify-center text-center">
// //           <h3 className="text-blue-400 font-bold text-xl uppercase mb-2">{steps[step].label}</h3>
// //           <p className="text-gray-400 text-sm mb-4 max-w-xs">{steps[step].desc}</p>
// //           <div className="flex gap-4 w-full max-w-xs">
// //              <button onClick={() => setStep(0)} className="flex-1 py-3 rounded bg-stone-800 text-gray-400 text-xs font-bold hover:bg-stone-700">RESTART</button>
// //              <button onClick={() => step < 3 && setStep(step + 1)} disabled={step === 3} className={`flex-[2] py-3 rounded text-xs font-bold text-black ${step === 3 ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-400'}`}>{step === 3 ? "COMPLETE" : "NEXT STEP →"}</button>
// //           </div>
// //       </div>
// //     </div>
// //   );
// // };
// // export default BluePotteryMaker;

// import React, { useState, useMemo, useRef } from 'react';
// import * as THREE from 'three';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Stage, OrbitControls } from '@react-three/drei';

// const MakerScene = ({ step }) => {
//   const groupRef = useRef();
  
//   const potteryTexture = useMemo(() => {
//     const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 512;
//     const ctx = canvas.getContext('2d'); ctx.fillStyle = '#00158f'; ctx.fillRect(0,0,512,512);
//     ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(256, 200, 40, 0, Math.PI*2); ctx.fill();
//     for(let i=0; i<10; i++) { ctx.beginPath(); ctx.ellipse((i/10)*512, 480, 10, 40, 0, 0, Math.PI*2); ctx.fill(); }
//     const tex = new THREE.CanvasTexture(canvas); tex.center.set(0.5, 0.5); tex.rotation = Math.PI; tex.flipY = false; return tex;
//   }, []);

//   const vaseProfile = useMemo(() => {
//     const p = []; p.push(new THREE.Vector2(0,0)); p.push(new THREE.Vector2(1.4,0)); 
//     p.push(new THREE.Vector2(2.6,2.0)); p.push(new THREE.Vector2(1.4,3.8)); 
//     p.push(new THREE.Vector2(1.8,4.8)); p.push(new THREE.Vector2(1.6,4.8)); 
//     p.push(new THREE.Vector2(1.2,3.8)); p.push(new THREE.Vector2(2.4,2.0)); p.push(new THREE.Vector2(0,0.2));
//     return p;
//   }, []);

//   useFrame((state, delta) => {
//     if (groupRef.current) groupRef.current.rotation.y += delta * (step < 3 ? 2 : 0.5);
//   });

//   return (
//     // FIX: Scale 0.9, Center Position
//     <group position={[0, 2.5, 0]} scale={0.9}>
//         <group ref={groupRef}>
//           {step === 0 && <mesh position={[0, 2, 0]}><cylinderGeometry args={[1.5, 1.8, 2.5, 32]} /><meshStandardMaterial color="#e0e0e0" roughness={1} /></mesh>}
//           {step === 1 && <mesh><latheGeometry args={[vaseProfile, 64]} /><meshStandardMaterial color="#f0f0f0" roughness={0.8} /></mesh>}
//           {step === 2 && <mesh><latheGeometry args={[vaseProfile, 64]} /><meshStandardMaterial map={potteryTexture} roughness={1} metalness={0} /></mesh>}
//           {step === 3 && <mesh><latheGeometry args={[vaseProfile, 128]} /><meshStandardMaterial map={potteryTexture} roughness={0.05} metalness={0.1} envMapIntensity={1.5} /></mesh>}
//         </group>
//     </group>
//   );
// };

// const BluePotteryMaker = () => {
//   const [step, setStep] = useState(0);
//   const steps = [
//     { label: "1. Quartz Dough", desc: "Mix of Quartz, Glass powder & Gum." },
//     { label: "2. Molding", desc: "Pressed into molds to create shape." },
//     { label: "3. Painting", desc: "Painted with Cobalt Oxide (Blue)." },
//     { label: "4. Firing", desc: "Heated to 800°C for glass finish." }
//   ];

//   return (
//     <div className="flex flex-col h-full w-full bg-black">
//       <div className="h-[65%] w-full bg-gradient-to-b from-stone-800/50 to-black">
//         <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
//           <Stage intensity={0.5} environment="city" adjustCamera={false}>
//              <MakerScene step={step} />
//           </Stage>
//           <OrbitControls enableZoom={false} />
//         </Canvas>
//       </div>
//       <div className="h-[35%] w-full bg-stone-900 border-t border-blue-900/30 p-6 flex flex-col items-center justify-center text-center">
//           <div className="flex gap-2 mb-3">{steps.map((_, i) => (<div key={i} className={`h-1.5 w-8 rounded-full transition-all ${i <= step ? 'bg-blue-500' : 'bg-stone-700'}`} />))}</div>
//           <h3 className="text-blue-400 font-bold text-2xl mb-1 font-serif">{steps[step].label}</h3>
//           <p className="text-gray-400 text-sm mb-6 max-w-md">{steps[step].desc}</p>
//           <div className="flex gap-4 w-full max-w-sm">
//              <button onClick={() => setStep(0)} className="px-6 py-3 rounded-xl bg-stone-800 text-white font-bold text-sm hover:bg-stone-700 border border-stone-600">Restart</button>
//              <button onClick={() => step < 3 && setStep(step + 1)} disabled={step === 3} className={`flex-1 py-3 rounded-xl text-sm font-bold text-black ${step === 3 ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-400'}`}>{step === 3 ? "Completed" : "Next Step →"}</button>
//           </div>
//       </div>
//     </div>
//   );
// };
// export default BluePotteryMaker;

import React, { useState, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stage, OrbitControls } from '@react-three/drei';

const MakerScene = ({ step }) => {
  const groupRef = useRef();
  
  const potteryTexture = useMemo(() => {
    const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d'); ctx.fillStyle = '#00158f'; ctx.fillRect(0,0,512,512);
    ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(256, 200, 40, 0, Math.PI*2); ctx.fill();
    for(let i=0; i<10; i++) { ctx.beginPath(); ctx.ellipse((i/10)*512, 480, 10, 40, 0, 0, Math.PI*2); ctx.fill(); }
    const tex = new THREE.CanvasTexture(canvas); tex.center.set(0.5, 0.5); tex.rotation = Math.PI; tex.flipY = false; return tex;
  }, []);

  const vaseProfile = useMemo(() => {
    const p = []; p.push(new THREE.Vector2(0,0)); p.push(new THREE.Vector2(1.4,0)); 
    p.push(new THREE.Vector2(2.6,2.0)); p.push(new THREE.Vector2(1.4,3.8)); 
    p.push(new THREE.Vector2(1.8,4.8)); p.push(new THREE.Vector2(1.6,4.8)); 
    p.push(new THREE.Vector2(1.2,3.8)); p.push(new THREE.Vector2(2.4,2.0)); p.push(new THREE.Vector2(0,0.2));
    return p;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * (step < 3 ? 2 : 0.5);
  });

  return (
    // SCALE 1.4 (BIGGER)
    <group position={[0, 1.5, 0]} scale={1.4}>
        <group ref={groupRef}>
          {step === 0 && <mesh position={[0, 2, 0]}><cylinderGeometry args={[1.5, 1.8, 2.5, 32]} /><meshStandardMaterial color="#e0e0e0" roughness={1} /></mesh>}
          {step === 1 && <mesh><latheGeometry args={[vaseProfile, 64]} /><meshStandardMaterial color="#f0f0f0" roughness={0.8} /></mesh>}
          {step === 2 && <mesh><latheGeometry args={[vaseProfile, 64]} /><meshStandardMaterial map={potteryTexture} roughness={1} metalness={0} /></mesh>}
          {step === 3 && <mesh><latheGeometry args={[vaseProfile, 128]} /><meshStandardMaterial map={potteryTexture} roughness={0.05} metalness={0.1} envMapIntensity={1.5} /></mesh>}
        </group>
    </group>
  );
};

const BluePotteryMaker = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "1. Quartz Dough", desc: "Mix of Quartz, Glass powder & Gum." },
    { label: "2. Molding", desc: "Pressed into molds to create shape." },
    { label: "3. Painting", desc: "Painted with Cobalt Oxide (Blue)." },
    { label: "4. Firing", desc: "Heated to 800°C for glass finish." }
  ];

  return (
    <div className="flex flex-col h-full w-full bg-black">
      <div className="h-[65%] w-full bg-gradient-to-b from-stone-800/50 to-black">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
          <Stage intensity={0.5} environment="city" adjustCamera={false}>
             <MakerScene step={step} />
          </Stage>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      <div className="h-[35%] w-full bg-stone-900 border-t border-blue-900/30 p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-blue-400 font-bold text-2xl mb-2">{steps[step].label}</h3>
          <p className="text-gray-300 text-sm mb-6 max-w-md">{steps[step].desc}</p>
          <div className="flex gap-4 w-full max-w-sm">
             <button onClick={() => setStep(0)} className="px-6 py-3 rounded-xl bg-stone-700 text-white font-bold text-sm hover:bg-stone-600 border border-stone-500">Restart</button>
             <button onClick={() => step < 3 && setStep(step + 1)} disabled={step === 3} className={`flex-1 py-3 rounded-xl font-bold text-black shadow-lg ${step === 3 ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-400'}`}>{step === 3 ? "Completed" : "Next Step →"}</button>
          </div>
      </div>
    </div>
  );
};
export default BluePotteryMaker;