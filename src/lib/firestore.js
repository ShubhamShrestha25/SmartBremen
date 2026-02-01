import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  updateDoc,
  deleteDoc,
  addDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// Collection names - must match SmartBremenBackend
export const COLLECTIONS = {
  USERS: "users",
  IMAGES: "images",
  CATEGORIES: "categories",
};

/**
 * Get user profile by UID
 */
export const getUserProfile = async (uid) => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        ...data,
        uid: userSnap.id,
        createdAt: data.createdAt?.toDate() || new Date(),
      };
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
};

/**
 * Get all categories
 */
export const getCategories = async () => {
  try {
    const snapshot = await getDocs(collection(db, COLLECTIONS.CATEGORIES));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting categories:", error);
    return [];
  }
};

/**
 * Get approved images for the public map
 */
export const getApprovedImages = async () => {
  try {
    const q = query(
      collection(db, COLLECTIONS.IMAGES),
      where("status", "==", "approved"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        approvedAt: data.approvedAt?.toDate(),
      };
    });
  } catch (error) {
    console.error("Error getting approved images:", error);
    return [];
  }
};

/**
 * Get images by artist ID
 */
export const getImagesByArtist = async (artistId) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.IMAGES),
      where("artistId", "==", artistId)
    );
    const snapshot = await getDocs(q);

    const results = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        approvedAt: data.approvedAt?.toDate(),
      };
    });

    // Sort by createdAt descending
    return results.sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error("Error getting images by artist:", error);
    return [];
  }
};

/**
 * Get all images (for admin dashboard)
 */
export const getAllImages = async () => {
  try {
    const q = query(
      collection(db, COLLECTIONS.IMAGES),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        approvedAt: data.approvedAt?.toDate(),
      };
    });
  } catch (error) {
    console.error("Error getting all images:", error);
    return [];
  }
};

/**
 * Get all users (for admin dashboard)
 */
export const getAllUsers = async () => {
  try {
    const q = query(
      collection(db, COLLECTIONS.USERS),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        uid: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      };
    });
  } catch (error) {
    console.error("Error getting all users:", error);
    return [];
  }
};

// ============================================
// WRITE OPERATIONS (for admin/artist actions)
// ============================================

/**
 * Update an image
 */
export const updateImageSubmission = async (imageId, data) => {
  try {
    const imageRef = doc(db, COLLECTIONS.IMAGES, imageId);

    // Optional: prevent accidental writes of undefined
    const cleaned = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined)
    );

    await updateDoc(imageRef, {
      ...cleaned,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error updating image submission:", error);
    return false;
  }
};
/**
 * Update image status (approve/reject)
 */
export const updateImageStatus = async (imageId, status, approvedBy = null) => {
  try {
    const imageRef = doc(db, COLLECTIONS.IMAGES, imageId);
    const updateData = {
      status,
      ...(status === "approved" && {
        approvedAt: serverTimestamp(),
        approvedBy,
      }),
    };
    await updateDoc(imageRef, updateData);
    return true;
  } catch (error) {
    console.error("Error updating image status:", error);
    return false;
  }
};

/**
 * Delete an image from Firestore and optionally from Cloudinary
 * @param {string} imageId - The Firestore document ID
 * @param {boolean} deleteFromCloud - Whether to also delete from Cloudinary (default: true)
 */
export const deleteImage = async (imageId, deleteFromCloud = true) => {
  try {
    // Get the image data first to extract Cloudinary URLs
    if (deleteFromCloud) {
      const imageDoc = await getDoc(doc(db, COLLECTIONS.IMAGES, imageId));
      
      if (imageDoc.exists()) {
        const imageData = imageDoc.data();
        const urlsToDelete = [];
        
        // Collect all Cloudinary URLs (single or multiple images)
        if (imageData.imageUrl) {
          urlsToDelete.push(imageData.imageUrl);
        }
        if (imageData.thumbnailUrl) {
          urlsToDelete.push(imageData.thumbnailUrl);
        }
        if (imageData.markerUrl) {
          urlsToDelete.push(imageData.markerUrl);
        }
        
        // Handle multiple images (imageUrls array)
        if (Array.isArray(imageData.imageUrls)) {
          urlsToDelete.push(...imageData.imageUrls);
        }
        if (Array.isArray(imageData.thumbnailUrls)) {
          urlsToDelete.push(...imageData.thumbnailUrls);
        }
        if (Array.isArray(imageData.markerUrls)) {
          urlsToDelete.push(...imageData.markerUrls);
        }
        
        // Filter to only Cloudinary URLs
        const cloudinaryUrls = urlsToDelete.filter(url => 
          url && url.includes('cloudinary.com')
        );
        
        if (cloudinaryUrls.length > 0) {
          try {
            const { deleteFromCloudinary } = await import('./cloudinary.js');
            const result = await deleteFromCloudinary(cloudinaryUrls);
            console.log('Cloudinary deletion result:', result);
          } catch (cloudError) {
            console.error('Error deleting from Cloudinary:', cloudError);
            // Continue with Firestore deletion even if Cloudinary fails
          }
        }
      }
    }
    
    // Delete from Firestore
    await deleteDoc(doc(db, COLLECTIONS.IMAGES, imageId));
    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
};

/**
 * Update user profile (for admin to enable/disable upload)
 */
export const updateUserProfile = async (uid, data) => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, uid);
    await updateDoc(userRef, data);
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return false;
  }
};

