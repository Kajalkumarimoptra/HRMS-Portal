import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./components/ContextProvider/Context";
import { Auth0Provider } from '@auth0/auth0-react';
import App from "App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { RegistrationProvider } from "components/ContextProvider/RegistrationDataContext";
import { AddressHistoryContextProvider } from "components/ContextProvider/AddressHistoryContext";
import { HolidayListContextProvider } from "components/ContextProvider/HolidayListContext";
import { EmploymentHistoryContextProvider } from "components/ContextProvider/EmploymentHistoryContext";
import { OffboardPopupContextProvider } from "components/ContextProvider/OffboardPopupContext"
import { EmailProvider } from "components/ContextProvider/EmailContext";
import { Provider } from "react-redux";
import { Store } from "components/redux/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={Store}>
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
    audience={process.env.REACT_APP_AUDIENCE_AUTH0}>
      <AuthProvider>
        <RegistrationProvider>
          <EmailProvider>
            <AddressHistoryContextProvider>
              <HolidayListContextProvider>
                <EmploymentHistoryContextProvider>
                  <OffboardPopupContextProvider>
                    <App />
                  </OffboardPopupContextProvider>
                </EmploymentHistoryContextProvider>
              </HolidayListContextProvider>
            </AddressHistoryContextProvider>
          </EmailProvider>
        </RegistrationProvider>
      </AuthProvider>
  </Auth0Provider>
  </Provider>
);
