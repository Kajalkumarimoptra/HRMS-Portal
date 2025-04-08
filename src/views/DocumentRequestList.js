import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'components/ContextProvider/Context';
import Breadcrumb from './Breadcrumb';
import axios from 'axios';

export default function DocumentRequestList() {
    const DocsRequestsList = [
        {
            requestID: "#DR567",
            name: "Amit Kumar",
            document: "Final Year Marksheet",
            Date: "10-01-2025",
            status: "Approved",
        },
        {
            requestID: "#DR587",
            name: "Sonu Kumar",
            document: "Intermediate Passing Certificate",
            Date: "15-02-2025",
            status: "Pending",
        }
    ];

    const getActionButtons = (status) => {
        if (status === "Pending") {
            return (
                <>
                    <button type="button" className="btn btn-icon btn-sm icons" title="Approve">
                        <img src={require("assets/img/approved-icon.png")} alt="..." className='delete-icon' />
                    </button>
                    <button type="button" className="btn btn-icon btn-sm icons" title="Reject">
                        <img src={require("assets/img/reject-icon.png")} alt="..." className='delete-icon' />
                    </button>
                </>
            );
        } else if (status === "Approved" || status === "Rejected") {
            return (
                <> <button type="button" className="btn btn-icon btn-sm icons" title="none">
                    <img src={require("assets/img/none-icon.png")} alt="..." className='delete-icon' style={{width: '15px'}} />
                    </button> 
                </>
            );
        }
        else {
            return null;
        }
    };

    return (
        <div className='container-fluid'>
            <div className=" d-flex justify-content-between align-items-center" style={{ flexDirection: "row-reverse", marginBottom: '18px' }}>
                <div className="icons-list">
                    <Breadcrumb />
                </div>
            </div>
            {/* leave request list table */}
            <div className='section-body'>
                <div className='container-fluid'>
                    <div className='tab-content'>
                        <div className='tab-pane fade active show' id="Employee-list" role='tabpanel'>
                            <div className='card'>
                                <div className='card-body'>
                                    <div className='request-list-table'>
                                        <table className='table table-hover table-vcenter text-nowrap mb-0'>
                                            <thead>
                                                <tr>
                                                    <th>Request ID</th>
                                                    <th>Employee Name</th>
                                                    <th>Document</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {DocsRequestsList.map((request, index) => (
                                                    <tr key={index}>
                                                        <td>{request.requestID}</td>
                                                        <td>{request.name}</td>
                                                        <td>{request.document}</td>
                                                        <td>{request.Date}</td>
                                                        <td>{request.status}</td>
                                                        <td>{getActionButtons(request.status)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
