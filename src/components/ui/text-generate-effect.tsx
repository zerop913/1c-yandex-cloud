"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const TextGenerateEffect = ({
  words,
  delay = 0,
  className = "",
}: {
  words: string;
  delay?: number;
  className?: string;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isGenerating, setIsGenerating] = useState(true);
  const generationCompleted = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [words]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      const generateWords = async () => {
        if (generationCompleted.current) return;

        setIsGenerating(true);
        let currentDisplay = "";

        for (let i = 0; i < words.length; i++) {
          if (!generationCompleted.current) {
            currentDisplay += words[i];
            setDisplayText(currentDisplay);

            // Более быстрая генерация для лучшего восприятия
            await new Promise((resolve) =>
              setTimeout(resolve, Math.random() * 30 + 10)
            );
          }
        }

        generationCompleted.current = true;
        setIsGenerating(false);
      };

      generateWords();
    }, delay * 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay, words]);

  return (
    <span className={`inline ${className}`}>
      {displayText}
      {isGenerating && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block ml-1 -mb-1 h-5 w-1.5 bg-foreground"
        />
      )}
    </span>
  );
};
