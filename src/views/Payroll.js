import React, { useState } from 'react';
import CountUp from 'react-countup';

export default function Payroll() {

  const [activeSlip, setActiveSlip] = useState('employeeSalary'); // by default,list view is all

  // for handling view
  const handleSlipView = (tab) => {
    setActiveSlip(tab);
  }

  return (
    <div className='container-fluid' style={{ marginTop: '-10px'}}>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <ul class="nav nav-tabs page-header-tab">
        <li class="nav-item">
            <a class={`nav-link ${activeSlip === 'employeeSalary' ? 'active' : ''}`} id="slip-salary-tab" onClick={() => handleSlipView('employeeSalary')} data-toggle="tab" href="#slip-salary">Employee Salary</a>
          </li>
          <li class="nav-item">
            <a class={`nav-link ${activeSlip === 'payslip' ? 'active' : ''}`} id="payslip-tab" onClick={() => handleSlipView('payslip')} data-toggle="tab" href="#payslip">Payslip</a>
          </li>
        </ul>
        <div class="header-action">
          <button type="button" class="add-btn" data-toggle="modal" data-target="#exampleModal" fdprocessedid="av3mde" style={{ marginLeft: '5px' }}>
            <i class="plus-sign mr-2">&#43;</i>
            Add
          </button>
        </div>
      </div>

      {/* employee list page */}
      {activeSlip === 'employeeSalary' ? (
        <div className='section-body'>
          <div className='container-fluid'>
          <div class="row">
        <div class="col-lg-3 col-md-6">
          <div class="card">
            <div class="card-body w_sparkline">
              <div class="details">
                <span>Web Developer</span>
                <h3 class="mb-0 mt-0 pt-3 salary-counter">
                  <span class="counter"> <span className='counter-digits' >$ <CountUp end={18960} duration={2} /></span></span>
                </h3>
                <span>
                  <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i>
                    5.27%</span>
                  since last month
                </span>
              </div>
              <div class="w_chart">
                <div id="mini-bar-chart1" class="mini-bar-chart">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="card">
            <div class="card-body w_sparkline">
              <div class="details">
                <span>App Developer</span>
                <h3 class="mb-0 mt-0 pt-3 salary-counter "><span className='counter-digits'>$ <CountUp end={11783} duration={2} /></span></h3>
                <span>
                  <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i>
                    11.38%</span>
                  since last month
                </span>
              </div>
              <div class="w_chart">
                <span id="mini-bar-chart2" class="mini-bar-chart"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="card">
            <div class="card-body w_sparkline">
              <div class="details">
                <span>Designer</span>
                <h3 class="mb-0 mt-0 pt-3 salary-counter">
                  <span className='counter-digits'>$<CountUp end={2254} duration={2} /></span>
                </h3>
                <span>
                  <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i>
                    9.61%</span>
                  since last month
                </span>
              </div>
              <div class="w_chart">
                <span id="mini-bar-chart3" class="mini-bar-chart"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="card">
            <div class="card-body w_sparkline">
              <div class="details">
                <span>Marketing</span>
                <h3 class="mb-0 mt-0 pt-3 salary-counter"> <span className='counter-digits'>$ <CountUp end={8751} duration={2} /></span></h3>
                <span>
                  <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i>
                    2.27%</span>
                  since last month
                </span>
              </div>
              <div class="w_chart">
                <span id="mini-bar-chart4" class="mini-bar-chart"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
            <div className='tab-content'>
              <div className='tab-pane fade active show' id="slip-salary-tab" role='tabpanel'>
                <div className='card'>
                  <div class="card-header">
                    <div className='employeelist-header'>
                      <h3 class="card-title mb-0 ml-4">EMPLOYEE</h3>
                      <div class="card-options  mb-0 ml-4">
                        <form className='search-form'>
                          <div class="input-group">
                            <input type="text" class="form-control form-control-sm search-input" placeholder="Search something..." name="s" fdprocessedid="ys9x9" />
                            <span class="input-group-btn ml-2">
                              <button class="btn btn-sm btn-default" type="submit" fdprocessedid="e38z6q">
                                <span> <i class="fas fa-search fa-lg"></i> </span>
                              </button>
                            </span>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className='card-body'>
                      <div className='table-responsive'>
                        <table className='table table-hover table-striped table-vcenter text-nowrap mb-0'>
                          <thead>
                            <tr>
                              <th>S.No.</th>
                              <th>EMPLOYEE</th>
                              <th>ROLE</th>
                              <th>SALARY</th>
                              <th>STATUS</th>
                              <th>ACTION</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td class="w40">01</td>
                              <td class="d-flex align-items-center">
                                {/* <span class="avatar avatar-blue" data-toggle="tooltip" data-original-title="Avatar Name">MN</span> */}
                                <div>
                                  <h6 class="name-data">Marshall Nichols</h6><span>Marshall@gmail.com</span>
                                </div>
                              </td>
                              <td>Web Designer</td>
                              <td>$1200</td>
                              <td> <span className="position-role">Done</span></td>
                              <td><button type="button" class="btn btn-icon btn-sm icons" title="View" fdprocessedid="4mga3">
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                              </button>
                                <button type="button" class="btn btn-icon btn-sm icons" title="Edit" fdprocessedid="tvsb17">
                                  <i class="fa fa-print" aria-hidden="true"></i>
                                </button>
                                <button type="button" class="btn btn-icon btn-sm icons" title="Delete" data-type="confirm" fdprocessedid="f7knyq">
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td class="w40">02</td>
                              <td class="d-flex">
                                <div>
                                  <h6 class="name-data">Debra Stewart</h6><span>marshall-n@gmail.com</span>
                                </div>
                              </td>
                              <td>Java Developer</td>
                              <td>$378</td>
                              <td> <span className="position-role">Done</span></td>
                              <td><button type="button" class="btn btn-icon btn-sm icons" title="View" fdprocessedid="4mga3">
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                              </button>
                                <button type="button" class="btn btn-icon btn-sm icons" title="Edit" fdprocessedid="tvsb17">
                                  <i class="fa fa-print" aria-hidden="true"></i>
                                </button>
                                <button type="button" class="btn btn-icon btn-sm icons" title="Delete" data-type="confirm" fdprocessedid="f7knyq">
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td class="w40">03</td>
                              <td class="d-flex">
                                <div>
                                  <h6 class="name-data">Jane Hunt</h6> <span>jane-hunt@gmail.com</span>
                                </div>
                              </td>
                              <td>Web Designer</td>
                              <td>$653</td>
                              <td><span className="position-approval-role">Pending</span></td>
                              <td><button type="button" class="btn btn-icon btn-sm icons" title="View" fdprocessedid="4mga3">
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                              </button>
                                <button type="button" class="btn btn-icon btn-sm icons" title="Edit" fdprocessedid="tvsb17">
                                  <i class="fa fa-print" aria-hidden="true"></i>
                                </button>
                                <button type="button" class="btn btn-icon btn-sm icons" title="Delete" data-type="confirm" fdprocessedid="f7knyq">
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td class="w40">04</td>
                              <td class="d-flex">
                                <div>
                                  <h6 class="name-data">South Baynne</h6> <span>sussie-w@gmail.com</span>
                                </div>
                              </td>
                              <td>Java Developer</td>
                              <td>$451</td>
                              <td><span className='exit-block'>Exit</span></td>
                              <td><button type="button" class="btn btn-icon btn-sm icons" title="View" fdprocessedid="4mga3">
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                              </button>
                                <button type="button" class="btn btn-icon btn-sm icons" title="Edit" fdprocessedid="tvsb17">
                                  <i class="fa fa-print" aria-hidden="true"></i>
                                </button>
                                <button type="button" class="btn btn-icon btn-sm icons" title="Delete" data-type="confirm" fdprocessedid="f7knyq">
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td class="w40">05</td>
                              <td class="d-flex">
                                <div>
                                  <h6 class="name-data">Brandon Smith</h6><span>sussie-w@gmail.com</span>
                                </div>
                              </td>
                              <td>Web Developer</td>
                              <td>$1989</td>
                              <td><span className='exit-block'>Exit</span></td>
                              <td><button type="button" class="btn btn-icon btn-sm icons" title="View" fdprocessedid="4mga3">
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                              </button>
                                <button type="button" class="btn btn-icon btn-sm icons" title="Edit" fdprocessedid="tvsb17">
                                  <i class="fa fa-print" aria-hidden="true"></i>
                                </button>
                                <button type="button" class="btn btn-icon btn-sm icons" title="Delete" data-type="confirm" fdprocessedid="f7knyq">
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td class="w40">06</td>
                              <td class="d-flex">
                                <div>
                                  <h6 class="name-data">Kevin Gill</h6><span>sussie-w@gmail.com</span>
                                </div>
                              </td>
                              <td>Graphics Designer</td>
                              <td>$343</td>
                              <td><span className="position-approval-role">Pending</span></td>
                              <td><button type="button" class="btn btn-icon btn-sm icons" title="View" fdprocessedid="4mga3">
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                              </button>
                                <button type="button" class="btn btn-icon btn-sm icons" title="Edit" fdprocessedid="tvsb17">
                                  <i class="fa fa-print" aria-hidden="true"></i>
                                </button>
                                <button type="button" class="btn btn-icon btn-sm icons" title="Delete" data-type="confirm" fdprocessedid="f7knyq">
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td class="w40">07</td>
                              <td class="d-flex">
                                <div>
                                  <h6 class="name-data">Colin Brown</h6><span>sussie-w@gmail.com</span>
                                </div>
                              </td>
                              <td>IOS Developer</td>
                              <td>$8566</td>
                              <td> <span className="position-role">Done</span></td>
                              <td><button type="button" class="btn btn-icon btn-sm icons" title="View" fdprocessedid="4mga3">
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                              </button>
                                <button type="button" class="btn btn-icon btn-sm icons" title="Edit" fdprocessedid="tvsb17">
                                  <i class="fa fa-print" aria-hidden="true"></i>
                                </button>
                                <button type="button" class="btn btn-icon btn-sm icons" title="Delete" data-type="confirm" fdprocessedid="f7knyq">
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td class="w40">08</td>
                              <td class="d-flex">
                                <div>
                                  <h6 class="name-data">Zoe Baker</h6><span>sussie-w@gmail.com</span>
                                </div>
                              </td>
                              <td>HTML Developer</td>
                              <td>$885</td>
                              <td><span className='exit-block'>Exit</span></td>
                              <td><button type="button" class="btn btn-icon btn-sm icons" title="View" fdprocessedid="4mga3">
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                              </button>
                                <button type="button" class="btn btn-icon btn-sm icons" title="Edit" fdprocessedid="tvsb17">
                                  <i class="fa fa-print" aria-hidden="true"></i>
                                </button>
                                <button type="button" class="btn btn-icon btn-sm icons" title="Delete" data-type="confirm" fdprocessedid="f7knyq">
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>

                        </table>

                      </div>

                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>) : activeSlip === 'payslip' ? (
          <div class="section-body mt-3">
            <div class="container-fluid">
              <div class="tab-content mt-3">
                <div class="tab-pane fade" id="Payroll-Salary" role="tabpanel">
                  <div class="row clearfix">
                    <div class="col-lg-3 col-md-6">
                      <div class="card">
                        <div class="card-body">
                          <h6>Web Developer</h6>
                          <h3 class="pt-3">$<span class="counter"><span>18960</span></span></h3>
                          <span><span class="text-danger mr-2"><i class="fa fa-long-arrow-down"></i> 5.27%</span> Since last month</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="card">
                        <div class="card-body">
                          <h6>App Developer</h6>
                          <h3 class="pt-3">$<span class="counter"><span>11783</span></span></h3>
                          <span><span class="text-success mr-2"><i class="fa fa-long-arrow-up"></i> 11.38%</span> Since last month</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="card">
                        <div class="card-body"><h6>Designer</h6>
                          <h3 class="pt-3">$<span class="counter"><span>2254</span></span></h3>
                          <span><span class="text-success mr-2"><i class="fa fa-long-arrow-up"></i> 9.61%</span> Since last month</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="card">
                        <div class="card-body"><h6>Marketing</h6><h3 class="pt-3">$<span class="counter"><span>8751</span></span></h3>
                          <span><span class="text-danger mr-2"><i class="fa fa-long-arrow-down"></i> 2.27%</span> Since last month</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header">
                      <h3 class="card-title">Employee</h3>
                      <div class="card-options">
                        <form>
                          <div class="input-group">
                            <input type="text" class="form-control form-control-sm" placeholder="Search something..." name="s" fdprocessedid="5l4ki1" />
                            <span class="input-group-btn ml-2">
                              <button class="btn btn-icon" type="submit" fdprocessedid="522ywd">
                                <span class="fe fe-search"></span>
                              </button>
                            </span>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table table-hover table-striped table-vcenter text-nowrap">
                          <thead>
                            <tr>
                              <th style={{ width: '20px' }}>#</th>
                              <th>Employee</th>
                              <th class="w200">Role</th>
                              <th class="w60">Salary</th>
                              <th class="w60">Status</th>
                              <th class="w200">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><span>01</span></td>
                              <td><div class="d-flex align-items-center">
                                <span class="avatar avatar-pink" data-toggle="tooltip" data-placement="top" title="Avatar Name">WH</span>
                                <div class="ml-3"><a href="fake_url">South Shyanne</a>
                                  <p class="mb-0">south.shyanne@example.com</p>
                                </div>
                              </div>
                              </td>
                              <td>Web Developer</td>
                              <td>$1200</td>
                              <td><span class="tag tag-success ml-0 mr-0">Done</span></td>
                              <td><button type="button" class="btn btn-icon" title="Send Invoice" data-toggle="tooltip" data-placement="top" fdprocessedid="5t9mwq"><i class="icon-envelope text-info"></i></button>
                                <button type="button" class="btn btn-icon " title="Print" data-toggle="tooltip" data-placement="top" fdprocessedid="32hr7z"><i class="icon-printer"></i></button>
                                <button type="button" class="btn btn-icon" title="Delete" data-toggle="tooltip" data-placement="top" fdprocessedid="bsaz0n"><i class="icon-trash text-danger"></i></button>
                              </td>
                            </tr>
                            <tr>
                              <td><span>02</span></td>
                              <td><div class="d-flex align-items-center">
                                <img class="avatar" src="../assets/images/xs/avatar1.jpg" data-toggle="tooltip" data-placement="top" title="Avatar Name" alt="Avatar" />
                                <div class="ml-3">
                                  <a href="fake_url">Zoe Baker</a>
                                  <p class="mb-0">zoe.baker@example.com</p>
                                </div>
                              </div>
                              </td>
                              <td>Graphics Desgber</td>
                              <td>$378</td>
                              <td><span class="tag tag-success ml-0 mr-0">Done</span></td>
                              <td><button type="button" class="btn btn-icon" title="Send Invoice" data-toggle="tooltip" data-placement="top" fdprocessedid="3fnbd">
                                <i class="icon-envelope text-info"></i></button>
                                <button type="button" class="btn btn-icon " title="Print" data-toggle="tooltip" data-placement="top" fdprocessedid="70hdof">
                                  <i class="icon-printer"></i></button>
                                <button type="button" class="btn btn-icon" title="Delete" data-toggle="tooltip" data-placement="top" fdprocessedid="vpqc03"><i class="icon-trash text-danger"></i>
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td><span>03</span></td>
                              <td><div class="d-flex align-items-center"><span class="avatar avatar-blue" data-toggle="tooltip" data-placement="top" title="Avatar Name">WH</span>
                                <div class="ml-3">
                                  <a href="fake_url">Colin Brown</a>
                                  <p class="mb-0">colinbrown@example.com</p>
                                </div>
                              </div>
                              </td>
                              <td>HTML Developer</td>
                              <td>$653</td>
                              <td><span class="tag tag-success ml-0 mr-0">Done</span></td>
                              <td><button type="button" class="btn btn-icon" title="Send Invoice" data-toggle="tooltip" data-placement="top" fdprocessedid="f0r4mt"><i class="icon-envelope text-info"></i>
                              </button>
                                <button type="button" class="btn btn-icon " title="Print" data-toggle="tooltip" data-placement="top" fdprocessedid="9gmg7g"><i class="icon-printer"></i></button>
                                <button type="button" class="btn btn-icon" title="Delete" data-toggle="tooltip" data-placement="top" fdprocessedid="pxskz"><i class="icon-trash text-danger"></i></button>
                              </td>
                            </tr>
                            <tr>
                              <td><span>04</span></td>
                              <td><div class="d-flex align-items-center"><span class="avatar avatar-green" data-toggle="tooltip" data-placement="top" title="Avatar Name">WH</span><div class="ml-3">
                                <a href="fake_url">Kevin Gill</a><p class="mb-0">kevin.gill@example.com</p></div></div></td>
                              <td>Mobile</td>
                              <td>$451</td>
                              <td><span class="tag tag-warning  ml-0 mr-0">Panding</span></td>
                              <td><button type="button" class="btn btn-icon" title="Send Invoice" data-toggle="tooltip" data-placement="top" fdprocessedid="0rvhjjg"><i class="icon-envelope text-info"></i></button>
                                <button type="button" class="btn btn-icon " title="Print" data-toggle="tooltip" data-placement="top" fdprocessedid="ck3dy"><i class="icon-printer"></i></button>
                                <button type="button" class="btn btn-icon" title="Delete" data-toggle="tooltip" data-placement="top" fdprocessedid="qlsvv"><i class="icon-trash text-danger"></i></button></td>
                            </tr>
                            <tr>
                              <td><span>05</span></td>
                              <td><div class="d-flex align-items-center">
                                <img class="avatar" src="../assets/images/xs/avatar2.jpg" data-toggle="tooltip" data-placement="top" title="Avatar Name" alt="Avatar" />
                                <div class="ml-3">
                                  <a href="fake_url">Brandon Smith</a>
                                  <p class="mb-0">Maria.gill@example.com</p>
                                </div>
                              </div>
                              </td>
                              <td>VueJs FrontEnd</td>
                              <td>$1,989</td>
                              <td><span class="tag tag-success  ml-0 mr-0">Done</span></td>
                              <td><button type="button" class="btn btn-icon" title="Send Invoice" data-toggle="tooltip" data-placement="top" fdprocessedid="okf7as"><i class="icon-envelope text-info"></i></button>
                                <button type="button" class="btn btn-icon " title="Print" data-toggle="tooltip" data-placement="top" fdprocessedid="cmd0jc"><i class="icon-printer"></i></button>
                                <button type="button" class="btn btn-icon" title="Delete" data-toggle="tooltip" data-placement="top" fdprocessedid="c1pjh"><i class="icon-trash text-danger"></i></button>
                              </td>
                            </tr>
                            <tr>
                              <td><span>06</span></td>
                              <td><div class="d-flex align-items-center">
                                <img class="avatar" src="../assets/images/xs/avatar3.jpg" data-toggle="tooltip" data-placement="top" title="Avatar Name" alt="Avatar" />
                                <div class="ml-3"><a href="fake_url">Kevin Baker</a>
                                  <p class="mb-0">kevin.baker@example.com</p></div>
                              </div>
                              </td>
                              <td>Java Developer</td>
                              <td>$343</td>
                              <td><span class="tag tag-warning  ml-0 mr-0">Panding</span></td>
                              <td><button type="button" class="btn btn-icon" title="Send Invoice" data-toggle="tooltip" data-placement="top" fdprocessedid="nymo2lt"><i class="icon-envelope text-info"></i></button>
                                <button type="button" class="btn btn-icon " title="Print" data-toggle="tooltip" data-placement="top" fdprocessedid="02iwgc"><i class="icon-printer"></i></button>
                                <button type="button" class="btn btn-icon" title="Delete" data-toggle="tooltip" data-placement="top" fdprocessedid="0krkt"><i class="icon-trash text-danger"></i></button></td>
                            </tr>
                            <tr>
                              <td><span>07</span></td>
                              <td><div class="d-flex align-items-center">
                                <img class="avatar" src="../assets/images/xs/avatar4.jpg" data-toggle="tooltip" data-placement="top" title="Avatar Name" alt="Avatar" /><div class="ml-3">
                                  <a href="fake_url">Colin Brown</a><p class="mb-0">colin-brown@example.com</p></div>
                              </div>
                              </td>
                              <td>Designer</td>
                              <td>$653</td>
                              <td><span class="tag tag-success ml-0 mr-0">Done</span></td>
                              <td><button type="button" class="btn btn-icon" title="Send Invoice" data-toggle="tooltip" data-placement="top" fdprocessedid="jnwub7"><i class="icon-envelope text-info"></i></button>
                                <button type="button" class="btn btn-icon " title="Print" data-toggle="tooltip" data-placement="top" fdprocessedid="8owm7p"><i class="icon-printer"></i></button>
                                <button type="button" class="btn btn-icon" title="Delete" data-toggle="tooltip" data-placement="top" fdprocessedid="t5d9op"><i class="icon-trash text-danger"></i></button>
                              </td>
                            </tr>
                            <tr>
                              <td><span>08</span></td>
                              <td><div class="d-flex align-items-center">
                                <img class="avatar" src="../assets/images/xs/avatar5.jpg" data-toggle="tooltip" data-placement="top" title="Avatar Name" alt="Avatar" />
                                <div class="ml-3"><a href="fake_url">Kevin Gill</a>
                                  <p class="mb-0">kevin-gill@example.com</p>
                                </div>
                              </div>
                              </td>
                              <td>Team Leader</td>
                              <td>$451</td>
                              <td><span class="tag tag-warning  ml-0 mr-0">Panding</span></td>
                              <td><button type="button" class="btn btn-icon" title="Send Invoice" data-toggle="tooltip" data-placement="top" fdprocessedid="4lyx1f"><i class="icon-envelope text-info"></i></button>
                                <button type="button" class="btn btn-icon " title="Print" data-toggle="tooltip" data-placement="top" fdprocessedid="8pwld"><i class="icon-printer"></i></button>
                                <button type="button" class="btn btn-icon" title="Delete" data-toggle="tooltip" data-placement="top" fdprocessedid="1j015"><i class="icon-trash text-danger"></i></button></td>
                            </tr>
                            <tr>
                              <td><span>09</span></td>
                              <td><div class="d-flex align-items-center"><span class="avatar avatar-green" data-toggle="tooltip" data-placement="top" title="Avatar Name">WH</span><div class="ml-3"><a href="fake_url">Kevin Gill</a><p class="mb-0">kevin.gill@example.com</p></div></div></td>
                              <td>Mobile</td>
                              <td>$451</td>
                              <td><span class="tag tag-warning  ml-0 mr-0">Panding</span></td>
                              <td><button type="button" class="btn btn-icon" title="Send Invoice" data-toggle="tooltip" data-placement="top" fdprocessedid="4cvt1f"><i class="icon-envelope text-info"></i></button>
                                <button type="button" class="btn btn-icon " title="Print" data-toggle="tooltip" data-placement="top" fdprocessedid="8fzj5b"><i class="icon-printer"></i></button>
                                <button type="button" class="btn btn-icon" title="Delete" data-toggle="tooltip" data-placement="top" fdprocessedid="gn02ka"><i class="icon-trash text-danger"></i></button></td>
                            </tr>
                            <tr>
                              <td><span>10</span></td>
                              <td><div class="d-flex align-items-center"><img class="avatar" src="../assets/images/xs/avatar7.jpg" data-toggle="tooltip" data-placement="top" title="Avatar Name" alt="Avatar" />
                                <div class="ml-3"><a href="fake_url">Brandon Smith</a><p class="mb-0">Maria.gill@example.com</p></div></div></td>
                              <td>VueJs FrontEnd</td>
                              <td>$1,989</td>
                              <td><span class="tag tag-success  ml-0 mr-0">Done</span></td>
                              <td><button type="button" class="btn btn-icon" title="Send Invoice" data-toggle="tooltip" data-placement="top" fdprocessedid="g981c"><i class="icon-envelope text-info"></i></button>
                                <button type="button" class="btn btn-icon " title="Print" data-toggle="tooltip" data-placement="top" fdprocessedid="1p1qdw"><i class="icon-printer"></i></button>
                                <button type="button" class="btn btn-icon" title="Delete" data-toggle="tooltip" data-placement="top" fdprocessedid="y7ao9g"><i class="icon-trash text-danger"></i></button></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <nav aria-label="Page navigation">
                        <ul class="pagination mb-0 justify-content-end">
                          <li class="page-item"><a class="page-link" href="/#">Previous</a></li>
                          <li class="page-item active"><a class="page-link" href="/#">1</a></li>
                          <li class="page-item"><a class="page-link" href="/#">2</a></li>
                          <li class="page-item"><a class="page-link" href="/#">3</a></li>
                          <li class="page-item"><a class="page-link" href="/#">Next</a></li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade active show" id="Payroll-Payslip" role="tabpanel">
                  <div class="card">
                    <div class="card-body">
                      <div class="media mb-4">
                        <div class="mr-3">
                        <i class="fa fa-user fa-2x"></i>
                        </div>
                        <div class="media-body">
                          <div class="content">
                            <span><strong>Order ID:</strong>  C09</span>
                            <p class="h5" style={{ fontSize: '1.25rem'}}>John Smith<small class="float-right badge badge-primary">Jun 15, 2019</small></p>
                            <p>795 Folsom Ave, Suite 546 San Francisco, CA 54656</p>
                          </div>
                          <nav class="d-flex text-muted email-print-icons"><a href="fake_url" class="icon mr-3">
                          <i class="fas fa-envelope text-info email-icon"></i>
                          </a>
                            <a href="fake_url" class="icon mr-3"><i class="fa fa-print print-icon"></i>
                            </a>
                          </nav>
                        </div>
                      </div>
                      <div class="table-responsive">
                        <table class="table table-hover table-striped table-vcenter payslip-table">
                          <thead class="dark-mode">
                            <tr>
                              <th class="w60"></th>
                              <th></th>
                              <th class="w100">Earnings</th>
                              <th class="w100">Deductions</th>
                              <th class="w100 text-right">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>01</td>
                              <td><span>Basic Salary</span></td>
                              <td>$1,500</td>
                              <td>-</td>
                              <td class="text-right">$380</td>
                            </tr>
                            <tr>
                              <td>02</td>
                              <td><span>House Rent Allowance (H.R.A.)</span></td>
                              <td>$62</td>
                              <td>-</td>
                              <td class="text-right">$250</td>
                            </tr>
                            <tr>
                              <td>03</td>
                              <td><span>Tax Deducted at Source (T.D.S.)</span></td>
                              <td>-</td>
                              <td>$80</td>
                              <td class="text-right">$120</td>
                            </tr>
                            <tr>
                              <td>04</td>
                              <td><span>C/Bank Loan</span></td>
                              <td>-</td>
                              <td>$120</td>
                              <td class="text-right">$120</td>
                            </tr>
                            <tr>
                              <td>05</td>
                              <td><span>Other Allowance</span></td>
                              <td>$121</td>
                              <td>-</td>
                              <td class="text-right">$120</td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colspan="2"><span><strong>Note:</strong>
                               {/* Ipsum is simply dummy text of the printing and typesetting industry. */}
                               </span></td>
                              <td>$1683</td>
                              <td>$200</td>
                              <td class="text-right"><strong class="text-secondary">$1483.00</strong></td>
                            </tr>
                          </tfoot>
                        </table>
                        <button class="btn btn-info float-right print-btn" fdprocessedid="1jm0u"><i class="fa fa-print"></i> Print</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
    </div>
  )
}
