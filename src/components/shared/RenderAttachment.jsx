import React from "react";
import { getFileFormat } from "../../features/getFileFormat";
import { transformImage } from "../../features/transformImg";
import { getFileIcon } from "../../features/getFileIcon";
import { IoMdDownload } from "react-icons/io";
function RenderAttachment({ ext, url = "" }) {
  let format;

  if (!ext) {
    ext = url.split(".").pop();
    format = getFileFormat(ext);
  } else {
    format = getFileFormat(ext);
  }

  switch (format) {
    case "video":
      return <video src={url} preload="none" controls width={"200px"} />;

    case "image":
      return (
        <div className="flex flex-col items-center gap-2">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img
              src={transformImage(url, 200)}
              className="object-contain size-48 cursor-pointer"
              alt="attachment"
            />
          </a>

          <a href={url} download className="text-blue-600 ml-auto text-medium">
            <IoMdDownload size={22} />
          </a>
        </div>
      );

    case "audio":
      return <audio src={url} preload="none" controls width="100px" />;

    default:
      return (
        <div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600  font-semibold"
          >
            {getFileIcon(ext)} View File
          </a>
        </div>
      );
  }
}

export default RenderAttachment;
