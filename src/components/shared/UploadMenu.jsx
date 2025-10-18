import React, { useRef } from "react";
import { FaImage, FaMusic, FaVideo, FaFileUpload } from "react-icons/fa";
import { motion } from "motion/react";

const UploadMenu = ({ ref }) => {
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleUpload = (ref) => {
    if (ref.current) {
      ref.current.click(); // trigger file input
    }
  };

  const handleFileChange = (event, type) => {
    const file = event.target.files;
    if (file) {
      console.log(`Uploaded ${type}:`, file.name);
      // You can handle file upload logic here (send to backend, preview, etc.)
    }
  };

  const menuItems = [
    {
      icon: <FaImage className="text-xl" />,
      label: "Image",
      ref: imageInputRef,
      accept: "image/*",
      type: "image",
    },
    {
      icon: <FaMusic className="text-xl" />,
      label: "Audio",
      ref: audioInputRef,
      accept: "audio/*",
      type: "audio",
    },
    {
      icon: <FaVideo className="text-xl" />,
      label: "Video",
      ref: videoInputRef,
      accept: "video/*",
      type: "video",
    },
    {
      icon: <FaFileUpload className="text-xl" />,
      label: "File",
      ref: fileInputRef,
      accept: "*/*",
      type: "file",
    },
  ];

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        //  scale:0
      }}
      ref={ref}
      className="bg-white absolute -top-[120px] z-40 rounded-md shadow-lg w-44 py-2"
    >
      {menuItems.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => handleUpload(item.ref)}
            className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </button>
          {/* Hidden input for each type */}
          <input
          multiple
            type="file"
            accept={item.accept}
            ref={item.ref}
            className="hidden"
            onChange={(e) => handleFileChange(e, item.type)}
          />
        </div>
      ))}
    </motion.div>
  );
};

export default UploadMenu;
