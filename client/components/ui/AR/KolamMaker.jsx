// // // import React, { useState, useMemo } from 'react';
// // // import { useTexture, Html, Center } from '@react-three/drei';
// // // import * as THREE from 'three';

// // // // Helper to generate grid dots
// // // const DotsGrid = () => {
// // //   const dots = useMemo(() => {
// // //     const arr = [];
// // //     for(let x = -1; x <= 1; x+=0.5) {
// // //       for(let y = -1; y <= 1; y+=0.5) {
// // //         // Diamond pattern logic
// // //         if (Math.abs(x) + Math.abs(y) <= 1.6) { 
// // //            arr.push([x, y, 0.06]);
// // //         }
// // //       }
// // //     }
// // //     return arr;
// // //   }, []);
  
// // //   return (
// // //     <group>
// // //       {dots.map((pos, i) => (
// // //         <mesh key={i} position={pos}>
// // //           <sphereGeometry args={[0.03, 16, 16]} />
// // //           <meshStandardMaterial color="white" />
// // //         </mesh>
// // //       ))}
// // //     </group>
// // //   );
// // // };

// // // const KolamMaker = () => {
// // //   const [step, setStep] = useState(0);
// // //   const texture = useTexture('/kolam.png');

// // //   const steps = [
// // //     { label: "1. Preparing the Floor", desc: "The entrance is cleaned and sprinkled with water." },
// // //     { label: "2. Pulli (The Grid)", desc: "A grid of dots is laid out using rice flour to guide symmetry." },
// // //     { label: "3. Neli (The Lines)", desc: "Curved lines are drawn around the dots, never stopping." },
// // //     { label: "4. Completion", desc: "The geometric pattern is completed to welcome prosperity." }
// // //   ];

// // //   return (
// // //     <group>
// // //       <Center>
// // //         <group rotation={[0, 0.2, 0]}>
          
// // //           {/* BASE FLOOR */}
// // //           <mesh position={[0, 0, 0]}>
// // //             <boxGeometry args={[3, 3, 0.1]} />
// // //             <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
// // //           </mesh>

// // //           {/* STAGE 2: DOTS */}
// // //           {step >= 1 && step < 3 && <DotsGrid />}

// // //           {/* STAGE 3: SIMPLE LINES (Procedural Torus Knots representing incomplete lines) */}
// // //           {step === 2 && (
// // //              <group>
// // //                <mesh position={[0,0,0.06]}>
// // //                  <torusGeometry args={[0.8, 0.02, 16, 100]} />
// // //                  <meshStandardMaterial color="white" />
// // //                </mesh>
// // //                <mesh position={[0,0,0.06]} rotation={[0,0,0.78]}>
// // //                  <torusGeometry args={[0.5, 0.02, 16, 100]} />
// // //                  <meshStandardMaterial color="white" />
// // //                </mesh>
// // //              </group>
// // //           )}

// // //           {/* STAGE 4: FINAL TEXTURE REVEAL */}
// // //           {step === 3 && (
// // //              <mesh position={[0, 0, 0.06]}>
// // //                 <planeGeometry args={[2.8, 2.8]} />
// // //                 <meshStandardMaterial map={texture} transparent />
// // //              </mesh>
// // //           )}

// // //           {/* FRAME */}
// // //           <mesh position={[0, 0, -0.05]}>
// // //             <boxGeometry args={[3.2, 3.2, 0.05]} />
// // //             <meshStandardMaterial color="#333" />
// // //           </mesh>
// // //         </group>
// // //       </Center>

// // //       {/* UI CONTROLS */}
// // //       <Html position={[0, -2, 0]} center zIndexRange={[100, 0]}>
// // //         <div className="w-64 bg-stone-900/95 backdrop-blur-xl p-4 rounded-2xl border border-yellow-600/30 text-center select-none shadow-2xl">
// // //           <h3 className="text-yellow-500 font-bold text-sm uppercase tracking-wider mb-1">{steps[step].label}</h3>
// // //           <p className="text-gray-400 text-[11px] mb-4 h-8 leading-tight flex items-center justify-center">
// // //             {steps[step].desc}
// // //           </p>
          
// // //           <div className="flex gap-3 justify-center items-center">
// // //              {step > 0 && <button onClick={() => setStep(0)} className="px-2 py-1 rounded text-[10px] bg-stone-800 text-gray-400">Reset</button>}
// // //              {step < 3 ? (
// // //                <button onClick={() => setStep(step+1)} className="bg-yellow-600 text-black font-bold px-4 py-2 rounded-lg text-[10px]">Next Step</button>
// // //              ) : (
// // //                <div className="text-green-400 text-[10px] font-bold px-4 py-2 bg-green-500/10 rounded-lg">Pattern Complete</div>
// // //              )}
// // //           </div>
// // //         </div>
// // //       </Html>
// // //     </group>
// // //   );
// // // };

