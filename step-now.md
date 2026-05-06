# Task: Replace Scroll-Jack with Native Horizontal Scroll + Progress Indicator

## Context

The current Projects section uses a complex scroll-jack mechanism (body lock + wheel intercept + scale-zoom transitions + advance cooldowns). This has produced a long tail of UX bugs that are inherent to the scroll-jack pattern itself, not solvable through parameter tuning.

The user has chosen a much cleaner design: **native horizontal scrolling controlled by the user, with a continuous progress indicator that reflects scroll position**. No wheel hijacking, no body lock, no anchor mismatch, no edge-case bugs.

## What changes

**Remove**:
- All scroll-jack logic (lockBody, unlockBody, onWheel handler, onKey handler, IntersectionObserver / scroll-detect, entryProtectionRef, snapInProgressRef, postAdvanceCooldownRef, programmaticScrollRef)
- The scale-zoom 3-phase transition (scaler element, animatingRef, advance/goTo coordination)
- Edge release logic
- The [ skip ↓ ] button (no longer needed — page scroll is never blocked)
- The dimmed-state on inactive cards (without an "active" concept driven by scroll-jack, dimming is unclear)

**Keep**:
- Card design (size, layout, hover effects, screenshot zoom on hover)
- Card content (tech stack tags, title, tagline, stats, [ live ] / [ code ] buttons)
- The `// projects` label and `things I've shipped.` H2
- The counter `01 / 05`
- The progress bar (but redesigned — see below)

**Modify**:
- Progress bar from 5 discrete segments → 1 continuous bar that fills as user scrolls horizontally
- Counter `01 / 05` updates dynamically based on which card is currently most visible

## Implementation

### 1. Replace the scroll-jack section structure with a horizontal scroller

```tsx
<section
  ref={sectionRef}
  className="projects-section"
  style={{
    width: '100%',
    padding: '120px 0',
    position: 'relative',
  }}
>
  {/* Anchor for nav jumps — placed at section top with offset compensated by scroll-padding-top */}
  <span id="projects" aria-hidden="true" />
  
  {Header}  {/* contains // projects, H2, counter, progress bar */}
  
  <div
    ref={scrollerRef}
    className="hide-scrollbar"
    onScroll={handleScroll}
    style={{
      display: 'flex',
      gap: '4vw',
      overflowX: 'auto',
      overflowY: 'hidden',
      padding: '0 7vw 24px',
      scrollSnapType: 'x mandatory',
      scrollPaddingLeft: '7vw',
      WebkitOverflowScrolling: 'touch',
    }}
  >
    {PROJECTS.map((p, i) => (
      <div key={p.id} style={{ scrollSnapAlign: 'start' }}>
        <ProjectCard project={p} index={i + 1} />
      </div>
    ))}
  </div>
</section>
```

The `scrollSnapType: 'x mandatory'` makes the scroller snap to each card as the user scrolls — no more "card lands halfway between two slides." The `padding: '0 7vw 24px'` and `scrollPaddingLeft: '7vw'` ensure cards center horizontally with peeks of next/prev cards visible (matching the previous visual).

`hide-scrollbar` class (already in globals.css) hides the native horizontal scrollbar — we'll show our own custom progress bar in the header instead.

### 2. Track scroll progress with a single state value

```tsx
const [scrollProgress, setScrollProgress] = useState(0);  // 0 to 1
const [activeIndex, setActiveIndex] = useState(0);

const handleScroll = useCallback(() => {
  const el = scrollerRef.current;
  if (!el) return;
  
  // Progress: 0 at scrollLeft=0, 1 at scrollLeft=max
  const maxScroll = el.scrollWidth - el.clientWidth;
  const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
  setScrollProgress(progress);
  
  // Active index: which card's center is closest to viewport center?
  const cards = el.querySelectorAll('[data-card]');
  const containerCenter = el.scrollLeft + el.clientWidth / 2;
  let bestIdx = 0;
  let bestDist = Infinity;
  cards.forEach((card, i) => {
    const cardEl = card as HTMLElement;
    const cardCenter = cardEl.offsetLeft + cardEl.offsetWidth / 2;
    const dist = Math.abs(cardCenter - containerCenter);
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = i;
    }
  });
  setActiveIndex(bestIdx);
}, []);

// Run once on mount to initialize
useEffect(() => {
  handleScroll();
}, [handleScroll]);
```

Note: `data-card` attribute on each ProjectCard is needed for index detection. Add it if missing.

### 3. Continuous progress bar in the header

Replace the 5-segment progress bar with a single rounded bar that fills based on `scrollProgress`:

```tsx
<div style={{
  width: 240,
  height: 6,
  borderRadius: 3,
  background: 'var(--bg-secondary)',
  border: '1px solid var(--border)',
  overflow: 'hidden',
  position: 'relative',
}}>
  <div style={{
    width: `${scrollProgress * 100}%`,
    height: '100%',
    background: 'linear-gradient(90deg, var(--syntax-function), var(--syntax-string))',
    transition: 'width 0.15s ease-out',  // brief smoothing for momentum scrolls
    borderRadius: 3,
  }} />
</div>
```

