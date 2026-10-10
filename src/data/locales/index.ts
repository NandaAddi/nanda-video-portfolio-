import type { Locale, LocaleDictionary } from './types';
import { enDictionary } from './en';
import { idDictionary } from './id';

export * from './types';
export { enDictionary } from './en';
export { idDictionary } from './id';

export function getDictionary(locale: Locale): LocaleDictionary {
  return locale === 'id' ? idDictionary : enDictionary;
}
