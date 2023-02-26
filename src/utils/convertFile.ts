


export const convertFileToBase64 = (file: any) =>
new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(file.rawFile);
});

