"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaTelegram } from "react-icons/fa6";

interface TeamCardProps {
  name: string;
  role?: string;
  image: string;
  telegram?: string;
  delay?: number;
}

export function TeamCard({
  name,
  role = "Эксперт",
  image,
  telegram,
  delay = 0,
}: TeamCardProps) {
  const [imgSrc, setImgSrc] = useState<string>(`/authors/${image}`);
  const [imgError, setImgError] = useState<boolean>(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setImgSrc(`/authors/${image}`);
    setImgError(false);
  }, [image]);

  const handleImageError = () => {
    if (!imgError) {
      setImgSrc("/authors/placeholder.jpg");
      setImgError(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all h-full relative">
        <div className="relative aspect-[1/1] w-full overflow-hidden bg-accent/5">
          <Image
            src={imgSrc}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={handleImageError}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority
          />

          {/* Градиент поверх фотографии */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Кнопка Telegram */}
          {telegram && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 right-4"
            >
              <a
                href={telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-primary text-white shadow-md hover:bg-primary/90 transition-all flex items-center justify-center"
              >
                <FaTelegram className="h-5 w-5" />
              </a>
            </motion.div>
          )}
        </div>

        <div className="p-4 relative">
          <h3 className="font-semibold text-lg mb-1">{name}</h3>
          {role && <p className="text-sm text-muted-foreground">{role}</p>}

          {/* Декоративный индикатор */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </motion.div>
  );
}
