/* eslint-disable no-unused-vars */
/**
 * Contains functions relating to time and dates.
 * @module Time
 * @memberof Util
 * @namespace Util.Time
 */

import { isDate as _isDate } from 'lodash-es';
import moment from 'moment';

import { log, warn, error } from './logger';

/** @private */
const _labels = [ 'Utils', 'Time' ];
const _log = (labels, ...message) => log({ labels, message });
const _warn = (labels, ...message) => warn({ labels, message });
const _error = (labels, ...message) => error({ labels, message });

/**
 * 
 * @param {*} ms 
 * @returns 
 */
export const millisecondsToTime = ms => {
  try {
    const time = moment.duration(ms);
    let output;
    output = time.hours() ? time.hours() : null;
    if (time.minutes()) {
      output = output ? `${output}:${time.minutes()}` : time.minutes();
      if (time.seconds()) {
        output = output ? `${output}:${time.seconds()}` : time.seconds();
      } else {
        output = output ? `${output}:00` : '00';
      }
    } else {
      output = output ? `${output}:00` : '00';
    }
    return output;
  } catch (err) {
    return _error(_labels.concat('millisecondsToTime'), err);
  }
};

/**
 * Checks if the input is a date.
 * @param {*} input Argument input
 * @returns {boolean} Whether or not the input is a date
 */
export const isDate = input => {
  try {
    return _isDate(input);
  } catch (err) {
    return _error(_labels.concat('isDate'), err);
  }
};

/**
 * Asserts that the input is a Date.
 * If it isn't a date, it throws an error, otherwise it does nothing.
 * @param {*} input Argument input
 * @throws {TypeError} Throw an error if the input is not a Date
 */
export const assertDate = input => {
  /**
   * We do not want to use a try...catch here purposefully in order to
   * get proper stack traces and labels.
   */
  if (!isDate(input)) {
    throw new TypeError(`Expected a Date but received ${typeof input}.`);
  }
};

/**
 * 
 * @param {*} time 
 * @returns 
 */
export const sleep = async time => {
  try {
    return new Promise(resolve =>
      setTimeout(resolve, time)
    );
  } catch (err) {
    return _error(_labels.concat('sleep'), err);
  }
};

