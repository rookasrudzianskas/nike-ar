import {Suspense, useLayoutEffect, useRef, useState} from "react";
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import {ActivityIndicator, View} from "react-native";
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { TextureLoader } from 'expo-three';
import { useAnimatedSensor, SensorType } from 'react-native-reanimated';

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
  const mesh = useRef();
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

  useFrame((state, delta) => {
    let { x, y, z } = props.animatedSensor.sensor.value;
    x = ~~(x * 100) / 5000;
    y = ~~(y * 100) / 5000;
    mesh.current.rotation.x += x;
    mesh.current.rotation.y += y;
  });

  return (
    <mesh ref={mesh} rotation={[0.7, 0, 0]} {...props}>
      <primitive object={obj} scale={10} />
    </mesh>
  )
}

const Loading = () => {
  return (
    <View className="h-screen items-center justify-center">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}

export default function App() {
  // React Native Reanimated Expo
  const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 100,
  });
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <Suspense fallback={null}>
        <Shoe animatedSensor={animatedSensor} />
      </Suspense>

      {/*<Box />*/}
      {/*<Box position={[0, 2, 0]} />*/}
      {/*<Box position={[0, -2, 0]} />*/}
    </Canvas>
  );
}
