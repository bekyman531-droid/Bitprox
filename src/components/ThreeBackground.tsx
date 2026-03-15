import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Sparkles, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 2, camera.position.z), 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function DollarBills() {
  const billsRef = useRef<THREE.Group>(null);
  
  const bills = useMemo(() => {
    return Array.from({ length: 25 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 15 - 10
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      scale: Math.random() * 0.4 + 0.3
    }));
  }, []);

  useFrame(() => {
    if (billsRef.current) {
      const time = performance.now() / 1000;
      billsRef.current.children.forEach((child, i) => {
        child.rotation.x += 0.01;
        child.rotation.y += 0.005;
        child.position.y += Math.sin(time + i) * 0.002;
      });
    }
  });

  return (
    <group ref={billsRef}>
      {bills.map((props, i) => (
        <Float key={i} speed={1.5} rotationIntensity={1} floatIntensity={1}>
          <mesh position={props.position} rotation={props.rotation} scale={props.scale}>
            <boxGeometry args={[2, 1, 0.02]} />
            <meshStandardMaterial color="#2d5a27" metalness={0.5} roughness={0.5} />
            {/* Simple $ sign representation using a small box */}
            <mesh position={[0, 0, 0.02]}>
              <planeGeometry args={[0.5, 0.8]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
            </mesh>
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-black pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Rig />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#2d5a27" />
        
        <DollarBills />
        
        <Sparkles count={100} scale={20} size={2} speed={0.4} opacity={0.3} color="#2d5a27" />
        <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        <fog attach="fog" args={['#000', 5, 35]} />
      </Canvas>
    </div>
  );
}
