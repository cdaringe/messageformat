import { parse, ParseOptions } from '@messageformat/parser';
import * as PluralCategories from 'make-plural/pluralCategories';
import type { MessageGroup, Resource } from 'messageformat';
import { astToMessage } from './mf1-ast-to-message';

const isPluralId = (id: string): id is keyof typeof PluralCategories =>
  id in PluralCategories;

function normalize(locale: string) {
  if (typeof locale !== 'string' || locale.length < 2)
    throw new Error(`Invalid language tag: ${locale}`);

  // The only locale for which anything but the primary subtag matters is
  // Portuguese as spoken in Portugal.
  if (locale.startsWith('pt-PT')) return 'pt_PT';

  const m = locale.match(/.+?(?=[-_])/);
  return m ? m[0] : locale;
}

/**
 * A hierarchical structure of ICU MessageFormat strings
 *
 * @public
 * @remarks
 * Used in {@link compileMessageGroup} and {@link compileResource} arguments
 */
export interface StringStructure {
  [key: string]: StringStructure | string;
}

function compileMessageGroup(src: StringStructure, options: ParseOptions) {
  const entries: MessageGroup['entries'] = {};
  for (const [key, value] of Object.entries(src)) {
    entries[key] =
      typeof value === 'string'
        ? astToMessage(parse(value, options))
        : compileMessageGroup(value, options);
  }
  return { entries };
}

export function compileMF1(
  src: StringStructure,
  { id, locale, strict }: { id: string; locale: string; strict?: boolean }
): Resource {
  const lc = normalize(locale);
  if (!isPluralId(lc)) throw new Error(`Unsupported locale: ${locale}`);
  const { cardinal, ordinal } = PluralCategories[lc];
  const { entries } = compileMessageGroup(src, { cardinal, ordinal, strict });
  return { id, locale, entries };
}
