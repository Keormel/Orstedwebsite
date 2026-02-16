type IconProps = {
  className?: string;
};

const base = "h-5 w-5";

export function ShieldIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3L4 7v5c0 5 3.4 8.9 8 10 4.6-1.1 8-5 8-10V7l-8-4z" />
    </svg>
  );
}

export function SwordIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M14 4l6 6-2.5.4-7.8 7.8-3-3 7.8-7.8L14 4zM4 20l3-3" />
    </svg>
  );
}

export function DaggerIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M6 18l12-12M8 8l8 8M5 19l3-1-2-2-1 3z" />
    </svg>
  );
}

export function SparkIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3l2.2 4.8L19 10l-4.8 2.2L12 17l-2.2-4.8L5 10l4.8-2.2L12 3z" />
    </svg>
  );
}

export function CategoryIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 6h7v5H4zM13 6h7v5h-7zM4 13h7v5H4zM13 13h7v5h-7z" />
    </svg>
  );
}
