import type { ProjectMockupType } from '@/lib/types';

interface ProjectScreenshotProps {
  palette: [string, string, string];
  label: string;
  type: ProjectMockupType;
}

const W = 1440;
const H = 900;

function Dashboard({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return (
    <g>
      {/* sidebar */}
      <rect x="0" y="0" width="240" height={H} fill={c1} opacity="0.95" />
      <rect x="24" y="36" width="120" height="14" rx="3" fill={c3} opacity="0.9" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect
            x="24"
            y={100 + i * 52}
            width="16"
            height="16"
            rx="3"
            fill={c3}
            opacity={i === 1 ? 1 : 0.4}
          />
          <rect
            x="50"
            y={104 + i * 52}
            width={120 - i * 8}
            height="8"
            rx="2"
            fill="#fff"
            opacity={i === 1 ? 0.9 : 0.35}
          />
        </g>
      ))}
      {/* main */}
      <rect x="240" y="0" width={W - 240} height="72" fill={c1} opacity="0.6" />
      <rect x="280" y="28" width="180" height="16" rx="3" fill="#fff" opacity="0.7" />
      {/* stat cards */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={280 + i * 340}
            y="120"
            width="300"
            height="160"
            rx="10"
            fill={c2}
            opacity="0.85"
          />
          <rect x={300 + i * 340} y="148" width="80" height="10" rx="2" fill="#fff" opacity="0.5" />
          <rect
            x={300 + i * 340}
            y="176"
            width={140 - i * 20}
            height="28"
            rx="3"
            fill="#fff"
            opacity="0.95"
          />
          <rect
            x={300 + i * 340}
            y="222"
            width="240"
            height="36"
            rx="4"
            fill={c3}
            opacity={0.4 + i * 0.15}
          />
        </g>
      ))}
      {/* chart */}
      <rect x="280" y="320" width="640" height="380" rx="10" fill={c2} opacity="0.85" />
      <polyline
        points="320,640 420,560 520,600 620,480 720,520 820,400 880,440"
        fill="none"
        stroke={c3}
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <polyline
        points="320,680 420,620 520,640 620,580 720,600 820,520 880,560"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* table */}
      <rect x="940" y="320" width="440" height="380" rx="10" fill={c2} opacity="0.85" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x="970" y={350 + i * 55} width="40" height="40" rx="20" fill={c3} opacity="0.5" />
          <rect
            x="1024"
            y={362 + i * 55}
            width={140 + (i % 3) * 30}
            height="8"
            rx="2"
            fill="#fff"
            opacity="0.7"
          />
          <rect
            x="1024"
            y={380 + i * 55}
            width={80 + (i % 2) * 40}
            height="6"
            rx="2"
            fill="#fff"
            opacity="0.35"
          />
          <rect x="1300" y={368 + i * 55} width="40" height="14" rx="7" fill={c3} opacity="0.7" />
        </g>
      ))}
    </g>
  );
}

function Editor({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  const lines: ReadonlyArray<{ c: string; w: number; indent?: number }> = [
    { c: c3, w: 80 },
    { c: '#fff', w: 220 },
    { c: c3, w: 60 },
    { c: c2, w: 300, indent: 1 },
    { c: '#fff', w: 240, indent: 1 },
    { c: c3, w: 100 },
    { c: '#fff', w: 280 },
    { c: c2, w: 340, indent: 1 },
    { c: '#fff', w: 200, indent: 1 },
    { c: '#fff', w: 160, indent: 1 },
    { c: c3, w: 60 },
    { c: '#fff', w: 320 },
    { c: c3, w: 100 },
    { c: c2, w: 280, indent: 1 },
    { c: '#fff', w: 240, indent: 1 },
  ];
  return (
    <g>
      <rect x="0" y="0" width={W} height="48" fill={c1} />
      <circle cx="22" cy="24" r="6" fill="#f7768e" />
      <circle cx="44" cy="24" r="6" fill="#ff9e64" />
      <circle cx="66" cy="24" r="6" fill="#9ece6a" />
      <rect x="100" y="14" width="200" height="20" rx="4" fill={c2} opacity="0.7" />
      {/* file tree */}
      <rect x="0" y="48" width="220" height={H - 48} fill={c1} opacity="0.85" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect
          key={i}
          x={20 + (i % 3 === 0 ? 0 : 16)}
          y={80 + i * 30}
          width={140 - (i % 4) * 16}
          height="10"
          rx="2"
          fill={i % 3 === 0 ? c3 : '#fff'}
          opacity={i % 3 === 0 ? 0.9 : 0.5}
        />
      ))}
      {/* code area */}
      {lines.map((line, i) => (
        <g key={i}>
          <rect x="240" y={80 + i * 36} width="20" height="10" rx="2" fill="#fff" opacity="0.25" />
          <rect
            x={280 + (line.indent ?? 0) * 40}
            y={80 + i * 36}
            width={line.w}
            height="14"
            rx="3"
            fill={line.c}
            opacity="0.85"
          />
        </g>
      ))}
      {/* preview pane */}
      <rect x="950" y="48" width={W - 950} height={H - 48} fill={c2} opacity="0.6" />
      <rect x="980" y="100" width="380" height="280" rx="10" fill="#fff" opacity="0.15" />
      <rect x="1010" y="140" width="200" height="18" rx="3" fill="#fff" opacity="0.85" />
      <rect x="1010" y="170" width="320" height="10" rx="2" fill="#fff" opacity="0.5" />
      <rect x="1010" y="186" width="280" height="10" rx="2" fill="#fff" opacity="0.5" />
      <rect x="1010" y="220" width="120" height="36" rx="6" fill={c3} opacity="0.9" />
      <rect x="980" y="420" width="380" height="180" rx="10" fill="#fff" opacity="0.1" />
    </g>
  );
}

