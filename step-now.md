Two small UI tweaks to the Projects section (components/sections/projects.tsx and components/sections/projects/project-card.tsx).

### 1. Progress bar feels laggy — remove the transition

The progress bar currently has `transition: 'width 0.1s ease-out'`. This was added to smooth out scroll jitter, but it makes the bar feel like it's "catching up" to the user's scroll position with a noticeable delay. Since scrollY-driven width updates are already running at 60fps via the scroll listener, the transition is actually causing the lag, not preventing it.

Fix: remove the transition entirely from the progress bar fill. The bar will now update perfectly in sync with scroll, frame by frame:

```tsx
<div style={{
  width: `${scrollProgress * 100}%`,
  height: '100%',
  background: 'linear-gradient(90deg, var(--syntax-function), var(--syntax-string))',
  borderRadius: 3,
  // REMOVE: transition: 'width 0.1s ease-out',
}} />
```

The result: progress bar tracks scroll position 1:1 with zero perceptual delay.

### 2. Dim non-active cards based on distance from viewport center

Currently all cards render at full opacity. The user wants the centered (active) card to be visually emphasized while side cards are dimmed — drawing attention to "the card you're looking at right now."

The trick: instead of binary active/inactive (which causes ugly snap transitions when the active index changes), compute each card's opacity based on its distance from viewport center. This produces a smooth, continuous dimming effect that responds organically to scroll position.

### Implementation

In `projects.tsx`, the existing scroll handler already has access to all cards' on-screen positions. Extend it to also compute each card's "centeredness" and apply opacity directly to each card via inline style or a CSS variable.

Cleanest approach: write each card's opacity as an inline style during the scroll handler.

In the scroll listener (after the existing translateX update):

```tsx
const handleScroll = () => {
  // ... existing code that computes translateX and progress ...

  // Extend the existing card-iteration loop to also set opacity based on distance from viewport center
  const cards = track.querySelectorAll('[data-card]');
  const viewportCenter = viewportWidth / 2;
  let bestIdx = 0;
  let bestDist = Infinity;

  cards.forEach((card, i) => {
    const cardEl = card as HTMLElement;
    const cardCenter = cardEl.offsetLeft + cardEl.offsetWidth / 2 + translateX;
    const dist = Math.abs(cardCenter - viewportCenter);

    // Active index detection (existing logic)
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = i;
    }

    // NEW: opacity based on distance from center
    // Normalize: 0 = at center (full opacity), 1 = far away (dimmed)
    // Use viewport width as the "fully dimmed" distance threshold
    const normalized = Math.min(1, dist / (viewportWidth * 0.5));
    // Map normalized distance to opacity: at center = 1, far = 0.3
    const opacity = 1 - normalized * 0.7;
    cardEl.style.opacity = String(opacity);
  });

  setActiveIndex(bestIdx);
};
```

Notes:
- `viewportWidth * 0.5` is the threshold — when card center is half a viewport away from center, it reaches max dim (0.3 opacity)
- Active card always has opacity ≈ 1.0 because dist ≈ 0
- Adjacent cards (peeking on each side) will be at maybe ~0.5 opacity — visibly dimmer but still readable
- Far-off cards (not visible anyway since clipped by overflow) will be at 0.3 opacity floor

The opacity transition is automatic and smooth because it's recomputed every scroll frame — no CSS transition needed.

### Optional: also add a subtle blur to non-active cards

If after testing the opacity-only change feels not "focused" enough, add a subtle blur as well:

```tsx
const blur = normalized * 2; // 0px at center, 2px at edges
cardEl.style.filter = `blur(${blur}px)`;
```

This combined with opacity creates a depth-of-field effect — the active card "pops" while others fade into the background. Apple uses this exact pattern in their product pages.

Try opacity-only first. If it feels right, stop. If you want more emphasis, add the blur.

### 3. Handle the mobile fallback

In the mobile/reduced-motion fallback render path (the simpler horizontal scroll version), apply the same opacity dimming using a separate scroll handler on the scroll container itself:

```tsx
// In the mobile render branch's useEffect:
const handleMobileScroll = () => {
  const scroller = mobileScrollerRef.current;
  if (!scroller) return;
  const cards = scroller.querySelectorAll('[data-card]');
  const containerCenter = scroller.scrollLeft + scroller.clientWidth / 2;
  
  cards.forEach((card) => {
    const cardEl = card as HTMLElement;
    const cardCenter = cardEl.offsetLeft + cardEl.offsetWidth / 2;
    const dist = Math.abs(cardCenter - containerCenter);
    const normalized = Math.min(1, dist / (scroller.clientWidth * 0.5));
    const opacity = 1 - normalized * 0.7;
    cardEl.style.opacity = String(opacity);
  });
};
```

Attach this handler to the mobile scroller's `onScroll` and run once on mount.

### 4. Verify

1. Scroll through Projects on desktop:
   - Progress bar updates smoothly with no perceptible lag — moves exactly when you scroll
   - The center card has full opacity
   - Cards peeking from left/right sides are visibly dimmer (~50% opacity)
   - As you scroll horizontally, the dimming smoothly reassigns — the new center card brightens, the old one fades, all gradually
2. On mobile (resize browser to <1024px):
   - Same dimming behavior on horizontal swipe
3. No layout shift, no flicker
4. Card hover effects still work on the active (centered) card
5. The dimming feels organic and continuous, not snappy

### Don't touch

- Sticky horizontal scroll mechanism
- Outer section height calculation
- Card design, content, hover effects
- ProjectScreenshot
- Counter logic
- Nav, Hero, About, other sections