"use client";

// TODO: Implement AnimatedText
// Dependencies available: framer-motion
// Props: text (string), className? (string), once? (boolean)
// Behaviour: split text into words/chars and animate them in on viewport entry

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
}

export default function AnimatedText({ text, className }: AnimatedTextProps) {
  return (
    <span className={className}>
      {/* TODO: animate characters/words */}
      {text}
    </span>
  );
}
