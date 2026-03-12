import { useEffect, useMemo, useState } from "react";

const PLACES = [
  {
    id: 1,
    name: "Sky Bar",
    category: "Rooftop Bar",
    x: 67,
    y: 26,
    crowd: 3,
    line: "15 min",
    color: "#ef4444",
    logoBg: "#1d4ed8",
    logoText: "SB",
  },
  {
    id: 2,
    name: "Banana Beach",
    category: "Beach Bar",
    x: 30,
    y: 62,
    crowd: 2,
    line: "No line",
    color: "#f59e0b",
    logoBg: "#f59e0b",
    logoText: "BB",
  },
  {
    id: 3,
    name: "Burger Lab",
    category: "Late Food Spot",
    x: 58,
    y: 73,
    crowd: 1,
    line: "5 min",
    color: "#22c55e",
    logoBg: "#16a34a",
    logoText: "BL",
  },
  {
    id: 4,
    name: "Neon Club",
    category: "Club",
    x: 42,
    y: 41,
    crowd: 3,
    line: "20 min",
    color: "#ec4899",
    logoBg: "#a21caf",
    logoText: "NC",
  },
];

function crowdLabel(level) {
  if (level === 0) return "Quiet";
  if (level === 1) return "Active";
  if (level === 2) return "Busy";
  return "Packed";
}

function crowdDots(level) {
  const filled = level + 1;
  return Array.from({ length: 4 }, (_, i) => i < filled);
}

function SplashScreen({ onEnter, fadeOut }) {
  return (
    <div
      style={{
        ...styles.splash,
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? "scale(0.985)" : "scale(1)",
        transition: "opacity 700ms ease, transform 700ms ease",
      }}
    >
      <div style={styles.splashInner}>
        <div style={styles.splashGlow} />
        <div style={styles.splashIconWrap}>
          <svg
            width="126"
            height="126"
            viewBox="0 0 126 126"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={styles.splashIcon}
          >
            <circle cx="63" cy="63" r="52" fill="rgba(56, 189, 248, 0.08)" />
            <path
              d="M31 85L48 76L63 82L79 73L95 79V42L79 36L63 45L48 39L31 47V85Z"
              stroke="rgba(255,255,255,0.68)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M48 39V76"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M79 36V73"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="81" cy="33" r="17" fill="#38bdf8" />
            <path
              d="M73 33C73 29.6863 75.6863 27 79 27H82C85.3137 27 88 29.6863 88 33C88 36.3137 85.3137 39 82 39H78L73 43V33Z"
              fill="white"
            />
            <circle cx="49" cy="59" r="5.5" fill="#ec4899" />
          </svg>
        </div>

        <div style={styles.logo}>Instantip</div>
        <div style={styles.tagline}>Where are you going tonight?</div>
        <button style={styles.enterButton} onClick={onEnter}>
          Open Live Map
        </button>
      </div>
    </div>
  );
}

