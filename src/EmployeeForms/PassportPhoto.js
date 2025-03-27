import React, { useEffect, useRef, useState } from 'react';
import { TbCameraUp } from 'react-icons/tb';
import { useFormContext } from 'components/ContextProvider/Context';
import { Cropper } from 'react-cropper';
import "cropperjs/dist/cropper.min.css";
import imageCompression from "browser-image-compression";

const PassportPhoto = ({ handleFileForDocs }) => {
  const {
    register, errors, setValue
  } = useFormContext();
  const getImage = useRef(null); // reference image
  const [photo, setPhoto] = useState(''); // state for holding image
  const [loading, setLoading] = useState(false); // state for holding loading gif
  const [imageSizeError, setImageSizeError] = useState(''); // error for wrong file size
  const [imgDirection, setImgDirection] = useState(true);
  const [croppedImage, setCroppedImage] = useState(null); // To hold the cropped image preview
  const croppedRef = useRef(null); // Reference to the cropper instance
  const [isCropping, setIsCropping] = useState(false); // Tracks cropping state
  const [uploadAllowed, setUploadAllowed] = useState(false); // Prevents upload before cropping

  const triggerImage = () => {
    getImage.current.click();
  }

  const handleImage = (e) => {
    console.log("Image selected:", e.target.files[0]);
    setCroppedImage(null); // Reset the cropped image on new selection
    setUploadAllowed(false); // Prevent upload until cropping is done
    setIsCropping(true); // Set cropping mode
    handleFileForDocs(e, 'photo', setImageSizeError, setPhoto, setLoading, isCropping, setIsCropping, uploadAllowed, setImgDirection); // Use handleFileForDocs for passport photo
  };

  const cropImage = async() => {
    const cropper = croppedRef.current.cropper;
    const croppedCanvas = cropper.getCroppedCanvas({
      width: 300, // Increase dimensions for better quality
      height: 300,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: "high",
    });

    // Convert the cropped canvas to a File
    croppedCanvas.toBlob(async(blob) => {
      if (!blob) {
        console.error("Failed to create cropped image blob");
        return;
      }
      const croppedFile = new File([blob], `cropped-photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
      console.log("Cropped file before compression:", croppedFile);

       // Compression options
    const options = {
      maxSizeMB: 0.02,  // 20 KB
      maxWidthOrHeight: 300,
      useWebWorker: true,
      initialQuality: 0.8, // Compression quality
    };
    try {
      const compressedFile = await imageCompression(croppedFile, options);
      console.log("Compressed file size:", compressedFile.size / 1024, "KB");

      const fileSizeInKB = compressedFile.size / 1024;
      if (fileSizeInKB >= 10 && fileSizeInKB <= 20) {
        setImageSizeError("");  // Clear the error if valid
        setValue("photo", compressedFile);

        // Update cropped image preview
        setCroppedImage(URL.createObjectURL(compressedFile));

        // Trigger the upload function with the compressed file
        handleFileForDocs(
          { target: { files: [compressedFile] } },
          "photo",
          setImageSizeError,
          setPhoto,
          setLoading,
          isCropping,
          setIsCropping
        );
        setIsCropping(false);  // Reset cropping state after cropping is done
        console.log("Cropping is done:", isCropping);
        setImgDirection(false);
        setUploadAllowed(true);  // Enable upload after successful cropping
        cropper.disable();  // Disable the cropper's interaction to hide the dotted border
        cropper.clear();  // Clear the selection area
      } else {
        setImageSizeError("Image size should be between 10kb and 20kb");
      }
    } catch (error) {
      console.error("Image compression error:", error);
      setImageSizeError("Image compression failed. Please try again.");
    }
  }
    );
  };

  useEffect(() => {
    register('photo', { required: true })
  }, [register]);

  useEffect(() => {
    console.log('Updated imageSizeError:', imageSizeError);
  }, [imageSizeError]); // This will run every time imageSizeError changes

  useEffect(() => {
    if (croppedImage) {
      setIsCropping(false); // Hide cropping area after image is cropped
      console.log('cropping area:', isCropping);
    }
  }, [croppedImage]);

  // useEffect(() => {
  //   if (photo && !isCropping) {
  //     setImgDirection(false); // Hide direction only after successful photo load
  //   }
  // }, [photo, isCropping]);

  useEffect(() => {
    if (croppedImage) {
      setImgDirection(false); // Hide instructions once an image is cropped
    }
  }, [croppedImage]);

  useEffect(() => {
    console.log('cropping status:', isCropping);
  },[isCropping]);

  useEffect(() => {
    // Show direction when there's no photo or cropping is active
    if (!photo || imageSizeError || isCropping) {
      setImgDirection(true);
      setUploadAllowed(false); // Disable upload if cropping is active or errors exist
    } else {
      setImgDirection(false);
    }
  }, [photo, imageSizeError, isCropping]);



  return (
    <div className="passport-photo-wrapper">
      <div className={`passport-photo-box ${errors.photo ? 'invalid' : ''}`}>
        <div className="photo-container" id='imgPreview'>
          <div className='container'>
            {imgDirection && !photo && (
              <div> Upload Your Recent Passport Photo</div>
            )}
            <div>
              {loading ? (
                <img src={require("assets/img/LoadingGif.gif")} alt="..." />
              )
                : croppedImage ? (
                  <img
                    src={croppedImage}
                    alt="Cropped Passport Photo"
                    onClick={triggerImage}
                  />
                )
                  : (
                    photo ? (
                      <Cropper
                        src={photo}
                        style={{ height: "229px", width: "228px" }}
                        initialAspectRatio={1}
                        guides={true}
                        ref={croppedRef}
                        viewMode={1}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={true}
                        onInitialized={() => setIsCropping(true)} // Set cropping state when cropper is active
                      />
                    ) : (
                      <TbCameraUp size={30} className='photoIcon' onClick={triggerImage} />
                    )
                  )}
              {imageSizeError ? <div className='imageSizeErrorMsg'>{imageSizeError}</div> : (
                !isCropping && (
                  <div className="imageSizeMsg">
                    image size should be between 10kb and 20kb
                  </div>)
              )}
            </div>
          </div>
          <input
            type="file" className={errors.photo ? 'invalid' : ''}
            id="file"
            style={{ opacity: 0 }}
            ref={getImage}
            onChange={handleImage}
          />
        </div>
      </div>
      {isCropping && !imageSizeError && (
        <div className="toolbar">
          <button type="button" className="crop-btn" onClick={cropImage}>
            Crop Photo
          </button>
        </div>
      )}
    </div>
  );
}

export default PassportPhoto;
