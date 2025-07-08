import sanitizeHtml from 'sanitize-html';
import type { IOptions } from 'sanitize-html';

// Кеш для санитизации
const sanitizeCache = new Map<string, string>();
const MAX_CACHE_SIZE = 100;

/**
 * Оптимизированная функция санитизации с кешированием
 * @param text - текст для санитизации
 * @param options - опции для sanitize-html
 * @param isHTML - является ли текст HTML
 * @returns санитизированный текст
 */
export function sanitizeWithCache(text: string, options: IOptions, isHTML: boolean): string {
  const cacheKey = `${text}_${JSON.stringify(options)}_${isHTML}`;

  if (sanitizeCache.has(cacheKey)) {
    return sanitizeCache.get(cacheKey)!;
  }

  // Очистка кеша при превышении лимита
  if (sanitizeCache.size >= MAX_CACHE_SIZE) {
    const firstKey = sanitizeCache.keys().next().value;

    if (firstKey) {
      sanitizeCache.delete(firstKey);
    }
  }

  let result: string;

  try {
    if (isHTML) {
      result = sanitizeHtml(text, options);
    } else {
      // Для текста применяем базовую санитизацию
      result = sanitizeHtml(text, {
        allowedTags: [],
        allowedAttributes: {},
        disallowedTagsMode: 'escape',
      });
    }
  } catch {
    result = '';
  }

  sanitizeCache.set(cacheKey, result);

  return result;
}

/**
 * Оптимизированная функция удаления HTML тегов
 * @param text - текст с HTML тегами
 * @returns текст без HTML тегов
 */
export function stripHtmlTags(text: string): string {
  return text.replace(/<[^>]*>/g, '').trim();
}

/**
 * Очистка кеша санитизации (для тестирования или освобождения памяти)
 */
export function clearSanitizeCache(): void {
  sanitizeCache.clear();
}

/**
 * Получение размера кеша санитизации
 * @returns размер кеша
 */
export function getSanitizeCacheSize(): number {
  return sanitizeCache.size;
}
