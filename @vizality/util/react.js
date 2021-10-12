/* eslint-disable no-unused-vars */
/**
 * Contains functions relating to React and the virtual DOM.
 * @module React
 * @memberof Util
 * @namespace Util.React
 */

import { log, warn, error } from './logger';

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
        returnValue = findInTree(value, filter, {
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
        returnValue = findInTree(tree[key], filter, {
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
    return findInTree(tree, searchFilter, {
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
//     for (let curr = getReactInstance(node); curr; curr = curr?.return) {
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
// export const forceUpdateElement = (query, all = false) => {
//   try {
//     const elements = all
//       ? [ ...document.querySelectorAll(query) ]
//       : [ document.querySelector(query) ];
//     return elements.filter(Boolean).forEach((element) => {
//       if (getOwnerInstance(element)) {
//         getOwnerInstance(element).forceUpdate();
//       }
//     });
//   } catch (err) {
//     return _error(_labels.concat('forceUpdateElement'), err);
//   }
// };

/**
 * Checks if something is a valid React component.
 * @copyright Facebook, Inc. and its affiliates.
 * @see {@link https://www.npmjs.com/package/react-is}
 * @param {*} input Argument input
 * @returns {boolean} Whether the input is a valid React component
 */
export const isComponent = input => {
  try {
    let REACT_FRAGMENT_TYPE = 0xeacb;
    let REACT_STRICT_MODE_TYPE = 0xeacc;
    let REACT_PROFILER_TYPE = 0xead2;
    let REACT_PROVIDER_TYPE = 0xeacd;
    let REACT_CONTEXT_TYPE = 0xeace;
    let REACT_FORWARD_REF_TYPE = 0xead0;
    let REACT_SUSPENSE_TYPE = 0xead1;
    let REACT_SUSPENSE_LIST_TYPE = 0xead8;
    let REACT_MEMO_TYPE = 0xead3;
    let REACT_LAZY_TYPE = 0xead4;
    let REACT_BLOCK_TYPE = 0xead9;
    let REACT_SERVER_BLOCK_TYPE = 0xeada;
    let REACT_FUNDAMENTAL_TYPE = 0xead5;
    let REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
    let REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

    if (typeof Symbol === 'function' && Symbol.for) {
      const symbolFor = Symbol.for;
      REACT_FRAGMENT_TYPE = symbolFor('react.fragment');
      REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
      REACT_PROFILER_TYPE = symbolFor('react.profiler');
      REACT_PROVIDER_TYPE = symbolFor('react.provider');
      REACT_CONTEXT_TYPE = symbolFor('react.context');
      REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
      REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
      REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
      REACT_MEMO_TYPE = symbolFor('react.memo');
      REACT_LAZY_TYPE = symbolFor('react.lazy');
      REACT_BLOCK_TYPE = symbolFor('react.block');
      REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
      REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
      REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
      REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
    }

    /*
     * @note typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).
     */
    if (typeof input !== 'string' || typeof input === 'function') {
      return true;
    }

    if (input === REACT_FRAGMENT_TYPE || input === REACT_PROFILER_TYPE || input === REACT_DEBUG_TRACING_MODE_TYPE || input === REACT_STRICT_MODE_TYPE || input === REACT_SUSPENSE_TYPE || input === REACT_SUSPENSE_LIST_TYPE || input === REACT_LEGACY_HIDDEN_TYPE) {
      return true;
    }

    if (typeof input === 'object' && input !== null) {
      if (input.$$typeof === REACT_LAZY_TYPE || input.$$typeof === REACT_MEMO_TYPE || input.$$typeof === REACT_PROVIDER_TYPE || input.$$typeof === REACT_CONTEXT_TYPE || input.$$typeof === REACT_FORWARD_REF_TYPE || input.$$typeof === REACT_FUNDAMENTAL_TYPE || input.$$typeof === REACT_BLOCK_TYPE || input[0] === REACT_SERVER_BLOCK_TYPE) {
        return true;
      }
    }

    return false;
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
  if (!isComponent(input)) {
    throw new TypeError(`Expected a React component but received ${typeof input}.`);
  }
};

/**
 * 
 * @param {*} elements 
 * @param {*} listener 
 * @returns 
 */
// export const jsonToReact = (elements, listener) => {
//   if (!elements) throw new Error('Settings elements are missing.');
//   if (!Array.isArray(elements)) elements = [ elements ];
//   const { React, React: { useState } } = vizality.modules.webpack;
//   const { settings: { TextInput, ColorPickerInput, Category, SwitchItem, Checkbox, CopyInput, RadioGroup }, Divider, Markdown } = vizality.modules.components;
//   return elements.map(element => {
//     const [ value, setValue ] = useState(element.value || element.opened);
//     switch (element.type) {
//       case 'color': return (
//         <ColorPickerInput
//           title={element.title}
//           value={toInt(value) }
//           onChange={value => {
//             setValue(value);
//             listener(element.id, toHex(value));
//           }}
//           default={toInt(element.defaultValue)}
//         />
//       );
//       case 'switch': return (
//         <SwitchItem
//           note={element.note}
//           value={value}
//           onChange={() => {
//             setValue(!value);
//             listener(element.id, !value);
//           }}
//         >
//           {element.name}
//         </SwitchItem>
//       );
//       case 'text': return (
//         <TextInput
//           note={element.note}
//           value={value}
//           onChange={value => {
//             setValue(value);
//             listener(element.id, value);
//           }}
//         >
//           {element.name}
//         </TextInput>
//       );
//       case 'category': return <Category
//         description={element.note}
//         name={element.name}
//         opened={value}
//         onChange={() => setValue(!value)}
//       >{jsonToReact(element.items, listener)}</Category>;
//       case 'checkbox': return (
//         <Checkbox
//           {...element}
//           value={value}
//           onChange={() => {
//             setValue(!value);
//             listener(element.id, !value);
//           }}
//         />
//       );
//       case 'copy': return (
//         <CopyInput {...element}>
//           {element.name}
//         </CopyInput>
//       );
//       case 'radio': return (
//         <RadioGroup
//           {...element}
//           value={value}
//           onChange={({ value }) => {
//             setValue(value);
//             listener(element.id, value);
//           }}
//         >
//           {element.name}
//         </RadioGroup>
//       );
//       case 'slider': return (
//         <SliderInput
//           {...element}
//           value={value}
//           onChange={value => {setValue(value); listener(element.id, value);}}
//         >
//           {element.name}
//         </SliderInput>
//       );
//       case 'markdown': return <Markdown {...element} />;
//       case 'divider': return <Divider />;
//       default: return null;
//     }
//   });
// };
