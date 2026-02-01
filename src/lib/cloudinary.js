/**
 * Cloudinary Upload Service for Frontend
 * Uploads images directly from browser to Cloudinary using unsigned upload preset
 */

const CLOUDINARY_CLOUD_NAME = 'smartbremenenv';
const CLOUDINARY_UPLOAD_PRESET = 'smartbremen';

/**
 * Sanitize folder name for Cloudinary (remove spaces, special chars)
 */
function sanitizeFolderName(name) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Upload a file to Cloudinary
 * @param {File} file - The file to upload
 * @param {string} category - Category name for folder organization
 * @param {string} subcategory - Subcategory name for folder organization (optional)
 * @returns {Promise<{imageUrl: string, thumbnailUrl: string, markerUrl: string}>}
 */
export async function uploadToCloudinary(file, category = 'general', subcategory = null) {
  const sanitizedCategory = sanitizeFolderName(category);
  const folder = subcategory 
    ? `smartbremen/${sanitizedCategory}/${sanitizeFolderName(subcategory)}`
    : `smartbremen/${sanitizedCategory}`;
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', folder);

  // Determine resource type based on file type
  const isVideo = file.type.startsWith('video/');
  const resourceType = isVideo ? 'video' : 'image';

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
    {
      method: 'POST',
      body: formData
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Failed to upload to Cloudinary');
  }

  const result = await response.json();
  const publicId = result.public_id;
  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;

  if (isVideo) {
    return {
      imageUrl: result.secure_url,
      thumbnailUrl: `${baseUrl}/c_fill,w_400,h_300,g_auto,q_75,f_jpg/${publicId}.jpg`,
      markerUrl: `${baseUrl}/c_fill,w_150,h_150,g_auto,q_70,f_jpg/${publicId}.jpg`,
      mediaType: 'video'
    };
  }

  return {
    imageUrl: `${baseUrl}/c_limit,w_1920,h_1080,q_85,f_jpg/${publicId}`,
    thumbnailUrl: `${baseUrl}/c_fill,w_400,h_300,g_auto,q_75,f_jpg/${publicId}`,
    markerUrl: `${baseUrl}/c_fill,w_150,h_150,g_auto,q_70,f_jpg/${publicId}`,
    mediaType: 'image'
  };
}

/**
 * Delete image(s) from Cloudinary via API route
 * @param {string|string[]} imageUrls - Single URL or array of URLs to delete
 * @returns {Promise<{success: boolean, deleted: Array, errors?: Array}>}
 */
export async function deleteFromCloudinary(imageUrls) {
  const urls = Array.isArray(imageUrls) ? imageUrls : [imageUrls];
  
  // Filter out null/undefined URLs
  const validUrls = urls.filter(url => url && typeof url === 'string');
  
  if (validUrls.length === 0) {
    return { success: true, deleted: [], message: 'No valid URLs to delete' };
  }

  try {
    const response = await fetch('/api/cloudinary/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrls: validUrls }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete from Cloudinary');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
}
