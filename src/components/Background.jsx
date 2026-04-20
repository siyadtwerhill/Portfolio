// src/components/Background.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Background = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const orbs = containerRef.current.querySelectorAll(".orb");

    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        x: gsap.utils.random(-80, 80),
        y: gsap.utils.random(-80, 80),
        scale: gsap.utils.random(0.85, 1.15),
        duration: gsap.utils.random(6, 10),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 1.2,
      });
    });
  }, []);

  return (
    <div ref={containerRef} style={{
      position: "fixed", inset: 0, zIndex: 0,
      background: "#050a18", overflow: "hidden", pointerEvents: "none",
    }}>
      {/* Orb 1 — blue, top right */}
      <div className="orb" style={{
        position: "absolute", top: "-10%", right: "-8%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(79,110,247,0.2) 0%, transparent 70%)",
      }} />
      {/* Orb 2 — purple, bottom left */}
      <div className="orb" style={{
        position: "absolute", bottom: "5%", left: "-10%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
      }} />
      {/* Orb 3 — cyan, center */}
      <div className="orb" style={{
        position: "absolute", top: "40%", left: "40%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
      }} />

      {/* Grain overlay */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
    </div>
  );
};

export default Background;