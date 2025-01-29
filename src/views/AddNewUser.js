import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddNewUser() {

    const navigate = useNavigate();

    return (
        <div className='container-fluid'>
            <div class="section-body">
                <div class="container-fluid">
                    <div class="tab-content">
                        <div class="tab-pane active" id="user-add" role="tabpanel">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row clearfix">
                                        <div class="col-lg-6 col-md-6 col-sm-12">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="Employee ID *" fdprocessedid="7fgvw" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="Email ID *" fdprocessedid="u236k" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="First Name *" fdprocessedid="l0jt6s" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="Last Name" fdprocessedid="lyczwj" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-12">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="Mobile No" fdprocessedid="4jdgkn" />
                                            </div>
                                        </div>
                                        {/* <div class="col-md-4 col-sm-12">
                                            <div class="form-group">
                                                <select class="form-control show-tick" fdprocessedid="24srt">
                                                    <option>Select Role Type</option>
                                                    <option>Super Admin</option>
                                                    <option>Admin</option>
                                                    <option>Employee</option>
                                                </select>
                                            </div>
                                        </div> */}
                                        {/* <div class="col-md-4 col-sm-12">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="Username *" fdprocessedid="n9m3vj" />
                                            </div>
                                        </div> */}
                                        <div class="col-md-4 col-sm-12">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="Password" fdprocessedid="cu2bm" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-12">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="Confirm Password" fdprocessedid="ecd09p" />
                                            </div>
                                        </div>
                                        {/* add, close btns */}
                                        <div className='btn-grp ml-3 mt-2'>
                                            <button type="button" class="add-btn" fdprocessedid="zkgv1b">Add</button>
                                        </div>

                                        {/* module permission */}
                                        {/* <div class="col-12"> */}
                                            {/* <hr class="mt-4" /><h6>Module Permission</h6> */}
                                            {/* <div class="table-responsive">
                                                <table class="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Read</th>
                                                            <th>Write</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Super Admin</td>
                                                            <td><label class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" checked disabled />
                                                                <span class="custom-control-label">&nbsp;</span>
                                                            </label>
                                                            </td>
                                                            <td><label class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" checked disabled />
                                                                <span class="custom-control-label">&nbsp;</span>
                                                            </label>
                                                            </td>
                                                            <td><label class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" checked disabled />
                                                                <span class="custom-control-label">&nbsp;</span>
                                                            </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Admin</td>
                                                            <td><label class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" checked disabled />
                                                                <span class="custom-control-label">&nbsp;</span>
                                                            </label>
                                                            </td>
                                                            <td><label class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" checked disabled />
                                                                <span class="custom-control-label">&nbsp;</span>
                                                            </label>
                                                            </td>
                                                            <td><label class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" disabled />
                                                                <span class="custom-control-label">&nbsp;</span>
                                                            </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Employee</td>
                                                            <td><label class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" disabled />
                                                                <span class="custom-control-label">&nbsp;</span>
                                                            </label>
                                                            </td>
                                                            <td><label class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" disabled />
                                                                <span class="custom-control-label">&nbsp;</span>
                                                            </label>
                                                            </td>
                                                            <td><label class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" disabled />
                                                                <span class="custom-control-label">&nbsp;</span>
                                                            </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>HR Admin</td>
                                                            <td><label class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" checked disabled />
                                                                <span class="custom-control-label">&nbsp;</span>
                                                            </label>
                                                            </td>
                                                            <td><label class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" checked disabled />
                                                                <span class="custom-control-label">&nbsp;</span>
                                                            </label>
                                                            </td>
                                                            <td><label class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" disabled />
                                                                <span class="custom-control-label">&nbsp;</span>
                                                            </label>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div> */}
                                            {/* <div className='btn-grp'>
                                                <button type="button" class="add-btn" fdprocessedid="zkgv1b">Add</button>
                                                <button type="button" class="close-btn" data-dismiss="modal" fdprocessedid="ahilx3">Close</button>
                                            </div> */}
                                        {/* </div> */}
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
