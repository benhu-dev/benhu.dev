Hero 的網格球體效果需要完全重做。我有一份參考實作(reference implementation),
是我在 Claude Design prototype 裡確認過視覺正確的版本。

請使用這份參考程式碼的「演算法與參數」,但**用我們專案的架構與慣例重寫**:

---

## 改寫要求(非常重要,逐項遵守)

### 必須改寫的部分(技術棧轉換)

1. **使用 React 19 + TypeScript**:加上完整型別,不要任何 any
2. **使用 hooks**:useRef、useEffect、useState — 不要用 React.createElement
3. **使用 Tailwind 樣式**:把 inline style 轉成 Tailwind classes
   - 顏色用 Tailwind theme(我們已定義 tokyo night 色票)
   - 不要寫 `style={{ position: 'absolute' }}`,寫 `className="absolute"`
   - 唯一例外:Canvas 動態尺寸、需要程式控制的 style 才用 inline
4. **使用 'use client' 指令**(因為用到 Canvas + useEffect)
5. **檔案放在 components/effects/grid-sphere.tsx**(沿用既有架構)
6. **匯出方式**:`export function GridSphere()`,在 hero.tsx 中 import 使用
7. **遵守專案 lint 規則**:雙引號、分號、import 排序

### 必須保留的部分(演算法核心,不要動)

以下參數與邏輯**完全照抄**,不要自己改數值:

- `SPACING = 28`(網格間距)
- `RADIUS = 110`(影響半徑)
- `LIFT_MAX = 90`(最大凸起高度)
- `FOCAL = 700`(透視焦距)
- `FAR_FADE = 150`(遠距裁切)
- `sigma = 50`(高斯衰減)
- 透視投影公式:`persp = FOCAL / (FOCAL - lift)`
- 雙向連線:每個點連水平與垂直鄰居
- `act` 漸變(靜止 700ms 後降到 0.22)
- 紫色點規則:`(k % 11 === 0) && intensity > 0.65`,顏色 `187,154,247`
- 藍色點顏色:`122,162,247`
- 線條色彩混合公式(從 `65,72,104` 漸變到 `122,162,247`)
- 線條 alpha:`0.12 + intensity * 0.32 * act`
- 點 peakAlpha:藍 0.66 / 紫 0.5
- 呼吸抖動:`sin(t * fr + ph) * 0.9`,fr 在 0.5-1.1 隨機,ph 在 0-2π 隨機
- DPR 上限 2(Math.min(window.devicePixelRatio || 1, 2))
- ResizeObserver 對 wrap 元素監聽,不是 window
- IntersectionObserver 暫停離畫面外的渲染

### 必須做的處理(專案規範)

- **無障礙**:`aria-hidden="true"`、`prefers-reduced-motion` 時不啟動 canvas,只顯示靜態網格
- **行動裝置**:`pointer: coarse` 媒體查詢時不啟動 canvas
- **效能**:離開 viewport 時暫停 RAF
- **清理**:useEffect return 時清掉所有 listener、RAF、observer
- **背景靜態網格**:用 Tailwind 的 inline style 寫一個底層 div(因為 background-image 用 gradient 寫法 Tailwind 較難,可保留 inline)
  - 線條色:`rgba(86,95,137,0.4)`
  - 間距:28px(對應 SPACING)
  - 整體 opacity:0.18

### 整合到 Hero 的方式

修改 components/sections/hero.tsx:
- 在 hero section 最底層放 `<GridSphere />`
- GridSphere 用 `absolute inset-0` 鋪滿
- 確保 hero section 是 `relative`
- Hero 內容層加 `relative z-10` 確保在 GridSphere 之上
- 內容層加 `pointer-events-none`,但 CTA 按鈕等可互動元素加 `pointer-events-auto`
  覆蓋回來
- 文字保留 text-shadow 保護(已有)

---

## 參考實作(Claude Design 版本,演算法與參數的真相來源)

