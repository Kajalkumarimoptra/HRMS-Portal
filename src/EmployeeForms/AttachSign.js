import React, { useEffect, useRef, useState } from 'react';
import { TbCameraUp } from 'react-icons/tb';
import { useFormContext } from 'components/ContextProvider/Context';
import axios from 'axios';

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
        const file = e.target.files[0];
        handleFileUpload('signatureAttach', setSignSizeError, setSign, file);
    };

    const handleFileUpload = async (field, setSignSizeError, setSign, file) => {
        if (!file) {
            console.log('No file selected.');
            setSignSizeError('Please select a file to upload');
            setSign('');
            return;
        }
        console.log('Selected file details:', file);
        const fileType = file.type;
        const validTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        if (!validTypes.includes(fileType)) {
            alert('Invalid file type. Only .png or .jpg files are allowed.');
            console.log('Invalid file type:', fileType);
            setSign('');
            return;
        }

        const sizeKB = file.size / 1024;
        console.log('size:', sizeKB);
        if (sizeKB > 20 || sizeKB < 10) {
            console.log('File size out of allowed range.');
            setSignSizeError('Image should be between 10KB and 20KB');
            setSign('');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Authentication issue. Please log in again.');
                return;
            }
            console.log('Sending file to backend...');
            setLoading(true);

            const response = await axios.post('http://localhost:8081/api/files/uploadFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Server response:', response);
            if (response.data.data && response.data.data.url) {
                const fileUrl = response.data.data.url;
                console.log('File uploaded successfully. URL:', fileUrl);
                setSign(fileUrl);                // for image preview
                setValue(field, fileUrl);        // for form submission
                setLoading(false); 
                setSignSizeError(''); 
            } else {
                console.log('Upload failed: URL not found in response.');
                setSignSizeError('Upload failed, please try again.');
                setSign('');
            }
        } catch (error) {
            console.error('File upload failed with error: ', error); // Log the entire error object
            console.error('Error response:', error.response); // Log the response object if available
            console.error('Error message:', error.message); // Log the specific error message
            setLoading(false);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;
                if (errorMessage && errorMessage.includes('File already exists')) {
                    console.log('file already exist error:', errorMessage);
                    setSignSizeError('This file is already uploaded');
                }
                else {
                    setSignSizeError('Upload failed, please try again.');
                }
                setSign('');
                setLoading(false);
            }
        }
        };

        useEffect(() => {
            register('signatureAttach', { required: "Please upload your signature before final submit." });
        }, [register]);
        console.log("invalid:", errors.signatureAttach);

        return (

            <div className={`attachPhotoBox ${errors.signatureAttach ? 'invalid' : ''}`}>
                <div className="photo-container">
                    <div className='container'>
                        Attach Your Signature
                        <div>
                            {loading ? (<img src={require("assets/img/LoadingGif.gif")} alt="..." />) :
                                sign ? (<img src={sign} alt="sign attach" onClick={triggerSign} />)
                                    : (<TbCameraUp size={30} className='photoIcon' style={{ cursor: 'pointer' }} onClick={triggerSign} />)}
                            {signSizeError ? <div style={{ color: 'red', fontSize: '13px', marginTop: '12px' }}>{signSizeError}</div> : <div className='signSizeMsg'>image size should be between 10kb and 20kb</div>}
                        </div>
                    </div>
                    <input type="file" id="file" style={{ opacity: 0 }}
                        ref={getSign} onChange={handleSign} />
                </div>
            </div>

        )
    }

