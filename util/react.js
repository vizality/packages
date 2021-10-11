/* eslint-disable no-unused-vars */
/**
 * Contains functions relating to React and the virtual DOM.
 * @module React
 * @memberof Util
 * @namespace Util.React
 */

import ReactIs from 'react-is';

import { toHex, toInt } from './color';
import { log, warn, error } from './logger';

const RealHTMLElement = webFrame.top.context.HTMLElement;

/** @private */
const _labels = [ 'Util', 'React' ];
const _log = (labels, ...message) => log({ labels, message });
const _warn = (labels, ...message) => warn({ labels, message });
const _error = (labels, ...message) => error({ labels, message });

/**
 * Finds a value, subobject, or array from a tree that matches a specific filter.
 * @copyright MIT License - (c) 2018 Zachary Rauen
 * @see {@link https://github.com/rauenzi/BDPluginLibrary/blob/master/src/modules/utilities.js#L140}
 * @param {object} tree Tree that should be walked
 * @param {Function} filter Filter to check against each object and subobject
 * @param {object} [options={}] Additional options to customize the search
 * @param {Array<string>|null} [options.walkable=[]] Array of strings to use as keys
 * that are allowed to be walked on. Null value indicates all keys are walkable
 * @param {Array<string>} [options.ignore=[]] Array of strings to use as keys to exclude
 * from the search, most helpful when `walkable = null`
 * @returns {Node|undefined}
 */
export const findInTree = (tree, filter, { walkable = null, ignore = [] } = {}) => {
  try {
    if (!tree || typeof tree !== 'object') {
      return null;
    }
    if (typeof filter === 'string') {
      if (tree.hasOwnProperty(filter)) {
        return tree[filter];
      }
      return;
    } else if (filter(tree)) {
      return tree;
    }
    let returnValue = null;
    if (Array.isArray(tree)) {
      for (const value of tree) {
        returnValue = this.findInTree(value, filter, {
          walkable,
          ignore
        });

        if (returnValue) {
          return returnValue;
        }
      }
    } else {
      const walkables = !walkable ? Object.keys(tree) : walkable;
      for (const key of walkables) {
        if (!tree.hasOwnProperty(key) || ignore.includes(key)) {
          continue;
        }
        returnValue = this.findInTree(tree[key], filter, {
          walkable,
          ignore
        });
        if (returnValue) {
          return returnValue;
        }
      }
    }
    return returnValue;
  } catch (err) {
    return _error(_labels.concat('findInTree'), err);
  }
};

/**
 * Finds a value, subobject, or array from a tree that matches a specific filter. Great for patching render functions.
 * @copyright MIT License - (c) 2018 Zachary Rauen
 * @see {@link https://github.com/rauenzi/BDPluginLibrary/blob/master/src/modules/utilities.js#L128}
 * @param {Object} tree React tree to look through. Can be a rendered object or an internal instance
 * @param {Function} searchFilter Filter function to check subobjects against
 * @returns {Node|undefined}
 */
export const findInReactTree = (tree, searchFilter, whileLoop = false) => {
  try {
    return this.findInTree(tree, searchFilter, {
      walkable: [ 'props', 'children', 'child', 'sibling' ],
      whileLoop
    });
  } catch (err) {
    return _error(_labels.concat('findInReactTree'), err);
  }
};

let i = 0;
/**
 * 
 * @param {*} node 
 * @returns 
 */
// export const getReactInstance = node => {
//   try {
//     i++;
//     node?.setAttribute('vz-react-instance', i);
//     const elem = webFrame.top.context.document.querySelector(`[vz-react-instance="${i}"]`);
//     if (!elem) return;
//     node?.removeAttribute('vz-react-instance');
//     return elem[Object.keys(elem)?.find(key => key?.startsWith('__reactInternalInstance') || key?.startsWith('__reactFiber'))];
//   } catch (err) {
//     return _error(_labels.concat('getReactInstance'), err);
//   }
// };

/**
 * 
 * @param {*} node 
 * @returns 
 */
