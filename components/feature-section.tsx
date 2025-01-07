"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
  imageHeight?: string
}

export function FeatureSteps({ features, autoPlayInterval = 3000 }: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlayInterval, features.length]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full">
        <AnimatePresence mode="wait">
          {features.map(
            (feature, index) =>
              index === currentFeature && (
                <motion.div
                  key={index}
                  className="absolute inset-0 rounded-lg overflow-hidden border"
                  initial={{ y: 100, opacity: 0, rotateX: -20 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -100, opacity: 0, rotateX: 20 }}
                >
                  <Image
                    src={feature.image}
                    alt={feature.step}
                    className="w-full h-full object-cover transition-transform transform"
                    width={500}
                    height={500}
                    priority={index === 0}
                  />
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              "relative p-4 rounded-lg cursor-pointer transition-all duration-300",
              index === currentFeature
                ? "bg-neutral-100 dark:bg-neutral-800"
                : "hover:bg-neutral-50 dark:hover:bg-neutral-900"
            )}
            onClick={() => setCurrentFeature(index)}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <span
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  index === currentFeature
                    ? "bg-[#1570EF] text-white"
                    : "bg-neutral-200 dark:bg-neutral-700"
                )}
              >
                {feature.step}
              </span>
              <div>
                <h3 className="text-base font-medium mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {feature.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}