import React, { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';

export default function Pendingrequest() {

    const [expandedCards, setExpandedCards] = useState({});

    const pendingrequestlist = [
        { id: 1, heading: 'Leave Request', details1: "Amit is requesting two days leave on 1st & 2nd of apr,2025 to attend family function.", details2: "Harsh is requesting for three days sick leave from 3rd of april to5th of april,2025" },
        { id: 2, heading: 'Attendance Corrections', redirect: "see employee attendance correction request" },
        { id: 3, heading: 'Document Request', docscontent: "Sonam has uploaded its final year marksheet document." },
        { id: 4, heading: 'Resignation Request', exit: "see list of employees who have requested to resign." },
        { id: 5, heading: 'Training Request', training: "see list of employees who are interested in training." },
        { id: 6, heading: 'Asset Request', asset1: "Amit is requesting for monitor for smooth working.", asset2: "Harsh is requesting for headphones to attend meetings without disruption." },
    ];

    // Function to toggle the visibility of specific content
    const toggleCard = (id) => {
        setExpandedCards((prev) => ({
            ...prev,
            [id]: !prev[id], // Toggle visibility for the clicked card
        }));
    };

    return (
        <div className='container-fluid'>
            <div className=" d-flex justify-content-between align-items-center" style={{ flexDirection: "row-reverse", marginBottom: '-15px' }}>
                <div className="icons-list">
                    <Breadcrumb />
                </div>
            </div>
            <div className='offboard-emp-container'>
                <div class="row">
                    {pendingrequestlist.map((list) => (
                        <div class="col-sm-4" key={list.id}>
                            <div class="card">
                                <div class="pending-request-card">
                                    <p><b>{list.heading}</b></p>
                                    <div className='clearance-btn'>
                                        <img src={require("assets/img/dropdown_icon.png")} alt="..."
                                            onClick={() => toggleCard(list.id)} />
                                    </div>
                                    {/* Show different content for each employee */}
                                    {expandedCards[list.id] && (
                                        <div className="content-box">
                                            {(list.details1 || list.details2) && (
                                                <ul>
                                                    {list.details1 && <li><p>{list.details1}</p></li>}
                                                    {list.details2 && <li><p>{list.details2}</p></li>}
                                                    <div className='edit-delete-btn-container' style={{ marginTop: '0' }}>
                                                        <button className="primary-btn" style={{ background: 'limegreen', width: '100px' }} >Approved</button>
                                                        <button className="primary-btn" type="submit" style={{ width: '100px', background: 'indianred' }} >Pending</button>
                                                    </div>
                                                </ul>
                                            )}
                                            {list.redirect && <p><a style={{ color: 'dodgerblue' }}>click here</a> to {list.redirect}</p>}
                                            {list.docscontent &&
                                                <ul>
                                                    <li>{list.docscontent}</li>
                                                    <a style={{ color: 'dodgerblue' }}>FinalYearMarksheet.pdf</a>
                                                    <div className='edit-delete-btn-container' style={{ marginTop: '20px' }}>
                                                        <button className="primary-btn" style={{ background: 'limegreen', width: '100px' }} >Approved</button>
                                                        <button className="primary-btn" type="submit" style={{ width: '100px', background: 'indianred' }} >Reject</button>
                                                    </div>
                                                    <p style={{ marginTop: '15px' }}><a style={{ color: 'dodgerblue' }}>click here</a> to add comment(if required)</p>
                                                </ul>}
                                            {list.exit && <p><a style={{ color: 'dodgerblue' }}>click here</a> to {list.exit}</p>}
                                            {list.training && <p><a style={{ color: 'dodgerblue' }}>click here</a> to {list.training}</p>}
                                            {(list.asset1 || list.asset2) && (
                                                <ul>
                                                    {list.asset1 && <li><p>{list.asset1}</p></li>}
                                                    {list.asset2 && <li><p>{list.asset2}</p></li>}
                                                    <div className='edit-delete-btn-container' style={{ marginTop: '0' }}>
                                                        <button className="primary-btn" style={{ background: 'limegreen', width: '100px' }} >Approved</button>
                                                        <button className="primary-btn" type="submit" style={{ width: '100px', background: 'indianred' }} >Reject</button>
                                                    </div>
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
