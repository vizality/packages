/* eslint-disable no-unused-vars */
/**
 * Contains functions relating to the DOM.
 * @module DOM
 * @memberof Util
 * @namespace Util.DOM
 */

import { log, warn, error } from './logger';
import { sleep } from './time';

/** @private */
const _labels = [ 'Utils', 'DOM' ];
const _log = (labels, ...message) => log({ labels, message });
const _warn = (labels, ...message) => warn({ labels, message });
const _error = (labels, ...message) => error({ labels, message });

export const createElement = (type, props) => {
  try {
    const element = document.createElement(type);
    for (const prop in props) {
      if ([ 'style', 'href' ].includes(prop) || prop.startsWith('vz-')) {
        element.setAttribute(prop, props[prop]);
      } else {
        element[prop] = props[prop];
      }
    }
    return element;
  } catch (err) {
    _error(_labels.concat('createElement'), err);
  }
}

export const waitForElement = async (querySelector, all = false) => {
  try {
    let element;
    while (!(element = document.querySelector(querySelector))) await sleep(1);
    if (all) {
      return document.querySelectorAll(querySelector);
    }
    return element;
  } catch (err) {
    _error(_labels.concat("waitForElement"), err);
  }
};

export const getElementDimensions = (node) => {
  try {
    let widthList = [ 'margin-right', 'margin-left', 'border-right', 'border-left', 'padding-right', 'padding-left', 'width' ];
    let heightList = [ 'margin-top', 'margin-bottom', 'border-top', 'border-bottom', 'padding-top', 'padding-bottom', 'height' ];

    const style = window.getComputedStyle(node);
    if (style.getPropertyValue('box-sizing') === 'border-box') {
      widthList = [ 'margin-right', 'margin-left', 'width' ];
      heightList = [ 'margin-top', 'margin-bottom', 'height' ];
    }

    const width = widthList
      .map(k => parseInt(style.getPropertyValue(k)))
      .reduce((prev, cur) => prev + cur);
    const height = heightList
      .map(k => parseInt(style.getPropertyValue(k)))
      .reduce((prev, cur) => prev + cur);

    return { width, height };
  } catch (err) {
    _error(_labels.concat('getElementDimensions'), err);
  }
};

export const injectShadowStyles = (shadowRootElement, insertBeforeSelector, styles) => {
  try {
    const root = shadowRootElement?.shadowRoot;
    if (root !== null) {
      const styleElements = root.querySelectorAll('style');
      if (!Array.from(styleElements).some(el => el.innerHTML === styles)) {
        const newStyleTag = document.createElement('style');
        newStyleTag.innerHTML = styles;
        root.insertBefore(newStyleTag, root.querySelector(insertBeforeSelector));
      }
    }
  } catch (err) {
    _error(_labels.concat('injectShadowStyles'), err);
  }
};

// @todo
export const injectStylesheet = () => {
  try {
    
  } catch (err) {
    _error(_labels.concat('injectStylesheet'), err);
  }
};

// @todo
export const injectScript = () => {
  try {
    
  } catch (err) {
    _error(_labels.concat('injectScript'), err);
  }
};

/**
 * A simple utility for conditionally joining class names together.
 * @see {@link https://github.com/JedWatson/classnames}
 * @param {string|object|Array} items Potential class names we're trying to join
 * @returns {string} String of class names joined together
 */
export const joinClassNames = (...items) => {
  try {
    const classes = [];
    for (const item of items) {
      if (!item) continue;
      const argType = typeof item;
      if (argType === 'string' || argType === 'number') {
        classes.push(item);
      } else if (Array.isArray(item)) {
        if (item.length) {
          const inner = joinClassNames.apply(null, item);
          if (inner) classes.push(inner);
        }
      } else if (argType === 'object') {
        if (item.toString !== Object.prototype.toString) {
          classes.push(item.toString());
        } else {
          for (const key in item) {
            if (item.hasOwnProperty(key) && item[key]) {
              classes.push(key);
            }
          }
        }
      }
    }
    return classes.join(' ');
  } catch (err) {
    _error(_labels.concat('joinClassNames'), err);
  }
};
