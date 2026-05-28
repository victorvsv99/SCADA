<!DOCTYPE html>
<html lang="pt-BR" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Automação Industrial & Sistemas SCADA</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    /* ===== RESET & BASE ===== */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --blue-dark: #0a1628;
      --blue-mid: #0d2244;
      --blue-accent: #1a6fc4;
      --blue-light: #2e9cca;
      --cyan: #00d4ff;
      --green: #00e676;
      --orange: #ff9800;
      --red: #f44336;
      --yellow: #ffd600;
      --text: #e8f0fe;
      --text-muted: #90a4ae;
      --card-bg: rgba(255,255,255,0.04);
      --card-border: rgba(0,212,255,0.15);
      --card-hover-border: rgba(0,212,255,0.5);
      --section-gap: 100px;
      --body-bg: #0a1628;
      --nav-bg: rgba(10,22,40,0.95);
      --glow-color: rgba(0,212,255,0.15);
    }

    /* ===== LIGHT THEME ===== */
    [data-theme="light"] {
      --blue-dark: #f0f4f8;
      --blue-mid: #e2e8f0;
      --body-bg: #f5f7fa;
      --text: #1a202c;
      --text-muted: #4a5568;
      --card-bg: rgba(255,255,255,0.8);
      --card-border: rgba(26,111,196,0.2);
      --card-hover-border: rgba(26,111,196,0.5);
      --nav-bg: rgba(245,247,250,0.95);
      --cyan: #0077b6;
      --glow-color: rgba(0,119,182,0.1);
    }
    [data-theme="light"] header {
      background: radial-gradient(ellipse at 50% 0%, rgba(26,111,196,0.15) 0%, transparent 70%),
                  linear-gradient(180deg, #e8f0fe 0%, #f5f7fa 100%);
    }
    [data-theme="light"] header h1 {
      background: linear-gradient(135deg, #1a202c 0%, #0077b6 100%);
      -webkit-background-clip: text;
      background-clip: text;
    }
    [data-theme="light"] .grid-bg {
      background-image:
        linear-gradient(rgba(0,119,182,0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,119,182,0.06) 1px, transparent 1px);
    }
    [data-theme="light"] footer { background: #e2e8f0; }
    [data-theme="light"] .network-diagram,
    [data-theme="light"] .case-card { background: rgba(255,255,255,0.6); }
    [data-theme="light"] .highlight-box { background: rgba(0,119,182,0.06); }
    [data-theme="light"] .summary-box {
      background: linear-gradient(135deg, rgba(26,111,196,0.08), rgba(0,119,182,0.08));
      border-color: #0077b6;
    }

    html { scroll-behavior: smooth; }
    body {
      font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
      background: var(--body-bg);
      color: var(--text);
      line-height: 1.7;
      overflow-x: hidden;
      transition: background 0.4s ease, color 0.4s ease;
    }

    /* ===== PROGRESS BAR ===== */
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--cyan), var(--green));
      z-index: 9999;
      width: 0%;
      transition: width 0.1s linear;
    }

    /* ===== SCROLLBAR ===== */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--blue-mid); }
    ::-webkit-scrollbar-thumb { background: var(--blue-accent); border-radius: 3px; }

    /* ===== BACK TO TOP ===== */
    .back-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--cyan);
      color: #000;
      border: none;
      cursor: pointer;
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
      transition: all 0.3s ease;
      z-index: 999;
      box-shadow: 0 4px 20px rgba(0,212,255,0.3);
    }
    .back-to-top.visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    .back-to-top:hover {
      transform: translateY(-4px) scale(1.1);
      box-shadow: 0 6px 30px rgba(0,212,255,0.5);
    }

    /* ===== REVEAL ANIMATIONS ===== */
    .reveal {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                  transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .reveal-left {
      opacity: 0;
      transform: translateX(-50px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                  transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal-left.visible {
      opacity: 1;
      transform: translateX(0);
    }
    .reveal-right {
      opacity: 0;
      transform: translateX(50px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                  transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal-right.visible {
      opacity: 1;
      transform: translateX(0);
    }
    .stagger-1 { transition-delay: 0.1s; }
    .stagger-2 { transition-delay: 0.2s; }
    .stagger-3 { transition-delay: 0.3s; }
    .stagger-4 { transition-delay: 0.4s; }
    .stagger-5 { transition-delay: 0.5s; }

    /* ===== HEADER / HERO ===== */
    header {
      position: relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 40px 20px;
      overflow: hidden;
      background: radial-gradient(ellipse at 50% 0%, rgba(26,111,196,0.35) 0%, transparent 70%),
                  linear-gradient(180deg, #0a1628 0%, #0d2244 100%);
    }
    #particle-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
    .grid-bg {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(0,212,255,0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,212,255,0.07) 1px, transparent 1px);
      background-size: 50px 50px;
      animation: gridMove 20s linear infinite;
    }
    @keyframes gridMove { from { background-position: 0 0; } to { background-position: 50px 50px; } }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(0,212,255,0.12);
      border: 1px solid rgba(0,212,255,0.4);
      color: var(--cyan);
      padding: 8px 20px;
      border-radius: 24px;
      font-size: 0.78rem;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      margin-bottom: 28px;
      position: relative;
      z-index: 1;
      animation: badgePulse 3s ease-in-out infinite;
    }
    .hero-badge .pulse-dot {
      width: 8px; height: 8px;
      background: var(--green);
      border-radius: 50%;
      animation: dotPulse 2s ease-in-out infinite;
    }
    @keyframes dotPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.5); }
    }
    @keyframes badgePulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(0,212,255,0.2); }
      50% { box-shadow: 0 0 20px 4px rgba(0,212,255,0.1); }
    }
    header h1 {
      font-size: clamp(2.2rem, 5vw, 4rem);
      font-weight: 900;
      line-height: 1.1;
      position: relative;
      z-index: 1;
      background: linear-gradient(135deg, #ffffff 0%, var(--cyan) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      max-width: 900px;
      letter-spacing: -0.02em;
    }
    header p.subtitle {
      font-size: clamp(1rem, 2vw, 1.2rem);
      color: var(--text-muted);
      max-width: 680px;
      margin: 24px auto 0;
      position: relative;
      z-index: 1;
      font-weight: 400;
    }
    .hero-stats {
      display: flex;
      gap: 50px;
      margin-top: 55px;
      position: relative;
      z-index: 1;
      flex-wrap: wrap;
      justify-content: center;
    }
    .hero-stat {
      text-align: center;
    }
    .hero-stat .num {
      font-size: 2.8rem;
      font-weight: 900;
      color: var(--cyan);
      display: block;
      letter-spacing: -0.03em;
    }
    .hero-stat .label {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 4px;
      font-weight: 600;
    }
    .scroll-indicator {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
      animation: scrollBounce 2s ease-in-out infinite;
      color: var(--text-muted);
      font-size: 0.75rem;
      text-align: center;
      opacity: 0.6;
    }
    .scroll-indicator .arrow {
      display: block;
      font-size: 1.4rem;
      margin-top: 4px;
    }
    @keyframes scrollBounce {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(8px); }
    }

    /* ===== NAV ===== */
    nav {
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--nav-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--card-border);
      padding: 0 20px;
      transition: background 0.4s ease, box-shadow 0.3s ease;
    }
    nav.scrolled {
      box-shadow: 0 4px 30px rgba(0,0,0,0.3);
    }
    .nav-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
    }
    .nav-logo {
      font-weight: 800;
      font-size: 1rem;
      color: var(--cyan);
      text-decoration: none;
      letter-spacing: 0.5px;
      transition: transform 0.2s;
    }
    .nav-logo:hover { transform: scale(1.05); }
    .nav-links {
      display: flex;
      gap: 4px;
      list-style: none;
      flex-wrap: wrap;
    }
    .nav-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.83rem;
      font-weight: 500;
      padding: 6px 14px;
      border-radius: 8px;
      transition: all 0.25s ease;
      position: relative;
    }
    .nav-links a:hover {
      color: var(--cyan);
      background: var(--glow-color);
    }
    .nav-links a.active {
      color: var(--cyan);
      background: var(--glow-color);
    }
    .nav-links a.active::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 25%;
      width: 50%;
      height: 2px;
      background: var(--cyan);
      border-radius: 2px;
    }

    /* HAMBURGER */
    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
      background: none;
      border: none;
      padding: 8px;
      z-index: 200;
    }
    .hamburger span {
      width: 24px; height: 2px;
      background: var(--text);
      border-radius: 2px;
      transition: all 0.3s ease;
    }
    .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .hamburger.open span:nth-child(2) { opacity: 0; }
    .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

    /* THEME TOGGLE */
    .theme-toggle {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      color: var(--text);
      width: 40px; height: 40px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      margin-left: 12px;
    }
    .theme-toggle:hover {
      border-color: var(--cyan);
      background: var(--glow-color);
      transform: rotate(20deg);
    }

    .nav-right {
      display: flex;
      align-items: center;
    }

    /* ===== SECTIONS ===== */
    section {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--section-gap) 20px;
    }
    .section-label {
      font-size: 0.72rem;
      letter-spacing: 3.5px;
      text-transform: uppercase;
      color: var(--cyan);
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 700;
    }
    .section-label::before {
      content: '';
      width: 32px;
      height: 2px;
      background: linear-gradient(90deg, var(--cyan), transparent);
    }
    h2 {
      font-size: clamp(1.7rem, 3vw, 2.5rem);
      font-weight: 800;
      margin-bottom: 16px;
      color: var(--text);
      letter-spacing: -0.02em;
    }
    .section-intro {
      font-size: 1.05rem;
      color: var(--text-muted);
      max-width: 800px;
      margin-bottom: 48px;
    }

    /* ===== SECTION DIVIDERS ===== */
    .section-divider {
      border: none;
      height: 1px;
      max-width: 1200px;
      margin: 0 auto;
      background: linear-gradient(90deg, transparent, var(--card-border), transparent);
    }

    /* ===== IMAGES ===== */
    .img-container {
      width: 100%;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid var(--card-border);
      margin-bottom: 30px;
      background: var(--blue-mid);
      transition: border-color 0.3s ease;
    }
    .img-container:hover { border-color: var(--card-hover-border); }
    .img-container img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .img-container:hover img {
      transform: scale(1.03);
    }
    .img-caption {
      padding: 16px 22px;
      font-size: 0.84rem;
      color: var(--text-muted);
      border-top: 1px solid var(--card-border);
      background: rgba(0,0,0,0.15);
    }

    /* ===== CARDS ===== */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 30px;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
    }
    .card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--cyan), var(--blue-accent));
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .card:hover::before { opacity: 1; }
    .card:hover {
      transform: translateY(-6px);
      border-color: var(--card-hover-border);
      box-shadow: 0 12px 40px rgba(0,212,255,0.08);
    }
    .card-icon {
      width: 48px; height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      margin-bottom: 18px;
      background: var(--glow-color);
    }
    .card h3 {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 10px;
      color: var(--text);
    }
    .card p {
      font-size: 0.9rem;
      color: var(--text-muted);
      line-height: 1.7;
    }

    /* ===== PYRAMID ===== */
    .pyramid-container {
      display: flex;
      gap: 40px;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    .pyramid-visual {
      flex: 0 0 auto;
      width: 100%;
      max-width: 500px;
    }
    .pyramid-level {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      cursor: pointer;
      transition: transform 0.2s ease;
      border-radius: 10px;
    }
    .pyramid-level:hover { transform: translateX(6px); }
    .pyramid-level.active-level { transform: translateX(10px); }
    .pyramid-num {
      width: 36px; height: 36px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 0.85rem; margin-right: 12px;
      flex-shrink: 0;
      transition: transform 0.3s ease;
    }
    .pyramid-level:hover .pyramid-num,
    .pyramid-level.active-level .pyramid-num {
      transform: scale(1.15);
    }
    .pyramid-bar {
      height: 56px; border-radius: 10px; display: flex;
      align-items: center; padding: 0 18px;
      font-weight: 700; font-size: 0.88rem; color: #fff;
      flex: 1;
      transition: box-shadow 0.3s ease;
    }
    .pyramid-level:hover .pyramid-bar {
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    .pyramid-details {
      flex: 1; min-width: 280px;
    }
    .detail-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 14px;
      padding: 28px;
      display: none;
    }
    .detail-card.active { display: block; animation: fadeSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    .detail-card h3 { font-size: 1.15rem; font-weight: 700; margin-bottom: 12px; color: var(--cyan); }
    .detail-card p { color: var(--text-muted); font-size: 0.92rem; }
    .detail-card .detail-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; }
    .detail-card .tag {
      background: var(--glow-color);
      color: var(--cyan);
      font-size: 0.72rem;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 6px;
      letter-spacing: 0.5px;
    }
    @keyframes fadeSlideIn {
      from { opacity: 0; transform: translateY(12px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* ===== NETWORK DIAGRAM ===== */
    .network-diagram {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 40px 20px;
      text-align: center;
    }
    .net-layers {
      display: flex;
      flex-direction: column;
      gap: 0;
      max-width: 800px;
      margin: 0 auto;
    }
    .net-layer {
      display: flex; align-items: center; gap: 16px;
      padding: 18px 26px; border-radius: 12px; margin-bottom: 4px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .net-layer:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }
    .net-layer-info { text-align: left; flex: 1; }
    .net-layer-info h4 { font-size: 0.95rem; font-weight: 700; color: var(--text); }
    .net-layer-info p { font-size: 0.82rem; color: var(--text-muted); }
    .net-layer-proto {
      font-size: 0.7rem; font-weight: 700; padding: 5px 12px;
      border-radius: 8px; text-transform: uppercase; letter-spacing: 0.5px;
    }
    .net-connector {
      color: var(--cyan);
      margin: 6px 0;
      font-size: 0.8rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .net-connector::before, .net-connector::after {
      content: '';
      width: 40px; height: 1px;
      background: linear-gradient(90deg, transparent, var(--cyan));
    }
    .net-connector::after {
      background: linear-gradient(90deg, var(--cyan), transparent);
    }

    /* ===== CASE STUDY SECTION ===== */
    .case-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }
    .case-card {
      background: rgba(0,212,255,0.03);
      border: 1px solid rgba(0,212,255,0.1);
      border-radius: 20px;
      padding: 32px;
      transition: all 0.3s ease;
    }
    .case-card:hover {
      border-color: rgba(0,212,255,0.3);
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.1);
    }
    .case-card h3 {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 18px;
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .case-list { list-style: none; font-size: 0.88rem; color: var(--text-muted); }
    .case-list li {
      margin-bottom: 12px; padding-left: 26px; position: relative;
      transition: transform 0.2s ease;
    }
    .case-list li:hover { transform: translateX(4px); }
    .case-list li::before {
      content: '✔'; position: absolute; left: 0; color: var(--green);
      font-size: 0.85rem;
    }

    /* ===== CHART SECTION ===== */
    .chart-container {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 30px;
      margin-top: 40px;
    }
    .chart-container h3 {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 20px;
      color: var(--text);
    }
    .chart-wrapper {
      max-width: 700px;
      margin: 0 auto;
      position: relative;
    }

    /* ===== SUMMARY SECTION ===== */
    .summary-box {
      background: linear-gradient(135deg, rgba(26,111,196,0.08), rgba(0,212,255,0.08));
      border: 1px solid var(--cyan);
      border-radius: 24px;
      padding: 45px;
      position: relative;
      overflow: hidden;
    }
    .summary-box::before {
      content: '';
      position: absolute;
      top: -50%; right: -20%;
      width: 300px; height: 300px;
      background: radial-gradient(circle, rgba(0,212,255,0.08), transparent 70%);
      border-radius: 50%;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 30px;
      margin-top: 30px;
      position: relative;
    }
    .summary-item {
      padding: 20px;
      border-radius: 14px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      transition: all 0.3s ease;
    }
    .summary-item:hover {
      border-color: var(--cyan);
      transform: translateY(-4px);
    }
    .summary-item h4 {
      font-size: 0.95rem;
      font-weight: 700;
      margin-bottom: 8px;
      color: var(--cyan);
    }
    .summary-item p {
      font-size: 0.87rem;
      color: var(--text-muted);
    }

    /* ===== HIGHLIGHT BOX ===== */
    .highlight-box {
      background: rgba(0,212,255,0.05);
      border-left: 4px solid var(--cyan);
      border-radius: 0 14px 14px 0;
      padding: 22px 26px;
      margin: 24px 0;
      position: relative;
    }
    .highlight-box p { font-size: 0.95rem; color: var(--text-muted); }
    .highlight-box strong { color: var(--cyan); }

    /* ===== FOOTER ===== */
    footer {
      background: var(--blue-mid);
      border-top: 1px solid var(--card-border);
      text-align: center;
      padding: 50px 20px;
      color: var(--text-muted);
      font-size: 0.85rem;
      transition: background 0.4s ease;
    }
    footer p strong { color: var(--cyan); }

    /* ===== TOOLTIP ===== */
    .tooltip-wrap {
      position: relative;
      display: inline-block;
    }
    .tooltip-text {
      visibility: hidden;
      opacity: 0;
      background: var(--blue-mid);
      color: var(--text);
      font-size: 0.78rem;
      padding: 8px 14px;
      border-radius: 8px;
      border: 1px solid var(--card-border);
      position: absolute;
      bottom: 120%;
      left: 50%;
      transform: translateX(-50%) translateY(6px);
      transition: all 0.2s ease;
      white-space: nowrap;
      z-index: 50;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    .tooltip-wrap:hover .tooltip-text {
      visibility: visible;
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 768px) {
      .hamburger { display: flex; }
      .nav-links {
        position: fixed;
        top: 60px;
        left: 0; right: 0;
        background: var(--nav-bg);
        backdrop-filter: blur(16px);
        flex-direction: column;
        padding: 20px;
        gap: 4px;
        border-bottom: 1px solid var(--card-border);
        transform: translateY(-120%);
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      }
      .nav-links.open { transform: translateY(0); }
      .nav-links a {
        padding: 12px 16px;
        font-size: 0.95rem;
        border-radius: 10px;
      }
      .pyramid-container { flex-direction: column; }
      .pyramid-visual { max-width: 100%; }
      .hero-stats { gap: 30px; }
      .hero-stat .num { font-size: 2.2rem; }
      section { padding: 60px 16px; }
      .summary-box { padding: 28px; }
    }
  </style>
</head>
<body>

<!-- SCROLL PROGRESS -->
<div class="scroll-progress" id="scrollProgress"></div>

<!-- BACK TO TOP -->
<button class="back-to-top" id="backToTop" title="Voltar ao topo">↑</button>

<!-- HERO -->
<header id="inicio">
  <canvas id="particle-canvas"></canvas>
  <div class="grid-bg"></div>
  <span class="hero-badge"><span class="pulse-dot"></span> Automação Industrial</span>
  <h1>Sistemas SCADA:<br>Do Campo ao Painel do Operador</h1>
  <p class="subtitle">Uma visão completa da arquitetura de automação industrial — níveis de atuação, protocolos de comunicação e integração de redes.</p>
  <div class="hero-stats">
    <div class="hero-stat tooltip-wrap">
      <span class="num" data-count="5">0</span>
      <span class="label">Níveis</span>
      <span class="tooltip-text">Pirâmide ISA-95</span>
    </div>
    <div class="hero-stat tooltip-wrap">
      <span class="num" data-count="6">0</span>
      <span class="label">Protocolos</span>
      <span class="tooltip-text">Modbus, DNP3, OPC UA…</span>
    </div>
    <div class="hero-stat tooltip-wrap">
      <span class="num" data-count="1970">0</span>
      <span class="label">Origem</span>
      <span class="tooltip-text">Década de origem do SCADA</span>
    </div>
  </div>
  <div class="scroll-indicator">
    <span>Scroll para explorar</span>
    <span class="arrow">⌄</span>
  </div>
</header>

<!-- NAV -->
<nav id="mainNav">
  <div class="nav-inner">
    <a href="#inicio" class="nav-logo">⚡ SCADA Guide</a>
    <div class="nav-right">
      <ul class="nav-links" id="navLinks">
        <li><a href="#o-que-e" data-section="o-que-e">O que é SCADA</a></li>
        <li><a href="#niveis" data-section="niveis">Níveis</a></li>
        <li><a href="#fluxo-dados" data-section="fluxo-dados">Fluxo de Dados</a></li>
        <li><a href="#rede" data-section="rede">Rede</a></li>
        <li><a href="#caso-estudo" data-section="caso-estudo">Caso: Hidrelétrica</a></li>
        <li><a href="#resumo" data-section="resumo">Resumo</a></li>
      </ul>
      <button class="theme-toggle" id="themeToggle" title="Alternar tema">🌙</button>
      <button class="hamburger" id="hamburger">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>

<!-- O QUE É SCADA -->
<section id="o-que-e">
  <div class="section-label reveal">Fundamentos</div>
  <h2 class="reveal">O que é um Sistema SCADA?</h2>
  
  <div class="img-container reveal">
    <img src="assets/sala_controle.jpg" alt="Sala de Controle SCADA" loading="lazy">
    <div class="img-caption"><strong>Sala de Controle Moderna:</strong> Onde o software SCADA consolida dados de milhares de sensores para visualização e tomada de decisão.</div>
  </div>

  <div class="cards-grid">
    <div class="card reveal stagger-1">
      <div class="card-icon">📡</div>
      <h3>Sensores & Atuadores</h3>
      <p>Coletam dados físicos (temperatura, pressão, vazão) e executam comandos (abrir válvulas, ligar motores).</p>
    </div>
    <div class="card reveal stagger-2">
      <div class="card-icon">🖥️</div>
      <h3>CLP / RTU</h3>
      <p>Processam a lógica local de controle e transmitem dados para a central via rede industrial segura.</p>
    </div>
    <div class="card reveal stagger-3">
      <div class="card-icon">📊</div>
      <h3>IHM</h3>
      <p>Interface gráfica que traduz bits e bytes em informações visuais intuitivas para o operador humano.</p>
    </div>
  </div>
</section>

<hr class="section-divider">

<!-- NÍVEIS DE ATUAÇÃO -->
<section id="niveis">
  <div class="section-label reveal">Hierarquia</div>
  <h2 class="reveal">Pirâmide de Automação (ISA-95)</h2>
  <p class="section-intro reveal">Clique em cada nível para explorar os detalhes da arquitetura hierárquica de automação industrial.</p>
  <div class="pyramid-container">
    <div class="pyramid-visual reveal-left">
      <div class="pyramid-level" data-level="4">
        <div class="pyramid-num" style="background:rgba(244,67,54,0.15);color:#f44336">4</div>
        <div class="pyramid-bar" style="background:linear-gradient(135deg,#c62828,#e53935)">Corporativo (ERP)</div>
      </div>
      <div class="pyramid-level" data-level="3">
        <div class="pyramid-num" style="background:rgba(255,152,0,0.15);color:#ff9800">3</div>
        <div class="pyramid-bar" style="background:linear-gradient(135deg,#e65100,#fb8c00)">Planejamento (MES)</div>
      </div>
      <div class="pyramid-level" data-level="2">
        <div class="pyramid-num" style="background:rgba(255,214,0,0.15);color:#ffd600">2</div>
        <div class="pyramid-bar" style="background:linear-gradient(135deg,#f57f17,#fdd835)">Supervisão (SCADA)</div>
      </div>
      <div class="pyramid-level" data-level="1">
        <div class="pyramid-num" style="background:rgba(0,230,118,0.15);color:#00e676">1</div>
        <div class="pyramid-bar" style="background:linear-gradient(135deg,#1b5e20,#43a047)">Controle (CLP)</div>
      </div>
      <div class="pyramid-level" data-level="0">
        <div class="pyramid-num" style="background:rgba(0,212,255,0.15);color:#00d4ff">0</div>
        <div class="pyramid-bar" style="background:linear-gradient(135deg,#01579b,#0288d1)">Campo (Sensores)</div>
      </div>
    </div>
    <div class="pyramid-details reveal-right">
      <div class="detail-card active" id="level-default">
        <h3>⬅ Selecione um nível</h3>
        <p>Clique em qualquer camada da pirâmide para ver a descrição detalhada, exemplos e tecnologias associadas.</p>
      </div>
      <div class="detail-card" id="level-0">
        <h3>Nível 0 — Campo</h3>
        <p>Sensores e atuadores medindo grandezas físicas como temperatura, pressão, nível e vazão. Sinais analógicos (4-20 mA) e digitais são enviados ao CLP.</p>
        <div class="detail-tags">
          <span class="tag">Sensores</span><span class="tag">Atuadores</span><span class="tag">4-20 mA</span><span class="tag">HART</span>
        </div>
      </div>
      <div class="detail-card" id="level-1">
        <h3>Nível 1 — Controle</h3>
        <p>CLPs executando lógica de intertravamento, malhas PID e sequenciamento. RTUs em locais remotos comunicam via rádio ou celular.</p>
        <div class="detail-tags">
          <span class="tag">CLP</span><span class="tag">RTU</span><span class="tag">PID</span><span class="tag">Ladder</span>
        </div>
      </div>
      <div class="detail-card" id="level-2">
        <h3>Nível 2 — Supervisão</h3>
        <p>SCADA e IHMs centralizando o monitoramento, alarmes, tendências e comandos operacionais. É aqui que os operadores tomam decisões.</p>
        <div class="detail-tags">
          <span class="tag">SCADA</span><span class="tag">IHM</span><span class="tag">Historian</span><span class="tag">Alarmes</span>
        </div>
      </div>
      <div class="detail-card" id="level-3">
        <h3>Nível 3 — Planejamento</h3>
        <p>MES gerenciando a produção, qualidade e eficiência (OEE). Scheduling, rastreabilidade e gestão de ordens de trabalho.</p>
        <div class="detail-tags">
          <span class="tag">MES</span><span class="tag">OEE</span><span class="tag">Scheduling</span><span class="tag">KPIs</span>
        </div>
      </div>
      <div class="detail-card" id="level-4">
        <h3>Nível 4 — Corporativo</h3>
        <p>ERP integrando a planta com as decisões de negócio, finanças, supply chain e recursos humanos. SAP, Oracle, etc.</p>
        <div class="detail-tags">
          <span class="tag">ERP</span><span class="tag">SAP</span><span class="tag">BI</span><span class="tag">Supply Chain</span>
        </div>
      </div>
    </div>
  </div>
</section>

<hr class="section-divider">

<!-- FLUXO DE DADOS -->
<section id="fluxo-dados">
  <div class="section-label reveal">Visão Sistêmica</div>
  <h2 class="reveal">Fluxo: Da Coleta à Central</h2>
  <p class="section-intro reveal">Veja como as informações de uma infraestrutura (como uma cidade inteligente ou estação de tratamento) viajam até o SCADA.</p>
  
  <div class="img-container reveal">
    <img src="assets/arquitetura_cidade.png" alt="Arquitetura SCADA em Cidade Inteligente/Água" loading="lazy">
    <div class="img-caption"><strong>Arquitetura Distribuída:</strong> Sensores em campo (RTUs) coletam dados de vazão e pressão, que são transmitidos via rádio, fibra ou 5G até os servidores centrais.</div>
  </div>

  <div class="highlight-box reveal">
    <p>💡 O dado nasce como um sinal elétrico no sensor, é digitalizado pelo CLP/RTU, encapsulado em protocolos como <strong>DNP3</strong> ou <strong>Modbus TCP</strong>, e viaja pela rede até ser interpretado pelo servidor SCADA.</p>
  </div>

  <!-- CHART -->
  <div class="chart-container reveal">
    <h3>📈 Distribuição de Protocolos em Sistemas SCADA</h3>
    <div class="chart-wrapper">
      <canvas id="protocolChart"></canvas>
    </div>
  </div>
</section>

<hr class="section-divider">

<!-- REDE E PROTOCOLOS -->
<section id="rede">
  <div class="section-label reveal">Infraestrutura</div>
  <h2 class="reveal">Caminho pela Rede e Protocolos</h2>
  
  <div class="img-container reveal">
    <img src="assets/fluxo_rede.png" alt="Fluxo de Rede e Protocolos SCADA" loading="lazy">
    <div class="img-caption"><strong>Segmentação de Rede:</strong> O tráfego de controle é isolado via VLANs e Firewalls para garantir que falhas na rede corporativa não afetem a operação industrial.</div>
  </div>

  <div class="network-diagram reveal">
    <div class="net-layers">
      <div class="net-layer" style="background:rgba(244,67,54,0.04);border:1px solid rgba(244,67,54,0.2)">
        <div class="net-layer-info">
          <h4>🏢 Rede Corporativa (TI)</h4>
          <p>ERP, Internet, e-mail, Gestão.</p>
        </div>
        <span class="net-layer-proto" style="background:var(--red)">HTTP / TCP
