"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ui/ThemeToggle";
import {
  HomeIcon,
  AdjustmentsHorizontalIcon,
  CodeBracketIcon,
  KeyIcon,
  XMarkIcon,
  DocumentTextIcon,
  BookOpenIcon,
  ChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { Logo } from "./ui/Logo";
import { cn } from "@/lib/utils";

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

interface MenuItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

export default function Sidebar({
  isOpen,
  onClose,
  isMobile = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}) {
  const pathname = usePathname();

  const menuGroups: MenuGroup[] = [
    {
      title: "Навигация",
      items: [
        { name: "Главная", href: "/", icon: <HomeIcon className="h-5 w-5" /> },
        {
          name: "Настройка",
          href: "/setup",
          icon: <AdjustmentsHorizontalIcon className="h-5 w-5" />,
          badge: "Старт",
        },
      ],
    },
    {
      title: "Интеграция",
      items: [
        {
          name: "Подключение",
          href: "/integration",
          icon: <CodeBracketIcon className="h-5 w-5" />,
        },
        {
          name: "API Токены",
          href: "/tokens",
          icon: <KeyIcon className="h-5 w-5" />,
        },
      ],
    },
    {
      title: "Информация",
      items: [
        {
          name: "Документация",
          href: "/docs",
          icon: <DocumentTextIcon className="h-5 w-5" />,
        },
        {
          name: "Руководство",
          href: "/guide",
          icon: <BookOpenIcon className="h-5 w-5" />,
        },
        {
          name: "Статистика",
          href: "/stats",
          icon: <ChartBarIcon className="h-5 w-5" />,
          badge: "Новое",
        },
      ],
    },
  ];

  // Если это десктопный сайдбар, рендерим его обычным образом
  if (!isMobile) {
    return (
      <aside className="fixed inset-y-0 left-0 z-40 w-72 bg-background border-r border-border shadow-md flex flex-col">
        {/* Десктопный заголовок */}
        <div className="p-4 flex items-center justify-between border-b border-border">
          <Logo variant="full" asLink={true} />
          <ThemeToggle />
        </div>

        {/* Десктопное меню */}
        <nav className="flex-1 py-5 px-3 space-y-5 overflow-y-auto">
          {menuGroups.map((group) => (
            <div key={group.title} className="px-2">
              <div className="mb-2 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {group.title}
              </div>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2.5 text-sm rounded-lg group transition-all",
                        pathname === item.href
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      <span
                        className={cn(
                          "mr-3",
                          pathname === item.href
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                      >
                        {item.icon}
                      </span>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "text-xs py-0.5 px-2 rounded-full",
                            item.badge === "Новое"
                              ? "bg-primary/10 text-primary"
                              : "bg-accent/70 text-accent-foreground"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Улучшенная нижняя панель - обновленная */}
        <div className="mt-auto">
          {/* Разделитель */}
          <div className="h-px bg-border mx-4 my-3"></div>

          {/* Блок с информацией о продукте */}
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="flex">
                  <div className="relative z-0 h-7 w-7 rounded-full bg-background border-2 border-background overflow-hidden shadow-sm">
                    <Image
                      src="/Yandex_icon.svg"
                      alt="Яндекс"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="relative z-10 h-7 w-7 rounded-full bg-background border-2 border-background overflow-hidden shadow-sm">
                    <Image
                      src="/1C-logo.svg"
                      alt="1С"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                </div>
                <div className="ml-2">
                  <div className="text-sm font-medium">1С + YandexGPT</div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <span>Версия 1.0</span>
                    <span className="inline-block mx-1.5 h-1 w-1 rounded-full bg-muted-foreground"></span>
                    <span>2025</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Улучшенная кнопка поддержки */}
            <Link
              href="https://cloud.yandex.ru/docs"
              target="_blank"
              className="flex w-full items-center justify-center px-4 py-2.5 gap-2 rounded-lg bg-muted/50 hover:bg-primary/10 text-sm text-foreground hover:text-primary transition-colors border border-border/80 group"
            >
              <QuestionMarkCircleIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="font-medium">Служба поддержки</span>
              <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </aside>
    );
  }

  // Если это мобильный сайдбар, также улучшаем нижнюю часть
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Заголовок с кнопкой закрытия */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="font-medium">Меню</div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-muted"
          aria-label="Закрыть"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Мобильный профиль */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
            <UserCircleIcon className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <div className="font-medium">Гость</div>
            <div className="text-xs text-muted-foreground">Войти в аккаунт</div>
          </div>
        </div>
      </div>

      {/* Мобильное меню - оптимизированное для сенсорного ввода */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-2">
          {menuGroups.map((group) => (
            <div key={group.title} className="mb-3">
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {group.title}
              </div>
              <ul>
                {group.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center px-3 py-3 rounded-lg",
                        pathname === item.href
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted/70"
                      )}
                    >
                      <span
                        className={cn(
                          "mr-3",
                          pathname === item.href
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.icon}
                      </span>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "text-xs py-0.5 px-2 rounded-full",
                            item.badge === "Новое"
                              ? "bg-primary/10 text-primary"
                              : "bg-accent/70 text-accent-foreground"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Нижняя панель с темой и версией - улучшенная */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex -space-x-2">
              <div className="relative z-0 h-6 w-6 rounded-full bg-background border-2 border-background overflow-hidden shadow-sm">
                <Image
                  src="/Yandex_icon.svg"
                  alt="Яндекс"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="relative z-10 h-6 w-6 rounded-full bg-background border-2 border-background overflow-hidden shadow-sm">
                <Image
                  src="/1C-logo.svg"
                  alt="1С"
                  fill
                  className="object-contain p-1"
                />
              </div>
            </div>
            <div className="ml-2">
              <div className="text-xs font-medium">Версия 1.0</div>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Улучшенная кнопка поддержки для мобильной версии */}
        <Link
          href="https://cloud.yandex.ru/docs"
          target="_blank"
          className="flex w-full items-center justify-center px-3 py-2.5 gap-2 rounded-lg bg-muted/50 hover:bg-primary/10 text-xs text-foreground hover:text-primary transition-colors border border-border/80"
        >
          <QuestionMarkCircleIcon className="h-3.5 w-3.5" />
          <span className="font-medium">Связаться с поддержкой</span>
          <ArrowTopRightOnSquareIcon className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
