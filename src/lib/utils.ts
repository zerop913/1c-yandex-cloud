import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Проверяем, что код выполняется в браузере, а не на сервере
const isBrowser = typeof window !== "undefined";

// Функция для установки RGB переменных
function setRgbVariables() {
  if (!isBrowser) return;

  document.documentElement.style.setProperty(
    "--primary-rgb",
    getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim()
      .match(/\d+/g)
      ?.join(", ") || "255, 51, 51"
  );
}

// Обновление RGB значения при смене темы
if (isBrowser) {
  // Выполняем инициализацию при загрузке страницы
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setRgbVariables);
  } else {
    setRgbVariables();
  }

  // Устанавливаем обсервер для отслеживания изменения темы
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class" &&
        (mutation.target as HTMLElement).classList.contains("dark")
      ) {
        setTimeout(setRgbVariables, 0);
      }
    });
  });

  observer.observe(document.documentElement, { attributes: true });
}