// // // export default KolamMaker;
// // import React, { useState, useMemo } from 'react';
// // import { useTexture, Stage, OrbitControls } from '@react-three/drei';
// // import { Canvas } from '@react-three/fiber';

// // const DotsGrid = () => {
// //   const dots = useMemo(() => {
// //     const arr = [];
// //     for(let x = -1; x <= 1; x+=0.5) { for(let y = -1; y <= 1; y+=0.5) { if (Math.abs(x) + Math.abs(y) <= 1.6) arr.push([x, y, 0.06]); } }
// //     return arr;
// //   }, []);
// //   return <group>{dots.map((pos, i) => <mesh key={i} position={pos}><sphereGeometry args={[0.03, 16, 16]} /><meshStandardMaterial color="white" /></mesh>)}</group>;
// // };

// // const MakerScene = ({ step }) => {
// //   const texture = useTexture('/kolam.png');

// //   return (
// //     <group position={[0, 1.0, 0]} rotation={[0.3, 0, 0]} scale={0.7}>
// //         <group>
// //           <mesh position={[0, 0, 0]}><boxGeometry args={[3, 3, 0.1]} /><meshStandardMaterial color="#1a1a1a" roughness={0.8} /></mesh>
// //           {step >= 1 && step < 3 && <DotsGrid />}
// //           {step === 2 && <group>
// //               <mesh position={[0,0,0.06]}><torusGeometry args={[0.8, 0.02, 16, 100]} /><meshStandardMaterial color="white" /></mesh>
// //               <mesh position={[0,0,0.06]} rotation={[0,0,0.78]}><torusGeometry args={[0.5, 0.02, 16, 100]} /><meshStandardMaterial color="white" /></mesh>
// //             </group>}
// //           {step === 3 && <mesh position={[0, 0, 0.06]}><planeGeometry args={[2.8, 2.8]} /><meshStandardMaterial map={texture} transparent /></mesh>}
// //           <mesh position={[0, 0, -0.05]}><boxGeometry args={[3.2, 3.2, 0.05]} /><meshStandardMaterial color="#333" /></mesh>
// //         </group>
// //     </group>
// //   );
// // };

// // const KolamMaker = () => {
// //   const [step, setStep] = useState(0);
// //   const steps = [
// //     { label: "1. Floor Prep", desc: "Entrance cleaned and sprinkled with water." },
// //     { label: "2. Pulli (Grid)", desc: "Rice flour dots laid for symmetry." },
// //     { label: "3. Neli (Lines)", desc: "Curved lines drawn around dots." },
// //     { label: "4. Completion", desc: "Pattern completed for prosperity." }
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
// //       <div className="h-[40%] w-full bg-stone-950 border-t border-pink-900/50 p-4 flex flex-col items-center justify-center text-center">
// //           <h3 className="text-pink-400 font-bold text-xl uppercase mb-2">{steps[step].label}</h3>
// //           <p className="text-gray-400 text-sm mb-4 max-w-xs">{steps[step].desc}</p>
// //           <div className="flex gap-4 w-full max-w-xs">
// //              <button onClick={() => setStep(0)} className="flex-1 py-3 rounded bg-stone-800 text-gray-400 text-xs font-bold hover:bg-stone-700">RESTART</button>
// //              <button onClick={() => step < 3 && setStep(step + 1)} disabled={step === 3} className={`flex-[2] py-3 rounded text-xs font-bold text-black ${step === 3 ? 'bg-green-500' : 'bg-pink-500 hover:bg-pink-400'}`}>{step === 3 ? "COMPLETE" : "NEXT STEP →"}</button>
// //           </div>
// //       </div>
// //     </div>
// //   );
// // };
// // export default KolamMaker;

// import React, { useState, useMemo } from 'react';
// import { useTexture, Stage, OrbitControls } from '@react-three/drei';
// import { Canvas } from '@react-three/fiber';

