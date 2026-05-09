import { personal } from '@/data/content';

// Right-side padding at sm:+ reserves a clear zone for the floating
// scroll-to-top button (36px, ~20px from the corner). Static rather
// than JS-coupled to the button's visibility — the small empty zone
// when the button is hidden (above the hero threshold) is an acceptable
// trade for not coupling layout to scroll state.
export function Footer() {
  return (
    <footer className="border-border-default border-t px-4 py-8 sm:px-6 sm:pr-20 lg:px-10 lg:pr-24">
      <div className="text-text-muted mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 font-mono text-xs sm:flex-row sm:items-center">
        <p>{`// © ${new Date().getFullYear()} ${personal.name} · built with care`}</p>
        <p>{'// built between meetings'}</p>
      </div>
    </footer>
  );
}
