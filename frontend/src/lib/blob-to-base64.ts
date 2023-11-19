export function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      let result = reader.result as string;
      const idx = result.indexOf("base64,");
      result = result.slice(idx + 7);
      resolve(result);
    };
    reader.onerror = () => {
      reject(`Failed to convert blob to base64.`);
    };
    reader.readAsDataURL(blob);
  });
}
