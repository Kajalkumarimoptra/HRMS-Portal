import React, { useState } from 'react';
import Breadcrumb from './Breadcrumb';

export default function Report() {

  const [selectedFolder, setSelectedFolder] = useState("Onboarding Documents"); // State to track the selected folder
  const [folderProgress, setFolderProgress] = useState({}); // stores upload progress for each folder

  // Mapping of folders to their respective documents
  const folderDocs = {
    "Onboarding Documents": ["ID Proof", "Passport Photo", "Educational Documents", "Work History Documents"],
    "Offer Letter": ["Offer Letter"],
    "Appointment Letter": ["Appointment Letter"],
    "Confirmation Letter": ["Confirmation Letter"],
    "Appraisal Letter": ["Appraisal Letter"],
    "Experience Letter": ["Experience Letter"]
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
                        <input type="file" />
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
    </div>
  )
}
