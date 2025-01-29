import React from 'react';
import { useState } from 'react';

export default function Resumes() {
  const [activeApplicantTab, setActiveApplicantTab] = useState('list'); // by default,list view is active
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null); // Track the open dropdown

  // for handling view
  const handleApplicantView = (tab) => {
    setActiveApplicantTab(tab);
  }

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const data = [
    {
      id: 1,
      name: 'Michelle Green',
      designation: 'Web Developer',
      address: '123 6th St. Melbourne, FL 32904',
      rate: '$34 per hour',
      experience: '2+ Year',
      stars: 3,
    },
    {
      id: 2,
      name: 'Jason Porter',
      designation: 'UI UX Designer',
      address: '123 6th St. Melbourne, FL 32904',
      rate: '$61 per hour',
      experience: '5+ Year',
      stars: 4,
    },
    {
      id: 3,
      name: 'David Wallace',
      designation: 'Java Developer',
      address: '123 6th St. Melbourne, FL 32904',
      rate: '$76 per hour',
      experience: '7+ Year',
      stars: 4,
    },
    {
      id: 4,
      name: 'Jason Porter',
      designation: 'UI UX Designer',
      address: '123 6th St. Melbourne, FL 32904',
      rate: '$61 per hour',
      experience: '5+ Year',
      stars: 4,
    },
    {
      id: 5,
      name: 'Jackson Charles',
      designation: 'React Developer',
      address: '123 6th St. Melbourne, FL 32904',
      rate: '$88 per hour',
      experience: '4+ Year',
      stars: 5,
    },
    {
      id: 6,
      name: 'Charles Putin',
      designation: 'UI UX Designer',
      address: '123 6th St. Melbourne, FL 32904',
      rate: '$68 per hour',
      experience: '5+ Year',
      stars: 3,
    },
    {
      id: 7,
      name: 'Poulwin James',
      designation: 'Java Designer',
      address: '123 6th St. Melbourne, FL 32904',
      rate: '$69 per hour',
      experience: '5+ Year',
      stars: 5,
    },
  ];

  return (
    <div>
      <div class="section-body" style={{ marginTop: '-10px'}}>
        <div class="container-fluid">
          <div class="d-flex justify-content-between align-items-center">
            <ul class="nav nav-tabs page-header-tab">
              <li class="nav-item">
                <a class={`nav-link ${activeApplicantTab === 'list' ? 'active' : ''}`} id="Resumes-list-tab" data-toggle="tab" href="#Resumes-list" onClick={() => handleApplicantView('list')}>List View</a>
              </li>
              <li class="nav-item">
                <a class={`nav-link ${activeApplicantTab === 'grid' ? 'active' : ''}`} id="Resumes-grid-tab" data-toggle="tab" href="#Resumes-grid" onClick={() => handleApplicantView('grid')}>Grid View</a>
              </li>
            </ul>
            <div class="header-action d-md-flex">
              <div class="input-group mr-2">
                <input type="text" class="form-control" placeholder="Search..." fdprocessedid="75v5o" />
              </div>
              <button type="button" class="add-btn" fdprocessedid="sktvrd"> <i class="plus-sign mr-2">&#43;</i>Add</button>
            </div>
          </div>
          <div class="row clearfix mt-3">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-3 col-md-4 col-sm-6"><label>Search</label>
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search..." fdprocessedid="c6esd" />
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6"><label>Hourly Rate</label>
                      <div class="multiselect_div">
                        <select class="custom-select" fdprocessedid="lx4lvg">
                          <option>All rates</option>
                          <option value="1">$0 - $50</option>
                          <option value="2">$50 - $100</option>
                          <option value="3">$100 - $200</option>
                          <option value="4">$200 - $500</option>
                          <option value="5">$500 +</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6" style={{ marginTop: '17px'}}><label>Academic Degree</label>
                      <div class="form-group">
                        <select class="custom-select" fdprocessedid="rov3am">
                          <option>All degrees</option>
                          <option value="1">Associate degree</option>
                          <option value="2">Bachelor's degree</option>
                          <option value="3">Master's degree</option>
                          <option value="4">Doctoral degree</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6" style={{ marginTop: '17px'}}><label>Order</label>
                      <div class="form-group">
                        <select class="custom-select" fdprocessedid="x64kc">
                          <option>Relevance</option>
                          <option value="1">Highest rate first</option>
                          <option value="2">Lowest rate first</option>
                          <option value="3">Highest degree first</option>
                          <option value="4">Lowest degree first</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6"><label>&nbsp;</label><a href="fake_url;" class="btn btn-sm btn-primary btn-block">Filter</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* // user list applicant table */}
      {activeApplicantTab === 'list' ? (
        <div class="section-body">
          <div class="container-fluid">
            <div class="tab-content">
              <div class="tab-pane fade active show" id="Resumes-list" role="tabpanel">
                <div class="table-responsive">
                  <table class="table table-vcenter table_custom spacing5 border-style mb-0">
                    <thead>
                      <tr>
                        <th class="w40">#</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Address</th>
                        <th>Rate</th>
                        <th>Experience</th>
                        <th>Review</th>
                        <th class="w40"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, index) => (
                        <tr key={row.id}>
                          <td>{row.id}</td>
                          <td>{row.name}</td>
                          <td>{row.designation}</td>
                          <td>{row.address}</td>
                          <td>{row.rate}</td>
                          <td>{row.experience}</td>
                          <td>
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`fa fa-star ${i < row.stars ? 'text-orange' : ''}`}
                              ></i>
                            ))}
                          </td>
                          <td>
                            <div className="item-action dropdown">
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleDropdown(index);
                                }}
                                aria-expanded={openDropdownIndex === index}
                              >
                                <i className="fa fa-ellipsis-h"></i>
                              </a>
                              <div
                                className={`dropdown-menu dropdown-menu-right ${openDropdownIndex === index ? 'show' : ''
                                  }`}
                                style={{
                                  position: 'absolute',
                                  top: '0px',
                                  right: '48px',
                                  transform: 'translate3d(18px, 25px, 0px)',
                                  zIndex: '1000',
                                  display: openDropdownIndex === index ? 'block' : 'none',
                                }}
                              >
                                <a href="fake_url" className="dropdown-item">
                                  <i className="dropdown-icon fa fa-eye"></i> View Details
                                </a>
                                <a href="fake_url" className="dropdown-item">
                                  <i className="dropdown-icon fa fa-share-alt"></i> Share
                                </a>
                                <a href="fake_url" className="dropdown-item">
                                  <i className="dropdown-icon fa fa-cloud-download-alt"></i> Download
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane fade" id="Resumes-grid" role="tabpanel">
                <div class="row clearfix">
                  <div class="col-xl-3 col-lg-4 col-md-6"><div class="card"><div class="body text-center p-4"><img class="rounded-circle w100 img-thumbnail" src="../assets/images/sm/avatar1.jpg" alt="fake_url" /><h6 class="mt-3 mb-0">Michelle Green</h6><span>Web Developer</span><ul class="mt-3 mb-4 list-unstyled d-flex justify-content-center"><li><a class="p-3" target="_blank" href="/#">Java</a></li><li><a class="p-3" target="_blank" href="/#">CSS</a></li><li><a class="p-3" target="_blank" href="/#">HTML</a></li></ul><hr /><div class="d-flex justify-content-between"><div><i class="fa fa-dollar"></i> 55 / hour</div><div><i class="fa fa-map-marker"></i> Akron, OH</div></div></div></div></div>
                  <div class="col-xl-3 col-lg-4 col-md-6"><div class="card"><div class="body text-center p-4">
                    <img class="rounded-circle w100 img-thumbnail" src="../assets/images/sm/avatar2.jpg" alt="fake_url" /><h6 class="mt-3 mb-0">Jason Porter</h6><span>Carol@info.com</span><ul class="mt-3 mb-4 list-unstyled d-flex justify-content-center"><li><a class="p-3" target="_blank" href="/#">Creativity</a></li><li><a class="p-3" target="_blank" href="/#">UIUX</a></li></ul><hr /><div class="d-flex justify-content-between"><div><i class="fa fa-dollar"></i> 55 / hour</div><div><i class="fa fa-map-marker"></i> Akron, OH</div></div></div></div></div><div class="col-xl-3 col-lg-4 col-md-6"><div class="card"><div class="body text-center p-4"><img class="rounded-circle w100 img-thumbnail" src="../assets/images/sm/avatar3.jpg" alt="fake_url" /><h6 class="mt-3 mb-0">David Wallace</h6><span>Michelle@info.com</span><ul class="mt-3 mb-4 list-unstyled d-flex justify-content-center"><li><a class="p-3" target="_blank" href="/#">Swift</a></li><li><a class="p-3" target="_blank" href="/#">Xcode</a></li>
                      <li><a class="p-3" target="_blank" href="/#">C#</a></li></ul><hr /><div class="d-flex justify-content-between"><div><i class="fa fa-dollar"></i> 55 / hour</div><div><i class="fa fa-map-marker"></i> Akron, OH</div></div></div></div></div><div class="col-xl-3 col-lg-4 col-md-6"><div class="card"><div class="body text-center p-4">
                        <img class="rounded-circle w100 img-thumbnail" src="../assets/images/sm/avatar4.jpg" alt="fake_url" /><h6 class="mt-3 mb-0">Michelle Green</h6><span>jason-porter@info.com</span><ul class="mt-3 mb-4 list-unstyled d-flex justify-content-center"><li><a class="p-3" target="_blank" href="/#">Android</a></li><li><a class="p-3" target="_blank" href="/#">Playstor</a></li><li><a class="p-3" target="_blank" href="/#">Perl</a></li></ul><hr /><div class="d-flex justify-content-between"><div><i class="fa fa-dollar"></i> 55 / hour</div><div><i class="fa fa-map-marker"></i> Akron, OH</div></div>
                      </div>
                      </div>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-6">
                    <div class="card">
                      <div class="body text-center p-4">
                        <img class="rounded-circle w100 img-thumbnail" src="../assets/images/sm/avatar5.jpg" alt="fake_url" />
                        <h6 class="mt-3 mb-0">Michelle Green</h6><span>jason-porter@info.com</span>
                        <ul class="mt-3 mb-4 list-unstyled d-flex justify-content-center">
                          <li><a class="p-3" target="_blank" href="/#">Negotiation</a></li><li><a class="p-3" target="_blank" href="/#">Writing</a></li></ul><hr /><div class="d-flex justify-content-between"><div><i class="fa fa-dollar"></i> 55 / hour</div><div><i class="fa fa-map-marker"></i> Akron, OH</div></div></div></div></div><div class="col-xl-3 col-lg-4 col-md-6"><div class="card"><div class="body text-center p-4"><img class="rounded-circle w100 img-thumbnail" src="../assets/images/sm/avatar6.jpg" alt="fake_url" /><h6 class="mt-3 mb-0">Michelle Green</h6><span>jason-porter@info.com</span><ul class="mt-3 mb-4 list-unstyled d-flex justify-content-center"><li><a class="p-3" target="_blank" href="/#">HTML</a></li><li><a class="p-3" target="_blank" href="/#">CSS</a></li><li><a class="p-3" target="_blank" href="/#">SCSS</a></li></ul><hr /><div class="d-flex justify-content-between"><div><i class="fa fa-dollar"></i> 55 / hour</div><div><i class="fa fa-map-marker"></i> Akron, OH</div></div></div></div></div><div class="col-xl-3 col-lg-4 col-md-6"><div class="card"><div class="body text-center p-4"><img class="rounded-circle w100 img-thumbnail" src="../assets/images/sm/avatar1.jpg" alt="fake_url" /><h6 class="mt-3 mb-0">Sean Black</h6><span>jason-porter@info.com</span><ul class="mt-3 mb-4 list-unstyled d-flex justify-content-center"><li><a class="p-3" target="_blank" href="/#">PHP</a></li><li><a class="p-3" target="_blank" href="/#">Wordpress</a></li></ul><hr /><div class="d-flex justify-content-between"><div><i class="fa fa-dollar"></i> 55 / hour</div><div><i class="fa fa-map-marker"></i> Akron, OH</div></div></div></div></div><div class="col-xl-3 col-lg-4 col-md-6"><div class="card"><div class="body text-center p-4"><img class="rounded-circle w100 img-thumbnail" src="../assets/images/sm/avatar2.jpg" alt="fake_url" /><h6 class="mt-3 mb-0">David Wallace</h6><span>jason-porter@info.com</span><ul class="mt-3 mb-4 list-unstyled d-flex justify-content-center"><li><a class="p-3" target="_blank" href="/#">C#</a></li><li><a class="p-3" target="_blank" href="/#">SQL</a></li><li><a class="p-3" target="_blank" href="/#">HTML</a></li></ul><hr /><div class="d-flex justify-content-between"><div><i class="fa fa-dollar"></i> 55 / hour</div><div><i class="fa fa-map-marker"></i> Akron, OH</div></div></div></div></div></div></div></div></div>
        </div>

      ) : activeApplicantTab === 'grid' ? (
        <div class="section-body">
          <div class="container-fluid">
            <div class="tab-content">
              <div class="tab-pane fade active show" id="Resumes-grid" role="tabpanel">
                <div class="row clearfix"><div class="col-xl-3 col-lg-4 col-md-6">
                  <div class="card">
                    <div class="body text-center p-4"> <i class="fa fa-user fa-2x"></i>
                      <h6 class="mt-3 mb-0">Michelle Green</h6><span>Web Developer</span><ul class="mt-3 mb-4 list-unstyled d-flex justify-content-center"><li><a class="p-3" target="_blank" href="/#">Java</a></li>
                        <li><a class="p-3" target="_blank" href="/#">CSS</a></li><li><a class="p-3" target="_blank" href="/#">HTML</a></li>
                      </ul>
                      <hr />
                      <div class="d-flex justify-content-between"><div>
                        <i class="fa fa-dollar"></i> 55 / hour</div><div><i class="fa fa-map-marker"></i> Akron, OH</div></div></div></div></div>
                  <div class="col-xl-3 col-lg-4 col-md-6"><div class="card"><div class="body text-center p-4"> <i class="fa fa-user fa-2x"></i>
                    <h6 class="mt-3 mb-0">Jason Porter</h6><span>Carol@info.com</span><ul class="mt-3 mb-4 list-unstyled d-flex justify-content-center"><li><a class="p-3" target="_blank" href="/#">Creativity</a></li>
                      <li><a class="p-3" target="_blank" href="/#">UIUX</a></li></ul><hr /><div class="d-flex justify-content-between"><div><i class="fa fa-dollar"></i> 55 / hour</div>
                      <div><i class="fa fa-map-marker"></i> Akron, OH</div></div></div></div></div><div class="col-xl-3 col-lg-4 col-md-6"><div class="card"><div class="body text-center p-4"> <i class="fa fa-user fa-2x"></i>
                        <h6 class="mt-3 mb-0">David Wallace</h6><span>Michelle@info.com</span><ul class="mt-3 mb-4 list-unstyled d-flex justify-content-center"><li><a class="p-3" target="_blank" href="/#">Swift</a></li><li><a class="p-3" target="_blank" href="/#">Xcode</a></li><li><a class="p-3" target="_blank" href="/#">C#</a></li>
                        </ul><hr />
                        <div class="d-flex justify-content-between">
                          <div><i class="fa fa-dollar"></i> 55 / hour</div>
                          <div><i class="fa fa-map-marker"></i> Akron, OH</div></div></div></div></div>
                  <div class="col-xl-3 col-lg-4 col-md-6"><div class="card"><div class="body text-center p-4"> <i class="fa fa-user fa-2x"></i>
                    <h6 class="mt-3 mb-0">Michelle Green</h6><span>jason-porter@info.com</span><ul class="mt-3 mb-4 list-unstyled d-flex justify-content-center"><li><a class="p-3" target="_blank" href="/#">Android</a></li><li><a class="p-3" target="_blank" href="/#">Playstor</a></li><li><a class="p-3" target="_blank" href="/#">Perl</a></li></ul><hr />
                    <div class="d-flex justify-content-between"><div><i class="fa fa-dollar"></i> 55 / hour</div>
                      <div><i class="fa fa-map-marker"></i> Akron, OH</div></div></div></div></div><div class="col-xl-3 col-lg-4 col-md-6">
                    <div class="card"><div class="body text-center p-4"> <i class="fa fa-user fa-2x"></i>
                      <h6 class="mt-3 mb-0">Michelle Green</h6><span>jason-porter@info.com</span>
                      <ul class="mt-3 mb-4 list-unstyled d-flex justify-content-center"><li>
                        <a class="p-3" target="_blank" href="/#">Negotiation</a></li><li><a class="p-3" target="_blank" href="/#">Writing</a></li></ul><hr /><div class="d-flex justify-content-between"><div><i class="fa fa-dollar"></i> 55 / hour</div><div><i class="fa fa-map-marker"></i> Akron, OH</div></div></div></div></div>
                  <div class="col-xl-3 col-lg-4 col-md-6"><div class="card"><div class="body text-center p-4"> <i class="fa fa-user fa-2x"></i><h6 class="mt-3 mb-0">Michelle Green</h6><span>jason-porter@info.com</span><ul class="mt-3 mb-4 list-unstyled d-flex justify-content-center"><li><a class="p-3" target="_blank" href="/#">HTML</a></li><li><a class="p-3" target="_blank" href="/#">CSS</a></li><li><a class="p-3" target="_blank" href="/#">SCSS</a></li>
                  </ul><hr /><div class="d-flex justify-content-between"><div><i class="fa fa-dollar"></i> 55 / hour</div><div><i class="fa fa-map-marker"></i> Akron, OH</div></div></div></div></div><div class="col-xl-3 col-lg-4 col-md-6"><div class="card"><div class="body text-center p-4"> <i class="fa fa-user fa-2x"></i><h6 class="mt-3 mb-0">Sean Black</h6><span>jason-porter@info.com</span>
                    <ul class="mt-3 mb-4 list-unstyled d-flex justify-content-center"><li><a class="p-3" target="_blank" href="/#">PHP</a></li><li><a class="p-3" target="_blank" href="/#">Wordpress</a></li></ul><hr /><div class="d-flex justify-content-between"><div><i class="fa fa-dollar"></i> 55 / hour</div><div><i class="fa fa-map-marker"></i> Akron, OH</div></div></div></div></div>
                  <div class="col-xl-3 col-lg-4 col-md-6"><div class="card"><div class="body text-center p-4"> <i class="fa fa-user fa-2x"></i><h6 class="mt-3 mb-0">David Wallace</h6><span>jason-porter@info.com</span><ul class="mt-3 mb-4 list-unstyled d-flex justify-content-center"><li><a class="p-3" target="_blank" href="/#">C#</a></li><li><a class="p-3" target="_blank" href="/#">SQL</a></li>
                    <li><a class="p-3" target="_blank" href="/#">HTML</a></li></ul><hr /><div class="d-flex justify-content-between"><div><i class="fa fa-dollar"></i> 55 / hour</div><div><i class="fa fa-map-marker"></i> Akron, OH</div>
                    </div>
                  </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      ) : null
      }
    </div >
  )
}
