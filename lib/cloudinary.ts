/**
 * Cloudinary Configuration and Asset URL Helpers
 * 
 * Provides automatic Cloudinary CDN delivery with format/quality optimization
 * (f_auto, q_auto) and graceful fallback to local /public assets when
 * NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not configured.
 */

import { pages as contentPages, pageList as contentPageList } from '@/content/content';

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  quality?: string | number; // e.g. 'auto', 80, 90
  format?: string; // e.g. 'auto', 'webp', 'avif'
  crop?: string; // e.g. 'fill', 'scale', 'limit'
}

export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'daybrhbsc';
export const CLOUDINARY_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || 'prisma3/pages';

export { contentPages as pages, contentPageList as pageList };

/**
 * Generates an optimized Cloudinary delivery URL for a magazine page.
 * Uses direct URLs from `content/content.js`, or constructs Cloudinary CDN URL,
 * or falls back to local `/prisma_content_page-XXXX.jpg`.
 *
 * @param pageNumber 1-based page number
 * @param options Transformation parameters (e.g. f_auto, q_auto)
 */
export function getCloudinaryPageUrl(
  pageNumber: number,
  options: CloudinaryTransformOptions = {}
): string {
  // If contentPageList is available, use direct 1-based page lookup (index = pageNumber - 1)
  if (contentPageList && contentPageList[pageNumber - 1]) {
    const directUrl = contentPageList[pageNumber - 1];
    if (Object.keys(options).length === 0) {
      return directUrl;
    }
    if (directUrl.includes('/image/upload/')) {
      const transforms = buildTransformationString(options);
      if (transforms) {
        return directUrl.replace('/image/upload/', `/image/upload/${transforms}/`);
      }
      return directUrl;
    }
    return directUrl;
  }

  const pageKey = pageNumber === 1 ? 'cover' : `Page${pageNumber - 1}`;
  const directUrl = (contentPages as Record<string, string>)[pageKey];

  if (directUrl && Object.keys(options).length === 0) {
    return directUrl;
  }

  if (directUrl && directUrl.includes('/image/upload/')) {
    const transforms = buildTransformationString(options);
    if (transforms) {
      return directUrl.replace('/image/upload/', `/image/upload/${transforms}/`);
    }
    return directUrl;
  }

  const padNum = String(pageNumber).padStart(4, '0');
  const fileName = `prisma_content_page-${padNum}`;
  const localFallback = `/${fileName}.jpg`;

  if (!CLOUDINARY_CLOUD_NAME) {
    return localFallback;
  }

  const transforms = buildTransformationString({
    format: 'auto',
    quality: 'auto',
    ...options,
  });

  const folder = CLOUDINARY_FOLDER ? `${CLOUDINARY_FOLDER.replace(/^\/+|\/+$/g, '')}/` : '';
  const transformPath = transforms ? `${transforms}/` : '';

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformPath}${folder}${fileName}.jpg`;
}

/**
 * Returns an array of image URLs for all magazine pages.
 * Prioritizes links configured in `content/content.js`.
 *
 * @param totalPages Total page count (defaults to total pages configured in content.js)
 */
export function getMagazinePageUrls(totalPages?: number): string[] {
  const count = typeof totalPages === 'number' ? totalPages : (contentPageList?.length || 63);
  if (contentPageList && contentPageList.length >= count) {
    return contentPageList.slice(0, count);
  }
  if (contentPageList && contentPageList.length > 0 && totalPages === undefined) {
    return [...contentPageList];
  }
  return Array.from({ length: count }, (_, index) => getCloudinaryPageUrl(index + 1));
}

/**
 * Builds standard Cloudinary URL transformation string.
 */
function buildTransformationString(options: CloudinaryTransformOptions): string {
  const parts: string[] = [];

  if (options.format) {
    parts.push(`f_${options.format}`);
  }
  if (options.quality) {
    parts.push(`q_${options.quality}`);
  }
  if (options.width) {
    parts.push(`w_${options.width}`);
  }
  if (options.height) {
    parts.push(`h_${options.height}`);
  }
  if (options.crop) {
    parts.push(`c_${options.crop}`);
  }

  return parts.join(',');
}
