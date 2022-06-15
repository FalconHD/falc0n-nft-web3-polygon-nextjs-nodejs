import { getApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const upload = async (file: any) => {
  const firebaseApp = getApp();
  const storage = getStorage(firebaseApp);
  const imagesRef = ref(storage, `/${file.originalname}`);
  await uploadBytes(imagesRef, file.buffer);
  let url = await getDownloadURL(imagesRef);

  return url;
};

export const multiUpload = async (files: any) => {
  if (files && files.length > 0) {
    let urls = await Promise.all(
      files.map(async (file: any) => {
        return await upload(file);
      })
    );
    return urls.map((url) => {
      return { src: url };
    });
  }
};

export const deleteImage = async (url: string) => {
  const storage = getStorage();

  if (url) {
    const desertRef = ref(storage, url);
    if (desertRef) {
      deleteObject(desertRef)
        .then(() => {
          console.log("File deleted successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  } else {
    console.log("File not found");
  }
};