/**
 * Create a new image submission (for artists)
 */
export const createImageSubmission = async (imageData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.IMAGES), {
      ...imageData,
      status: "pending",
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating image submission:", error);
    return null;
  }
};

/**
 * Get single image by ID
 */
export const getImageById = async (imageId) => {
  try {
    const docRef = doc(db, COLLECTIONS.IMAGES, imageId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        approvedAt: data.approvedAt?.toDate(),
      };
    }
    return null;
  } catch (error) {
    console.error("Error getting image:", error);
    return null;
  }
};

// ============================================
// HELPER: Transform Firestore data to match frontend format
// ============================================

/**
 * Transform backend image data to frontend marker format
 * This bridges the gap between backend ImageSubmission and frontend fakeData structure
 */
export const transformImageToMarker = (image, categories = [], users = []) => {
  const category = categories.find((c) => c.id === image.categoryId);
  const author = users.find((u) => u.uid === image.artistId);

  // Get author name: prefer metadata.authorName, then user profile name
  const authorName = image.metadata?.authorName || author?.name || "Unknown";
  const [authorFirstName, ...authorLastNameParts] = authorName.split(" ");

  return {
    id: image.id,
    title: image.title || "Untitled",
    description: image.description || "",
    status: image.status?.charAt(0).toUpperCase() + image.status?.slice(1) || "Pending",
    category: {
      informalityCategoryId: image.categoryId,
      name: category?.name || "Unknown",
      color: category?.color || "#4A4A4A",
    },
    author: {
      authorId: image.artistId,
      firstName: authorFirstName || "Unknown",
      lastName: authorLastNameParts.join(" ") || "",
      email: author?.email || "",
    },
    location: {
      lat: image.lat,
      lng: image.lng,
      name: image.metadata?.locationName || "",
    },
    images: [
      {
        imageId: `${image.id}-main`,
        url: image.imageUrl,
        thumbnailUrl: image.thumbnailUrl,
        markerUrl: image.markerUrl,
      },
    ],
    createdAt: image.createdAt,
    approvedAt: image.approvedAt,
    // Keep original fields for reference
    _original: image,
  };
};

/**
 * Get all markers formatted for frontend display
 */
export const getFormattedMarkers = async (statusFilter = null) => {
  try {
    const [images, categories, users] = await Promise.all([
      statusFilter ? getImagesByStatus(statusFilter) : getAllImages(),
      getCategories(),
      getAllUsers(),
    ]);

    return images.map((img) => transformImageToMarker(img, categories, users));
  } catch (error) {
    console.error("Error getting formatted markers:", error);
    return [];
  }
};

/**
 * Get images by status
 */
const getImagesByStatus = async (status) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.IMAGES),
      where("status", "==", status),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        approvedAt: data.approvedAt?.toDate(),
      };
    });
  } catch (error) {
    console.error("Error getting images by status:", error);
    return [];
  }
};

/**
 * Sanitize category name to create a valid document ID
 */
const sanitizeCategoryId = (name) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Create a new category with optional subcategories
 * Also creates corresponding Cloudinary folders
 * @param {Object} categoryData - { name, color, iconUrl, description, subcategories }
 * @returns {Promise<string|null>} - Category ID (category name) or null on error
 */
export const createCategory = async (categoryData) => {
  try {
    const { name, color, iconUrl, description, subcategories = [] } = categoryData;
    
    // Use sanitized category name as document ID
    const categoryId = sanitizeCategoryId(name);
    
    // Check if category already exists
    const existingDoc = await getDoc(doc(db, COLLECTIONS.CATEGORIES, categoryId));
    if (existingDoc.exists()) {
      throw new Error(`Category "${name}" already exists`);
    }
    
    // Create category document with name as ID
    const categoryRef = doc(db, COLLECTIONS.CATEGORIES, categoryId);
    await setDoc(categoryRef, {
      name: name.trim(),
      color: color || '#3498db',
      iconUrl: iconUrl || '',
      description: description || '',
      subcategories: subcategories.map(sub => ({
        id: sanitizeCategoryId(sub.name), // Generate ID from subcategory name
        name: sub.name.trim(),
        description: sub.description || ''
      })),
      createdAt: serverTimestamp(),
    });
    
    // Create Cloudinary folders
    try {
      // Create main category folder
      await fetch('/api/cloudinary/folder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: name })
      });
      
      // Create subcategory folders
      for (const sub of subcategories) {
        if (sub.name.trim()) {
          await fetch('/api/cloudinary/folder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category: name, subcategory: sub.name })
          });
        }
      }
    } catch (folderError) {
      console.error('Error creating Cloudinary folders:', folderError);
      // Continue even if folder creation fails
    }
    
    return categoryId;
  } catch (error) {
    console.error("Error creating category:", error);
    return null;
  }
};

