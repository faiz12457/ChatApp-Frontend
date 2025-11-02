import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFileAudio,
  FaFileVideo,
  FaFileAlt,
  FaFileArchive,
  FaFile,
} from "react-icons/fa";

export const fileIcons = {
  pdf: <FaFilePdf className="text-red-600 text-2xl" />,
  doc: <FaFileWord className="text-blue-600 text-2xl" />,
  docx: <FaFileWord className="text-blue-600 text-2xl" />,
  xls: <FaFileExcel className="text-green-600 text-2xl" />,
  xlsx: <FaFileExcel className="text-green-600 text-2xl" />,
  png: <FaFileImage className="text-yellow-500 text-2xl" />,
  jpg: <FaFileImage className="text-yellow-500 text-2xl" />,
  jpeg: <FaFileImage className="text-yellow-500 text-2xl" />,
  gif: <FaFileImage className="text-yellow-500 text-2xl" />,
  mp3: <FaFileAudio className="text-purple-600 text-2xl" />,
  wav: <FaFileAudio className="text-purple-600 text-2xl" />,
  mp4: <FaFileVideo className="text-indigo-600 text-2xl" />,
  mkv: <FaFileVideo className="text-indigo-600 text-2xl" />,
  mov: <FaFileVideo className="text-indigo-600 text-2xl" />,
  zip: <FaFileArchive className="text-orange-600 text-2xl" />,
  rar: <FaFileArchive className="text-orange-600 text-2xl" />,
  "7z": <FaFileArchive className="text-orange-600 text-2xl" />,
  txt: <FaFileAlt className="text-gray-600 text-2xl" />,
};

export const getFileIcon = (ext) => {
 

  return fileIcons[ext] || <FaFile className="text-gray-400 text-2xl" />;
};
