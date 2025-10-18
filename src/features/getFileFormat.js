const format = {
  png: "image",
  jpg: "image",
  jpeg: "image",
  gif: "image",
  svg: "image",
  mp3: "audio",
  wav: "audio",
  ogg: "audio",
  mp4: "video",
  webm: "video",
  mov: "video",
  avi: "video",
  m4a: "audio",
  flac: "audio",
};

export const getFileFormat = (url = "") => {

  const fileExt = url.split(".").pop()?.toLowerCase();

  return format[fileExt] || "file";
};
