/* eslint-disable no-unused-vars */
/**
 * Contains functions relating to strings.
 * @module String
 * @memberof Util
 * @namespace Util.String
 */

import { camelCase, lowerCase, startCase, upperFirst, snakeCase, kebabCase, isString as _isString } from 'lodash';
import * as _chunk from 'chunk-text';
import * as pluralize from 'pluralize';

import { log, warn, error } from './logger';

/** @private */
const _labels = [ 'Util', 'String' ];
const _log = (labels, ...message) => log({ labels, message });
const _warn = (labels, ...message) => warn({ labels, message });
const _error = (labels, ...message) => error({ labels, message });

/**
 * 
 * @param {*} text 
 * @returns 
 */
export const isSingular = text => {
  try {
    return pluralize.isSingular(text);
  } catch (err) {
    return _error(_labels.concat('isSingular'), err);
  }
};

/**
 * 
 * @param {*} text 
 * @returns 
 */
export const isPlural = text => {
  try {
    return pluralize.isPlural(text);
  } catch (err) {
    return _error(_labels.concat('isPlural'), err);
  }
};

/**
 * 
 * @param {*} text 
 * @returns 
 */
export const toSingular = text => {
  try {
    return pluralize.singular(text);
  } catch (err) {
    return _error(_labels.concat('toSingular'), err);
  }
};

/**
 * 
 * @param {*} text 
 * @returns 
 */
export const toPlural = text => {
  try {
    return pluralize(text);
  } catch (err) {
    return _error(_labels.concat('toPlural'), err);
  }
};

/**
 * 
 * @param {*} text 
 * @param {*} numberOfCharacters 
 * @returns 
 */
export const chunkText = (text, numberOfCharacters) => {
  try {
    return _chunk.default(text, numberOfCharacters);
  } catch (err) {
    return _error(_labels.concat('chunkText'), err);
  }
};

/**
 * 
 * @param {*} text 
 * @returns 
 */