// const DotsGrid = () => {
//   const dots = useMemo(() => {
//     const arr = [];
//     for(let x = -1; x <= 1; x+=0.5) { for(let y = -1; y <= 1; y+=0.5) { if (Math.abs(x) + Math.abs(y) <= 1.6) arr.push([x, y, 0.06]); } }
//     return arr;
//   }, []);
//   return <group>{dots.map((pos, i) => <mesh key={i} position={pos}><sphereGeometry args={[0.03, 16, 16]} /><meshStandardMaterial color="white" /></mesh>)}</group>;
// };

// const MakerScene = ({ step }) => {
//   const texture = useTexture('/kolam.png');

//   return (
//     <group position={[0, 1.0, 0]} rotation={[0.3, 0, 0]} scale={1.0}>
//         <group>
//           <mesh position={[0, 0, 0]}><boxGeometry args={[3, 3, 0.1]} /><meshStandardMaterial color="#1a1a1a" roughness={0.8} /></mesh>
//           {step >= 1 && step < 3 && <DotsGrid />}
//           {step === 2 && <group>
//               <mesh position={[0,0,0.06]}><torusGeometry args={[0.8, 0.02, 16, 100]} /><meshStandardMaterial color="white" /></mesh>
//               <mesh position={[0,0,0.06]} rotation={[0,0,0.78]}><torusGeometry args={[0.5, 0.02, 16, 100]} /><meshStandardMaterial color="white" /></mesh>
//             </group>}
//           {step === 3 && <mesh position={[0, 0, 0.06]}><planeGeometry args={[2.8, 2.8]} /><meshStandardMaterial map={texture} transparent /></mesh>}
//           <mesh position={[0, 0, -0.05]}><boxGeometry args={[3.2, 3.2, 0.05]} /><meshStandardMaterial color="#333" /></mesh>
//         </group>
//     </group>
//   );
// };

// const KolamMaker = () => {
//   const [step, setStep] = useState(0);
//   const steps = [
//     { label: "1. Floor Prep", desc: "Entrance cleaned and sprinkled with water." },
//     { label: "2. Pulli (Grid)", desc: "Rice flour dots laid for symmetry." },
//     { label: "3. Neli (Lines)", desc: "Curved lines drawn around dots." },
//     { label: "4. Completion", desc: "Pattern completed for prosperity." }
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
//       <div className="h-[35%] w-full bg-stone-900 border-t border-pink-900/30 p-6 flex flex-col items-center justify-center text-center">
//           <div className="flex gap-2 mb-3">{steps.map((_, i) => (<div key={i} className={`h-1.5 w-8 rounded-full transition-all ${i <= step ? 'bg-pink-500' : 'bg-stone-700'}`} />))}</div>
//           <h3 className="text-pink-400 font-bold text-2xl mb-1 font-serif">{steps[step].label}</h3>
//           <p className="text-gray-400 text-sm mb-6 max-w-md">{steps[step].desc}</p>
//           <div className="flex gap-4 w-full max-w-sm">
//              <button onClick={() => setStep(0)} className="px-6 py-3 rounded-xl bg-stone-800 text-white font-bold text-sm hover:bg-stone-700 border border-stone-600">Restart</button>
//              <button onClick={() => step < 3 && setStep(step + 1)} disabled={step === 3} className={`flex-1 py-3 rounded-xl text-sm font-bold text-black ${step === 3 ? 'bg-green-500' : 'bg-pink-500 hover:bg-pink-400'}`}>{step === 3 ? "Completed" : "Next Step →"}</button>
//           </div>
//       </div>
//     </div>
//   );
// };
// export default KolamMaker;


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
      <div className="h-[65%] w-full bg-gradient-to-b from-stone-800/50 to-black">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
          <Stage intensity={0.5} environment="city" adjustCamera={false}>
             <MakerScene step={step} />
          </Stage>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      <div className="h-[35%] w-full bg-stone-900 border-t border-pink-900/30 p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-pink-400 font-bold text-2xl mb-2">{steps[step].label}</h3>
          <p className="text-gray-300 text-sm mb-6 max-w-md">{steps[step].desc}</p>
          <div className="flex gap-4 w-full max-w-sm">
             <button onClick={() => setStep(0)} className="px-6 py-3 rounded-xl bg-stone-700 text-white font-bold text-sm hover:bg-stone-600 border border-stone-500">Restart</button>
             <button onClick={() => step < 3 && setStep(step + 1)} disabled={step === 3} className={`flex-1 py-3 rounded-xl font-bold text-black shadow-lg ${step === 3 ? 'bg-green-500' : 'bg-pink-500 hover:bg-pink-400'}`}>{step === 3 ? "Completed" : "Next Step →"}</button>
          </div>
      </div>
    </div>
  );
};
export default KolamMaker;