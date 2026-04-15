"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Safari, { SafariProps } from "@/components/safari";

interface ThemedSafariProps extends Omit<SafariProps, "src"> {
  lightSrc: string;
  darkSrc: string;
}

export default function ThemedSafari({ lightSrc, darkSrc, ...props }: ThemedSafariProps) {
  const { resolvedTheme } = useTheme();
  const [src, setSrc] = useState(lightSrc);

  useEffect(() => {
    setSrc(resolvedTheme === "dark" ? darkSrc : lightSrc);
  }, [resolvedTheme, darkSrc, lightSrc]);

  return <Safari src={src} {...props} />;
}
