"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

interface TextRotateProps {
  texts: string[];
  mainClassName?: string;
  splitLevelClassName?: string;
  staggerFrom?: "first" | "last";
  initial?: { y: string };
  animate?: { y: number };
  exit?: { y: string };
  staggerDuration?: number;
  transition?: {
    type: string;
    damping: number;
    stiffness: number;
  };
  rotationInterval?: number;
}

export default function TextRotate({
  texts,
  mainClassName,
  splitLevelClassName,
  initial = { y: "100%" },
  animate = { y: 0 },
  exit = { y: "-120%" },
  transition = { type: "spring", damping: 30, stiffness: 400 },
  rotationInterval = 2000,
}: TextRotateProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const rotateText = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % texts.length);
  }, [texts.length]);

  useEffect(() => {
    const interval = setInterval(rotateText, rotationInterval);
    return () => clearInterval(interval);
  }, [rotateText, rotationInterval]);

  return (
    <motion.div className={mainClassName} layout>
      <div className={splitLevelClassName}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={initial}
            animate={animate}
            exit={exit}
            transition={transition}
          >
            {texts[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}