import "./App.css";
import Navbar from "./components/Navbar";
import Contacts from "./components/contact/Contacts";
import { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate, data } from "react-router-dom";
import AddContact from "./components/contact/AddContact";
import EditContact from "./components/contact/EditContact";
import { confirmAlert } from "react-confirm-alert";
import { ContactContext } from "./context/ContactContext";
import { useImmer } from "use-immer";
import { ToastContainer, toast, Bounce } from "react-toastify";
import _ from "lodash";
import {
  createContact,
  getAllContacts,
  getAllGroups,
  deleteContact,
  getContact, // 👈 اضافه‌ش کن
} from "./services/contactServices";
import ViewContact from "./components/contact/ViewContact";
import {
  comment,
  currentLine,
  foreground,
  purple,
  yellow,
} from "./helpers/colors";

const App = () => {
  const [loading, setLoading] = useImmer(false);
  const [contacts, setContacts] = useImmer([]);
  const [filteredContacts, setFilterdContacts] = useImmer([]);
  const [groups, setGroups] = useImmer([]);

  const navigate = useNavigate();

  useEffect(() => {
    const ferchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getAllContacts();
        const { data: groupData } = await getAllGroups();
        console.log(contactData);
        console.log(groupData);

        setContacts(contactData);
        setFilterdContacts(contactData);
        setGroups(groupData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    ferchData();
  }, []); //onLoading component

  const createContactForm = async (values) => {
    try {
      setLoading((draft) => !draft);
      const { status, data } = await createContact(values);

      if (status === 201 || status === 200) {
        setContacts((draft) => {
          toast.success("مخاطب با موفقیت ساخته شده", {
            icon: () => <span>👌</span>,
          });
          draft.push(data);
        });
        setFilterdContacts((draft) => {
          draft.push(data);
        });

        setLoading((preLoading) => !preLoading);
        navigate("/contacts");
      }
    } catch (err) {
      console.error("خطایی رخ داده: " + err.message);
      console.error(err.inner);
      setLoading((preLoading) => !preLoading);
    }
  };

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div>
            <div
              dir="rtl"
              style={{
                backgroundColor: currentLine,
                border: `1px solid ${purple}`,
                borderRadius: "1em",
              }}
              className="p-4"
            >
              <h1 style={{ color: yellow }}>پاک کردن مخاطب</h1>
              <p style={{ color: foreground }}>
                مطمئنی میخواهی مخاطب
                {contactFullname}
                رو پاک کنی ؟
              </p>
              <button
                onClick={() => {
                  removeContact(contactId);
                  onClose();
                }}
                className="btn mx-2"
                style={{ backgroundColor: purple }}
              >
                بله
              </button>
              <button
                onClick={onClose}
                className="btn"
                style={{ backgroundColor: comment }}
              >
                خیر
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    const contactBackup = [...contacts];
    try {
      setContacts((draft) => {
        draft.filter((c) => c.id !== contactId);
      });
      setFilterdContacts((draft) => {
        draft.filter((c) => c.id !== contactId);
      });

      const { status } = await deleteContact(contactId);
      toast.warn("مخاطب با موقیت حذف شد!", {
        icon: () => <span>🫡</span>,
      });
      if (parseInt(status) !== 200) {
        setContacts(contactBackup);
        setFilterdContacts(contactBackup);
      }
    } catch (err) {
      setContacts(contactBackup);
      setFilterdContacts(contactBackup);
      toast.error("خطایی رخ داده: " + err.message, {
        icon: () => <span>🫡</span>,
      });
    } finally {
      setLoading(false); // 👈 مطمئن می‌شویم در هر صورت loading خاموش می‌شود
    }
  };

  const contactSearch = _.debounce((query) => {
    if (!query) return setFilterdContacts([...contacts]);
    setFilterdContacts(
      contacts.filter((contact) => {
        const name = contact.fullname;

        return (
          typeof name === "string" &&
          name.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
    setFilterdContacts((draft) =>
      draft.filter((c) =>
        c.fullname.toLowerCase().includes(query.toLowerCase())
      )
    );

    // }, 1000);
  }, 1000);

  const copyContact = async (contactId) => {
    setLoading(true);
    try {
      const { data: orginalContact } = await getContact(contactId);
      const { id, fullname, ...rest } = orginalContact;
      const newContactData = {
        fullname: fullname + "(کپی)",
        ...rest,
      };
      const { status } = await createContact(newContactData);
      if (status === 201) {
        toast.success("مخاطب با موقیت کپی شد!", {
          icon: () => <span>👨‍👩‍👧‍👦</span>,
        });
        // رفرش کردن لیست مخاطبین
        const { data: contactData } = await getAllContacts();
        setContacts(contactData);
        setFilterdContacts(contactData);
      }
    } catch (err) {
      console.error("خطایی رخ داده: " + err.message);
    } finally {
      setLoading(false); // 👈 مطمئن می‌شویم در هر صورت loading خاموش می‌شود
    }
  };

  return (
    <ContactContext.Provider
      value={{
        loading: loading,
        setLoading: setLoading,
        setFilteredContacts: setFilterdContacts,
        filteredContacts,
        contacts,
        contacts,
        setContacts,
        groups,
        deleteContact: confirmDelete,
        // updateContact,
        createContact: createContactForm,
        contactSearch,
        copyContact,
      }}
    >
      <div className="App">
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
          <Route path="/contacts/add" element={<AddContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};

export default App;
