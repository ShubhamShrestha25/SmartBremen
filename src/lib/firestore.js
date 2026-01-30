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
 * Delete an image
 */
export const deleteImage = async (imageId) => {
  try {
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
