import React, { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';
import { useNavigate } from 'react-router-dom';

export default function Pendingrequest() {

    const [redirectCards, setRedirectCards] = useState([]);

    const navigate = useNavigate();

    const pendingrequestlist = [
        {
            id: 1, heading: 'Assets (2)', icon: require("assets/img/assets-list-icon.png"),
            asset: [
                { name: "Amit Raj", assetname: "Laptop" },
                { name: "Sonam Kumari", assetname: "Headphones" }
            ]
        },
        { id: 2, heading: 'Attendance (1)', icon: require("assets/img/attendance-correction-icon.png") },
        {
            id: 3, heading: 'Documents (2)', icon: require("assets/img/docs-list-icon.png"),
            docscontent: [
                { name: "Amit Raj", doc: "Final Year Marksheet" },
                { name: "Sonam Kumari", doc: "Intermediate Passing Certificate" }
            ]
        },
        {
            id: 4, heading: 'Leaves (3)', icon: require("assets/img/leaveslist-icon.png"),
            details: [
                { name: "Amit Raj", date: "20-02-2025" },
                { name: "Sonam Kumari", date: "22-02-2025" }
            ]
        },
        { id: 5, heading: 'Resignations (2)', icon: require("assets/img/resignation-list-icon.png") }
    ];

    const redirectUrls = {
        1: { path: '/admin/PendingRequest/AssetRequestList' },
        2: { path: '/admin/PendingRequest/Attendance' },
        3: { path: '/admin/PendingRequest/DocumentRequestList' },
        4: { path: '/admin/PendingRequest/LeaveRequestList' },
        5: { path: '/admin/PendingRequest/Offboarded', state: { from: 'PendingRequest' } }
    };
    

    return (
        <div className='container-fluid'>
            <div className=" d-flex justify-content-between align-items-center" style={{ flexDirection: "row-reverse", marginBottom: '-15px' }}>
                <div className="icons-list">
                    <Breadcrumb />
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <h5 style={{ fontWeight: 'bold' }}>All Requests</h5>
            </div>
            <div className='pendingrequest-upper-container'>
                <div class="pendingrequest-container">
                    {pendingrequestlist.map((list) => (
                        <div class="col-md-12 mb-3" key={list.id}>
                            <div>
                                <div class="pending-request-card">
                                    <div class="header-container" onClick={() => navigate(redirectUrls[list.id].path, { state: redirectUrls[list.id].state })} style={{ cursor: 'pointer' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexDirection: 'column' }}>
                                            <img src={list.icon} alt="icon" style={{ width: '50px', height: '50px' }} />
                                            <div className='clearance-btn'>
                                            <img
                                                src={require("assets/img/close-dropdown-icon.png")}
                                                alt="toggle-icon"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(redirectUrls[list.id].path, { state: redirectUrls[list.id].state });
                                                }}                                                
                                                className="icon-redirect" />
                                        </div>
                                            <p><b>{list.heading}</b></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
