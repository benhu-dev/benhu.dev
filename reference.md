/* global React */
const { useState: useStateP, useEffect: useEffectP, useRef: useRefP } = React;

// Generate a stylized SVG "screenshot" placeholder for each project
function ProjectScreenshot({ palette, label, type }) {
  // type: 'dashboard' | 'editor' | 'marketing' | 'mobile' | 'data'
  const W = 1440, H = 900;
  const [c1, c2, c3] = palette;

  const renderInner = () => {
    if (type === 'dashboard') {
      return (
        <g>
          {/* sidebar */}
          <rect x="0" y="0" width="240" height={H} fill={c1} opacity="0.95"/>
          <rect x="24" y="36" width="120" height="14" rx="3" fill={c3} opacity="0.9"/>
          {[0,1,2,3,4,5].map(i => (
            <g key={i}>
              <rect x="24" y={100 + i*52} width="16" height="16" rx="3" fill={c3} opacity={i===1?1:0.4}/>
              <rect x="50" y={104 + i*52} width={120 - i*8} height="8" rx="2" fill="#fff" opacity={i===1?0.9:0.35}/>
            </g>
          ))}
          {/* main */}
          <rect x="240" y="0" width={W-240} height="72" fill={c1} opacity="0.6"/>
          <rect x="280" y="28" width="180" height="16" rx="3" fill="#fff" opacity="0.7"/>
          {/* big stat cards */}
          {[0,1,2].map(i => (
            <g key={i}>
              <rect x={280 + i*340} y="120" width="300" height="160" rx="10" fill={c2} opacity="0.85"/>
              <rect x={300 + i*340} y="148" width="80" height="10" rx="2" fill="#fff" opacity="0.5"/>
              <rect x={300 + i*340} y="176" width={140 - i*20} height="28" rx="3" fill="#fff" opacity="0.95"/>
              <rect x={300 + i*340} y="222" width="240" height="36" rx="4" fill={c3} opacity={0.4 + i*0.15}/>
            </g>
          ))}
          {/* chart */}
          <rect x="280" y="320" width="640" height="380" rx="10" fill={c2} opacity="0.85"/>
          <polyline points="320,640 420,560 520,600 620,480 720,520 820,400 880,440"
            fill="none" stroke={c3} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>
          <polyline points="320,680 420,620 520,640 620,580 720,600 820,520 880,560"
            fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" opacity="0.6"/>
          {/* table */}
          <rect x="940" y="320" width="440" height="380" rx="10" fill={c2} opacity="0.85"/>
          {[0,1,2,3,4,5].map(i => (
            <g key={i}>
              <rect x="970" y={350 + i*55} width="40" height="40" rx="20" fill={c3} opacity="0.5"/>
              <rect x="1024" y={362 + i*55} width={140 + (i%3)*30} height="8" rx="2" fill="#fff" opacity="0.7"/>
              <rect x="1024" y={380 + i*55} width={80 + (i%2)*40} height="6" rx="2" fill="#fff" opacity="0.35"/>
              <rect x="1300" y={368 + i*55} width="40" height="14" rx="7" fill={c3} opacity="0.7"/>
            </g>
          ))}
        </g>
      );
    }
    if (type === 'editor') {
      return (
        <g>
          <rect x="0" y="0" width={W} height="48" fill={c1}/>
          <circle cx="22" cy="24" r="6" fill="#f7768e"/>
          <circle cx="44" cy="24" r="6" fill="#ff9e64"/>
          <circle cx="66" cy="24" r="6" fill="#9ece6a"/>
          <rect x="100" y="14" width="200" height="20" rx="4" fill={c2} opacity="0.7"/>
          {/* file tree */}
          <rect x="0" y="48" width="220" height={H-48} fill={c1} opacity="0.85"/>
          {[0,1,2,3,4,5,6,7].map(i => (
            <rect key={i} x={20 + (i%3===0?0:16)} y={80 + i*30}
              width={140 - (i%4)*16} height="10" rx="2"
              fill={i%3===0 ? c3 : '#fff'} opacity={i%3===0 ? 0.9 : 0.5}/>
          ))}
          {/* code area */}
          {[
            {c: c3, w: 80}, {c: '#fff', w: 220}, {c: c3, w: 60},
            {c: c2, w: 300, indent: 1}, {c: '#fff', w: 240, indent: 1},
            {c: c3, w: 100}, {c: '#fff', w: 280},
            {c: c2, w: 340, indent: 1}, {c: '#fff', w: 200, indent: 1},
            {c: '#fff', w: 160, indent: 1}, {c: c3, w: 60},
            {c: '#fff', w: 320}, {c: c3, w: 100},
            {c: c2, w: 280, indent: 1}, {c: '#fff', w: 240, indent: 1},
          ].map((line, i) => (
            <g key={i}>
              <rect x="240" y={80 + i*36} width="20" height="10" rx="2" fill="#fff" opacity="0.25"/>
              <rect x={280 + (line.indent||0)*40} y={80 + i*36}
                width={line.w} height="14" rx="3"
                fill={line.c} opacity="0.85"/>
            </g>
          ))}
          {/* preview pane */}
          <rect x="950" y="48" width={W-950} height={H-48} fill={c2} opacity="0.6"/>
          <rect x="980" y="100" width="380" height="280" rx="10" fill="#fff" opacity="0.15"/>
          <rect x="1010" y="140" width="200" height="18" rx="3" fill="#fff" opacity="0.85"/>
          <rect x="1010" y="170" width="320" height="10" rx="2" fill="#fff" opacity="0.5"/>
          <rect x="1010" y="186" width="280" height="10" rx="2" fill="#fff" opacity="0.5"/>
          <rect x="1010" y="220" width="120" height="36" rx="6" fill={c3} opacity="0.9"/>
          <rect x="980" y="420" width="380" height="180" rx="10" fill="#fff" opacity="0.1"/>
        </g>
      );
    }
    if (type === 'mobile') {
      return (
        <g>
          {/* Backdrop */}
          <rect x="0" y="0" width={W} height={H} fill={c1}/>
          <circle cx="220" cy="180" r="160" fill={c3} opacity="0.18"/>
          <circle cx="1240" cy="720" r="220" fill={c3} opacity="0.14"/>
          {/* phone */}
          <rect x="540" y="60" width="360" height="780" rx="40" fill={c2} stroke={c3} strokeWidth="3" opacity="0.95"/>
          <rect x="560" y="120" width="320" height="700" rx="20" fill={c1}/>
          {/* mobile content */}
          <rect x="580" y="150" width="120" height="14" rx="3" fill="#fff" opacity="0.9"/>
          <rect x="580" y="172" width="180" height="22" rx="3" fill={c3} opacity="0.95"/>
          {[0,1,2,3].map(i => (
            <g key={i}>
              <rect x="580" y={220 + i*120} width="280" height="100" rx="10" fill={c2} opacity="0.95"/>
              <rect x="600" y={240 + i*120} width="60" height="60" rx="8" fill={c3} opacity={0.3 + i*0.15}/>
              <rect x="680" y={250 + i*120} width="140" height="12" rx="2" fill="#fff" opacity="0.85"/>
              <rect x="680" y={270 + i*120} width="100" height="8" rx="2" fill="#fff" opacity="0.5"/>
              <rect x="680" y={285 + i*120} width="80" height="8" rx="2" fill="#fff" opacity="0.5"/>
            </g>
          ))}
          {/* nav floating */}
          <rect x="100" y="380" width="320" height="180" rx="14" fill={c2} opacity="0.95"/>
          <rect x="124" y="408" width="220" height="18" rx="3" fill="#fff" opacity="0.9"/>
          <rect x="124" y="436" width="240" height="10" rx="2" fill="#fff" opacity="0.5"/>
          <rect x="124" y="454" width="200" height="10" rx="2" fill="#fff" opacity="0.5"/>
          <rect x="124" y="490" width="120" height="36" rx="6" fill={c3}/>
          <rect x="1020" y="500" width="320" height="220" rx="14" fill={c2} opacity="0.95"/>
          <rect x="1044" y="528" width="180" height="18" rx="3" fill="#fff" opacity="0.9"/>
          <rect x="1044" y="558" width="270" height="120" rx="8" fill={c3} opacity="0.4"/>
        </g>
      );
    }
    if (type === 'data') {
      return (
        <g>
          {/* nav top */}
          <rect x="0" y="0" width={W} height="64" fill={c1}/>
          <rect x="40" y="22" width="100" height="20" rx="3" fill={c3}/>
          {/* big chart */}
          <rect x="40" y="100" width={W-80} height="300" rx="12" fill={c2} opacity="0.9"/>
          {/* bars */}
          {[60, 110, 80, 140, 200, 160, 220, 180, 250, 170, 130, 90, 200, 230, 180].map((h, i) => (
            <rect key={i}
              x={80 + i*88} y={380 - h}
              width="50" height={h} rx="4"
              fill={i % 3 === 0 ? c3 : '#fff'}
              opacity={i % 3 === 0 ? 0.95 : 0.6}/>
          ))}
          {/* row of stat cards */}
          {[0,1,2,3].map(i => (
            <g key={i}>
              <rect x={40 + i*340} y="440" width="320" height="120" rx="10" fill={c2} opacity="0.85"/>
              <rect x={64 + i*340} y="464" width="80" height="10" rx="2" fill="#fff" opacity="0.5"/>
              <rect x={64 + i*340} y="486" width={120 + (i%2)*40} height="28" rx="3" fill={c3} opacity="0.9"/>
              <rect x={64 + i*340} y="528" width="200" height="10" rx="2" fill="#fff" opacity="0.4"/>
            </g>
          ))}
          {/* table */}
          <rect x="40" y="600" width={W-80} height="280" rx="10" fill={c2} opacity="0.85"/>
          {[0,1,2,3,4].map(i => (
            <g key={i}>
              <rect x="64" y={628 + i*48} width="40" height="40" rx="6" fill={c3} opacity="0.5"/>
              <rect x="120" y={642 + i*48} width={200 + (i%3)*40} height="10" rx="2" fill="#fff" opacity="0.8"/>
              <rect x="120" y={660 + i*48} width="120" height="8" rx="2" fill="#fff" opacity="0.4"/>
              <rect x={W-260} y={638 + i*48} width="80" height="20" rx="10" fill={c3} opacity="0.7"/>
              <rect x={W-160} y={638 + i*48} width="120" height="20" rx="10" fill="#fff" opacity="0.3"/>
            </g>
          ))}
        </g>
      );
    }
    // marketing default
    return (
      <g>
        <rect x="0" y="0" width={W} height="80" fill={c1} opacity="0.6"/>
        <rect x="60" y="32" width="120" height="16" rx="3" fill={c3}/>
        {[0,1,2,3].map(i => (
          <rect key={i} x={W-440 + i*100} y="34" width="60" height="12" rx="2" fill="#fff" opacity="0.5"/>
        ))}
        <rect x="60" y="160" width="200" height="14" rx="3" fill={c3} opacity="0.9"/>
        <rect x="60" y="200" width="700" height="56" rx="3" fill="#fff" opacity="0.95"/>
        <rect x="60" y="270" width="600" height="56" rx="3" fill="#fff" opacity="0.95"/>
        <rect x="60" y="360" width="520" height="14" rx="3" fill="#fff" opacity="0.6"/>
        <rect x="60" y="384" width="460" height="14" rx="3" fill="#fff" opacity="0.6"/>
        <rect x="60" y="440" width="180" height="48" rx="6" fill={c3}/>
        <rect x="260" y="440" width="180" height="48" rx="6" fill="transparent" stroke="#fff" strokeWidth="2" opacity="0.6"/>
        {/* hero illustration on the right */}
        <rect x="820" y="140" width="540" height="540" rx="24" fill={c2} opacity="0.85"/>
        <circle cx="1090" cy="380" r="180" fill={c3} opacity="0.55"/>
        <rect x="900" y="440" width="380" height="20" rx="4" fill="#fff" opacity="0.85"/>
        <rect x="900" y="476" width="280" height="16" rx="3" fill="#fff" opacity="0.55"/>
        <rect x="900" y="520" width="160" height="40" rx="6" fill={c1}/>
        {/* footer rows */}
        {[0,1,2].map(i => (
          <g key={i}>
            <rect x={60 + i*440} y="740" width="80" height="80" rx="14" fill={c2}/>
            <rect x={160 + i*440} y="754" width="220" height="14" rx="3" fill="#fff" opacity="0.85"/>
            <rect x={160 + i*440} y="780" width="280" height="10" rx="2" fill="#fff" opacity="0.5"/>
            <rect x={160 + i*440} y="796" width="240" height="10" rx="2" fill="#fff" opacity="0.5"/>
          </g>
        ))}
      </g>
    );
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <linearGradient id={`bg-${label}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} stopOpacity="0.9"/>
          <stop offset="100%" stopColor={c2} stopOpacity="0.95"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={W} height={H} fill={`url(#bg-${label})`}/>
      {renderInner()}
    </svg>
  );
}

const PROJECTS = [
  {
    id: 'commerce',
    title: 'orbit/commerce',
    tagline: 'Headless storefront platform with sub-100ms TTFB',
    stats: [
      { icon: '🏬', label: '1.2k+ stores' },
      { icon: '💰', label: '$4.8M GMV processed' },
    ],
    stack: [
      { name: 'Next.js', color: 'var(--blue)' },
      { name: 'Node.js', color: 'var(--purple)' },
      { name: 'PostgreSQL', color: 'var(--purple)' },
      { name: 'Redis', color: 'var(--purple)' },
      { name: 'AWS', color: 'var(--orange)' },
    ],
    palette: ['#0d2840', '#1a3a5c', '#7aa2f7'],
    type: 'dashboard',
  },
  {
    id: 'lattice',
    title: 'lattice',
    tagline: 'Realtime collaborative whiteboard for distributed teams',
    stats: [
      { icon: '📊', label: '600+ daily active rooms' },
      { icon: '⚡', label: '<30ms cursor latency' },
    ],
    stack: [
      { name: 'React', color: 'var(--blue)' },
      { name: 'TypeScript', color: 'var(--blue)' },
      { name: 'Yjs', color: 'var(--purple)' },
      { name: 'WebRTC', color: 'var(--purple)' },
    ],
    palette: ['#1f1530', '#2d2148', '#bb9af7'],
    type: 'editor',
  },
  {
    id: 'sift',
    title: 'sift.dev',
    tagline: 'CLI + dashboard for log search across heterogeneous services',
    stats: [
      { icon: '🟢', label: '99.9% uptime' },
      { icon: '📦', label: '18B events indexed' },
    ],
    stack: [
      { name: 'Go', color: 'var(--blue)' },
      { name: 'ClickHouse', color: 'var(--purple)' },
      { name: 'gRPC', color: 'var(--purple)' },
      { name: 'Terraform', color: 'var(--orange)' },
    ],
    palette: ['#102a22', '#194036', '#9ece6a'],
    type: 'data',
  },
  {
    id: 'pace',
    title: 'pace',
    tagline: 'iOS-first habit tracker with offline-first CRDT sync',
    stats: [
      { icon: '⬇️', label: '24k downloads' },
      { icon: '⭐', label: '4.8 App Store rating' },
    ],
    stack: [
      { name: 'React Native', color: 'var(--blue)' },
      { name: 'TypeScript', color: 'var(--blue)' },
      { name: 'SQLite', color: 'var(--purple)' },
      { name: 'Swift', color: 'var(--orange)' },
    ],
    palette: ['#3a1f1a', '#522d28', '#ff9e64'],
    type: 'mobile',
  },
  {
    id: 'kindle-club',
    title: 'kindle.club',
    tagline: 'A book-club companion that turns highlights into discussion prompts',
    stats: [
      { icon: '🧪', label: 'Side project' },
      { icon: '🚀', label: '3k+ signups in 6 weeks' },
    ],
    stack: [
      { name: 'Astro', color: 'var(--blue)' },
      { name: 'SvelteKit', color: 'var(--blue)' },
      { name: 'SQLite', color: 'var(--purple)' },
      { name: 'OpenAI', color: 'var(--orange)' },
    ],
    palette: ['#3b1d2a', '#552a3d', '#f7768e'],
    type: 'marketing',
  },
];

function Projects() {
  const sectionRef = useRefP(null);
  const trackRef = useRefP(null);
  const [active, setActive] = useStateP(0);     // 0-indexed active card
  const [isMobile, setIsMobile] = useStateP(false);
  const [reduced, setReduced] = useStateP(false);
  const total = PROJECTS.length;
  const pad = (n) => String(n).padStart(2, '0');

  useEffectP(() => {
    const mqMobile = window.matchMedia('(max-width: 1023px), (pointer: coarse)');
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setIsMobile(mqMobile.matches);
      setReduced(mqReduce.matches);
    };
    update();
    mqMobile.addEventListener('change', update);
    mqReduce.addEventListener('change', update);
    return () => {
      mqMobile.removeEventListener('change', update);
      mqReduce.removeEventListener('change', update);
    };
  }, []);

  const useStepped = !isMobile && !reduced;

  // ===== Stepped scroll-lock mode (desktop) =====
  // Architecture: section is a fixed 100vh container. When it aligns with
  // viewport top, we lock body scroll (overflow:hidden) and intercept wheel
  // events to advance cards. At edges, we release the lock and nudge the
  // page to the next/prev section so navigation feels natural.
  const animatingRef = useRefP(false);
  const cooldownRef = useRefP(false);
  const idleTimerRef = useRefP(null);
  const gestureLockRef = useRefP(false);
  const lastSwitchAtRef = useRefP(0);
  const lastDirRef = useRefP(0);
  const activeRef = useRefP(0);
  const lockedRef = useRefP(false);
  const releaseAtRef = useRefP(0); // suppress re-lock for a moment after release

  useEffectP(() => { activeRef.current = active; }, [active]);

  useEffectP(() => {
    if (!useStepped) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const positionTrack = (idx, animate) => {
      const cards = track.querySelectorAll('[data-card]');
      if (!cards.length) return;
      const card = cards[idx];
      if (!card) return;
      const padX = window.innerWidth * 0.1;
      const targetX = -card.offsetLeft + padX;
      track.style.transition = animate
        ? 'transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)'
        : 'none';
      track.style.transform = `translate3d(${targetX}px, 0, 0)`;
    };

    positionTrack(activeRef.current, false);

    const lockBody = () => {
      if (lockedRef.current) return;
      lockedRef.current = true;
      // Snap section to top precisely
      const r = section.getBoundingClientRect();
      const targetTop = window.scrollY + r.top;
      window.scrollTo({ top: targetTop, behavior: 'auto' });
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    };

    const unlockBody = () => {
      if (!lockedRef.current) return;
      lockedRef.current = false;
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      releaseAtRef.current = performance.now();
      // Reset gesture state so the next entry is clean
      animatingRef.current = false;
      cooldownRef.current = false;
      gestureLockRef.current = false;
      if (idleTimerRef.current) { clearTimeout(idleTimerRef.current); idleTimerRef.current = null; }
    };

    const advance = (dir) => {
      if (animatingRef.current || cooldownRef.current) return false;
      const next = activeRef.current + dir;
      if (next < 0 || next >= total) return false;
      animatingRef.current = true;
      cooldownRef.current = true;
      gestureLockRef.current = true;
      activeRef.current = next;
      setActive(next);
      positionTrack(next, true);
      lastSwitchAtRef.current = performance.now();
      lastDirRef.current = dir;
      window.setTimeout(() => { animatingRef.current = false; }, 720);
      window.setTimeout(() => { cooldownRef.current = false; }, 900);
      return true;
    };

    const armIdleTimer = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        gestureLockRef.current = false;
        idleTimerRef.current = null;
      }, 150);
    };

    // IntersectionObserver: lock when section aligns with viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const r = entry.boundingClientRect;
        // Don't re-lock immediately after release (give user a moment)
        if (performance.now() - releaseAtRef.current < 800) return;
        // Lock when section is fully in viewport (top ≈ 0 and ratio ≈ 1)
        if (entry.intersectionRatio >= 0.98 && Math.abs(r.top) < 10) {
          lockBody();
        }
      });
    }, { threshold: [0, 0.5, 0.98, 1] });
    observer.observe(section);

    const onWheel = (e) => {
      if (!lockedRef.current) return;
      const dy = e.deltaY;
      const dx = e.deltaX;
      const delta = Math.abs(dy) > Math.abs(dx) ? dy : dx;
      if (Math.abs(delta) < 2) return;

      const dir = delta > 0 ? 1 : -1;

      // Always preventDefault while locked — this is the contract
      e.preventDefault();

      // Edge release: at last card going down, or first card going up,
      // release lock and nudge the page in that direction
      if (dir > 0 && activeRef.current >= total - 1) {
        unlockBody();
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        return;
      }
      if (dir < 0 && activeRef.current <= 0) {
        unlockBody();
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
        return;
      }

      armIdleTimer();
      if (animatingRef.current || cooldownRef.current) return;
      if (gestureLockRef.current) return;
      const sinceLast = performance.now() - lastSwitchAtRef.current;
      if (lastDirRef.current === dir && sinceLast < 1000) return;

      advance(dir);
    };

    const onKey = (e) => {
      if (!lockedRef.current) return;
      const isNext = e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ';
      const isPrev = e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp';
      if (!isNext && !isPrev) return;
      const dir = isNext ? 1 : -1;
      e.preventDefault();
      if (dir > 0 && activeRef.current >= total - 1) {
        unlockBody();
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        return;
      }
      if (dir < 0 && activeRef.current <= 0) {
        unlockBody();
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
        return;
      }
      if (animatingRef.current || cooldownRef.current) return;
      advance(dir);
    };

    const onResize = () => positionTrack(activeRef.current, false);

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      // Always unlock body on unmount
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [useStepped, total]);

  // ===== Mobile/touch swipe mode =====
  const mobileScrollerRef = useRefP(null);
  useEffectP(() => {
    if (useStepped) return;
    const el = mobileScrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const cards = el.querySelectorAll('[data-card]');
      let bestIdx = 0, bestDist = Infinity;
      const center = el.scrollLeft + el.clientWidth * 0.4;
      cards.forEach((c, i) => {
        const cx = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(cx - center);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      });
      setActive(bestIdx);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, [useStepped]);

  const skipToExperience = () => {
    // Unlock body scroll if locked
    if (lockedRef.current) {
      lockedRef.current = false;
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      releaseAtRef.current = performance.now();
    }
    const target = document.getElementById('experience');
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const goTo = (idx) => {
    if (animatingRef.current || cooldownRef.current) return;
    if (idx === activeRef.current || idx < 0 || idx >= total) return;
    const track = trackRef.current;
    if (!track) return;
    animatingRef.current = true;
    cooldownRef.current = true;
    activeRef.current = idx;
    setActive(idx);
    const cards = track.querySelectorAll('[data-card]');
    const card = cards[idx];
    if (card) {
      const padX = window.innerWidth * 0.1;
      track.style.transition = 'transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)';
      track.style.transform = `translate3d(${-card.offsetLeft + padX}px, 0, 0)`;
    }
    lastSwitchAtRef.current = performance.now();
    window.setTimeout(() => { animatingRef.current = false; }, 720);
    window.setTimeout(() => { cooldownRef.current = false; }, 900);
  };

  const Header = (
    <div style={{
      maxWidth: 1400, margin: '0 auto',
      padding: '0 64px',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      gap: 24, marginBottom: 20,
      flexShrink: 0,
    }} className="projects-header">
      <div>
        <div className="section-title" style={{ marginBottom: 12 }}>// projects</div>
        <h2 style={{
          fontFamily: 'var(--mono)', fontWeight: 700,
          fontSize: 'clamp(32px, 4vw, 48px)',
          color: 'var(--fg)', letterSpacing: '-0.01em', lineHeight: 1.1,
        }}>
          things I&apos;ve <span style={{ color: 'var(--green)' }}>shipped</span>.
        </h2>
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12,
        minWidth: 280,
      }} className="projects-meta">
        <div style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--fg-2)' }}>
          <span style={{ color: 'var(--green)' }}>{pad(active + 1)}</span>
          <span style={{ color: 'var(--comment)' }}> / {pad(total)}</span>
        </div>
        {/* Stepped progress: discrete segments */}
        <div style={{
          display: 'flex', gap: 4, width: 240,
        }}>
          {PROJECTS.map((_, i) => (
            <button key={i}
              onClick={() => useStepped ? goTo(i) : null}
              aria-label={`Go to project ${i + 1}`}
              style={{
                flex: 1, height: 6, padding: 0,
                background: i <= active
                  ? (i === active ? 'var(--green)' : 'var(--blue)')
                  : 'var(--bg-2)',
                border: '1px solid var(--border)',
                borderRadius: 4,
                cursor: useStepped ? 'pointer' : 'default',
                transition: 'background 0.4s ease',
              }}/>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--comment)' }}>
          {useStepped ? 'scroll · ←/→' : 'swipe →'}
        </div>
      </div>
    </div>
  );

  // ====== Mobile rendering: simple touch-swipe scroller ======
  if (!useStepped) {
    return (
      <section style={{
        maxWidth: 'none', width: '100%',
        padding: '120px 0',
      }} className="projects-section">
        <span id="projects" className="anchor"></span>
        {Header}
        <div ref={mobileScrollerRef}
          className="hide-scrollbar"
          style={{
            display: 'flex',
            gap: 24,
            overflowX: 'auto',
            overflowY: 'hidden',
            padding: '8px 24px 24px',
            scrollSnapType: 'x mandatory',
            scrollPaddingLeft: 24,
            WebkitOverflowScrolling: 'touch',
          }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i+1} />
          ))}
          <div style={{ flex: '0 0 24px' }} aria-hidden="true"></div>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'center', gap: 8,
          marginTop: 16,
        }}>
          {PROJECTS.map((_, i) => (
            <span key={i} style={{
              width: i === active ? 22 : 8,
              height: 8, borderRadius: 4,
              background: i === active ? 'var(--green)' : 'var(--border)',
              transition: 'all 0.2s ease',
            }}></span>
          ))}
        </div>

        <style>{`
          .hide-scrollbar { scrollbar-width: thin; scrollbar-color: var(--border) transparent; }
          .hide-scrollbar::-webkit-scrollbar { height: 8px; }
          .hide-scrollbar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
          .projects-header { padding: 0 24px !important; flex-direction: column; align-items: flex-start !important; }
          .projects-meta { align-items: flex-start !important; }
        `}</style>
      </section>
    );
  }

  // ====== Desktop stepped scroll-lock ======
  // Section is exactly 100vh — no oversized container, no sticky.
  // Body scroll is locked while user is inside the section (managed by effect above).

  return (
    <section ref={sectionRef} className="projects-section" style={{
      maxWidth: 'none', width: '100%',
      padding: 0,
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
    }}>
      <span id="projects" className="anchor"></span>

      <div style={{
        height: '100%',
        width: '100%',
        display: 'flex', flexDirection: 'column',
        paddingTop: 64,
        paddingBottom: 32,
        overflow: 'hidden',
      }}>
        {Header}

        <div style={{
          flex: 1,
          minHeight: 0,
          display: 'flex', alignItems: 'stretch',
          overflow: 'hidden',
          padding: '8px 0 24px',
        }}>
          <div ref={trackRef} style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: '4vw',
            paddingLeft: '10vw',
            paddingRight: '10vw',
            willChange: 'transform',
            transform: 'translate3d(0,0,0)',
          }}>
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i+1} dimmed={i !== active}/>
            ))}
          </div>
        </div>

        {/* Prev / Next + Skip */}
        <div style={{
          position: 'absolute',
          right: 24, bottom: 24,
          display: 'flex', gap: 8,
          zIndex: 5,
        }}>
          <button onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous project"
            style={navBtnStyle(active === 0)}>←</button>
          <button onClick={() => goTo(active + 1)}
            disabled={active === total - 1}
            aria-label="Next project"
            style={navBtnStyle(active === total - 1)}>→</button>
          <button onClick={skipToExperience}
            style={{
              background: 'var(--bg-2)',
              border: '1px solid var(--border)',
              color: 'var(--fg-2)',
              fontFamily: 'var(--mono)',
              fontSize: 12,
              padding: '8px 14px',
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--green)'; e.currentTarget.style.borderColor = 'var(--green)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg-2)'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
            [ skip → ]
          </button>
        </div>
      </div>

      <style>{`
        .hide-scrollbar { scrollbar-width: thin; scrollbar-color: var(--border) transparent; }
        .hide-scrollbar::-webkit-scrollbar { height: 8px; }
        .hide-scrollbar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
        @media (max-width: 1023px) {
          .projects-header { padding: 0 24px !important; flex-direction: column; align-items: flex-start !important; }
          .projects-meta { align-items: flex-start !important; }
        }
      `}</style>
    </section>
  );
}

