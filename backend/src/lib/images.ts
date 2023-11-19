import { MISSING_PHOTO_PLACEHOLDER_URL } from "donut-shared/src/constants.js";

export interface IUploadImageResponse {
  url: string;
}

export async function uploadImage(
  base64: string
): Promise<IUploadImageResponse> {
  if (!base64) {
    return {
      url: MISSING_PHOTO_PLACEHOLDER_URL,
    };
  }

  let body = new FormData();
  body.set("key", process.env.IMGBB_API_KEY || "");
  body.append("image", base64);

  const res = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: body,
  });

  const responseObj = await res.json();
  if (!res.ok) {
    throw new Error(`Image upload error: ${JSON.stringify(responseObj)}`);
  }

  const url = responseObj.data.image.url;
  if (!url) {
    throw new Error(
      `Image was uploaded, but url was not obtained from ${JSON.stringify(
        responseObj
      )}`
    );
  }

  return {
    url,
  };
}
