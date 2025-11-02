import React, { useRef, useState } from "react";

import { motion } from "motion/react";
import { v4 as uuid } from "uuid";
import { FaImage, FaMusic, FaVideo, FaFileUpload, FaTimes } from "react-icons/fa";

const UploadMenu = ({ ref, setSelectedFiles,selectedFiles, showMenu }) => {
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const fileInputRef = useRef(null);
  

  const handleUpload = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleFileChange = (event, type) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;
    const newFiles = files.map((file) => {
      return {
        id: uuid(),
        file,
        name: file.name,
        type
      };
    });

    setSelectedFiles((prev) => {
      const updated = [...prev, ...newFiles];
      
      return updated;
    });

    event.target.value = null;
   showMenu(false);
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
            type="button"
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
