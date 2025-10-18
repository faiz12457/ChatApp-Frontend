import React from "react";
import { getFileFormat } from "../../features/getFileFormat";
import { transformImage } from "../../features/transformImg";

function RenderAttachment({ file, url = "" }) {
  const format = getFileFormat();
  switch (format) {
    case "video":
      return <video src={url} preload="none" controls width={"200px"} />;

    case "image":
      return (
        <img
          src={transformImage(url, 200)}
          width={"200px"}
          height={"200px"}
          className="object-contain"
        />
      );

    case "audio":
      return <audio src={url} preload="none" controls />;

    default:
      return <div></div>;
  }
}

export default RenderAttachment;
