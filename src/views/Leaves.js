import React, { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';
import { useNavigate } from 'react-router-dom';

export default function Leaves() {
  const navigate = useNavigate();
  const [ roleBasedSection, setRoleBasedSection ] = useState(null);
  const [tooltip, setTooltip] = useState({}); // Object to track open tooltips

  useEffect(() => {
      // Directly read the role from localStorage
      const storedRole = localStorage.getItem("role");
      setRoleBasedSection(storedRole);
    }, []); 

  const toggleTooltip = (id) => {
    setTooltip((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle only the clicked tooltip
    }));
  };

  const handelCloseLeaveDetailsPopup = (id) => {
    setTooltip((prev) => ({
      ...prev,
      [id]: false, // Close only the clicked tooltip
    }));
  };

  return (
    <div className='container-fluid'>
      <div className='path-btn-container'>
        <Breadcrumb />
        { roleBasedSection === "ADMIN" ? (
              <button type="button" class="primary-btn" data-toggle="empReg" data-target="#empRegForm" fdprocessedid="av3mdpe" style={{ marginLeft: '5px' }} onClick={()=> navigate('/admin/Applyleave')}>
              Apply Leave
           </button> 
        ) : "" } 
      </div>
      <div className='row clearfix'>
        <div className='col-md-4'>
          <div className='card' style={{ overflow: 'visible' }}>
            <div className="leave-balance-card">
              <div className='leave-heading-details'>
                <h5 className='typeofleave-heading'>Earn Leave  (EL)</h5>
                <img src={require("assets/img/info-icon.png")} alt="" className='info-icon' onClick={() => toggleTooltip("el")} />
              </div>
              <div className="circle-container">
                <div className="earn-leave-circle">
                  <span className="days-available">12 Days Available</span>
                </div>
              </div>
              <div className="leave-details">
                <table className="leave-table">
                  <tbody>
                    <tr>
                      <th>Available</th>
                      <th>Consumed</th>
                    </tr>
                    <tr>
                      <td>12 days</td>
                      <td>0 day</td>
                    </tr>
                    <tr>
                      <th>Carryover</th>
                      <th>Annual Quota</th>
                    </tr>
                    <tr>
                      <td>0 day</td>
                      <td>8.2 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
            {/* tooltip */}
            {tooltip["el"] && (
              <div className="leave-details-popup-overlay">
                <div className="leave-details-popup">
                  <h5>Earn Leave (EL)</h5>
                  <ul>
                    <li>Used for short-term, unplanned absences for personal reasons. Ideally, apply at least 2 weeks before day
                      in advance.</li>
                    <li>EL shall be applied in advance. However, in case of emergency employee needs to take an
                      approval on the same day by any mode of communication.</li>
                    <li> EL shall not be clubbed with General Leave / Sick Leave.</li>
                    <li>Any Earn leaves will be carry forward into the next year, allowing employees to use them in the future.</li>
                  </ul>
                  <div style={{ textAlign: 'center' }}>
                    <button className='primary-btn' style={{ width: '70px' }} onClick={() => handelCloseLeaveDetailsPopup("el")} >OK</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card' style={{ overflow: 'visible' }}>
            <div className="leave-balance-card">
              <div className='leave-heading-details'>
                <h5 className='typeofleave-heading'>Sick Leave  (SL)</h5>
                <img src={require("assets/img/info-icon.png")} alt="" className='info-icon' onClick={() => toggleTooltip("sl")} />
              </div>
              <div className="circle-container">
                <div className="sick-leave-circle">
                  <span className="days-available">5 Days Available</span>
                </div>
              </div>
              <div className="leave-details">
                <table className="leave-table">
                  <tbody>
                    <tr>
                      <th>Available</th>
                      <th>Consumed</th>
                    </tr>
                    <tr>
                      <td>4 days</td>
                      <td>1 days</td>
                    </tr>
                    <tr>
                      <th>Carryover</th>
                      <th>Annual Quota</th>
                    </tr>
                    <tr>
                      <td>0 day</td>
                      <td>8.2 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* tooltip */}
            {tooltip["sl"] && (
              <div className="leave-details-popup-overlay">
                <div className="leave-details-popup">
                  <h5>Sick Leave (SL)</h5>
                  <ul>
                    <li> SL is for personal illness only.</li>
                    <li> SL shall not be clubbed with CL.</li>
                    <li> If SL is for 3 consecutive days or more, it is mandatory to submit a doctor’s certificate/
                      Prescription containing nature of ailment / relevant reports. <br />
                      Note: Accumulated sick leave balance
                      if any (applicable only to those employees who have joined before 1st April 2024) will be carried
                      forward till it is fully utilized by the employee.</li>
                  </ul>
                  <div style={{ textAlign: 'center' }}>
                    <button className='primary-btn' style={{ width: '70px' }} onClick={() => handelCloseLeaveDetailsPopup("sl")} >OK</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card' style={{ overflow: 'visible' }}>
            <div className="leave-balance-card">
              <div className='leave-heading-details'>
                <h5 className='typeofleave-heading'>Maternity Leave</h5>
                <img src={require("assets/img/info-icon.png")} alt="" className='info-icon' onClick={() => toggleTooltip("matl")} />
              </div>
              <div className="circle-container">
                <div className="maternity-leave-circle">
                  <span className="days-available">26 Days Available</span>
                </div>
              </div>
              <div className="leave-details">
                <table className="leave-table">
                  <tbody>
                    <tr>
                      <th>Available</th>
                      <th>Consumed</th>
                    </tr>
                    <tr>
                      <td>12 days</td>
                      <td>0 day</td>
                    </tr>
                    <tr>
                      <th>Carryover</th>
                      <th>Annual Quota</th>
                    </tr>
                    <tr>
                      <td>0 day</td>
                      <td>8.2 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
            {/* tooltip */}
            {tooltip["matl"] && (
              <div className="leave-details-popup-overlay">
                <div className="leave-details-popup">
                  <h5>Maternity Leave</h5>
                  <ul>
                    <li> <b>ML Eligibility:</b> ML can be granted only to a female employee who has worked for a period of not less
                      than 80 days in the 12 months immediately preceding the date of her expected delivery.</li>
                    <li> <b>ML Duration:</b> The ML period shall not exceed 26 weeks (including holidays & weekly offs) for two
                      surviving children and 12 weeks for more than two surviving children</li>
                    <li> <b>Commissioning Mother & Adopting Mother:</b>  Commissioning mothers and adopting mothers (who
                      legally adopt a child below the age of three months) shall be entitled to maternity benefit for a period
                      of 12 weeks from the date the child is handed over.</li>
                    <li> <b>Application:</b>  Employees who need to avail ML will be required to make an application to their
                      immediate Reporting Manager at least 2 months in advance to ensure proper handover of their
                      current roles & responsibilities</li>
                    <li> <b>Doctor's Certificate:</b>  The approved application along with the Doctor's certificate certifying pregnancy
                      and the expected date of delivery should be submitted to the HR Department before the employee
                      goes on leave.</li>
                    <li> <b>Leave Encashment:</b> : ML can be clubbed with any leave, and an employee on approved ML will receive
                      full pay during the period.</li>
                    <li> <b>Miscarriage or Medical Termination:</b> : In case of miscarriage or medical termination of pregnancy
                      subject to production of proofs as may be prescribed, an employee shall be entitled to take leave for a
                      period of six weeks immediately following the days of her miscarriage or medical termination of
                      pregnancy.</li>
                    <li> <b>ESIC Benefits:</b> Employees governed by the ESIC Act shall be entitled to ESIC benefits as per the
                      applicable rules and regulations.</li>
                    <li> <b>This policy of Moptra Infotech Pvt Ltd. will be governed by the regulatory requirement of Maternity
                      Act, 1961 and read along with amendments thereof.</b></li>
                  </ul>
                  <div style={{ textAlign: 'center' }}>
                    <button className='primary-btn' style={{ width: '70px' }} onClick={() => handelCloseLeaveDetailsPopup("matl")} >OK</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='row clearfix'>
        <div className='col-md-4'>
          <div className='card' style={{ overflow: 'visible' }}>
            <div className="leave-balance-card">
              <div className='leave-heading-details'>
                <h5 className='typeofleave-heading'>Marriage Leave</h5>
                <img src={require("assets/img/info-icon.png")} alt="" className='info-icon' onClick={() => toggleTooltip("marrl")} />
              </div>
              <div className="circle-container">
                <div className="marriage-leave-circle">
                  <span className="days-available">5 Days Available</span>
                </div>
              </div>
              <div className="leave-details">
                <table className="leave-table">
                  <tbody>
                    <tr>
                      <th>Available</th>
                      <th>Consumed</th>
                    </tr>
                    <tr>
                      <td>4 days</td>
                      <td>1 dayS</td>
                    </tr>
                    <tr>
                      <th>Carryover</th>
                      <th>Annual Quota</th>
                    </tr>
                    <tr>
                      <td>0 day</td>
                      <td>8.2 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* tooltip */}
            {tooltip["marrl"] && (
              <div className="leave-details-popup-overlay">
                <div className="leave-details-popup">
                  <h5>Marriage Leave</h5>
                  <ul>
                    <li> The company will provide 2 days of paid leave specifically for marriage purposes.</li>
                    <li>  Any additional leave required will be adjusted against the employee's existing leave balance (e.g.,
                      earned leave, casual leave).</li>
                    <li> Approval of marriage leave and its duration is subject to management's discretion, based on
                      workload and business requirements.</li>
                  </ul>
                  <div style={{ textAlign: 'center' }}>
                    <button className='primary-btn' style={{ width: '70px' }} onClick={() => handelCloseLeaveDetailsPopup("marrl")} >OK</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='col-md-4'>
          <div>
            <p style={{ fontSize: '14px' }}><b>NOTE : </b>Any leave request of more than five working days will be treated as special leave request and is
              subject to the approval and discretion of the management.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
