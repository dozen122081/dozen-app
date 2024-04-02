import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function getIdFromUrl(url: string) {
  const regex = /\/workspace\/([a-f0-9]+)\/\w+/;
  const match = url.match(regex);
  return match ? match[1] : null;
}