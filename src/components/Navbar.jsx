import SearchContact from "./contact/SearchContact";
import { useLocation } from "react-router-dom";
import { purple, background } from "../helpers/colors.js";


const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav
      className="navbar navbar-dark navbar expand-sm shadow-lg"
      style={{ backgroundColor: background }}
    >
      <div className="container">
        <div className="row w-100">
          <div className="col">
            <div className="navbar-brand">
              <i className="fas fa-id-badge" style={{ color: purple }}></i> وب
              اپلیکیشن مدریت <span style={{ color: purple }}>مخاطبین</span>
            </div>
          </div>
          {location.pathname === "/contacts" ? (
            <div className="col">
              <SearchContact />
            </div>
          ) : null}
          ;
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
