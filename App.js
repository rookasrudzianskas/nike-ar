import {Canvas, useFrame} from '@react-three/fiber';
import {useRef, useState} from "react";

function Box(props) {
  const [active, setActive] = useState(false);
  const mesh = useRef();

  useFrame((state, delta) => {
    if(active) {
      mesh.current.rotation.y += delta;
      mesh.current.rotation.x += delta;
    }
  })

  return (
    <mesh
      {...props}
      onClick={(e) => setActive(!active)}
      scale={active ? 1.5 : 1}
      ref={mesh}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={active ? 'green' : 'pink'} />
    </mesh>
  )
}

function Shoe(props) {
  return (
    <mesh {...props}>

    </mesh>
  )
}

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <Shoe />

      {/*<Box />*/}
      {/*<Box position={[0, 2, 0]} />*/}
      {/*<Box position={[0, -2, 0]} />*/}
    </Canvas>
  );
}
