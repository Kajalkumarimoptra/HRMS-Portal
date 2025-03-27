import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./components/ContextProvider/Context";
import { Auth0Provider } from '@auth0/auth0-react';

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Admin from "layouts/Admin";
import LoginForm from "layouts/LoginForm";
import EnterOtp from "layouts/EnterOtp";
import Banner from "views/Banner";
import PersonalDetailsForm from "EmployeeForms/PersonalDetailsForm";
import ContactDetailsForm from "EmployeeForms/ContactDetailsForm";
import EducationalDetailsForm from "EmployeeForms/EducationalDetailsForm";
import ProfessionalRefForm from "EmployeeForms/ProfessionalRefForm";
import DeclarationForm from "EmployeeForms/DeclarationForm";
import PreviewForm from "EmployeeForms/PreviewForm";
import Resetpassword from "layouts/Resetpassword";
import ForgotPassword from "layouts/ForgotPassword";
import Navbar from "EmployeeForms/Navbar";
import ProtectedRoutes from "components/ProtectedRoutes/ProtectedRoutes";
import AttachSign from "EmployeeForms/AttachSign";
import { RegistrationProvider } from "components/ContextProvider/RegistrationDataContext";
import { AddressHistoryContextProvider } from "components/ContextProvider/AddressHistoryContext";
import { HolidayListContextProvider } from "components/ContextProvider/HolidayListContext";
import { EmploymentHistoryContextProvider } from "components/ContextProvider/EmploymentHistoryContext";
import { OffboardPopupContextProvider } from "components/ContextProvider/OffboardPopupContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
    audience={process.env.REACT_APP_AUDIENCE_AUTH0}>
    <BrowserRouter>
      <AuthProvider>
        <RegistrationProvider>
          <AddressHistoryContextProvider>
            <HolidayListContextProvider>
              <EmploymentHistoryContextProvider>
                <OffboardPopupContextProvider>
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
                <Route path="/declarationform" element={
                  <ProtectedRoutes>
                    <DeclarationForm />
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
              </OffboardPopupContextProvider>
              </EmploymentHistoryContextProvider>
            </HolidayListContextProvider>
          </AddressHistoryContextProvider>
        </RegistrationProvider>
      </AuthProvider>
    </BrowserRouter>
  </Auth0Provider>
);