/**
 * Update a category
 * @param {string} categoryId - Category document ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<boolean>}
 */
export const updateCategory = async (categoryId, updateData) => {
  try {
    const categoryRef = doc(db, COLLECTIONS.CATEGORIES, categoryId);
    
    // Get current category data to check for new subcategories
    const categorySnap = await getDoc(categoryRef);
    const currentData = categorySnap.data();
    
    // Ensure subcategories have IDs
    const processedData = { ...updateData };
    if (processedData.subcategories) {
      processedData.subcategories = processedData.subcategories.map(sub => ({
        id: sub.id || sanitizeCategoryId(sub.name), // Use existing ID or generate new one
        name: sub.name.trim(),
        description: sub.description || ''
      }));
    }
    
    await updateDoc(categoryRef, {
      ...processedData,
      updatedAt: serverTimestamp(),
    });
    
    // Create folders for any new subcategories
    if (processedData.subcategories && currentData) {
      const currentSubNames = (currentData.subcategories || []).map(s => s.name);
      const newSubs = processedData.subcategories.filter(s => !currentSubNames.includes(s.name));
      
      for (const sub of newSubs) {
        if (sub.name.trim()) {
          try {
            await fetch('/api/cloudinary/folder', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                category: processedData.name || currentData.name, 
                subcategory: sub.name 
              })
            });
          } catch (e) {
            console.error('Error creating subcategory folder:', e);
          }
        }
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error updating category:", error);
    return false;
  }
};

/**
 * Delete a category and its Cloudinary folder
 * @param {string} categoryId - Category document ID
 * @returns {Promise<boolean>}
 */
export const deleteCategory = async (categoryId) => {
  try {
    // Get category data to know the name for folder deletion
    const categoryRef = doc(db, COLLECTIONS.CATEGORIES, categoryId);
    const categorySnap = await getDoc(categoryRef);
    
    let categoryName = categoryId; // Fallback to ID if name not found
    if (categorySnap.exists()) {
      categoryName = categorySnap.data().name || categoryId;
    }
    
    // Delete Cloudinary folder (including all subfolders)
    try {
      await fetch('/api/cloudinary/folder', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: categoryName })
      });
    } catch (folderError) {
      console.error('Error deleting Cloudinary folder:', folderError);
      // Continue with Firestore deletion even if folder deletion fails
    }
    
    // Delete from Firestore
    await deleteDoc(categoryRef);
    return true;
  } catch (error) {
    console.error("Error deleting category:", error);
    return false;
  }
};

/**
 * Add a subcategory to an existing category
 * @param {string} categoryId - Category document ID
 * @param {Object} subcategory - { name, description }
 * @returns {Promise<boolean>}
 */
export const addSubcategory = async (categoryId, subcategory) => {
  try {
    const categoryRef = doc(db, COLLECTIONS.CATEGORIES, categoryId);
    const categorySnap = await getDoc(categoryRef);
    
    if (!categorySnap.exists()) {
      throw new Error('Category not found');
    }
    
    const categoryData = categorySnap.data();
    const currentSubs = categoryData.subcategories || [];
    
    // Check if subcategory already exists
    if (currentSubs.some(s => s.name.toLowerCase() === subcategory.name.toLowerCase())) {
      throw new Error('Subcategory already exists');
    }
    
    // Add new subcategory with generated ID
    await updateDoc(categoryRef, {
      subcategories: [...currentSubs, {
        id: sanitizeCategoryId(subcategory.name), // Generate ID from name
        name: subcategory.name.trim(),
        description: subcategory.description || ''
      }],
      updatedAt: serverTimestamp(),
    });
    
    // Create Cloudinary folder
    try {
      await fetch('/api/cloudinary/folder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          category: categoryData.name, 
          subcategory: subcategory.name 
        })
      });
    } catch (folderError) {
      console.error('Error creating subcategory folder:', folderError);
    }
    
    return true;
  } catch (error) {
    console.error("Error adding subcategory:", error);
    return false;
  }
};

/**
 * Remove a subcategory from a category
 * @param {string} categoryId - Category document ID
 * @param {string} subcategoryName - Name of subcategory to remove
 * @returns {Promise<boolean>}
 */
export const removeSubcategory = async (categoryId, subcategoryName) => {
  try {
    const categoryRef = doc(db, COLLECTIONS.CATEGORIES, categoryId);
    const categorySnap = await getDoc(categoryRef);
    
    if (!categorySnap.exists()) {
      throw new Error('Category not found');
    }
    
    const categoryData = categorySnap.data();
    const updatedSubs = (categoryData.subcategories || [])
      .filter(s => s.name.toLowerCase() !== subcategoryName.toLowerCase());
    
    await updateDoc(categoryRef, {
      subcategories: updatedSubs,
      updatedAt: serverTimestamp(),
    });
    
    return true;
  } catch (error) {
    console.error("Error removing subcategory:", error);
    return false;
  }
};
