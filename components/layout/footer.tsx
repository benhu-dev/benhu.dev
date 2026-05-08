import { personal } from '@/data/content';

export function Footer() {
  return (
    <footer className="border-border-default border-t px-4 py-8 sm:px-6 lg:px-10">
      <div className="text-text-muted mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 font-mono text-xs sm:flex-row sm:items-center">
        <p>{`// © ${new Date().getFullYear()} ${personal.name} · built with care`}</p>
        <p>{'// built between meetings'}</p>
      </div>
    </footer>
  );
}
