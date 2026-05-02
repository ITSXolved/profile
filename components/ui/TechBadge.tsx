"use client";

// TODO: Implement TechBadge
// Dependencies available: framer-motion
// Props: label (string), icon? (React.ReactNode), size? ("sm" | "md" | "lg")
// Behaviour: pill badge with subtle hover scale animation

interface TechBadgeProps {
  label: string;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function TechBadge({ label, icon, size = "md" }: TechBadgeProps) {
  const sizeMap = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium
        ${sizeMap[size]}
        /* TODO: themed colours, hover animation */`}
    >
      {icon}
      {label}
    </span>
  );
}