The blue-to-green gradient gives it a "code execution progress" feel that fits your IDE theme. The 0.15s transition smooths out the visual without making it feel laggy.

### 4. Counter updates from `activeIndex`

Replace the existing counter rendering:

```tsx
<div style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--text-secondary)' }}>
  <span style={{ color: 'var(--syntax-string)' }}>{String(activeIndex + 1).padStart(2, '0')}</span>
  <span style={{ color: 'var(--text-muted)' }}> / {String(PROJECTS.length).padStart(2, '0')}</span>
</div>
```

### 5. Remove all scroll-jack-related state, refs, and effects

Delete from the Projects component:
- `lockedRef`, `animatingRef`, `cooldownRef`, `gestureLockRef`, `idleTimerRef`, `lastSwitchAtRef`, `lastDirRef`, `releaseAtRef`, `entryProtectionRef`, `snapInProgressRef`, `postAdvanceCooldownRef`, `programmaticScrollRef`, `programmaticTimeoutRef`, `scalerRef`, `trackRef`
- `lockBody`, `unlockBody`, `advance`, `goTo`, `positionTrack`, `positionTrackRaw`, `setScale` functions
- `onWheel`, `onKey`, `onScrollDetect` handlers
- The IntersectionObserver setup
- The wrapper effect that bound all of these
- The `useStepped` mode separation — desktop and mobile now use the SAME native horizontal scroll. There's no need for two render paths.

After cleanup, the Projects component should be ~150 lines instead of ~600.

### 6. Remove the [ skip ↓ ] button

Delete the entire button + its `skipToExperience` handler. Page scroll is never blocked anymore, so users can scroll naturally past Projects to Experience without needing a skip.

### 7. Remove the dimmed state from ProjectCard

Without an "active card" concept driven by scroll-jack, dimming inactive cards becomes confusing — especially when 2 cards are partially visible during scroll. All cards render at full opacity. Hover effects (border glow, screenshot zoom on hover) remain.

Update `<ProjectCard>` props to remove the `dimmed` prop and any related styling.

### 8. Handle the section anchor cleanly

Place a single anchor at the section top:

```tsx
<section ref={sectionRef} ...>
  <span id="projects" aria-hidden="true" />
  ...
</section>
```

Combined with the existing `html { scroll-padding-top: var(--nav-height) }`, clicking `// projects` in nav will land cleanly at the section top with the H2 visible below the nav.

### 9. Keyboard accessibility (free with native scroll)

Native horizontal scroll containers respond to keyboard arrow keys when focused. No additional handler needed — browsers handle Left/Right/Home/End automatically. Just ensure the scroller has `tabIndex={0}`:

```tsx
<div
  ref={scrollerRef}
  tabIndex={0}
  className="hide-scrollbar"
  ...
>
```

### Verify

1. Scroll naturally through the page from About → Projects → Experience: page scrolls vertically as normal, no body lock, no jarring snap
2. When Projects is in view, scroll the cards horizontally:
   - Mouse wheel + Shift = horizontal scroll (browser default)
   - Trackpad two-finger horizontal swipe = horizontal scroll
   - Click on the card area + arrow keys = horizontal scroll
   - Touch device: swipe horizontally
3. As cards scroll, progress bar fills from left to right (blue→green gradient)
4. Counter updates: `01/05`, `02/05`, etc. based on which card is most centered
5. Each card snaps cleanly into position thanks to `scroll-snap-type: x mandatory`
6. Click `// projects` in nav from any section: page scrolls to Projects with H2 visible below nav, no offset weirdness
7. No layout shift anywhere — no scrollbar appearing/disappearing, no card jumping
8. All previous card design intact: hover lifts screenshot zoom, border glow, tech stack tags, [ live ] / [ code ] buttons
9. No skip button visible
10. Mobile: same horizontal scroll experience, native swipe just works

### What this fixes

All previous bugs are gone by virtue of removing the mechanism that caused them:
- ✅ No more "fast scroll skips Projects" — native scroll never gets bypassed
- ✅ No more "stuck in scroll-jack" — body never locks
- ✅ No more anchor misalignment — scroll-padding-top works naturally
- ✅ No more double-advance — no advance mechanism at all
- ✅ No more layout shift from disappearing scrollbar — body scrollbar always present
- ✅ No more "magnetic snap" — no snapping, just smooth user-controlled scroll

## Don't touch

- Nav (logo, links, glassy bg)
- Hero (GridSphere, content, buttons, status badge)
- About (avatar, skills)
- Experience, Contact, Footer (if present)
- ResizeObserver dynamic --nav-height
- Card visual design, hover effects, ProjectScreenshot SVG renderer
- PROJECTS data array

## After completion

Briefly summarize:
- Lines of code removed (~400+ expected)
- Lines added (~50 expected)
- Confirm scroll-jack mechanism is fully removed
- Confirm native horizontal scroll is working
- Mention that the `useStepped` / mobile branching is gone (one unified render path now)