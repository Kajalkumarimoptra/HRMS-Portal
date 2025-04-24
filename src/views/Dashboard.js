import React, { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// react-bootstrap components
import { Badge, Button, Card, Navbar, Nav, Table, Container, Row, Col, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';
import { useHolidayListContext } from "components/ContextProvider/HolidayListContext";
import { useFormContext } from "components/ContextProvider/Context";
import Banner from "./Banner";

function Dashboard({ role }) {
  const navigate = useNavigate();
  const [roleBasedSection, setRoleBasedSection] = useState(null);
  const [userNameForShowOnDashboard, setUserNameForShowOnDashboard] = useState(null); // for storing the user name
  const [getGreeting, setGetGreeting] = useState(''); // to store greeting msg
  const [getLoginTime, setGetLoginTime] = useState(''); // to store login time
  const holidays = useHolidayListContext(); // Get holiday data from context
  const [time, setTime] = useState(0); // to initiate timer
  const [punchState, setPunchState] = useState("punchin");
  const [selectedWorkMode, setSelectedWorkMode] = useState("office"); // for tracking work mode
  const intervalRef = useRef(null);

  useEffect(() => {
    // Directly read the role from localStorage
    const storedRole = localStorage.getItem("role");
    setRoleBasedSection(storedRole);
    console.log("Role for conditional rendering of attendance page:", storedRole);
  }, []);

  // extract role for conditional rendering of attendance
  useEffect(() => {
    const getUserNameForShowOnDashboard = localStorage.getItem('name');
    if (getUserNameForShowOnDashboard) {
      const capitalizedUserName = getUserNameForShowOnDashboard.charAt(0).toUpperCase() + getUserNameForShowOnDashboard.slice(1);
      setTimeout(() => {
        setUserNameForShowOnDashboard(capitalizedUserName);
      }, 0);
    }
    console.log('Fetched user name from localStorage:', getUserNameForShowOnDashboard);
  }, []);


  // to get upcoming holiday
  const nextHoliday = useMemo(() => {
    const today = new Date();
    const currentYear = today.getFullYear();

    // Convert Holiday Dates into Full Date Objects
    const upcoming = holidays.map((holiday) => {
      const [monthStr, day] = holiday.date.split(" ");
      const monthIndex = new Date(`${monthStr} 1, ${currentYear}`).getMonth(); // Uses new Date(${monthStr} 1, ${currentYear}) to get the month index.
      return {
        ...holiday,
        fullDate: new Date(currentYear, monthIndex, parseInt(day)) // Creates a fullDate object
      };
    }).filter((holiday) => holiday.fullDate >= today) // Removes holidays that have already passed (compares fullDate with today)
      .sort((a, b) => a.fullDate - b.fullDate); // Sort Holidays by Date (Closest First)

    return upcoming.length > 0 ? upcoming[0] : null;
  }, [holidays]);

  // Handle work mode selection
  const handleWorkMode = (e) => {
    setSelectedWorkMode(e.target.value);
  };

  useEffect(() => {
    const punchInTime = localStorage.getItem("punchInTime");
    const punchOutTime = localStorage.getItem("punchOutTime");
    const storedElapsedTime = localStorage.getItem("elapsedTime");

    if (punchOutTime) {
      setTime(0); // Reset time when punch out exists
    }

    if (punchInTime && !punchOutTime) {
      const punchInTimestamp = new Date(punchInTime).getTime();
      const elapsedTime = Math.floor((Date.now() - punchInTimestamp) / 1000);

      setTime(storedElapsedTime ? parseInt(storedElapsedTime) : elapsedTime);

      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setTime((prevTime) => {
            const newTime = prevTime + 1;
            localStorage.setItem("elapsedTime", newTime);
            return newTime;
          });
        }, 1000);
      }

      // Check if the punch-in button should be disabled on the next day
      setPunchState("punchout"); // User is punched in, show Punch Out
    } else if (punchOutTime) {
      const punchOutDate = new Date(punchOutTime);
      const currentDate = new Date();

      const punchOutDay = punchOutDate.toISOString().split("T")[0];
      const currentDay = currentDate.toISOString().split("T")[0];

      if (currentDay > punchOutDay) {
        setPunchState("punchin"); // Reset button to Punch In
        localStorage.removeItem("punchInTime");
        localStorage.removeItem("punchOutTime");
        localStorage.removeItem("elapsedTime");
      } else {
        setPunchState("punchout"); // Keep Punch Out button
      }
    }

    // Function to check if the day has changed
    const checkForNewDay = () => {
      const currentDate = new Date().toISOString().split("T")[0];
      const lastPunchDate = localStorage.getItem("lastPunchDate");

      if (lastPunchDate !== currentDate) {
        setPunchState("punchin");
        localStorage.removeItem("punchInTime");
        localStorage.removeItem("punchOutTime");
        localStorage.removeItem("elapsedTime");
        localStorage.setItem("lastPunchDate", currentDate);
      }
    };

    const dayCheckInterval = setInterval(checkForNewDay, 60000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      clearInterval(dayCheckInterval);
    };
  }, []);


  // Format time as HH:MM:SS
  const formatTime = (seconds) => {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
      return '00:00:00';  // Return a default value for invalid input
    }

    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  // Use memoization to prevent unnecessary function calls
  const formattedTime = useMemo(() => formatTime(time), [time]);

  // to handle punch time
  const handlePunchIn = async (data) => {

    // if (!selectedWorkMode) {
    //   alert("Please select Work Mode before punching in.");
    //   return;
    // }

    localStorage.setItem("WorkMode", selectedWorkMode || "office"); // Store work mode

    // Extract the stored values
    const storedWorkMode = localStorage.getItem("WorkMode");
    const storedUserId = localStorage.getItem("userid");
    const storedUserName = localStorage.getItem("name");

    // Convert work mode to boolean (WFH = true, WFO = false)
    const isWFH = storedWorkMode === "home" ? true : false;

    const newPayload = {
      "userId": storedUserId,
      "wfh": isWFH,
      "userName": storedUserName
    }
    console.log('new payload is:', newPayload);

    try {
      // Retrieve the token from sessionStorage
      const token = localStorage.getItem('token');
      console.log('token needed:', token);
      if (!token) {
        return; // Exit if token is not found
      }

      const response = await axios.post('http://localhost:8081/api/attendance/punchIn', newPayload, {

        headers: {
          'Authorization': `Bearer ${token}`
        },

      });

      if (response && response.data) {
        console.log("Form submitted successfully:", response.data);
        setPunchState("punchout");
        localStorage.setItem("punchState", "punchout");
        setTime(0); // Start timer from 0
        localStorage.setItem("elapsedTime", 0);
        localStorage.setItem('punchInTime', response.data.data.punchInTime); // Store the punchin tme in localStorage

        const storedPunchInTime = localStorage.getItem("punchInTime"); // Correct key
        if (storedPunchInTime) {
          console.log('Raw stored punch-in time:', storedPunchInTime); // Debugging

          // Fix: Ensure milliseconds are stripped before parsing
          const sanitizedTime = storedPunchInTime.split(".")[0];
          const date = new Date(sanitizedTime);

          if (!isNaN(date.getTime())) { // Ensure valid date
            const formattedTime = date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            setGetLoginTime(formattedTime); // Update state with formatted time
            console.log('Formatted logged-in time:', formattedTime);
          } else {
            console.error('Invalid date:', storedPunchInTime);
          }
        }

        // Start the timer only if it’s not already running
        if (!intervalRef.current) {
          intervalRef.current = setInterval(() => {
            setTime((prevTime) => {
              const newTime = prevTime + 1;
              localStorage.setItem("elapsedTime", newTime);
              return newTime;
            });
          }, 1000);
        }

      } else {
        // Handle the 403 Forbidden error
        if (response.status === 403) {
          console.error("403 Forbidden error: ", response.data.message || "Access Denied");
        } else {
          console.error("Error submitting form. Status:", response.status);
          console.error("Error details:", response.data);
        }
      }
    } catch (error) {
      console.error("API Error:", error);

      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;

        if (errorMessage.includes("Today This User Already PunchIn")) {
          console.log("User already punched in");
          alert('You are already punched in');
        } else {
          console.log('Other error:', errorMessage);
        }
      } else {
        console.log('server error:', error);
      }
    }
  }

  // Punch Out Button Click
  const handlePunchOut = async (data) => {

    // Extract the stored values
    const storedUserId = localStorage.getItem("userid");

    const newPayload = {
      "userId": storedUserId
    }
    console.log('new payload is:', newPayload);

    try {
      // Retrieve the token from sessionStorage
      const token = localStorage.getItem('token');
      console.log('token needed:', token);
      if (!token) {
        return; // Exit if token is not found
      }

      const response = await axios.post('http://localhost:8081/api/attendance/punchOut', newPayload, {

        headers: {
          'Authorization': `Bearer ${token}`
        },

      });

      if (response && response.data) {
        console.log("Form submitted successfully:", response.data);
        // Convert punchOutTime to local time and store
        const punchOutTime = new Date(response.data.data.punchOutTime);
        localStorage.setItem('punchOutTime', punchOutTime.toISOString());
        setSelectedWorkMode("office");

        // Stop the timer
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        localStorage.removeItem("elapsedTime");
        setTime(0); // Reset Timer
      } else {
        // Handle the 403 Forbidden error
        if (response.status === 403) {
          console.error("403 Forbidden error: ", response.data.message || "Access Denied");
        } else {
          console.error("Error submitting form. Status:", response.status);
          console.error("Error details:", response.data);
        }
      }
    } catch (error) {
      console.error("API Error:", error);

      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;

        if (errorMessage.includes("User already punched out")) {
          console.log("User already punched out");
          alert('You are already punched out');
        } else {
          console.log('Other error:', errorMessage);
        }
      } else {
        console.log('server error:', error);
      }
    }
  };

  // first bar graph details
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  // second pie chart details
  const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const data02 = [
    { name: 'A1', value: 100 },
    { name: 'A2', value: 300 },
    { name: 'B1', value: 100 },
    { name: 'B2', value: 80 },
    { name: 'B3', value: 40 },
    { name: 'B4', value: 30 },
    { name: 'B5', value: 50 },
    { name: 'C1', value: 100 },
    { name: 'C2', value: 200 },
    { name: 'D1', value: 150 },
    { name: 'D2', value: 50 },
  ];

  // third  mixed bar graph
  const data03 = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  useEffect(() => {
    const getGreetingMsg = localStorage.getItem('greetingMessage');
    setGetGreeting(getGreetingMsg);
  }, []);

  useEffect(() => {
    const storedPunchInTime = localStorage.getItem("punchInTime"); // Correct key

    if (storedPunchInTime) {
      console.log('Raw stored punch-in time:', storedPunchInTime); // Debugging

      // Fix: Ensure milliseconds are stripped before parsing
      const sanitizedTime = storedPunchInTime.split(".")[0];
      const date = new Date(sanitizedTime);

      if (!isNaN(date.getTime())) { // Ensure valid date
        const formattedTime = date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        setGetLoginTime(formattedTime); // Update state with formatted time
        console.log('Formatted logged-in time:', formattedTime);
      } else {
        console.error('Invalid date:', storedPunchInTime);
      }
    }
  }, [punchState]);


  useEffect(() => {
    if (localStorage.getItem("lastPunchDate") !== new Date().toISOString().split("T")[0]) {
      console.log("Resetting Punch State due to date change...");
      setPunchState("punchin");
      localStorage.removeItem("punchInTime");
      localStorage.removeItem("punchOutTime");
      localStorage.removeItem("elapsedTime");
      localStorage.setItem("lastPunchDate", new Date().toISOString().split("T")[0]);
    }
  }, []);

  return (
    <>
      <Container fluid style={{ marginBottom: '30px' }}>
        <Row style={{ marginTop: '-22px', marginBottom: '20px', alignItems: 'center' }}>
          <Col md="8">
            <h3 data-search-item style={{ color: "#2c2945", fontWeight: "500", lineHeight: "1.2", fontSize: '20px' }}>{getGreeting}, {userNameForShowOnDashboard}! </h3>
            {punchState === "punchout" && <h5>Logged in at {getLoginTime}</h5>}
          </Col>
        </Row>
        {/* header blocks part */}
        <div class="row clearfix">
          <div class="col-6 col-md-4 col-xl-2">
            <div class="card">
              <div class="card-body ribbon">
                <a class="sort-cut text-muted" href="/admin/Users" style={{ position: 'relative' }}><i class="fa fa-users" aria-hidden="true"></i><span>Users</span>
                </a>

              </div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl-2">
            <div class="card">
              <div class="card-body"><a class="sort-cut text-muted" href="/admin/Holidays"><i class="fa fa-thumbs-up" aria-hidden="true"></i><span>Holidays</span></a>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl-2">
            <div class="card">
              <div class="card-body ribbon">
                <a class="sort-cut text-muted" href="/admin/Events" style={{ position: 'relative' }}><i class="fa fa-calendar" aria-hidden="true"></i><span>Events</span>
                  {/* <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill events-ribbon-box">
                    8+
                  </span> */}
                </a>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl-2">
            <div class="card">
              <div class="card-body">
                {roleBasedSection === "SUPER_ADMIN" || roleBasedSection === "ADMIN" ? (
                  <a class="sort-cut text-muted" href="/admin/Report"><i class="fas fa-chart-pie" aria-hidden="true"></i>
                    <span>Report</span></a>
                ) : (
                  <a class="sort-cut text-muted" href="/admin/EmployeeReport"><i class="fas fa-chart-pie" aria-hidden="true"></i>
                    <span>Report</span></a>
                )}
              </div>
            </div>
          </div>
          {roleBasedSection === "ADMIN" || roleBasedSection === "EMPLOYEE" ? (
            <div class="col-6 col-md-4 col-xl-4">
              <div className="card">
                <div className="punch-container">
                  <div className="timer">
                    <h5>Employee Punch System</h5>
                    <img src={require("assets/img/timer-icon.png")} alt="..." className="timer-icon" />
                    <button className="timer-btn">{formattedTime}</button>

                    <div className="work-mode">
                      {/* <label htmlFor="workMode">Work Mode :</label> */}
                      <select
                        id="workMode"
                        value={selectedWorkMode}
                        onChange={handleWorkMode}
                      >
                        <option value="office">Office</option>
                        <option value="home">Remote</option>
                      </select>
                      {/* <label>
                        <input type="radio" name="workMode" value="office" className="work-radio" checked={selectedWorkMode === "office"} onChange={(e) => handleWorkMode(e)} />
                        Office
                      </label>
                      <label>
                        <input type="radio" name="workMode" value="home" className="work-radio" checked={selectedWorkMode === "home"} onChange={(e) => handleWorkMode(e)} />
                        Remote
                      </label> */}
                    </div>
                  </div>
                  <div className="punchin-btn-container">
                    {punchState === "punchin" && <button onClick={() => handlePunchIn()} className="punchin-btn">Punch In</button>}
                    {punchState === "punchout" && <button onClick={() => handlePunchOut()} className="punchout-btn">Punch Out</button>}
                  </div>
                </div>
              </div>
            </div>
          ) : ""
          }

        </div>
        {/* graph part */}
        <div className="graph-container">
          <Row>
            <Col md="8">
              <Card className="graph-card" style={{ height: '412px' }}>
                <Card.Header>
                  <Card.Title as="h4" className="graph-heading">SALARY STATISTICS</Card.Title>
                  <p className="card-category">24 Hours performance</p>
                </Card.Header>
                <Card.Body>
                  <div className="ct-chart" id="chartHours">

                    {/* first bar graph */}
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tick={false} /> {/* This hides the numbers on the Y-axis */}
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" stackId="a" fill="#AFE1AF" />
                        <Bar dataKey="uv" stackId="a" fill="#E6E6F8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* quick launch */}
            {roleBasedSection === "ADMIN" ? (
              <Col md="4">
                <div className="quick-launch-container">
                  <div className="card-header" style={{ backgroundColor: '#fff' }}>
                    <div className="quick-launch-header-container">
                      <div className="quick-launch-header">
                        <img src={require("assets/img/spark-icon.png")} alt="..." className="spark-icon" />
                        <p className="oxd-text oxd-text--p">Quick Launch</p>
                      </div>
                    </div>
                    <hr className="oxd-divider" role="separator" aria-orientation="horizontal" style={{ marginTop: '-8px' }} />
                    <div className="diffTabs">
                      <div className="firstColumn">
                        <div className="assign-leave-container">
                          <a className="sort-cut" href="/admin/Applyleave" style={{ color: "#2c2945" }}>
                            <button className="assign-leave-btn" type="button" title="Assign Leave">
                              <img src={require("assets/img/applyleave-icon.png")} alt="..." className="quick-links-icon" />
                            </button>
                            <div className="orangehrm-quick-launch-heading" title="Assign Leave">
                              <p className="tabs-heading">Apply Leave</p>
                            </div>
                          </a>
                        </div>
                        <div className="assign-leave-container">
                          <a className="sort-cut" href="/admin/Leaves" style={{ color: "#2c2945" }}>
                            <button className="assign-leave-btn" type="button" title="Leave List">
                              <img src={require("assets/img/leavelist-icon.png")} alt="..." className="quick-links-leavelist-icon" />
                            </button>
                            <div className="orangehrm-quick-launch-heading" title="Leave List">
                              <p className="tabs-heading" >Leaves</p>
                            </div>
                          </a>
                        </div>
                        <div className="assign-leave-container">
                          {roleBasedSection === "SUPER_ADMIN" || roleBasedSection === "ADMIN" ? (
                            <a className="sort-cut" href="/admin/Attendance" style={{ color: "#2c2945" }}>
                              <button className="assign-leave-btn" type="button" title="Timesheets">
                                <img src={require("assets/img/attendance-icon.png")} alt="..." className="quick-links-timesheet-icon" />
                              </button>
                              <div className="orangehrm-quick-launch-heading" title="Timesheets">
                                <p className="tabs-heading">Attendance</p>
                              </div>
                            </a>
                          ) : (
                            <a className="sort-cut" href="/admin/EmployeeAttendance" style={{ color: "#2c2945" }}>
                              <button className="assign-leave-btn" type="button" title="Timesheets">
                                <img src={require("assets/img/attendance-icon.png")} alt="..." className="quick-links-timesheet-icon" />
                              </button>
                              <div className="orangehrm-quick-launch-heading" title="Timesheets">
                                <p className="tabs-heading">Attendance</p>
                              </div>
                            </a>
                          )}
                        </div>

                      </div>
                      <div className="secondColumn">
                        <div className="assign-leave-container" style={{ position: 'relative', left: '36px' }}>
                          <a className="sort-cut" href="/admin/Dashboard" style={{ color: "#2c2945" }}>
                            <button className="assign-leave-btn" type="button" title="Assign Leave" style={{position:'relative', left: '11px'}}>
                              <img src={require("assets/img/training-icon.png")} alt="..." className="quick-links-icon" />
                            </button>
                            <div className="orangehrm-quick-launch-heading" title="Assign Leave">
                              <p className="tabs-heading" style={{position: 'relative', left: '-11px'}}>Assign Trainings</p>
                            </div>
                          </a>
                        </div>
                        {roleBasedSection === "SUPER_ADMIN" || roleBasedSection === "ADMIN" ? (
                           <div className="assign-leave-container" style={{ position: 'relative', left: '17px' }}>
                           <a className="sort-cut" href="/admin/PendingRequest" style={{ color: "#2c2945" }}>
                             <button className="assign-leave-btn" type="button" title="Assign Leave" style={{ position: 'relative', right: '-10px' }}>
                               <img src={require("assets/img/pendingrequest-icon.png")} alt="..." className="quick-links-icon" />
                             </button>
                             <div className="orangehrm-quick-launch-heading" title="Assign Leave">
                               <p className="tabs-heading" style={{position:'relative', Left: '-9px' }}>Pending Request</p>
                             </div>
                           </a>
                         </div> )
                         : (
                          <div className="assign-leave-container" style={{ position: 'relative', left: '21px' }}>
                          <a className="sort-cut" href="/admin/AssetRequest" style={{ color: "#2c2945" }}>
                            <button className="assign-leave-btn" type="button" title="Assign Leave">
                              <img src={require("assets/img/pendingrequest-icon.png")} alt="..." className="quick-links-icon" />
                            </button>
                            <div className="orangehrm-quick-launch-heading" title="Assign Leave">
                              <p className="tabs-heading" style={{ marginLeft: '-12px' }}>Asset Request</p>
                            </div>
                          </a>
                        </div>
                         )}  
                        <div className="assign-leave-container" style={{ position: 'relative', left: '-19px' }}>
                          <a className="sort-cut" href="/admin/Policies" style={{ color: "#2c2945" }}>
                            <button className="assign-leave-btn" type="button" title="Assign Leave">
                              <img src={require("assets/img/policies-icon.png")} alt="..." className="quick-links-icon" />
                            </button>
                            <div className="orangehrm-quick-launch-heading" title="Assign Leave">
                              <p className="tabs-heading" style={{ marginLeft: '9px' }}>Policies</p>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="thirdColumn">
                        {/* <div className="assign-leave-container">
                        <button className="assign-leave-btn" type="button" title="Assign Leave">
                        <img src={require("assets/img/pendingrequest-icon.png")} alt="..." className="quick-links-icon" />
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 500 500" role="presentation" className="apply-leave-icon">
                            <g fill="currentColor">
                              <path data-v-bddebfba="" class="cls-1" d="M 166.539 200.601 C 199 163.911 244 139.623 293.462 132.107 C 317.616 57.281 248.577 -14.694 169.154 2.596 C 89.731 19.85 59.5 113.41 114.77 170.982 C 128.693 185.496 146.654 195.751 166.539 200.601 Z M 115.385 333.148 C 115.385 300.974 123.308 269.281 138.462 240.588 L 57.693 240.588 C 25.846 240.588 0 265.468 0 296.124 L 0 314.636 C 0 381.279 59.616 449.774 162.308 462.732 C 131.616 426.041 115.039 380.243 115.385 333.148 Z M 500 333.148 C 500 461.4 355.77 541.557 240.385 477.431 C 125 413.305 125 252.991 240.385 188.865 C 266.693 174.24 296.539 166.539 326.923 166.539 C 422.616 166.354 500.231 241.069 500 333.148 Z M 417.308 346.106 C 418.923 344.366 420.231 342.367 421.154 340.182 C 421.731 337.887 421.731 335.48 421.154 333.148 C 421.731 330.852 421.731 328.446 421.154 326.113 C 420.346 323.818 418.885 321.744 416.923 320.189 L 340 246.141 C 329.654 236.182 311.962 240.736 308.154 254.361 C 306.385 260.692 308.27 267.43 313.077 272.058 L 357.308 314.636 L 250 314.636 C 235.193 314.636 225.962 330.075 233.346 342.404 C 236.77 348.143 243.116 351.66 250 351.66 L 357.308 351.66 L 313.462 394.238 C 303.116 404.234 307.846 421.265 322 424.894 C 328.577 426.597 335.577 424.783 340.385 420.155 L 417.308 346.106 Z"></path>
                            </g>
                          </svg>
                        </button>
                        <div className="orangehrm-quick-launch-heading" title="Assign Leave">
                          <p className="tabs-heading">Pending Request</p>
                        </div>
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* updated holidays section */}
                <div className="quick-launch-container">
                  <div className="card-header" style={{ backgroundColor: '#0000ff3d', color: 'white' }}>
                    <div className="quick-launch-header-container">
                      <div className="upcoming-holiday-header">
                        <img src={require("assets/img/congratulation-icon.png")} alt="..." className="congrats-icon" />
                        <p className="upcoming-holiday-heading">Upcoming Holiday</p>
                      </div>
                    </div>
                    <hr className="oxd-divider" role="separator" aria-orientation="horizontal" style={{ marginTop: '-8px' }} />
                    {nextHoliday ? <div className="upcomingHoliday"><div>{nextHoliday.date}</div>  <div>{nextHoliday.name}</div> <div className="arrow-icon"> <img src={require("assets/img/forward-arrow-icon.png")} alt="..." onClick={() => navigate('/admin/Holidays')} /></div> </div>
                      : <p className="noUpcomingHoliday">No Upcoming Holiday</p>
                    }
                  </div>
                </div>
                 {/* updated birthday section */}
              <div className="quick-launch-container">
                <div className="card-header" style={{ backgroundColor: '#0000ff3d', color: 'white' }}>
                  <div className="quick-launch-header-container">
                    <div className="upcoming-holiday-header">
                      <img src={require("assets/img/birthday-icon.png")} alt="..." className="congrats-icon" />
                      <p className="upcoming-holiday-heading">Today's Shubham Birthday</p>
                    </div>
                  </div>
                  <hr className="oxd-divider" role="separator" aria-orientation="horizontal" style={{ marginTop: '-8px' }} />
                  <div className="upcomingHoliday">
                    <div>
                      <img src="/static/media/profile-img.322c845998206fafacd2.webp" alt="bday-user" style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #ddd'
                      }} />
                    </div>
                    <div className="birthday-post">
                      <form>
                        <div className="textarea-wrapper">
                          <textarea rows="4" cols="29" value="Wishing a very Happy Birthday to Shubham Singh! 🎉" >
                          </textarea>
                        </div>
                        <div>
                          <button className="post-btn" type="button" >Post</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              </Col>
            ) : roleBasedSection === "SUPER_ADMIN" ? (
              <Col md="4" style={{ marginTop: '-149px' }}>
                <div className="quick-launch-container">
                  <div className="card-header" style={{ backgroundColor: '#fff' }}>
                    <div className="quick-launch-header-container">
                      <div className="quick-launch-header">
                        <img src={require("assets/img/spark-icon.png")} alt="..." className="spark-icon" />
                        <p className="oxd-text oxd-text--p">Quick Launch</p>
                      </div>
                    </div>
                    <hr className="oxd-divider" role="separator" aria-orientation="horizontal" style={{ marginTop: '-8px' }} />
                    <div className="diffTabs">
                      <div className="firstColumn">
                        <div className="assign-leave-container">
                          <a className="sort-cut" href="/admin/Leaves" style={{ color: "#2c2945" }}>
                            <button className="assign-leave-btn" type="button" title="Leave List">
                              <img src={require("assets/img/leavelist-icon.png")} alt="..." className="quick-links-leavelist-icon" />
                            </button>
                            <div className="orangehrm-quick-launch-heading" title="Leave List">
                              <p className="tabs-heading" >Leaves</p>
                            </div>
                          </a>
                        </div>
                        <div className="assign-leave-container" style={{ position: 'relative', right:'-29px'}}>
                          {roleBasedSection === "SUPER_ADMIN" || roleBasedSection === "ADMIN" ? (
                            <a className="sort-cut" href="/admin/Attendance" style={{ color: "#2c2945" }}>
                              <button className="assign-leave-btn" type="button" title="Timesheets">
                                <img src={require("assets/img/attendance-icon.png")} alt="..." className="quick-links-timesheet-icon" />
                              </button>
                              <div className="orangehrm-quick-launch-heading" title="Timesheets">
                                <p className="tabs-heading" style={{position: 'relative', left: '-6px'}}>Attendance</p>
                              </div>
                            </a>
                          ) : (
                            <a className="sort-cut" href="/admin/EmployeeAttendance" style={{ color: "#2c2945" }}>
                              <button className="assign-leave-btn" type="button" title="Timesheets">
                                <img src={require("assets/img/attendance-icon.png")} alt="..." className="quick-links-timesheet-icon" />
                              </button>
                              <div className="orangehrm-quick-launch-heading" title="Timesheets">
                                <p className="tabs-heading" style={{position: 'relative', left: '-6px'}}>Attendance</p>
                              </div>
                            </a>
                          )}
                        </div>
                        <div className="assign-leave-container" style={{ position: 'relative', left: '22px' }}>
                          <a className="sort-cut" href="/admin/Dashboard" style={{ color: "#2c2945" }}>
                            <button className="assign-leave-btn" type="button" title="Assign Leave" style={{position: 'relative', left: '20px'}}>
                              <img src={require("assets/img/training-icon.png")} alt="..." className="quick-links-icon" />
                            </button>
                            <div className="orangehrm-quick-launch-heading" title="Assign Leave">
                              <p className="tabs-heading">Assign Trainings</p>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="secondColumn">
                        <div className="assign-leave-container" style={{ position: 'relative', left: '-6px' }}>
                          <a className="sort-cut" href="/admin/PendingRequest" style={{ color: "#2c2945" }}>
                            <button className="assign-leave-btn" type="button" title="Assign Leave">
                              <img src={require("assets/img/pendingrequest-icon.png")} alt="..." className="quick-links-icon" />
                            </button>
                            <div className="orangehrm-quick-launch-heading" title="Assign Leave">
                              <p className="tabs-heading" style={{ marginLeft: '-21px' }}>Pending Request</p>
                            </div>
                          </a>
                        </div>
                        <div className="assign-leave-container" style={{ position: 'relative', left: '-67px' }}>
                          <a className="sort-cut" href="/admin/Policies" style={{ color: "#2c2945" }}>
                            <button className="assign-leave-btn" type="button" title="Assign Leave">
                              <img src={require("assets/img/policies-icon.png")} alt="..." className="quick-links-icon" />
                            </button>
                            <div className="orangehrm-quick-launch-heading" title="Assign Leave">
                              <p className="tabs-heading" style={{ marginLeft: '9px' }}>Policies</p>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="thirdColumn">
                        {/* <div className="assign-leave-container">
                        <button className="assign-leave-btn" type="button" title="Assign Leave">
                        <img src={require("assets/img/pendingrequest-icon.png")} alt="..." className="quick-links-icon" />
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 500 500" role="presentation" className="apply-leave-icon">
                            <g fill="currentColor">
                              <path data-v-bddebfba="" class="cls-1" d="M 166.539 200.601 C 199 163.911 244 139.623 293.462 132.107 C 317.616 57.281 248.577 -14.694 169.154 2.596 C 89.731 19.85 59.5 113.41 114.77 170.982 C 128.693 185.496 146.654 195.751 166.539 200.601 Z M 115.385 333.148 C 115.385 300.974 123.308 269.281 138.462 240.588 L 57.693 240.588 C 25.846 240.588 0 265.468 0 296.124 L 0 314.636 C 0 381.279 59.616 449.774 162.308 462.732 C 131.616 426.041 115.039 380.243 115.385 333.148 Z M 500 333.148 C 500 461.4 355.77 541.557 240.385 477.431 C 125 413.305 125 252.991 240.385 188.865 C 266.693 174.24 296.539 166.539 326.923 166.539 C 422.616 166.354 500.231 241.069 500 333.148 Z M 417.308 346.106 C 418.923 344.366 420.231 342.367 421.154 340.182 C 421.731 337.887 421.731 335.48 421.154 333.148 C 421.731 330.852 421.731 328.446 421.154 326.113 C 420.346 323.818 418.885 321.744 416.923 320.189 L 340 246.141 C 329.654 236.182 311.962 240.736 308.154 254.361 C 306.385 260.692 308.27 267.43 313.077 272.058 L 357.308 314.636 L 250 314.636 C 235.193 314.636 225.962 330.075 233.346 342.404 C 236.77 348.143 243.116 351.66 250 351.66 L 357.308 351.66 L 313.462 394.238 C 303.116 404.234 307.846 421.265 322 424.894 C 328.577 426.597 335.577 424.783 340.385 420.155 L 417.308 346.106 Z"></path>
                            </g>
                          </svg>
                        </button>
                        <div className="orangehrm-quick-launch-heading" title="Assign Leave">
                          <p className="tabs-heading">Pending Request</p>
                        </div>
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* updated holidays section */}
                <div className="quick-launch-container">
                  <div className="card-header" style={{ backgroundColor: '#0000ff3d', color: 'white' }}>
                    <div className="quick-launch-header-container">
                      <div className="upcoming-holiday-header">
                        <img src={require("assets/img/congratulation-icon.png")} alt="..." className="congrats-icon" />
                        <p className="upcoming-holiday-heading">Upcoming Holiday</p>
                      </div>
                    </div>
                    <hr className="oxd-divider" role="separator" aria-orientation="horizontal" style={{ marginTop: '-8px' }} />
                    {nextHoliday ? <div className="upcomingHoliday"><div>{nextHoliday.date}</div>  <div>{nextHoliday.name}</div> <div className="arrow-icon"> <img src={require("assets/img/forward-arrow-icon.png")} alt="..." onClick={() => navigate('/admin/Holidays')} /></div> </div>
                      : <p className="noUpcomingHoliday">No Upcoming Holiday</p>
                    }
                  </div>
                </div>
               
              {/* updated birthday section */}
              <div className="quick-launch-container">
                <div className="card-header" style={{ backgroundColor: '#0000ff3d', color: 'white' }}>
                  <div className="quick-launch-header-container">
                    <div className="upcoming-holiday-header">
                      <img src={require("assets/img/birthday-icon.png")} alt="..." className="congrats-icon" />
                      <p className="upcoming-holiday-heading">Today's Shubham Birthday</p>
                    </div>
                  </div>
                  <hr className="oxd-divider" role="separator" aria-orientation="horizontal" style={{ marginTop: '-8px' }} />
                  <div className="upcomingHoliday">
                    <div>
                      <img src="/static/media/profile-img.322c845998206fafacd2.webp" alt="bday-user" style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #ddd'
                      }} />
                    </div>
                    <div className="birthday-post">
                      <form>
                        <div className="textarea-wrapper">
                          <textarea rows="4" cols="29" value="Wishing a very Happy Birthday to Shubham Singh! 🎉" >
                          </textarea>
                        </div>
                        <div>
                          <button className="post-btn" type="button" >Post</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              </Col>
            ) : roleBasedSection === "EMPLOYEE" ? (
              <Col md="4">
              <div className="quick-launch-container">
                <div className="card-header" style={{ backgroundColor: '#fff' }}>
                  <div className="quick-launch-header-container">
                    <div className="quick-launch-header">
                      <img src={require("assets/img/spark-icon.png")} alt="..." className="spark-icon" />
                      <p className="oxd-text oxd-text--p">Quick Launch</p>
                    </div>
                  </div>
                  <hr className="oxd-divider" role="separator" aria-orientation="horizontal" style={{ marginTop: '-8px' }} />
                  <div className="diffTabs">
                    <div className="firstColumn">
                      <div className="assign-leave-container">
                        <a className="sort-cut" href="/admin/Applyleave" style={{ color: "#2c2945" }}>
                          <button className="assign-leave-btn" type="button" title="Assign Leave">
                            <img src={require("assets/img/applyleave-icon.png")} alt="..." className="quick-links-icon" />
                          </button>
                          <div className="orangehrm-quick-launch-heading" title="Assign Leave">
                            <p className="tabs-heading">Apply Leave</p>
                          </div>
                        </a>
                      </div>
                      <div className="assign-leave-container">
                        <a className="sort-cut" href="/admin/Leaves" style={{ color: "#2c2945" }}>
                          <button className="assign-leave-btn" type="button" title="Leave List">
                            <img src={require("assets/img/leavelist-icon.png")} alt="..." className="quick-links-leavelist-icon" />
                          </button>
                          <div className="orangehrm-quick-launch-heading" title="Leave List">
                            <p className="tabs-heading" >Leaves</p>
                          </div>
                        </a>
                      </div>
                      <div className="assign-leave-container">
                        {roleBasedSection === "SUPER_ADMIN" || roleBasedSection === "ADMIN" ? (
                          <a className="sort-cut" href="/admin/Attendance" style={{ color: "#2c2945" }}>
                            <button className="assign-leave-btn" type="button" title="Timesheets">
                              <img src={require("assets/img/attendance-icon.png")} alt="..." className="quick-links-timesheet-icon" />
                            </button>
                            <div className="orangehrm-quick-launch-heading" title="Timesheets">
                              <p className="tabs-heading">Attendance</p>
                            </div>
                          </a>
                        ) : (
                          <a className="sort-cut" href="/admin/EmployeeAttendance" style={{ color: "#2c2945" }}>
                            <button className="assign-leave-btn" type="button" title="Timesheets">
                              <img src={require("assets/img/attendance-icon.png")} alt="..." className="quick-links-timesheet-icon" />
                            </button>
                            <div className="orangehrm-quick-launch-heading" title="Timesheets">
                              <p className="tabs-heading">Attendance</p>
                            </div>
                          </a>
                        )}
                      </div>

                    </div>
                    <div className="secondColumn">
                      <div className="assign-leave-container" style={{ position: 'relative', left: '36px' }}>
                        <a className="sort-cut" href="/admin/Dashboard" style={{ color: "#2c2945" }}>
                          <button className="assign-leave-btn" type="button" title="Assign Leave">
                            <img src={require("assets/img/training-icon.png")} alt="..." className="quick-links-icon" />
                          </button>
                          <div className="orangehrm-quick-launch-heading" title="Assign Leave">
                            <p className="tabs-heading">Trainings</p>
                          </div>
                        </a>
                      </div>
                      {roleBasedSection === "SUPER_ADMIN" || roleBasedSection === "ADMIN" ? (
                         <div className="assign-leave-container" style={{ position: 'relative', left: '41px' }}>
                         <a className="sort-cut" href="/admin/PendingRequest" style={{ color: "#2c2945" }}>
                           <button className="assign-leave-btn" type="button" title="Assign Leave">
                             <img src={require("assets/img/pendingrequest-icon.png")} alt="..." className="quick-links-icon" />
                           </button>
                           <div className="orangehrm-quick-launch-heading" title="Assign Leave">
                             <p className="tabs-heading" style={{ marginLeft: '-21px' }}>Pending Request</p>
                           </div>
                         </a>
                       </div> )
                       : (
                        <div className="assign-leave-container" style={{ position: 'relative', left: '33px' }}>
                        <a className="sort-cut" href="/admin/AssetRequest" style={{ color: "#2c2945" }}>
                          <button className="assign-leave-btn" type="button" title="Assign Leave">
                            <img src={require("assets/img/pendingrequest-icon.png")} alt="..." className="quick-links-icon" />
                          </button>
                          <div className="orangehrm-quick-launch-heading" title="Assign Leave">
                            <p className="tabs-heading" style={{ marginLeft: '-12px' }}>Asset Request</p>
                          </div>
                        </a>
                      </div>
                       )}  
                      <div className="assign-leave-container" style={{ position: 'relative' }}>
                        <a className="sort-cut" href="/admin/Policies" style={{ color: "#2c2945" }}>
                          <button className="assign-leave-btn" type="button" title="Assign Leave">
                            <img src={require("assets/img/policies-icon.png")} alt="..." className="quick-links-icon" />
                          </button>
                          <div className="orangehrm-quick-launch-heading" title="Assign Leave">
                            <p className="tabs-heading" style={{ marginLeft: '9px' }}>Policies</p>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="thirdColumn">
                      {/* <div className="assign-leave-container">
                      <button className="assign-leave-btn" type="button" title="Assign Leave">
                      <img src={require("assets/img/pendingrequest-icon.png")} alt="..." className="quick-links-icon" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 500 500" role="presentation" className="apply-leave-icon">
                          <g fill="currentColor">
                            <path data-v-bddebfba="" class="cls-1" d="M 166.539 200.601 C 199 163.911 244 139.623 293.462 132.107 C 317.616 57.281 248.577 -14.694 169.154 2.596 C 89.731 19.85 59.5 113.41 114.77 170.982 C 128.693 185.496 146.654 195.751 166.539 200.601 Z M 115.385 333.148 C 115.385 300.974 123.308 269.281 138.462 240.588 L 57.693 240.588 C 25.846 240.588 0 265.468 0 296.124 L 0 314.636 C 0 381.279 59.616 449.774 162.308 462.732 C 131.616 426.041 115.039 380.243 115.385 333.148 Z M 500 333.148 C 500 461.4 355.77 541.557 240.385 477.431 C 125 413.305 125 252.991 240.385 188.865 C 266.693 174.24 296.539 166.539 326.923 166.539 C 422.616 166.354 500.231 241.069 500 333.148 Z M 417.308 346.106 C 418.923 344.366 420.231 342.367 421.154 340.182 C 421.731 337.887 421.731 335.48 421.154 333.148 C 421.731 330.852 421.731 328.446 421.154 326.113 C 420.346 323.818 418.885 321.744 416.923 320.189 L 340 246.141 C 329.654 236.182 311.962 240.736 308.154 254.361 C 306.385 260.692 308.27 267.43 313.077 272.058 L 357.308 314.636 L 250 314.636 C 235.193 314.636 225.962 330.075 233.346 342.404 C 236.77 348.143 243.116 351.66 250 351.66 L 357.308 351.66 L 313.462 394.238 C 303.116 404.234 307.846 421.265 322 424.894 C 328.577 426.597 335.577 424.783 340.385 420.155 L 417.308 346.106 Z"></path>
                          </g>
                        </svg>
                      </button>
                      <div className="orangehrm-quick-launch-heading" title="Assign Leave">
                        <p className="tabs-heading">Pending Request</p>
                      </div>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* updated holidays section */}
              <div className="quick-launch-container">
                <div className="card-header" style={{ backgroundColor: '#0000ff3d', color: 'white' }}>
                  <div className="quick-launch-header-container">
                    <div className="upcoming-holiday-header">
                      <img src={require("assets/img/congratulation-icon.png")} alt="..." className="congrats-icon" />
                      <p className="upcoming-holiday-heading">Upcoming Holiday</p>
                    </div>
                  </div>
                  <hr className="oxd-divider" role="separator" aria-orientation="horizontal" style={{ marginTop: '-8px' }} />
                  {nextHoliday ? <div className="upcomingHoliday"><div>{nextHoliday.date}</div>  <div>{nextHoliday.name}</div> <div className="arrow-icon"> <img src={require("assets/img/forward-arrow-icon.png")} alt="..." onClick={() => navigate('/admin/Holidays')} /></div> </div>
                    : <p className="noUpcomingHoliday">No Upcoming Holiday</p>
                  }
                </div>
              </div>
               {/* updated birthday section */}
            <div className="quick-launch-container">
              <div className="card-header" style={{ backgroundColor: '#0000ff3d', color: 'white' }}>
                <div className="quick-launch-header-container">
                  <div className="upcoming-holiday-header">
                    <img src={require("assets/img/birthday-icon.png")} alt="..." className="congrats-icon" />
                    <p className="upcoming-holiday-heading">Today's Shubham Birthday</p>
                  </div>
                </div>
                <hr className="oxd-divider" role="separator" aria-orientation="horizontal" style={{ marginTop: '-8px' }} />
                <div className="upcomingHoliday">
                  <div>
                    <img src="/static/media/profile-img.322c845998206fafacd2.webp" alt="bday-user" style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #ddd'
                    }} />
                  </div>
                  <div className="birthday-post">
                    <form>
                      <div className="textarea-wrapper">
                        <textarea rows="4" cols="29" value="Wishing a very Happy Birthday to Shubham Singh! 🎉" >
                        </textarea>
                      </div>
                      <div>
                        <button className="post-btn" type="button" >Post</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            </Col>
            ) : null}
          </Row>
          <Row style={{ marginTop: roleBasedSection === "SUPER_ADMIN" ? '-50px' : '-215px' }}>
            <Col md="8">
              <Card className="graph-card">
                <Card.Header>
                  <div className="post-heading-btn-container">
                  <Card.Title as="h4" className="graph-heading">POSTS</Card.Title>
                    {/* <div className="upcoming-holiday-header">
                      <img src={require("assets/img/upcoming-post-icon.png")} alt="..." className="post-icon" />
                      <Card.Title as="h4" className="graph-heading">POSTS</Card.Title>
                    </div> */}
                    {roleBasedSection === "ADMIN" || roleBasedSection === "SUPER_ADMIN" ? (
                      <div>
                      <button type="button" class="post-btn" fdprocessedid="g0g9qd" onClick={() => navigate('/admin/Post')}>
                        <i class="fe fe-plus"></i>+ Post
                      </button>
                    </div>
                    ) : null } 
                  </div>
                </Card.Header>
                <Card.Body style={{ height: '300px', overflowY: 'auto', padding: 0}}>
                  <ul>
                  <li>
                      <h6>20-03-2025 04:10 PM</h6>
                      <h6 className="post-title">Trip</h6>
                      <p>Its exciting to post that management is planning our maiden trip! Destination and duration are yet need to be decided.Till then, start packing your bags!</p>
                    </li>
                    <li>
                      <h6>18-03-2025 12:10 PM</h6>
                      <h6 className="post-title">Announcement</h6>
                      <p>Confirm holiday for Id-Ul-Fitr dated on 31st of march,2025 yet need to be decided by the management.</p>
                    </li>
                    <li>
                      <h6>14-03-2025 09:00 AM</h6>
                      <h6 className="post-title">Warm wishes</h6>
                      <p>May the colors of Holi brighten your days and fill your heart with positivity.Happy Holi team!</p>
                    </li>
                    <li>
                      <h6>10-03-2025 05:10 PM</h6>
                      <h6 className="post-title">Announcement</h6>
                      <p>Holiday for more than one week on the occasion of Holi will not be considered unless it is due to an emergency. 
                        Otherwise, you may request to work from home to ensure that work is not disrupted.
                      </p>
                    </li>
                    </ul>
                </Card.Body>
              </Card>
            </Col>
         </Row>
        </div>
      </Container>
    </>
  );
}

export default Dashboard;
