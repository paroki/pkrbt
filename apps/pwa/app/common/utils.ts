"use client";
import { clsx, type ClassValue } from "clsx";
import moment from "moment/min/moment-with-locales";
import { twMerge } from "tailwind-merge";

moment.locale("id");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert YYYY-MM-DD string to date
 */
export function stringToDate(dateStr: string) {
  return new Date(dateStr);
}

export function toMoney(num: number): string {
  const format = Intl.NumberFormat("id-ID", {
    style: "decimal",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).resolvedOptions().maximumFractionDigits;

  return num.toLocaleString("id-ID", {
    maximumFractionDigits: format,
  });
}

export function toLocalDate(str: string | null, format = "DD-MM") {
  if (null === str) {
    return "N/A";
  }
  const date = moment(str, "YYYY-MM-DD");
  return date.format(format);
}

export function toHuman(str: string | null | undefined) {
  if (!str || null === str) {
    return "N/A";
  }
  const date = moment(str).fromNow();

  return date;
}

export function getMonthName(num: number) {
  const { months } = moment;
  return months(num);
}

export function getMonths() {
  const { months } = moment;
  return months();
}
