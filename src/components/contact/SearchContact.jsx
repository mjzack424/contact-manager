import { useContext } from "react";
import { ContactContext } from "../../context/ContactContext.js";
import { purple } from "../../helpers/colors.js";

const SearchContact = () => {
  const { contactSearch } = useContext(ContactContext);
  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span
        className="input-group-text"
        id="basic-search"
        style={{ backgroundColor: purple }}
      >
        <i className="fas fa-search"></i>
      </span>
      <input
        type="text"
        onChange={event => contactSearch(event.target.value)}
        className="form-control"
        dir="rtl"
        placeholder="جستجوی مخاطب"
        aria-label="Search"
        aria-describedby="basic-search"
      ></input>
    </div>
  );
};
export default SearchContact;
