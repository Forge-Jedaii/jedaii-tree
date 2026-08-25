"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { type MutableRefObject, useMemo, useRef } from "react";
import * as THREE from "three";
import { portalPaths } from "../../data/paths";

export type TreeInteraction = { scroll: number; swipe: number; velocity: number; pointerX: number; pointerY: number };

type TreeSceneProps = {
  activeId: string | null;
  mobile: boolean;
  reducedMotion: boolean;
  lowPower: boolean;
  interaction: MutableRefObject<TreeInteraction>;
};

type BranchProps = {
  curve: THREE.QuadraticBezierCurve3;
  point: THREE.Vector3;
  color: string;
  active: boolean;
  dimmed: boolean;
  mobile: boolean;
  reducedMotion: boolean;
  lowPower: boolean;
};

function EnergyBranch({ curve, point, color, active, dimmed, mobile, reducedMotion, lowPower }: BranchProps) {
  const branchMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const node = useRef<THREE.Mesh>(null);
  const nodeMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const halo = useRef<THREE.Mesh>(null);
  const haloMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const energy = useRef<THREE.Mesh>(null);
  const energyMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const waveStart = useRef(-10);
  const wasActive = useRef(false);
  const wavePoint = useMemo(() => new THREE.Vector3(), []);
  const scaleTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }, delta) => {
    const speed = reducedMotion ? 1 : Math.min(1, delta * 5.2);
    const time = clock.elapsedTime;
    if (active && !wasActive.current) waveStart.current = time;
    wasActive.current = active;

    const branchOpacity = dimmed ? 0.1 : active ? 0.92 : 0.34;
    if (branchMaterial.current) branchMaterial.current.opacity = THREE.MathUtils.lerp(branchMaterial.current.opacity, branchOpacity, speed);

    const breath = reducedMotion ? 1 : 1 + Math.sin(time * 0.72 + point.x) * 0.035;
    const nodeScale = (active ? 1.24 : 1) * breath;
    scaleTarget.setScalar(nodeScale);
    node.current?.scale.lerp(scaleTarget, speed);
    if (nodeMaterial.current) nodeMaterial.current.opacity = THREE.MathUtils.lerp(nodeMaterial.current.opacity, dimmed ? 0.28 : active ? 1 : 0.82, speed);
    scaleTarget.setScalar(active ? 2.35 : 1.7);
    halo.current?.scale.lerp(scaleTarget, speed);
    if (haloMaterial.current) haloMaterial.current.opacity = THREE.MathUtils.lerp(haloMaterial.current.opacity, dimmed ? 0.02 : active ? 0.15 : 0.055, speed);

    if (!energy.current || !energyMaterial.current) return;
    const waveElapsed = time - waveStart.current;
    const selectionWave = active && waveElapsed >= 0 && waveElapsed <= 0.8;
    const travel = selectionWave ? Math.min(1, waveElapsed / 0.8) : (time * (lowPower ? 0.035 : 0.055) + Math.abs(point.x) * 0.09) % 1;
    curve.getPoint(travel, wavePoint);
    energy.current.position.copy(wavePoint);
    const energyOpacity = selectionWave ? Math.sin(travel * Math.PI) * 0.9 : dimmed || reducedMotion ? 0 : 0.2;
    energyMaterial.current.opacity = THREE.MathUtils.lerp(energyMaterial.current.opacity, energyOpacity, speed);
  });

  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, lowPower ? 18 : 30, lowPower ? 0.008 : 0.01, 4, false]} />
        <meshBasicMaterial ref={branchMaterial} color={color} transparent opacity={0.34} depthWrite={false} />
      </mesh>
      <mesh ref={node} position={point}>
        <sphereGeometry args={[mobile ? 0.13 : 0.16, lowPower ? 12 : 20, lowPower ? 12 : 20]} />
        <meshBasicMaterial ref={nodeMaterial} color={color} transparent opacity={0.82} />
      </mesh>
      <mesh ref={halo} position={point} scale={1.7}>
        <sphereGeometry args={[mobile ? 0.13 : 0.16, 12, 12]} />
        <meshBasicMaterial ref={haloMaterial} color={color} transparent opacity={0.055} depthWrite={false} />
      </mesh>
      <mesh ref={energy}>
        <sphereGeometry args={[mobile ? 0.035 : 0.045, 8, 8]} />
        <meshBasicMaterial ref={energyMaterial} color={color} transparent opacity={0.2} depthWrite={false} />
      </mesh>
    </group>
  );
}

