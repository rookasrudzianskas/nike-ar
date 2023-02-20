import { Canvas } from '@react-three/fiber';

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh position={[-1, -1, 0]} scale={0.1}>
        <torusKnotGeometry radius={10} args={[10, 1, 260, 6, 10, 16]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </Canvas>
  );
}
