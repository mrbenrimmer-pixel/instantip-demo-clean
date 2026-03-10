import { useEffect, useMemo, useState } from "react";

const places = [
  {
    id: "banana-beach",
    name: "Banana Beach",
    area: "Koh Phangan",
    travelersNow: 4,
    availableToChat: 2,
    crowdLevel: "Moderate",
    worthComing: { yes: 3, no: 1 },
    vibe: "Chill sunset crowd",
    lastUpdate: "3 minutes ago",
    responderPrompt: {
      askedAgo: "30 seconds ago",
      question: "How crowded is it right now?",
    },
    suggestedQuestions: [
      "How crowded is it?",
      "Is it worth coming now?",
      "How's the water today?",
    ],
    questions: [
      {
        id: 1,
        author: "Alex",
        time: "2m ago",
        text: "How crowded is it right now?",
        replies: [
          {
            id: 11,
            author: "Maya",
            meta: "120m away",
            text: "Pretty relaxed. Lots of space.",
          },
          {
            id: 12,
            author: "Tom",
            meta: "arrived 10m ago",
            text: "Getting busier near the bar.",
          },
        ],
      },
      {
        id: 2,
        author: "Luca",
        time: "8m ago",
        text: "Is the sunset good today?",
        replies: [
          {
            id: 21,
            author: "Nina",
            meta: "80m away",
            text: "Yes. Really good colors right now.",
          },
        ],
      },
    ],
    recentTips: [
      { id: 101, time: "12m ago", text: "Sunset incredible right now." },
      { id: 102, time: "25m ago", text: "Water very warm today." },
      { id: 103, time: "1h ago", text: "Parking almost full." },
    ],
  },
  {
    id: "sky-bar",
    name: "Sky Bar",
    area: "Bangkok",
    travelersNow: 6,
    availableToChat: 3,
    crowdLevel: "Busy",
    worthComing: { yes: 4, no: 2 },
    vibe: "Loud, dressy, high-energy",
    lastUpdate: "5 minutes ago",
    responderPrompt: {
      askedAgo: "1 minute ago",
      question: "Is there a line to get in?",
    },
    suggestedQuestions: [
      "Is there a line?",
      "What's the vibe tonight?",
      "Is it worth coming now?",
    ],
    questions: [
      {
        id: 3,
        author: "James",
        time: "5m ago",
        text: "Is there a line to get in?",
        replies: [
          {
            id: 31,
            author: "Anna",
            meta: "at entrance",
            text: "About 20 minutes right now.",
          },
          {
            id: 32,
            author: "Leo",
            meta: "inside now",
            text: "Worth it though. View is amazing tonight.",
          },
        ],
      },
    ],
    recentTips: [
      { id: 201, time: "10m ago", text: "Music is good but it's crowded." },
      { id: 202, time: "18m ago", text: "Dress code seems enforced tonight." },
      { id: 203, time: "42m ago", text: "Tables almost fully booked." },
    ],
  },
  {
    id: "barceloneta",
    name: "La Barceloneta Beach",
    area: "Barcelona",
    travelersNow: 3,
    availableToChat: 1,
    crowdLevel: "Moderate",
    worthComing: { yes: 2, no: 1 },
    vibe: "Sunny, easy, touristy",
    lastUpdate: "7 minutes ago",
    responderPrompt: {
      askedAgo: "45 seconds ago",
      question: "How's the water today?",
    },
    suggestedQuestions: [
      "How crowded is it?",
      "How's the water today?",
      "Is it worth coming now?",
    ],
    questions: [
      {
        id: 4,
        author: "Sophie",
        time: "4m ago",
        text: "How's the water today?",
        replies: [
          {
            id: 41,
            author: "Carlos",
            meta: "just arrived",
            text: "Warm enough. A bit windy though.",
          },
        ],
      },
    ],
    recentTips: [
      { id: 301, time: "9m ago", text: "Good swimming, a bit windy." },
      { id: 302, time: "21m ago", text: "Crowd building slowly." },
      {
        id: 303,
        time: "50m ago",
        text: "Lots of free sand space near the south end.",
      },
    ],
  },
  {
    id: "carmel-market",
    name: "Shuk HaCarmel",
    area: "Tel Aviv",
    travelersNow: 5,
    availableToChat: 2,
    crowdLevel: "Busy",
    worthComing: { yes: 3, no: 2 },
    vibe: "Loud, colorful, packed",
    lastUpdate: "4 minutes ago",
    responderPrompt: {
      askedAgo: "20 seconds ago",
      question: "Are most stalls open right now?",
    },
    suggestedQuestions: [
      "How crowded is it?",
      "Is it worth coming now?",
      "Are most stalls open?",
    ],
    questions: [
      {
        id: 5,
        author: "Dana",
        time: "3m ago",
        text: "Are most stalls open right now?",
        replies: [
          {
            id: 51,
            author: "Avi",
            meta: "inside market",
            text: "Yes, but some food places are packed.",
          },
        ],
      },
    ],
    recentTips: [
      { id: 401, time: "6m ago", text: "Very crowded near the main entrance." },
      { id: 402, time: "19m ago", text: "Fresh juice stands are busy." },
      { id: 403, time: "37m ago", text: "Best to enter from the side streets." },
    ],
  },
];

