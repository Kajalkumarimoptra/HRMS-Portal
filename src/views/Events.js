import React, { useState } from 'react';
import Breadcrumb from './Breadcrumb';

export default function Events() {
  const [interested, setInterested] = useState(null); // for tracking interest in event

  // Handle work mode selection
  const handleInterestedInEvent = (e) => {
    setInterested(e.target.value);
  };

  return (
    <div className='container-fluid'>
      <Breadcrumb />
      <div className="events-container">
        <div className='col-md-10 event-bg'>
          <div className="event-box">
            <div className="event-card highlight">
              <h3>Upcoming Events</h3>
              <h5 className='upcoming-events-heading'>Holi Party</h5>
              <p><b>Date : </b>12-03-2025</p>
              <p><b>Venue : </b>At Office Premise</p>
              <p><b>Time : </b>After 12 am</p>
              <p><b>Interested ?</b>
                <label>
                  <input type="radio" name="interested" value="yes" className="work-radio" checked={interested === "yes"} onChange={(e) => handleInterestedInEvent(e)} />
                  Yes
                </label>
                <label>
                  <input type="radio" name="interested" value="no" className="work-radio" checked={interested === "no"} onChange={(e) => handleInterestedInEvent(e)} />
                  No
                </label></p>
            </div>
          </div>
          {/* event cards */}
          <div className="each-event-box">
            <div className="event-card highlight">
              <h3>Holi Party</h3>
              <p><b>Date : </b>12-03-2025</p>
              <p><b>Venue : </b>At Office Premise</p>
              <p><b>Time : </b>After 12 am</p>
            </div>
            <div className="event-card highlight">
              <h3>Its B'day</h3>
              <p><b>Employee Name : </b>Rakesh Singh</p>
              <p><b>Employee ID : </b>562369</p>
              <p><b>Date : </b>20-03-2025</p>
            </div>
            <div className="event-card highlight">
              <h3>Annual Day</h3>
              <p><b>Date : </b>20-03-2025</p>
              <p><b>Venue : </b>Gargee Resort, Gurgaon</p>
              <p><b>Theme : </b>black</p>
            </div>
            <div className="event-card highlight">
              <h3>Office Trip</h3>
              <p><b>Date : </b>04-04-2025</p>
              <p><b>Duration : </b>Three days</p>
              <p><b>Destination : </b>Manali</p>
            </div>
            <div className="event-card highlight">
              <h3>Diwali Party</h3>
              <p><b>Venue : </b>At Office Premise</p>
              <p><b>Time : </b>After 12 am</p>
              <p><b>Theme : </b>Traditional wear</p>
            </div>
            <div className="event-card highlight">
              <h3>New Year Eve</h3>
              <p><b>Venue : </b>Gargee Resort, Gurgaon</p>
              <p><b>Date : </b>30.12.2025</p>
              <p><b>Theme : </b>Red</p>
            </div>
          </div>
        </div>
        <div className='col-md-2 company-events'>
          <h3 className='company-events-heading'>Company Events</h3>
          <div className='event-timer'>
            <h3>6</h3>
            <p>Events</p>

          </div>

        </div>


      </div>
    </div>
  );
};


