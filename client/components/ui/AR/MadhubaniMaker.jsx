// // import React, { useState, useMemo } from 'react';
// // import * as THREE from 'three';
// // import { Stage, OrbitControls } from '@react-three/drei';
// // import { Canvas } from '@react-three/fiber';

// // const MakerScene = ({ step }) => {
// //   const paintingTexture = useMemo(() => {
// //     const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 512;
// //     const ctx = canvas.getContext('2d');
// //     const drawFish = (fillColor, strokeOnly) => {
// //       ctx.save(); ctx.translate(256, 256);
// //       ctx.beginPath(); ctx.moveTo(-150, 0); 
// //       ctx.bezierCurveTo(-50, -120, 50, -120, 150, 0); ctx.bezierCurveTo(50, 120, -50, 120, -150, 0);
// //       if (fillColor) { ctx.fillStyle = fillColor; ctx.fill(); }
// //       ctx.lineWidth = 6; ctx.strokeStyle = 'black'; ctx.stroke(); 
// //       ctx.beginPath(); ctx.moveTo(-140, 0); ctx.bezierCurveTo(-45, -110, 45, -110, 140, 0); ctx.bezierCurveTo(45, 110, -45, 110, -140, 0); ctx.lineWidth = 2; ctx.stroke();
// //       ctx.beginPath(); ctx.arc(100, -20, 10, 0, Math.PI*2); ctx.fillStyle='white'; ctx.fill(); ctx.stroke();
// //       ctx.beginPath(); ctx.arc(100, -20, 4, 0, Math.PI*2); ctx.fillStyle='black'; ctx.fill();
// //       ctx.restore();
// //     };
// //     const textures = [];
// //     ctx.fillStyle = '#f5e6d3'; ctx.fillRect(0,0,512,512); textures.push(new THREE.CanvasTexture(canvas));
// //     drawFish(null, true); textures.push(new THREE.CanvasTexture(canvas));
// //     ctx.fillStyle = '#f5e6d3'; ctx.fillRect(0,0,512,512); drawFish('#ff9900', false); textures.push(new THREE.CanvasTexture(canvas));
// //     textures.push(new THREE.CanvasTexture(canvas));
// //     return textures;
// //   }, []);

// //   return (
// //     <group position={[0, 1.5, 0]} scale={0.65}>
// //         <mesh>
// //           <planeGeometry args={[3, 3]} />
// //           <meshStandardMaterial map={paintingTexture[step > 3 ? 3 : step]} roughness={1} />
// //         </mesh>
// //         <mesh position={[0,0,-0.02]}><boxGeometry args={[3.2,3.2,0.05]} /><meshStandardMaterial color="#4a3b2a" /></mesh>
// //     </group>
// //   );
// // };

// // const MadhubaniMaker = () => {
// //   const [step, setStep] = useState(0);
// //   const steps = [
// //     { label: "1. Paper Prep", desc: "Handmade paper treated with cow dung wash." },
// //     { label: "2. Kachni (Outline)", desc: "Double outlines drawn with bamboo twigs." },
// //     { label: "3. Bharni (Filling)", desc: "Bright flat colors filled into the shapes." },
// //     { label: "4. Finished Art", desc: "Detailed hatching and borders completed." }
// //   ];

// //   return (
// //     <div className="flex flex-col h-full w-full">
// //       <div className="h-[60%] w-full bg-black/20">
// //         <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
// //           <Stage intensity={0.5} environment="city" adjustCamera={false}>
// //              <MakerScene step={step} />
// //           </Stage>
// //           <OrbitControls enableZoom={false} />
// //         </Canvas>
// //       </div>
// //       <div className="h-[40%] w-full bg-stone-950 border-t border-orange-900/50 p-4 flex flex-col items-center justify-center text-center">
// //           <h3 className="text-orange-400 font-bold text-xl uppercase mb-2">{steps[step].label}</h3>
// //           <p className="text-gray-400 text-sm mb-4 max-w-xs">{steps[step].desc}</p>
// //           <div className="flex gap-4 w-full max-w-xs">
// //              <button onClick={() => setStep(0)} className="flex-1 py-3 rounded bg-stone-800 text-gray-400 text-xs font-bold hover:bg-stone-700">RESTART</button>
// //              <button onClick={() => step < 3 && setStep(step + 1)} disabled={step === 3} className={`flex-[2] py-3 rounded text-xs font-bold text-black ${step === 3 ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-400'}`}>{step === 3 ? "COMPLETE" : "NEXT STEP →"}</button>
// //           </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MadhubaniMaker;

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
//     <group position={[0, 1.5, 0]} scale={0.8}>
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
//     <div className="flex flex-col h-full w-full bg-black">
//       <div className="h-[65%] w-full bg-gradient-to-b from-stone-800/50 to-black">
//         <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
//           <Stage intensity={0.5} environment="city" adjustCamera={false}>
//              <MakerScene step={step} />
//           </Stage>
//           <OrbitControls enableZoom={false} />
//         </Canvas>
//       </div>
//       <div className="h-[35%] w-full bg-stone-950 border-t border-orange-900/30 p-6 flex flex-col items-center justify-center text-center">
//           <div className="flex gap-2 mb-3">{steps.map((_, i) => (<div key={i} className={`h-1.5 w-8 rounded-full transition-all ${i <= step ? 'bg-orange-500' : 'bg-stone-700'}`} />))}</div>
//           <h3 className="text-orange-400 font-bold text-2xl mb-1 font-serif">{steps[step].label}</h3>
//           <p className="text-gray-400 text-sm mb-6 max-w-md">{steps[step].desc}</p>
//           <div className="flex gap-4 w-full max-w-sm">
//              <button onClick={() => setStep(0)} className="px-6 py-3 rounded-xl bg-stone-800 text-white font-bold text-sm hover:bg-stone-700 border border-stone-600">Restart</button>
//              <button onClick={() => step < 3 && setStep(step + 1)} disabled={step === 3} className={`flex-1 py-3 rounded-xl text-sm font-bold text-black ${step === 3 ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-400'}`}>{step === 3 ? "Completed" : "Next Step →"}</button>
//           </div>
//       </div>
//     </div>
//   );
// };
// export default MadhubaniMaker;

