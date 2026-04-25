import { useState, useRef } from "react";

const BRAND = {
  cream: "#F5F0E8",
  warmWhite: "#FDFAF5",
  charcoal: "#2C2C2C",
  taupe: "#8B7D6B",
  gold: "#C9A96E",
  darkGold: "#A07840",
  sage: "#7A8C7E",
  blush: "#E8D5C4",
};

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${BRAND.warmWhite};
    font-family: 'Jost', sans-serif;
    color: ${BRAND.charcoal};
  }

  .app {
    min-height: 100vh;
    background: ${BRAND.warmWhite};
  }

  /* NAV */
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 48px;
    border-bottom: 1px solid ${BRAND.blush};
    background: ${BRAND.warmWhite};
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${BRAND.charcoal};
  }
  .nav-tabs {
    display: flex;
    gap: 32px;
  }
  .nav-tab {
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-weight: 400;
    cursor: pointer;
    padding-bottom: 2px;
    border-bottom: 1px solid transparent;
    transition: all 0.2s;
    background: none;
    border: none;
    color: ${BRAND.taupe};
  }
  .nav-tab:hover { color: ${BRAND.charcoal}; }
  .nav-tab.active {
    color: ${BRAND.charcoal};
    border-bottom: 1px solid ${BRAND.gold};
  }

  /* HERO */
  .hero {
    padding: 80px 48px 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
  }
  .hero-eyebrow {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: ${BRAND.gold};
    margin-bottom: 20px;
  }
  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 56px;
    font-weight: 300;
    line-height: 1.1;
    color: ${BRAND.charcoal};
    margin-bottom: 20px;
  }
  .hero-title em {
    font-style: italic;
    color: ${BRAND.taupe};
  }
  .hero-sub {
    font-size: 14px;
    line-height: 1.8;
    color: ${BRAND.taupe};
    font-weight: 300;
    margin-bottom: 36px;
    max-width: 420px;
  }
  .upload-zone {
    background: ${BRAND.cream};
    border: 1.5px dashed ${BRAND.blush};
    border-radius: 4px;
    padding: 48px 32px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }
  .upload-zone:hover {
    border-color: ${BRAND.gold};
    background: #F2EBE0;
  }
  .upload-zone.has-image {
    padding: 0;
    border-style: solid;
    border-color: ${BRAND.gold};
  }
  .upload-zone img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    border-radius: 2px;
    display: block;
  }
  .upload-icon {
    font-size: 32px;
    margin-bottom: 12px;
    opacity: 0.4;
  }
  .upload-text {
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${BRAND.taupe};
    margin-bottom: 6px;
  }
  .upload-sub {
    font-size: 11px;
    color: ${BRAND.blush};
  }
  .change-photo-btn {
    position: absolute;
    bottom: 12px;
    right: 12px;
    background: rgba(44,44,44,0.75);
    color: white;
    border: none;
    padding: 6px 14px;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 2px;
    font-family: 'Jost', sans-serif;
  }

  /* BTN */
  .btn-primary {
    background: ${BRAND.charcoal};
    color: white;
    border: none;
    padding: 16px 40px;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    font-family: 'Jost', sans-serif;
    font-weight: 400;
    transition: all 0.2s;
    border-radius: 2px;
  }
  .btn-primary:hover { background: #444; }
  .btn-primary:disabled {
    background: ${BRAND.blush};
    color: ${BRAND.taupe};
    cursor: not-allowed;
  }
  .btn-outline {
    background: transparent;
    color: ${BRAND.charcoal};
    border: 1px solid ${BRAND.charcoal};
    padding: 12px 28px;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    font-family: 'Jost', sans-serif;
    transition: all 0.2s;
    border-radius: 2px;
  }
  .btn-outline:hover { background: ${BRAND.charcoal}; color: white; }

  /* LOADING */
  .loading-state {
    padding: 80px 48px;
    text-align: center;
    max-width: 500px;
    margin: 0 auto;
  }
  .loading-spinner {
    width: 48px;
    height: 48px;
    border: 2px solid ${BRAND.blush};
    border-top-color: ${BRAND.gold};
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 24px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 300;
    margin-bottom: 12px;
  }
  .loading-sub {
    font-size: 13px;
    color: ${BRAND.taupe};
    line-height: 1.7;
  }

  /* RESULTS */
  .results {
    max-width: 1100px;
    margin: 0 auto;
    padding: 60px 48px;
    animation: fadeUp 0.5s ease;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .results-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    margin-bottom: 60px;
    align-items: start;
  }
  .results-image {
    width: 100%;
    height: 320px;
    object-fit: cover;
    border-radius: 4px;
  }
  .score-section { padding-top: 8px; }
  .score-eyebrow {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: ${BRAND.gold};
    margin-bottom: 16px;
  }
  .score-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 80px;
    font-weight: 300;
    line-height: 1;
    color: ${BRAND.charcoal};
    margin-bottom: 4px;
  }
  .score-label {
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${BRAND.taupe};
    margin-bottom: 24px;
  }
  .score-bar-bg {
    height: 3px;
    background: ${BRAND.blush};
    border-radius: 2px;
    margin-bottom: 32px;
    overflow: hidden;
  }
  .score-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, ${BRAND.gold}, ${BRAND.darkGold});
    border-radius: 2px;
    transition: width 1.5s ease;
  }
  .score-summary {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 300;
    font-style: italic;
    line-height: 1.6;
    color: ${BRAND.charcoal};
    margin-bottom: 24px;
  }

  /* OBSERVATIONS */
  .section-title {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: ${BRAND.gold};
    margin-bottom: 24px;
  }
  .observations {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 56px;
  }
  .observation-card {
    background: ${BRAND.cream};
    padding: 24px;
    border-radius: 4px;
    border-left: 3px solid ${BRAND.gold};
    animation: fadeUp 0.5s ease both;
  }
  .obs-category {
    font-size: 9px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: ${BRAND.gold};
    margin-bottom: 8px;
  }
  .obs-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 8px;
  }
  .obs-text {
    font-size: 13px;
    color: ${BRAND.taupe};
    line-height: 1.7;
    font-weight: 300;
  }

  /* SHOP */
  .shop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 48px;
  }
  .product-card {
    background: white;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid ${BRAND.blush};
    transition: transform 0.2s, box-shadow 0.2s;
    animation: fadeUp 0.5s ease both;
  }
  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.08);
  }
  .product-img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    background: ${BRAND.cream};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: ${BRAND.blush};
  }
  .product-body {
    padding: 16px;
  }
  .product-tag {
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${BRAND.sage};
    margin-bottom: 6px;
  }
  .product-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 4px;
    color: ${BRAND.charcoal};
  }
  .product-brand {
    font-size: 11px;
    color: ${BRAND.taupe};
    margin-bottom: 12px;
  }
  .product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .product-price {
    font-size: 14px;
    font-weight: 500;
    color: ${BRAND.charcoal};
  }
  .product-link {
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${BRAND.gold};
    cursor: pointer;
    text-decoration: underline;
    background: none;
    border: none;
    font-family: 'Jost', sans-serif;
  }

  /* SHOP PAGE */
  .shop-page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 60px 48px;
  }
  .shop-hero {
    text-align: center;
    margin-bottom: 56px;
  }
  .shop-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 48px;
    font-weight: 300;
    margin-bottom: 16px;
  }
  .shop-hero-sub {
    font-size: 14px;
    color: ${BRAND.taupe};
    font-weight: 300;
  }
  .shop-filters {
    display: flex;
    gap: 12px;
    margin-bottom: 40px;
    flex-wrap: wrap;
  }
  .filter-chip {
    padding: 8px 20px;
    border: 1px solid ${BRAND.blush};
    border-radius: 40px;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    background: none;
    font-family: 'Jost', sans-serif;
    color: ${BRAND.taupe};
    transition: all 0.2s;
  }
  .filter-chip:hover, .filter-chip.active {
    background: ${BRAND.charcoal};
    color: white;
    border-color: ${BRAND.charcoal};
  }

  .cta-strip {
    background: ${BRAND.charcoal};
    color: white;
    padding: 48px;
    text-align: center;
    border-radius: 4px;
    margin-top: 60px;
  }
  .cta-strip-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 300;
    margin-bottom: 12px;
  }
  .cta-strip-sub {
    font-size: 13px;
    opacity: 0.7;
    margin-bottom: 28px;
  }
  .email-row {
    display: flex;
    gap: 12px;
    max-width: 400px;
    margin: 0 auto;
  }
  .email-input {
    flex: 1;
    padding: 14px 18px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 2px;
    color: white;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    outline: none;
  }
  .email-input::placeholder { color: rgba(255,255,255,0.4); }
  .btn-gold {
    background: ${BRAND.gold};
    color: white;
    border: none;
    padding: 14px 28px;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    font-family: 'Jost', sans-serif;
    border-radius: 2px;
    white-space: nowrap;
  }

  .reset-row {
    display: flex;
    gap: 16px;
    margin-top: 40px;
  }

  @media (max-width: 768px) {
    .hero, .results-header { grid-template-columns: 1fr; gap: 32px; }
    .hero { padding: 40px 24px; }
    .hero-title { font-size: 36px; }
    .observations { grid-template-columns: 1fr; }
    .shop-grid { grid-template-columns: repeat(2, 1fr); }
    .nav { padding: 16px 24px; }
    .results, .shop-page { padding: 40px 24px; }
    .nav-tabs { gap: 20px; }
  }
