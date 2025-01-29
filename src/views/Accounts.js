import React, { useState } from 'react';
import CountUp from 'react-countup';

export default function Accounts() {

  const [activeAccountTab, setActiveAccountTab] = useState('invoices');

  // for handling view
  const handleAccountView = (tab) => {
    setActiveAccountTab(tab);
  }

  return (
    <div className='container-fluid' style={{ marginTop: '-10px'}}>
      <div class="d-flex justify-content-between align-items-center">
        <ul class="nav nav-tabs page-header-tab">
          <li class="nav-item">
            <a class={`nav-link ${activeAccountTab === 'invoices' ? 'active' : ''}`} id="account-invoices-list" onClick={() => handleAccountView('invoices')} data-toggle="tab" href="#account-invoices-list">Invoices</a>
          </li>
          <li class="nav-item">
            <a class={`nav-link ${activeAccountTab === 'payments' ? 'active' : ''}`} id="account-payments-view" onClick={() => handleAccountView('payments')} data-toggle="tab" href="#account-payments-view">Payments</a>
          </li>
          <li class="nav-item">
            <a class={`nav-link ${activeAccountTab === 'expenses' ? 'active' : ''}`} id="account-expenses-view" onClick={() => handleAccountView('expenses')} data-toggle="tab" href="#account-expenses-view">Expenses</a>
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
      {activeAccountTab === 'invoices' ? (
        <div className='section-body mt-3'>
          <div className='container-fluid'>
            {/* counter */}
            <div class="row clearfix">
              <div class="col-lg-3 col-md-6">
                <div class="card">
                  <div class="card-body">
                    <div>Total Accounts</div>
                    <div class="py-4 m-0 text-center h1 text-secondary counter"><span className='acc-counter'>78</span></div>
                    <div class="d-flex mb-0">
                      <small class="text-muted">This years</small>
                      <div class="ml-auto"><i class="fa fa-caret-up text-secondary"></i>4%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6">
                <div class="card">
                  <div class="card-body">
                    <div>New Account</div>
                    <div class="py-4 m-0 text-center h1 text-secondary counter"><span className='acc-counter'>28</span></div>
                    <div class="d-flex mb-0"><small class="text-muted">This years</small>
                      <div class="ml-auto"><i class="fa fa-caret-up text-secondary"></i>13%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6">
                <div class="card">
                  <div class="card-body">
                    <div>Total Current A/C</div>
                    <div class="py-4 m-0 text-center h1 text-secondary counter"><span className='acc-counter'>8</span></div>
                    <div class="d-flex mb-0">
                      <small class="text-muted">This years</small>
                      <div class="ml-auto"><i class="fa fa-caret-up text-secondary"></i>3%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6">
                <div class="card">
                  <div class="card-body">
                    <div>Total Saving A/C</div>
                    <div class="py-4 m-0 text-center h1 text-secondary counter"><span className='acc-counter'>70</span></div>
                    <div class="d-flex mb-0"><small class="text-muted">This years</small>
                      <div class="ml-auto"><i class="fa fa-caret-down text-secondary"></i>10%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='tab-content'>
              <div className='tab-pane fade active show' id="account-invoices-list" role='tabpanel'>
                <div className='card'>
                  <div class="card-header">
                    <div className='employeelist-header'>
                      <h3 class="card-title mb-0 ml-4">INVOICES</h3>
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
                              <th>INVOICE NO.</th>
                              <th>CLIENTS</th>
                              <th>DATE</th>
                              <th>TYPE</th>
                              <th>Status</th>
                              <th>AMOUNT</th>
                              <th class="acc-action-column">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td class="w40">#LA-5278</td>
                              <td class="d-flex align-items-center">
                                {/* <span class="avatar avatar-blue" data-toggle="tooltip" data-original-title="Avatar Name">MN</span> */}
                                <div>
                                  <h6 class="name-data">VPro tec.lttd</h6>
                                </div>
                              </td>
                              <td>12-Jun-2015</td>
                              <td>
                                <span>paypal</span>
                              </td>
                              <td>
                                <span className="position-role">Approved</span>
                              </td>
                              <td>
                                <span>$4,235</span>
                              </td>
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
                              <td class="w40">#LA-8856</td>
                              <td class="d-flex align-items-center">
                                {/* <span class="avatar avatar-blue" data-toggle="tooltip" data-original-title="Avatar Name">MN</span> */}
                                <div>
                                  <h6 class="name-data">BT Technology</h6>
                                </div>
                              </td>
                              <td>25-July-2015</td>
                              <td>
                                <span>Bitcoin</span>
                              </td>
                              <td>
                                <span className="position-role">Approved</span>
                              </td>
                              <td>
                                <span>$8,935</span>
                              </td>
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
                              <td class="w40">#LA-5566</td>
                              <td class="d-flex align-items-center">
                                {/* <span class="avatar avatar-blue" data-toggle="tooltip" data-original-title="Avatar Name">MN</span> */}
                                <div>
                                  <h6 class="name-data">Reto Tech</h6>
                                </div>
                              </td>
                              <td>03-july-2015</td>
                              <td>
                                <span>paypal</span>
                              </td>
                              <td>
                                <span className="position-approval-role">Pending</span>
                              </td>
                              <td>
                                <span>$1,235</span>
                              </td>
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
                              <td class="w40">#LA-3636</td>
                              <td class="d-flex align-items-center">
                                {/* <span class="avatar avatar-blue" data-toggle="tooltip" data-original-title="Avatar Name">MN</span> */}
                                <div>
                                  <h6 class="name-data">BT Infoweb</h6>
                                </div>
                              </td>
                              <td>19-aug-2015</td>
                              <td>
                                <span>visa</span>
                              </td>
                              <td>
                                <span className="position-approval-role">Pending</span>
                              </td>
                              <td>
                                <span>$3,235</span>
                              </td>
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
        </div>) : activeAccountTab === 'payments' ? (
          <div class="section-body" style={{ marginTop : '-26px' }}>
            <div class="container-fluid">
              <div class="tab-content">
                <div class="tab-pane fade active show" id="account-payments-view" role="tabpanel">
                  <div className='card-body'>
                    <div className='table-responsive'>
                      <table className='table table-hover table-striped table-vcenter text-nowrap mb-0'>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>CLIENTS NAME</th>
                            <th>PROJECT NAME</th>
                            <th>Date</th>
                            <th>TYPE</th>
                            <th>AMOUNT</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="w40">MP-5278</td>
                            <td class="d-flex align-items-center">
                              {/* <span class="avatar avatar-blue" data-toggle="tooltip" data-original-title="Avatar Name">MN</span> */}
                              <div>
                                <h6 class="name-data">Zoe Baker</h6>
                              </div>
                            </td>
                            <td>
                              <span>UPLO</span>
                            </td>
                            <td>12-Jun-2015</td>

                            <td>
                              <span>Paypal</span>
                            </td>
                            <td>
                              <span>$4,235</span>
                            </td>
                          </tr>
                          <tr>
                            <td class="w40">PP-5288</td>
                            <td class="d-flex align-items-center">
                              {/* <span class="avatar avatar-blue" data-toggle="tooltip" data-original-title="Avatar Name">MN</span> */}
                              <div>
                                <h6 class="name-data">Richard Saynne</h6>
                              </div>
                            </td>
                            <td>
                              <span>Angular Dashboard</span>
                            </td>
                            <td>12-July-2015</td>

                            <td>
                              <span>Paypal</span>
                            </td>
                            <td>
                              <span>$1,235</span>
                            </td>
                          </tr>
                          <tr>
                            <td class="w40">kl-5878</td>
                            <td class="d-flex align-items-center">
                              {/* <span class="avatar avatar-blue" data-toggle="tooltip" data-original-title="Avatar Name">MN</span> */}
                              <div>
                                <h6 class="name-data">Nicholas Baker</h6>
                              </div>
                            </td>
                            <td>
                              <span>Hotel Management</span>
                            </td>
                            <td>25-Jun-2015</td>

                            <td>
                              <span>Bitcoin</span>
                            </td>
                            <td>
                              <span>$8,235</span>
                            </td>
                          </tr>
                          <tr>
                            <td class="w40">LK-8585</td>
                            <td class="d-flex align-items-center">
                              {/* <span class="avatar avatar-blue" data-toggle="tooltip" data-original-title="Avatar Name">MN</span> */}
                              <div>
                                <h6 class="name-data">South Saynne</h6>
                              </div>
                            </td>
                            <td>
                              <span>Wordpress</span>
                            </td>
                            <td>12-Jun-2015</td>

                            <td>
                              <span>Paypal</span>
                            </td>
                            <td>
                              <span>$4,888</span>
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
        ) : activeAccountTab === 'expenses' ?
        <div class="section-body" style={{ marginTop : '-26px' }}>
          <div class="container-fluid">
            <div class="tab-content">
              <div class="tab-pane fade active show" id="account-expenses-view" role="tabpanel">
                <div className='card-body'>
                  <div className='table-responsive'>
                    <table className='table table-hover table-striped table-vcenter text-nowrap mb-0'>
                      <thead>
                        <tr>
                          <th>ITEM</th>
                          <th>ORDER BY</th>
                          <th>FROM</th>
                          <th>DATE</th>
                          <th>PAID BY</th>
                          <th>STATUS</th>
                          <th>AMOUNT</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="w40">HP Laptop</td>
                          <td class="d-flex align-items-center">
                            {/* <span class="avatar avatar-blue" data-toggle="tooltip" data-original-title="Avatar Name">MN</span> */}
                            <div>
                              <h6 class="name-data">Richard Saynne</h6>
                            </div>
                          </td>
                          <td>
                            <span>Paytm</span>
                          </td>
                          <td>12-Jun-2015</td>

                          <td>
                            <span>Paypal</span>
                          </td>
                          <td>
                            <span className="position-approval-role">Pending</span>
                          </td>
                          <td>
                            <span>$4,235</span>
                          </td>
                        </tr>
                        <tr>
                          <td class="w40">iMack Desktop</td>
                          <td class="d-flex align-items-center">
                            {/* <span class="avatar avatar-blue" data-toggle="tooltip" data-original-title="Avatar Name">MN</span> */}
                            <div>
                              <h6 class="name-data">Zoe Baker</h6>
                            </div>
                          </td>
                          <td>
                            <span>ebay USA</span>
                          </td>
                          <td>12-July-2015</td>

                          <td>
                            <span>Paypal</span>
                          </td>
                          <td>
                            <span className="position-approval-role">Pending</span>
                          </td>
                          <td>
                            <span>$1,235</span>
                          </td>
                        </tr>
                        <tr>
                          <td class="w40">Macbook Pro Air</td>
                          <td class="d-flex align-items-center">
                            {/* <span class="avatar avatar-blue" data-toggle="tooltip" data-original-title="Avatar Name">MN</span> */}
                            <div>
                              <h6 class="name-data">South Saynne</h6>
                            </div>
                          </td>
                          <td>
                            <span>Amazon</span>
                          </td>
                          <td>25-Jun-2015</td>

                          <td>
                            <span>Bitcoin</span>
                          </td>
                          <td>
                            <span className="position-role">Approved</span>
                          </td>
                          <td>
                            <span>$8,235</span>
                          </td>
                        </tr>
                        <tr>
                          <td class="w40">Dell Monitor</td>
                          <td class="d-flex align-items-center">
                            {/* <span class="avatar avatar-blue" data-toggle="tooltip" data-original-title="Avatar Name">MN</span> */}
                            <div>
                              <h6 class="name-data">Nicholas Baker</h6>
                            </div>
                          </td>
                          <td>
                            <span>Paytm</span>
                          </td>
                          <td>12-Jun-2015</td>

                          <td>
                            <span>Paypal</span>
                          </td>
                          <td>
                            <span className="position-role">Approved</span>
                          </td>
                          <td>
                            <span>$4,888</span>
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

        : null}
    </div>
  )
}
