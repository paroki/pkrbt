"use client";
import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import "moment/locale/id";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert YYYY-MM-DD string to date
 */
export function stringToDate(dateStr: string) {
  return new Date(dateStr);
}

export function isGranted(userPolicies: string[], requiredPolicies?: string[]) {
  if (undefined === requiredPolicies) return true;

  for (let i = 0; i < requiredPolicies.length; i++) {
    const policy = requiredPolicies[i];
    if (userPolicies.includes(policy)) {
      return true;
    }
  }

  return false;
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
  const date = moment(str);
  return date.format(format);
}
