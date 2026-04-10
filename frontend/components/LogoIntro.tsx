"use client";

import React, { useState, useEffect, useRef, CSSProperties } from "react";

export default function LogoIntro({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const tickRef = useRef<SVGGElement>(null);

  const dismiss = () => {
    const s = document.getElementById("dd-scene");
    if (s) {
      s.style.transition = "all 0.6s ease"; // Snappier exit
      s.style.opacity = "0";
      s.style.transform = "scale(1.02)";
      s.style.filter = "blur(10px)";
      s.style.pointerEvents = "none";
    }
    setTimeout(() => setHidden(true), 700);
  };

  useEffect(() => {
    const g = tickRef.current;
    if (g) {
      const ns = "http://www.w3.org/2000/svg";
      for (let i = 0; i < 48; i++) {
        const a = (i * Math.PI * 2) / 48;
        const maj = i % 6 === 0;
        const r1 = 148, r2 = maj ? 133 : 140;
        const l = document.createElementNS(ns, "line");
        l.setAttribute("x1", (160 + r1 * Math.cos(a)).toFixed(2));
        l.setAttribute("y1", (160 + r1 * Math.sin(a)).toFixed(2));
        l.setAttribute("x2", (160 + r2 * Math.cos(a)).toFixed(2));
        l.setAttribute("y2", (160 + r2 * Math.sin(a)).toFixed(2));
        
        l.setAttribute("stroke", maj ? "oklch(0.58 0.23 285)" : "oklch(0.52 0.22 270)");
        l.setAttribute("stroke-width", maj ? "1.8" : "1.0");
        l.setAttribute("opacity", maj ? "0.9" : "0.5");
        g.appendChild(l);
      }
    }

    const autoExit = setTimeout(dismiss, 6000); // Faster overall exit
    const onScroll = () => { if (window.scrollY > 40) dismiss(); };
    window.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(autoExit);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const primaryColor = "oklch(0.58 0.23 285)";
  const accentColor = "oklch(0.52 0.22 270)";
  const bgColor = "oklch(0.99 0.002 280)";

  return (
    <>
      <style>{`
        @keyframes dd-draw  { to { stroke-dashoffset: 0; } }
        @keyframes dd-fin   { from { opacity: 0; } to { opacity: 1; } }
        @keyframes dd-bloom { 0% { opacity:0; letter-spacing:0.8em; filter: blur(5px); } 100% { opacity:1; letter-spacing:0.32em; filter: blur(0px); } }
        @keyframes dd-line  { to { transform: scaleX(1); } }
        @keyframes dd-pulse { 0%, 100% { opacity: 0.05; transform: scale(1); } 50% { opacity: 0.12; transform: scale(1.1); } }
      `}</style>

      {!hidden && (
        <div
          id="dd-scene"
          onClick={dismiss}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#ffffff",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            cursor: "pointer", overflow: "hidden",
            padding: "48px 20px",
          } as CSSProperties}
        >
          {/* CORE LOGO GLOWS */}
          <div 
            style={{
              position: 'absolute', width: '600px', height: '600px',
              background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`,
              filter: 'blur(100px)', opacity: 0.08,
              animation: 'dd-pulse 6s ease-in-out infinite'
            }}
          />
          <div 
            style={{
              position: 'absolute', width: '400px', height: '400px',
              background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
              filter: 'blur(70px)', opacity: 0.1,
              animation: 'dd-pulse 8s ease-in-out infinite reverse'
            }}
          />

          <svg width="340" height="340" viewBox="0 0 320 320"
            xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, overflow: "visible", position: 'relative', zIndex: 10 }}>
            <defs>
              <path id="dd-ta" d="M35,160 A125,125 0 0,0 285,160" />
              <filter id="glow-sharp">
                <feGaussianBlur stdDeviation="1.0" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Faster concentric builds */}
            <circle cx="160" cy="160" r="148" fill="none" stroke={primaryColor} strokeWidth="2"
              style={{ strokeDasharray: 930, strokeDashoffset: 930, animation: "dd-draw 1s cubic-bezier(.4,0,.2,1) 0.2s forwards", filter: "url(#glow-sharp)" }} />

            <g ref={tickRef} opacity="0" style={{ animation: "dd-fin .3s ease 0.8s forwards" }} />

            <circle cx="160" cy="160" r="130" fill="none" stroke={accentColor} strokeWidth="1.2" opacity=".6"
              style={{ strokeDasharray: 817, strokeDashoffset: 817, animation: "dd-draw 0.8s ease 1s forwards" }} />

            <circle cx="160" cy="160" r="108" fill="none" stroke={primaryColor} strokeWidth="1" opacity=".4"
              style={{ strokeDasharray: 679, strokeDashoffset: 679, animation: "dd-draw 0.6s ease 1.3s forwards" }} />

            <g opacity="0" style={{ animation: "dd-fin .3s ease 1.5s forwards" }}>
              <polygon points="160,45 164,54 160,63 156,54" fill={primaryColor} />
              <polygon points="271,160 262,164 253,160 262,156" fill={primaryColor} />
              <polygon points="160,275 164,266 160,257 156,266" fill={primaryColor} />
              <polygon points="49,160 58,164 67,160 58,156" fill={primaryColor} />
            </g>

            <polygon points="242,160 201,231 119,231 78,160 119,89 201,89"
              fill="none" stroke={primaryColor} strokeWidth="1.8"
              style={{ strokeDasharray: 492, strokeDashoffset: 492, animation: "dd-draw 0.8s ease 1.8s forwards", filter: "url(#glow-sharp)" }} />

            <polygon points="210,189 160,218 110,189 110,131 160,102 210,131"
              fill="none" stroke={accentColor} strokeWidth="1" opacity=".5"
              style={{ strokeDasharray: 348, strokeDashoffset: 348, animation: "dd-draw 0.6s ease 2.2s forwards" }} />

            <g style={{ filter: "url(#glow-sharp)" }}>
              <line x1="160" y1="138" x2="160" y2="186" fill="none" stroke={primaryColor} strokeWidth="1.8"
                style={{ strokeDasharray: 48, strokeDashoffset: 48, animation: "dd-draw .4s ease 2.6s forwards" }} />
              <line x1="128" y1="152" x2="192" y2="152" fill="none" stroke={primaryColor} strokeWidth="1.8"
                style={{ strokeDasharray: 64, strokeDashoffset: 64, animation: "dd-draw .4s ease 2.8s forwards" }} />
              <line x1="128" y1="152" x2="128" y2="160" fill="none" stroke={primaryColor} strokeWidth="1.2"
                style={{ strokeDasharray: 8, strokeDashoffset: 8, animation: "dd-draw .3s ease 3.0s forwards" }} />
              <line x1="192" y1="152" x2="192" y2="160" fill="none" stroke={primaryColor} strokeWidth="1.2"
                style={{ strokeDasharray: 8, strokeDashoffset: 8, animation: "dd-draw .3s ease 3.0s forwards" }} />
              <path d="M120,160 Q128,170 136,160" fill="none" stroke={accentColor} strokeWidth="1.2"
                style={{ strokeDasharray: 26, strokeDashoffset: 26, animation: "dd-draw .4s ease 3.2s forwards" }} />
              <path d="M184,160 Q192,170 200,160" fill="none" stroke={accentColor} strokeWidth="1.2"
                style={{ strokeDasharray: 26, strokeDashoffset: 26, animation: "dd-draw .4s ease 3.2s forwards" }} />
              <line x1="154" y1="186" x2="166" y2="186" fill="none" stroke={primaryColor} strokeWidth="1.5"
                style={{ strokeDasharray: 12, strokeDashoffset: 12, animation: "dd-draw .3s ease 3.4s forwards" }} />
              <circle cx="160" cy="160" r="2.5" fill={primaryColor} opacity="0"
                style={{ animation: "dd-fin .4s ease 3.6s forwards" }} />
            </g>

            <text fontSize="10" fill={primaryColor}
              letterSpacing="7" opacity="0" fontWeight="700"
              style={{ animation: "dd-fin 0.8s ease 3.8s forwards", fontFamily: "sans-serif" }}>
              <textPath href="#dd-ta" startOffset="50%" textAnchor="middle">
                DASTOOR DESK
              </textPath>
            </text>
          </svg>

          <div style={{ textAlign: "center", marginTop: 16, position: 'relative', zIndex: 10 }}>
            <h1 style={{
              fontWeight: 700,
              fontSize: "clamp(26px, 4.5vw, 40px)",
              color: "#1a1a1a",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              margin: 0, opacity: 0,
              fontFamily: "sans-serif",
              animation: "dd-bloom 1.2s cubic-bezier(.16,1,.3,1) 4.0s forwards",
            } as CSSProperties}>
              <span style={{
                background: `linear-gradient(to right, ${primaryColor}, ${accentColor}, ${primaryColor})`,
                WebkitBackgroundClip: "text",
                ["WebkitTextFillColor" as any]: "transparent"
              } as any}>
                Dastoor Desk
              </span>
            </h1>

            <div style={{
              height: "2px", width: 220, margin: "20px auto",
              background: `linear-gradient(to right, transparent, ${primaryColor}, transparent)`,
              opacity: 0.5,
              transform: "scaleX(0)", transformOrigin: "center",
              animation: "dd-line 0.8s ease 4.6s forwards",
            } as CSSProperties} />

            <p style={{
              fontWeight: 500, fontSize: 13, color: "rgba(0,0,0,0.5)",
              letterSpacing: "0.18em", margin: 0, opacity: 0,
              fontFamily: "sans-serif",
              animation: "dd-fin 0.8s ease 4.9s forwards",
            } as CSSProperties}>Justice Powered by AI</p>

            <p style={{
              fontSize: 10,
              color: primaryColor,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginTop: 40, opacity: 0,
              fontWeight: 800,
              fontFamily: "sans-serif",
              animation: "dd-fin 0.6s ease 5.4s forwards",
            } as CSSProperties}>Click anywhere to enter</p>
          </div>
        </div>
      )}

      <div style={!hidden ? { height: "100vh", overflow: "hidden", pointerEvents: "none" } : { transition: "opacity 1s ease", opacity: 1 }}>
        {children}
      </div>
    </>
  );
}