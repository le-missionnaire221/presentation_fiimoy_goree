function Svg({ children, size = 18, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function IconHome({ size } = {}) {
  return (
    <Svg size={size}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V21h13V9.5" />
    </Svg>
  );
}

export function IconExplore({ size } = {}) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.5 9.5-1.2 4.8-4.8 1.2 1.2-4.8z" />
    </Svg>
  );
}

export function IconPeople({ size } = {}) {
  return (
    <Svg size={size}>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M3.5 19c1.2-3 3.4-4.5 5.5-4.5S13.3 16 14.5 19" />
      <path d="M14.2 14.2c1.1-.5 2.3-.7 3.5-.7 1.7 0 3.2.7 4.3 2.2" />
    </Svg>
  );
}

export function IconUser({ size } = {}) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.5-3.5 4-5.2 7-5.2S17.5 16.5 19 20" />
    </Svg>
  );
}

export function IconHeadphones({ size } = {}) {
  return (
    <Svg size={size}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14v3.5A1.5 1.5 0 0 0 5.5 19H7v-5H5.5A1.5 1.5 0 0 0 4 14z" />
      <path d="M20 14v3.5a1.5 1.5 0 0 1-1.5 1.5H17v-5h1.5A1.5 1.5 0 0 1 20 14z" />
    </Svg>
  );
}

export function IconRoute({ size } = {}) {
  return (
    <Svg size={size}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M8 6h6a4 4 0 0 1 0 8H10a4 4 0 0 0 0 8h6" />
    </Svg>
  );
}

export function IconPin({ size } = {}) {
  return (
    <Svg size={size}>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" />
      <circle cx="12" cy="11" r="2" />
    </Svg>
  );
}

export function IconHeart({ size } = {}) {
  return (
    <Svg size={size}>
      <path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20z" />
    </Svg>
  );
}

export function IconPlay({ size = 12 } = {}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5.5v13l11-6.5L8 5.5z" />
    </svg>
  );
}
