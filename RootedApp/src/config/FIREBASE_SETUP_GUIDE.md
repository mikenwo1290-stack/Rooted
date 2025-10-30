# 🔥 Firebase Setup Guide - Rooted App

## ✅ Configuration Status

Your Firebase configuration is now **COMPLETE**! The `firebase.ts` file has been properly configured with:

- ✅ Firebase App initialized
- ✅ Storage service configured
- ✅ Firestore database configured
- ✅ Authentication service configured
- ✅ All services exported for use throughout the app

## 🔐 Required: Security Rules Setup

### 1. Firebase Storage Rules

You **MUST** configure Storage rules in the Firebase Console:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your **rooted-90e83** project
3. Navigate to **Storage** → **Rules** tab
4. Replace the default rules with:

```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Allow public read access to videos and thumbnails
    match /videos/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can upload
    }
    
    match /thumbnails/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // For user-specific content (future use)
    match /users/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

5. Click **Publish**

### 2. Firestore Database Rules

If you plan to store user data, events, or other content in Firestore:

1. Navigate to **Firestore Database** → **Rules** tab
2. Replace with:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Public read access for app content
    match /videos/{videoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /events/{eventId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /artists/{artistId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /creators/{creatorId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // User-specific data
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // User private data
    match /users/{userId}/private/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **Publish**

## 📱 Using Firebase in Your App

### Import Firebase Services

```typescript
// Import only what you need
import { storage, db, auth } from '../config/firebase';
```

### Storage Examples

#### Upload a Video
```typescript
import { uploadVideo } from '../utils/uploadVideo';

const handleUpload = async () => {
  try {
    const videoUrl = await uploadVideo(
      'file://path/to/video.mp4',
      'my-video.mp4',
      'videos',
      (progress) => {
        console.log(`Progress: ${progress.progress}%`);
      }
    );
    console.log('Video uploaded:', videoUrl);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

#### Upload a Thumbnail
```typescript
import { uploadThumbnail } from '../utils/uploadVideo';

const thumbUrl = await uploadThumbnail(
  'file://path/to/thumbnail.jpg',
  'my-video-thumb.jpg',
  (progress) => console.log(progress)
);
```

### Firestore Examples

#### Add a Video Document
```typescript
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const addVideo = async () => {
  try {
    const docRef = await addDoc(collection(db, 'videos'), {
      title: 'Grace Young Adults',
      videoUrl: 'https://...',
      thumbnail: 'https://...',
      category: 'Ministry',
      likes: 0,
      createdAt: new Date(),
    });
    console.log('Document written with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding document:', error);
  }
};
```

#### Read Videos Collection
```typescript
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

const fetchVideos = async () => {
  try {
    const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const videos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return videos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
};
```

#### Real-time Listener
```typescript
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useEffect, useState } from 'react';

const useVideos = () => {
  const [videos, setVideos] = useState([]);
  
  useEffect(() => {
    const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const videosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVideos(videosData);
    });
    
    return () => unsubscribe(); // Cleanup on unmount
  }, []);
  
  return videos;
};
```

### Authentication Examples

#### Anonymous Sign-In (for testing)
```typescript
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../config/firebase';

const signIn = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    console.log('Signed in:', userCredential.user.uid);
  } catch (error) {
    console.error('Sign-in error:', error);
  }
};
```

## 🎯 Next Steps

### 1. Set Up Storage Rules (Required)
Follow the instructions above to configure Storage rules in Firebase Console.

### 2. Create Storage Folders
In Firebase Console → Storage, create these folders:
- `videos/`
- `thumbnails/`

### 3. Upload Content
You can upload videos either:
- **Manually**: Via Firebase Console → Storage
- **Programmatically**: Using the `uploadVideo` utility

### 4. Test the Configuration
Run your app and verify Firebase is working:

```bash
npm start
```

### 5. Monitor Usage
Check Firebase Console → Usage to ensure you're within free tier limits:
- Storage: 5GB free
- Downloads: 1GB/day free
- Firestore: 50K reads/day free

## 🚨 Important Notes

### Security
- **Never commit** API keys to public repositories (your project is private, so it's okay for now)
- The API key in the config is designed to be public but is protected by Firebase Security Rules
- Always use proper Security Rules to protect your data

### Storage Best Practices
- Compress videos before uploading (keep under 20-50MB)
- Use proper file naming conventions (no spaces, use hyphens)
- Generate thumbnails for better UX

### Cost Management
- Stay within free tier by monitoring usage
- Consider upgrading to Blaze plan only when needed
- Optimize video sizes to reduce bandwidth costs

## 📚 Resources

- [Firebase Storage Documentation](https://firebase.google.com/docs/storage)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [expo-av Documentation](https://docs.expo.dev/versions/latest/sdk/av/)

## 🛠️ Troubleshooting

### Videos Not Loading
1. Check Storage rules are properly configured
2. Verify video URLs include the `?alt=media&token=...` parameter
3. Check Firebase Console → Storage → Files to confirm uploads

### Upload Errors
1. Ensure you're signed in (even anonymously)
2. Check Storage rules allow writes for authenticated users
3. Verify file size is within limits

### Permission Denied Errors
1. Review and update Security Rules
2. Check authentication status
3. Verify user has proper permissions

## ✅ Configuration Checklist

- [x] Firebase config file setup
- [x] Firebase app initialized
- [x] Storage service configured
- [x] Firestore service configured
- [x] Auth service configured
- [ ] Storage Security Rules configured in Firebase Console
- [ ] Firestore Security Rules configured (if using database)
- [ ] Storage folders created (videos/, thumbnails/)
- [ ] Test video uploaded
- [ ] App tested with Firebase connection

---

Your Firebase configuration is complete! Follow the Security Rules setup above to finish the implementation. 🚀

