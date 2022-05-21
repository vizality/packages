/* eslint-disable no-unused-vars */
/**
 * Contains functions relating to files.
 * @module File
 * @memberof Util
 * @namespace Util.File
 */

import { lookup as _getMimeType } from 'mime-types';

import { log, warn, error } from './logger';

/**
 * @private
 */
const _labels = [ 'Utils', 'File' ];
const _log = (labels, ...message) => log({ labels, message });
const _warn = (labels, ...message) => warn({ labels, message });
const _error = (labels, ...message) => error({ labels, message });

export const getCaller = path => {
  try {

  } catch (err) {
    _error(_labels.concat('getCaller'), err);
  }
};

// export const getMimeType = async input => {
//   try {
//     let type = null;
//     type = _getMimeType(input);

//     if (!type) {
//       type = await get(input).then(res => res.blob().then(blob => blob.type));
//     }

//     if (!type) {
//       if (typeof input !== 'string') {
//         return type;
//       }
//       const mimeType = input.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
//       if (mimeType && mimeType.length) [ , type ] = mimeType;
//     }

//     return type;
//   } catch (err) {
//     _error(_labels.concat('getMimeType'), err);
//   }
// };

/**
 * Gets the dimensions of an image or video. Works for URLs (http/blob/data/protocol).
 */
// export const getMediaDimensions = async (url, mimeType) => {
//   mimeType = mimeType || await getMimeType(url);
//   // Check if it's an image
//   if (mimeType.split('/')[0] === 'image') {
//     // If it's a file, we'll use the image-size package
//     if (existsSync(url) && lstatSync(url).isFile()) {
//       return new Promise(resolved => {
//         _getImageSize(url).then(dimensions => resolved({ width: dimensions.width, height: dimensions.height }));
//       });
//     }
//     return new Promise(resolved => {
//       const img = new Image();
//       img.onload = () => resolved({ width: img.naturalWidth, height: img.naturalHeight });
//       img.src = url;
//     });
//   // Check if it's a video
//   } else if (mimeType.split('/')[0] === 'video') {
//     return new Promise(resolve => {
//       const video = document.createElement('video');
//       video.src = url;
//       video.addEventListener('loadedmetadata', () =>
//         resolve({
//           width: video.videoWidth,
//           height: video.videoHeight
//         })
//       );
//     });
//   }
// };

// export const convertUrlToFile = (url, fileName) => {
//   return get(url)
//     .then(res => res.arrayBuffer())
//     .then(async buffer => new File([ buffer ], fileName, { type: await getMimeType(url) }));
// };

// export const getObjectURL = async (path, allowedExtensions = [ '.png', '.jpg', '.jpeg', '.webp', '.gif' ]) => {
//   if (isString(allowedExtensions) && allowedExtensions !== 'all') {
//     allowedExtensions = [ allowedExtensions ];
//   }

//   const urlObjects = [];

//   const isDir = existsSync(path) && lstatSync(path).isDirectory();
//   const isFile = existsSync(path) && lstatSync(path).isFile();

//   const getURL = async file => {
//     const buffer = readFileSync(file);
//     const ext = extname(file).slice(1);
//     const type = await getMimeType(ext);
//     const blob = new Blob([ buffer ], { type });
//     const url = URL.createObjectURL(blob);
//     const { name } = parse(file);
//     /**
//      * If it's an image, let's include the width and height
//      * as properties to make it easier on the developer.
//      */
//     let width, height;
//     if ([ 'png', 'jpg', 'jpeg', 'webp', 'gif' ].includes(ext)) {
//       const dimensions = await getMediaDimensions(url, type);
//       ({ width, height } = dimensions);
//     }

//     if (width && height) {
//       return urlObjects.push({
//         name,
//         url,
//         path: file,
//         width,
//         height,
//         type
//       });
//     }

//     return urlObjects.push({
//       name,
//       url,
//       path: file,
//       type
//     });
//   };

//   if (isDir) {
//     const files = readdirSync(path)
//       .filter(file => lstatSync(join(path, file)).isFile() && (allowedExtensions.indexOf(extname(file)) !== -1 || allowedExtensions === 'all'));

//     for (const file of files) {
//       await getURL(join(path, file));
//     }
//   } else {
//     if (isFile) {
//       await getURL(path);
//     }
//   }

//   return urlObjects;
// };
