/* eslint-disable no-unused-vars */
/**
 * Contains functions relating to objects.
 * @module Object
 * @memberof Util
 * @namespace Util.Object
 */

import { isObject as _isObject, isEmpty as _isEmpty } from 'lodash-es';

import { toPlural, assertString } from './string';
import { log, warn, error } from './logger';

/** @private */
const _labels = [ 'Utils', 'Object' ];
const _log = (labels, ...message) => log({ labels, message });
const _warn = (labels, ...message) => warn({ labels, message });
const _error = (labels, ...message) => error({ labels, message });

// @todo Clean this up.
export const _traverse = function*(obj, targetValue, exactMatch = false, type, currentPath = '') {
  try {
    if (typeof obj !== 'object') return false;

    targetValue = targetValue.toLowerCase();
    let matchedKeys;
    if (exactMatch) {
      if (type === 'key') {
        matchedKeys = Object.keys(obj).filter(key => key.toLowerCase() === targetValue);
      } else if (type === 'value') {
        matchedKeys = Object.keys(obj).filter(key => obj[key] === targetValue);
      } if (type === 'all') {
        matchedKeys = Object.keys(obj).filter(key => key.toLowerCase() === targetValue || obj[key] === targetValue);
      }
    } else {
      if (type === 'key') {
        matchedKeys = Object.keys(obj).filter(key => key.toLowerCase().includes(targetValue));
      } else if (type === 'value') {
        matchedKeys = Object.keys(obj).filter(key => typeof obj[key] === 'string' && obj[key].toLowerCase().includes(targetValue));
      } if (type === 'all') {
        matchedKeys = Object.keys(obj).filter(key =>
          key.toLowerCase().includes(targetValue) || (typeof obj[key] === 'string' && obj[key].toLowerCase().includes(targetValue))
        );
      }
    }

    if (matchedKeys[0]) yield *matchedKeys.map(key => currentPath ? `${currentPath}.${key}` : key);

    for (const key in obj) {
      const found = _traverse(obj[key], targetValue, exactMatch, type, currentPath ? `${currentPath}.${key}` : key);
      if (found) yield *found;
    }
  } catch (err) {
    _error(_labels.concat('_traverse'), err);
  }
};

// @todo Clean this up.
export const _find = (obj, targetValue, exact = false, type) => {
  try {
    assertString(targetValue);

    let results;

    if (type === 'key' || type === 'value' || type === 'all') {
      results = [ ..._traverse(obj, targetValue, exact, type) ];
    } else {
      return _error(_labels.concat('_find'), `Argument "type" must be a string value of "key", "value", or "both"`);
    }

    const tempResults = [ ...results ];
    const longestResult = tempResults.sort((a, b) => b.length - a.length)[0];
    const resultsText = results && results.length === 1 ? 'result' : 'results';
    const choiceWord = exact ? 'matching' : 'containing';

    /*
     * @todo This needs reworking somehow. It is bugged for objects which contain
     * keys with period(s) in them.
     */
    _log(_labels.concat('_find'), `${results.length} ${resultsText} found for ${type === 'key' || type === 'value' ? toPlural(type) : 'entries'} ${choiceWord} '${targetValue}' ${results.length ? ':' : ''}`);

    if (exact) {
      results = results.map(result => result).join('\n');
    } else {
      results = results.map(result => {
        const resultArray = result.split('.');
        let outputResult = obj;

        for (const result of resultArray) {
          /**
           * Weird bug caused by splitting by . above, because some
           * keys do have a . in them, which causes issues: @see {@link https://i.imgur.com/2pvyjlI.png}
           */
          try {
            outputResult = outputResult[result];
          } catch (err) {
            continue;
          }

          if (!outputResult) outputResult = [ 'N̶U̶L̶L' ];
        }

        if (typeof outputResult === 'object') return `${result.padEnd(longestResult.length, ' ')}`;

        /*
         * We're using replace(/\n/g, '\\n') here particularly because Discord likes to sometimes
         * include \n for line breaks in their i18n strings, and if so we want to see them when
         * searching their strings.
         */
        return `${result.padEnd(longestResult.length, ' ')} | ${outputResult.replace(/\n/g, '\\n')}`;
      }).join('\n');
    }

    if (results.length > 0) {
      return console.log(results)
    };
  } catch (err) {
    _error(_labels.concat('_find'), err);
  }
};

/**
 * Checks if the input is an object.
 * @param {*} input Argument input
 * @returns {boolean} Whether or not the input is an object
 */
export const isObject = input => {
  try {
    return _isObject(input);
  } catch (err) {
    _error(_labels.concat('isObject'), err);
  }
};

/**
 * Asserts that the input is an object.
 * If it isn't an object, it throws an error, otherwise it does nothing.
 * @param {*} input Argument input
 * @throws {TypeError} Throw an error if the input is not an object
 */
export const assertObject = input => {
  /**
   * We do not want to use a try...catch here purposefully in order to
   * get proper stack traces and labels.
   */
  if (!isObject(input)) {
    throw new TypeError(`Expected an object but received ${typeof input}.`);
  }
};

/**
 * Checks if the input is an empty object.
 * @param {*} input Argument input
 * @returns {boolean} Whether or not the input is an empty object
 */
export const isEmptyObject = input => {
  try {
    return _isEmpty(input);
  } catch (err) {
    _error(_labels.concat('isEmptyObject'), err);
  }
};

export const keysToLowerCase = (obj, nested = false) => {
  try {
    return Object.keys(obj).reduce((accumulator, key) => {
      let val = obj[key];
      if (nested && typeof val === 'object') val = keysToLowerCase(val);
      accumulator[key.toLowerCase()] = val;
      return accumulator;
    }, {});
  } catch (err) {
    _error(_labels.concat('keysToLowerCase'), err);
  }
};

export const excludeProperties = (obj, ...keys) => {
  try {
    return Object.keys(obj)
      .filter(key => !keys.includes(key))
      .reduce((accumulator, key) => ({ ...accumulator, [key]: obj[key] }), {});
  } catch (err) {
    _error(_labels.concat('excludeProperties'), err);
  }
};

export const findEntriesByKeyword = (obj, keyword, exact = false) => {
  try {
    return _find(obj, keyword, exact, 'all');
  } catch (err) {
    _error(_labels.concat('findEntriesByKeyword'), err);
  }
};

export const findEntriesByKey = (obj, key, exact = false) => {
  try {
    return _find(obj, key, exact, 'key');
  } catch (err) {
    _error(_labels.concat('findEntriesByKey'), err);
  }
};

export const findEntriesByValue = (obj, value, exact = false) => {
  return _find(obj, value, exact, 'value');
};

export const removeUndefinedProperties = obj => {
  try {
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === 'object') removeEmptyProperties(obj[key]);
      else if (obj[key] === undefined) delete obj[key];
    });
    return obj;
  } catch (err) {
    _error(_labels.concat('removeEmptyProperties'), err);
  }
};
