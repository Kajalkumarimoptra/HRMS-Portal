import React, { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';
import { useNavigate } from 'react-router-dom';

export default function Pendingrequest() {

    const [expandedCards, setExpandedCards] = useState({});
    const [redirectCards, setRedirectCards] = useState([2, 4, 5]);

    const navigate = useNavigate();

    const pendingrequestlist = [
        {
            id: 1, heading: 'Leave Request (2)', details: [
                { name: "Amit Raj", date: "20-02-2025" },
                { name: "Sonam Kumari", date: "22-02-2025" }
            ]
        },
        { id: 2, heading: 'Attendance Correction (1)' },
        {
            id: 3, heading: 'Document Request (2)', docscontent: [
                { name: "Amit Raj", doc: "Final Year Marksheet" },
                { name: "Sonam Kumari", doc: "Intermediate Passing Certificate" }
            ]
        },
        { id: 4, heading: 'Resignation Request (2)' },
        { id: 5, heading: 'Training Request (3)' },
        {
            id: 6, heading: 'Asset Request (2)', asset: [
                { name: "Amit Raj", assetname: "Laptop" },
                { name: "Sonam Kumari", assetname: "Headphones" }
            ]
        },
    ];

    // Function to toggle the visibility of specific content
    const toggleCard = (id) => {
        setExpandedCards((prev) => ({
            ...prev,
            [id]: !prev[id], // Toggle visibility for the clicked card
        }));
    };

    const redirectUrls = {
        2: '/admin/Attendance',
        4: '/admin/Offboarded',
        5: '/admin/Pendingrequest'
    };

    return (
        <div className='container-fluid'>
            <div className=" d-flex justify-content-between align-items-center" style={{ flexDirection: "row-reverse", marginBottom: '-15px' }}>
                <div className="icons-list">
                    <Breadcrumb />
                </div>
            </div>
            <div className='pendingrequest-upper-container'>
                <div class="row flex-column pendingrequest-container">
                    {pendingrequestlist.map((list) => (
                        <div class="col-md-12 mb-3" key={list.id}>
                            <div>
                                <div class="pending-request-card">
                                    <div class="header-container">
                                        <p><b>{list.heading}</b></p>
                                        <div className='clearance-btn'>
                                            <img
                                                src={redirectCards.includes(list.id) ?
                                                    require("assets/img/close-dropdown-icon.png") :
                                                    expandedCards[list.id]
                                                        ? require("assets/img/close-dropdown-icon.png")
                                                        : require("assets/img/dropdown_icon.png")
                                                }
                                                alt="toggle-icon"
                                                onClick={() => {
                                                    if (redirectCards.includes(list.id)) {
                                                        navigate(redirectUrls[list.id]);
                                                    } else {
                                                        toggleCard(list.id);
                                                    }
                                                }}
                                                className={
                                                    redirectCards.includes(list.id)
                                                        ? "icon-redirect"
                                                        : expandedCards[list.id]
                                                            ? "icon-expanded"
                                                            : "icon-collapsed"
                                                } />
                                        </div>
                                    </div>
                                    {/* Show different content for each employee */}
                                    {expandedCards[list.id] && (
                                        <div className="content-box">
                                            {list.details && list.details.length > 0 && (
                                                <>
                                                    <ul>
                                                        {list.details.map((person, index) => (
                                                            <li key={index}>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start'  }}>
                                                                    <p style={{ flex: 1 }}>{person.name}</p>
                                                                    <p style={{ maxWidth: '200px' , textAlign: 'right' }}>{person.date}</p>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    <div className='edit-delete-btn-container' style={{ marginTop: '-5px' }}>
                                                        <button className="primary-btn" style={{ background: 'limegreen', width: '100px' }} >Approved</button>
                                                        <button className="primary-btn" type="submit" style={{ width: '100px', background: 'indianred' }} >Reject</button>
                                                    </div>
                                                </>
                                            )}
                                            {list.redirect && <p><a style={{ color: 'dodgerblue' }}>click here</a> to {list.redirect}</p>}
                                            {list.docscontent && list.docscontent.length > 0 && (
                                                <>
                                                    <ul>
                                                        {list.docscontent.map((person, index) => (
                                                            <li key={index}>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                                                                    <p style={{ flex: 1 }}>{person.name}</p>
                                                                    <p style={{ maxWidth: '200px' , textAlign: 'right' }}>{person.doc}</p>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                 <div className='edit-delete-btn-container' style={{ marginTop: '-5px' }}>
                                                        <button className="primary-btn" style={{ background: 'limegreen', width: '100px' }} >Approved</button>
                                                        <button className="primary-btn" type="submit" style={{ width: '100px', background: 'indianred' }} >Reject</button>
                                                    </div>
                                                    <p style={{ marginTop: '15px' }}><a style={{ color: 'dodgerblue' }}>click here</a> to add comment(if required)</p>
                                                </>
                                            )}
                                            {list.exit && <p><a style={{ color: 'dodgerblue' }}>click here</a> to {list.exit}</p>}
                                            {list.training && <p><a style={{ color: 'dodgerblue' }}>click here</a> to {list.training}</p>}
                                            {list.asset && list.asset.length > 0 && (
                                                <>
                                                    <ul>
                                                        {list.asset.map((person, index) => (
                                                            <li key={index}>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start'  }}>
                                                                    <p style={{ flex: 1 }}>{person.name}</p>
                                                                    <p style={{ maxWidth: '200px' , textAlign: 'right' }}>{person.assetname}</p>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <div className='edit-delete-btn-container' style={{ marginTop: '-5px', marginBottom: '20px' }}>
                                                        <button className="primary-btn" style={{ background: 'limegreen', width: '100px' }} >Approved</button>
                                                        <button className="primary-btn" type="submit" style={{ width: '100px', background: 'indianred' }} >Reject</button>
                                                    </div>
                                                </>
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
