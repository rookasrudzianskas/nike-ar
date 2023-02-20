import { Canvas } from '@react-three/fiber';
import {useState} from "react";

function Box(props) {
  const [active, setActive] = useState(false);

  return (
    <mesh
      {...props}
      onClick={(e) => setActive(!active)}
      scale={active ? 1.5 : 1}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={active ? 'green' : 'pink'} />
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
