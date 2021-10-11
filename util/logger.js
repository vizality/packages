/* eslint-disable no-unused-vars */
/**
 * Contains functions that output stylized messages to developer tools console.
 * @module Logger
 * @memberof Util
 * @namespace Util.Logger
 */

/**
 * @typedef LoggerLabel
 * @type {object}
 * @property {string} text Text to show in the label
 * @property {string} color Color string in any format (without alpha)
 */

import { getRandomColor, getContrastColor, blendColors, shadeColor } from './color';
import { isArray, isEmptyArray, assertArray } from './array';
import { isString, assertString } from './string';
import { assertObject } from './object';

/** @private */
const _labels = [ 'Util', 'Logger' ];
const _log = (labels, ...message) => this.log({ labels, message });
const _warn = (labels, ...message) => this.warn({ labels, message });
const _error = (labels, ...message) => this.error({ labels, message });

/**
 * Processes which type of console method to use.
 * @private
 * @param {any} type Type of console method
 * @returns {('log'|'warn'|'error')} Type of console method to use
 */
const _parseType = type => {
  return [ 'log', 'warn', 'error' ].find(t => t === type) || 'log';
};

/**
 * Sets the maximum amount of badges that can be used in a single console message.
 */
export const MAX_LABELS_COUNT = 10;

/**
 * Contains a list of modules and their color badge associations.
 */
export const MODULES = {
  watcher:        [ '#FFC600' ],
  vizality:       [ '#121321', '#ffffff' ],
  compiler:       [ '#38964e', '#c01b91' ],
  api:            [ '#ff006a', '#414875' ],
  util:           [ '#4b2d73', '#c65d00' ],
  http:           [ '#e63200', '#2e89c9' ],
  manager:        [ '#782049', '#6f9150' ],
  builtin:        [ '#267366', '#b63754' ],
  plugin:         [ '#42ffa7', '#594bda' ],
  theme:          [ '#b68aff', '#f3523d' ],
  discordnative:  [ '#7289da', '#18191c' ],
  hooks:          [ '#ed7c6f', '#34426e' ],
  i18n:           [ '#a70338', '#0195b5' ],
  component:      [ '#162a2e', '#e58ede' ],
  discord:        [ '#b68aff', '#f3523d' ],
  constants:      [ '#b68aff', '#f3523d' ],
  classes:        [ '#b68aff', '#f3523d' ]
};

/**
 * Outputs messages to console of varying types. Outputted messages contain a badge, label(s), and a message.
 * @param {object} options Options for the console message
 * @param {string} [options.type='log'] Type of console method to use
 * @param {string} [options.badge='vizality://assets/images/logo.png'] Badge image URL
 * @param {Array<string|LoggerLabel>} [options.labels] Label texts or label objects. Limit of 10.
 * @param {...any} [options.message] Contents of the console message
 * @private
 */
const _logHandler = options => {
  try {
    assertObject(options);
    let { type, badge, labels, message } = options;

    /**
     * Set up fallbacks for some options.
     */
    labels = labels || [];
    type = _parseType(type);
    badge = badge || 'vizality://assets/images/logo.png';

    /**
     * Throw an error if any of the arg types aren't as expected.
     */
    assertArray(labels);
    assertString(type);
    assertString(badge);

    /**
     * If message isn't an array, turn it into one so we can process them all the same.
     */
    if (!isArray(message)) message = [ message ];

    const baseBadgeStyles = `
      display: inline-block;
      text-align: center;
      border-radius: 2px;
      font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
      text-transform: uppercase;
      font-size: 10px;
      font-weight: 600;
      line-height: 14px;
      margin-right: 3px;
      padding: 1px 4px;`;

    const badgeStyles = `
      display: inline-block;
      background-image: url('${badge}');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      border-radius: 2px;
      text-align: center;
      padding: 2px 14px 5px 0;
      margin: 0 4px 1px 0;`;

    /**
     * If there aren't any labels, just send the badge and message.
     */
    if (!labels || isEmptyArray(labels)) {
      return console[type](
        `%c `,
        badgeStyles,
        ...message
      );
    }

    const processedLabels = [];
    for (const [ index, label ] of labels.entries()) {
      /**
       * 
       */
      if (isString(label)) {
        let color;
        if ((index === 0 || index === 1) && MODULES[labels[0].toLowerCase()]) {
          color = MODULES[labels[0].toLowerCase()][index];
        } else if (index === 2 && MODULES[labels[0].toLowerCase()]) {
          color = shadeColor(blendColors(MODULES[labels[0].toLowerCase()][0], processedLabels[index - 1]?.color, 0.5), -0.5);
        } else if (index > 2 && MODULES[labels[0].toLowerCase()]) {
          color = shadeColor(processedLabels[index - 1]?.color, 0.2);
        } else {
          color = getRandomColor();
        }
        processedLabels.push({
          text: label,
          color
        });
      /**
       * 
       */
      } else {
        processedLabels.push({
          text: label.text,
          color: label.color || getRandomColor()
        });
      }
    }

    const texts = [];
    const styles = [];

    /**
     * 
     */
    for (const label of processedLabels.slice(0, this.MAX_LABELS_COUNT)) {
      if (!label?.text || !label?.color) {
        throw new Error('Each label must contain a valid text and color property.');
      }
      texts.push(`%c${label.text}`);
      styles.push(
        `${baseBadgeStyles};
        color: ${getContrastColor(label.color)};
        background: ${label.color};`
      );
    }

    /**
     * 
     */
    return console[type](
      `%c ${texts.join('')}`,
      badgeStyles,
      ...styles,
      ...message
    );
  } catch (err) {
    return _error(_labels.concat('_logHandler'), err);
  }
};

/**
 * Logs an informational message to dev tools console.
 * @param {object} options Options for the console message
 * @param {string} [options.badge] Badge image URL
 * @param {Array<string|LoggerLabel>} [options.labels] Label texts or label objects
 * @param {...any} [options.message] Contents of the console message
 */
export const log = options => {
  try {
    assertObject(options);
    options.type = 'log';
    return _logHandler(options);
  } catch (err) {
    return _error(_labels.concat('log'), err);
  }
};

/**
 * Logs a warning message to dev tools console.
 * @param {object} options Options for the console message
 * @param {string} [options.badge] Badge image URL
 * @param {Array<string|LoggerLabel>} [options.labels] Label texts or label objects
 * @param {...any} [options.message] Contents of the console message
 */
export const warn = options => {
  try {
    assertObject(options);
    options.type = 'warn';
    return _logHandler(options);
  } catch (err) {
    return _error(_labels.concat('warn'), err);
  }
};

/**
 * Logs an error message to dev tools console.
 * @param {object} options Options for the console message
 * @param {string} [options.badge] Badge image URL
 * @param {Array<string|LoggerLabel>} [options.labels] Label texts or label objects
 * @param {...any} [options.message] Contents of the console message
 */
export const error = options => {
  try {
    assertObject(options);
    options.type = 'error';
    return _logHandler(options);
  } catch (err) {
    return _error(_labels.concat('error'), err);
  }
};

/**
 * Logs a deprecation (warning) message to dev tools console.
 * @param {object} options Options for the console message
 * @param {string} [options.badge] Badge image URL
 * @param {Array<string|LoggerLabel>} [options.labels] Label texts or label objects
 * @param {...any} [options.message] Contents of the console message
 */
export const deprecate = options => {
  try {
    assertObject(options);
    const { message } = options;
    options.type = 'warn';
    options.message = `Deprecation Notice: ${message}`;
    return _logHandler(options);
  } catch (err) {
    return _error(_labels.concat('deprecate'), err);
  }
};
