/**
 * Firebase Helper Functions
 * 
 * Collection of reusable functions for common Firebase operations
 * in the Rooted app.
 */

import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc,
  query, 
  orderBy, 
  where,
  limit,
  updateDoc,
  deleteDoc,
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ============================================================================
// VIDEO OPERATIONS
// ============================================================================

export interface Video {
  id?: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  category: string;
  artistId?: string;
  artistName?: string;
  duration?: number;
  views: number;
  likes: number;
  createdAt: Date | Timestamp;
}

/**
 * Add a new video to Firestore
 */
export const addVideo = async (videoData: Omit<Video, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'videos'), {
      ...videoData,
      createdAt: Timestamp.now(),
      views: 0,
      likes: 0,
    });
    console.log('Video added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding video:', error);
    throw error;
  }
};

/**
 * Fetch all videos
 */
export const fetchVideos = async (limitCount?: number): Promise<Video[]> => {
  try {
    const q = limitCount 
      ? query(collection(db, 'videos'), orderBy('createdAt', 'desc'), limit(limitCount))
      : query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Video[];
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
};

/**
 * Fetch videos by category
 */
export const fetchVideosByCategory = async (category: string): Promise<Video[]> => {
  try {
    const q = query(
      collection(db, 'videos'),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Video[];
  } catch (error) {
    console.error('Error fetching videos by category:', error);
    return [];
  }
};

/**
 * Subscribe to videos collection (real-time updates)
 */
export const subscribeToVideos = (
  callback: (videos: Video[]) => void,
  categoryFilter?: string
): (() => void) => {
  const q = categoryFilter
    ? query(
        collection(db, 'videos'),
        where('category', '==', categoryFilter),
        orderBy('createdAt', 'desc')
      )
    : query(collection(db, 'videos'), orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const videos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Video[];
    callback(videos);
  });

  return unsubscribe;
};

/**
 * Update video views count
 */
export const incrementVideoViews = async (videoId: string): Promise<void> => {
  try {
    const videoRef = doc(db, 'videos', videoId);
    const videoSnap = await getDoc(videoRef);
    
    if (videoSnap.exists()) {
      const currentViews = videoSnap.data().views || 0;
      await updateDoc(videoRef, {
        views: currentViews + 1,
      });
    }
  } catch (error) {
    console.error('Error incrementing views:', error);
  }
};

/**
 * Update video likes count
 */
export const toggleVideoLike = async (
  videoId: string, 
  isLiked: boolean
): Promise<void> => {
  try {
    const videoRef = doc(db, 'videos', videoId);
    const videoSnap = await getDoc(videoRef);
    
    if (videoSnap.exists()) {
      const currentLikes = videoSnap.data().likes || 0;
      await updateDoc(videoRef, {
        likes: isLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1),
      });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
  }
};

// ============================================================================
// ARTIST OPERATIONS
// ============================================================================

export interface Artist {
  id?: string;
  name: string;
  bio: string;
  profileImage: string;
  category: string;
  instagram?: string;
  twitter?: string;
  website?: string;
  followers: number;
  createdAt: Date | Timestamp;
}

/**
 * Add a new artist
 */
export const addArtist = async (artistData: Omit<Artist, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'artists'), {
      ...artistData,
      createdAt: Timestamp.now(),
      followers: 0,
    });
    console.log('Artist added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding artist:', error);
    throw error;
  }
};

/**
 * Fetch all artists
 */
export const fetchArtists = async (category?: string): Promise<Artist[]> => {
  try {
    const q = category
      ? query(
          collection(db, 'artists'),
          where('category', '==', category),
          orderBy('followers', 'desc')
        )
      : query(collection(db, 'artists'), orderBy('followers', 'desc'));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Artist[];
  } catch (error) {
    console.error('Error fetching artists:', error);
    return [];
  }
};

/**
 * Get artist by ID
 */
export const getArtist = async (artistId: string): Promise<Artist | null> => {
  try {
    const docRef = doc(db, 'artists', artistId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Artist;
    }
    return null;
  } catch (error) {
    console.error('Error getting artist:', error);
    return null;
  }
};

// ============================================================================
// EVENT OPERATIONS
// ============================================================================

export interface Event {
  id?: string;
  title: string;
  description: string;
  date: Date | Timestamp;
  location: string;
  imageUrl: string;
  category: string;
  attendees: number;
  createdAt: Date | Timestamp;
}

/**
 * Add a new event
 */
export const addEvent = async (eventData: Omit<Event, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'events'), {
      ...eventData,
      createdAt: Timestamp.now(),
      attendees: 0,
    });
    console.log('Event added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

/**
 * Fetch upcoming events
 */
export const fetchUpcomingEvents = async (): Promise<Event[]> => {
  try {
    const now = Timestamp.now();
    const q = query(
      collection(db, 'events'),
      where('date', '>=', now),
      orderBy('date', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Event[];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

// ============================================================================
// GENERIC OPERATIONS
// ============================================================================

/**
 * Delete a document from any collection
 */
export const deleteDocument = async (
  collectionName: string, 
  documentId: string
): Promise<void> => {
  try {
    await deleteDoc(doc(db, collectionName, documentId));
    console.log(`Document ${documentId} deleted from ${collectionName}`);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

/**
 * Update a document in any collection
 */
export const updateDocument = async (
  collectionName: string,
  documentId: string,
  data: any
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, data);
    console.log(`Document ${documentId} updated in ${collectionName}`);
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