import React, { useState, useMemo } from 'react';
import * as THREE from 'three';
import { Stage, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const MakerScene = ({ step }) => {
  const paintingTexture = useMemo(() => {
    const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const drawFish = (fillColor, strokeOnly) => {
      ctx.save(); ctx.translate(256, 256);
      ctx.beginPath(); ctx.moveTo(-150, 0); 
      ctx.bezierCurveTo(-50, -120, 50, -120, 150, 0); ctx.bezierCurveTo(50, 120, -50, 120, -150, 0);
      if (fillColor) { ctx.fillStyle = fillColor; ctx.fill(); }
      ctx.lineWidth = 6; ctx.strokeStyle = 'black'; ctx.stroke(); 
      ctx.beginPath(); ctx.moveTo(-140, 0); ctx.bezierCurveTo(-45, -110, 45, -110, 140, 0); ctx.bezierCurveTo(45, 110, -45, 110, -140, 0); ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); ctx.arc(100, -20, 10, 0, Math.PI*2); ctx.fillStyle='white'; ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(100, -20, 4, 0, Math.PI*2); ctx.fillStyle='black'; ctx.fill();
      ctx.restore();
    };
    const textures = [];
    ctx.fillStyle = '#f5e6d3'; ctx.fillRect(0,0,512,512); textures.push(new THREE.CanvasTexture(canvas));
    drawFish(null, true); textures.push(new THREE.CanvasTexture(canvas));
    ctx.fillStyle = '#f5e6d3'; ctx.fillRect(0,0,512,512); drawFish('#ff9900', false); textures.push(new THREE.CanvasTexture(canvas));
    textures.push(new THREE.CanvasTexture(canvas));
    return textures;
  }, []);

  return (
    <group position={[0, 1.0, 0]} scale={1.2}>
        <mesh>
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial map={paintingTexture[step > 3 ? 3 : step]} roughness={1} />
        </mesh>
        <mesh position={[0,0,-0.02]}><boxGeometry args={[3.2,3.2,0.05]} /><meshStandardMaterial color="#4a3b2a" /></mesh>
    </group>
  );
};

const MadhubaniMaker = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "1. Paper Prep", desc: "Handmade paper treated with cow dung wash." },
    { label: "2. Kachni (Outline)", desc: "Double outlines drawn with bamboo twigs." },
    { label: "3. Bharni (Filling)", desc: "Bright flat colors filled into the shapes." },
    { label: "4. Finished Art", desc: "Detailed hatching and borders completed." }
  ];

  return (
    <div className="flex flex-col h-full w-full bg-black">
      <div className="h-[65%] w-full bg-gradient-to-b from-stone-800/50 to-black">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
          <Stage intensity={0.5} environment="city" adjustCamera={false}>
             <MakerScene step={step} />
          </Stage>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      <div className="h-[35%] w-full bg-stone-950 border-t border-orange-900/30 p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-orange-400 font-bold text-2xl mb-2">{steps[step].label}</h3>
          <p className="text-gray-300 text-sm mb-6 max-w-md">{steps[step].desc}</p>
          <div className="flex gap-4 w-full max-w-sm">
             <button onClick={() => setStep(0)} className="px-6 py-3 rounded-xl bg-stone-700 text-white font-bold text-sm hover:bg-stone-600 border border-stone-500">Restart</button>
             <button onClick={() => step < 3 && setStep(step + 1)} disabled={step === 3} className={`flex-1 py-3 rounded-xl font-bold text-black shadow-lg ${step === 3 ? 'bg-green-500' : 'bg-orange-500 hover:bg-orange-400'}`}>{step === 3 ? "Completed" : "Next Step →"}</button>
          </div>
      </div>
    </div>
  );
};
export default MadhubaniMaker;