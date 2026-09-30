// Placeholder mascot. Swap for your drawn logo later.
export default function Mascot({ size = 56, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" className={className} aria-hidden="true">
      <rect x="10" y="6" width="42" height="48" rx="10" fill="#7CC04B" stroke="#2F3A2C" strokeWidth="3" />
      <rect x="16" y="12" width="32" height="36" rx="6" fill="#B7DD8F" />
      <circle cx="26" cy="27" r="2.6" fill="#2F3A2C" />
      <circle cx="38" cy="27" r="2.6" fill="#2F3A2C" />
      <circle cx="22" cy="33" r="2" fill="#F2A0B4" />
      <circle cx="42" cy="33" r="2" fill="#F2A0B4" />
      <path d="M26 35q6 6 12 0" fill="none" stroke="#2F3A2C" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M6 16h8M6 26h8M6 36h8M6 46h8" stroke="#2F3A2C" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}