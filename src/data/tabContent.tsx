import React from "react";
import Image from "next/image";
import { FaStore, FaLock, FaIndustry, FaTruckMoving } from "react-icons/fa6";
import { BsCheck2Circle, BsLightningChargeFill } from "react-icons/bs";

export const tabContent = [
  {
    label: "О продукте",
    content: (
      <div className="w-full flex flex-col">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Эффективное решение для вашего бизнеса
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          <div className="border border-border rounded-xl p-5 bg-card/50">
            <h4 className="text-lg font-semibold mb-3 flex items-center">
              <span className="bg-primary/10 p-1.5 rounded-lg mr-2 text-primary">
                <BsCheck2Circle className="text-lg" />
              </span>
              Преимущества
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-0.5">•</span>
                <span>Сокращение времени на создание описаний на 90%</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-0.5">•</span>
                <span>Единый стиль для всех описаний товаров</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-0.5">•</span>
                <span>Учёт всех характеристик товара в описаниях</span>
              </li>
            </ul>
          </div>

          <div className="border border-border rounded-xl p-5 bg-card/50">
            <h4 className="text-lg font-semibold mb-3 flex items-center">
              <span className="bg-primary/10 p-1.5 rounded-lg mr-2 text-primary">
                <BsLightningChargeFill className="text-lg" />
              </span>
              Результаты внедрения
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-0.5">•</span>
                <span>Увеличение конверсии интернет-магазинов до 45%</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-0.5">•</span>
                <span>Ускорение процесса подготовки каталогов в 8 раз</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-0.5">•</span>
                <span>Единообразие описаний во всех точках продаж</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-base text-muted-foreground text-center max-w-3xl mx-auto mt-5">
          Интеграция 1С с технологиями Яндекса автоматизирует создание описаний
          товаров, экономит время и ресурсы компании, обеспечивая высокое
          качество контента.
        </div>
      </div>
    ),
  },
  {
    label: "Для кого",
    content: (
      <div className="w-full flex flex-col">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Кому подойдет интеграция
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto w-full">
          <div className="border border-border rounded-xl overflow-hidden bg-card/50">
            <div className="p-3 border-b border-border bg-primary/5 flex items-center">
              <div className="h-9 w-9 rounded-full bg-white dark:bg-zinc-800/90 flex items-center justify-center mr-3 shadow-sm">
                <FaStore className="h-4 w-4 text-primary" />
              </div>
              <h4 className="font-semibold">Интернет-магазины</h4>
            </div>

            <div className="p-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <BsCheck2Circle className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Оптимизация текстов под поисковые запросы</span>
                </div>
                <div className="flex items-start">
                  <BsCheck2Circle className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Уникальные продающие тексты для каждой позиции</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-border rounded-xl overflow-hidden bg-card/50">
            <div className="p-3 border-b border-border bg-primary/5 flex items-center">
              <div className="h-9 w-9 rounded-full bg-white dark:bg-zinc-800/90 flex items-center justify-center mr-3 shadow-sm">
                <FaIndustry className="h-4 w-4 text-primary" />
              </div>
              <h4 className="font-semibold">Производители</h4>
            </div>

            <div className="p-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <BsCheck2Circle className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Соблюдение отраслевых стандартов в описаниях</span>
                </div>
                <div className="flex items-start">
                  <BsCheck2Circle className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Автоматическое обновление при смене характеристик</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-border rounded-xl overflow-hidden bg-card/50">
            <div className="p-3 border-b border-border bg-primary/5 flex items-center">
              <div className="h-9 w-9 rounded-full bg-white dark:bg-zinc-800/90 flex items-center justify-center mr-3 shadow-sm">
                <FaTruckMoving className="h-4 w-4 text-primary" />
              </div>
              <h4 className="font-semibold">Дистрибьюторы</h4>
            </div>

            <div className="p-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <BsCheck2Circle className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Адаптация форматов под разные маркетплейсы</span>
                </div>
                <div className="flex items-start">
                  <BsCheck2Circle className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>Массовая выгрузка данных во внешние системы</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-base text-muted-foreground text-center max-w-3xl mx-auto mt-5">
          Наше решение создано для бизнесов, которые хотят автоматизировать
          создание контента и улучшить качество описаний товаров.
        </div>
      </div>
    ),
  },
  {
    label: "Безопасность",
    content: (
      <div className="w-full flex flex-col">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Полная защита ваших данных
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          <div className="border border-border rounded-xl p-5 bg-card/50">
            <div className="flex items-center mb-3">
              <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <FaLock className="text-primary text-lg" />
              </div>
              <h4 className="text-lg font-semibold">Защита передачи данных</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-primary mr-2 mt-0.5">•</span>
                <span>Шифрование всех данных при передаче (TLS 1.3)</span>
              </div>
              <div className="flex items-start">
                <span className="text-primary mr-2 mt-0.5">•</span>
                <span>Защита от несанкционированного доступа</span>
              </div>
              <div className="flex items-start">
                <span className="text-primary mr-2 mt-0.5">•</span>
                <span>Шифрование данных в состоянии покоя</span>
              </div>
            </div>
          </div>

          <div className="border border-border rounded-xl p-5 bg-card/50">
            <div className="flex items-center mb-3">
              <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <div className="relative h-5 w-20">
                  <Image
                    src="/logo_text_yandex.svg"
                    alt="Яндекс"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h4 className="text-lg font-semibold">
                Соответствие законодательству
              </h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-primary mr-2 mt-0.5">•</span>
                <span>Соответствие требованиям 152-ФЗ и GDPR</span>
              </div>
              <div className="flex items-start">
                <span className="text-primary mr-2 mt-0.5">•</span>
                <span>Обработка данных только на серверах в РФ</span>
              </div>
              <div className="flex items-start">
                <span className="text-primary mr-2 mt-0.5">•</span>
                <span>Гибкие настройки прав доступа к функциям</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-base text-muted-foreground text-center max-w-3xl mx-auto mt-5">
          Безопасность информации — наш приоритет. Обмен данными между 1С и
          сервисами Яндекс происходит по защищенным каналам.
        </div>
      </div>
    ),
  },
];
