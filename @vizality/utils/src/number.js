/* eslint-disable no-unused-vars */
/**
 * Contains functions relating to numbers.
 * @module Number
 * @memberof Util
 * @namespace Util.Number
 */

import { isNumber as _isNumber } from 'lodash-es';

import { log, warn, error } from './logger';
import { assertArray } from './array';

/** @private */
const _labels = [ 'Utils', 'Number' ];
const _log = (labels, ...message) => log({ labels, message });
const _warn = (labels, ...message) => warn({ labels, message });
const _error = (labels, ...message) => error({ labels, message });

/**
 * Checks if the input is a number.
 * @param {*} input Argument input
 * @returns {boolean} Whether or not the input is a number
 */
export const isNumber = input => {
  try {
    return _isNumber(input);
  } catch (err) {
    _error(_labels.concat('isNumber'), err);
  }
};

/**
 * Asserts that the input is a number.
 * If it isn't a number, it throws an error, otherwise it does nothing.
 * @param {*} input Argument input
 * @throws {TypeError} Throw an error if the input is not a number
 */
export const assertNumber = input => {
  /**
   * We do not want to use a try...catch here purposefully in order to
   * get proper stack traces and labels.
   */
  if (!isNumber(input)) {
    throw new TypeError(`Expected a number but received ${typeof input}.`);
  }
};

/**
 * Gets the average value from a set of numbers.
 * @see {@link https://stackoverflow.com/a/45309555|StackOverflow}
 * @param {Array<number>} numbers An array of numbers.
 * @returns {number} The average of the numbers in the array.
 */
export const getAverage = numbers => {
  try {
    assertArray(numbers);
    return numbers.reduce((all, one, _, src) => all += one / src.length, 0);
  } catch (err) {
    _error(_labels.concat('getAverage'), err);
  }
};

/**
 * Gets the median value from a set of numbers.
 * @see {@link https://stackoverflow.com/a/45309555|StackOverflow}
 * @param {Array<number>} numbers An array of numbers.
 * @returns {number} The median of the numbers in the array.
 */
export const getMedian = numbers => {
  try {
    assertArray(numbers);
    numbers.sort((a, b) => a - b);
    const half = Math.floor(numbers.length / 2);
    if (numbers.length % 2) return numbers[half];
    return (numbers[half - 1] + numbers[half]) / 2.0;
  } catch (err) {
    _error(_labels.concat('getMedian'), err);
  }
};
