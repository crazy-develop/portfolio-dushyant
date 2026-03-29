import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());

  useEffect(() => {
    let isMounted = true;
    let animationId: number;
    let activeCharacter: THREE.Object3D | null = null;
    let cleanupHover: (() => void) | undefined;
    let debounce: number | undefined;
    let isTouching = false;
    let renderer: THREE.WebGLRenderer | undefined;

    let onTouchMove: ((e: TouchEvent) => void) | undefined;
    let onTouchStart: ((e: TouchEvent) => void) | undefined;
    let onTouchEnd: ((e: TouchEvent) => void) | undefined;
    let onMouseMove: ((e: MouseEvent) => void) | undefined;
    let onResize: (() => void) | undefined;
    let landingDiv = document.getElementById("landingDiv");

    if (canvasDiv.current) {
      const scene = sceneRef.current;


      try {
        let rect = canvasDiv.current.getBoundingClientRect();
        let container = { width: rect.width, height: rect.height };
        const aspect = container.width / container.height;

        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power"
        });
        renderer.setSize(container.width, container.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        canvasDiv.current.appendChild(renderer.domElement);

        const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
        camera.position.z = 10;
        camera.position.set(0, 13.1, 24.7);
        camera.zoom = 1.1;
        camera.updateProjectionMatrix();

        let headBone: THREE.Object3D | null = null;
        let screenLight: any | null = null;
        let mixer: THREE.AnimationMixer;

        const clock = new THREE.Clock();
        const light = setLighting(scene);
        const { loadCharacter } = setCharacter(camera);

        loadCharacter().then((gltf) => {
          if (!isMounted) return;
          if (gltf) {
            const animations = setAnimations(gltf);
            if (hoverDivRef.current) {
              cleanupHover = animations.hover(gltf, hoverDivRef.current);
            }
            mixer = animations.mixer;
            activeCharacter = gltf.scene;
            scene.add(activeCharacter);
            headBone = activeCharacter.getObjectByName("spine006") || null;
            screenLight = activeCharacter.getObjectByName("screenlight") || null;
            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 500);
          }
        }).catch((e) => {
          if (!isMounted) return;
          console.error("Character Loader error:", e);
        });

        let mouse = { x: 0, y: 0 },
          interpolation = { x: 0.1, y: 0.2 };

        onMouseMove = (event: MouseEvent) => {
          handleMouseMove(event, (x, y) => (mouse = { x, y }));
        };
        
        onTouchMove = (e: TouchEvent) => {
           handleTouchMove(e, (x, y) => (mouse = { x, y }));
        };

        onTouchStart = (event: TouchEvent) => {
          const element = event.target as HTMLElement;
          debounce = setTimeout(() => {
            if (!isTouching) {
              isTouching = true;
              element?.addEventListener("touchmove", onTouchMove!);
            }
          }, 200);
        };

        onTouchEnd = (event: TouchEvent) => {
          const element = event.target as HTMLElement;
          if (isTouching) {
              element?.removeEventListener("touchmove", onTouchMove!);
              isTouching = false;
          }
          handleTouchEnd((x, y, interpolationX, interpolationY) => {
            mouse = { x, y };
            interpolation = { x: interpolationX, y: interpolationY };
          });
        };

        onResize = () => {
          if (activeCharacter && renderer) {
            handleResize(renderer, camera, canvasDiv, activeCharacter);
          }
        };

        window.addEventListener("resize", onResize);
        document.addEventListener("mousemove", onMouseMove);
        
        if (landingDiv) {
          landingDiv.addEventListener("touchstart", onTouchStart, { passive: true });
          landingDiv.addEventListener("touchend", onTouchEnd);
        }
        
        const animate = () => {
          animationId = requestAnimationFrame(animate);
          if (headBone) {
            handleHeadRotation(
              headBone,
              mouse.x,
              mouse.y,
              interpolation.x,
              interpolation.y,
              THREE.MathUtils.lerp
            );
            if (light.setPointLight && screenLight) {
              light.setPointLight(screenLight);
            }
          }
          const delta = clock.getDelta();
          if (mixer) {
            mixer.update(delta);
          }
          if (renderer) {
            renderer.render(scene, camera);
          }
        };
        animate();
      } catch (e) {
        console.error("Three.js setup error:", e);
      }
    }

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationId);
      clearTimeout(debounce);
      if (cleanupHover) cleanupHover();
      sceneRef.current.clear();
      if (renderer) {
        renderer.dispose();
      }
      if (onResize) window.removeEventListener("resize", onResize);
      if (onMouseMove) document.removeEventListener("mousemove", onMouseMove);
      
      if (canvasDiv.current && renderer?.domElement) {
        try {
          canvasDiv.current.removeChild(renderer.domElement);
        } catch(e) {}
      }
      if (landingDiv) {
        if (onTouchStart) landingDiv.removeEventListener("touchstart", onTouchStart);
        if (onTouchEnd) landingDiv.removeEventListener("touchend", onTouchEnd);
        if (onTouchMove) landingDiv.removeEventListener("touchmove", onTouchMove);
      }
    };
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
