import { Canvas } from '@react-three/fiber';

function Box(props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box />
      <Box position={[0, 2, 0]} />
      <Box position={[0, -2, 0]} />
    </Canvas>
  );
}
