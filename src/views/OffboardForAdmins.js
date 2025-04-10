import React, { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';
import { useOffboardPopupContext } from 'components/ContextProvider/OffboardPopupContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function OffboardForAdmins() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const [roleBasedOffboardSection, setRoleBasedOffboardSection] = useState(null);
  const { toggleExitPopup } = useOffboardPopupContext();

  useEffect(() => {
    // Directly read the role from localStorage
    const storedRole = localStorage.getItem("role");
    setRoleBasedOffboardSection(storedRole);
  }, []);

  return (
    <div className='container-fluid'>
      <div className=" d-flex justify-content-between align-items-center" style={{ flexDirection: "row-reverse", marginBottom: '-15px' }}>
        <div className="icons-list">
          <Breadcrumb />
          {roleBasedOffboardSection === "ADMIN" ? (
            <div>
              <button type="button" className="primary-btn"
                onClick={() => toggleExitPopup(true)}
              >Offboard</button>
            </div>
          ) : ""}
        </div>
      </div>
      <div className='offboard-emp-container'>
        <div class="row">
          <div class="col-sm-4">
            <div class="card">
              <div class="exit-card">
                <p><b>Employee Name :</b><span>Raj Kishore</span></p>
                <p><b>Employee ID :</b><span>523696</span></p>
                <p><b>Department:</b><span>Web Development</span></p>
                <p><b>Last Working Day :</b><span>02-feb-2025</span></p>
                <div className='clearance-btn'>
                  <button class="primary-btn" onClick={() => navigate('/admin/Offboarded/Policies', { state: { from } })}>Acknowledge</button>
                </div>
                <div className='exit-pic'>
                  <img
                    src={require("assets/img/profile-img.webp")}
                    alt="Profile"
                    class="profile-img"
                  /> </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="exit-card">
                <div className='exit-pic'>
                  <img
                    src={require("assets/img/profile-img.webp")}
                    alt="Profile"
                    class="profile-img"
                  /> </div>
                <p><b>Employee Name :</b><span>Amit Raj</span></p>
                <p><b>Employee ID :</b><span>523696</span></p>
                <p><b>Department:</b><span>Web Development</span></p>
                <p><b>Last Working Day :</b><span>02-feb-2025</span></p>
                <div className='clearance-btn'>
                  <button class="primary-btn" onClick={() => navigate('/admin/Offboarded/Policies', { state: { from } })}>Acknowledge</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="exit-card">
                <div className='exit-pic'>
                  <img
                    src={require("assets/img/profile-img.webp")}
                    alt="Profile"
                    class="profile-img"
                  /> </div>
                <p><b>Employee Name :</b><span>Rekha Sinha</span></p>
                <p><b>Employee ID :</b><span>523696</span></p>
                <p><b>Department:</b><span>QA Testing</span></p>
                <p><b>Last Working Day :</b><span>02-feb-2025</span></p>
                <div className='clearance-btn'>
                  <button class="primary-btn" onClick={() => navigate('/admin/Offboarded/Policies', { state: { from } })}>Acknowledge</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <div class="card">
              <div class="exit-card">
                <div className='exit-pic'>
                  <img
                    src={require("assets/img/profile-img.webp")}
                    alt="Profile"
                    class="profile-img"
                  /> </div>
                <p><b>Employee Name :</b><span>Radha Swami</span></p>
                <p><b>Employee ID :</b><span>523696</span></p>
                <p><b>Department:</b><span>Web Development</span></p>
                <p><b>Last Working Day :</b><span>02-feb-2025</span></p>
                <div className='clearance-btn'>
                  <button class="primary-btn" onClick={() => navigate('/admin/Offboarded/Policies', { state: { from } })}>Acknowledge</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="exit-card">
                <div className='exit-pic'>
                  <img
                    src={require("assets/img/profile-img.webp")}
                    alt="Profile"
                    class="profile-img"
                  /> </div>
                <p><b>Employee Name :</b><span>Raja Kumar</span></p>
                <p><b>Employee ID :</b><span>523696</span></p>
                <p><b>Department:</b><span>Web Development</span></p>
                <p><b>Last Working Day :</b><span>02-feb-2025</span></p>
                <div className='clearance-btn'>
                  <button class="primary-btn" onClick={() => navigate('/admin/Offboarded/Policies', { state: { from } })}>Acknowledge</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="exit-card">
                <div className='exit-pic'>
                  <img
                    src={require("assets/img/profile-img.webp")}
                    alt="Profile"
                    class="profile-img"
                  /> </div>
                <p><b>Employee Name :</b><span>Swamini Gupta</span></p>
                <p><b>Employee ID :</b><span>523696</span></p>
                <p><b>Department:</b><span>WCS Support</span></p>
                <p><b>Last Working Day :</b><span>02-feb-2025</span></p>
                <div className='clearance-btn'>
                  <button class="primary-btn" onClick={() => navigate('/admin/Offboarded/Policies', { state: { from } })}>Acknowledge</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
