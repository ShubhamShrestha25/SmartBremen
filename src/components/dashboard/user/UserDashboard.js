"use client";

import { useState, useEffect } from "react";
import MarkerTable from "../MarkersTable";
import UserDetails from "./UserDetails";
import LogoutBtn from "@/components/LogoutBtn";
import useAuthStore from "@/store/useAuthStore";
import {
  getImagesByArtist,
  getCategories,
  getUserProfile,
} from "@/lib/firestore";

export default function UserDashboard() {
  const { userId } = useAuthStore();
  const [markersData, setMarkersData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user's markers from Firestore
  const fetchData = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const [images, cats, profile] = await Promise.all([
        getImagesByArtist(userId),
        getCategories(),
        getUserProfile(userId),
      ]);

      // Transform images to marker format
      const formattedMarkers = images.map((img) => {
        const category = cats.find((c) => c.id === img.categoryId);
        return {
          id: img.id,
          title: img.title || "Untitled",
          description: img.description || "",
          status:
            img.status?.charAt(0).toUpperCase() + img.status?.slice(1) ||
            "Pending",
          category: {
            informalityCategoryId: img.categoryId,
            name: category?.name || "Unknown",
            color: category?.color || "#4A4A4A",
          },
          author: {
            authorId: userId,
            firstName: profile?.name?.split(" ")[0] || "Unknown",
            lastName: profile?.name?.split(" ").slice(1).join(" ") || "",
          },
          location: {
            lat: img.lat,
            lng: img.lng,
            name: img.metadata?.locationName || "",
          },
          images: [
            {
              imageId: `${img.id}-main`,
              url: img.imageUrl,
              thumbnailUrl: img.thumbnailUrl,
            },
          ],
          createdAt: img.createdAt,
          _original: img,
        };
      });

      setMarkersData(formattedMarkers);
      setCategories(cats);
      setUserProfile(profile);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-5 items-center justify-between sm:flex-row">
        <UserDetails userProfile={userProfile} />
        <LogoutBtn />
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <MarkerTable
          markersData={markersData}
          categories={categories}
          onRefresh={handleRefresh}
          userProfile={userProfile}
        />
      )}
    </div>
  );
}
