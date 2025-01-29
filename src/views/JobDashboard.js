import React from 'react';

export default function JobDashboard() {
  return (
    <div class="section-body">
      <div class="container-fluid">
        <div class="row clearfix row-deck">
          <div class="col-lg-6 col-md-12 location">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Top Locations</h3>
                <div class="card-options">
                  <div class="item-action dropdown ml-2">
                    <a href="fake_url" data-toggle="dropdown">
                      <i class="fe fe-more-vertical"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a href="fake_url" class="dropdown-item">
                        <i class="dropdown-icon fa fa-eye"></i>
                        View Details
                      </a>
                      <a href="fake_url" class="dropdown-item">
                        <i class="dropdown-icon fa fa-share-alt"></i>
                        Share
                      </a>
                      <a href="fake_url" class="dropdown-item">
                        <i class="dropdown-icon fa fa-cloud-download"></i>
                        Download
                      </a>
                      <div class="dropdown-divider"></div>
                      <a href="fake_url" class="dropdown-item">
                        <i class="dropdown-icon fa fa-copy"></i>
                        Copy to
                      </a>
                      <a href="fake_url" class="dropdown-item">
                        <i class="dropdown-icon fa fa-folder"></i>
                        Move to
                      </a>
                      <a href="fake_url" class="dropdown-item">
                        <i class="dropdown-icon fa fa-edit"></i>
                        Rename
                      </a>
                      <a href="fake_url" class="dropdown-item">
                        <i class="dropdown-icon fa fa-trash"></i>
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <svg viewBox="0 0 800 600" class="rsm-svg ">
                  <g class="rsm-geographies "></g>
                  <g transform="translate(397.7892828072126, 401.68026946737984)" class="rsm-marker ">
                    <g fill="none" stroke="#FF5533" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(-12, -24)"><circle cx="12" cy="10" r="3"></circle><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path></g>
                    <text textAnchor="middle" y="-30" fontFamily="system-ui" fill="rgb(93, 90, 109)">
                      Buenos Aires
                    </text>

                  </g>
                  <g transform="translate(332.3418414831312, 277.45972425075945)" class="rsm-marker ">
                    <g fill="none" stroke="#FF5533" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(-12, -24)"><circle cx="12" cy="10" r="3"></circle><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path>
                    </g>
                    <text text-anchor="middle" y="15" fontFamily= "system-ui" fill= "rgb(93, 90, 109)" >La Paz</text></g>
                  <g transform="translate(467.89906750420397, 272.5964222165743)" class="rsm-marker ">
                    <g fill="none" stroke="#FF5533" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(-12, -24)"><circle cx="12" cy="10" r="3"></circle><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path></g>
                    <text text-anchor="middle" y="15" fontFamily= "system-ui" fill= "rgb(93, 90, 109)" >Brasilia</text></g>
                  <g transform="translate(325.9342429002873, 396.9444215177014)" class="rsm-marker ">
                    <g fill="none" stroke="#FF5533" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(-12, -24)"><circle cx="12" cy="10" r="3"></circle><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path></g>
                    <text text-anchor="middle" y="15" fontFamily= "system-ui" fill= "rgb(93, 90, 109)" >Santiago</text></g>
                  <g transform="translate(285.91925609328814, 132.66160445020446)" class="rsm-marker ">
                    <g fill="none" stroke="#FF5533" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(-12, -24)"><circle cx="12" cy="10" r="3"></circle><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path></g>
                    <text text-anchor="middle" y="15" fontFamily= "system-ui" fill= "rgb(93, 90, 109)" >Bogota</text></g>
                  <g transform="translate(255.78872111900586, 169.0750786246498)" class="rsm-marker ">
                    <g fill="none" stroke="#FF5533" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(-12, -24)"><circle cx="12" cy="10" r="3"></circle><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path></g>
                    <text text-anchor="middle" y="15" fontFamily= "system-ui" fill= "rgb(93, 90, 109)" >Quito</text></g>
                  <g transform="translate(398.89472489713796, 114.5931927829775)" class="rsm-marker ">
                    <g fill="none" stroke="#FF5533" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(-12, -24)"><circle cx="12" cy="10" r="3"></circle><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path></g>
                    <text text-anchor="middle" y="-30"  fontFamily= "system-ui" fill= "rgb(93, 90, 109)" >Georgetown</text></g>
                  <g transform="translate(402.68040597425943, 336.73824410921804)" class="rsm-marker "><g fill="none" stroke="#FF5533" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(-12, -24)"><circle cx="12" cy="10" r="3"></circle><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path></g>
                    <text text-anchor="middle" y="-30" fontFamily= "system-ui" fill= "rgb(93, 90, 109)" >Asuncion</text></g>
                  <g transform="translate(419.9222401268684, 121.1599198979751)" class="rsm-marker "><g fill="none" stroke="#FF5533" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(-12, -24)"><circle cx="12" cy="10" r="3"></circle><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path></g>
                    <text text-anchor="middle" y="15" fontFamily= "system-ui" fill= "rgb(93, 90, 109)" >Paramaribo</text></g>
                  <g transform="translate(410.5981936496399, 403.8048678035218)" class="rsm-marker "><g fill="none" stroke="#FF5533" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(-12, -24)"><circle cx="12" cy="10" r="3"></circle><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path></g>
                    <text text-anchor="middle" y="15"  fontFamily= "system-ui" fill= "rgb(93, 90, 109)" >Montevideo</text></g>
                  <g transform="translate(336.715416946986, 90.75919388795106)" class="rsm-marker "><g fill="none" stroke="#FF5533" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(-12, -24)"><circle cx="12" cy="10" r="3"></circle><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path></g>
                    <text text-anchor="middle" y="15"  fontFamily= "system-ui" fill= "rgb(93, 90, 109)" >Caracas</text></g>
                  <g transform="translate(270.40845016842167, 251.23758349443403)" class="rsm-marker "><g fill="none" stroke="#FF5533" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(-12, -24)"><circle cx="12" cy="10" r="3"></circle><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path></g>
                    <text text-anchor="middle" y="15" fontFamily= "system-ui" fill= "rgb(93, 90, 109)" >Lima</text></g>
                </svg>
              </div>
              <div class="card-footer"><hr/>
                <div class="row">
                  <div class="col-xl-4 col-md-12">
                    <div class="clearfix">
                      <div class="float-left">
                        <strong>35%</strong>
                      </div>
                      <div class="float-right">
                        <small class="text-muted">2018</small>
                      </div>
                    </div>
                    <div class="progress progress-xs">
                      <div class="progress-bar bg-gray reach-bar" role="progressbar" aria-valuenow="42" aria-valuemin="0" aria-valuemax="100" style={{ width: '35%' }}>
                      </div>
                    </div>
                    <span class="text-uppercase font-10 country-1">USA</span>
                  </div>
                  <div class="col-xl-4 col-md-12">
                    <div class="clearfix">
                      <div class="float-left">
                        <strong>61%</strong>
                      </div>
                      <div class="float-right">
                        <small class="text-muted">2018</small>
                      </div>
                    </div>
                    <div class="progress progress-xs">
                      <div class="progress-bar bg-gray reach-bar" role="progressbar" aria-valuenow="42" aria-valuemin="0" aria-valuemax="100" style={{ width: '61%' }}></div>
                    </div>
                    <span class="text-uppercase font-10 country-2">India</span>
                  </div>
                  <div class="col-xl-4 col-md-12">
                    <div class="clearfix">
                      <div class="float-left">
                        <strong>37%</strong>
                      </div>
                      <div class="float-right">
                        <small class="text-muted">2018</small>
                      </div>
                    </div>
                    <div class="progress progress-xs">
                      <div class="progress-bar bg-gray reach-bar" role="progressbar" aria-valuenow="37" aria-valuemin="0" aria-valuemax="100" style={{ width: '37%' }}></div>
                    </div>
                    <span class="text-uppercase font-10 country-3">Australia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 view-card">
            <div class="card">
              <div class="card-header view-job">
                <h3 class="card-title">Job View</h3>
                <div class="card-options">
                  <span class="card-options-remove" data-toggle="card-remove"><i class="fa fa-times" style={{ opacity: '0.7 '}}></i></span>
                  <div class="item-action dropdown ml-2">
                    <a href="fake_url" data-toggle="dropdown"><i class="fas fa-ellipsis-v fa-sm" style={{ opacity: '0.7 '}}></i></a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-eye"></i> View Details </a>
                      <a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-share-alt"></i> Share </a>
                      <a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-cloud-download"></i> Download</a>
                      <div class="dropdown-divider">
                      </div><a href="fake_url" class="dropdown-item">
                        <i class="dropdown-icon fa fa-copy"></i> Copy to</a>
                      <a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-folder"></i> Move to</a>
                      <a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-edit"></i> Rename</a>
                      <a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-trash"></i> Delete</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="row text-center">
                  <div class="col-lg-4 col-sm-12 border-right">
                    <label class="mb-0 view-label">All Time</label>
                    <h4 class="font-weight-bold view-digits">2,025</h4>
                  </div>
                  <div class="col-lg-4 col-sm-12 border-right">
                    <label class="mb-0 view-label">Last Month</label>
                    <h4 class="font-weight-bold view-digits">754</h4>
                  </div>
                  <div class="col-lg-4 col-sm-12">
                    <label class="mb-0 view-label">Today</label>
                    <h4 class="font-weight-bold view-digits">54</h4>
                  </div></div><table class="table table-striped mt-4">
                  <tbody><tr>
                    <td style={{ background: '#fff'}}>
                    <label class="d-block" style={{ fontSize: '14px'}}>Biology - BIO <span class="float-right">43%</span></label>
                    <div class="progress progress-xs" style={{ height: '0.25rem'}}>
                      <div class="progress-bar bg-lightgray reach-bar" role="progressbar" aria-valuenow="43" aria-valuemin="0" aria-valuemax="100" style={{ width: '43%' }}>
                      </div>
                    </div>
                  </td>
                  </tr>
                    <tr>
                      <td><label class="d-block" style={{ fontSize: '14px'}}>Business Analysis - BUS <span class="float-right">27%</span></label>
                        <div class="progress progress-xs" style={{ height: '0.25rem'}}>
                          <div class="progress-bar bg-lightgray reach-bar" role="progressbar" aria-valuenow="27" aria-valuemin="0" aria-valuemax="100" style={{ width: '27%' }}></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ background: '#fff'}}>
                        <label class="d-block" style={{ fontSize: '14px'}}>Computer Technology - CT <span class="float-right">81%</span></label>
                        <div class="progress progress-xs" style={{ height: '0.25rem'}}>
                          <div class="progress-bar bg-lightgray reach-bar" role="progressbar" aria-valuenow="77" aria-valuemin="0" aria-valuemax="100" style={{ width: '81%' }}>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td><label class="d-block" style={{ fontSize: '14px'}}>Management - MGT <span class="float-right">61%</span></label>
                        <div class="progress progress-xs" style={{ height: '0.25rem'}}>
                          <div class="progress-bar bg-lightgray reach-bar" role="progressbar" aria-valuenow="77" aria-valuemin="0" aria-valuemax="100" style={{ width: '61%' }}></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ background: '#fff'}}>
                        <label class="d-block" style={{ fontSize: '14px'}}>Angular Dev <span class="float-right">77%</span></label>
                        <div class="progress progress-xs" style={{ height: '0.25rem'}}>
                          <div class="progress-bar bg-lightgray reach-bar" role="progressbar" aria-valuenow="77" aria-valuemin="0" aria-valuemax="100" style={{ width: '77%' }}></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card-footer">
                <small>Measure How Fast You’re Growing Monthly Recurring Revenue. <a href="/#">Learn More</a></small>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 job-openings">
            <div class="card">
              <div class="card-header job-openings-icon">
                <h3 class="card-title">Current job Openings</h3>
                <div class="card-options">
                  <span class="card-options-remove" data-toggle="card-remove"><i class="fa fa-times" style={{ opacity: '0.7 '}}></i></span>
                  <div class="item-action dropdown ml-2">
                    <a href="fake_url" data-toggle="dropdown"><i class="fas fa-ellipsis-v fa-sm" style={{ opacity: '0.7 '}}></i></a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-eye"></i> View Details </a>
                      <a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-share-alt"></i> Share </a>
                      <a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-cloud-download"></i> Download</a>
                      <div class="dropdown-divider"></div><a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-copy"></i> Copy to</a>
                      <a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-folder"></i> Move to</a>
                      <a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-edit"></i> Rename</a>
                      <a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-trash"></i> Delete</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-vcenter table_custom spacing5 mb-0 job-countries-table">
                    <tbody><tr>
                      <td class="w40"><i class="fa fa-flag" data-toggle="tooltip" data-original-title="United States"></i></td>
                      <td><small>United States</small><h5 class="mb-0 no-of-openings">434</h5></td>
                    </tr>
                      <tr>
                        <td><i class="fa fa-flag" data-toggle="tooltip" data-original-title="flag flag-au"></i></td>
                        <td><small>Australia</small><h5 class="mb-0 no-of-openings">215</h5>
                        </td>
                      </tr>
                      <tr>
                        <td><i class="fa fa-flag" data-toggle="tooltip" data-original-title="flag flag-ca"></i></td>
                        <td><small>Canada</small><h5 class="mb-0 no-of-openings">105</h5></td>
                      </tr>
                      <tr>
                        <td><i class="fa fa-flag" data-toggle="tooltip" data-original-title="flag flag-gb"></i></td>
                        <td><small>United Kingdom</small><h5 class="mb-0 no-of-openings">250</h5></td>
                      </tr>
                      <tr>
                        <td><i class="fa fa-flag" data-toggle="tooltip" data-original-title="flag flag-nl"></i></td>
                        <td><small>Netherlands</small><h5 class="mb-0 no-of-openings">52</h5></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="card-footer">
                <small>Measure How Fast You’re Growing Monthly Recurring Revenue. <a href="/#">Learn More</a></small>
              </div>
            </div>
          </div>
        </div>
        <div class="row clearfix row-deck">
          <div class="col-lg-8 col-md-12 col-sm-12">
            <div class="card">
              <div class="card-header recent-applications">
                <h3 class="card-title" style={{ marginLeft: '10px'}}>Recent Applicants</h3>
                <div class="card-options">
                  <span class="card-options-remove" data-toggle="card-remove"><i class="fa fa-times" style={{ opacity: '0.7 '}}></i></span>
                  <div class="item-action dropdown ml-2"><a href="fake_url" data-toggle="dropdown"><i class="fas fa-ellipsis-v fa-sm" style={{ opacity: '0.7 '}}></i></a>
                    <div class="dropdown-menu dropdown-menu-right"><a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-eye"></i> View Details </a>
                      <a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-share-alt"></i> Share </a>
                      <a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-cloud-download"></i> Download</a>
                      <div class="dropdown-divider">
                      </div>
                      <a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-copy"></i> Copy to</a>
                      <a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-folder"></i> Move to</a>
                      <a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-edit"></i> Rename</a>
                      <a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-trash"></i> Delete</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-hover table-striped table-vcenter mb-0">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Apply for</th>
                        <th>Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {/* <td class="w60">
                          <div class="avtar-pic w35 bg-red" data-toggle="tooltip" data-placement="top" title="Avatar Name"><span>MN</span></div>
                        </td> */}
                        <td>
                          <div class="applicant-names">Marshall Nichols</div><span class="text-muted">marshall-n@gmail.com</span></td>
                        <td><span>Full-stack developer</span></td>
                        <td>24 Jun, 2015</td><td>
                          <a href="fake_url;" class="btn btn-info application-status">Interview</a></td>
                      </tr>
                      <tr>
                        {/* <td class="w60"><img src="../assets/images/xs/avatar1.jpg" data-toggle="tooltip" data-placement="top" title="Avatar Name" alt="Avatar" class="w35 h35 rounded" /></td> */}
                        <td><div class="applicant-names">Susie Willis</div><span class="text-muted">sussie-w@gmail.com</span></td>
                        <td><span>Designer</span></td>
                        <td>28 Jun, 2015</td>
                        <td><a href="fake_url;" class="btn btn-info application-status">Interview</a></td>
                      </tr>
                      <tr>
                        {/* <td class="w60"><div class="avtar-pic w35 bg-pink" data-toggle="tooltip" data-placement="top" title="Avatar Name"><span>MN</span></div></td> */}
                        <td><div class="applicant-names">Debra Stewart</div><span class="text-muted">debra@gmail.com</span></td>
                        <td><span>Project Manager</span></td>
                        <td>21 July, 2015</td>
                        <td><a href="fake_url;" class="btn btn-danger cancel-application-status">Cancel</a></td>
                      </tr>
                      <tr>
                        {/* <td class="w60"><img src="../assets/images/xs/avatar2.jpg" data-toggle="tooltip" data-placement="top" title="Avatar Name" alt="Avatar" class="w35 h35 rounded" /></td> */}
                        <td><div class="applicant-names">Francisco Vasquez</div><span class="text-muted">francisv@gmail.com</span></td>
                        <td><span>Senior Developer</span></td>
                        <td>18 Jan, 2016</td>
                        <td><a href="fake_url;" class="btn btn-info application-status">Interview</a></td>
                      </tr>
                      <tr>
                        {/* <td class="w60"><img src="../assets/images/xs/avatar3.jpg" data-toggle="tooltip" data-placement="top" title="Avatar Name" alt="Avatar" class="w35 h35 rounded" />
                        </td> */}
                        <td><div class="applicant-names">Jane Hunt</div><span class="text-muted">jane-hunt@gmail.com</span></td>
                        <td><span>Front-end Developer</span></td>
                        <td>08 Mar, 2016</td>
                        <td><a href="fake_url;" class="btn btn-success inprocess-application-status">Interviewed</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-12" style={{ marginTop: '-195px'}}>
            <div class="card">
              <div class="card-body text-center d-flex align-items-center justify-content-center">
                <div style={{ maxwidth: '340px' }}><i class="fa fa-user fa-2x"></i>
                  <h5 class="mb-2 mt-10">We released Bootstrap 4x versions of our theme.</h5>
                  <p class="text-muted">This is a true story and totally not made up. This is going to be better in the long run but for now this is the way it is.</p>
                  <a href="#!" class="btn btn-primary">Try it for free</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