function NightMap({ places, selected, onSelect, onClose }) {
  const selectedPlace = useMemo(
    () => places.find((p) => p.id === selected) || null,
    [places, selected]
  );

  return (
    <div style={styles.appShell}>
      <div style={styles.topOverlay}>
        <div style={styles.appTitle}>Instantip</div>
        <div style={styles.appSubTitle}>Live nightlife map</div>
      </div>

      <div style={styles.mapContainer}>
        <NightlifeMapBackground />

        {places.map((place) => (
          <button
            key={place.id}
            onClick={() => onSelect(place.id)}
            style={{
              ...styles.placeButton,
              left: `${place.x}%`,
              top: `${place.y}%`,
            }}
            aria-label={place.name}
          >
            <span
              style={{
                ...styles.pulseRing,
                background: `${place.color}22`,
                boxShadow: `0 0 0 1px ${place.color}22`,
              }}
            />
            <span
              style={{
                ...styles.pulseRingTwo,
                background: `${place.color}18`,
                boxShadow: `0 0 0 1px ${place.color}14`,
              }}
            />
            <span
              style={{
                ...styles.placeDot,
                background: place.color,
                boxShadow: `0 0 18px ${place.color}`,
              }}
            />
          </button>
        ))}

        <div style={styles.legend}>
          <LegendPill color="#22c55e" label="Active" />
          <LegendPill color="#f59e0b" label="Busy" />
          <LegendPill color="#ef4444" label="Packed" />
        </div>

        {selectedPlace && (
          <>
            <div style={styles.sheetBackdrop} onClick={onClose} />
            <div style={styles.bottomSheet}>
              <div style={styles.sheetHandle} />

              <div style={styles.sheetHeader}>
                <div
                  style={{
                    ...styles.logoBadge,
                    background: `linear-gradient(135deg, ${selectedPlace.logoBg}, ${selectedPlace.color})`,
                    boxShadow: `0 10px 28px ${selectedPlace.color}55`,
                  }}
                >
                  {selectedPlace.logoText}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={styles.sheetPlaceName}>{selectedPlace.name}</div>
                  <div style={styles.sheetPlaceCategory}>
                    {selectedPlace.category}
                  </div>
                </div>

                <button style={styles.closeX} onClick={onClose}>
                  ✕
                </button>
              </div>

              <div style={styles.liveRow}>
                <span
                  style={{
                    ...styles.liveDot,
                    background: selectedPlace.color,
                    boxShadow: `0 0 12px ${selectedPlace.color}`,
                  }}
                />
                <span style={styles.liveText}>LIVE NOW</span>
                <span style={styles.updatedText}>Updated just now</span>
              </div>

              <div style={styles.signalGrid}>
                <div style={styles.signalCard}>
                  <div style={styles.signalLabel}>Crowd</div>
                  <div style={styles.signalValue}>{crowdLabel(selectedPlace.crowd)}</div>
                  <div style={styles.dotScale}>
                    {crowdDots(selectedPlace.crowd).map((filled, idx) => (
                      <span
                        key={idx}
                        style={{
                          ...styles.scaleDot,
                          background: filled ? selectedPlace.color : "#24324d",
                          boxShadow: filled ? `0 0 10px ${selectedPlace.color}` : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div style={styles.signalCard}>
                  <div style={styles.signalLabel}>Line</div>
                  <div style={styles.signalValue}>{selectedPlace.line}</div>
                  <div style={styles.microHint}>Human signal from the place</div>
                </div>
              </div>

              <div style={styles.sheetFooterText}>
                Real-time status from people already there
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function LegendPill({ color, label }) {
  return (
    <div style={styles.legendPill}>
      <span
        style={{
          ...styles.legendDot,
          background: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
      <span>{label}</span>
    </div>
  );
}

function NightlifeMapBackground() {
  return (
    <svg
      viewBox="0 0 1000 1800"
      preserveAspectRatio="none"
      style={styles.mapSvg}
    >
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#071227" />
          <stop offset="55%" stopColor="#0a1630" />
          <stop offset="100%" stopColor="#0c1022" />
        </linearGradient>

        <linearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#081a36" />
          <stop offset="100%" stopColor="#0b2550" />
        </linearGradient>

        <filter id="neonGlow">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="1000" height="1800" fill="url(#bgGrad)" />

      <path
        d="M0 0H210C245 90 268 185 250 320C232 452 184 548 152 692C122 827 136 952 186 1084C226 1188 234 1304 196 1438C174 1516 140 1614 116 1800H0V0Z"
        fill="url(#waterGrad)"
        opacity="0.95"
      />

      <g opacity="0.17">
        <rect x="280" y="180" width="130" height="82" rx="14" fill="#14233f" />
        <rect x="438" y="160" width="180" height="110" rx="16" fill="#13213b" />
        <rect x="654" y="192" width="128" height="84" rx="16" fill="#14233f" />
        <rect x="290" y="344" width="180" height="118" rx="16" fill="#13213b" />
        <rect x="510" y="370" width="210" height="110" rx="18" fill="#14233f" />
        <rect x="742" y="356" width="116" height="96" rx="16" fill="#13213b" />
        <rect x="250" y="560" width="190" height="124" rx="18" fill="#14233f" />
        <rect x="470" y="580" width="140" height="88" rx="16" fill="#13213b" />
        <rect x="640" y="548" width="210" height="128" rx="18" fill="#14233f" />
        <rect x="300" y="810" width="140" height="100" rx="18" fill="#13213b" />
        <rect x="472" y="798" width="210" height="132" rx="18" fill="#14233f" />
        <rect x="710" y="822" width="126" height="94" rx="16" fill="#13213b" />
        <rect x="250" y="1032" width="198" height="124" rx="18" fill="#14233f" />
        <rect x="476" y="1048" width="134" height="94" rx="16" fill="#13213b" />
        <rect x="638" y="1024" width="214" height="134" rx="18" fill="#14233f" />
        <rect x="284" y="1270" width="150" height="100" rx="16" fill="#13213b" />
        <rect x="462" y="1258" width="220" height="128" rx="18" fill="#14233f" />
        <rect x="710" y="1278" width="118" height="92" rx="16" fill="#13213b" />
      </g>

      <g opacity="0.52" stroke="#20304f" strokeLinecap="round">
        <path d="M248 126C392 188 586 176 842 126" strokeWidth="16" />
        <path d="M238 302C420 356 654 342 884 288" strokeWidth="12" />
        <path d="M234 496C402 542 648 534 898 476" strokeWidth="18" />
        <path d="M224 724C448 780 664 772 898 710" strokeWidth="14" />
        <path d="M240 970C404 1018 630 1008 888 952" strokeWidth="16" />
        <path d="M232 1218C424 1272 664 1260 892 1206" strokeWidth="12" />
        <path d="M240 1450C452 1506 680 1496 892 1440" strokeWidth="18" />
      </g>

      <g opacity="0.75" stroke="#2f4770" strokeLinecap="round">
        <path d="M360 84V1600" strokeWidth="7" />
        <path d="M530 64V1622" strokeWidth="6" />
        <path d="M692 82V1620" strokeWidth="7" />
        <path d="M830 106V1610" strokeWidth="5" />
      </g>

      <g filter="url(#neonGlow)" opacity="0.22">
        <circle cx="424" cy="726" r="110" fill="#ec4899" />
        <circle cx="690" cy="468" r="90" fill="#f59e0b" />
        <circle cx="566" cy="1280" r="120" fill="#22c55e" />
      </g>

      <g opacity="0.65" fill="#6f8db8" fontSize="28" fontFamily="sans-serif">
        <text x="116" y="274">Coastline</text>
        <text x="620" y="332">Central Strip</text>
        <text x="510" y="1010">Night Quarter</text>
      </g>
    </svg>
  );
}

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [fadeSplash, setFadeSplash] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes pulseRing {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.55;
        }
        100% {
          transform: translate(-50%, -50%) scale(3.4);
          opacity: 0;
        }
      }

      @keyframes pulseRingTwo {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0;
        }
        35% {
          opacity: 0.32;
        }
        100% {
          transform: translate(-50%, -50%) scale(2.7);
          opacity: 0;
        }
      }

      @keyframes sheetRise {
        from {
          transform: translateY(24px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const enterMap = () => {
    setFadeSplash(true);
    setTimeout(() => setScreen("map"), 650);
  };

  if (screen === "splash") {
    return <SplashScreen onEnter={enterMap} fadeOut={fadeSplash} />;
  }

  return (
    <NightMap
      places={PLACES}
      selected={selectedPlaceId}
      onSelect={setSelectedPlaceId}
      onClose={() => setSelectedPlaceId(null)}
    />
  );
}

const styles = {
  splash: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, rgba(236,72,153,0.16), transparent 28%), linear-gradient(180deg, #071227 0%, #0b1530 58%, #0c1022 100%)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    position: "relative",
    overflow: "hidden",
  },
  splashInner: {
    maxWidth: "360px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
  },
  splashGlow: {
    position: "absolute",
    width: "240px",
    height: "240px",
    borderRadius: "50%",
    background: "rgba(236,72,153,0.14)",
    filter: "blur(38px)",
    top: "18px",
    zIndex: -1,
  },
  splashIconWrap: {
    marginBottom: "18px",
  },
  splashIcon: {
    display: "block",
    filter:
      "drop-shadow(0 10px 30px rgba(56, 189, 248, 0.18)) drop-shadow(0 0 24px rgba(236,72,153,0.14))",
  },
  logo: {
    fontSize: "42px",
    fontWeight: 800,
    letterSpacing: "-0.04em",
    marginBottom: "12px",
    fontFamily: "Inter, sans-serif",
  },
  tagline: {
    fontSize: "22px",
    fontWeight: 700,
    lineHeight: 1.2,
    maxWidth: "290px",
    marginBottom: "24px",
    color: "rgba(255,255,255,0.92)",
    fontFamily: "Inter, sans-serif",
  },
  enterButton: {
    border: "none",
    borderRadius: "14px",
    padding: "14px 20px",
    fontSize: "16px",
    fontWeight: 800,
    background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
    color: "#ffffff",
    cursor: "pointer",
    boxShadow: "0 16px 36px rgba(236,72,153,0.28)",
  },

  appShell: {
    minHeight: "100vh",
    background: "#071227",
    color: "#ffffff",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Inter, sans-serif",
  },
  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
    padding: "18px 18px 0",
    pointerEvents: "none",
  },
  appTitle: {
    fontSize: "24px",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    marginBottom: "4px",
  },
  appSubTitle: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.72)",
  },

  mapContainer: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  },
  mapSvg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    display: "block",
  },

  placeButton: {
    position: "absolute",
    width: "24px",
    height: "24px",
    transform: "translate(-50%, -50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    zIndex: 4,
  },
  placeDot: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 3,
  },
  pulseRing: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "18px",
    height: "18px",
    borderRadius: "999px",
    transform: "translate(-50%, -50%)",
    animation: "pulseRing 2.2s infinite ease-out",
    zIndex: 1,
  },
  pulseRingTwo: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "16px",
    height: "16px",
    borderRadius: "999px",
    transform: "translate(-50%, -50%)",
    animation: "pulseRingTwo 2.2s infinite ease-out",
    animationDelay: "0.4s",
    zIndex: 0,
  },

  legend: {
    position: "absolute",
    top: "78px",
    left: "16px",
    right: "16px",
    zIndex: 5,
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  legendPill: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(7,18,39,0.66)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.88)",
    borderRadius: "999px",
    padding: "8px 12px",
    fontSize: "12px",
    backdropFilter: "blur(10px)",
  },
  legendDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },

  sheetBackdrop: {
    position: "absolute",
    inset: 0,
    background: "rgba(4,10,23,0.26)",
    zIndex: 8,
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9,
    background:
      "linear-gradient(180deg, rgba(18,26,46,0.98) 0%, rgba(11,16,32,0.99) 100%)",
    borderTopLeftRadius: "26px",
    borderTopRightRadius: "26px",
    padding: "12px 18px 26px",
    boxShadow: "0 -20px 60px rgba(0,0,0,0.45)",
    animation: "sheetRise 220ms ease-out",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  sheetHandle: {
    width: "44px",
    height: "5px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.22)",
    margin: "0 auto 14px",
  },
  sheetHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "14px",
  },
  logoBadge: {
    width: "56px",
    height: "56px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: 900,
    fontSize: "18px",
    letterSpacing: "-0.03em",
    flexShrink: 0,
  },
  sheetPlaceName: {
    fontSize: "24px",
    fontWeight: 800,
    lineHeight: 1.05,
    marginBottom: "5px",
  },
  sheetPlaceCategory: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.62)",
  },
  closeX: {
    width: "36px",
    height: "36px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.06)",
    color: "#ffffff",
    cursor: "pointer",
    flexShrink: 0,
  },
  liveRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "14px",
  },
  liveDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },
  liveText: {
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "0.06em",
    color: "rgba(255,255,255,0.88)",
  },
  updatedText: {
    marginLeft: "auto",
    fontSize: "12px",
    color: "rgba(255,255,255,0.5)",
  },

  signalGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "16px",
  },
  signalCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "18px",
    padding: "14px",
  },
  signalLabel: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.56)",
    marginBottom: "8px",
  },
  signalValue: {
    fontSize: "20px",
    fontWeight: 800,
    marginBottom: "10px",
  },
  dotScale: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  scaleDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
  },
  microHint: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.44)",
    lineHeight: 1.35,
  },
  sheetFooterText: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.56)",
    textAlign: "center",
  },
};
