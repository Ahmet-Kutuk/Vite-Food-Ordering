import { ICONS } from "../constants/common";

export type IconName = keyof typeof ICONS;

interface IconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: string;
}

export default function Icon({
  name,
  size = 15,
  strokeWidth = 2,
  className,
  color = "currentColor",
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      stroke={color}
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d={ICONS[name]}
      />
    </svg>
  );
}
