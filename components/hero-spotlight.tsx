"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";

export function HeroSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const rect0 = el.getBoundingClientRect();
    const pos = { x: rect0.width / 2, y: rect0.height / 2 };

    const apply = () => {
      el.style.setProperty("--spot-x", `${pos.x}px`);
      el.style.setProperty("--spot-y", `${pos.y}px`);
    };
    apply();

    if (reduceMotion) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }

      gsap.to(pos, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        duration: 1.2,
        ease: "power3.out",
        overwrite: "auto",
        onUpdate: apply,
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const style: CSSProperties = {
    backgroundImage: "url(/hero-mesh.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "saturate(1.8) brightness(1.12)",
    WebkitMaskImage:
      "radial-gradient(circle 300px at var(--spot-x, 50%) var(--spot-y, 50%), rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 45%, transparent 72%)",
    maskImage:
      "radial-gradient(circle 300px at var(--spot-x, 50%) var(--spot-y, 50%), rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 45%, transparent 72%)",
    willChange: "mask-position, -webkit-mask-position",
  };

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={style}
    />
  );
}
