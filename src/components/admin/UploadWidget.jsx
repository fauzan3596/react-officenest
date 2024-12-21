import React, { useEffect, useRef, useState } from "react";

const UploadWidget = ({setImageUrl, imageId = "No file chosen"}) => {
  const [imageName, setImageName] = useState(imageId);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dlnqwafkc",
        uploadPreset: "preset1",
      },
      function (error, result) {
        if (result.event === "success") {
          setImageName(result.info.display_name + "." + result.info.format);
          setImageUrl(result.info.public_id);
        }
      }
    );
  }, [setImageUrl]);

  return (
    <div className="w-full sm:w-4/5">
      <button
        type="button"
        className="file-input file-input-bordered w-full text-left text-gray-400 flex items-center"
        onClick={() => widgetRef.current.open()}
      >
        <div className="bg-black h-full min-w-28 flex items-center rounded-md font-medium text-white">
          <p className="mx-auto">Choose File</p>
        </div>
        <p className="ps-3 line-clamp-1">{imageName}</p>
      </button>
    </div>
  );
};

export default UploadWidget;
