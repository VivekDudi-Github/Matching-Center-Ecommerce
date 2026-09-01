'use client';
import {getCloudinaryDeletionSignature} from '@/app/lib/services/Cloudinary'; 
import { deleteProductImages } from '../actions/newProduct.action';

export const uploadToCloudinary = async (file, signature, timestamp) => {
  try {
    const currentTimestamp = Math.round(new Date().getTime() / 1000);
    const fiftyMin = 60*55 ;
  
    const isValidTimestamp = timestamp+fiftyMin > currentTimestamp;
    if(!isValidTimestamp) throw new Error("Invalid signature timestamp");
    
    const formData = new FormData() ;
  
  
    formData.append("file", file);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp.toString());
    formData.append("folder" , "ecommerce");
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "");
    formData.append("upload_preset", "Matching Center Upload");

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ;
  
    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method : "POST", 
        body: formData
      }
    )
    const data = await cloudinaryResponse.json()
  
    if(!cloudinaryResponse.ok){
      throw Error(`Upload Failed for :${file.name}. Reason: ${data?.error?.message || 'unknown'}`);  
    }  

    return {url : data.secure_url, publicId : data.public_id};

  } catch (error) {
    throw new Error(error || "Something went wrong");
  }
  
};

export const deleteCloudinaryImage = async (publicId) => {
  try {
    const { signature, timestamp } = await getCloudinaryDeletionSignature(publicId);

    const currentTimestamp = Math.round(new Date().getTime() / 1000);
    const fiftyMin = 60*55 ;
    
    const isValidTimestamp = timestamp+fiftyMin > currentTimestamp;
    if(!isValidTimestamp) throw new Error("Invalid signature timestamp");
    
    const formData = new FormData() ;
    formData.append("public_id", publicId);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp.toString());
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "");
    
  
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
        method : "POST", 
        body: formData
      }
    ) 
    const data = await cloudinaryResponse.json();
    console.log("Cloudinary deletion response:",  publicId, data);
    await deleteProductImages(publicId);

    if(!cloudinaryResponse.ok){
      throw Error(`Delete Failed for :${publicId}. Reason: ${data?.error?.message || 'unknown'}`);  
    }  
    return true;

  } catch (error) {
    throw new Error(error || "Something went wrong");
  }
  
};