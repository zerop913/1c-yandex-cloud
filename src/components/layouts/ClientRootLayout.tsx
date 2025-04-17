"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import MainLayout from "@/components/MainLayout";
import { useEffect, useState } from "react";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // Устанавливаем состояние mounted только после монтирования компонента на клиенте
  useEffect(() => {
    setMounted(true);
  }, []);

  // Если компонент еще не смонтирован, возвращаем разметку идентичную серверной
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="min-h-screen flex flex-col">
          <div className="md:hidden h-14"></div>
          <div className="flex flex-1 flex-col md:flex-row">
            <div className="hidden md:block">
              <div className="fixed inset-y-0 left-0 z-40 w-72"></div>
            </div>
            <div className="flex-1 md:ml-72">
              <main className="px-4 pb-24 md:py-8 md:px-8 max-w-7xl mx-auto">
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MainLayout>{children}</MainLayout>
    </ThemeProvider>
  );
}