```javascript
function HeroGrid() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqCoarse = window.matchMedia('(pointer: coarse)');
    if (mqReduce.matches || mqCoarse.matches) return;

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;

    const SPACING = 28;
    const RADIUS = 110;
    const LIFT_MAX = 90;
    const FOCAL = 700;
    const FAR_FADE = 150;

    let cols = 0, rows = 0;
    let pts = [];

    const buildGrid = () => {
      cols = Math.ceil(W / SPACING) + 4;
      rows = Math.ceil(H / SPACING) + 4;
      pts = new Array(cols * rows);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          pts[j * cols + i] = {
            x: (i - 1) * SPACING,
            y: (j - 1) * SPACING,
            ph: Math.random() * Math.PI * 2,
            fr: 0.5 + Math.random() * 0.6,
          };
        }
      }
    };

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    };
    resize();
    window.addEventListener('resize', resize);

    let mx = -9999, my = -9999, lastSeen = 0;
    let cx = W * 0.32, cy = H * 0.55;
    let visible = true;

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      lastSeen = performance.now();
    };
    const onLeave = () => { mx = -9999; my = -9999; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    const io = new IntersectionObserver(es => { visible = es[0].isIntersecting; }, { threshold: 0 });
    io.observe(wrap);

    const state = { act: 0.25 };
    let raf = 0;
    const t0 = performance.now();

    function drawSeg(a, b, act) {
      const intensity = Math.max(a.intensity, b.intensity);
      const blueMix = intensity;
      const r = Math.round(65 + (122 - 65) * blueMix);
      const g = Math.round(72 + (162 - 72) * blueMix);
      const b2 = Math.round(104 + (247 - 104) * blueMix);
      const alpha = 0.12 + intensity * 0.32 * act;
      ctx.strokeStyle = `rgba(${r},${g},${b2},${alpha})`;
      ctx.lineWidth = 0.5 + intensity * 0.9;
      ctx.beginPath();
      ctx.moveTo(a.sx, a.sy);
      ctx.lineTo(b.sx, b.sy);
      ctx.stroke();
    }

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const t = (performance.now() - t0) / 1000;

      const tx = mx > -9000 ? mx : W * 0.35;
      const ty = my > -9000 ? my : H * 0.55;
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;

      const since = performance.now() - lastSeen;
      const cursorActive = mx > -9000 && since < 700;
      state.act += ((cursorActive ? 1 : 0.22) - state.act) * 0.06;
      const act = state.act;

      ctx.clearRect(0, 0, W, H);

      // Background glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, RADIUS * 1.4);
      glow.addColorStop(0, `rgba(122,162,247,${0.04 * act})`);
      glow.addColorStop(0.5, `rgba(122,162,247,${0.015 * act})`);
      glow.addColorStop(1, 'rgba(122,162,247,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      const sigma = 50;
      const sigma2 = sigma * sigma;
      const proj = new Array(pts.length);
      for (let k = 0; k < pts.length; k++) {
        const p = pts[k];
        const breathe = Math.sin(t * p.fr + p.ph) * 0.9;
        const dx = p.x - cx;
        const dy = p.y - cy;
        const d2 = dx * dx + dy * dy;
        const dist = Math.sqrt(d2);
        const farMask = dist > FAR_FADE ? 0 : 1;
        const gauss = Math.exp(-d2 / (2 * sigma2));
        const lift = (LIFT_MAX * act) * gauss * farMask + breathe;
        const persp = FOCAL / (FOCAL - lift);
        proj[k] = {
          sx: cx + dx * persp,
          sy: cy + dy * persp,
          intensity: Math.min(1, gauss * farMask),
        };
      }

      // Draw lines (horizontal + vertical neighbors)
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const a = proj[j * cols + i];
          if (i + 1 < cols) drawSeg(a, proj[j * cols + (i + 1)], act);
          if (j + 1 < rows) drawSeg(a, proj[(j + 1) * cols + i], act);
        }
      }

      // Draw points with halo
      for (let k = 0; k < proj.length; k++) {
        const a = proj[k];
        if (a.intensity < 0.08) continue;
        const isPurple = (k % 11 === 0) && a.intensity > 0.65;
        const baseColor = isPurple ? '187,154,247' : '122,162,247';
        const r = 0.6 + a.intensity * 1.4;
        const peakAlpha = isPurple ? 0.5 : 0.66;
        const alpha = peakAlpha * a.intensity * act;
        const haloR = r * 3.0;
        const grad = ctx.createRadialGradient(a.sx, a.sy, 0, a.sx, a.sy, haloR);
        grad.addColorStop(0, `rgba(${baseColor},${alpha * 0.7})`);
        grad.addColorStop(1, `rgba(${baseColor},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(a.sx, a.sy, haloR, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${baseColor},${alpha})`;
        ctx.beginPath();
        ctx.arc(a.sx, a.sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', resize);
      io.disconnect();
    };
  }, []);

  // Render: wrap div + static grid background div + canvas
}
```

---

## 為什麼這個版本必須完整重做(不要漸進修補)

目前的 GridSphere 元件的核心問題是「演算法錯誤」,不是「參數錯誤」:

- 沒有真正的透視投影(只有平移)
- 沒有雙向連線(點之間沒連線,所以看起來像粒子)
- 沒有遠距硬裁切(球體邊緣模糊)

這些是**結構性差異**,小改沒用。請完全用上方參考實作的演算法重寫整個 grid-sphere.tsx。

完成後 npm run dev,測試:
1. 沒滑鼠時 hero 有可見的淡網格底紋
2. 滑鼠移到任意位置都觸發效果
3. 凸起明顯有 3D 立體感(線條彎曲),不是粒子飄
4. 球體邊緣有明確範圍(不會擴散到整個畫面)
5. 滑鼠靜止 1 秒後球體變淡(act 降到 0.22)
6. CTA 按鈕仍可正常 hover 與點擊
7. 縮到手機尺寸時 canvas 不啟動,只剩靜態網格