import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const location = useLocation();

  return (
    <div style={{ paddingRight: "20px" }}>
      <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
        {links.map((link) => (
          <Link
            to={`/Kambaz/Account/${link}`}
            className={`list-group-item border border-0 ${
              location.pathname.includes(link) ? "active" : "text-danger"
            }`}
          >
            {link}
          </Link>
        ))}

        {currentUser && currentUser.role === "ADMIN" && (
          <Link
            to={`/Kambaz/Account/Users`}
            className={`list-group-item border border-0 ${
              location.pathname.includes("Users") ? "active" : "text-danger"
            }`}
          >
            Users
          </Link>
        )}
      </div>
    </div>
  );
}
