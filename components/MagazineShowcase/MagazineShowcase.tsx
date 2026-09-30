'use client';

import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls, useTexture } from '@react-three/drei';
import { easing } from 'maath';
import {
  Bone,
  BoxGeometry,
  Color,
  Float32BufferAttribute,
  LinearFilter,
  LinearMipmapLinearFilter,
  MathUtils,
  MeshStandardMaterial,
  Skeleton,
  SkinnedMesh,
  SRGBColorSpace,
  Uint16BufferAttribute,
  Vector3,
} from 'three';
import { pages as contentPages } from '@/content/content';

const { degToRad } = MathUtils;

// Geometry configuration
const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.71; // 4:3 magazine aspect ratio
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

// Physics parameters
const easingFactor = 0.45;
const easingFactorFold = 0.3;
const insideCurveStrength = 0.18;
const outsideCurveStrength = 0.05;
const turningCurveStrength = 0.09;

// Create shared skinned page geometry
const createPageGeometry = () => {
  const geom = new BoxGeometry(PAGE_WIDTH, PAGE_HEIGHT, PAGE_DEPTH, PAGE_SEGMENTS, 2);
  geom.translate(PAGE_WIDTH / 2, 0, 0);

  const position = geom.attributes.position;
  const vertex = new Vector3();
  const skinIndexes: number[] = [];
  const skinWeights: number[] = [];

  for (let i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i);
    const x = vertex.x;
    const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
    const skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;

    skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
    skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
  }

  geom.setAttribute('skinIndex', new Uint16BufferAttribute(skinIndexes, 4));
  geom.setAttribute('skinWeight', new Float32BufferAttribute(skinWeights, 4));
  return geom;
};

const sharedPageGeometry = createPageGeometry();

const whiteColor = new Color('white');
const emissiveColor = new Color('#00a8ff');

const pageMaterials = [
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: '#111' }),
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: whiteColor }),
];

// Helper to resolve texture paths
const resolveTextureUrl = (urlOrName: string, texturePath = '/textures/') => {
  if (!urlOrName) return '';
  if (
    urlOrName.startsWith('/') ||
    urlOrName.startsWith('http://') ||
    urlOrName.startsWith('https://') ||
    urlOrName.startsWith('data:')
  ) {
    return urlOrName;
  }
  if (/\.(jpg|jpeg|png|webp|avif)$/i.test(urlOrName)) {
    return `${texturePath}${urlOrName}`;
  }
  return `${texturePath}${urlOrName}.jpg`;
};

export interface PageData {
  front: string;
  back: string;
}

// Generate magazine sheets from pages with back cover
export function buildMagazineShowcasePages(): PageData[] {
  const frontCover =
    contentPages.cover ||
    'https://res.cloudinary.com/daybrhbsc/image/upload/f_auto,q_auto,w_1000/v1790614624/prisma_magazine_cover_page.jpg';

  const backCover = contentPages.backCover || '/prisma_backcover.png';

  // Inside content pages from Cloudinary
  const contentList: string[] = [];
  for (let i = 1; i <= 16; i++) {
    const key = `Page${i}` as keyof typeof contentPages;
    const rawUrl = contentPages[key];
    if (rawUrl && typeof rawUrl === 'string') {
      const optimized = rawUrl.includes('/image/upload/')
        ? rawUrl.replace('/image/upload/', '/image/upload/f_auto,q_auto,w_800/')
        : rawUrl;
      contentList.push(optimized);
    } else {
      contentList.push(
        i % 2 === 0
          ? '/textures/prisma_content_page-0020.jpg'
          : '/textures/prisma_content_page-0021.jpg'
      );
    }
  }

  const sheets: PageData[] = [
    {
      front: frontCover,
      back: contentList[0],
    },
  ];

  for (let i = 1; i < contentList.length - 1; i += 2) {
    sheets.push({
      front: contentList[i],
      back: contentList[i + 1],
    });
  }

  // Last sheet contains final inside page on front, and custom Back Cover on back
  sheets.push({
    front: contentList[contentList.length - 1],
    back: backCover,
  });

  return sheets;
}

interface PageProps {
  number: number;
  front: string;
  back: string;
  page: number;
  opened: boolean;
  bookClosed: boolean;
  totalPages: number;
  texturePath?: string;
  onNavigateToRead: () => void;
}

