import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

// configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        // check if the file path is present or not
        if(!localFilePath) return null
        
        // if path of the file is present then upload on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"  // automatically detect the type of the file (img, video, pdf, etc)
        })
        console.log("File uploaded on cloudinary", response.url)
        return response 
    } catch (error) {
        // cloudinary par upload krne se pehle humne uss file ko server per temporarily store kiya tha, ab file upload toh fail ho gaya lekin file abhi bhi server par toh hai, toh pehele usey server se bhi hatao
        console.log("Error while uploading the file", error)
        fs.unlinkSync(localFilePath)
        return null
    }
}

export { uploadOnCloudinary }