import ClientRootLayout from "@/components/layouts/ClientRootLayout";
import "./globals.css";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: "Интеграция 1С и YandexGPT",
    template: "%s | 1С + YandexGPT",
  },
  description:
    "Сервис для автоматической генерации описаний товаров в 1С с использованием YandexGPT",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head />
      <body
        className="min-h-screen font-sans antialiased bg-background text-foreground"
        style={{
          ["--font-geist-sans" as string]: "var(--font-sans)",
          ["--font-geist-mono" as string]: "var(--font-mono)",
        }}
        suppressHydrationWarning
      >
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
