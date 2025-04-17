"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaTelegram } from "react-icons/fa6";
import { useEffect, useState } from "react";

interface AuthorProps {
  name: string;
  role?: string;
  image: string;
  telegram?: string;
  delay?: number;
}

export function AuthorCard({
  name,
  role = "Эксперт",
  image,
  telegram,
  delay = 0,
}: AuthorProps) {
  const [imgSrc, setImgSrc] = useState<string>(`/authors/${image}`);
  const [imgError, setImgError] = useState<boolean>(false);

  // Обработка ошибки загрузки изображения
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
    >
      <div className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all h-full">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-accent/10">
          <Image
            src={imgSrc}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={handleImageError}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority
          />
          {telegram && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
              <div className="flex">
                <a
                  href={telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full text-white transition-colors"
                >
                  <FaTelegram className="h-5 w-5" />
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{name}</h3>
          {role && <p className="text-sm text-muted-foreground">{role}</p>}
        </div>
      </div>
    </motion.div>
  );
}
