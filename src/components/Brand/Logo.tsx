import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "default" | "small" | "icon";
  className?: string;
  showLink?: boolean;
}

export default function Logo({
  variant = "default",
  className = "",
  showLink = true,
}: LogoProps) {
  const sizes = {
    default: { width: 180, height: 60 },
    small: { width: 120, height: 40 },
    icon: { width: 48, height: 48 },
  };

  const logoImage = (
    <Image
      src="/logo.svg"
      alt="PawStory - החנות הפרימיום לחיות מחמד"
      width={sizes[variant].width}
      height={sizes[variant].height}
      priority={variant === "default"}
      className={`h-auto w-auto object-contain transition-opacity hover:opacity-90 ${className}`}
      quality={100}
    />
  );

  if (!showLink) {
    return logoImage;
  }

  return (
    <Link
      href="/"
      className="inline-block transition-transform hover:scale-105"
      aria-label="PawStory - עמוד הבית"
    >
      {logoImage}
    </Link>
  );
}
