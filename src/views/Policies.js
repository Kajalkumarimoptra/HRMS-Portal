import React, {useState} from 'react';
import Breadcrumb from './Breadcrumb';

export default function Policies() {
    return (
        <div className='container-fluid'>
            <Breadcrumb />
            <div className='row clearfix'>
                <div className='col-md-12'>
                    <div className='policies-container'>
                        <h4>Company Policies</h4>
                        {/* policies list */}
                        <div className='policies-list-container'>
                       <ul>
                          <span>&#10148;</span> <strong>Employment Terms</strong>
                            <li style={{marginTop: '12px'}}>
                                <p><b>Service Rules:</b> Your services in Moptra will be governed by the service rules and regulations, which are in force or which would be brought into force from time to time. Changes/amendments to these policies and guidelines are made taking into consideration Company’s best interests from time to time. You are advised and instructed to go through these policies and adhere to them during your employment with the Company. </p>
                             </li>
                            <li>
                                <p><b>Full Time Work:</b> Your position is a full-time employment and you shall devote yourself exclusively to the business of the Company. You will not take up any other work – part time or otherwise – or work in advisory capacity or be interested directly or indirectly in any other trade or business without the prior written consent from the Company during your tenure of association with the company. The Company reserves the right to alter or allocate different responsibility to you from time to time depending on the business needs of the Company. </p>
                             </li>
                            <li>
                                <p><b>Probation Period:</b> You will be on probation for a period of <b> Three months </b>from the date of your appointment. On satisfactory completion of the probation period, you will be confirmed in service. If not confirmed after three months, this order will continue to be in operation, and the probation period will stand extended automatically till further notice.</p>
                             </li>
                            <li>
                                <p><b>Notice Period and Termination-</b></p>
                                <ul>
                                    <li><p>Notice Period Slab: <b>60 days</b></p></li>
                                    <li><p>While on probation, this appointment may be terminated by either side by giving seven days’ notice, or seven days salary in lieu of notice period.</p></li>
                                    <li>On confirmation, this appointment may be terminated by either side by giving one months’ notice or one months’ salary in lieu of notice period.</li>
                             <li>Should you resign after confirmation, the Company will have the option to accept your resignation either with immediate effect, and pay you three months’ salary in lieu of notice period or accept it effective any day up to the end of the notice period and pay you salary for the remaining period from the acceptance of resignation till the end of the notice period.</li>
                                    <li>This contract of employment is terminable by either party giving a max 60-day notice during probationary period and a 60-day notice on or after confirmation or on payment of a Gross monthly salary in lieu of a notice period. While on key assignment with any of our clients, in case associate wishes to leave the organization during probation period, the notice period to be served will be 60 days. The decision to the effect of criticality will be decided by the reporting hierarchy. The Company reserves the right to recover Rs. 2,00,000.00 or Gross Monthly Salary (whichever is higher) in lieu of any un-served notice period.</li>
                                    <li>If at any time during your employment, you are found guilty of any act of misconduct or any willful breach or continuous negligence in the terms of this appointment letter or rules or dereliction of duties, disobedience of the instructions given to you from time to time, the management may, without any notice, or payment in lieu of notice, terminate your employment contract. You will be deemed to have brought about such a situation by your own misconduct compelling the management to terminate your contract and in addition you shall be liable for all losses/damages to the Company.</li>
                                </ul>
                             </li>
                            <li>
                                <p><b>Unauthorized Absence:</b><p style={{marginTop: '6px'}}> Unauthorized absence means Absence from authorized place of work during working hours without prior approval whether the attendance has been recorded or not. Unauthorized absence is misconduct and will attract disciplinary action apart from loss of salary for the days of unauthorized absence. </p></p>
                             </li>
                            <li>
                                <p><b>Restricted sites on Internet:</b> <p style={{marginTop: '6px'}}>Any employee found viewing such sites during office hours and on office equipment will be liable to severe disciplinary action, which may include termination of his or her services.</p></p>
                             </li>
                            <li>
                                <p><b>Responsibilities:</b><p style={{marginTop: '6px'}}>You are expected to perform effectively to ensure achievement of required results and you will be required to work under the supervision of such officers as directed by the Company from time to time. Your performance in the assigned role will be periodically reviewed and the feedback will be shared with you. In the event of your performance not measuring up to the expectations of your supervisor, the Company reserves the right to take suitable recourse up to and including termination of your services.</p></p>
                             </li>
                            <li>
                                <p><b>Confidentiality:</b><p style={{marginTop: '6px'}}>You are expected to maintain utmost secrecy in regard to affairs of Moptra and shall keep any information of Moptra, whether written or oral, confidential. Please note that the terms and conditions of your services with Moptra shall be treated as strictly confidential and you are expected not to divulge its contents to any associate of the Company or any person connected with the Company. With respect to the confidentiality obligations undertaken, if required by Moptra or its Clients, you will sign further confidentiality agreements or the like to further protect the interest of Moptra and/or its clients. The confidentiality obligation will be perpetual in nature. Your service shall be terminated with immediate effect without any prior notice in the event of breach of confidentiality provision.</p></p>
                             </li>
                            <li>
                                <p><b>Employee Non-Compete :</b> <p style={{marginTop: '6px'}}>While providing services to Moptra Infotech and for 12 months thereafter (termination of services), undersigned “Employee” shall not enter into a working relationship with any “Moptra Infotech” client, customer or any of customer’s clients either individually or through any other individual or entity that provides the same or similar services as “Moptra Infotech”. Undersigned “Employee” shall not discuss any compensation information, contract terms or payment related issues with “Moptra Infotech” clients. Violation of this may result in immediate removal from assignment. The employee will be part of the new product development team. “Moptra Infotech” expects the “Employee” to maintain full confidently. Violation of this may result in immediate removal from assignment or compel the company to take legal action against the “Employee”. This non-compete agreement shall be in full force and effect for 12 month, commencing with the date of contract termination.</p></p>
                             </li>
                            </ul>
                            <ul>
                            <span>&#10148;</span><strong>Leave</strong>
                            <li style={{marginTop: '12px'}}>You will be governed by the current Leave Policy of the company for permanent employees. In case you are taking leave then you must have an approval in email by your Manager.</li>
                            <li>You are entitled to leave benefits during your employment with the Company. Annual eligibility of Earned leave will depend on the length of service of the Associate. Associates are also entitled to sick leave and a woman Associate shall also be entitled to Maternity Leave and benefits.</li>
                            </ul>
                            <ul>
                            <span>&#10148;</span><strong>Representation</strong>
                            <li  style={{marginTop: '12px', listStyleType: 'none', marginLeft: '-15px'}}>Your appointment with the Company is solely based upon the representations, made by you, regarding your qualifications and/or experience, which the Company has relied upon. If it is found at any point of time that your representation regarding your qualifications and/or experience is incorrect and/or false and/or fraudulent and/or forged, the Company shall, WITHOUT PREJUDICE TO ITS ANY OTHER RIGHTS, terminate your services with immediate effect and without notice period & without incurring any liability whatsoever thereof. Notwithstanding anything contained herein, you shall indemnify and hold the Company harmless from all cost, losses, damages and liabilities that may have been caused to the Company due to such incorrect and/or false and/or fraudulent and/or forged representation. Company shall be entitled to seek specific performance or
                            other injunctive or equitable relief as a remedy apart from claiming indemnity from you, without limitation, for hiring charges of Rs. 2,00,000/- (Rupees Two Lakhs only). By signing this letter, you also irrevocably consent to the Company to initiate and perform all necessary background checks as may be required in and during the course of your employment, either by Company or through any third party authorized by the Company in this regard.
                            </li>
                            </ul>
                            <ul>
                            <span>&#10148;</span><strong>Transfer</strong>
                            <li style={{marginTop: '12px', listStyleType: 'none', marginLeft: '-15px'}}>You will be liable to be transferred to any other department or establishment or branch or subsidiary
                            of the Company in India or abroad. In such a case, you will be governed by the terms and conditions of service as applicable to the new assignment.
                            </li>
                            </ul>
                            <ul>
                            <span>&#10148;</span><strong>Conflict of Interest</strong>
                            <li style={{marginTop: '12px', listStyleType: 'none', marginLeft: '-15px'}}>You will not seek full time or part time job or be involved in any way with competitor’s business activities either directly or indirectly during your employment with the Company, and for a period of 12 months in the event of cessation of your employment with the Company.
                            </li>
                            </ul>
                            <ul>
                            <span>&#10148;</span><strong>Intellectual Property Rights</strong>
                            <li style={{marginTop: '12px', listStyleType: 'none', marginLeft: '-15px'}}>You acknowledge and represent that the Intellectual Property Rights (IPR) in all the work(s) done by you during the time of your employment or contract or assignment in any manner with Moptra or its Clients will be deemed as work done for hire and it belongs to Moptra perpetually and without any claim from you. IPR would mean rights in software, systems, documentations, designs, tools, inventions, patents, utility models, trademarks, knowhow, designs, drawings, specifications, reports, copyrights, source code, flowcharts, algorithms, moral rights, database rights, semiconductor topography rights, etc. (whether or not, in each case, the right is registered and including applications for, and any right to apply for, such registrations) and all rights or forms of protection of a similar nature or having similar or equivalent effect to any of these which may subsist anywhere in the world, together with all renewals and extensions to such rights. As and when requested by Moptra, you shall sign all such documents and instruments including any actions that is required to affect the purpose of assignment of IPR to Moptra during your tenure with Moptra or otherwise.
                          <br/>  <ul style={{marginLeft:'-24px', marginTop: '10px'}}>
                            <li> <strong>Non-solicitation of Customer(s)</strong></li>
                           <br/> You shall not during the term of your employment with the Company and a period of 1 year thereafter, without the Company’s express written consent, either on your behalf or on behalf of another, directly or indirectly: i. Assist, aid, induce, facilitate or cause any customer or client of the Company who is an existing client or customer of the Company or who had been a customer or client or who becomes customer or client of the Company during your term of employment with the Company, to cease, terminate, discontinue either any part or whole of its business with the Company; ii. Solicit the business of any current or future client, customer or licensee of the Company either for yourself or for any other organization.
                            </ul>
                            </li>
                        </ul>
                        <ul>
                        <span>&#10148;</span> <strong>Restriction on Joining a Customer</strong>
                            <li style={{marginTop: '12px', listStyleType: 'none', marginLeft: '-15px'}}>You agree that for a period of one (1) year following the termination of your employment with Moptra for any reason, you will not: (a) accept any offer of employment from any customer of Moptra, where you had worked in a professional capacity with that customer in the one (1) year immediately preceding the termination of your employment with Moptra; (b) undertake a project or provide services to any such customer, either directly as an employee of the customer or as independent contractor or through any other company or agency, where you had worked in a professional capacity in the one (1) year immediately preceding the termination of your employment from Moptra; You further agree to undertake that you will disclose information on the existence of conditions mentioned in this clause to the company or agency where you would seek employment or get employed within the period of one (1) year following your termination of your employment with Moptra for any reason.
                            <br/>  <ul style={{marginLeft:'-24px', marginTop: '10px'}}>
                           <li> <strong>Non-Solicitation</strong> </li>
                            <br/>You shall not during the term of your employment with the Company and any time thereafter,
                            without the Company’s express written consent, either on your behalf or on behalf of another, directly or indirectly abet, induce, facilitate, contact or deal with the employee(s) of the Company or its associated entities for the purpose of making such employee(s) leave the Company and/or hiring them either for yourself or for any other organization, entities, etc.
                        </ul>
                        </li>
                        </ul>
                        <ul>
                        <span>&#10148;</span>   <strong>Superannuation</strong>
                            <li style={{marginTop: '12px', listStyleType: 'none', marginLeft: '-15px'}}>You will retire in the normal course from the services of the company on attaining the age of superannuation, which would be the end of the month following your 58th birthday.</li>
                        </ul>
                        <ul>
                        <span>&#10148;</span>  <strong>Governing Law</strong>
                            <li style={{marginTop: '12px', listStyleType: 'none', marginLeft: '-15px'}}>This Agreement shall be governed by and construed in accordance with the laws of India. We wish you all the very best and look forward to a long and mutually beneficial association.</li>
                        </ul>
                        <ul>
                        <span>&#10148;</span>   <strong>General</strong>
                            <li  style={{marginTop: '12px', listStyleType: 'none', marginLeft: '-15px'}}>The above terms and conditions are based on Company Policy, Procedures and other Rules and Regulations currently applicable to the Company’s employees and are subject to amendments and adjustments from time to time.
                               <p style={{marginTop: '10px'}}>Kindly acknowledge your acceptance of the offer, terms & conditions and confirm. We look forward to welcome you in our team.</p>
                               <p style={{marginTop: '10px'}}><b>Note: </b> For any query or further information, please reach out to us at <a href="mailto:info@moptra.com" className='info-link'>info@moptra.com</a></p>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
