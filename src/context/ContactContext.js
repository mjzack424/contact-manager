import { createContext } from "react";

export const ContactContext = createContext({
  loading: false,
  setLoading: () => {},
  contacts: [],
  setContacts: () => {},
  FilteredContacts: [],
  setFilteredContacts: () => {},
  newContact: [],
  contactQuery: {},
  groups: [],
  deletContact: () => {},
  contactSearch: () => {},
  copyContact: () => {},
});