function SplashScreen({ fadeOut }) {
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
        <div style={styles.splashIconWrap}>
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={styles.splashIcon}
          >
            <rect
              x="18"
              y="42"
              width="84"
              height="52"
              rx="18"
              fill="rgba(255,255,255,0.08)"
            />
            <path
              d="M30 84L46 76L60 82L74 74L90 80V42L74 36L60 44L46 38L30 46V84Z"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M46 38V76"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M74 36V74"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="76" cy="34" r="16" fill="#38bdf8" />
            <path
              d="M69 34C69 30.6863 71.6863 28 75 28H77C80.3137 28 83 30.6863 83 34C83 37.3137 80.3137 40 77 40H74L69 44V34Z"
              fill="white"
            />
            <circle cx="48" cy="58" r="5" fill="#22c55e" />
          </svg>
        </div>

        <div style={styles.logo}>Instantip</div>
        <div style={styles.tagline}>Ask someone who&apos;s already there</div>
      </div>
    </div>
  );
}

function SearchScreen({
  query,
  setQuery,
  onSelectPlace,
  currentPlace,
  responderQuickChoice,
  setResponderQuickChoice,
  onOpenResponder,
}) {
  const filteredPlaces = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return places;
    return places.filter((place) => {
      const hay = `${place.name} ${place.area}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  return (
    <div style={styles.screen}>
      <div style={styles.heroBlock}>
        <div style={styles.kicker}>Ask someone who&apos;s already there</div>
        <h1 style={styles.heroTitle}>Where are you going?</h1>
        <div style={styles.searchWrap}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search place"
            style={styles.searchInput}
          />
        </div>
      </div>

      {currentPlace && (
        <div style={styles.hereNowCard}>
          <div style={styles.hereNowTopLine}>You seem to be at {currentPlace.name}</div>
          <div style={styles.hereNowTitle}>
            Someone is deciding whether to come here.
          </div>
          <div style={styles.hereNowSub}>
            {currentPlace.responderPrompt.question}
          </div>
          <div style={styles.hereNowMeta}>
            Asked {currentPlace.responderPrompt.askedAgo}
          </div>

          <div style={styles.quickOptions}>
            {["Empty", "Moderate", "Busy"].map((option) => (
              <button
                key={option}
                onClick={() => setResponderQuickChoice(option)}
                style={{
                  ...styles.quickOption,
                  ...(responderQuickChoice === option
                    ? styles.quickOptionActive
                    : {}),
                }}
              >
                {option}
              </button>
            ))}
          </div>

          {responderQuickChoice && (
            <div style={styles.quickAnswerResult}>
              You answered: <strong>{responderQuickChoice}</strong>
            </div>
          )}

          <button style={styles.primaryButton} onClick={onOpenResponder}>
            Can you help more?
          </button>
        </div>
      )}

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Trending now</div>
        <div style={styles.cardList}>
          {filteredPlaces.map((place) => (
            <button
              key={place.id}
              onClick={() => onSelectPlace(place)}
              style={styles.placeCard}
            >
              <div style={styles.placeCardTop}>
                <div>
                  <div style={styles.placeName}>{place.name}</div>
                  <div style={styles.placeArea}>{place.area}</div>
                </div>
                <div style={styles.liveBadge}>LIVE</div>
              </div>

              <div style={styles.placeStatsRow}>
                <div style={styles.statBox}>
                  <div style={styles.statLabel}>Travelers now</div>
                  <div style={styles.statValue}>{place.travelersNow}</div>
                </div>
                <div style={styles.statBox}>
                  <div style={styles.statLabel}>Crowd</div>
                  <div style={styles.statValue}>{place.crowdLevel}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlaceScreen({ place, onBack }) {
  const [quickAnswer, setQuickAnswer] = useState(null);

  return (
    <div style={styles.screen}>
      <div style={styles.topBar}>
        <button onClick={onBack} style={styles.backButton}>
          ← Back
        </button>
      </div>

      <div style={styles.placeHeaderCard}>
        <div style={styles.placeHeaderKicker}>Ask someone who&apos;s already there</div>
        <h1 style={styles.placeHeaderTitle}>{place.name}</h1>
        <div style={styles.placeHeaderArea}>{place.area}</div>

        <div style={styles.presenceRow}>
          <div style={styles.presenceDot} />
          <div style={styles.presenceText}>
            {place.travelersNow} travelers here now
          </div>
        </div>

        <div style={styles.miniMeta}>
          {place.availableToChat} available to chat · Active in the last 30 minutes
        </div>

        <div style={styles.summaryGrid}>
          <div style={styles.summaryCard}>
            <div style={styles.summaryLabel}>Crowd</div>
            <div style={styles.summaryValue}>{place.crowdLevel}</div>
          </div>
          <div style={styles.summaryCard}>
            <div style={styles.summaryLabel}>Worth coming now?</div>
            <div style={styles.summaryValue}>
              👍 {place.worthComing.yes} · 👎 {place.worthComing.no}
            </div>
          </div>
          <div style={styles.summaryCardWide}>
            <div style={styles.summaryLabel}>Vibe</div>
            <div style={styles.summaryValue}>{place.vibe}</div>
          </div>
          <div style={styles.summaryCardWide}>
            <div style={styles.summaryLabel}>Last update</div>
            <div style={styles.summaryValue}>{place.lastUpdate}</div>
          </div>
        </div>

        <button style={styles.primaryButton}>Chat with someone there</button>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Ask quickly</div>
        <div style={styles.suggestedWrap}>
          {place.suggestedQuestions.map((question) => (
            <button key={question} style={styles.suggestedButton}>
              {question}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Quick answer</div>
        <div style={styles.quickQuestionCard}>
          <div style={styles.quickQuestionText}>How crowded is it?</div>
          <div style={styles.quickOptions}>
            {["Empty", "Moderate", "Busy"].map((option) => (
              <button
                key={option}
                onClick={() => setQuickAnswer(option)}
                style={{
                  ...styles.quickOption,
                  ...(quickAnswer === option ? styles.quickOptionActive : {}),
                }}
              >
                {option}
              </button>
            ))}
          </div>
          {quickAnswer && (
            <div style={styles.quickAnswerResult}>
              Your answer: <strong>{quickAnswer}</strong>
            </div>
          )}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Live questions</div>
        <div style={styles.cardList}>
          {place.questions.map((question) => (
            <div key={question.id} style={styles.questionCard}>
              <div style={styles.questionMeta}>
                {question.author} asked {question.time}
              </div>
              <div style={styles.questionText}>{question.text}</div>

              <div style={styles.replyList}>
                {question.replies.map((reply) => (
                  <div key={reply.id} style={styles.replyCard}>
                    <div style={styles.replyHeader}>
                      <span style={styles.replyAuthor}>{reply.author}</span>
                      <span style={styles.replyMeta}>{reply.meta}</span>
                    </div>
                    <div style={styles.replyText}>{reply.text}</div>
                    <button style={styles.secondaryButton}>Chat privately</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Recent tips</div>
        <div style={styles.cardList}>
          {place.recentTips.map((tip) => (
            <div key={tip.id} style={styles.tipCard}>
              <div style={styles.tipTime}>{tip.time}</div>
              <div style={styles.tipText}>{tip.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResponderScreen({
  place,
  onBack,
  responderQuickChoice,
  setResponderQuickChoice,
}) {
  const [worthAnswer, setWorthAnswer] = useState(null);
  const [vibeAnswer, setVibeAnswer] = useState(null);

  return (
    <div style={styles.screen}>
      <div style={styles.topBar}>
        <button onClick={onBack} style={styles.backButton}>
          ← Back
        </button>
      </div>

      <div style={styles.responderHero}>
        <div style={styles.placeHeaderKicker}>You&apos;re here now</div>
        <h1 style={styles.placeHeaderTitle}>{place.name}</h1>
        <div style={styles.placeHeaderArea}>{place.area}</div>

        <div style={styles.responderHeadline}>
          Help travelers decide in real time
        </div>
        <div style={styles.responderSub}>
          Someone is deciding whether to come here. What should they know?
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>How crowded is it?</div>
        <div style={styles.quickQuestionCard}>
          <div style={styles.quickOptions}>
            {["Empty", "Moderate", "Busy"].map((option) => (
              <button
                key={option}
                onClick={() => setResponderQuickChoice(option)}
                style={{
                  ...styles.quickOption,
                  ...(responderQuickChoice === option
                    ? styles.quickOptionActive
                    : {}),
                }}
              >
                {option}
              </button>
            ))}
          </div>
          {responderQuickChoice && (
            <div style={styles.quickAnswerResult}>
              Crowd answer: <strong>{responderQuickChoice}</strong>
            </div>
          )}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Worth coming now?</div>
        <div style={styles.quickQuestionCard}>
          <div style={styles.quickOptions}>
            {["Yes", "Maybe", "No"].map((option) => (
              <button
                key={option}
                onClick={() => setWorthAnswer(option)}
                style={{
                  ...styles.quickOption,
                  ...(worthAnswer === option ? styles.quickOptionActive : {}),
                }}
              >
                {option}
              </button>
            ))}
          </div>
          {worthAnswer && (
            <div style={styles.quickAnswerResult}>
              Worth coming: <strong>{worthAnswer}</strong>
            </div>
          )}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>What&apos;s the vibe?</div>
        <div style={styles.quickQuestionCard}>
          <div style={styles.quickOptions}>
            {["Chill", "Lively", "Packed"].map((option) => (
              <button
                key={option}
                onClick={() => setVibeAnswer(option)}
                style={{
                  ...styles.quickOption,
                  ...(vibeAnswer === option ? styles.quickOptionActive : {}),
                }}
              >
                {option}
              </button>
            ))}
          </div>
          {vibeAnswer && (
            <div style={styles.quickAnswerResult}>
              Vibe: <strong>{vibeAnswer}</strong>
            </div>
          )}
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Open question right now</div>
        <div style={styles.questionCard}>
          <div style={styles.questionMeta}>
            Asked {place.responderPrompt.askedAgo}
          </div>
          <div style={styles.questionText}>{place.responderPrompt.question}</div>
          <button style={styles.primaryButton}>Go available for chat</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mode, setMode] = useState("search");
  const [currentPlace] = useState(places[0]);
  const [responderQuickChoice, setResponderQuickChoice] = useState(null);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeSplash(true);
    }, 2800);

    const hideTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (showSplash) {
    return <SplashScreen fadeOut={fadeSplash} />;
  }

  if (mode === "responder") {
    return (
      <ResponderScreen
        place={currentPlace}
        onBack={() => setMode("search")}
        responderQuickChoice={responderQuickChoice}
        setResponderQuickChoice={setResponderQuickChoice}
      />
    );
  }

  if (selectedPlace) {
    return (
      <PlaceScreen
        place={selectedPlace}
        onBack={() => setSelectedPlace(null)}
      />
    );
  }

  return (
    <SearchScreen
      query={query}
      setQuery={setQuery}
      onSelectPlace={(place) => setSelectedPlace(place)}
      currentPlace={currentPlace}
      responderQuickChoice={responderQuickChoice}
      setResponderQuickChoice={setResponderQuickChoice}
      onOpenResponder={() => setMode("responder")}
    />
  );
}

const styles = {
  splash: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },
  splashInner: {
    maxWidth: "340px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  splashIconWrap: {
    marginBottom: "18px",
  },
  splashIcon: {
    display: "block",
    filter: "drop-shadow(0 10px 30px rgba(56, 189, 248, 0.18))",
  },
  logo: {
    fontSize: "40px",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    marginBottom: "12px",
  },
  tagline: {
    fontSize: "22px",
    fontWeight: 700,
    lineHeight: 1.2,
    maxWidth: "280px",
  },
  screen: {
    minHeight: "100vh",
    background: "#f8fafc",
    color: "#0f172a",
    padding: "18px 16px 32px",
    maxWidth: "480px",
    margin: "0 auto",
    boxSizing: "border-box",
  },
  heroBlock: {
    paddingTop: "18px",
    marginBottom: "20px",
  },
  kicker: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#2563eb",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  heroTitle: {
    fontSize: "30px",
    lineHeight: 1.1,
    margin: 0,
    marginBottom: "16px",
  },
  searchWrap: {
    marginTop: "10px",
  },
  searchInput: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #cbd5e1",
    borderRadius: "14px",
    padding: "16px 14px",
    fontSize: "16px",
    outline: "none",
    background: "#ffffff",
  },
  hereNowCard: {
    background: "linear-gradient(180deg, #eff6ff 0%, #ffffff 100%)",
    border: "1px solid #bfdbfe",
    borderRadius: "22px",
    padding: "18px",
    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.05)",
    marginBottom: "22px",
  },
  hereNowTopLine: {
    fontSize: "13px",
    fontWeight: 800,
    color: "#2563eb",
    marginBottom: "10px",
  },
  hereNowTitle: {
    fontSize: "22px",
    lineHeight: 1.2,
    fontWeight: 800,
    marginBottom: "10px",
  },
  hereNowSub: {
    fontSize: "15px",
    lineHeight: 1.45,
    color: "#334155",
    marginBottom: "8px",
  },
  hereNowMeta: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "14px",
  },
  section: {
    marginTop: "22px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: 800,
    marginBottom: "12px",
  },
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  placeCard: {
    border: "none",
    borderRadius: "18px",
    background: "#ffffff",
    padding: "16px",
    textAlign: "left",
    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.06)",
    cursor: "pointer",
  },
  placeCardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "14px",
  },
  placeName: {
    fontSize: "18px",
    fontWeight: 800,
    marginBottom: "4px",
  },
  placeArea: {
    fontSize: "14px",
    color: "#64748b",
  },
  liveBadge: {
    fontSize: "12px",
    fontWeight: 800,
    color: "#16a34a",
    background: "#dcfce7",
    borderRadius: "999px",
    padding: "7px 10px",
    whiteSpace: "nowrap",
  },
  placeStatsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },
  statBox: {
    background: "#f8fafc",
    borderRadius: "14px",
    padding: "12px",
  },
  statLabel: {
    fontSize: "12px",
    color: "#64748b",
    marginBottom: "6px",
  },
  statValue: {
    fontSize: "16px",
    fontWeight: 800,
  },
  topBar: {
    marginBottom: "8px",
  },
  backButton: {
    border: "none",
    background: "transparent",
    color: "#2563eb",
    fontSize: "16px",
    fontWeight: 700,
    padding: 0,
    cursor: "pointer",
  },
  placeHeaderCard: {
    background: "#ffffff",
    borderRadius: "22px",
    padding: "18px",
    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.06)",
  },
  placeHeaderKicker: {
    fontSize: "12px",
    fontWeight: 800,
    color: "#2563eb",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    marginBottom: "10px",
  },
  placeHeaderTitle: {
    fontSize: "28px",
    lineHeight: 1.1,
    margin: 0,
    marginBottom: "6px",
  },
  placeHeaderArea: {
    color: "#64748b",
    marginBottom: "16px",
  },
  presenceRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "8px",
  },
  presenceDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#22c55e",
    flexShrink: 0,
  },
  presenceText: {
    fontSize: "17px",
    fontWeight: 800,
  },
  miniMeta: {
    color: "#64748b",
    fontSize: "13px",
    marginBottom: "16px",
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "16px",
  },
  summaryCard: {
    background: "#f8fafc",
    borderRadius: "16px",
    padding: "12px",
  },
  summaryCardWide: {
    background: "#f8fafc",
    borderRadius: "16px",
    padding: "12px",
    gridColumn: "span 2",
  },
  summaryLabel: {
    fontSize: "12px",
    color: "#64748b",
    marginBottom: "6px",
  },
  summaryValue: {
    fontSize: "15px",
    fontWeight: 800,
    lineHeight: 1.35,
  },
  primaryButton: {
    width: "100%",
    border: "none",
    borderRadius: "14px",
    padding: "15px 16px",
    fontSize: "16px",
    fontWeight: 800,
    background: "#2563eb",
    color: "#ffffff",
    cursor: "pointer",
    marginTop: "14px",
  },
  suggestedWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  suggestedButton: {
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    borderRadius: "999px",
    padding: "11px 14px",
    fontSize: "14px",
    cursor: "pointer",
  },
  quickQuestionCard: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "16px",
    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.06)",
  },
  quickQuestionText: {
    fontWeight: 800,
    fontSize: "16px",
    marginBottom: "12px",
  },
  quickOptions: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  quickOption: {
    border: "1px solid #cbd5e1",
    background: "#f8fafc",
    borderRadius: "12px",
    padding: "10px 14px",
    fontSize: "14px",
    cursor: "pointer",
  },
  quickOptionActive: {
    background: "#dbeafe",
    border: "1px solid #93c5fd",
    fontWeight: 800,
  },
  quickAnswerResult: {
    marginTop: "12px",
    fontSize: "14px",
    color: "#334155",
  },
  questionCard: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "16px",
    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.06)",
  },
  questionMeta: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "8px",
  },
  questionText: {
    fontSize: "18px",
    fontWeight: 800,
    lineHeight: 1.3,
    marginBottom: "14px",
  },
  replyList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  replyCard: {
    background: "#f8fafc",
    borderRadius: "14px",
    padding: "12px",
  },
  replyHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "8px",
    flexWrap: "wrap",
  },
  replyAuthor: {
    fontWeight: 800,
  },
  replyMeta: {
    color: "#64748b",
    fontSize: "13px",
  },
  replyText: {
    marginBottom: "10px",
    lineHeight: 1.45,
  },
  secondaryButton: {
    border: "none",
    background: "#e2e8f0",
    borderRadius: "10px",
    padding: "10px 12px",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
  },
  tipCard: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "14px",
    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.06)",
  },
  tipTime: {
    fontSize: "12px",
    color: "#64748b",
    marginBottom: "6px",
  },
  tipText: {
    fontSize: "15px",
    lineHeight: 1.45,
    fontWeight: 700,
  },
  responderHero: {
    background: "linear-gradient(180deg, #eff6ff 0%, #ffffff 100%)",
    border: "1px solid #bfdbfe",
    borderRadius: "22px",
    padding: "18px",
    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.05)",
  },
  responderHeadline: {
    fontSize: "22px",
    lineHeight: 1.2,
    fontWeight: 800,
    marginBottom: "10px",
  },
  responderSub: {
    fontSize: "15px",
    lineHeight: 1.45,
    color: "#334155",
  },
};
