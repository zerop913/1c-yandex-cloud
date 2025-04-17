"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaKey,
  FaCog,
  FaTrash,
  FaSave,
  FaIdCard,
  FaExternalLinkAlt,
  FaTerminal,
  FaCopy,
  FaArrowRight,
  FaWindows,
  FaRegLightbulb,
  FaClipboardCheck,
} from "react-icons/fa";
import { Spotlight } from "@/components/ui/spotlight";
import { useTheme } from "next-themes";
import { Alert } from "@/components/ui/alert";
import { AnimatedButton } from "@/components/ui/animated-button";
import Image from "next/image";
import Link from "next/link";

export default function TokensPage() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const [oauthToken, setOauthToken] = useState("");
  const [iamToken, setIamToken] = useState("");
  const [folderId, setFolderId] = useState("");

  const [commands, setCommands] = useState({
    installCommand: "",
    installCommandCmd: "",
    iamTokenCommand: "",
    folderIdCommand: "",
  });

  useEffect(() => {
    setMounted(true);

    setCommands({
      installCommand: `iex (New-Object System.Net.WebClient).DownloadString('https://storage.yandexcloud.net/yandexcloud-yc/install.ps1')`,
      installCommandCmd: `@"%SystemRoot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe" -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://storage.yandexcloud.net/yandexcloud-yc/install.ps1'))" && SET "PATH=%PATH%;%USERPROFILE%\\yandex-cloud\\bin"`,
      iamTokenCommand: `yc iam create-token`,
      folderIdCommand: `yc resource-manager folder get default`,
    });

    if (typeof window !== "undefined") {
      const savedOauthToken = localStorage.getItem("oauth_token") || "";
      const savedIamToken = localStorage.getItem("iam_token") || "";
      const savedFolderId = localStorage.getItem("folder_id") || "";

      setOauthToken(savedOauthToken);
      setIamToken(savedIamToken);
      setFolderId(savedFolderId);
    }
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    localStorage.setItem("oauth_token", oauthToken);
    localStorage.setItem("iam_token", iamToken);
    localStorage.setItem("folder_id", folderId);

    setIsLoading(false);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  const handleClear = () => {
    setOauthToken("");
    setIamToken("");
    setFolderId("");

    localStorage.removeItem("oauth_token");
    localStorage.removeItem("iam_token");
    localStorage.removeItem("folder_id");

    setIsCleared(true);
    setTimeout(() => {
      setIsCleared(false);
    }, 3000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess(label);
        setTimeout(() => setCopySuccess(null), 2000);
      },
      (err) => {
        console.error("Не удалось скопировать текст: ", err);
      }
    );
  };

  if (!mounted) {
    return (
      <div className="flex flex-col p-6 h-full">
        <div className="h-10 bg-muted animate-pulse rounded mb-6"></div>
        <div className="h-96 bg-muted/50 animate-pulse rounded"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 pb-16">
      {/* Заголовок страницы */}
      <div className="text-center max-w-3xl mx-auto mb-4">
        <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-muted">
          <span className="px-3 py-0.5 text-xs font-medium rounded-full bg-background border border-border shadow-sm">
            Настройка API
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          Токены доступа Яндекс.Облака
        </h1>
        <p className="text-lg text-muted-foreground">
          Для работы с API YandexGPT необходимы токены доступа и ID каталога
        </p>
      </div>

      {/* БЛОК 1: Основной блок с токенами - всегда виден */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full overflow-hidden rounded-2xl border border-border bg-card shadow-md"
      >
        {theme === "dark" && (
          <Spotlight
            className="-top-40 left-0 md:left-60 opacity-20"
            fill={`hsl(0 100% 50% / 0.1)`}
          />
        )}

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-primary/70 to-primary text-current">
              <FaKey size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Сохранение токенов</h2>
              <p className="text-muted-foreground text-sm">
                Введите полученные токены для использования в интеграции
              </p>
            </div>
          </div>

          {/* Уведомления */}
          {isSaved && (
            <Alert
              variant="success"
              title="Токены сохранены"
              description="Ваши данные авторизации успешно сохранены в локальном хранилище браузера"
              className="mb-6"
            />
          )}

          {isCleared && (
            <Alert
              variant="info"
              title="Данные очищены"
              description="Все токены и идентификаторы были удалены из хранилища"
              className="mb-6"
            />
          )}

          {copySuccess && (
            <Alert
              variant="success"
              title="Скопировано"
              description={`${copySuccess} скопирован в буфер обмена`}
              className="mb-6"
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* OAuth Token */}
            <div className="space-y-2 bg-gradient-to-br from-accent/10 to-background p-5 rounded-xl border border-border/50 hover:shadow-sm transition-all">
              <label
                htmlFor="oauth-token"
                className="flex items-center text-sm font-medium text-foreground"
              >
                <div className="p-1.5 rounded-md bg-primary/10 mr-2">
                  <FaKey className="h-4 w-4 text-primary" />
                </div>
                OAuth Token
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <input
                  type="text"
                  id="oauth-token"
                  value={oauthToken}
                  onChange={(e) => setOauthToken(e.target.value)}
                  placeholder="Введите OAuth Token"
                  className="block w-full rounded-lg border border-border bg-background py-3 px-4 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-text shadow-sm"
                  style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05) inset" }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Используется для первоначальной авторизации и получения IAM
                токена
              </p>
            </div>

            {/* IAM Token */}
            <div className="space-y-2 bg-gradient-to-br from-accent/10 to-background p-5 rounded-xl border border-border/50 hover:shadow-sm transition-all">
              <label
                htmlFor="iam-token"
                className="flex items-center text-sm font-medium text-foreground"
              >
                <div className="p-1.5 rounded-md bg-primary/10 mr-2">
                  <FaCog className="h-4 w-4 text-primary" />
                </div>
                IAM Token
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <input
                  type="text"
                  id="iam-token"
                  value={iamToken}
                  onChange={(e) => setIamToken(e.target.value)}
                  placeholder="Введите IAM Token"
                  className="block w-full rounded-lg border border-border bg-background py-3 px-4 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-text shadow-sm"
                  style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05) inset" }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Необходим для доступа к API сервисов Яндекс.Облака
              </p>
            </div>

            {/* Folder ID */}
            <div className="space-y-2 bg-gradient-to-br from-accent/10 to-background p-5 rounded-xl border border-border/50 hover:shadow-sm transition-all">
              <label
                htmlFor="folder-id"
                className="flex items-center text-sm font-medium text-foreground"
              >
                <div className="p-1.5 rounded-md bg-primary/10 mr-2">
                  <FaIdCard className="h-4 w-4 text-primary" />
                </div>
                ID Каталога
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <input
                  type="text"
                  id="folder-id"
                  value={folderId}
                  onChange={(e) => setFolderId(e.target.value)}
                  placeholder="Введите ID каталога"
                  className="block w-full rounded-lg border border-border bg-background py-3 px-4 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-text shadow-sm"
                  style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05) inset" }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Идентификатор каталога в Яндекс.Облаке
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-6 mt-4 border-t border-border/30">
            <motion.button
              onClick={handleClear}
              className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium text-foreground border border-border hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaTrash className="h-4 w-4" />
              Очистить
            </motion.button>

            <AnimatedButton
              onClick={handleSave}
              disabled={isLoading}
              variant="primary"
              icon={<FaSave className="h-4 w-4" />}
              className="px-6 py-2.5 cursor-pointer"
            >
              {isLoading ? "Сохраняем..." : "Сохранить токены"}
            </AnimatedButton>
          </div>
        </div>
      </motion.div>

      {/* БЛОК 2: Информационная панель */}
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <FaRegLightbulb className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-medium">Что вам потребуется</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-accent/5 p-4 rounded-xl border border-border/50 flex items-start gap-3">
            <div className="bg-white dark:bg-zinc-800 p-2 mt-1 rounded-full shadow-sm">
              <FaKey className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-sm mb-1">OAuth токен</h3>
              <p className="text-xs text-muted-foreground">
                Для первоначальной авторизации в Яндекс.Облаке
              </p>
            </div>
          </div>

          <div className="bg-accent/5 p-4 rounded-xl border border-border/50 flex items-start gap-3">
            <div className="bg-white dark:bg-zinc-800 p-2 mt-1 rounded-full shadow-sm">
              <FaCog className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-sm mb-1">IAM токен</h3>
              <p className="text-xs text-muted-foreground">
                Временный токен для доступа к API сервисов
              </p>
            </div>
          </div>

          <div className="bg-accent/5 p-4 rounded-xl border border-border/50 flex items-start gap-3">
            <div className="bg-white dark:bg-zinc-800 p-2 mt-1 rounded-full shadow-sm">
              <FaIdCard className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-sm mb-1">ID каталога</h3>
              <p className="text-xs text-muted-foreground">
                Идентификатор ресурсов в Яндекс.Облаке
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* БЛОК 3: Пошаговые инструкции */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-primary/10">
          <span className="px-3 py-0.5 text-xs font-medium rounded-full bg-background border border-border shadow-sm">
            Инструкция
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
          Получение токенов для доступа к API
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Следуйте этим шагам для получения необходимых учетных данных
        </p>
      </div>

      {/* Инструкция по установке CLI */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
              <FaTerminal size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">
                Шаг 1: Установка CLI Яндекс.Облака
              </h2>
              <p className="text-muted-foreground text-sm">
                Необходимо установить интерфейс командной строки для работы с
                токенами
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border overflow-hidden">
            <div className="bg-gradient-to-r from-accent/20 to-accent/5 p-5">
              <div className="flex items-start gap-3">
                <div className="bg-white dark:bg-zinc-800 p-2 rounded-full flex-shrink-0 shadow-sm mt-1">
                  <div className="relative h-5 w-5">
                    <Image
                      src="/Yandex_icon.svg"
                      alt="Яндекс"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Инструкция по установке
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Выберите команду в зависимости от вашей операционной
                    системы:
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-gradient-to-br from-accent/5 to-background p-4 rounded-xl border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium flex items-center">
                      <FaWindows className="mr-2 h-4 w-4 text-primary" />
                      Для PowerShell:
                    </h4>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          commands.installCommand,
                          "Команда установки"
                        )
                      }
                      className="text-xs flex items-center gap-1 text-primary hover:underline bg-background/80 px-2 py-1 rounded-md"
                    >
                      <FaCopy className="h-3 w-3" /> Копировать
                    </button>
                  </div>
                  <div className="relative bg-background/70 dark:bg-zinc-900/70 rounded-lg p-3 border border-border overflow-x-auto whitespace-nowrap">
                    <code className="font-mono text-xs">
                      {commands.installCommand || ""}
                    </code>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-accent/5 to-background p-4 rounded-xl border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium flex items-center">
                      <FaTerminal className="mr-2 h-4 w-4 text-primary" />
                      Для командной строки Windows:
                    </h4>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          commands.installCommandCmd,
                          "Команда установки (CMD)"
                        )
                      }
                      className="text-xs flex items-center gap-1 text-primary hover:underline bg-background/80 px-2 py-1 rounded-md"
                    >
                      <FaCopy className="h-3 w-3" /> Копировать
                    </button>
                  </div>
                  <div className="relative bg-background/70 dark:bg-zinc-900/70 rounded-lg p-3 border border-border overflow-x-auto">
                    <code className="font-mono text-xs whitespace-pre-wrap">
                      {commands.installCommandCmd || ""}
                    </code>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <div className="bg-white dark:bg-zinc-800 p-2 rounded-full flex-shrink-0 shadow-sm mt-1">
                  <div className="text-primary font-bold text-sm">i</div>
                </div>
                <div>
                  <p className="text-sm">
                    При установке вас спросят:{" "}
                    <span className="font-mono text-foreground px-1 py-0.5 bg-background rounded">
                      Add yc installation dir to your PATH? [Y/n]
                    </span>
                    <br />
                    Введите{" "}
                    <span className="font-medium text-foreground">Y</span> для
                    добавления CLI в системный путь.
                  </p>
                </div>
              </div>

              <div className="flex justify-center mt-2">
                <Link
                  href="/tokens/install"
                  className="group inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors bg-accent/5 hover:bg-accent/10 px-4 py-2 rounded-lg border border-border"
                >
                  <span>Подробная инструкция по установке</span>
                  <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Получение токенов: карточки */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
              <FaKey size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">
                Шаг 2: Получение токенов
              </h2>
              <p className="text-muted-foreground text-sm">
                Выполните следующие команды для получения необходимых токенов
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* OAuth Token */}
            <div className="group border border-border rounded-xl overflow-hidden bg-gradient-to-br from-card/80 to-card shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
              <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent-foreground/5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white dark:bg-zinc-800/90 flex items-center justify-center shadow-sm">
                    <FaKey className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">1. OAuth токен</h3>
                    <p className="text-xs text-muted-foreground">
                      Первый шаг интеграции
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <p className="text-sm flex-1">
                      Выполните команду{" "}
                      <code className="px-1.5 py-0.5 bg-muted rounded text-xs">
                        yc init
                      </code>{" "}
                      в терминале
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <p className="text-sm flex-1">
                      Перейдите по ссылке, которая появится в терминале для
                      получения OAuth токена
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <p className="text-sm flex-1">
                      Скопируйте полученный OAuth-токен в терминал (он будет
                      сохранен в конфигурации)
                    </p>
                  </div>
                </div>

                <div className="mt-3 bg-muted/30 rounded-lg p-3 border border-border">
                  <p className="text-xs mb-1.5 text-muted-foreground">
                    Пример OAuth токена:
                  </p>
                  <div className="bg-background rounded-md p-2 font-mono text-xs text-foreground break-all">
                    y0_AgAAAABEWC5NAATuwQAAAAEQj_PqAAAIw1oyz...
                  </div>
                </div>

                <div className="mt-auto pt-4 flex justify-center">
                  <Link
                    href="/tokens/oauth-token"
                    className="group text-sm text-primary hover:text-primary/80 flex items-center gap-1 bg-accent/5 hover:bg-accent/10 px-3 py-1.5 rounded-full border border-border"
                  >
                    <span>Подробная инструкция</span>
                    <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* IAM Token */}
            <div className="group border border-border rounded-xl overflow-hidden bg-gradient-to-br from-card/80 to-card shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
              <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent-foreground/5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white dark:bg-zinc-800/90 flex items-center justify-center shadow-sm">
                    <FaCog className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">2. IAM токен</h3>
                    <p className="text-xs text-muted-foreground">
                      Временный токен доступа
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <p className="text-sm flex-1">
                      Убедитесь, что вы уже настроили CLI с OAuth токеном
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <p className="text-sm flex-1">
                      Выполните команду для получения IAM токена:
                    </p>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-accent/5">
                    <div className="flex items-center">
                      <FaTerminal className="h-3.5 w-3.5 text-muted-foreground mr-1.5" />
                      <span className="text-xs font-medium">Команда CLI</span>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          commands.iamTokenCommand,
                          "Команда IAM токена"
                        )
                      }
                      className="text-xs flex items-center gap-1 text-primary hover:underline"
                    >
                      <FaCopy className="h-3 w-3" /> Копировать
                    </button>
                  </div>
                  <div className="p-3 font-mono text-xs bg-background/70">
                    {commands.iamTokenCommand || ""}
                  </div>
                  <div className="px-3 py-2 text-xs text-muted-foreground border-t border-border bg-accent/5">
                    Команда вернет временный IAM токен (действителен 12 часов)
                  </div>
                </div>

                <div className="mt-auto pt-4 flex justify-center">
                  <Link
                    href="/tokens/iam-token"
                    className="group text-sm text-primary hover:text-primary/80 flex items-center gap-1 bg-accent/5 hover:bg-accent/10 px-3 py-1.5 rounded-full border border-border"
                  >
                    <span>Подробная инструкция</span>
                    <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* ID каталога */}
            <div className="group border border-border rounded-xl overflow-hidden bg-gradient-to-br from-card/80 to-card shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
              <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent-foreground/5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white dark:bg-zinc-800/90 flex items-center justify-center shadow-sm">
                    <FaIdCard className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">3. ID Каталога</h3>
                    <p className="text-xs text-muted-foreground">
                      Идентификатор ресурсов
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <p className="text-sm flex-1">
                      После настройки CLI вы можете получить ID каталога
                      командой:
                    </p>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-accent/5">
                    <div className="flex items-center">
                      <FaTerminal className="h-3.5 w-3.5 text-muted-foreground mr-1.5" />
                      <span className="text-xs font-medium">Команда CLI</span>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          commands.folderIdCommand,
                          "Команда получения ID каталога"
                        )
                      }
                      className="text-xs flex items-center gap-1 text-primary hover:underline"
                    >
                      <FaCopy className="h-3 w-3" /> Копировать
                    </button>
                  </div>
                  <div className="p-3 font-mono text-xs bg-background/70">
                    {commands.folderIdCommand || ""}
                  </div>
                </div>

                <div className="bg-primary/5 rounded-lg p-3 border border-primary/20 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <FaIdCard className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm font-medium">
                      Пример ID каталога:
                    </span>
                  </div>
                  <div className="bg-background/70 rounded-md p-2 font-mono text-xs text-center border border-border/80">
                    b1grs8tevb7mhcs3gp68
                  </div>
                </div>

                <div className="mt-auto pt-4 flex justify-center">
                  <Link
                    href="/tokens/folder-id"
                    className="group text-sm text-primary hover:text-primary/80 flex items-center gap-1 bg-accent/5 hover:bg-accent/10 px-3 py-1.5 rounded-full border border-border"
                  >
                    <span>Подробная инструкция</span>
                    <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ссылки на документацию */}
      <div className="mt-4 p-5 bg-accent/10 rounded-xl border border-border text-sm text-muted-foreground flex flex-col md:flex-row md:items-start">
        <div className="flex-shrink-0 text-primary p-3 bg-background rounded-lg shadow-sm mb-4 md:mb-0 md:mr-5 self-center md:self-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="space-y-3 flex-1">
          <h3 className="font-medium text-foreground text-base">
            Официальная документация
          </h3>
          <p>
            Подробную информацию о работе с токенами и доступах в Яндекс.Облаке
            смотрите в официальной документации:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <a
              href="https://cloud.yandex.ru/docs/iam/concepts/authorization/oauth-token"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background hover:bg-accent/5 transition-colors group"
            >
              <FaKey className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">OAuth-токен</span>
              <FaExternalLinkAlt className="h-3 w-3 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://cloud.yandex.ru/docs/iam/concepts/authorization/iam-token"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background hover:bg-accent/5 transition-colors group"
            >
              <FaCog className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">IAM-токен</span>
              <FaExternalLinkAlt className="h-3 w-3 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://cloud.yandex.ru/docs/cli/quickstart"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background hover:bg-accent/5 transition-colors group"
            >
              <FaTerminal className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Установка CLI</span>
              <FaExternalLinkAlt className="h-3 w-3 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