function EnergyTree({ activeId, mobile, reducedMotion, lowPower, interaction }: TreeSceneProps) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const coreMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const targetScale = useMemo(() => new THREE.Vector3(1, 1, 1), []);
  const positions = useMemo(
    () => portalPaths.map((path) => {
      const point = new THREE.Vector3(...(mobile ? path.mobilePosition : path.position));
      const bend = new THREE.Vector3(point.x * 0.34, point.y * 0.44, 0.35);
      return { ...path, point, curve: new THREE.QuadraticBezierCurve3(new THREE.Vector3(), bend, point) };
    }),
    [mobile],
  );
  const activePoint = useMemo(() => positions.find((path) => path.id === activeId)?.point ?? null, [activeId, positions]);
  const particlePositions = useMemo(() => {
    const count = lowPower ? 55 : 120;
    const values = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const radius = 2.2 + ((index * 37) % 100) / 30;
      const angle = index * 2.39996;
      values[index * 3] = Math.cos(angle) * radius;
      values[index * 3 + 1] = Math.sin(angle * 0.73) * (mobile ? 3.4 : 2.7);
      values[index * 3 + 2] = -1.2 + ((index * 19) % 40) / 18;
    }
    return values;
  }, [lowPower, mobile]);

  useFrame(({ camera, clock }, delta) => {
    if (!group.current) return;
    const controls = interaction.current;
    const damping = reducedMotion ? 1 : Math.min(1, delta * 3.8);
    const baseZ = mobile ? 8.3 : 7.1;
    const scrollApproach = reducedMotion ? 0 : Math.sin(controls.scroll * Math.PI) * (lowPower ? 0.2 : 0.36);
    const activeApproach = reducedMotion || !activeId ? 0 : lowPower ? 0.1 : 0.2;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, baseZ + 0.12 - scrollApproach - activeApproach, damping);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, activePoint ? activePoint.x * 0.025 : 0, damping);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, activePoint ? activePoint.y * 0.018 : 0, damping);

    if (!reducedMotion) {
      controls.swipe = THREE.MathUtils.clamp(controls.swipe + controls.velocity, -0.14, 0.14);
      controls.velocity *= Math.pow(0.9, delta * 60);
      const idle = lowPower ? 0 : Math.sin(clock.elapsedTime * 0.18) * 0.008;
      const pointerTilt = mobile ? 0 : controls.pointerX * 0.018;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, controls.swipe + idle + pointerTilt, damping);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mobile ? 0 : -controls.pointerY * 0.01, damping);
      targetScale.setScalar(1 + Math.sin(clock.elapsedTime * 0.75) * 0.025);
      core.current?.scale.lerp(targetScale, damping);
      if (coreMaterial.current) coreMaterial.current.emissiveIntensity = 1.1 + Math.sin(clock.elapsedTime * 0.75) * 0.08;
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[particlePositions, 3]} /></bufferGeometry>
        <pointsMaterial color="#8edfff" size={lowPower ? 0.018 : 0.025} transparent opacity={0.34} sizeAttenuation depthWrite={false} />
      </points>
      {positions.map((path) => (
        <EnergyBranch key={path.id} curve={path.curve} point={path.point} color={path.accent} active={activeId === path.id} dimmed={activeId !== null && activeId !== path.id} mobile={mobile} reducedMotion={reducedMotion} lowPower={lowPower} />
      ))}
      <mesh ref={core}>
        <icosahedronGeometry args={[mobile ? 0.42 : 0.5, lowPower ? 1 : 2]} />
        <meshStandardMaterial ref={coreMaterial} color="#bdeeff" emissive="#38bdf8" emissiveIntensity={1.1} roughness={0.24} metalness={0.25} />
      </mesh>
      <mesh scale={1.48}>
        <icosahedronGeometry args={[mobile ? 0.42 : 0.5, 1]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.18} />
      </mesh>
      <ambientLight intensity={0.55} />
      <pointLight color="#38bdf8" intensity={2.4} distance={8} />
    </group>
  );
}

export default function TreeScene(props: TreeSceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, props.mobile ? 8.42 : 7.22], fov: props.mobile ? 49 : 46 }} dpr={props.lowPower ? 1 : [1, 1.5]} gl={{ alpha: true, antialias: !props.lowPower, powerPreference: props.lowPower ? "low-power" : "high-performance" }} frameloop={props.reducedMotion ? "demand" : "always"}>
      <EnergyTree {...props} />
    </Canvas>
  );
}