// export const getOwnerInstance = node => {
//   try {
//     for (let curr = this.getReactInstance(node); curr; curr = curr?.return) {
//       const owner = curr?.stateNode;
//       if (owner && !(owner instanceof RealHTMLElement)) {
//         return owner;
//       }
//     }
//     return null;
//   } catch (err) {
//     return _error(_labels.concat('getOwnerInstance'), err);
//   }
// };

/**
 * 
 * @param {*} query 
 * @param {*} all 
 * @returns 
 */
export const forceUpdateElement = (query, all = false) => {
  try {
    const elements = all
      ? [ ...document.querySelectorAll(query) ]
      : [ document.querySelector(query) ];
    return elements.filter(Boolean).forEach((element) => {
      if (this.getOwnerInstance(element)) {
        this.getOwnerInstance(element).forceUpdate();
      }
    });
  } catch (err) {
    return _error(_labels.concat('forceUpdateElement'), err);
  }
};

/**
 * Checks if something is a valid React component.
 * @see {@link https://www.npmjs.com/package/react-is}
 * @param {*} input Argument input
 * @returns {boolean} Whether the input is a valid React component
 */
export const isComponent = input => {
  try {
    return Boolean(ReactIs.isValidElementType(input) && typeof input !== 'string');
  } catch (err) {
    return _error(_labels.concat('isComponent'), err);
  }
};

/**
 * Asserts that the input is a React component.
 * If it isn't a React component, it throws an error, otherwise it does nothing.
 * @param {*} input Argument input
 * @throws {TypeError} Throw an error if the input is not a React component
 */
export const assertComponent = input => {
  /**
   * We do not want to use a try...catch here purposefully in order to
   * get proper stack traces and labels.
   */
  if (!this.isComponent(input)) {
    throw new TypeError(`Expected a React component but received ${typeof input}.`);
  }
};

/**
 * 
 * @param {*} elements 
 * @param {*} listener 
 * @returns 
 */
export const jsonToReact = (elements, listener) => {
  if (!elements) throw new Error('Settings elements are missing.');
  if (!Array.isArray(elements)) elements = [ elements ];
  const { React, React: { useState } } = vizality.modules.webpack;
  const { settings: { TextInput, ColorPickerInput, Category, SwitchItem, Checkbox, CopyInput, RadioGroup }, Divider, Markdown } = vizality.modules.components;
  return elements.map(element => {
    const [ value, setValue ] = useState(element.value || element.opened);
    switch (element.type) {
      case 'color': return (
        <ColorPickerInput
          title={element.title}
          value={toInt(value) }
          onChange={value => {
            setValue(value);
            listener(element.id, toHex(value));
          }}
          default={toInt(element.defaultValue)}
        />
      );
      case 'switch': return (
        <SwitchItem
          note={element.note}
          value={value}
          onChange={() => {
            setValue(!value);
            listener(element.id, !value);
          }}
        >
          {element.name}
        </SwitchItem>
      );
      case 'text': return (
        <TextInput
          note={element.note}
          value={value}
          onChange={value => {
            setValue(value);
            listener(element.id, value);
          }}
        >
          {element.name}
        </TextInput>
      );
      case 'category': return <Category
        description={element.note}
        name={element.name}
        opened={value}
        onChange={() => setValue(!value)}
      >{this.jsonToReact(element.items, listener)}</Category>;
      case 'checkbox': return (
        <Checkbox
          {...element}
          value={value}
          onChange={() => {
            setValue(!value);
            listener(element.id, !value);
          }}
        />
      );
      case 'copy': return (
        <CopyInput {...element}>
          {element.name}
        </CopyInput>
      );
      case 'radio': return (
        <RadioGroup
          {...element}
          value={value}
          onChange={({ value }) => {
            setValue(value);
            listener(element.id, value);
          }}
        >
          {element.name}
        </RadioGroup>
      );
      case 'slider': return (
        <SliderInput
          {...element}
          value={value}
          onChange={value => {setValue(value); listener(element.id, value);}}
        >
          {element.name}
        </SliderInput>
      );
      case 'markdown': return <Markdown {...element} />;
      case 'divider': return <Divider />;
      default: return null;
    }
  });
};
