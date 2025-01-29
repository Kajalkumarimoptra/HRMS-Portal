import React, { useEffect, useRef, useState } from 'react';
import { TbCameraUp } from 'react-icons/tb';
import { useFormContext } from 'components/ContextProvider/Context';
import { Cropper } from 'react-cropper';
import "cropperjs/dist/cropper.min.css";

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

  // const handleImage = (e) => {
  //   const upLoadedFile = e.target.files[0];
  //   if (upLoadedFile) {
  //     const fileType = upLoadedFile.type;
  //     const validType = ['image/jpg', 'image/jpeg', 'image/png']; // file type validation
  //     if (!validType.includes(fileType)) {
  //       window.alert("File does not support. You must use .png or .jpg");
  //       setPhoto('') // to not set the image on wrong file type insertion
  //       return;
  //     }
  //     const size = upLoadedFile.size;
  //     if(size/1024 > 20 || size/1024 < 10){  // file size validation
  //       setImageSizeError("image size should be between 10kb-20kb");
  //       setPhoto('') // to not set the image on exceeding file size insertion
  //       return;
  //     }
  //     setLoading(true);
  //     const getUrl = URL.createObjectURL(upLoadedFile); // creates new object URL that represents the specified File object
  //     console.log("Temporary URL:", getUrl); // Debugging line to ensure temp URL is created
  //     setTimeout(() => {
  //       setPhoto(getUrl);
  //       setLoading(false);
  //       setValue('photo', upLoadedFile)
  //     }, 1000);
  //   }

  // }
  const handleImage = (e) => {
    setCroppedImage(null); // Reset the cropped image on new selection
    setUploadAllowed(false); // Prevent upload until cropping is done
    setIsCropping(true); // Set cropping mode
    handleFileForDocs(e, 'photo', setImageSizeError, setPhoto, setLoading, isCropping, setIsCropping, uploadAllowed, setImgDirection); // Use handleFileForDocs for passport photo
  };

  const cropImage = () => {
    const cropper = croppedRef.current.cropper;
    const croppedCanvas = cropper.getCroppedCanvas({
      width: 300, // Increase dimensions for better quality
      height: 300,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: "high",
    });

    // Convert the cropped canvas to a File
    croppedCanvas.toBlob((blob) => {
      const croppedFile = new File([blob], `cropped-photo-${Date.now()}.jpg`, { type: 'image/jpeg' });

      const fileSizeInKB = croppedFile.size / 1024; // size in KB
      if (fileSizeInKB >= 10 && fileSizeInKB <= 20) {
        setImageSizeError('');  // Clear the error if valid
        // Now pass the cropped file to form state, no upload yet

        setValue('photo', croppedFile);

        // Optionally update cropped image preview
        setCroppedImage(URL.createObjectURL(croppedFile));

        // Now trigger the upload function with the cropped file
        handleFileForDocs({ target: { files: [croppedFile] } }, 'photo', setImageSizeError, setPhoto, setLoading, isCropping, setIsCropping);
        setIsCropping(false); // Reset cropping state after cropping is done
        console.log('cropping is done:', isCropping);
        setImgDirection(false);
        setCroppedImage(null); // Reset the cropped image on new selection
        setUploadAllowed(true); // Prevent upload until cropping is done
        cropper.disable();  // Disable the cropper's interaction to hide the dotted border
        cropper.clear(); // Clear the selection area

        // Optionally hide cropper tools (like buttons and interactions)
      // This might help in preventing any other re-enabling of interactions
      setCroppedImage(URL.createObjectURL(croppedFile)); // Update preview
      } else {
        setImageSizeError("Image size should be between 10kb and 20kb");
      }
    });
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
