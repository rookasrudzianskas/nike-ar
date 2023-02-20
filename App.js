import {Suspense, useLayoutEffect, useRef, useState} from "react";
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import {ActivityIndicator, View} from "react-native";
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { TextureLoader } from 'expo-three';

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
  const [base, normal, rough] = useLoader(TextureLoader, [
    require('./assets/Airmax/textures/BaseColor.jpg'),
    require('./assets/Airmax/textures/Normal.jpg'),
    require('./assets/Airmax/textures/Roughness.png'),
  ]);

  const material = useLoader(MTLLoader, require('./assets/Airmax/shoe.mtl'));
  const obj = useLoader(OBJLoader, require('./assets/Airmax/shoe.obj'), (loader) => {
    material.preload();
    loader.setMaterials(material);
  });

  useLayoutEffect(() => {
    obj.traverse((child) => {
      if(child instanceof THREE.Mesh) {
        child.material.map = base;
        child.material.normalMap = normal;
        child.material.roughnessMap = rough;
      }
    });
  }, [obj]);

  return (
    <mesh rotation={[1, 0, 0]} {...props}>
      <primitive object={obj} scale={10} />
    </mesh>
  )
}

export const Loading = () => {
  return (
    <View className="h-screen items-center justify-center">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <Suspense fallback={null}>
        <Shoe />
      </Suspense>

      {/*<Box />*/}
      {/*<Box position={[0, 2, 0]} />*/}
      {/*<Box position={[0, -2, 0]} />*/}
    </Canvas>
  );
}