const Page: React.FC<PageProps> = ({
  number,
  front,
  back,
  page,
  opened,
  bookClosed,
  totalPages,
  texturePath = '/textures/',
  onNavigateToRead,
}) => {
  const isBackCover = number === totalPages - 1;
  const isFrontCover = number === 0;

  const textureUrls = useMemo(() => {
    return [
      resolveTextureUrl(front, texturePath),
      resolveTextureUrl(back, texturePath),
    ];
  }, [front, back, texturePath]);

  const textures = useTexture(textureUrls);
  const picture = textures[0];
  const picture2 = textures[1];

  const gl = useThree((state) => state.gl);
  const maxAnisotropy = useMemo(
    () => (gl?.capabilities?.getMaxAnisotropy ? gl.capabilities.getMaxAnisotropy() : 16),
    [gl]
  );

  useEffect(() => {
    [picture, picture2].forEach((tex) => {
      if (tex) {
        tex.colorSpace = SRGBColorSpace;
        tex.anisotropy = maxAnisotropy;
        tex.minFilter = LinearMipmapLinearFilter;
        tex.magFilter = LinearFilter;
        tex.generateMipmaps = true;
        tex.needsUpdate = true;
      }
    });
  }, [picture, picture2, maxAnisotropy]);

  const group = useRef<any>(null);
  const turnedAt = useRef(0);
  const lastOpened = useRef(opened);
  const skinnedMeshRef = useRef<any>(null);
  const [highlighted, setHighlighted] = useState(false);

  const manualSkinnedMesh = useMemo(() => {
    const bones: Bone[] = [];
    for (let i = 0; i <= PAGE_SEGMENTS; i++) {
      const bone = new Bone();
      bones.push(bone);
      if (i === 0) {
        bone.position.x = 0;
      } else {
        bone.position.x = SEGMENT_WIDTH;
      }
      if (i > 0) {
        bones[i - 1].add(bone);
      }
    }
    const skeleton = new Skeleton(bones);

    const materials = [
      ...pageMaterials,
      new MeshStandardMaterial({
        color: whiteColor,
        map: picture,
        ...(isFrontCover
          ? {
              roughness: 0.32,
              metalness: 0.05,
              envMapIntensity: 0.45,
            }
          : {
              roughness: 0.95,
              metalness: 0.0,
              envMapIntensity: 0.0,
            }),
        emissive: emissiveColor,
        emissiveIntensity: 0,
      }),
      new MeshStandardMaterial({
        color: whiteColor,
        map: picture2,
        ...(isBackCover
          ? {
              roughness: 0.32,
              metalness: 0.05,
              envMapIntensity: 0.45,
            }
          : {
              roughness: 0.95,
              metalness: 0.0,
              envMapIntensity: 0.0,
            }),
        emissive: emissiveColor,
        emissiveIntensity: 0,
      }),
    ];

    const mesh = new SkinnedMesh(sharedPageGeometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    mesh.add(skeleton.bones[0]);
    mesh.bind(skeleton);
    return mesh;
  }, [isFrontCover, isBackCover, picture, picture2]);

  useFrame((_, delta) => {
    if (!skinnedMeshRef.current || !group.current) return;

    const emissiveIntensity = highlighted ? 0.08 : 0;
    if (skinnedMeshRef.current.material[4]) {
      skinnedMeshRef.current.material[4].emissiveIntensity = MathUtils.lerp(
        skinnedMeshRef.current.material[4].emissiveIntensity,
        emissiveIntensity,
        0.1
      );
    }
    if (skinnedMeshRef.current.material[5]) {
      skinnedMeshRef.current.material[5].emissiveIntensity = MathUtils.lerp(
        skinnedMeshRef.current.material[5].emissiveIntensity,
        emissiveIntensity,
        0.1
      );
    }

    const bones = skinnedMeshRef.current.skeleton.bones;

    group.current.visible = true;
    skinnedMeshRef.current.visible = true;
    group.current.position.x = 0;

    const targetZ = -number * PAGE_DEPTH + page * PAGE_DEPTH;
    easing.damp(skinnedMeshRef.current.position, 'z', targetZ, 0.35, delta);

    let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;
    if (!bookClosed) {
      targetRotation += degToRad(number * 0.8);
    }

    if (lastOpened.current !== opened) {
      turnedAt.current = +new Date();
      lastOpened.current = opened;
    }
    const elapsed = Date.now() - turnedAt.current;
    const turningProgress = Math.min(1, Math.max(0, elapsed / 450));
    const turningTime = Math.sin(turningProgress * Math.PI);

    for (let i = 0; i < bones.length; i++) {
      const target = i === 0 ? group.current : bones[i];

      const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.1) : 0;
      const outsideCurveIntensity = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0;
      const turningIntensity =
        Math.sin(i * Math.PI * (1 / bones.length)) * turningTime;
      const rotationAngle =
        insideCurveStrength * insideCurveIntensity * targetRotation -
        outsideCurveStrength * outsideCurveIntensity * targetRotation +
        turningCurveStrength * turningIntensity * targetRotation;
      const foldRotationAngle = degToRad(Math.sign(targetRotation) * 2);

      if (bookClosed) {
        if (i === 0) {
          easing.dampAngle(target.rotation, 'y', targetRotation, easingFactor, delta);
          easing.dampAngle(target.rotation, 'x', 0, easingFactorFold, delta);
        } else {
          easing.dampAngle(target.rotation, 'y', 0, easingFactor, delta);
          easing.dampAngle(target.rotation, 'x', 0, easingFactorFold, delta);
        }
      } else {
        easing.dampAngle(
          target.rotation,
          'y',
          rotationAngle,
          easingFactor,
          delta
        );

        const foldIntensity =
          i > 8
            ? Math.sin(i * Math.PI * (1 / bones.length) - 0.5) * turningTime
            : 0;
        easing.dampAngle(
          target.rotation,
          'x',
          foldRotationAngle * foldIntensity,
          easingFactorFold,
          delta
        );
      }
    }
  });

  const pointerDownPos = useRef({ x: 0, y: 0, time: 0 });

  return (
    <group
      ref={group}
      onPointerDown={(e) => {
        pointerDownPos.current = { x: e.clientX, y: e.clientY, time: Date.now() };
      }}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHighlighted(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHighlighted(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        const dist = Math.hypot(
          e.clientX - pointerDownPos.current.x,
          e.clientY - pointerDownPos.current.y
        );
        // If it's a click (not a drag to orbit), navigate to /read!
        if (dist < 8 && Date.now() - pointerDownPos.current.time < 500) {
          onNavigateToRead();
        }
      }}
    >
      <primitive object={manualSkinnedMesh} ref={skinnedMeshRef} />
    </group>
  );
};

