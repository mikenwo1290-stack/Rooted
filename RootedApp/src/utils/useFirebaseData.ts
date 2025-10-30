/**
 * Custom React Hooks for Firebase Data
 * 
 * These hooks make it easy to fetch and subscribe to Firebase data
 * in your React components with automatic cleanup.
 */

import { useState, useEffect } from 'react';
import { 
  Video, 
  Artist, 
  Event,
  fetchVideos, 
  fetchVideosByCategory,
  fetchArtists,
  fetchUpcomingEvents,
  subscribeToVideos 
} from './firebaseHelpers';

// ============================================================================
// VIDEO HOOKS
// ============================================================================

/**
 * Hook to fetch videos (one-time fetch)
 * 
 * @example
 * ```tsx
 * const VideoList = () => {
 *   const { videos, loading, error } = useVideos();
 *   
 *   if (loading) return <Text>Loading...</Text>;
 *   if (error) return <Text>Error: {error}</Text>;
 *   
 *   return (
 *     <FlatList
 *       data={videos}
 *       renderItem={({ item }) => <VideoCard video={item} />}
 *     />
 *   );
 * };
 * ```
 */
export const useVideos = (limitCount?: number) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const data = await fetchVideos(limitCount);
        setVideos(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [limitCount]);

  return { videos, loading, error, refetch: () => {} };
};

/**
 * Hook to fetch videos by category
 * 
 * @example
 * ```tsx
 * const MusicVideos = () => {
 *   const { videos, loading } = useVideosByCategory('Music');
 *   // ...
 * };
 * ```
 */
export const useVideosByCategory = (category: string) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const data = await fetchVideosByCategory(category);
        setVideos(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [category]);

  return { videos, loading, error };
};

/**
 * Hook to subscribe to videos with real-time updates
 * 
 * @example
 * ```tsx
 * const LiveVideoFeed = () => {
 *   const { videos, loading } = useVideosRealtime();
 *   
 *   // Videos will automatically update when data changes in Firebase
 *   return <VideoFeed videos={videos} />;
 * };
 * ```
 */
export const useVideosRealtime = (categoryFilter?: string) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToVideos(
      (data) => {
        setVideos(data);
        setLoading(false);
        setError(null);
      },
      categoryFilter
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [categoryFilter]);

  return { videos, loading, error };
};

// ============================================================================
// ARTIST HOOKS
// ============================================================================

/**
 * Hook to fetch artists
 * 
 * @example
 * ```tsx
 * const ArtistsList = ({ category }) => {
 *   const { artists, loading } = useArtists(category);
 *   
 *   return (
 *     <FlatList
 *       data={artists}
 *       renderItem={({ item }) => <ArtistCard artist={item} />}
 *     />
 *   );
 * };
 * ```
 */
export const useArtists = (category?: string) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        setLoading(true);
        const data = await fetchArtists(category);
        setArtists(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch artists');
      } finally {
        setLoading(false);
      }
    };

    loadArtists();
  }, [category]);

  return { artists, loading, error };
};

// ============================================================================
// EVENT HOOKS
// ============================================================================

/**
 * Hook to fetch upcoming events
 * 
 * @example
 * ```tsx
 * const EventsList = () => {
 *   const { events, loading, error } = useUpcomingEvents();
 *   
 *   if (loading) return <ActivityIndicator />;
 *   
 *   return (
 *     <FlatList
 *       data={events}
 *       renderItem={({ item }) => <EventCard event={item} />}
 *     />
 *   );
 * };
 * ```
 */
export const useUpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await fetchUpcomingEvents();
        setEvents(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return { events, loading, error };
};

// ============================================================================
// GENERIC HOOKS
// ============================================================================

/**
 * Generic hook for fetching data from Firestore
 * 
 * @example
 * ```tsx
 * const CustomDataComponent = () => {
 *   const { data, loading } = useFirestoreData(
 *     'customCollection',
 *     async () => {
 *       // Your custom fetch logic
 *       return await someFirestoreQuery();
 *     }
 *   );
 * };
 * ```
 */
export const useFirestoreData = <T,>(
  key: string,
  fetchFunction: () => Promise<T>
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchFunction();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [key]);

  const refetch = async () => {
    try {
      setLoading(true);
      const result = await fetchFunction();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

