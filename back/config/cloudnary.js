import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
});
export const uploadcloyd = async (localpath, res) => {
    localpath=localpath
    try {
        console.log(fs.existsSync(localpath));
        if (!localpath) return null;
        const resp = await cloudinary.uploader.upload(localpath, {
            resource_type: "auto"
        });
        console.log(resp.url);
        return res.status(200).json({ url: resp.url });
    } catch (err) {
        fs.unlinkSync(localpath); 
        console.log(err);
    }
}