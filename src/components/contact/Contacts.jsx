import { useContext } from "react";
import { currentLine, orange, pink } from "../../helpers/colors.js";
import Contact from "./Contact.jsx";
import Spinner from "../Spinner.jsx";
import { Link } from "react-router-dom";

import { ContactContext } from "../../context/ContactContext.js";

const Contacts = () => {
  const {filteredContacts, loading, deleteContact, copyContact} = useContext(ContactContext);
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <div className="h3 float-end">
                <div className="d-flex justify-content-center pt-2">
                  <Link
                    to={"/contacts/add"}
                    className="btn m-2 d-flex align-items-center"
                    style={{ backgroundColor: pink }}
                  >
                    ساخت مخاطب جدید
                    <i className="fa fa-plus-circle mx-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <section className="container">
          <div className="row">
            {filteredContacts && filteredContacts.length > 0 ? (
              filteredContacts.map((c) => (
                <Contact
                  key={c.id}
                  deleteContact={() => deleteContact(c.id, c.fullname)}
                  contact={c}
                  copyContact={() => copyContact(c.id, c.fullname)}
                />
              ))
            ) : (
              <div
                className="text-center py-5"
                style={{ backgroundColor: currentLine }}
              >
                <p className="h3" style={{ color: orange }}>
                  مخاطب یافت نشد...
                </p>
                <img
                  className="w-25"
                  src={require("../../assets/no-found.gif")}
                  alt="پیدا نشد"
                />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Contacts;
