import { storage } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

export default async function UploadImage(file,state) {
  let imageRef = "";
  if(state)
  {
     imageRef = ref(storage, `Profile/${file.name}`);
  }else{
     imageRef = ref(storage, `PostsImage/${file.name}`); 
  }

  try {
    await uploadBytes(imageRef, file);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
