"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaRobot, FaLock, FaArrowRight } from "react-icons/fa6";
import { BsLightningChargeFill } from "react-icons/bs";
import { TbBrandYandex } from "react-icons/tb";
import { MdOutlineExplore, MdAutoAwesome } from "react-icons/md";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { AuthorCard } from "@/components/AuthorCard";
import { CallToAction } from "@/components/CallToAction";
import { authors } from "@/data/authors";
import { tabContent } from "@/data/tabContent";

// Импортируем интерактивные компоненты
import DashboardPreview from "@/components/interactive/DashboardPreview";
import FeatureCard from "@/components/interactive/FeatureCard";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [howItWorksRef, howItWorksInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [authorsRef, authorsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  // Отслеживание движения мыши для интерактивных элементов
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      title: "Автоматизация описаний",
      description:
        "Генерация качественных текстовых описаний для всех товаров в вашей базе 1С",
      icon: <MdAutoAwesome className="size-5" />,
    },
    {
      title: "Интеграция с 1С",
      description:
        "Бесшовное подключение к любой конфигурации 1С без сложных настроек",
      icon: <BsLightningChargeFill className="size-5" />,
    },
    {
      title: "Высокая скорость",
      description:
        "Обрабатывайте сотни позиций номенклатуры за считанные минуты",
      icon: <FaRobot className="size-5" />,
    },
    {
      title: "Безопасность данных",
      description: "Обработка данных в соответствии с требованиями 152-ФЗ",
      icon: <FaLock className="size-5" />,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Герой секция */}
      <section
        ref={heroRef}
        className="py-20 sm:py-28 min-h-screen relative flex flex-col justify-center"
      >
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Левая колонка с текстом */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-start gap-4"
            >
              <div className="inline-flex items-center rounded-full border border-border bg-background/30 backdrop-blur-md px-3 py-1 text-sm">
                <span className="flex items-center">
                  <TbBrandYandex className="mr-1 h-3.5 w-3.5 text-primary" />
                  <span className="text-primary/90 font-medium">YandexGPT</span>
                </span>
                <span className="mx-2 h-4 w-px bg-border" />
                <span className="flex items-center">
                  <div className="relative h-3.5 w-3.5 mr-1">
                    <Image
                      src="/1C-logo.svg"
                      alt="1C"
                      fill
                      className="object-contain brightness-90"
                    />
                  </div>
                  <span className="text-foreground/80">Интеграция</span>
                </span>
              </div>

              <div className="space-y-2 md:space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                  <span className="mb-2 block">Автоматическая генерация</span>
                  <span className="mb-2 block text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-primary to-amber-500 font-extrabold">
                    описаний товаров
                  </span>
                  <span className="block">для 1С</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-w-[600px]">
                  Используйте мощь искусственного интеллекта Яндекса для
                  создания привлекательных и информативных описаний вашей
                  номенклатуры
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <AnimatedButton
                  href="/setup"
                  variant="primary"
                  icon={<FaArrowRight className="h-5 w-5" />}
                  className="px-8 py-4 text-base font-semibold tracking-wide"
                >
                  Начать интеграцию
                </AnimatedButton>

                <AnimatedButton
                  href="#about"
                  variant="secondary"
                  icon={<MdOutlineExplore className="h-5 w-5" />}
                  iconPosition="left"
                  scrollTo={true}
                  className="button-secondary-mobile"
                >
                  Узнать больше
                </AnimatedButton>
              </div>
            </motion.div>

            {/* Правая колонка с интерактивной панелью */}
            <DashboardPreview />
          </div>
        </div>

        {/* Скролл вниз */}
        <div className="absolute left-1/2 bottom-8 -translate-x-1/2 animate-bounce opacity-70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* О сервисе */}
      <section
        id="about"
        ref={aboutRef}
        className={`py-20 sm:py-28 bg-muted/30 transition-opacity duration-1000 ${
          aboutInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-muted">
              <span className="px-3 py-0.5 text-xs font-medium rounded-full bg-background border border-border shadow-sm">
                Преимущества
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Трансформируйте процесс создания контента
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Интеграция YandexGPT с 1С дает вашему бизнесу конкурентное
              преимущество, автоматизируя рутинные задачи
            </p>
          </div>

          {/* Отображаем карточки функций - обновили структуру карточек */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Как это работает */}
      <section
        id="how-it-works"
        ref={howItWorksRef}
        className={`py-20 sm:py-28 transition-opacity duration-1000 ${
          howItWorksInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-accent/50">
              <span className="px-3 py-0.5 text-xs font-medium rounded-full bg-background border border-border shadow-sm">
                Процесс
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Как работает интеграция
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Три простых шага для запуска автоматической генерации описаний
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Шаг 1 */}
            <div className="group relative">
              <div className="absolute -inset-px bg-gradient-to-r from-primary to-accent-foreground rounded-xl opacity-25 group-hover:opacity-100 blur transition duration-300 group-hover:duration-200"></div>
              <div className="relative bg-card rounded-xl p-6 h-full border border-border">
                <div className="inline-flex h-12 w-12 rounded-full bg-accent items-center justify-center mb-5 font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Настройте доступ</h3>
                <p className="text-muted-foreground">
                  Получите API-ключ в личном кабинете Яндекс.Облака и настройте
                  доступы для работы с YandexGPT
                </p>
              </div>
            </div>

            {/* Шаг 2 */}
            <div className="group relative">
              <div className="absolute -inset-px bg-gradient-to-r from-primary to-accent-foreground rounded-xl opacity-25 group-hover:opacity-100 blur transition duration-300 group-hover:duration-200"></div>
              <div className="relative bg-card rounded-xl p-6 h-full border border-border">
                <div className="inline-flex h-12 w-12 rounded-full bg-accent items-center justify-center mb-5 font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Установите модуль
                </h3>
                <p className="text-muted-foreground">
                  Добавьте модуль интеграции в вашу систему 1С, используя
                  предоставленные нами шаблоны и инструкции
                </p>
              </div>
            </div>

            {/* Шаг 3 */}
            <div className="group relative">
              <div className="absolute -inset-px bg-gradient-to-r from-primary to-accent-foreground rounded-xl opacity-25 group-hover:opacity-100 blur transition duration-300 group-hover:duration-200"></div>
              <div className="relative bg-card rounded-xl p-6 h-full border border-border">
                <div className="inline-flex h-12 w-12 rounded-full bg-accent items-center justify-center mb-5 font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Начните использование
                </h3>
                <p className="text-muted-foreground">
                  Запустите процесс генерации описаний для выбранных
                  номенклатурных позиций с помощью настроенных шаблонов
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        ref={featuresRef}
        className={`py-20 sm:py-28 bg-muted/30 transition-opacity duration-1000 ${
          featuresInView ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-muted">
              <span className="px-3 py-0.5 text-xs font-medium rounded-full bg-background border border-border shadow-sm">
                Детали
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Подробнее о возможностях
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Всё, что вам нужно знать о решении для интеграции 1С с YandexGPT
            </p>
          </div>

          <AnimatedTabs tabs={tabContent} />
        </div>
      </section>

      {/* Секция с экспертами */}
      <section id="team" className="py-20 bg-accent/5">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Наша команда экспертов
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {authors.map((author, index) => (
              <AuthorCard
                key={author.name}
                name={author.name}
                image={author.avatar}
                telegram={author.telegram}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Призыв к действию с улучшенной видимостью */}
      <CallToAction />
    </div>
  );
}
