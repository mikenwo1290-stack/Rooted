import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

interface UploadProgress {
  progress: number;
  bytesTransferred: number;
  totalBytes: number;
}

/**
 * Upload a video file to Firebase Storage
 * @param uri - Local URI of the video file
 * @param fileName - Name to save the file as (e.g., 'video1.mp4')
 * @param folder - Folder in storage to upload to (default: 'videos')
 * @param onProgress - Callback for upload progress updates
 * @returns Promise with the download URL of the uploaded video
 */
export const uploadVideo = async (
  uri: string,
  fileName: string,
  folder: string = 'videos',
  onProgress?: (progress: UploadProgress) => void
): Promise<string> => {
  try {
    // Fetch the video file as a blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // Create a storage reference
    const storageRef = ref(storage, `${folder}/${fileName}`);

    // Upload file with progress tracking
    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress updates
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) {
            onProgress({
              progress,
              bytesTransferred: snapshot.bytesTransferred,
              totalBytes: snapshot.totalBytes,
            });
          }
          console.log(`Upload is ${progress.toFixed(2)}% done`);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error('Upload error:', error);
          reject(error);
        },
        async () => {
          // Handle successful uploads
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

/**
 * Upload a thumbnail image to Firebase Storage
 * @param uri - Local URI of the image file
 * @param fileName - Name to save the file as (e.g., 'video1-thumb.jpg')
 * @param onProgress - Callback for upload progress updates
 * @returns Promise with the download URL of the uploaded thumbnail
 */
export const uploadThumbnail = async (
  uri: string,
  fileName: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<string> => {
  return uploadVideo(uri, fileName, 'thumbnails', onProgress);
};


