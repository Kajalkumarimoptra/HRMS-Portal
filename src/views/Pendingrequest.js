import React, { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';
import { useNavigate } from 'react-router-dom';

export default function Pendingrequest() {

    const [redirectCards, setRedirectCards] = useState([]);

    const navigate = useNavigate();

    const pendingrequestlist = [
        {
            id: 1, heading: 'Assets (2)', asset: [
                { name: "Amit Raj", assetname: "Laptop" },
                { name: "Sonam Kumari", assetname: "Headphones" }
            ]
        },
        { id: 2, heading: 'Attendance Corrections (1)' },
        {
            id: 3, heading: 'Documents (2)', docscontent: [
                { name: "Amit Raj", doc: "Final Year Marksheet" },
                { name: "Sonam Kumari", doc: "Intermediate Passing Certificate" }
            ]
        },
        {
            id: 4, heading: 'Leaves (3)', details: [
                { name: "Amit Raj", date: "20-02-2025" },
                { name: "Sonam Kumari", date: "22-02-2025" }
            ]
        },
        { id: 5, heading: 'Resignations (2)' }
    ];

    const redirectUrls = {
        1: '/admin/PendingRequest/AssetRequestList',
        2: '/admin/PendingRequest/Attendance',
        3: '/admin/PendingRequest/DocumentRequestList',
        4: '/admin/PendingRequest/LeaveRequestList',
        5: '/admin/PendingRequest/Offboarded'
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
                <div class="row flex-column pendingrequest-container">
                    {pendingrequestlist.map((list) => (
                        <div class="col-md-12 mb-3" key={list.id}>
                            <div>
                                <div class="pending-request-card">
                                    <div class="header-container" onClick={() => navigate(redirectUrls[list.id])} style={{ cursor: 'pointer' }}>
                                        <p><b>{list.heading}</b></p>
                                        <div className='clearance-btn'>
                                            <img
                                                src={require("assets/img/close-dropdown-icon.png")}
                                                alt="toggle-icon"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(redirectUrls[list.id]);
                                                  }}
                                                className="icon-redirect" />
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
