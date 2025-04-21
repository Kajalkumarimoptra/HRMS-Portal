import React, { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Report() {

  const [selectedFolder, setSelectedFolder] = useState("Onboarding Documents"); // State to track the selected folder
  const [folderProgress, setFolderProgress] = useState({}); // stores upload progress for each folder
  const [docUploadStatus, setDocUploadStatus] = useState({}); // to track the docs 
  const [showResignConfirmModal, setShowResignConfirmModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  useEffect(() => {
    console.log("Navigated from:", from);
  }, [from]);

  useEffect(() => {
    console.log("Navigated from:", from);

    // Auto-select "Relieving Letter" folder if navigated from FinalClearance
    if (from === "FinalClearance") {
      setSelectedFolder("Relieving Letter");

      // Optional: simulate progress (if you want to show progress bar too)
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setFolderProgress(prev => ({ ...prev, "Relieving Letter": progress }));
        if (progress >= 100) clearInterval(interval);
      }, 300);
    }
  }, [from]);


  // Mapping of folders to their respective documents
  const folderDocs = {
    "Onboarding Documents": ["ID Proof", "Passport Photo", "Educational Documents", "Work History Documents"],
    "Offer Letter": ["Offer Letter"],
    "Appointment Letter": ["Appointment Letter"],
    "Confirmation Letter": ["Confirmation Letter"],
    "Appraisal Letter": ["Appraisal Letter"],
    "Relieving Letter": ["Relieving Letter"],
    "Experience Letter": ["Experience Letter"],
    "Termination Letter": ["Termination Letter"]
  };

  // Simulate progress update when clicking a folder
  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setFolderProgress(prev => ({ ...prev, [folder]: progress }));
      if (progress >= 100) clearInterval(interval);
    }, 300);
  };

  const handleNextClick = () => {
    if (docUploadStatus["Relieving Letter"] === "uploaded") {
      setShowResignConfirmModal(true);
    } else {
      alert("Please upload the Relieving Letter before proceeding.");
    }
  };

  return (
    <div className='container-fluid'>
      <Breadcrumb />
      <div className='row clearfix'>
        <div className='col-md-12'>
          <div className='docs-container'>
            <div className='col-md-4 docs-name'>
              <h5>Employee Document Folders</h5>
              <div class="list-group list-group-flush">
                <div className="progress-container">
                  {Object.keys(folderDocs).map((folder, index, arr) => (
                    <div key={folder} className="folder-container">
                      <div className="progress-step">
                        <div className='progressbar-container'>
                          <div className={`progress-icon ${folderProgress[folder] === 100 ? "completed" : ""}`}
                            style={{ marginBottom: "40px", backgroundColor: folderProgress[folder] === 100 ? "dodgerblue" : "" }}>
                          </div>
                          {/* Add a small progress line between icons, but not after the last one */}
                          {index < arr.length - 1 && <div className="progress-segment"></div>}
                        </div>
                        <a href="#" className={`list-group-item list-group-item-action ${selectedFolder === folder ? "active" : ""}`}
                          onClick={() => handleFolderClick(folder)} aria-current="true">
                          <img src={require("assets/img/docs-icon.png")} alt="..." className='docs-icon' />
                          {folder}
                        </a>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='col-md-8'>
              <div class="list-group">
                {folderDocs[selectedFolder]?.map((doc) => (
                  <a href="#" key={doc} className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                      <div className="single-docs-container">
                        <div className='docs-icon-name'>
                          <img
                            src={require("assets/img/single-docs-icon.png")}
                            alt="..."
                            className="docs-icon"
                          />
                          <h5>{doc}</h5>
                        </div>
                        <input type="file" onChange={(e) => {
                          if (e.target.files.length > 0) {
                            setDocUploadStatus(prev => ({ ...prev, [doc]: "uploaded" }));
                          }
                        }} />
                        {docUploadStatus[doc] === "uploaded" && (
                          <span style={{ color: "green", fontWeight: 'bold' }}>Uploaded successfully</span>
                        )}

                      </div>
                      {/* <button className="verified-btn">verified</button> */}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
        <button className="primary-btn" type='button' style={{ background: 'darkgray', width: '100px' }}
          onClick={() => navigate('/admin/Checklist/FinalClearance')}
        >Cancel</button>
        <button className="primary-btn" type="submit" style={{ width: '100px' }} onClick={handleNextClick}
        >Next</button>
      </div>
      {showResignConfirmModal && (
        <div className="accept-pop-add-overlay">
          <div className="popup">
            <img
              src={require("assets/img/success-icon.png")}
              alt="..."
              style={{ width: '25px', height: '25px' }}
            />
            <p><b>Resignation Process Completed! </b></p>
            <div>
              <button className='primary-btn' onClick={() => setShowResignConfirmModal(false)}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