function Mobile({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return (
    <g>
      {/* Backdrop */}
      <rect x="0" y="0" width={W} height={H} fill={c1} />
      <circle cx="220" cy="180" r="160" fill={c3} opacity="0.18" />
      <circle cx="1240" cy="720" r="220" fill={c3} opacity="0.14" />
      {/* phone */}
      <rect
        x="540"
        y="60"
        width="360"
        height="780"
        rx="40"
        fill={c2}
        stroke={c3}
        strokeWidth="3"
        opacity="0.95"
      />
      <rect x="560" y="120" width="320" height="700" rx="20" fill={c1} />
      {/* mobile content */}
      <rect x="580" y="150" width="120" height="14" rx="3" fill="#fff" opacity="0.9" />
      <rect x="580" y="172" width="180" height="22" rx="3" fill={c3} opacity="0.95" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x="580"
            y={220 + i * 120}
            width="280"
            height="100"
            rx="10"
            fill={c2}
            opacity="0.95"
          />
          <rect
            x="600"
            y={240 + i * 120}
            width="60"
            height="60"
            rx="8"
            fill={c3}
            opacity={0.3 + i * 0.15}
          />
          <rect
            x="680"
            y={250 + i * 120}
            width="140"
            height="12"
            rx="2"
            fill="#fff"
            opacity="0.85"
          />
          <rect x="680" y={270 + i * 120} width="100" height="8" rx="2" fill="#fff" opacity="0.5" />
          <rect x="680" y={285 + i * 120} width="80" height="8" rx="2" fill="#fff" opacity="0.5" />
        </g>
      ))}
      {/* nav floating */}
      <rect x="100" y="380" width="320" height="180" rx="14" fill={c2} opacity="0.95" />
      <rect x="124" y="408" width="220" height="18" rx="3" fill="#fff" opacity="0.9" />
      <rect x="124" y="436" width="240" height="10" rx="2" fill="#fff" opacity="0.5" />
      <rect x="124" y="454" width="200" height="10" rx="2" fill="#fff" opacity="0.5" />
      <rect x="124" y="490" width="120" height="36" rx="6" fill={c3} />
      <rect x="1020" y="500" width="320" height="220" rx="14" fill={c2} opacity="0.95" />
      <rect x="1044" y="528" width="180" height="18" rx="3" fill="#fff" opacity="0.9" />
      <rect x="1044" y="558" width="270" height="120" rx="8" fill={c3} opacity="0.4" />
    </g>
  );
}

