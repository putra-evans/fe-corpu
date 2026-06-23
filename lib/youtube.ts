const getYoutubeEmbedUrl = (url: string) => {
  if (!url) return "";

  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&?/]+)/;
  const match = url.match(regExp);

  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
};

export default getYoutubeEmbedUrl;
