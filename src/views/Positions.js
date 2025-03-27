import React from 'react';

export default function Positions() {
  return (
    <div class="section-body">
      <div class="container-fluid">
        <div class="row clearfix">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-2 col-md-4 col-sm-6"><label>Search</label>
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="Search..." fdprocessedid="iuli6"  style={{ fontSize : '14px'}}/>
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-4 col-sm-6"><label>TYPE</label>
                    <div class="multiselect_div">
                      <select class="custom-select" fdprocessedid="2wnxsx">
                        <option>None Selected</option>
                        <option value="1">Part Time</option>
                        <option value="2">Full Time</option>
                        <option value="3">All Type</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-4 col-sm-6" style={{ marginTop:'18px' }}><label>Category</label>
                    <div class="form-group">
                      <select class="custom-select"fdprocessedid="hgtyk">
                        <option>Designer</option>
                        <option value="1">Project Manager</option>
                        <option value="2">Senior Developer</option>
                        <option value="3">Front-end Developer</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-4 col-sm-6"><label>Salary</label>
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="Min. Salary" fdprocessedid="b7g47"  style={{ fontSize : '14px'}} />
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-4 col-sm-6"><label>&nbsp;</label>
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="Max. Salary" fdprocessedid="2bdrht"  style={{ fontSize : '14px'}} />
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-4 col-sm-6"><label>&nbsp;</label><a href="fake_url;" class="btn btn-sm btn-primary btn-block">Filter</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-hover table-vcenter table_custom text-nowrap spacing5 mb-0">
                <tbody>
                  <tr>
                    <td class="w60"><span class="avatar avatar-orange" data-toggle="tooltip" data-placement="top" data-original-title="Avatar Name">GI</span></td>
                    <td><div>Google Inc.</div>
                      <span class="text-muted">Full-stack developer</span>
                    </td>
                    <td><span className="position-role">Full-time</span></td>
                    <td>Applicants: <strong>0</strong></td>
                    <td><span>44 Shirley Ave. West Chicago, IL 60185</span></td>
                    <td><span className="position-approval-role">Pending approval</span></td>
                  </tr>
                  <tr>
                    <td class="w60"><span class="avatar avatar-blue" data-toggle="tooltip" data-placement="top" data-original-title="Avatar Name">FB</span></td>
                    <td><div>Facebook Inc.</div>
                      <span class="text-muted">Designer</span>
                    </td>
                    <td><span className="position-role">Full-time</span></td>
                    <td>Applicants: <strong>45</strong></td>
                    <td><span>123 6th St. Melbourne, FL 32904</span></td>
                    <td><span className="position-approval-role">12 days to expire</span></td>
                  </tr><tr><td class="w60"><span class="avatar avatar-green" data-toggle="tooltip" data-placement="top" data-original-title="Avatar Name">TF</span></td>
                    <td><div class="company-name">Themeforest Inc.</div><span class="text-muted post">Web Application Developer</span></td>
                    <td><span className="position-role">Freelance</span></td>
                    <td>Applicants: <strong>50</strong></td>
                    <td><span>44 Shirley Ave. West Chicago, IL 60185</span></td>
                    <td><span className="position-approval-role">12 days to expire</span></td>
                  </tr>
                  <tr>
                    <td class="w60"><span class="avatar avatar-cyan" data-toggle="tooltip" data-placement="top" data-original-title="Avatar Name">LD</span></td>
                    <td><div class="company-name">Linkdin Inc.</div><span class="text-muted post">Marketing</span></td>
                    <td><span className="position-role">Freelance</span></td>
                    <td>Applicants: <strong>17</strong></td>
                    <td><span>514 S. Magnolia St. Orlando, FL 32806</span></td>
                    <td><span className="position-approval-role">24 days to expire</span></td>
                  </tr>
                  <tr>
                    <td class="w60"><span class="avatar avatar-azure" data-toggle="tooltip" data-placement="top" data-original-title="Avatar Name">MS</span></td>
                    <td><div class="company-name">Microsoft Inc.</div><span class="text-muted">Sr. SQL Server Developer</span></td>
                    <td><span className="position-role post">Part-time</span></td>
                    <td>Applicants: <strong>33</strong></td><td><span>70 Bowman St. South Windsor</span></td>
                    <td><span className="position-approval-role">29 days to expire</span></td>
                  </tr>
                  <tr>
                    <td class="w60"><span class="avatar avatar-blue" data-toggle="tooltip" data-placement="top" data-original-title="Avatar Name">GI</span></td>
                    <td><div class="company-name">Facebook Inc.</div><span class="text-muted">Designer</span></td>
                    <td><span className="position-role post">Full-time</span></td>
                    <td>Applicants: <strong>45</strong></td>
                    <td><span>123 6th St. Melbourne, FL 32904</span></td>
                    <td><span className="position-approval-role">12 days to expire</span></td>
                  </tr>
                  <tr>
                    <td class="w60"><span class="avatar avatar-green" data-toggle="tooltip" data-placement="top" data-original-title="Avatar Name">GI</span></td>
                    <td><div class="font-15">Themeforest Inc.</div><span class="text-muted">Web Application Developer</span></td>
                    <td><span className="position-role">Freelance</span></td><td style={{ fontSize: '14px'}}>Applicants: <strong>50</strong></td>
                    <td><span>44 Shirley Ave. West Chicago, IL 60185</span></td>
                    <td><span className="position-approval-role">12 days to expire</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul class="pagination mt-2">
              <li class="page-item"><a class="page-link" href="fake_url;">Previous</a></li>
              <li class="page-item active"><a class="page-link" href="fake_url;">1</a></li>
              <li class="page-item"><a class="page-link" href="fake_url;">2</a></li>
              <li class="page-item"><a class="page-link" href="fake_url;">3</a></li>
              <li class="page-item"><a class="page-link" href="fake_url;">Next</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
