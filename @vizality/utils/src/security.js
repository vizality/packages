/* eslint-disable no-unused-vars */
/**
 * Contains functions relating to security.
 * @module Security
 * @memberof Util
 * @namespace Util.Security
 */

import { log, warn, error } from './logger';

/** @private */
const _labels = [ 'Utils', 'Security' ];
const _log = (labels, ...message) => log({ labels, message });
const _warn = (labels, ...message) => warn({ labels, message });
const _error = (labels, ...message) => error({ labels, message });