`;

const MOCK_PRODUCTS = [
  { id: 1, tag: "Lighting", name: "Woven Rattan Pendant", brand: "Serena & Lily", price: "$248", emoji: "🪔", reason: "Adds warmth and organic texture overhead" },
  { id: 2, tag: "Rugs", name: "Ivory Beni Ourain Rug", brand: "Loloi x Amber Lewis", price: "$389", emoji: "🟫", reason: "Anchors the seating area with subtle pattern" },
  { id: 3, tag: "Textiles", name: "Linen Throw Pillow Set", brand: "McGee & Co.", price: "$128", emoji: "🛋️", reason: "Introduces softness and layered texture" },
  { id: 4, tag: "Accent Furniture", name: "Travertine Side Table", brand: "CB2", price: "$299", emoji: "🪨", reason: "Brings natural material contrast" },
  { id: 5, tag: "Greenery", name: "Fiddle Leaf Fig (4ft)", brand: "The Sill", price: "$175", emoji: "🌿", reason: "Vertical element to balance low furniture" },
  { id: 6, tag: "Wall Art", name: "Abstract Linen Print", brand: "Minted", price: "$95", emoji: "🖼️", reason: "Grounds the color story on your walls" },
];

const ALL_SHOP_PRODUCTS = [
  ...MOCK_PRODUCTS,
  { id: 7, tag: "Lighting", name: "Brass Arc Floor Lamp", brand: "West Elm", price: "$399", emoji: "💡" },
  { id: 8, tag: "Rugs", name: "Jute Braided Rug", brand: "Pottery Barn", price: "$229", emoji: "⬜" },
  { id: 9, tag: "Accent Furniture", name: "Burl Wood Coffee Table", brand: "Arhaus", price: "$1,299", emoji: "🪵" },
  { id: 10, tag: "Textiles", name: "Chunky Knit Throw", brand: "Parachute", price: "$149", emoji: "🧶" },
  { id: 11, tag: "Greenery", name: "Monstera Deliciosa", brand: "The Sill", price: "$85", emoji: "🍃" },
  { id: 12, tag: "Wall Art", name: "Vintage Map Print", brand: "Society6", price: "$65", emoji: "🗺️" },
];

export default function App() {
  const [tab, setTab] = useState("audit");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const fileRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target.result);
    reader.readAsDataURL(file);
    setResult(null);
  };

  const runAudit = async () => {
    setLoading(true);
    console.log("runAudit called");
    try {
      const messages = image
        ? [{ role: "user", content: [
            { type: "image", source: { type: "base64", media_type: "image/jpeg", data: image.split(",")[1] } },
            { type: "text", text: `You are Elise, an expert interior decorator with refined, elevated taste. Analyze this room photo and return ONLY a JSON object (no markdown, no backticks) with this structure:
{
  "score": <number 60-95>,
  "scoreLabel": <"Good Start" | "Getting There" | "Almost Elevated" | "Elevated" | "Perfectly Elevated">,
  "summary": <one elegant sentence describing the room's current vibe, max 20 words>,
  "observations": [
    { "category": <e.g. "Lighting">, "title": <short title>, "text": <1-2 sentence observation + specific suggestion> },
    { "category": "...", "title": "...", "text": "..." },
    { "category": "...", "title": "...", "text": "..." },
    { "category": "...", "title": "...", "text": "..." }
  ]
}` }
          ]}]
        : [{ role: "user", content: `You are Elise, an expert interior decorator. Generate a sample room audit as if analyzing a cozy, modern living room. Return ONLY a JSON object (no markdown, no backticks):
{
  "score": 72,
  "scoreLabel": "Getting There",
  "summary": "A warm foundation with strong bones that's ready for its elevated moment.",
  "observations": [
    { "category": "Lighting", "title": "Layer Your Light", "text": "The room relies heavily on overhead lighting which flattens the space. Add a floor lamp and table lamp to create warmth and depth at multiple levels." },
    { "category": "Anchor Piece", "title": "The Room Needs a Rug", "text": "Without an area rug, the furniture feels ungrounded. A large neutral rug would define the seating area and tie the pieces together." },
    { "category": "Texture", "title": "Introduce Organic Materials", "text": "The palette is cohesive but the surfaces are too uniform. Layer in natural textures — linen, rattan, or stone — to add dimension and warmth." },
    { "category": "Vertical Space", "title": "Draw the Eye Upward", "text": "Wall space above furniture is underutilized. A large piece of art or a tall plant would add visual height and give the room a finished feeling." }
  ]
}` }];

     const response = await fetch("/api/analyze", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages }),
      });
      const data = await res.json();
      const text = data.content.map(i => i.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      setResult(JSON.parse(clean));
    } catch (err) {
      setResult({
        score: 72,
        scoreLabel: "Getting There",
        summary: "A warm foundation with strong bones that's ready for its elevated moment.",
        observations: [
          { category: "Lighting", title: "Layer Your Light", text: "The room relies heavily on overhead lighting which flattens the space. Add a floor lamp and table lamp to create warmth and depth at multiple levels." },
          { category: "Anchor Piece", title: "The Room Needs a Rug", text: "Without an area rug, the furniture feels ungrounded. A large neutral rug would define the seating area and tie the pieces together." },
          { category: "Texture", title: "Introduce Organic Materials", text: "The palette is cohesive but the surfaces feel uniform. Layer in linen, rattan, or stone to add warmth and dimension." },
          { category: "Vertical Space", title: "Draw the Eye Upward", text: "Wall space is underutilized. A large piece of art or a tall plant would add visual height and give the room a more finished feeling." },
        ]
      });
    }
    setLoading(false);
  };

  const filters = ["All", "Lighting", "Rugs", "Textiles", "Accent Furniture", "Greenery", "Wall Art"];
  const filtered = activeFilter === "All" ? ALL_SHOP_PRODUCTS : ALL_SHOP_PRODUCTS.filter(p => p.tag === activeFilter);

  return (
    <>
      <style>{style}</style>
      <div className="app">
        <nav className="nav">
          <div className="nav-logo">Make It Elevated</div>
          <div className="nav-tabs">
            <button className={`nav-tab ${tab === "audit" ? "active" : ""}`} onClick={() => setTab("audit")}>Room Audit</button>
            <button className={`nav-tab ${tab === "shop" ? "active" : ""}`} onClick={() => setTab("shop")}>Shop</button>
          </div>
        </nav>

        {tab === "audit" && !loading && !result && (
          <div className="hero">
            <div>
              <div className="hero-eyebrow">Elevated by Elise</div>
              <h1 className="hero-title">Get your<br /><em>Elevated</em><br />Score</h1>
              <p className="hero-sub">Upload a photo of any room and get an instant design audit — specific observations, an elevated score, and curated product picks to bring your space to its full potential.</p>
              <button className="btn-primary" onClick={() => fileRef.current.click()} disabled={false}>Upload a Room Photo</button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
            </div>
            <div>
              <div
                className={`upload-zone ${image ? "has-image" : ""}`}
                onClick={() => !image && fileRef.current.click()}
              >
                {image ? (
                  <>
                    <img src={image} alt="Your room" />
                    <button className="change-photo-btn" onClick={(e) => { e.stopPropagation(); fileRef.current.click(); }}>Change Photo</button>
                  </>
                ) : (
                  <>
                    <div className="upload-icon">📷</div>
                    <div className="upload-text">Drop your room photo here</div>
                    <div className="upload-sub">JPG, PNG up to 10MB</div>
                  </>
                )}
              </div>
              {image && (
                <div style={{ marginTop: 16, textAlign: "right" }}>
                  <button className="btn-primary" onClick={runAudit}>Analyze My Room →</button>
                </div>
              )}
              {!image && (
                <div style={{ marginTop: 16, textAlign: "center" }}>
                  <button className="btn-outline" onClick={runAudit} style={{ fontSize: "10px" }}>Try a Demo Without a Photo</button>
                </div>
              )}
            </div>
          </div>
        )}

        {loading && (
          <div className="loading-state">
            <div className="loading-spinner" />
            <div className="loading-title">Analyzing your space...</div>
            <div className="loading-sub">Elise is reviewing your room's lighting, layout, texture, and styling. This takes just a moment.</div>
          </div>
        )}

        {result && !loading && tab === "audit" && (
          <div className="results">
            <div className="results-header">
              {image ? (
                <img src={image} alt="Your room" className="results-image" />
              ) : (
                <div style={{ background: BRAND.cream, height: 320, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>🛋️</div>
              )}
              <div className="score-section">
                <div className="score-eyebrow">Your Elevated Score</div>
                <div className="score-number">{result.score}</div>
                <div className="score-label">{result.scoreLabel}</div>
                <div className="score-bar-bg">
                  <div className="score-bar-fill" style={{ width: `${result.score}%` }} />
                </div>
                <div className="score-summary">"{result.summary}"</div>
                <button className="btn-outline" onClick={() => setTab("shop")}>Shop the Recommendations →</button>
              </div>
            </div>

            <div className="section-title">Design Observations</div>
            <div className="observations">
              {result.observations.map((obs, i) => (
                <div className="observation-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="obs-category">{obs.category}</div>
                  <div className="obs-title">{obs.title}</div>
                  <div className="obs-text">{obs.text}</div>
                </div>
              ))}
            </div>

            <div className="section-title">Curated For Your Space</div>
            <div className="shop-grid">
              {MOCK_PRODUCTS.map((p, i) => (
                <div className="product-card" key={p.id} style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="product-img">{p.emoji}</div>
                  <div className="product-body">
                    <div className="product-tag">{p.tag}</div>
                    <div className="product-name">{p.name}</div>
                    <div className="product-brand">{p.brand}</div>
                    <div className="product-footer">
                      <div className="product-price">{p.price}</div>
                      <button className="product-link">Shop →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="reset-row">
              <button className="btn-primary" onClick={() => { setResult(null); setImage(null); }}>Audit Another Room</button>
              <button className="btn-outline" onClick={() => setTab("shop")}>Browse All Products</button>
            </div>

            <div className="cta-strip">
              <div className="cta-strip-title">Save Your Audit + Shop Later</div>
              <div className="cta-strip-sub">Get your results emailed to you plus weekly elevated design inspo.</div>
              {!subscribed ? (
                <div className="email-row">
                  <input className="email-input" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                  <button className="btn-gold" onClick={() => setSubscribed(true)}>Save</button>
                </div>
              ) : (
                <div style={{ color: BRAND.gold, fontSize: 14 }}>✓ You're in. Check your inbox.</div>
              )}
            </div>
          </div>
        )}

        {tab === "shop" && (
          <div className="shop-page">
            <div className="shop-hero">
              <div className="hero-eyebrow">Elevated Picks</div>
              <h1 className="shop-hero-title">The Elevated Shop</h1>
              <p className="shop-hero-sub">Every piece, hand-selected for its quality, aesthetic, and ability to truly elevate a space.</p>
            </div>
            <div className="shop-filters">
              {filters.map(f => (
                <button key={f} className={`filter-chip ${activeFilter === f ? "active" : ""}`} onClick={() => setActiveFilter(f)}>{f}</button>
              ))}
            </div>
            <div className="shop-grid">
              {filtered.map((p, i) => (
                <div className="product-card" key={p.id} style={{ animationDelay: `${i * 0.06}s` }}>
                  <div className="product-img">{p.emoji}</div>
                  <div className="product-body">
                    <div className="product-tag">{p.tag}</div>
                    <div className="product-name">{p.name}</div>
                    <div className="product-brand">{p.brand}</div>
                    <div className="product-footer">
                      <div className="product-price">{p.price}</div>
                      <button className="product-link">Shop →</button>
                    </div> 
                  </div>
                </div>
              ))}
            </div>
            <div className="cta-strip">
              <div className="cta-strip-title">Not sure where to start?</div>
              <div className="cta-strip-sub">Upload a photo of your space and get personalized picks in seconds.</div>
              <button className="btn-gold" onClick={() => setTab("audit")}>Get My Room Audit →</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}