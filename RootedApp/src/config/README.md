# Firebase Configuration Setup

## ✅ Configuration Complete!

Firebase has been successfully configured for the Rooted app! 🎉

**Project Details:**
- Project ID: `rooted-90e83`
- Project Name: Rooted
- Services Configured: Storage, Firestore, Authentication

## 📋 What's Been Set Up

- ✅ Firebase SDK installed and configured
- ✅ Firebase app initialized
- ✅ Storage service ready for video/image uploads
- ✅ Firestore database ready for data storage
- ✅ Authentication service ready for user management
- ✅ Upload utilities created for videos and thumbnails

## 🚨 Important: Configure Security Rules

Before using Firebase in your app, you **MUST** set up Security Rules:

👉 **See [FIREBASE_SETUP_GUIDE.md](./FIREBASE_SETUP_GUIDE.md) for detailed instructions**

### Quick Start:
1. Go to [Firebase Console](https://console.firebase.google.com) → rooted-90e83
2. Set up Storage Rules (required for video uploads)
3. Set up Firestore Rules (if using database)

## 📱 Using Firebase in Your App

### Import Services
```typescript
import { storage, db, auth } from './config/firebase';
```

### Upload Videos

#### Option A: Via Firebase Console (Easiest)
1. Go to Firebase Console → Storage
2. Create folders: `videos/` and `thumbnails/`
3. Upload your TikTok/Instagram/YouTube videos to `videos/`
4. Upload thumbnail images to `thumbnails/`
5. Click each file and copy its "Download URL"

#### Option B: Programmatically (For later)
Use the `uploadVideo` utility in `src/utils/uploadVideo.ts`:

```typescript
import { uploadVideo, uploadThumbnail } from './utils/uploadVideo';

// Upload a video
const videoUrl = await uploadVideo(
  'file://path/to/video.mp4',
  'video1.mp4',
  'videos',
  (progress) => {
    console.log(`Upload progress: ${progress.progress}%`);
  }
);

// Upload a thumbnail
const thumbUrl = await uploadThumbnail(
  'file://path/to/thumbnail.jpg',
  'video1-thumb.jpg',
  (progress) => {
    console.log(`Upload progress: ${progress.progress}%`);
  }
);
```

### 4. Update Your Video Data

After uploading and getting the URLs, update your video arrays in:
- `src/screens/VideoFeedScreen.tsx`
- `src/screens/ArtistReelsScreen.tsx`
- `src/screens/EventVideoFeedScreen.tsx`

Example:
```typescript
const videos = [
  {
    id: '1',
    title: 'Grace Young Adults',
    videoUrl: 'https://firebasestorage.googleapis.com/v0/b/.../videos%2Fvideo1.mp4?alt=media&token=...',
    thumbnail: 'https://firebasestorage.googleapis.com/v0/b/.../thumbnails%2Fvideo1-thumb.jpg?alt=media&token=...',
    // ... other fields
  }
];
```

## 🎥 Video Format Recommendations

- **Format**: MP4 (H.264 codec)
- **Resolution**: 1080x1920 (vertical/portrait)
- **File size**: Keep under 20-50MB for best performance
- **Compression**: Use HandBrake or FFmpeg to compress if needed

## 💰 Firebase Pricing (Free Tier)

- **Storage**: 5GB free
- **Download bandwidth**: 1GB/day free
- For testing with 10-20 videos at ~10MB each, you'll stay well within free tier

## 📚 Full Documentation

For complete setup instructions, code examples, and troubleshooting:

👉 **[Read the FIREBASE_SETUP_GUIDE.md](./FIREBASE_SETUP_GUIDE.md)**

This guide includes:
- ✅ Security Rules configuration
- ✅ Complete code examples for Storage, Firestore, and Auth
- ✅ Best practices and optimization tips
- ✅ Troubleshooting common issues
- ✅ Cost management strategies

## 🔧 Quick Troubleshooting

**Issue: Can't upload to Storage**
- Configure Storage Security Rules (see setup guide)

**Issue: Videos not loading**
- Check Firebase Storage rules allow public read access
- Verify URLs include the token parameter

**Issue: Permission denied**
- Review Security Rules configuration
- Check user authentication status

## 📚 External Resources

- [Firebase Storage Guide](https://firebase.google.com/docs/storage)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [expo-av Documentation](https://docs.expo.dev/versions/latest/sdk/av/)


