import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'components/ContextProvider/Context';
import Breadcrumb from './Breadcrumb';
import axios from 'axios';

export default function LeaveRequestList() {
    const leaveRequestsList = [
        {
            name: "Amit Kumar",
            type: "Sick Leave",
            startDate: "10-01-2025",
            endDate: "14-01-2025",
            duration: "5 days",
            reason: "Fever",
            status: "Approved",
        },
        {
            name: "Sonu Kumar",
            type: "Casual Leave",
            startDate: "20-02-2025",
            endDate: "23-02-2025",
            duration: "4 days",
            reason: "Attend wedding",
            status: "Rejected",
        },
        {
            name: "Harsh Kumar",
            type: "Sick Leave",
            startDate: "25-02-2025",
            endDate: "27-02-2025",
            duration: "3 days",
            reason: "Fever with headache",
            status: "Pending",
        },
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
    }else {
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
                                                    <th>Employee Name</th>
                                                    <th>Leave Type</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th>Duration</th>
                                                    <th>Reason</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {leaveRequestsList.map((request, index) => (
                                                    <tr key={index}>
                                                        <td>{request.name}</td>
                                                        <td>{request.type}</td>
                                                        <td>{request.startDate}</td>
                                                        <td>{request.endDate}</td>
                                                        <td>{request.duration}</td>
                                                        <td>{request.reason}</td>
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
