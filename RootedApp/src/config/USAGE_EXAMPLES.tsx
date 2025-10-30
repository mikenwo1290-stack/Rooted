/**
 * Firebase Usage Examples for Rooted App
 * 
 * This file contains practical examples of how to use Firebase
 * in your React Native components. Copy and adapt these examples
 * to your actual screens.
 */

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useVideos, useVideosByCategory, useArtists } from '../utils/useFirebaseData';
import { 
  addVideo, 
  addArtist, 
  incrementVideoViews, 
  toggleVideoLike 
} from '../utils/firebaseHelpers';
import { uploadVideo, uploadThumbnail } from '../utils/uploadVideo';

// ============================================================================
// EXAMPLE 1: Fetch and Display Videos
// ============================================================================

export const VideoListExample = () => {
  const { videos, loading, error } = useVideos(20); // Fetch 20 videos

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading videos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id || ''}
      renderItem={({ item }) => (
        <View style={{ padding: 16, borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text>👁️ {item.views} views | ❤️ {item.likes} likes</Text>
        </View>
      )}
    />
  );
};

// ============================================================================
// EXAMPLE 2: Fetch Videos by Category
// ============================================================================

export const MusicVideosExample = () => {
  const { videos, loading } = useVideosByCategory('Music');

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, padding: 16 }}>Music Videos</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id || ''}
          renderItem={({ item }) => (
            <View style={{ padding: 16 }}>
              <Text>{item.title}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

// ============================================================================
// EXAMPLE 3: Upload Video to Firebase Storage
// ============================================================================

export const UploadVideoExample = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    try {
      setUploading(true);

      // 1. Upload the video file
      const videoUrl = await uploadVideo(
        'file://path/to/video.mp4', // Replace with actual file path
        'my-video.mp4',
        'videos',
        (progressData) => {
          setProgress(progressData.progress);
          console.log(`Upload: ${progressData.progress.toFixed(1)}%`);
        }
      );

      // 2. Upload the thumbnail
      const thumbnailUrl = await uploadThumbnail(
        'file://path/to/thumbnail.jpg', // Replace with actual file path
        'my-video-thumb.jpg'
      );

      // 3. Save video metadata to Firestore
      await addVideo({
        title: 'My Amazing Video',
        description: 'This is a description of my video',
        videoUrl: videoUrl,
        thumbnail: thumbnailUrl,
        category: 'Music',
        views: 0,
        likes: 0,
        createdAt: new Date(),
      });

      console.log('Video uploaded and saved successfully!');
      setUploading(false);
      setProgress(0);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploading(false);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TouchableOpacity
        onPress={handleUpload}
        disabled={uploading}
        style={{
          backgroundColor: uploading ? '#ccc' : '#007AFF',
          padding: 16,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {uploading ? `Uploading... ${progress.toFixed(0)}%` : 'Upload Video'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// ============================================================================
// EXAMPLE 4: Track Video Views and Likes
// ============================================================================

export const VideoPlayerExample = ({ videoId }: { videoId: string }) => {
  const [liked, setLiked] = useState(false);

  const handleVideoPlay = async () => {
    // Increment view count when video starts playing
    await incrementVideoViews(videoId);
  };

  const handleLikeToggle = async () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    await toggleVideoLike(videoId, newLikedState);
  };

  return (
    <View>
      {/* Your video player component here */}
      <Text>Video Player</Text>
      
      <TouchableOpacity onPress={handleLikeToggle}>
        <Text style={{ fontSize: 24 }}>
          {liked ? '❤️' : '🤍'} Like
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// ============================================================================
// EXAMPLE 5: Add New Artist
// ============================================================================

export const AddArtistExample = () => {
  const handleAddArtist = async () => {
    try {
      const artistId = await addArtist({
        name: 'John Doe',
        bio: 'Gospel musician and worship leader',
        profileImage: 'https://...', // URL from Firebase Storage
        category: 'Music',
        instagram: '@johndoe',
        twitter: '@johndoe',
        website: 'https://johndoe.com',
        followers: 0,
        createdAt: new Date(),
      });

      console.log('Artist added with ID:', artistId);
    } catch (error) {
      console.error('Failed to add artist:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleAddArtist}>
      <Text>Add Artist</Text>
    </TouchableOpacity>
  );
};

// ============================================================================
// EXAMPLE 6: Display Artists List
// ============================================================================

export const ArtistsListExample = () => {
  const { artists, loading, error } = useArtists('Music');

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <FlatList
      data={artists}
      keyExtractor={(item) => item.id || ''}
      renderItem={({ item }) => (
        <View style={{ padding: 16, flexDirection: 'row' }}>
          {/* Profile Image would go here */}
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text>{item.bio}</Text>
            <Text>👥 {item.followers} followers</Text>
          </View>
        </View>
      )}
    />
  );
};

// ============================================================================
// EXAMPLE 7: Real-time Video Feed (Auto-updates)
// ============================================================================

/**
 * This example uses real-time updates from Firebase.
 * When anyone adds/updates/deletes a video, this component
 * will automatically reflect those changes without needing to refresh.
 */

import { useVideosRealtime } from '../utils/useFirebaseData';

export const LiveVideoFeedExample = () => {
  const { videos, loading } = useVideosRealtime();

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Text style={{ padding: 16, fontSize: 20 }}>
        Live Feed ({videos.length} videos)
      </Text>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id || ''}
        renderItem={({ item }) => (
          <View style={{ padding: 16 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

// ============================================================================
// EXAMPLE 8: Complete Video Upload Flow
// ============================================================================

/**
 * This is a complete example showing how to pick a video from the device,
 * upload it to Firebase Storage, and save its metadata to Firestore.
 * 
 * NOTE: You'll need to add expo-image-picker or expo-document-picker
 * to actually pick files. This example shows the Firebase part.
 */

export const CompleteUploadFlowExample = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadCompleteVideo = async (
    videoUri: string,
    thumbnailUri: string,
    metadata: {
      title: string;
      description: string;
      category: string;
    }
  ) => {
    try {
      setUploading(true);

      // Generate unique filenames
      const timestamp = Date.now();
      const videoFileName = `video_${timestamp}.mp4`;
      const thumbFileName = `thumb_${timestamp}.jpg`;

      // Upload video
      console.log('Uploading video...');
      const videoUrl = await uploadVideo(
        videoUri,
        videoFileName,
        'videos',
        (p) => setProgress(p.progress)
      );

      // Upload thumbnail
      console.log('Uploading thumbnail...');
      const thumbnailUrl = await uploadThumbnail(
        thumbnailUri,
        thumbFileName
      );

      // Save to Firestore
      console.log('Saving to database...');
      const videoId = await addVideo({
        title: metadata.title,
        description: metadata.description,
        videoUrl: videoUrl,
        thumbnail: thumbnailUrl,
        category: metadata.category,
        views: 0,
        likes: 0,
        createdAt: new Date(),
      });

      console.log('Upload complete! Video ID:', videoId);
      setUploading(false);
      setProgress(0);
      
      return videoId;
    } catch (error) {
      console.error('Upload failed:', error);
      setUploading(false);
      throw error;
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Upload Progress: {progress.toFixed(0)}%</Text>
      {uploading && <ActivityIndicator />}
      
      {/* In a real app, you'd have a button to pick files and call uploadCompleteVideo */}
      <Text style={{ marginTop: 16, color: '#666' }}>
        Use uploadCompleteVideo() to upload videos with metadata
      </Text>
    </View>
  );
};

// ============================================================================
// NOTES ON INTEGRATING WITH YOUR SCREENS
// ============================================================================

/**
 * HOW TO USE THESE EXAMPLES IN YOUR ACTUAL SCREENS:
 * 
 * 1. For VideoFeedScreen.tsx:
 *    - Replace the hardcoded videos array with: useVideos() or useVideosRealtime()
 *    - Add view tracking when videos play: incrementVideoViews(videoId)
 *    - Add like functionality: toggleVideoLike(videoId, isLiked)
 * 
 * 2. For CreatorsScreen.tsx / ArtistProfileScreen.tsx:
 *    - Use: const { artists } = useArtists(category)
 *    - Display artists in your UI
 * 
 * 3. For DiscoverScreen.tsx:
 *    - Use: useVideosByCategory('category-name')
 *    - Filter and display videos by category
 * 
 * 4. For uploading content:
 *    - Use the uploadVideo and uploadThumbnail utilities
 *    - Save metadata with addVideo() or addArtist()
 * 
 * 5. Remember to handle loading states and errors in your UI!
 */

export default {
  VideoListExample,
  MusicVideosExample,
  UploadVideoExample,
  VideoPlayerExample,
  AddArtistExample,
  ArtistsListExample,
  LiveVideoFeedExample,
  CompleteUploadFlowExample,
};

