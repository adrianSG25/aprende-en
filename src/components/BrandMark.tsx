import React from 'react';

interface BrandMarkProps {
  size?: number;
  className?: string;
}

/**
 * Emblema geométrico inspirado en la señalética clásica de Londres.
 */
export const BrandMark: React.FC<BrandMarkProps> = ({ size = 36, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
  >
    <rect width="40" height="40" rx="10" fill="#0F2747" />
    <circle cx="20" cy="20" r="11" stroke="#C8102E" strokeWidth="3.6" fill="#F7F7F5" />
    <rect x="4" y="16.5" width="32" height="7" rx="2" fill="#12397A" />
    <path
      d="M11.5 18.2V20.5C11.5 21.1 11.9 21.5 12.5 21.5C13.1 21.5 13.5 21.1 13.5 20.5V18.2M15.8 18.2V21.8M15.8 20L17.9 18.2M16.6 19.4L18.1 21.8M22.2 18.2V21.8M24.2 18.2H26.4M24.2 20H26M24.2 21.8H26.4M27.7 21.8V18.2L29.9 21.8V18.2"
      stroke="#FFFFFF"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
