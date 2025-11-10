# How to Get Firebase Storage URL for YourWaysBetter.mp4

## Quick Steps:

1. **Open Firebase Console**
   - Go to: https://console.firebase.google.com
   - Select your project: `rooted-90e83`

2. **Navigate to Storage**
   - Click on "Storage" in the left sidebar
   - Click on "Files" tab

3. **Find Your Video**
   - Look for `YourWaysBetter.mp4` in the file list
   - If you don't see it, you need to upload it first:
     - Click "Upload file" button
     - Select `YourWaysBetter.mp4` from your computer
     - Wait for upload to complete

4. **Get the Download URL**
   - Click on the `YourWaysBetter.mp4` file
   - In the right panel, you'll see "Download URL"
   - Click the copy icon next to it
   - The URL will look like:
     ```
     https://firebasestorage.googleapis.com/v0/b/rooted-90e83.firebasestorage.app/o/YourWaysBetter.mp4?alt=media&token=abc123-def456-ghi789
     ```

5. **Update the Code**
   - Open: `RootedApp/src/screens/MusicReelsScreen.tsx`
   - Find line 38 (the first reel's videoUrl)
   - Replace `YOUR_TOKEN_HERE` with the actual token from your copied URL
   - Or replace the entire URL with the one you copied

## Example:

**Before:**
```typescript
videoUrl: 'https://firebasestorage.googleapis.com/v0/b/rooted-90e83.firebasestorage.app/o/YourWaysBetter.mp4?alt=media&token=YOUR_TOKEN_HERE',
```

**After (with your actual token):**
```typescript
videoUrl: 'https://firebasestorage.googleapis.com/v0/b/rooted-90e83.firebasestorage.app/o/YourWaysBetter.mp4?alt=media&token=a1b2c3d4-e5f6-7890-abcd-ef1234567890',
```

## Alternative: Upload via Code

If you prefer to upload programmatically, you can use this code:

```typescript
import { uploadVideo } from './src/utils/uploadVideo';

const videoUrl = await uploadVideo(
  'file:///path/to/YourWaysBetter.mp4',
  'YourWaysBetter.mp4',
  'videos'
);

console.log('Video URL:', videoUrl);
// Copy this URL and paste it into MusicReelsScreen.tsx
```

## Need Help?

If you're having trouble:
1. Make sure you're logged into Firebase Console
2. Verify you have the right project selected (rooted-90e83)
3. Check that Storage is enabled for your project
4. Ensure your security rules allow read access

## Security Rules

Your Storage rules should include:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /videos/{allPaths=**} {
      allow read: if true;  // Public read access
      allow write: if request.auth != null;
    }
  }
}
```