interface BookShowcaseProps {
  pages: PageData[];
  texturePath?: string;
  isInteractingRef: React.MutableRefObject<boolean>;
  lastInteractionRef: React.MutableRefObject<number>;
  tiltX?: number;
  tiltZ?: number;
  spinSpeed?: number;
  screenWidth?: number;
  onNavigateToRead: () => void;
}

const BookShowcase: React.FC<BookShowcaseProps> = ({
  pages,
  texturePath = '/textures/',
  isInteractingRef,
  lastInteractionRef,
  tiltX = -0.24,
  tiltZ = -0.14,
  spinSpeed = 0.85,
  screenWidth = 1200,
  onNavigateToRead,
}) => {
  const [delayedPage, setDelayedPage] = useState(0);
  const bookGroupRef = useRef<any>(null);
  const tiltGroupRef = useRef<any>(null);
  const axisGroupRef = useRef<any>(null);
  const spinAngleRef = useRef(0);
  const entranceProgressRef = useRef(0);
  const { viewport } = useThree();

  // Dynamic book scale based on screen width
  const targetScale = useMemo(() => {
    if (screenWidth >= 1600) return 1.35;
    if (screenWidth >= 1400) return 1.28;
    if (screenWidth >= 1200) return 1.22;
    if (screenWidth >= 1024) return 1.14;
    if (screenWidth >= 768) return 1.04;
    if (screenWidth >= 480) return 0.94;
    return 0.86;
  }, [screenWidth]);

  // Showcase cycle state machine
  // 'ROTATING' -> 'OPENING' -> 'FLIPPING_FWD' -> 'PAUSE_OPEN' -> 'CLOSING' -> 'PAUSE_CLOSED' -> 'ROTATING'
  const showcasePhaseRef = useRef<
    'ROTATING' | 'OPENING' | 'FLIPPING_FWD' | 'PAUSE_OPEN' | 'CLOSING' | 'PAUSE_CLOSED'
  >('ROTATING');
  const rotationAccumRef = useRef(0);
  const phaseTimerRef = useRef(0);
  const lastFlipTimerRef = useRef(0);

  // Preview up to sheet 5 (which shows pages 10-11) during flip
  const maxPreviewPage = Math.min(pages.length - 2, 5);

  useFrame((state, delta) => {
    if (!bookGroupRef.current) return;

    // Safety guard: ensure the open 2-page spread NEVER gets cut off or touches container edges
    const maxSafeScale = (viewport.width * 0.88) / (PAGE_WIDTH * 2);
    const activeScale = Math.min(targetScale, maxSafeScale);

    let targetX = 0;
    if (delayedPage === 0) {
      targetX = (-PAGE_WIDTH / 2) * activeScale;
    } else if (delayedPage === pages.length) {
      targetX = (PAGE_WIDTH / 2) * activeScale;
    } else {
      targetX = 0;
    }

    easing.damp3(
      bookGroupRef.current.position,
      [targetX, 0.04, 0],
      0.35,
      delta
    );
    easing.damp3(
      bookGroupRef.current.scale,
      [activeScale, activeScale, activeScale],
      0.35,
      delta
    );

    // Continuous Tilted Axis Showcase Cycle Animation
    if (tiltGroupRef.current && axisGroupRef.current) {
      const now = performance.now();
      if (isInteractingRef?.current && lastInteractionRef.current > 0 && now - lastInteractionRef.current > 2500) {
        isInteractingRef.current = false;
      }
      const isDragging =
        Boolean(isInteractingRef?.current) ||
        (lastInteractionRef?.current > 0 && now - lastInteractionRef.current < 1500);

      entranceProgressRef.current = Math.min(
        1,
        entranceProgressRef.current + delta * 1.0
      );
      const entrance = entranceProgressRef.current;
      const time = state.clock.getElapsedTime();
      const currentPhase = showcasePhaseRef.current;

      if (currentPhase === 'ROTATING') {
        // Phase 1: Revolving full 360 round around tilted axis showing front, spine, back cover
        const breatheX = (tiltX + Math.sin(time * 0.9) * 0.02) * entrance;
        const breatheZ = (tiltZ + Math.cos(time * 0.7) * 0.015) * entrance;
        const floatY = Math.sin(time * 1.5) * 0.04 * entrance;

        easing.dampAngle(tiltGroupRef.current.rotation, 'x', breatheX, 0.4, delta);
        easing.dampAngle(tiltGroupRef.current.rotation, 'z', breatheZ, 0.4, delta);
        easing.damp(tiltGroupRef.current.position, 'y', floatY, 0.4, delta);

        if (!isDragging) {
          const rotStep = delta * spinSpeed * entrance;
          spinAngleRef.current += rotStep;
          rotationAccumRef.current += rotStep;

          if (spinAngleRef.current > Math.PI) {
            spinAngleRef.current -= Math.PI * 2;
          }
          axisGroupRef.current.rotation.y = spinAngleRef.current;

          // One full 360-degree rotation completed!
          if (rotationAccumRef.current >= Math.PI * 2) {
            showcasePhaseRef.current = 'OPENING';
            phaseTimerRef.current = 0;
          }
        } else {
          spinAngleRef.current = axisGroupRef.current.rotation.y;
        }
      } else if (currentPhase === 'OPENING') {
        // Phase 2: Face front and open book to Page 1
        easing.dampAngle(axisGroupRef.current.rotation, 'y', 0, 0.18, delta);
        easing.dampAngle(tiltGroupRef.current.rotation, 'x', -0.08, 0.22, delta);
        easing.dampAngle(tiltGroupRef.current.rotation, 'z', 0, 0.22, delta);
        easing.damp(tiltGroupRef.current.position, 'y', 0, 0.22, delta);

        if (!isDragging) {
          phaseTimerRef.current += delta;
          if (delayedPage !== 1) {
            setDelayedPage(1);
          }
          if (phaseTimerRef.current >= 0.45) {
            showcasePhaseRef.current = 'FLIPPING_FWD';
            phaseTimerRef.current = 0;
            lastFlipTimerRef.current = 0;
          }
        }
      } else if (currentPhase === 'FLIPPING_FWD') {
        // Phase 3: Flip pages quickly forward
        easing.dampAngle(axisGroupRef.current.rotation, 'y', 0, 0.18, delta);
        easing.dampAngle(tiltGroupRef.current.rotation, 'x', -0.08, 0.22, delta);
        easing.dampAngle(tiltGroupRef.current.rotation, 'z', 0, 0.22, delta);
        easing.damp(tiltGroupRef.current.position, 'y', 0, 0.22, delta);

        if (!isDragging) {
          phaseTimerRef.current += delta;
          lastFlipTimerRef.current += delta;

          if (lastFlipTimerRef.current >= 0.13) {
            lastFlipTimerRef.current = 0;
            setDelayedPage((prev) => {
              const next = prev + 1;
              if (next >= maxPreviewPage) {
                showcasePhaseRef.current = 'PAUSE_OPEN';
                phaseTimerRef.current = 0;
                return maxPreviewPage;
              }
              return next;
            });
          }
        }
      } else if (currentPhase === 'PAUSE_OPEN') {
        // Phase 4: Pause on open spread to showcase content
        easing.dampAngle(axisGroupRef.current.rotation, 'y', 0, 0.18, delta);
        easing.dampAngle(tiltGroupRef.current.rotation, 'x', -0.08, 0.22, delta);
        easing.dampAngle(tiltGroupRef.current.rotation, 'z', 0, 0.22, delta);
        easing.damp(tiltGroupRef.current.position, 'y', 0, 0.22, delta);

        if (!isDragging) {
          phaseTimerRef.current += delta;
          if (phaseTimerRef.current >= 0.85) {
            showcasePhaseRef.current = 'CLOSING';
            phaseTimerRef.current = 0;
          }
        }
      } else if (currentPhase === 'CLOSING') {
        // Phase 5: Close the book shut to front cover
        easing.dampAngle(axisGroupRef.current.rotation, 'y', 0, 0.18, delta);
        easing.dampAngle(tiltGroupRef.current.rotation, 'x', -0.08, 0.22, delta);
        easing.dampAngle(tiltGroupRef.current.rotation, 'z', 0, 0.22, delta);
        easing.damp(tiltGroupRef.current.position, 'y', 0, 0.22, delta);

        if (!isDragging) {
          phaseTimerRef.current += delta;
          if (delayedPage !== 0) {
            setDelayedPage(0);
          }
          if (phaseTimerRef.current >= 0.65) {
            showcasePhaseRef.current = 'PAUSE_CLOSED';
            phaseTimerRef.current = 0;
          }
        }
      } else if (currentPhase === 'PAUSE_CLOSED') {
        // Phase 6: Book is closed at cover, tilt back into showcase position
        const breatheX = tiltX * entrance;
        const breatheZ = tiltZ * entrance;
        easing.dampAngle(tiltGroupRef.current.rotation, 'x', breatheX, 0.35, delta);
        easing.dampAngle(tiltGroupRef.current.rotation, 'z', breatheZ, 0.35, delta);
        easing.dampAngle(axisGroupRef.current.rotation, 'y', 0, 0.18, delta);

        if (!isDragging) {
          phaseTimerRef.current += delta;
          if (phaseTimerRef.current >= 0.7) {
            // Restart rotating in loop!
            showcasePhaseRef.current = 'ROTATING';
            rotationAccumRef.current = 0;
            spinAngleRef.current = 0;
            phaseTimerRef.current = 0;
          }
        }
      }
    }
  });

  return (
    <group ref={tiltGroupRef}>
      <group ref={axisGroupRef}>
        <group ref={bookGroupRef} rotation-y={-Math.PI / 2}>
          {pages.map((pageData, index) => (
            <Page
              key={index}
              page={delayedPage}
              number={index}
              totalPages={pages.length}
              texturePath={texturePath}
              onNavigateToRead={onNavigateToRead}
              opened={delayedPage > index}
              bookClosed={delayedPage === 0 || delayedPage === pages.length}
              {...pageData}
            />
          ))}
        </group>
      </group>
    </group>
  );
};

