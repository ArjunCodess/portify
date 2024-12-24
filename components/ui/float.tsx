"use client";

import React from "react";
import { motion } from "framer-motion";

interface FloatProps {
  children: React.ReactNode;
  offset?: number;
  duration?: number;
}

const Float: React.FC<FloatProps> = ({ 
  children, 
  offset = 10,
  duration = 3 
}) => {
  return (
    <motion.div
      animate={{
        y: [-offset, offset],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default Float;