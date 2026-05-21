export function PixelDivider() {
  return (
    <div className="section-shell py-8" aria-hidden="true">
      <svg className="h-4 w-full" viewBox="0 0 600 16" preserveAspectRatio="none">
        <path d="M0 8H260" stroke="#D4C9B0" strokeWidth="2" strokeDasharray="8 8" />
        <path d="M340 8H600" stroke="#D4C9B0" strokeWidth="2" strokeDasharray="8 8" />
        <rect x="284" y="2" width="12" height="12" fill="#C9A84C" transform="rotate(45 290 8)" />
        <rect x="304" y="4" width="8" height="8" fill="#5B8DB8" transform="rotate(45 308 8)" />
        <rect x="324" y="2" width="12" height="12" fill="#C9A84C" transform="rotate(45 330 8)" />
      </svg>
    </div>
  )
}