function Data({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  const barHeights = [60, 110, 80, 140, 200, 160, 220, 180, 250, 170, 130, 90, 200, 230, 180];
  return (
    <g>
      {/* nav top */}
      <rect x="0" y="0" width={W} height="64" fill={c1} />
      <rect x="40" y="22" width="100" height="20" rx="3" fill={c3} />
      {/* chart */}
      <rect x="40" y="100" width={W - 80} height="300" rx="12" fill={c2} opacity="0.9" />
      {/* bars */}
      {barHeights.map((h, i) => (
        <rect
          key={i}
          x={80 + i * 88}
          y={380 - h}
          width="50"
          height={h}
          rx="4"
          fill={i % 3 === 0 ? c3 : '#fff'}
          opacity={i % 3 === 0 ? 0.95 : 0.6}
        />
      ))}
      {/* stat cards */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x={40 + i * 340}
            y="440"
            width="320"
            height="120"
            rx="10"
            fill={c2}
            opacity="0.85"
          />
          <rect x={64 + i * 340} y="464" width="80" height="10" rx="2" fill="#fff" opacity="0.5" />
          <rect
            x={64 + i * 340}
            y="486"
            width={120 + (i % 2) * 40}
            height="28"
            rx="3"
            fill={c3}
            opacity="0.9"
          />
          <rect x={64 + i * 340} y="528" width="200" height="10" rx="2" fill="#fff" opacity="0.4" />
        </g>
      ))}
      {/* table */}
      <rect x="40" y="600" width={W - 80} height="280" rx="10" fill={c2} opacity="0.85" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="64" y={628 + i * 48} width="40" height="40" rx="6" fill={c3} opacity="0.5" />
          <rect
            x="120"
            y={642 + i * 48}
            width={200 + (i % 3) * 40}
            height="10"
            rx="2"
            fill="#fff"
            opacity="0.8"
          />
          <rect x="120" y={660 + i * 48} width="120" height="8" rx="2" fill="#fff" opacity="0.4" />
          <rect
            x={W - 260}
            y={638 + i * 48}
            width="80"
            height="20"
            rx="10"
            fill={c3}
            opacity="0.7"
          />
          <rect
            x={W - 160}
            y={638 + i * 48}
            width="120"
            height="20"
            rx="10"
            fill="#fff"
            opacity="0.3"
          />
        </g>
      ))}
    </g>
  );
}

function Marketing({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return (
    <g>
      <rect x="0" y="0" width={W} height="80" fill={c1} opacity="0.6" />
      <rect x="60" y="32" width="120" height="16" rx="3" fill={c3} />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={W - 440 + i * 100}
          y="34"
          width="60"
          height="12"
          rx="2"
          fill="#fff"
          opacity="0.5"
        />
      ))}
      <rect x="60" y="160" width="200" height="14" rx="3" fill={c3} opacity="0.9" />
      <rect x="60" y="200" width="700" height="56" rx="3" fill="#fff" opacity="0.95" />
      <rect x="60" y="270" width="600" height="56" rx="3" fill="#fff" opacity="0.95" />
      <rect x="60" y="360" width="520" height="14" rx="3" fill="#fff" opacity="0.6" />
      <rect x="60" y="384" width="460" height="14" rx="3" fill="#fff" opacity="0.6" />
      <rect x="60" y="440" width="180" height="48" rx="6" fill={c3} />
      <rect
        x="260"
        y="440"
        width="180"
        height="48"
        rx="6"
        fill="transparent"
        stroke="#fff"
        strokeWidth="2"
        opacity="0.6"
      />
      {/* hero illustration */}
      <rect x="820" y="140" width="540" height="540" rx="24" fill={c2} opacity="0.85" />
      <circle cx="1090" cy="380" r="180" fill={c3} opacity="0.55" />
      <rect x="900" y="440" width="380" height="20" rx="4" fill="#fff" opacity="0.85" />
      <rect x="900" y="476" width="280" height="16" rx="3" fill="#fff" opacity="0.55" />
      <rect x="900" y="520" width="160" height="40" rx="6" fill={c1} />
      {/* footer rows */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={60 + i * 440} y="740" width="80" height="80" rx="14" fill={c2} />
          <rect
            x={160 + i * 440}
            y="754"
            width="220"
            height="14"
            rx="3"
            fill="#fff"
            opacity="0.85"
          />
          <rect
            x={160 + i * 440}
            y="780"
            width="280"
            height="10"
            rx="2"
            fill="#fff"
            opacity="0.5"
          />
          <rect
            x={160 + i * 440}
            y="796"
            width="240"
            height="10"
            rx="2"
            fill="#fff"
            opacity="0.5"
          />
        </g>
      ))}
    </g>
  );
}

export function ProjectScreenshot({ palette, label, type }: ProjectScreenshotProps) {
  const [c1, c2, c3] = palette;
  const inner = (() => {
    switch (type) {
      case 'dashboard':
        return <Dashboard c1={c1} c2={c2} c3={c3} />;
      case 'editor':
        return <Editor c1={c1} c2={c2} c3={c3} />;
      case 'mobile':
        return <Mobile c1={c1} c2={c2} c3={c3} />;
      case 'data':
        return <Data c1={c1} c2={c2} c3={c3} />;
      case 'marketing':
      default:
        return <Marketing c1={c1} c2={c2} c3={c3} />;
    }
  })();

  const gradientId = `bg-${label}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="block h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} stopOpacity="0.9" />
          <stop offset="100%" stopColor={c2} stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={W} height={H} fill={`url(#${gradientId})`} />
      {inner}
    </svg>
  );
}
