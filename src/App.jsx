import { useState } from "react";

const PLACES = [
  {
    id: 1,
    name: "Sky Bar",
    lat: 60,
    lon: 40,
    crowd: 3,
    line: "15 min"
  },
  {
    id: 2,
    name: "Banana Beach",
    lat: 30,
    lon: 70,
    crowd: 2,
    line: "No line"
  },
  {
    id: 3,
    name: "Burger Lab",
    lat: 75,
    lon: 65,
    crowd: 1,
    line: "5 min"
  }
];

function crowdColor(level) {
  if (level === 0) return "#9CA3AF";
  if (level === 1) return "#22C55E";
  if (level === 2) return "#F59E0B";
  return "#EF4444";
}

export default function App() {
  const [screen, setScreen] = useState("question");
  const [selected, setSelected] = useState(null);

  if (screen === "question") {
    return (
      <div style={styles.center}>
        <h1 style={styles.title}>Instantip</h1>
        <p style={styles.subtitle}>Where are you going tonight?</p>
        <button style={styles.button} onClick={() => setScreen("map")}>
          Explore Map
        </button>
      </div>
    );
  }

  return (
    <div style={styles.map}>
      {PLACES.map((p) => (
        <div
          key={p.id}
          onClick={() => setSelected(p)}
          style={{
            ...styles.place,
            top: `${p.lat}%`,
            left: `${p.lon}%`
          }}
        >
          <div
            style={{
              ...styles.pulse,
              background: crowdColor(p.crowd)
            }}
          />
          <div
            style={{
              ...styles.dot,
              background: crowdColor(p.crowd)
            }}
          />
        </div>
      ))}

      {selected && (
        <div style={styles.card}>
          <h3>{selected.name}</h3>
          <p>Crowd: {["Quiet", "Active", "Busy", "Packed"][selected.crowd]}</p>
          <p>Line: {selected.line}</p>
          <p style={{ opacity: 0.6 }}>Updated just now</p>
          <button onClick={() => setSelected(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  center: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif"
  },

  title: {
    fontSize: "40px",
    marginBottom: "10px"
  },

  subtitle: {
    fontSize: "20px",
    marginBottom: "30px"
  },

  button: {
    padding: "12px 22px",
    fontSize: "16px",
    cursor: "pointer"
  },

  map: {
    position: "relative",
    width: "100%",
    height: "100vh",
    background: "#0f172a"
  },

  place: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    cursor: "pointer"
  },

  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    position: "relative",
    zIndex: 2
  },

  pulse: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    position: "absolute",
    animation: "pulse 2s infinite",
    opacity: 0.6
  },

  card: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "220px",
    fontFamily: "sans-serif"
  }
};
