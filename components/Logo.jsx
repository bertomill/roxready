export default function Logo({ className = "w-8 h-8" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>

      {/* Outer dynamic ring suggesting motion */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#logoGradient)"
        strokeWidth="3"
        fill="none"
        opacity="0.3"
      />

      {/* Inner ring */}
      <circle
        cx="50"
        cy="50"
        r="38"
        stroke="url(#logoGradient)"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />

      {/* Stylized "RR" for RoxReady */}
      <path
        d="M 30 35 L 30 65 L 35 65 L 35 52 L 42 52 L 48 65 L 54 65 L 47 51 Q 52 50 52 43 Q 52 35 44 35 Z M 35 40 L 44 40 Q 47 40 47 43 Q 47 47 44 47 L 35 47 Z"
        fill="url(#logoGradient)"
      />

      <path
        d="M 58 35 L 58 65 L 63 65 L 63 52 L 70 52 L 76 65 L 82 65 L 75 51 Q 80 50 80 43 Q 80 35 72 35 Z M 63 40 L 72 40 Q 75 40 75 43 Q 75 47 72 47 L 63 47 Z"
        fill="url(#logoGradient)"
      />

      {/* Dynamic accent marks suggesting movement */}
      <path
        d="M 20 25 L 28 28"
        stroke="url(#logoGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M 15 35 L 25 37"
        stroke="url(#logoGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  )
}
