import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Store initial 'from' state in a ref so it persists
  const fromRef = useRef(location.state?.from);
  const fromPath = location.state?.fromPath;

  // Debug: Log the initial and persistent 'from' value
  useEffect(() => {
    console.log("Breadcrumb Mounted");
    console.log("location.state?.from:", location.state?.from);
    console.log("fromRef.current (persisted):", fromRef.current);
  }, []);

  const pathnames = location.pathname.split("/").filter((x) => x);
  const modifiedPathnames = pathnames[0] === "dashboard" ? pathnames.slice(1) : pathnames;

  return (
    <nav className="breadcrumb">
      {modifiedPathnames.map((value, index) => {
        let routeTo = `/${modifiedPathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === modifiedPathnames.length - 1;

        const displayName = value === "admin" ? "Dashboard" : value;

        // Special route override if we came from PendingRequest
        if (value.toLowerCase() === "offboarded" && fromRef.current === "PendingRequest") {
          routeTo = "/admin/PendingRequest/Offboarded";
          console.log("Overriding breadcrumb path to:", routeTo);
        }
        if (value.toLowerCase() === "schedulemeeting" && fromRef.current === "ScheduleMeeting" && fromPath) {
          routeTo = fromPath; 
          console.log("Overriding breadcrumb path for schedulemeeting to:", routeTo);
        }
        if (value.toLowerCase() === "checklist" && fromRef.current === "Checklist" && fromPath) {
          routeTo = fromPath; 
          console.log("Overriding breadcrumb path for checklist to:", routeTo);
        }
        if (value.toLowerCase() === "finalclearance" && fromRef.current === "FinalClearance" && fromPath) {
          routeTo = fromPath; 
          console.log("Overriding breadcrumb path for FinalClearance to:", routeTo);
        }
        const handleClick = (e) => {
          e.preventDefault();
          console.log("Navigating to:", routeTo, "with state:", { from: fromRef.current });
          navigate(routeTo, {
            state: {
              from: fromRef.current,
              fromPath: location.pathname, // this is the current full path we’re navigating from
            },
          });          
        };

        return (
          <span key={index} className="pathSeparator">
            {index > 0 && " > "}
            {isLast ? (
              <span className="breadcrumb-active">{displayName}</span>
            ) : (
              <a href={routeTo} className="breadcrumb-link" onClick={handleClick}>
                {displayName}
              </a>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
