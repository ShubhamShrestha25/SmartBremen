/**
 * API Route: Create folder in Cloudinary
 * 
 * This endpoint creates a folder structure in Cloudinary.
 * Folders are automatically created when uploading, but this ensures they exist beforehand.
 */

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'smartbremenenv';
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

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
    const { category, subcategory } = body;

    if (!category) {
      return Response.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    const sanitizedCategory = sanitizeFolderName(category);
    
    // Build folder path
    let folderPath = `smartbremen/${sanitizedCategory}`;
    if (subcategory && subcategory.trim()) {
      const sanitizedSubcategory = sanitizeFolderName(subcategory);
      folderPath = `smartbremen/${sanitizedCategory}/${sanitizedSubcategory}`;
    }

    // Cloudinary Admin API - Create folder
    // Note: Cloudinary uses Basic Auth for Admin API
    const authString = Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString('base64');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/folders/${folderPath}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const result = await response.json();

    // Cloudinary returns success even if folder exists
    if (response.ok || result.success) {
      return Response.json({
        success: true,
        folderPath: folderPath,
        message: `Folder created: ${folderPath}`
      });
    }

    // Handle "folder already exists" as success
    if (result.error?.message?.includes('already exists')) {
      return Response.json({
        success: true,
        folderPath: folderPath,
        message: `Folder already exists: ${folderPath}`
      });
    }

    return Response.json(
      { error: result.error?.message || 'Failed to create folder' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error creating Cloudinary folder:', error);
    return Response.json(
      { error: error.message || 'Failed to create folder' },
      { status: 500 }
    );
  }
}

/**
 * GET - List subfolders of a folder
 */
export async function GET(request) {
  try {
    if (!CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      return Response.json(
        { error: 'Cloudinary API credentials not configured' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'smartbremen';

    const authString = Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString('base64');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/folders/${folder}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${authString}`
        }
      }
    );

    const result = await response.json();

    if (response.ok) {
      return Response.json({
        success: true,
        folders: result.folders || []
      });
    }

    return Response.json(
      { error: result.error?.message || 'Failed to list folders' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error listing Cloudinary folders:', error);
    return Response.json(
      { error: error.message || 'Failed to list folders' },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Delete a folder from Cloudinary
 * Note: Folder must be empty (no assets) to be deleted
 */
export async function DELETE(request) {
  try {
    if (!CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
      return Response.json(
        { error: 'Cloudinary API credentials not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { category, subcategory } = body;

    if (!category) {
      return Response.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    const sanitizedCategory = sanitizeFolderName(category);
    const authString = Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString('base64');
    
    const results = [];
    const errors = [];

    // If subcategory is specified, only delete that subfolder
    if (subcategory && subcategory.trim()) {
      const sanitizedSubcategory = sanitizeFolderName(subcategory);
      const folderPath = `smartbremen/${sanitizedCategory}/${sanitizedSubcategory}`;
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/folders/${folderPath}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Basic ${authString}`
          }
        }
      );

      const result = await response.json();
      
      if (response.ok || result.deleted) {
        results.push(folderPath);
      } else if (!result.error?.message?.includes('not found')) {
        errors.push({ folder: folderPath, error: result.error?.message });
      }
    } else {
      // Delete the entire category folder and all subfolders
      const categoryFolder = `smartbremen/${sanitizedCategory}`;
      
      // First, try to list and delete all subfolders
      try {
        const listResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/folders/${categoryFolder}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Basic ${authString}`
            }
          }
        );
        
        if (listResponse.ok) {
          const listResult = await listResponse.json();
          const subfolders = listResult.folders || [];
          
          // Delete each subfolder first
          for (const subfolder of subfolders) {
            const subfolderPath = subfolder.path;
            const deleteSubResponse = await fetch(
              `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/folders/${subfolderPath}`,
              {
                method: 'DELETE',
                headers: {
                  'Authorization': `Basic ${authString}`
                }
              }
            );
            
            if (deleteSubResponse.ok) {
              results.push(subfolderPath);
            } else {
              const subError = await deleteSubResponse.json();
              if (!subError.error?.message?.includes('not found')) {
                errors.push({ folder: subfolderPath, error: subError.error?.message });
              }
            }
          }
        }
      } catch (listError) {
        console.error('Error listing subfolders:', listError);
      }
      
      // Then delete the main category folder
      const deleteResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/folders/${categoryFolder}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Basic ${authString}`
          }
        }
      );
      
      const deleteResult = await deleteResponse.json();
      
      if (deleteResponse.ok || deleteResult.deleted) {
        results.push(categoryFolder);
      } else if (!deleteResult.error?.message?.includes('not found')) {
        errors.push({ folder: categoryFolder, error: deleteResult.error?.message });
      }
    }

    return Response.json({
      success: errors.length === 0,
      deleted: results,
      errors: errors.length > 0 ? errors : undefined,
      message: results.length > 0 
        ? `Deleted ${results.length} folder(s)` 
        : 'No folders deleted'
    });

  } catch (error) {
    console.error('Error deleting Cloudinary folder:', error);
    return Response.json(
      { error: error.message || 'Failed to delete folder' },
      { status: 500 }
    );
  }
}