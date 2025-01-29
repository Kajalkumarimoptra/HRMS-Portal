import React, { useEffect, useRef, useState } from 'react';
import { TbCameraUp } from 'react-icons/tb';
import { useFormContext } from 'components/ContextProvider/Context';

export default function AttachSign() {
    const {
        register, setValue, errors
      } = useFormContext();
      
    const getSign = useRef(null); // reference sign
    const [sign, setSign] = useState(''); // state for holding sign
    const [loading, setLoading] = useState(false); // state for holding loading gif
    const [signSizeError, setSignSizeError] = useState(''); // error for wrong file size

    const triggerSign = () => {
        getSign.current.click();
        setSignSizeError('');
    }
    const handleSign = (e) => {
        const signUpload = e.target.files[0]
        if (signUpload) {
            const fileType = signUpload.type;
            const validType = ['image/jpg', 'image/jpeg', 'image/png']; // file type validation
            if (!validType.includes(fileType)) {
                window.alert("File does not support. You must use .png or .jpg");
                setSign('') // to not set the sign image on wrong file type insertion
                return;
            }
            const size = signUpload.size;
            if (size / 1024 > 20 || size/1024 < 10) {  // file size validation
                setSignSizeError("image should be between 10kb-20kb");
                setSign('') // to not set the sign image on exceeding file size insertion
                return;
            }
            setLoading(true)
            const getSignUrl = URL.createObjectURL(signUpload) // creates new object URL that represents the specified File object

            setTimeout(() => {
                setSign(getSignUrl);
                setLoading(false);
                setValue('signatureAttach', signUpload);
            }, 1000);
        }
    }
    useEffect(() => {
        register('signatureAttach', { required: true });
    }, [register])
    console.log("invalid:", errors.signatureAttach);

    return (

        <div className={`attachPhotoBox ${errors.signatureAttach ? 'invalid' : ''}`}>
            <div className="photo-container">
                <div className='container'>
                    Attach Your Signature
                    <div>
                        {loading ? ( <img src={require("assets/img/LoadingGif.gif")} alt="..." />) :
                            sign ? (<img src={sign} alt="sign attach" onClick={triggerSign} />)
                                : (<TbCameraUp size={30} className='photoIcon' onClick={triggerSign} />)}
                         {signSizeError ? <div className='imageSizeErrorMsg'>{signSizeError}</div> : <div className='signSizeMsg'>image size should be between 10kb and 20kb</div>}   
                    </div>
                </div>
                <input type="file" id="file" style={{ opacity: 0 }}
                    ref={getSign} onChange={handleSign} />
            </div>
        </div>

    )
}