function navBtnStyle(disabled) {
  return {
    background: 'var(--bg-2)',
    border: '1px solid var(--border)',
    color: disabled ? 'var(--comment)' : 'var(--fg)',
    fontFamily: 'var(--mono)',
    fontSize: 14,
    width: 36, height: 36,
    borderRadius: 6,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.18s ease',
  };
}

function ProjectCard({ project, index, dimmed }) {
  const [hover, setHover] = useStateP(false);
  const p = project;
  return (
    <article data-card
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: '0 0 80vw',
        width: '80vw',
        maxWidth: 1120,
        minWidth: 320,
        height: '100%',           // fills the cards row (which has flex:1 in the section)
        scrollSnapAlign: 'start',
        position: 'relative',
        borderRadius: 14,
        overflow: 'hidden',
        background: 'var(--bg-2)',
        border: `1px solid ${hover && !dimmed ? 'var(--blue)' : 'var(--border)'}`,
        boxShadow: hover && !dimmed
          ? '0 24px 48px -16px rgba(0,0,0,0.6), 0 0 0 1px rgba(122,162,247,0.2)'
          : '0 8px 24px -12px rgba(0,0,0,0.5)',
        transform: hover && !dimmed ? 'translateY(-6px)' : 'translateY(0)',
        opacity: dimmed ? 0.25 : 1,
        filter: dimmed ? 'saturate(0.6) blur(1px)' : 'none',
        transition: 'opacity 0.5s ease, filter 0.5s ease, transform 0.32s cubic-bezier(0.2, 0.7, 0.2, 1), border-color 0.32s ease, box-shadow 0.32s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="project-card">
      {/* Top: mockup screenshot region — flex:1 so it takes remaining space */}
      <div style={{
        flex: '1 1 auto',
        minHeight: 0,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <ProjectScreenshot palette={p.palette} label={p.id} type={p.type}/>
        {/* index badge over screenshot */}
        <div style={{
          position: 'absolute', top: 16, left: 18,
          fontFamily: 'var(--mono)', fontSize: 12,
          color: 'var(--fg-2)',
          background: 'rgba(26,27,38,0.7)',
          padding: '4px 10px', borderRadius: 4,
          border: '1px solid var(--border)',
          backdropFilter: 'blur(8px)',
        }}>
          <span style={{ color: 'var(--comment)' }}>#</span>
          <span style={{ color: 'var(--orange)' }}>{String(index).padStart(2, '0')}</span>
        </div>
        {/* Soft fade at bottom into content area */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 60,
          background: 'linear-gradient(to bottom, rgba(26,27,38,0) 0%, var(--bg-2) 100%)',
          pointerEvents: 'none',
        }}></div>
      </div>

      {/* Bottom: content region — fixed sizing, no shrink */}
      <div style={{
        flex: '0 0 auto',
        padding: '20px 28px 24px',
        display: 'flex', flexDirection: 'column', gap: 12,
        background: 'var(--bg-2)',
        borderTop: '1px solid var(--border)',
      }} className="card-content">
        {/* tech tags */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '4px 10px',
          fontFamily: 'var(--mono)', fontSize: 12,
          flexShrink: 0,
        }}>
          {p.stack.map(t => (
            <span key={t.name} style={{ color: t.color }}>
              <span style={{ color: 'var(--comment)' }}>·</span> {t.name}
            </span>
          ))}
        </div>
        {/* title */}
        <h3 style={{
          fontFamily: 'var(--mono)', fontWeight: 700,
          fontSize: 'clamp(24px, 2.6vw, 36px)',
          color: 'var(--fg)', lineHeight: 1.05,
          letterSpacing: '-0.01em',
          flexShrink: 0,
        }}>
          {p.title}
        </h3>
        {/* tagline */}
        <p style={{
          color: 'var(--fg-2)', fontSize: 15, maxWidth: 720,
          fontFamily: 'var(--sans)',
          lineHeight: 1.5,
          flexShrink: 0,
        }}>
          {p.tagline}
        </p>
        {/* stat badges + buttons row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, flexWrap: 'wrap',
          flexShrink: 0,
          marginTop: 4,
        }}>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 8,
          }}>
            {(p.stats || []).map((stat, i) => (
              <span key={i} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'var(--mono)',
                fontSize: 12,
                color: 'var(--fg)',
                background: 'rgba(122,162,247,0.08)',
                border: '1px solid var(--border)',
                borderRadius: 999,
                padding: '5px 12px 5px 10px',
              }}>
                <span style={{ fontSize: 13, lineHeight: 1 }}>{stat.icon}</span>
                <span>{stat.label}</span>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <a href="#" onClick={(e) => e.preventDefault()}
              className="btn btn-primary btn-small">
              [ live <span style={{ fontSize: 11 }}>↗</span> ]
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}
              className="btn btn-ghost btn-small">
              [ code <span style={{ fontSize: 11 }}>↗</span> ]
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

Object.assign(window, { Projects });
