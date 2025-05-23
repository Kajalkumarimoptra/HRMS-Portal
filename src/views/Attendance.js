import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import { useFormContext } from 'components/ContextProvider/Context';
import { GrEdit } from "react-icons/gr";
import axios from 'axios';

export default function Attendance() {
    const { allAttendance, setAllAttendance, serverError, setServerError } = useFormContext();
    const [userNameForAttendance, setUserNameForAttendance] = useState(null); // for storing the user name
    const [avgWorkingHrs, setAvgWorkingHrs] = useState(0); // to store the calculated avg working hrs
    const [avgInTime, setAvgInTime] = useState("00:00"); // to store the calculated avg in time
    const [avgOutTime, setAvgOutTime] = useState("00:00"); // to store the calculated avg out time
    const { roleForConditionalRendering } = useFormContext();
    console.log("Role for conditional rendering of all attendance page:", roleForConditionalRendering);
    const [ roleBasedSection, setRoleBasedSection ] = useState(null);

    useEffect(() => {
        // Directly read the role from localStorage
        const storedRole = localStorage.getItem("role");
        setRoleBasedSection(storedRole);
      }, []);

    const navigate = useNavigate();
    // For the "Edit" button
    // For the "Edit" button
    const handleEditAttendanceClick = (attendanceList) => {
        const firstName = attendanceList?.userName?.split(" ")[0] || 'N/A'; // Extract first name from attendance list
        navigate(`/admin/Attendance/${firstName}`, { state: { allAttendance: attendanceList } });
    };


    // extract role for conditional rendering of attendance
    // useEffect(() => {
    //     const getUserNameForShowAttendance = localStorage.getItem('name');
    //     if (getUserNameForShowAttendance) {
    //         const formattedName = getUserNameForShowAttendance
    //             .split(" ")
    //             .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    //             .join(" ");
    //         setTimeout(() => {
    //             setUserNameForAttendance(formattedName);
    //         }, 0);
    //     }
    //     console.log('Fetched user name from localStorage:', getUserNameForShowAttendance);
    // }, []);

    // fetch all users attendance data
    useEffect(() => {
        const fetchAllAttendance = async () => {

            try {
                // Retrieve the token from sessionStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    setServerError('User is not authenticated. Please log in again.');
                    return; // Exit if token is not found
                }

                const response = await axios.get('http://localhost:8081/api/attendance/all', {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });

                if (response && response.data) {
                    console.log('all attendance data:', response.data);
                    setAllAttendance(response.data.data);
                    // Set the user name from the response
                    const userName = response.data?.data[0]?.username || 'N/A';
                    if (userName) {
                        const capitalizedUserName = userName.charAt(0).toUpperCase() + userName.slice(1);
                        setUserNameForAttendance(capitalizedUserName);
                    }
                    // extract the data for calculating the average times
                    calculateAvgWorkingHrs(response.data.data);
                    calculateAvgInOutTimes(response.data.data);
                }
            } catch (error) {
                if (error.response) {
                    console.error("Error response:", error.response.data);
                    setServerError('Server error');
                } else if (error.request) {
                    console.error("Error request:", error.request);
                    setServerError("No response from server. Please check your network connection.");
                } else {
                    console.error("General error:", error.message);
                }
            }
        }
        fetchAllAttendance();
    }, []);

    // Calculate average working hours
    const calculateAvgWorkingHrs = (attendanceData) => {
        if (attendanceData.length === 0) {
            setAvgWorkingHrs("0.00");
            return;
        }

        let totalWorkingTime = 0;
        let totalRecords = 0;

        attendanceData.forEach((attendance) => {
            if (attendance.punchOutTime) {
                const punchInTime = new Date(attendance.punchInTime);
                const punchOutTime = new Date(attendance.punchOutTime);

                const workDuration = (punchOutTime - punchInTime) / (1000 * 60 * 60); // in hours
                console.log('working hrs:', workDuration);
                totalWorkingTime += workDuration;
                totalRecords++;
            }
        });

        if (totalRecords === 0) {
            setAvgWorkingHrs("0.00");
            return;
        }

        const avgWorkingHours = totalWorkingTime / totalRecords;
        console.log('calculated avgWorkingHours:', avgWorkingHours);
        setAvgWorkingHrs(avgWorkingHours.toFixed(2)); // Set the calculated average working hours
    };

    const calculateAvgInOutTimes = (attendanceData) => {
        if (attendanceData.length === 0) {
            setAvgInTime("00:00");
            setAvgOutTime("00:00");
            return;
        }

        let totalInTime = 0;
        let totalOutTime = 0;
        let totalRecords = 0;

        attendanceData.forEach((attendance) => {
            if (attendance.punchInTime && attendance.punchOutTime) {
                const punchInTime = new Date(attendance.punchInTime);
                const punchOutTime = new Date(attendance.punchOutTime);

                // Calculate time difference for in and out times
                const punchInMinutes = punchInTime.getHours() * 60 + punchInTime.getMinutes();
                const punchOutMinutes = punchOutTime.getHours() * 60 + punchOutTime.getMinutes();

                totalInTime += punchInMinutes;
                totalOutTime += punchOutMinutes;
                totalRecords++;
            }
        });

        if (totalRecords === 0) {
            setAvgInTime("00:00");
            setAvgOutTime("00:00");
            return;
        }

        // Calculate average times in minutes
        const avgInMinutes = totalInTime / totalRecords;
        const avgOutMinutes = totalOutTime / totalRecords;

        // Convert minutes back to hours and minutes
        const avgInHours = Math.floor(avgInMinutes / 60);
        const avgInRemainderMinutes = Math.round(avgInMinutes % 60);

        const avgOutHours = Math.floor(avgOutMinutes / 60);
        const avgOutRemainderMinutes = Math.round(avgOutMinutes % 60);
        // Convert the hours and minutes to 12-hour format with AM/PM
        const formattedAvgInTime = convertTo12HourFormat(avgInHours, avgInRemainderMinutes);
        console.log('avg in time:', avgInTime);
        const formattedAvgOutTime = convertTo12HourFormat(avgOutHours, avgOutRemainderMinutes);
        console.log('avg out time:', avgOutTime);

        // Update the state for in and out times
        setAvgInTime(formattedAvgInTime);
        setAvgOutTime(formattedAvgOutTime);
    };

    const convertTo12HourFormat = (hours, minutes) => {
        const period = hours >= 12 ? 'PM' : 'AM';
        let displayHours = hours % 12;
        displayHours = displayHours === 0 ? 12 : displayHours; // Convert 0 hours to 12

        const displayMinutes = minutes.toString().padStart(2, '0');
        return `${displayHours}:${displayMinutes} ${period}`;
    };

    return (
        <div className='container-fluid'>
            <div className=" d-flex justify-content-between align-items-center" style={{ flexDirection: "row-reverse" }}>
        <div className="icons-list">
          <Breadcrumb />
          { roleBasedSection === "ADMIN" ? (
            <div>
              <button type="button" className="primary-btn" 
             onClick={()=> navigate("/admin/EmployeeAttendance")}
              >My Attendance</button>
            </div>
          ) : "" }
        </div>
      </div>
            <div className='row clearfix'>
                {/* timer-block */}
                <div className='col-md-12'>
                    <div className='attendance-container'>
                        <div className='attendance-box'>
                            <div className='col-md-3 average-working-hrs'>
                                <div className='avg-working-hr-icon-container'>
                                    <img src={require("assets/img/working-hr-icon.png")} alt="..." className='avg-working-hr-icon' />
                                </div>
                                <h4 className='avg-working-hr-time'>{avgWorkingHrs}</h4>
                                <h5 className='avg-working-hr-heading'>Average Working Hour</h5>
                            </div>
                            <div className='col-md-3 average-working-hrs'>
                                <div className='avg-in-time-icon-container'>
                                    <img src={require("assets/img/avg-in-time-icon.png")} alt="..." className='avg-working-hr-icon' />
                                </div>
                                <h4 className='avg-working-hr-time'>{avgInTime}</h4>
                                <h5 className='avg-working-hr-heading'>Average In Time</h5>
                            </div>
                            <div className='col-md-3 average-working-hrs'>
                                <div className='avg-out-time-icon-container'>
                                    <img src={require("assets/img/avg-out-time-icon.png")} alt="..." className='avg-out-time-working-hr-icon' />
                                </div>
                                <h4 className='avg-working-hr-time'>{avgOutTime}</h4>
                                <h5 className='avg-working-hr-heading'>Average Out Time</h5>
                            </div>
                            <div className='col-md-3 average-working-hrs'>
                                <div className='avg-brk-time-icon-container'>
                                    <img src={require("assets/img/break-time-icon.png")} alt="..." className='avg-working-hr-icon' />
                                </div>
                                {allAttendance.length > 0 && allAttendance.some(record => Object.keys(record).length > 0) ? (
                                    <h4 className='avg-working-hr-time'>01:00</h4>
                                ) : (<h4 className='avg-working-hr-time'>00:00</h4>)}
                                <h5 className='avg-working-hr-heading'>Average Break Time</h5>
                            </div>
                        </div>

                        {/* table part */}
                        {allAttendance.length > 0 ? (
                            <div className='attendance-table-container'>
                                <table className='attendance-table'>
                                    <thead>
                                        <tr>
                                            <th>Employee Name (ID)</th>
                                            <th>Date</th>
                                            <th>Time In</th>
                                            <th>Time Out</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allAttendance.map((attendanceList, index) => (
                                            <tr key={index}>
                                                <td>{attendanceList.userName ? attendanceList.userName.charAt(0).toUpperCase() + attendanceList.userName.slice(1) : 'Unknown user'} (562365)</td>
                                                <td>{new Date(attendanceList.punchInTime)
                                                    .toLocaleDateString("en-GB", {
                                                        year: "numeric",
                                                        month: "2-digit",
                                                        day: "2-digit",
                                                    })
                                                    .split("/")
                                                    .join("-")}</td>
                                                <td>{new Date(attendanceList.punchInTime)
                                                    .toLocaleTimeString("en-US", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                    })}</td>
                                                <td>
                                                    {attendanceList.punchOutTime
                                                        ? new Date(attendanceList.punchOutTime).toLocaleTimeString("en-US", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: true,
                                                        })
                                                        : "missed"}
                                                </td>
                                                <td>
                                                    <span className='attendance-status-present'>Present</span></td>
                                                <td>
                                                    <button type="button" class="btn btn-icon btn-sm icons" title="Edit" fdprocessedid="tvsb17">
                                                        <GrEdit className='edit-icon' onClick={() => handleEditAttendanceClick(attendanceList)} />
                                                    </button>
                                                </td>
                                            </tr>))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="no-records-found text-center">
                                <p>No Attendance record found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
