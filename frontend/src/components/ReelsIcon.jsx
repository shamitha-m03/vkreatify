import React from "react";

export default function ReelsIcon({
  size = 24,
  className = "",
  color = "currentColor",
  strokeWidth = 1.8,
  glow = false,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 align-middle transition-transform duration-300 ${glow ? "drop-shadow-[0_0_8px_rgba(255,215,106,0.6)]" : ""} ${className}`}
      aria-hidden="true"
    >
      {/* Outer Squircle Box */}
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="5.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Top Header Divider Line */}
      <line
        x1="2.5"
        y1="8.2"
        x2="21.5"
        y2="8.2"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Top Header Diagonal Slash 1 (left) */}
      <line
        x1="6.8"
        y1="2.5"
        x2="10.8"
        y2="8.2"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Top Header Diagonal Slash 2 (right) */}
      <line
        x1="13.2"
        y1="2.5"
        x2="17.2"
        y2="8.2"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Prominent Center Play Button Triangle ▶ */}
      <path
        d="M9.8 11.4C9.8 11.0 10.2 10.8 10.5 11.0L16.2 14.5C16.5 14.7 16.5 15.1 16.2 15.3L10.5 18.8C10.2 19.0 9.8 18.8 9.8 18.4V11.4Z"
        fill={color}
      />
    </svg>
  );
}
