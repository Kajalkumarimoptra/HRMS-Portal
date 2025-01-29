import React from 'react'

export default function Applicant() {
  return (
    <div class="section-body">
      <div class="container-fluid">
        <div class="row clearfix">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-4 col-md-4 col-sm-6"><label>Search</label>
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="Search..." fdprocessedid="tvmhpcn" />
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6"><label>Status</label>
                    <div class="multiselect_div">
                      <select class="custom-select" fdprocessedid="uh6x3">
                        <option>None Selected</option>
                        <option value="1">All Status</option>
                        <option value="2">New</option>
                        <option value="3">Contacted</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6" style={{ marginTop : '17px'}}><label>Order</label>
                    <div class="form-group">
                      <select class="custom-select" fdprocessedid="nfiroe">
                        <option>Newest first</option>
                        <option value="1">Oldest first</option>
                        <option value="2">Low salary first</option>
                        <option value="3">High salary first</option>
                        <option value="3">Sort by name</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-4 col-sm-6"><label>&nbsp;</label><a href="fake_url" class="btn btn-sm btn-primary btn-block">Filter</a></div>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-hover table-vcenter table_custom text-nowrap spacing5 border-style mb-0">
                <tbody>
                  <tr>
                    <td class="w60"><div class="avatar avatar-pink" data-toggle="tooltip" data-placement="top" data-original-title="Avatar Name"><span>GH</span></div></td>
                    <td><div class="font-15">Google Inc.</div><span class="text-muted">Full-stack developer</span></td>
                    <td>$60 per hour</td>
                    <td><span className='applicant-role'>Full-time</span></td>
                    <td><span>123 6th St. Melbourne, FL 32904</span></td>
                    <td class="text-right">Applied on: <strong>04 Jan, 2019</strong></td>
                  </tr>
                  <tr>
                    <td class="w60"><span>FI</span></td>
                    <td><div class="font-15">FaceBook Inc.</div><span class="text-muted">Marketing</span></td>
                    <td>$57 per hour</td>
                    <td><span className='applicant-part-role'>Part-time</span></td>
                    <td><span>44 Shirley Ave. IL 60185</span></td>
                    <td class="text-right">Applied on: <strong>12 Jan, 2019</strong></td>
                  </tr>
                  <tr>
                    <td class="w60"><span>FI</span></td>
                    <td><div class="font-15">FaceBook Inc.</div><span class="text-muted">Full-stack developer</span></td>
                    <td>$43 per hour</td><td><span className='applicant-role'>Full-time</span></td>
                    <td><span>44 Shirley Ave. IL 60185</span></td>
                    <td class="text-right">Applied on: <strong>15 Jan, 2019</strong></td>
                  </tr>
                  <tr>
                    <td class="w60"><span>FT</span>
                    </td>
                    <td><div class="font-15">FaceBook Inc.</div><span class="text-muted">Web Application Developer</span></td>
                    <td>$55 per hour</td>
                    <td><span className='applicant-role'>Full-time</span></td>
                    <td><span>514 S. Magnolia St. Orlando</span></td>
                    <td class="text-right">Applied on: <strong>18 Jan, 2019</strong></td>
                  </tr>
                  <tr>
                    <td class="w60"><div class="avatar avatar-blue" data-toggle="tooltip" data-placement="top" data-original-title="Avatar Name"><span>KT</span></div></td>
                    <td><div class="font-15">FaceBook Inc.</div><span class="text-muted">Designer</span></td>
                    <td>$43 per hour</td><td><span className='applicant-part-role'>Part-time</span></td>
                    <td><span>44 Shirley Ave. IL 60185</span></td><td class="text-right">Applied on: <strong>24 Jan, 2019</strong></td>
                  </tr>
                  <tr>
                    <td class="w60"><span>II</span></td>
                    <td><div class="font-15">iQuar Inc.</div><span class="text-muted">Sr. SQL Server Developer</span></td>
                    <td>$33 per hour</td><td><span className='applicant-role'>Full-time</span></td>
                    <td><span>44 Shirley Ave. IL 60185</span></td>
                    <td class="text-right">Applied on: <strong>05 Feb, 2019</strong></td>
                  </tr>
                  <tr>
                    <td class="w60"><span>LI</span></td>
                    <td><div class="font-15">Linkdin Inc.</div><span class="text-muted">Full-stack developer</span></td>
                    <td>$39 per hour</td>
                    <td><span className='applicant-role'>Full-time</span></td>
                    <td><span>44 Shirley Ave. IL 60185</span></td>
                    <td class="text-right">Applied on: <strong>11 March, 2019</strong></td>
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
