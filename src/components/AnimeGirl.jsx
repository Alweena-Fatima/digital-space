import React from "react";

const AnimeGirl = ({ size = 170 }) => (
  <svg
    width={size}
    height={size * 1.3}
    viewBox="0 0 170 220"
    fill="none"
    style={{ animation: "bounce 3.5s ease infinite", display: "block" }}
  >
    {/* Body */}
    <ellipse cx="85" cy="162" rx="36" ry="48" fill="#F5C842" />
    {/* Neck */}
    <rect x="76" y="113" width="18" height="16" rx="7" fill="#FDDBB4" />
    {/* Head */}
    <ellipse cx="85" cy="90" rx="40" ry="38" fill="#FDDBB4" />
    {/* Hair back */}
    <ellipse cx="85" cy="67" rx="42" ry="28" fill="#4A2C0A" />
    <ellipse cx="48" cy="90" rx="13" ry="26" fill="#4A2C0A" />
    <ellipse cx="122" cy="90" rx="13" ry="26" fill="#4A2C0A" />
    <ellipse cx="85" cy="56" rx="40" ry="16" fill="#4A2C0A" />
    {/* Glasses */}
    <rect x="58" y="87" width="22" height="15" rx="7" fill="none" stroke="#8B6F4E" strokeWidth="2.2" />
    <rect x="89" y="87" width="22" height="15" rx="7" fill="none" stroke="#8B6F4E" strokeWidth="2.2" />
    <line x1="80" y1="94" x2="89" y2="94" stroke="#8B6F4E" strokeWidth="1.8" />
    <line x1="54" y1="93" x2="58" y2="93" stroke="#8B6F4E" strokeWidth="1.8" />
    <line x1="111" y1="93" x2="115" y2="93" stroke="#8B6F4E" strokeWidth="1.8" />
    {/* Eyes */}
    <text x="69" y="98" fontSize="8" fill="#2A1A0A" textAnchor="middle" fontWeight="bold">×</text>
    <text x="100" y="98" fontSize="8" fill="#2A1A0A" textAnchor="middle" fontWeight="bold">×</text>
    {/* Blush */}
    <ellipse cx="58" cy="103" rx="8" ry="4.5" fill="#F0A0A8" opacity="0.65" />
    <ellipse cx="112" cy="103" rx="8" ry="4.5" fill="#F0A0A8" opacity="0.65" />
    {/* Mouth */}
    <path d="M78 109 Q85 114 92 109" stroke="#C07878" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    {/* Arms */}
    <ellipse cx="52" cy="165" rx="10" ry="28" fill="#F5C842" transform="rotate(-8 52 165)" />
    <ellipse cx="118" cy="165" rx="10" ry="28" fill="#F5C842" transform="rotate(8 118 165)" />
    {/* Book */}
    <rect x="64" y="178" width="44" height="32" rx="4" fill="#4A7C59" />
    <rect x="64" y="178" width="4" height="32" rx="2" fill="#3A6347" />
    <line x1="74" y1="186" x2="100" y2="186" stroke="white" strokeWidth="1.5" opacity="0.45" />
    <line x1="74" y1="193" x2="100" y2="193" stroke="white" strokeWidth="1.5" opacity="0.45" />
    <line x1="74" y1="200" x2="92" y2="200" stroke="white" strokeWidth="1.5" opacity="0.45" />
    {/* Hair pins */}
    <circle cx="58" cy="68" r="5" fill="#E8A0A8" />
    <circle cx="112" cy="68" r="5" fill="#E8A0A8" />
    <circle cx="60" cy="68" r="2" fill="white" opacity="0.7" />
  </svg>
);

export default AnimeGirl;
