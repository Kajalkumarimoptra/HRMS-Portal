import React from 'react'

export default function Settings() {
  return (
    <div>
      <div class="section-body">
        <div class="container-fluid">
          <div class="row clearfix">
            <div class="col-lg-4 col-md-12" style={{ marginTop: '-210px'}}>
              <ul class="list-group mb-3">
                <li class="list-group-item">
                  <div class="media mb-0"> <i class="fa fa-user fa-2x"></i>
                    <div class="media-body"><h5 class="ml-4">Deborah Cox</h5><p class="text-muted mb-0 ml-4 post">Webdeveloper</p></div></div>
                </li>
                <li class="list-group-item"><small class="text-muted">Title: </small><p class="mb-0">FaceBook Inc.</p></li>
                <li class="list-group-item"><small class="text-muted">Address: </small><p class="mb-0">44 Shirley Ave. IL 60185</p></li>
                <li class="list-group-item"><small class="text-muted">Date: </small><p class="mb-0">07 Feb 2019</p></li>
                <li class="list-group-item"><div>In Progress</div>
                  <div class="progress progress-xs mt-2" style={{ height:'0.25rem'}}>
                    <div class="progress-bar" data-transitiongoal="67" aria-valuenow="67" style={{ width: "67%", backgroundColor:'#e8769f', border:'transparent' }}>
                    </div>
                  </div>
                </li>
                <li class="list-group-item">Notifications<div class="float-right"><label class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" checked="" /><span class="custom-control-label">&nbsp;</span></label></div></li>
                <li class="list-group-item">Messages<div class="float-right"><label class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" checked="" /><span class="custom-control-label">&nbsp;</span></label></div></li>
                <li class="list-group-item">Message email<div class="float-right"><label class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" /><span class="custom-control-label">&nbsp;</span></label></div></li>
                <li class="list-group-item">Applicant email<div class="float-right"><label class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" checked="" /><span class="custom-control-label">&nbsp;</span></label></div></li>
              </ul>
            </div>
            <div class="col-lg-8 col-md-12">
              <div class="card">
                <div class="card-header settings-header">
                  <h3 class="card-title">General Settings</h3>
                  <div class="card-options"><span class="card-options-remove" data-toggle="card-remove">
                    <i class="fa fa-times" style={{ opacity: '0.7' }}></i></span><div class="item-action dropdown ml-2"><a href="fake_url" data-toggle="dropdown">
                    <i class="fas fa-ellipsis-v fa-sm" style={{ opacity: '0.7' }}></i></a>
                    <div class="dropdown-menu dropdown-menu-right"><a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-eye"></i> View Details </a><a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-share-alt"></i> Share </a><a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-cloud-download"></i> Download</a>
                      <div class="dropdown-divider"></div><a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-copy"></i> Copy to</a><a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-folder"></i> Move to</a><a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-edit"></i> Rename</a><a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-trash"></i> Delete</a>
                    </div>
                  </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="row clearfix">
                    <div class="col-lg-6 col-md-12">
                      <div class="form-group">
                        <input type="text" class="form-control" placeholder="First Name" fdprocessedid="2mggih" />
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-12">
                      <div class="form-group">
                        <input type="text" class="form-control" placeholder="Last Name" fdprocessedid="vn6w7" />
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-12">
                      <div class="form-group">
                        <select class="form-control" fdprocessedid="abt18c">
                          <option value="true">-- Select Gender --</option>
                          <option value="AF">Male</option>
                          <option value="AX">Female</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-12"><div class="form-group"><div class="input-group"><div class="react-datepicker-wrapper"><div class="react-datepicker__input-container">
                      <input type="text" class="form-control" value="11/19/2024" fdprocessedid="1vkixq" />
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    <div class="col-lg-4 col-md-12"><div class="form-group"><div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><i class="icon-globe"></i></span></div>
                      <input type="text" class="form-control" placeholder="http://" fdprocessedid="fg48nd" />
                    </div>
                    </div>
                    </div>
                    <div class="col-lg-4 col-md-12">
                      <div class="form-group">
                        <select class="form-control" fdprocessedid="ykp3ai">
                          <option value="true">-- Select Country --</option>
                          <option value="AF">Afghanistan</option>
                          <option value="AX">Åland Islands</option>
                          <option value="AL">Albania</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-12">
                      <div class="form-group">
                        <input type="text" class="form-control" placeholder="State/Province" fdprocessedid="5lg0rl" />
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-12">
                      <div class="form-group">
                        <input type="text" class="form-control" placeholder="City" fdprocessedid="ae2ici" />
                      </div>
                    </div>
                    <div class="col-lg-12 col-md-12">
                      <div class="form-group">
                        <textarea rows="4" type="text" class="form-control" placeholder="Address"></textarea>
                      </div>
                    </div>
                  </div>
                  <button type="button" class="btn add-btn btn-primary" fdprocessedid="i97gh4">Update</button> &nbsp;&nbsp;
                  <button type="button" class="btn cancel-btn btn-default" fdprocessedid="i4mb6h">Cancel</button>
                </div>
              </div>
              <div class="card"><div class="card-header account-data"><h3 class="card-title">Account Data</h3><div class="card-options"><span class="card-options-remove" data-toggle="card-remove">
              <i class="fa fa-times" style={{ opacity: '0.7' }}></i></span>
                <div class="item-action dropdown ml-2"><a href="fake_url" data-toggle="dropdown">
                  <i class="fas fa-ellipsis-v fa-sm" style = {{ opacity: '0.7' }} ></i></a><div class="dropdown-menu dropdown-menu-right"><a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-eye"></i> View Details </a>
                  <a href="fake_url" class="dropdown-item">
                    <i class="dropdown-icon fa fa-share-alt"></i> Share </a><a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-cloud-download"></i> Download</a><div class="dropdown-divider"></div>
                  <a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-copy"></i> Copy to</a><a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-folder"></i> Move to</a><a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-edit"></i> Rename</a><a href="fake_url" class="dropdown-item"><i class="dropdown-icon fa fa-trash"></i> Delete</a></div></div></div></div><div class="card-body"><div class="row clearfix"><div class="col-lg-4 col-md-12">
                    <div class="form-group">
                      <input type="text" class="form-control" disabled="" placeholder="Username" value="louispierce" fdprocessedid="wn3na" />
                    </div>
                  </div>
                    <div class="col-lg-4 col-md-12">
                      <div class="form-group">
                        <input type="email" class="form-control" placeholder="Email" value="louis.info@yourdomain.com" fdprocessedid="4qltid" />
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-12">
                      <div class="form-group">
                        <input type="text" class="form-control" placeholder="Phone Number" fdprocessedid="ienxxt" />
                      </div>
                    </div>
                    <div class="col-lg-12 col-md-12"><hr /><h6>Change Password</h6><div class="form-group">
                      <input type="password" class="form-control" placeholder="Current Password" fdprocessedid="8rszoo" />
                    </div>
                      <div class="form-group"><input type="password" class="form-control" placeholder="New Password" fdprocessedid="lrpt6q" />
                      </div>
                      <div class="form-group"><input type="password" class="form-control" placeholder="Confirm New Password" fdprocessedid="bi5kkb" />
                      </div>
                    </div>
                  </div>
                  <button type="button" class="btn btn-primary add-btn" fdprocessedid="5d730e">Update</button> &nbsp;&nbsp;
                  <button type="button" class="btn cancel-btn btn-default" fdprocessedid="yqv6n">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
