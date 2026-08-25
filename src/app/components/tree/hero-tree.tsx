"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { portalPaths } from "../../data/paths";

const TreeScene = dynamic(() => import("./tree-scene"), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl")));
  } catch {
    return false;
  }
}

export default function HeroTree() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [touchMode, setTouchMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lowPower, setLowPower] = useState(false);
  const interaction = useRef({ scroll: 0, swipe: 0, velocity: 0, pointerX: 0, pointerY: 0 });
  const touch = useRef({ id: -1, startX: 0, startY: 0, startRotation: 0, lastX: 0, horizontal: false, swiped: false });
  const selectedTouchId = useRef<string | null>(null);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 700px)");
    const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const isMobile = mobileQuery.matches;
      const isTouch = touchQuery.matches;
      const reduce = motionQuery.matches;
      setMobile(isMobile);
      setTouchMode(isTouch);
      setReducedMotion(reduce);
      setLowPower(isMobile || isTouch || reduce || (navigator.hardwareConcurrency || 4) <= 4);
    };
    update();
    setWebgl(supportsWebGL());
    setReady(true);
    mobileQuery.addEventListener("change", update);
    touchQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    return () => {
      mobileQuery.removeEventListener("change", update);
      touchQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateScroll = () => {
      frame = 0;
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect) return;
      interaction.current.scroll = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScroll);
    };
    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const startTouch = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch" || reducedMotion) return;
    touch.current = { id: event.pointerId, startX: event.clientX, startY: event.clientY, startRotation: interaction.current.swipe, lastX: event.clientX, horizontal: false, swiped: false };
  };

  const moveTouch = (event: React.PointerEvent<HTMLDivElement>) => {
    const gesture = touch.current;
    if (event.pointerId !== gesture.id || reducedMotion) return;
    const dx = event.clientX - gesture.startX;
    const dy = event.clientY - gesture.startY;
    if (!gesture.horizontal) {
      if (Math.abs(dx) < 10 || Math.abs(dx) <= Math.abs(dy) * 1.25) return;
      gesture.horizontal = true;
    }
    event.preventDefault();
    gesture.swiped = true;
    interaction.current.swipe = Math.min(0.14, Math.max(-0.14, gesture.startRotation + dx * 0.0007));
    interaction.current.velocity = Math.min(0.006, Math.max(-0.006, (event.clientX - gesture.lastX) * 0.00022));
    gesture.lastX = event.clientX;
  };

  const endTouch = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerId === touch.current.id) touch.current.id = -1;
  };

  return (
    <div
      ref={rootRef}
      className={`hero-tree ${ready && webgl ? "has-webgl" : "is-fallback"} ${activeId ? "has-active-path" : ""}`}
      aria-label="Les cinq voies de Je’Daii Tree"
      onPointerDown={startTouch}
      onPointerMove={moveTouch}
      onPointerUp={endTouch}
      onPointerCancel={endTouch}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        interaction.current.pointerX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        interaction.current.pointerY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      }}
      onMouseLeave={() => {
        interaction.current.pointerX = 0;
        interaction.current.pointerY = 0;
      }}
    >
      <div className="tree-canvas" aria-hidden="true">
        {ready && webgl && <TreeScene activeId={activeId} mobile={mobile} reducedMotion={reducedMotion} lowPower={lowPower} interaction={interaction} />}
      </div>
      <div className="tree-fallback-lines" aria-hidden="true" />
      <div className="tree-core">
        <span>JE’DAII</span>
        <strong>JE’DAII</strong>
      </div>
      <nav className="tree-paths" aria-label="Explorer les portails Je’Daii">
        {portalPaths.map((path) => (
          <a
            key={path.id}
            className={`tree-path tree-path-${path.id} ${activeId === path.id ? "is-active" : ""}`}
            href={path.href}
            target="_blank"
            rel="noreferrer"
            style={{ "--path-color": path.accent } as React.CSSProperties}
            onPointerEnter={(event) => { if (event.pointerType === "mouse") setActiveId(path.id); }}
            onPointerLeave={(event) => { if (event.pointerType === "mouse") setActiveId(null); }}
            onFocus={() => setActiveId(path.id)}
            onBlur={() => { if (!touchMode) setActiveId(null); }}
            onClick={(event) => {
              if (!touchMode) return;
              if (touch.current.swiped || selectedTouchId.current !== path.id) {
                event.preventDefault();
                touch.current.swiped = false;
                selectedTouchId.current = path.id;
                setActiveId(path.id);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === " ") {
                event.preventDefault();
                event.currentTarget.click();
              }
            }}
            aria-label={`Entrer dans ${path.title}`}
          >
            <span>{path.title}</span>
            <small>{path.description}</small>
            <ArrowUpRight aria-hidden="true" size={14} />
          </a>
        ))}
      </nav>
    </div>
  );
}
