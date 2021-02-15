'use strict';
/**
 * Image manipulation functions
 * For custom image sizing, refer to https://sharp.pixelplumbing.com/api-resize
 */
const sharp = require('sharp');

const { bytesToKbytes } = require("strapi-plugin-upload/utils/file");

const getMetadatas = buffer =>
  sharp(buffer)
    .metadata()
    .catch(() => ({})); // ignore errors

const getDimensions = buffer =>
  getMetadatas(buffer)
    .then(({ width = null, height = null }) => ({ width, height }))
    .catch(() => ({})); // ignore errors

const THUMBNAIL_RESIZE_OPTIONS = {
  width: 245,
  height: 156,
  fit: 'inside',
};

const resizeTo = (buffer, options) =>
  sharp(buffer)
    .resize(options)
    .toBuffer()
    .catch(() => null);

//STF Custom code-->
const resizeToNonResp = (buffer, options) =>
  sharp(buffer)
    .resize(options.width, options.height)
    .extract({ left: 0, top: 0, width: options.width, height: options.height })
    .toBuffer()
    .catch(() => null);
//<---STF Custom code

const generateThumbnail = async file => {
  if (!(await canBeProccessed(file.buffer))) {
    return null;
  }

  const { width, height } = await getDimensions(file.buffer);

  if (width > THUMBNAIL_RESIZE_OPTIONS.width || height > THUMBNAIL_RESIZE_OPTIONS.height) {
    const newBuff = await resizeTo(file.buffer, THUMBNAIL_RESIZE_OPTIONS);

    if (newBuff) {
      const { width, height, size } = await getMetadatas(newBuff);

      return {
        name: `thumbnail_${file.name}`,
        hash: `thumbnail_${file.hash}`,
        ext: file.ext,
        mime: file.mime,
        width,
        height,
        size: bytesToKbytes(size),
        buffer: newBuff,
        path: file.path ? file.path : null,
      };
    }
  }

  return null;
};

const optimize = async buffer => {
  const {
    sizeOptimization = false,
    autoOrientation = false,
  } = await strapi.plugins.upload.services.upload.getSettings();

  if (!sizeOptimization || !(await canBeProccessed(buffer))) {
    return { buffer };
  }

  const sharpInstance = autoOrientation ? sharp(buffer).rotate() : sharp(buffer);
  return sharpInstance
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => ({
      buffer: data,
      info: {
        width: info.width,
        height: info.height,
        size: bytesToKbytes(info.size),
      },
    }))
    .catch(() => ({ buffer }));
};

//STF Custom code-->
const BREAKPOINTS = {
  //Default Strapi sizes
  // large: 1000,
  // medium: 750,
  // small: 500,

  //custom sizes
  split_section: [1380, 738], // 2.5 actual container size 552 x 295 for better resolution
  post_loop: [907, 615],  // 2.5 actual container size 362.7 x 245.9 or better resolution
  testimonial_loop: [670, 670],  // 2.5 actual container size 268 x 268 or better resolution

  // post_single: [2500, 2500],
};
//<---STF Custom code

const generateResponsiveFormats = async file => {
  const {
    responsiveDimensions = false,
  } = await strapi.plugins.upload.services.upload.getSettings();

  if (!responsiveDimensions) return [];

  if (!(await canBeProccessed(file.buffer))) {
    return [];
  }

  const originalDimensions = await getDimensions(file.buffer);

  return Promise.all(
    Object.keys(BREAKPOINTS).map(key => {
      const breakpoint = BREAKPOINTS[key];
      //STF Custom code-->
      if( Array.isArray(breakpoint) ) {

        const breakpoint_width = breakpoint[0];
        const breakpoint_height = breakpoint[1];

        if (breakpointSmallerThan(breakpoint[0], originalDimensions)) {
          return generateBreakpointFull(key, { file, breakpoint_width, breakpoint_height, originalDimensions });
        }
      //<---STF Custom code
      } else {

        if (breakpointSmallerThan(breakpoint, originalDimensions)) {
          return generateBreakpoint(key, { file, breakpoint, originalDimensions });
        }
      }
    })
  );
};

const generateBreakpoint = async (key, { file, breakpoint }) => {
  const newBuff = await resizeTo(file.buffer, {
      width: breakpoint,
      height: breakpoint,
      fit: 'inside',
    });

  if (newBuff) {
    const { width, height, size } = await getMetadatas(newBuff);

    return {
      key,
      file: {
        name: `${key}_${file.name}`,
        hash: `${key}_${file.hash}`,
        ext: file.ext,
        mime: file.mime,
        width,
        height,
        size: bytesToKbytes(size),
        buffer: newBuff,
        path: file.path ? file.path : null,
      },
    };
  }
};

//STF Custom code--->
const generateBreakpointFull = async (key, { file, breakpoint_width, breakpoint_height }) => {
  const newBuff = await resizeTo(file.buffer, {
      width: breakpoint_width,
      height: breakpoint_height,
      fit: 'cover',
    });

  if (newBuff) {
    const { width, height, size } = await getMetadatas(newBuff);

    return {
      key,
      file: {
        name: `${key}_${file.name}`,
        hash: `${key}_${file.hash}`,
        ext: file.ext,
        mime: file.mime,
        width,
        height,
        size: bytesToKbytes(size),
        buffer: newBuff,
        path: file.path ? file.path : null,
      },
    };
  }
};
//<---STF Custom code

const breakpointSmallerThan = (breakpoint, { width, height }) => {
  return breakpoint < width || breakpoint < height;
};

const formatsToProccess = ['jpeg', 'png', 'webp', 'tiff'];
const canBeProccessed = async buffer => {
  const { format } = await getMetadatas(buffer);
  return format && formatsToProccess.includes(format);
};

module.exports = {
  getDimensions,
  generateResponsiveFormats,
  generateThumbnail,
  bytesToKbytes,
  optimize,
};
