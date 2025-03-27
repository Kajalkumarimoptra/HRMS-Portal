import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Remove "dashboard" if it exists as the first segment
  const modifiedPathnames = pathnames[0] === "dashboard" ? pathnames.slice(1) : pathnames;

  return (
    <nav className="breadcrumb">
      {modifiedPathnames.map((value, index) => {
        const routeTo = `/${modifiedPathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === modifiedPathnames.length - 1;

        // Replace "admin" with "dashboard" in the breadcrumb display name
        const displayName = value === "admin" ? "Dashboard" : value;

        return (
          <span key={index} className="pathSeparator">
            {index > 0 && " > "} {/* Add separator only after the first segment */}
            {isLast ? (
              <span className="breadcrumb-active">{displayName}</span>
            ) : (
              <Link to={routeTo} className="breadcrumb-link">{displayName}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
