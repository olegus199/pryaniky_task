import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

export function formatDate(iso: string): string {
  const date = parseISO(iso);
  return format(date, "dd MMM, yyyy, HH:mm", { locale: ru });
}