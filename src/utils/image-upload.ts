import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARU_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARU_API_KEY,
  api_secret: import.meta.env.CLOUDINARU_API_SECRET // Click 'View API Keys' above to copy your API secret
});

export class ImageUpload {
  static async uploadImage(file: File) {

    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');
    const imageType = file.type.split('/')[1];
    const resp = await cloudinary.uploader.upload(
      `data:image/${imageType};base64,${base64Image}`,
    )

    console.log(resp)

    return 'http://missing-image.com/abc.jpeg';

  }
}