export interface MagazineShowcaseProps {
  onOpenReader?: (page?: number) => void;
  className?: string;
}

export const MagazineShowcase: React.FC<MagazineShowcaseProps> = ({
  onOpenReader,
  className = '',
}) => {
  const router = useRouter();
  const pages = useMemo(() => buildMagazineShowcasePages(), []);
  const controlsRef = useRef<any>(null);
  const isInteractingRef = useRef(false);
  const lastInteractionRef = useRef(0);
  const pointerDownPos = useRef({ x: 0, y: 0, time: 0 });

  // Dynamic window width listener for responsive scaling
  const [screenWidth, setScreenWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') return window.innerWidth;
    return 1200;
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigateToRead = () => {
    if (onOpenReader) {
      onOpenReader(1);
    } else {
      router.push('/read');
    }
  };

  return (
    <div
      className={`relative w-full max-w-[360px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[580px] xl:max-w-[650px] 2xl:max-w-[720px] h-[350px] sm:h-[400px] md:h-[460px] lg:h-[520px] xl:h-[580px] 2xl:h-[640px] select-none cursor-pointer group ${className}`.trim()}
      onPointerDown={(e) => {
        pointerDownPos.current = { x: e.clientX, y: e.clientY, time: Date.now() };
      }}
      onPointerUp={() => {
        isInteractingRef.current = false;
        lastInteractionRef.current = performance.now();
      }}
      onPointerLeave={() => {
        isInteractingRef.current = false;
      }}
      onClick={(e) => {
        const dist = Math.hypot(
          e.clientX - pointerDownPos.current.x,
          e.clientY - pointerDownPos.current.y
        );
        // Only navigate if it wasn't a drag to rotate
        if (dist < 8 && Date.now() - pointerDownPos.current.time < 500) {
          handleNavigateToRead();
        }
      }}
      title="Click to Read PRISMA 3.0 Magazine"
    >
      {/* Soft Ambient Behind-Book Glow pool floating naturally on the dark background */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,168,255,0.14)_0%,rgba(0,210,255,0.03)_50%,transparent_70%)] blur-3xl pointer-events-none group-hover:opacity-100 transition-opacity duration-700 opacity-60" />

      {/* 3D WebGL Canvas Viewport - completely transparent & floating seamlessly on the hero */}
      <div className="relative w-full h-full">
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          camera={{ position: [0, 0, 4.3], fov: 42 }}
        >
          <Suspense fallback={null}>
            <BookShowcase
              pages={pages}
              texturePath="/textures/"
              isInteractingRef={isInteractingRef}
              lastInteractionRef={lastInteractionRef}
              tiltX={-0.24}
              tiltZ={-0.14}
              spinSpeed={0.85}
              screenWidth={screenWidth}
              onNavigateToRead={handleNavigateToRead}
            />

            <OrbitControls
              ref={controlsRef}
              enablePan={false}
              enableZoom={false}
              minDistance={2.5}
              maxDistance={5.5}
              maxPolarAngle={Math.PI / 2 + 0.15}
              minPolarAngle={Math.PI / 4}
              dampingFactor={0.06}
              onStart={() => {
                isInteractingRef.current = true;
              }}
              onEnd={() => {
                isInteractingRef.current = false;
                lastInteractionRef.current = performance.now();
              }}
            />

            <Environment preset="studio" environmentIntensity={0.25} />
            <ambientLight intensity={0.85} />
            <directionalLight position={[0, 4, 3.5]} intensity={0.75} />
            <directionalLight position={[-3, 2, 2]} intensity={0.3} />
            <directionalLight position={[3, 2, 2]} intensity={0.3} />
            {/* Backlight specifically illuminating the back cover during 360 spin */}
            <directionalLight position={[0, 3, -3.5]} intensity={0.45} />

            {/* Completely soft contact shadow without any hard shadow plane borders */}
            <ContactShadows
              position={[0, -1.3, 0]}
              opacity={0.45}
              scale={8.5}
              blur={2.6}
              far={3}
            />
          </Suspense>
        </Canvas>

        {/* Floating Read Magazine CTA Badge */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-6 z-20 pointer-events-none">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/80 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase border border-white/15 shadow-xl group-hover:border-[#00a8ff] group-hover:bg-[#00a8ff] group-hover:text-black transition-all duration-300 pointer-events-auto">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span>Read Magazine</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagazineShowcase;
