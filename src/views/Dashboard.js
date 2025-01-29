import React from "react";
import useHighlightSearchTerm from "components/CustomHook/useHighlightSearchTerm";
// react-bootstrap components
import { Badge, Button, Card, Navbar, Nav, Table, Container, Row, Col, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';

function Dashboard() {
  const highlightedContent = useHighlightSearchTerm();  // Call the custom hook
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

  return (
    <>
      <Container fluid>
        <Row style={{ marginTop: '-22px', marginBottom: '20px' }}>
          <Col className="text-left">
            <h3 data-search-item style={{ color: "#2c2945", fontWeight: "500", lineHeight: "1.2", fontSize: '20px'}}> Welcome Avinash Gautam! </h3>
          </Col>
        </Row>
        {/* header blocks part */}
        <div class="row clearfix">
          <div class="col-6 col-md-4 col-xl-2">
            <div class="card">
              <div class="card-body ribbon">
                <a class="sort-cut text-muted" href="/admin/users" style={{ position: 'relative' }}><i class="fa fa-users" aria-hidden="true"></i><span>Users</span>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill ribbon-box">
                    5+
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl-2">
            <div class="card">
              <div class="card-body"><a class="sort-cut text-muted" href="/admin/holidays"><i class="fa fa-thumbs-up" aria-hidden="true"></i><span>Holidays</span></a>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl-2">
            <div class="card">
              <div class="card-body ribbon">
                <a class="sort-cut text-muted" href="/admin/events" style={{ position: 'relative' }}><i class="fa fa-calendar" aria-hidden="true"></i><span>Events</span>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill events-ribbon-box">
                    8+
                  </span></a>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl-2">
            <div class="card">
              <div class="card-body"><a class="sort-cut text-muted" href="/admin/payroll"><i class="fa fa-credit-card" aria-hidden="true"></i><span>Payroll</span></a>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl-2">
            <div class="card">
              <div class="card-body"><a class="sort-cut text-muted" href="/admin/report"><i class="fas fa-chart-pie" aria-hidden="true"></i>
                <span>Report</span></a>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-4 col-xl-2">
            <div class="card">
              <div class="card-body"><a class="sort-cut text-muted" href="/admin/accounts"><i class="fa fa-calculator" aria-hidden="true"></i><span>Accounts</span></a>
              </div>
            </div>
          </div>
        </div>

        {/* graph part */}
        <div className="graph-container">
          <Row>
            <Col md="8">
              <Card className="graph-card">
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
                        <Bar dataKey="pv" stackId="a" fill="#FFB6C1" />
                        <Bar dataKey="uv" stackId="a" fill="#AFE1AF" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
                {/* <Card.Footer>
                  <div className="legend">
                    <i className="fas fa-circle text-info"></i>
                    Open <i className="fas fa-circle text-danger"></i>
                    Click <i className="fas fa-circle text-warning"></i>
                    Click Second Time
                  </div>
                  <hr></hr>
                  <div className="stats">
                    <i className="fas fa-history"></i>
                    Updated 3 minutes ago
                  </div>
                </Card.Footer> */}
              </Card>
            </Col>
            <Col md="4">
              <Card className="graph-card">
                <Card.Header>
                  <Card.Title as="h4" className="graph-heading">REVENUE</Card.Title>
                  <p className="card-category">Last Campaign Performance</p>
                </Card.Header>
                <Card.Body>
                  <div
                    className="ct-chart ct-perfect-fourth"
                    id="chartPreferences"
                  >
                    {/* second pie chart */}
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart width={400} height={400}>
                        <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#FFB6C1" />
                        <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#AFE1AF" label />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  {/* <div className="legend">
                    <i className="fas fa-circle text-info"></i>
                    Open <i className="fas fa-circle text-danger"></i>
                    Bounce <i className="fas fa-circle text-warning"></i>
                    Unsubscribe
                  </div> */}
                  {/* <hr></hr>
                  <div className="stats">
                    <i className="far fa-clock"></i>
                    Campaign sent 2 days ago
                  </div> */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Card className="graph-card">
                <Card.Header>
                  <Card.Title as="h4" className="graph-heading">EMPLOYEE STRUCTURE</Card.Title>
                  <p className="card-category">All products including Taxes</p>
                </Card.Header>
                <Card.Body>
                  <div className="ct-chart" id="chartActivity">
                    {/* third mixed bar graph */}
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        width={500}
                        height={300}
                        data={data03}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#FFB6C1" tick={false} />
                        <YAxis yAxisId="right" orientation="right" stroke="#AFE1AF" tick={false}/>
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="pv" fill="#FFB6C1" />
                        <Bar yAxisId="right" dataKey="uv" fill="#AFE1AF" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
                <Card.Footer>
                  {/* <div className="legend">
                    <i className="fas fa-circle text-info"></i>
                    Tesla Model S <i className="fas fa-circle text-danger"></i>
                    BMW 5 Series
                  </div> */}
                  <hr></hr>
                  <div className="stats">
                    <i className="fas fa-check"></i>
                    Data information certified
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col md="6">
              <Card className="graph-card">
                <Card.Header>
                  <Card.Title as="h4" className="graph-heading">PERFORMANCE</Card.Title>
                  <p className="card-category"></p>
                </Card.Header>
                <Card.Body>
                  <div className="table-full-width">
                    <Table>
                      <tbody>
                        <tr>
                          <td>
                            <Form.Check className="mb-1 pl-0">
                              <Form.Check.Label>
                                <Form.Check.Input
                                  defaultValue=""
                                  type="checkbox"
                                ></Form.Check.Input>
                                <span className="form-check-sign"></span>
                              </Form.Check.Label>
                            </Form.Check>
                          </td>
                          <td>
                            Sign contract for "What are conference organizers
                            afraid of?"
                          </td>
                          <td className="td-actions text-right"></td>
                          {/* <td className="td-actions text-right">
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-488980961">
                                  Edit Task..
                                </Tooltip>
                              }
                            >
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="info"
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-506045838">Remove..</Tooltip>
                              }
                            >
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="danger"
                              >
                                <i className="fas fa-times"></i>
                              </Button>
                            </OverlayTrigger>
                          </td> */}
                        </tr>
                        <tr>
                          <td>
                            <Form.Check className="mb-1 pl-0">
                              <Form.Check.Label>
                                <Form.Check.Input
                                  defaultChecked
                                  defaultValue=""
                                  type="checkbox"
                                ></Form.Check.Input>
                                <span className="form-check-sign"></span>
                              </Form.Check.Label>
                            </Form.Check>
                          </td>
                          <td>
                            Lines From Great Russian Literature? Or E-mails From
                            My Boss?
                          </td>
                          <td className="td-actions text-right">
                            {/* <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-537440761">
                                  Edit Task..
                                </Tooltip>
                              }
                            >
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="info"
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-21130535">Remove..</Tooltip>
                              }
                            >
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="danger"
                              >
                                <i className="fas fa-times"></i>
                              </Button>
                            </OverlayTrigger> */}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Check className="mb-1 pl-0">
                              <Form.Check.Label>
                                <Form.Check.Input
                                  defaultChecked
                                  defaultValue=""
                                  type="checkbox"
                                ></Form.Check.Input>
                                <span className="form-check-sign"></span>
                              </Form.Check.Label>
                            </Form.Check>
                          </td>
                          <td>
                            Flooded: One year later, assessing what was lost and
                            what was found when a ravaging rain swept through
                            metro Detroit
                          </td>
                          <td className="td-actions text-right">
                            {/* <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-577232198">
                                  Edit Task..
                                </Tooltip>
                              }
                            >
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="info"
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-773861645">Remove..</Tooltip>
                              }
                            >
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="danger"
                              >
                                <i className="fas fa-times"></i>
                              </Button>
                            </OverlayTrigger> */}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Check className="mb-1 pl-0">
                              <Form.Check.Label>
                                <Form.Check.Input
                                  defaultChecked
                                  type="checkbox"
                                ></Form.Check.Input>
                                <span className="form-check-sign"></span>
                              </Form.Check.Label>
                            </Form.Check>
                          </td>
                          <td>
                            Create 4 Invisible User Experiences you Never Knew
                            About
                          </td>
                          <td className="td-actions text-right">
                            {/* <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-422471719">
                                  Edit Task..
                                </Tooltip>
                              }
                            >
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="info"
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-829164576">Remove..</Tooltip>
                              }
                            >
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="danger"
                              >
                                <i className="fas fa-times"></i>
                              </Button>
                            </OverlayTrigger>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Check className="mb-1 pl-0">
                              <Form.Check.Label>
                                <Form.Check.Input
                                  defaultValue=""
                                  type="checkbox"
                                ></Form.Check.Input>
                                <span className="form-check-sign"></span>
                              </Form.Check.Label>
                            </Form.Check>
                          </td>
                          <td>Read "Following makes Medium better"</td>
                          <td className="td-actions text-right">
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-160575228">
                                  Edit Task..
                                </Tooltip>
                              }
                            >
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="info"
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-922981635">Remove..</Tooltip>
                              }
                            >
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="danger"
                              >
                                <i className="fas fa-times"></i>
                              </Button>
                            </OverlayTrigger> */}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Check className="mb-1 pl-0">
                              <Form.Check.Label>
                                <Form.Check.Input
                                  defaultValue=""
                                  disabled
                                  type="checkbox"
                                ></Form.Check.Input>
                                <span className="form-check-sign"></span>
                              </Form.Check.Label>
                            </Form.Check>
                          </td>
                          <td>Unfollow 5 enemies from twitter</td>
                          <td className="td-actions text-right">
                            {/* <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-938342127">
                                  Edit Task..
                                </Tooltip>
                              }
                            >
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="info"
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-119603706">Remove..</Tooltip>
                              }
                            >
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="danger"
                              >
                                <i className="fas fa-times"></i>
                              </Button>
                            </OverlayTrigger> */}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="now-ui-icons loader_refresh spin"></i>
                    Updated 3 minutes ago
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Dashboard;
