import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { EnrollmentProvider } from "./context/EnrollmentContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
       <EnrollmentProvider>
          <App />
       </EnrollmentProvider>
    </AuthProvider>
  </React.StrictMode>
);
