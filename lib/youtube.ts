export const getYoutubeEmbedUrl = (url: string) => {
  if (!url) return "";

  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&?/]+)/;
  const match = url.match(regExp);

  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
};

export const getGoogleDriveEmbedUrl = (url: string) => {
  const patterns = [/\/d\/([a-zA-Z0-9_-]+)/, /id=([a-zA-Z0-9_-]+)/];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
  }

  return "";
};
