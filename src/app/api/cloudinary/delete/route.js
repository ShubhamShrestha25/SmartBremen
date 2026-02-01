/**
 * API Route: Delete image from Cloudinary
 * 
 * This endpoint deletes an image from Cloudinary using signed API credentials.
 * Only accessible server-side to protect API secret.
 */

import crypto from 'crypto';

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'smartbremenenv';
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

/**
 * Extract public_id from Cloudinary URL
 * URL format: https://res.cloudinary.com/cloud_name/image/upload/v123/folder/public_id.ext
 */
function extractPublicId(cloudinaryUrl) {
  if (!cloudinaryUrl) return null;
  
  try {
    // Handle URLs with transformations
    // e.g., https://res.cloudinary.com/smartbremenenv/image/upload/c_limit,w_1920,h_1080,q_85,f_jpg/smartbremen/category/filename
    const url = new URL(cloudinaryUrl);
    const pathParts = url.pathname.split('/');
    
    // Find index of 'upload' and get everything after transformations
    const uploadIndex = pathParts.indexOf('upload');
    if (uploadIndex === -1) return null;
    
    // Skip version number if present (starts with 'v' followed by digits)
    let startIndex = uploadIndex + 1;
    
    // Skip transformation parameters (contain commas or specific patterns)
    while (startIndex < pathParts.length) {
      const part = pathParts[startIndex];
      if (part.includes(',') || part.match(/^[a-z]_/)) {
        startIndex++;
      } else if (part.match(/^v\d+$/)) {
        startIndex++;
      } else {
        break;
      }
    }
    
    // Join remaining parts as public_id (without extension)
    const publicIdWithExt = pathParts.slice(startIndex).join('/');
    
    // Remove file extension
    const publicId = publicIdWithExt.replace(/\.[^/.]+$/, '');
    
    return publicId;
  } catch (error) {
    console.error('Error extracting public_id:', error);
    return null;
  }
}

/**
 * Generate Cloudinary signature for API authentication
 */
function generateSignature(publicId, timestamp) {
  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
  return crypto.createHash('sha1').update(stringToSign).digest('hex');
}

export async function POST(request) {
  try {
    // Check for API credentials
    if (!CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      console.error('Cloudinary API credentials not configured');
      return Response.json(
        { error: 'Cloudinary API credentials not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { imageUrl, imageUrls } = body;

    // Support single URL or array of URLs
    const urlsToDelete = imageUrls || (imageUrl ? [imageUrl] : []);
    
    if (urlsToDelete.length === 0) {
      return Response.json(
        { error: 'No image URL(s) provided' },
        { status: 400 }
      );
    }

    const results = [];
    const errors = [];

    for (const url of urlsToDelete) {
      const publicId = extractPublicId(url);
      
      if (!publicId) {
        errors.push({ url, error: 'Could not extract public_id from URL' });
        continue;
      }

      const timestamp = Math.floor(Date.now() / 1000);
      const signature = generateSignature(publicId, timestamp);

      // Determine resource type from URL
      const resourceType = url.includes('/video/') ? 'video' : 'image';

      const formData = new URLSearchParams();
      formData.append('public_id', publicId);
      formData.append('signature', signature);
      formData.append('api_key', CLOUDINARY_API_KEY);
      formData.append('timestamp', timestamp.toString());

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/destroy`,
        {
          method: 'POST',
          body: formData
        }
      );

      const result = await response.json();

      if (result.result === 'ok' || result.result === 'not found') {
        results.push({ url, publicId, status: 'deleted' });
      } else {
        errors.push({ url, publicId, error: result.error?.message || 'Unknown error' });
      }
    }

    return Response.json({
      success: errors.length === 0,
      deleted: results,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return Response.json(
      { error: error.message || 'Failed to delete from Cloudinary' },
      { status: 500 }
    );
  }
}
