'use server';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getCloudinarySignature() {
  const timestamp = Math.round(new Date().getTime() / 1000);try {
    
    console.log("signature generated");
    const paramsToSign = {
      timestamp: timestamp,
      folder: 'ecommerce', 
      upload_preset: "Matching Center Upload"
    };
  
    // Generate the cryptographic hash
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );
    console.log("SIGNATURE:", signature);
    console.log("TIMESTAMP:", timestamp);
    
    return { signature, timestamp };
  } catch (error) {
    console.error("Error generating Cloudinary signature:", error);
    throw new Error("Error generating Cloudinary signature");
  }
}

export const getCloudinaryDeletionSignature = async (public_id) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const paramsToSign = {
      timestamp: timestamp,
      public_id: public_id,
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    )
    console.log("DELETION SIGNATURE:", signature);
    console.log("DELETION TIMESTAMP:", timestamp);
    return { signature, timestamp };

  } catch (error) {
    console.error("Error generating Cloudinary signature:", error);
    throw new Error("Error generating Cloudinary signature");
  }
}