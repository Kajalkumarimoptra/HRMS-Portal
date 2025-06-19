import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Admin from "layouts/Admin";
import LoginForm from "layouts/LoginForm";
import EnterOtp from "layouts/EnterOtp";
import Banner from "views/Banner";
import PersonalDetailsForm from "EmployeeForms/PersonalDetailsForm";
import ContactDetailsForm from "EmployeeForms/ContactDetailsForm";
import EducationalDetailsForm from "EmployeeForms/EducationalDetailsForm";
import ProfessionalRefForm from "EmployeeForms/ProfessionalRefForm";
import AdditionalDetailsForm from "EmployeeForms/AdditionalDetailsForm";
import PreviewForm from "EmployeeForms/PreviewForm";
import Resetpassword from "layouts/Resetpassword";
import ForgotPassword from "layouts/ForgotPassword";
import Navbar from "EmployeeForms/Navbar";
import ProtectedRoutes from "components/ProtectedRoutes/ProtectedRoutes";
import AttachSign from "EmployeeForms/AttachSign";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* {Public Route} */}
                <Route path="/" element={<LoginForm />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/enterotp" element={<EnterOtp />} />
                <Route path="/banner" element={<Banner />} />

                {/* Protected Routes */}
                <Route path="/admin/*" element={
                    <ProtectedRoutes>
                        <Admin />
                    </ProtectedRoutes>} />
                <Route path="/resetpassword" element={
                    <ProtectedRoutes>
                        <Resetpassword />
                    </ProtectedRoutes>
                } />
                <Route path="/navbar" element={
                    <ProtectedRoutes>
                        <Navbar />
                    </ProtectedRoutes>
                } />
                <Route path="/personaldetailsform" element={
                    <ProtectedRoutes>
                        <PersonalDetailsForm />
                    </ProtectedRoutes>
                } />
                <Route path="/contactdetailsform" element={
                    <ProtectedRoutes>
                        <ContactDetailsForm />
                    </ProtectedRoutes>
                } />
                <Route path="/educationaldetailsform" element={
                    <ProtectedRoutes>
                        <EducationalDetailsForm />
                    </ProtectedRoutes>
                } />
                <Route path="/professionalrefform" element={
                    <ProtectedRoutes>
                        <ProfessionalRefForm />
                    </ProtectedRoutes>
                } />
                <Route path="/additionaldetailsform" element={
                    <ProtectedRoutes>
                        <AdditionalDetailsForm />
                    </ProtectedRoutes>
                } />
                <Route path="/previewform" element={
                    <ProtectedRoutes>
                        <PreviewForm />
                    </ProtectedRoutes>
                } />

                {/* Default route */}
                <Route path="*" element={<Navigate to="/" />} />

            </Routes>
        </BrowserRouter>
    )
}
