"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimesCircle,
} from "react-icons/fa";

type AlertVariant = "success" | "warning" | "error" | "info";

interface AlertProps {
  variant: AlertVariant;
  title: string;
  description?: string;
  className?: string;
  onClose?: () => void;
}

export function Alert({
  variant,
  title,
  description,
  className,
  onClose,
}: AlertProps) {
  const getVariantStyles = (): string => {
    switch (variant) {
      case "success":
        return "bg-green-100 dark:bg-green-900/20 border-green-400 dark:border-green-700";
      case "warning":
        return "bg-yellow-100 dark:bg-yellow-900/20 border-yellow-400 dark:border-yellow-700";
      case "error":
        return "bg-red-100 dark:bg-red-900/20 border-red-400 dark:border-red-700";
      case "info":
        return "bg-blue-100 dark:bg-blue-900/20 border-blue-400 dark:border-blue-700";
      default:
        return "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700";
    }
  };

  const getIcon = () => {
    switch (variant) {
      case "success":
        return (
          <FaCheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
        );
      case "warning":
        return (
          <FaExclamationTriangle className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
        );
      case "error":
        return (
          <FaTimesCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
        );
      case "info":
        return (
          <FaInfoCircle className="h-5 w-5 text-blue-500 dark:text-blue-400" />
        );
      default:
        return null;
    }
  };

  const getTitleColor = () => {
    switch (variant) {
      case "success":
        return "text-green-800 dark:text-green-300";
      case "warning":
        return "text-yellow-800 dark:text-yellow-300";
      case "error":
        return "text-red-800 dark:text-red-300";
      case "info":
        return "text-blue-800 dark:text-blue-300";
      default:
        return "text-gray-800 dark:text-gray-200";
    }
  };

  const getDescriptionColor = () => {
    switch (variant) {
      case "success":
        return "text-green-700 dark:text-green-300/80";
      case "warning":
        return "text-yellow-700 dark:text-yellow-300/80";
      case "error":
        return "text-red-700 dark:text-red-300/80";
      case "info":
        return "text-blue-700 dark:text-blue-300/80";
      default:
        return "text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <motion.div
      className={cn(
        "rounded-lg border p-4 relative",
        getVariantStyles(),
        className
      )}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3">
          <h3 className={cn("text-sm font-medium", getTitleColor())}>
            {title}
          </h3>
          {description && (
            <div className={cn("mt-1 text-sm", getDescriptionColor())}>
              {description}
            </div>
          )}
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
                  {
                    "bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50":
                      variant === "success",
                    "bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50":
                      variant === "warning",
                    "bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50":
                      variant === "error",
                    "bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50":
                      variant === "info",
                  }
                )}
              >
                <span className="sr-only">Закрыть</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