export const toHash = text => {
  try {
    let h1 = 0xdeadbeef ^ 0;
    let h2 = 0x41c6ce57 ^ 0;
    for (let i = 0, ch; i < text.length; i++) {
      ch = text.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString();
  } catch (err) {
    return _error(_labels.concat('toHash'), err);
  }
};

/**
 * Removes diacritics from letters in a string.
 * @param {string} text Text to check
 * @returns {string}
 */
export const stripDiacritics = text => {
  try {
    const pattern = /[\u0300-\u036f]/g;
    return text.normalize('NFD').replace(pattern, '').normalize('NFC');
  } catch (err) {
    return _error(_labels.concat('stripDiacritics'), err);
  }
};

/**
 * Checks if a string is a valid URL.
 * @param {string} input Input to check
 * @returns {boolean}
 * @example
 * // returns `false`
 * isUrl('imaurl.com')
 * @example
 * // returns `true`
 * isUrl('https://google.com')
 * @example
 * // returns `true`
 * isUrl('vizality://assets/svgs/Activity.svg')
 */
export const isUrl = input => {
  try {
    new URL(input);
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * Converts text to a camel case string.
 * @param {*} text Text to convert
 * @returns {string} Text in camel case
 * @example
 * // returns `iAmACamelCaseString`
 * toCamelCase('I am a CAMEL CASE string.')
 */
export const toCamelCase = text => {
  try {
    return camelCase(text);
  } catch (err) {
    return _error(_labels.concat('toCamelCase'), err);
  }
};

/**
 * Converts text to a lowercase dot case string.
 * @param {*} text Text to convert
 * @returns {string} Text in dot case
 * @example
 * // returns `i.am.a.dot.case.string`
 * toDotCase('I am a DOT CASE string.')
 */
export const toDotCase = text => {
  try {
    return lowerCase(text).replace(/ /g, '.');
  } catch (err) {
    return _error(_labels.concat('toDotCase'), err);
  }
};

/**
 * Converts text to a title case string.
 * @param {*} text Text to convert
 * @returns {string} Text in title case
 * @example
 * // returns `I Am A Title Case String`
 * toTitleCase('I am a TITLE CASE string.')
 */
export const toTitleCase = text => {
  try {
    return startCase(camelCase(text));
  } catch (err) {
    return _error(_labels.concat('toTitleCase'), err);
  }
};

/**
 * Converts text to a sentence case string.
 * @param {*} text Text to convert
 * @returns {string} Text in sentence case
 * @example
 * // returns `I am a sentence case string`
 * toSentenceCase('i am a SENTENCE CASE string.')
 */
export const toSentenceCase = text => {
  try {
    return upperFirst(lowerCase(text));
  } catch (err) {
    return _error(_labels.concat('toSentenceCase'), err);
  }
};

/**
 * Converts text to a pascal case string.
 * @param {*} text Text to convert
 * @returns {string} Text in pascal case
 * @example
 * // returns `IAmAPascalCaseString`
 * toPascalCase('I am a PASCAL CASE string.')
 */
export const toPascalCase = text => {
  try {
    return startCase(camelCase(text)).replace(/ /g, '');
  } catch (err) {
    return _error(_labels.concat('toPascalCase'), err);
  }
};

/**
 * Converts text to a lower path case string.
 * @param {*} text Text to convert
 * @returns {string} String in path case
 * @example
 * // returns `i/am/a/path/case/string`
 * toPathCase('I am a PATH CASE string.')
 */
export const toPathCase = text => {
  try {
    return lowerCase(text).replace(/ /g, '/');
  } catch (err) {
    return _error(_labels.concat('toPathCase'), err);
  }
};

/**
 * Converts text to a lower snake case string.
 * @param {*} text Text to convert
 * @returns {string} String in snake case
 * @example
 * // returns `i_am_a_snake_case_string`
 * toSnakeCase('I am a SNAKE CASE string.')
 */
export const toSnakeCase = text => {
  try {
    return snakeCase(text);
  } catch (err) {
    return _error(_labels.concat('toSnakeCase'), err);
  }
};

/**
 * Converts text to a kebab case string.
 * @param {*} text Text to convert
 * @returns {string} String in kebab case
 * @example
 * // returns `i-am-a-kebab-case-string`
 * toKebabCase('i am a keBab CASE string.')
 */
export const toKebabCase = text => {
  try {
    return kebabCase(text);
  } catch (err) {
    return _error(_labels.concat('toKebabCase'), err);
  }
};

/**
 * Checks if the input is a string.
 * @param {*} input Argument input
 * @returns {boolean} Whether or not the input is a string
 */
export const isString = input => {
  try {
    return _isString(input);
  } catch (err) {
    return _error(_labels.concat('isString'), err);
  }
};

/**
 * Asserts that the input is a string.
 * If it isn't a string, it throws an error, otherwise it does nothing.
 * @param {*} input Argument input
 * @throws {TypeError} Throw an error if the input is not a string
 */
export const assertString = input => {
  /**
   * We do not want to use a try...catch here purposefully in order to
   * get proper stack traces and labels.
   */
  if (!this.isString(input)) {
    throw new TypeError(`Expected a string but received ${typeof input}.`);
  }
};

/**
 * 
 * @param {*} length 
 * @returns 
 */
export const getRandomString = length => {
  try {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  } catch (err) {
    return _error(_labels.concat('getRandomString'), err);
  }
};

/**
 * OwO'ify text input.
 * @see {@link https://gist.github.com/aqua-lzma/ced43969ef48056791179138589ebcac}
 * @param {string} text Text to convert
 */
export const owoifyText = text => {
  try {
    const stutterChance = 0.1;
    const prefixChance = 0.05;
    const suffixChance = 0.15;
    const words = {
      love: 'wuv',
      mr: 'mistuh',
      dog: 'doggo',
      cat: 'kitteh',
      hello: 'henwo',
      hell: 'heck',
      fuck: 'fwick',
      fuk: 'fwick',
      shit: 'shoot',
      friend: 'fwend',
      stop: 'stawp',
      god: 'gosh',
      dick: 'peepee',
      penis: 'peepee'
    };
    const suffixes = [
      '(ﾉ´ з `)ノ',
      '( ´ ▽ ` ).｡ｏ♡',
      '(´,,•ω•,,)♡',
      '(*≧▽≦)',
      'ɾ⚈▿⚈ɹ',
      '( ﾟ∀ ﾟ)',
      '( ・ ̫・)',
      '( •́ .̫ •̀ )',
      '(▰˘v˘▰)',
      '(・ω・)',
      '✾(〜 ☌ω☌)〜✾',
      '(ᗒᗨᗕ)',
      '(・`ω´・)',
      ':3',
      '>:3',
      'hehe',
      'xox',
      '>3<',
      'murr~',
      'UwU',
      '*gwomps*'
    ];
    const prefixes = [
      'OwO',
      'OwO whats this?',
      '*unbuttons shirt*',
      '*nuzzles*',
      '*waises paw*',
      '*notices bulge*',
      '*blushes*',
      '*giggles*',
      'hehe'
    ];

    function replaceAll (text, map) {
      const source = Object.keys(map).map(i => `\\b${i}`);
      const re = new RegExp(`(?:${source.join(')|(?:')})`, 'gi');
      return text.replace(re, match => {
        let out = map[match.toLowerCase()];
        // Not very tidy way to work out if the word is capitalised
        if ((match.match(/[A-Z]/g) || []).length > match.length / 2) {
          out = out.toUpperCase();
        }
        return out;
      });
    }

    text = replaceAll(text, words);

    // OwO
    text = text.replace(/[rl]/gi, match =>
      match.charCodeAt(0) < 97 ? 'W' : 'w'
    );
    // Nya >;3
    text = text.replace(/n[aeiou]/gi, match =>
      `${match[0]}${match.charCodeAt(1) < 97 ? 'Y' : 'y'}${match[1]}`
    );
    // Words that end in y like yummy wummy
    text = text.replace(/\b[A-V,X-Z,a-v,x-z]\w{3,}y\b/gi, match =>
      `${match} ${match.charCodeAt(0) < 97 ? 'W' : 'w'}${match.slice(1)}`
    );
    // S-stutter
    text = text.split(' ').map(word => {
      if (word.length === 0 || word[0].match(/[a-zA-Z]/) === null) {
        return word;
      }
      while (Math.random() < stutterChance) {
        word = `${word[0]}-${word}`;
      }
      return word;
    }).join(' ');
    // Prefixes
    if (Math.random() < prefixChance) {
      text = `${text} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
    }
    // Suffixes
    if (Math.random() < suffixChance) {
      text = `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${text}`;
    }
    return text;
  } catch (err) {
    return _error(_labels.concat('owoifyText'), err);
  }
};
