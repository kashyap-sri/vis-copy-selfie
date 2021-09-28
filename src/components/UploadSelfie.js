import React, { useState } from "react";

import Webcam from 'react-webcam';
import { VscLoading } from 'react-icons/vsc';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

import Header from "./Header";


const UploadSelfie = () => {

    const [imageSrc, setImageSrc] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const webcamRef = React.useRef(null);
  
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);
      },
      [webcamRef]
    );

    const retakeSelfie = () => {
        setImageSrc('');
        setUploadSuccess(false);
    };

    const uploadSelfie = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setUploadSuccess(true);
        }, 2000);
    };

    if (uploadSuccess) {
        return (
            <div className="home">
                <Header />
                <div className="selfie">
                    <div className="selfie__success">
                        <div className="selfie__success-icon">
                            <IoMdCheckmarkCircleOutline />
                        </div>
                        <div className="selfie__success-label">
                            Image uploaded successfully!
                        </div>
                        <div className="selfie__actions">
                            <button className="selfie__button" onClick={retakeSelfie}>Retake photo</button>                               
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
  
    return (
        <div className="home">
            <Header />
            <div className="selfie">
                {
                    imageSrc ?
                    (
                        <div className="selfie__image-container">
                            <div className="selfie__image">
                                <img src={imageSrc} />
                            </div>
                            <div className="selfie__actions">
                                <button className="selfie__button" onClick={retakeSelfie}>Retake photo</button>
                                <button className="selfie__button" onClick={uploadSelfie}>
                                    { isLoading ? <VscLoading /> : 'Upload'}
                                </button>                                
                            </div>                            
                        </div>
                    ) :
                    (
                        <div className="selfie__cam-container">
                            <div className="selfie__cam">
                                <Webcam
                                    audio={false}
                                    height={500}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    width={500}
                                    videoConstraints={videoConstraints}
                                />
                            </div>
                            <div className="selfie__capture">
                                <button className="selfie__button" onClick={capture}>Capture photo</button>                            
                            </div>                        
                        </div>
                    )
                }
            </div>
        </div>
        
    );
};

export default UploadSelfie;
